"use client";

import {
  AlertCircle,
  Check,
  ChevronDown,
  Loader2,
  MessageCircle,
  Send,
} from "lucide-react";
import { motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import {
  Suspense,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { whatsappDefaultMessage, whatsappHref } from "@/config/site";
import {
  contactPage,
  contactServiceLabel,
  contactServiceOptions,
  isContactEmail,
  isContactPhone,
  isContactService,
  resolveContactService,
  type ContactServiceValue,
} from "@/content/contact";
import {
  getPropertyBySlug,
  propertyViewingMessage,
} from "@/content/properties";
import { cn } from "@/lib/cn";
import { uiTransition } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const headingId = "contact-form-heading";

const form = contactPage.form;

type FieldName = "name" | "email" | "phone" | "service" | "message";

type Values = Record<FieldName, string>;

type Errors = Partial<Record<FieldName, string>>;

type Status = "idle" | "submitting" | "success" | "error";

type InitialService = ContactServiceValue | "";

const EMPTY: Values = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

function validate(values: Values): Errors {
  const errors: Errors = {};

  if (values.name.trim().length < 2) {
    errors.name = form.validation.name;
  }
  if (!isContactEmail(values.email)) {
    errors.email = form.validation.email;
  }
  if (!isContactPhone(values.phone)) {
    errors.phone = form.validation.phone;
  }
  if (!isContactService(values.service)) {
    errors.service = form.validation.service;
  }
  if (values.message.trim().length < 10) {
    errors.message = form.validation.message;
  }

  return errors;
}

function buildMessage(values: Values): string {
  const service = contactServiceLabel(values.service);

  return [
    whatsappDefaultMessage,
    values.name.trim() && `Name: ${values.name.trim()}`,
    values.email.trim() && `Email: ${values.email.trim()}`,
    values.phone.trim() && `Phone: ${values.phone.trim()}`,
    service && `Service: ${service}`,
    values.message.trim() && `Message: ${values.message.trim()}`,
  ]
    .filter((line): line is string => Boolean(line))
    .join("\n");
}

const fieldClasses = (error?: string) =>
  cn(
    "mt-2 h-12 w-full rounded-xs border bg-ivory-50 px-3 text-small text-ink-900 placeholder:text-ink-500/80 transition-colors duration-200 hover:border-ink-900/40 disabled:opacity-60",
    error ? "border-terracotta-600" : "border-ink-900/25",
  );

function TextField({
  id,
  name,
  label,
  value,
  error,
  onChange,
  type = "text",
  inputMode,
  autoComplete,
  placeholder,
  maxLength,
  disabled,
}: {
  id: string;
  name: FieldName;
  label: string;
  value: string;
  error?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "email" | "tel";
  inputMode?: "text" | "email" | "tel";
  autoComplete?: string;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
}) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-small font-semibold text-ink-900"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        spellCheck={type === "email" ? false : undefined}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={fieldClasses(error)}
      />
      {error ? (
        <p id={errorId} className="mt-1.5 text-small text-terracotta-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function ServiceSelect({
  id,
  value,
  error,
  preselected,
  onChange,
  disabled,
}: {
  id: string;
  value: string;
  error?: string;
  preselected: boolean;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}) {
  const errorId = `${id}-error`;
  const noteId = `${id}-note`;

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-small font-semibold text-ink-900"
      >
        {form.fields.service.label}
      </label>
      <div className="relative mt-2">
        <select
          id={id}
          name="service"
          value={value}
          onChange={onChange}
          disabled={disabled}
          required
          aria-invalid={error ? true : undefined}
          aria-describedby={
            [error ? errorId : null, preselected ? noteId : null]
              .filter(Boolean)
              .join(" ") || undefined
          }
          className={cn(
            fieldClasses(error),
            "mt-0 appearance-none pr-10",
            value ? "text-ink-900" : "text-ink-500",
          )}
        >
          <option value="" disabled>
            {form.fields.service.placeholder}
          </option>
          {contactServiceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          size={16}
          strokeWidth={1.75}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-500"
        />
      </div>
      {error ? (
        <p id={errorId} className="mt-1.5 text-small text-terracotta-600">
          {error}
        </p>
      ) : null}
      {preselected && !error ? (
        <p id={noteId} className="mt-1.5 text-small text-ink-500">
          {form.preselected}
        </p>
      ) : null}
    </div>
  );
}

function MessageField({
  id,
  value,
  error,
  onChange,
  disabled,
}: {
  id: string;
  value: string;
  error?: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
}) {
  const errorId = `${id}-error`;

  return (
    <div className="sm:col-span-2">
      <label
        htmlFor={id}
        className="block text-small font-semibold text-ink-900"
      >
        {form.fields.message.label}
      </label>
      <textarea
        id={id}
        name="message"
        rows={5}
        maxLength={2000}
        placeholder={form.fields.message.placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          fieldClasses(error),
          "h-auto min-h-32 resize-y py-3 leading-relaxed",
        )}
      />
      {error ? (
        <p id={errorId} className="mt-1.5 text-small text-terracotta-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function ContactFormPanel({
  initialService,
  initialMessage = "",
}: {
  initialService: InitialService;
  initialMessage?: string;
}) {
  const base = useId();
  const fid = (name: FieldName) => `${base}-${name}`;
  const successRef = useRef<HTMLHeadingElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const [values, setValues] = useState<Values>({
    ...EMPTY,
    service: initialService,
    message: initialMessage,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [invalid, setInvalid] = useState(false);

  const submitting = status === "submitting";
  const preselected =
    Boolean(initialService) && values.service === initialService;

  /* The form is replaced by the confirmation, so move focus into it. */
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const announcement = submitting
    ? form.announcement
    : invalid
      ? form.invalidAnnouncement
      : "";

  function update(name: FieldName) {
    return (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const { value } = event.target;
      setValues((current) => ({ ...current, [name]: value }));
      if (errors[name]) {
        setErrors((current) => ({ ...current, [name]: undefined }));
      }
      if (invalid) setInvalid(false);
      if (status === "error") setStatus("idle");
    };
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const nextErrors = validate(values);
    setErrors(nextErrors);

    const firstInvalid = (
      ["name", "email", "phone", "service", "message"] as const
    ).find((field) => nextErrors[field]);

    if (firstInvalid) {
      setStatus("idle");
      setInvalid(true);
      document.getElementById(fid(firstInvalid))?.focus();
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ form: "contact", ...values }),
      });
      const payload = (await response.json().catch(() => null)) as {
        ok?: boolean;
      } | null;

      if (!response.ok || !payload?.ok) {
        throw new Error(`Request failed with ${response.status}`);
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setValues(EMPTY);
    setErrors({});
    setStatus("idle");
    setInvalid(false);
  }

  const stateMotion = reduceMotion
    ? { initial: false as const, animate: { opacity: 1 } }
    : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } };

  return (
    <Section
      id="message"
      tone="ivory"
      spacing="md"
      topDivider="wave"
      labelledBy={headingId}
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>{form.eyebrow}</Eyebrow>
              <Heading
                as="h2"
                size="lg"
                id={headingId}
                className="mt-5 max-w-[15ch]"
              >
                {form.heading}
              </Heading>
              <p className="mt-6 max-w-[38ch] text-lead text-ink-700">
                {form.body}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-8 max-w-[34ch] border-t border-ink-900/15 pt-5 text-small text-ink-500">
                {form.note}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={0.06}>
              <div className="rounded-md border border-ink-900/15 bg-ivory-50 p-6 sm:p-8">
                <p aria-live="polite" className="sr-only">
                  {announcement}
                </p>

                {status === "success" ? (
                  <motion.div {...stateMotion} transition={uiTransition}>
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent-text">
                      <Check aria-hidden="true" size={22} strokeWidth={2} />
                    </span>
                    <h3
                      ref={successRef}
                      tabIndex={-1}
                      className="mt-6 font-display text-title leading-tight outline-none"
                    >
                      {form.success.heading}
                    </h3>
                    <p className="mt-3 max-w-[42ch] text-small text-ink-700">
                      {form.success.body}
                    </p>
                    <div className="mt-7 flex flex-wrap items-center gap-3">
                      <Button
                        href={whatsappHref(buildMessage(values))}
                        external
                        variant="dark"
                        icon={
                          <MessageCircle
                            aria-hidden="true"
                            size={17}
                            strokeWidth={1.75}
                          />
                        }
                        iconPosition="start"
                      >
                        {form.success.whatsapp}
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={reset}
                        className="border-ink-900/30 text-ink-900 hover:border-ink-900/60 hover:bg-ink-900/5"
                      >
                        {form.success.reset}
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={onSubmit} noValidate aria-busy={submitting}>
                    <fieldset disabled={submitting} className="min-w-0">
                      <legend className="sr-only">{form.legend}</legend>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <TextField
                          id={fid("name")}
                          name="name"
                          label={form.fields.name.label}
                          placeholder={form.fields.name.placeholder}
                          autoComplete="name"
                          maxLength={120}
                          value={values.name}
                          onChange={update("name")}
                          error={errors.name}
                          disabled={submitting}
                        />
                        <TextField
                          id={fid("email")}
                          name="email"
                          label={form.fields.email.label}
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          placeholder={form.fields.email.placeholder}
                          maxLength={254}
                          value={values.email}
                          onChange={update("email")}
                          error={errors.email}
                          disabled={submitting}
                        />
                        <TextField
                          id={fid("phone")}
                          name="phone"
                          label={form.fields.phone.label}
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          placeholder={form.fields.phone.placeholder}
                          maxLength={32}
                          value={values.phone}
                          onChange={update("phone")}
                          error={errors.phone}
                          disabled={submitting}
                        />
                        <ServiceSelect
                          id={fid("service")}
                          value={values.service}
                          onChange={update("service")}
                          error={errors.service}
                          preselected={preselected}
                          disabled={submitting}
                        />
                        <MessageField
                          id={fid("message")}
                          value={values.message}
                          onChange={update("message")}
                          error={errors.message}
                          disabled={submitting}
                        />
                      </div>
                    </fieldset>

                    {status === "error" ? (
                      <motion.p
                        role="alert"
                        {...stateMotion}
                        transition={uiTransition}
                        className="mt-6 flex items-start gap-2 rounded-xs border border-terracotta-600/50 bg-terracotta-600/10 p-3 text-small text-ink-900"
                      >
                        <AlertCircle
                          aria-hidden="true"
                          size={17}
                          strokeWidth={1.75}
                          className="mt-0.5 shrink-0 text-terracotta-600"
                        />
                        {form.error}
                      </motion.p>
                    ) : null}

                    <div className="mt-7 flex flex-wrap items-center gap-3">
                      <Button
                        type="submit"
                        size="lg"
                        disabled={submitting}
                        icon={
                          submitting ? (
                            <Loader2
                              aria-hidden="true"
                              size={17}
                              strokeWidth={1.75}
                              className="animate-spin motion-reduce:animate-none"
                            />
                          ) : (
                            <Send
                              aria-hidden="true"
                              size={17}
                              strokeWidth={1.75}
                            />
                          )
                        }
                        iconPosition="start"
                      >
                        {submitting ? form.submitting : form.submit}
                      </Button>
                      <Button
                        href={whatsappHref(buildMessage(values))}
                        external
                        variant="ghost"
                        size="lg"
                        className="border-ink-900/30 text-ink-900 hover:border-ink-900/60 hover:bg-ink-900/5"
                        icon={
                          <MessageCircle
                            aria-hidden="true"
                            size={17}
                            strokeWidth={1.75}
                          />
                        }
                        iconPosition="start"
                      >
                        {form.whatsapp}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function ContactFormWithIntent() {
  const params = useSearchParams();
  const property = getPropertyBySlug(params.get("property") ?? "");
  const service = resolveContactService(params.get("service"));

  return (
    <ContactFormPanel
      /* A listing link always belongs to Real Estate, whatever the query says. */
      initialService={property ? "real-estate" : service}
      initialMessage={property ? propertyViewingMessage(property) : ""}
    />
  );
}

/**
 * Contact form.
 *
 * `useSearchParams` sits inside a Suspense boundary so the route stays static;
 * `?service=` preselects the dropdown after hydration. The fallback renders the
 * same panel with no preselection, which keeps the layout stable.
 */
export function ContactForm() {
  return (
    <Suspense fallback={<ContactFormPanel initialService="" />}>
      <ContactFormWithIntent />
    </Suspense>
  );
}
