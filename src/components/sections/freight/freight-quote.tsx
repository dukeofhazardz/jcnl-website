"use client";

import {
  AlertCircle,
  Check,
  Loader2,
  MessageCircle,
  Plane,
  Ship,
  type LucideIcon,
} from "lucide-react";
import {
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
import { whatsappHref } from "@/config/site";
import { freightQuote, type FreightModeId } from "@/content/freight";
import { cn } from "@/lib/cn";

const headingId = "freight-quote-heading";

type FieldName =
  | "name"
  | "phone"
  | "origin"
  | "destination"
  | "cargoType"
  | "mode";

type Values = Record<FieldName, string>;

type Errors = Partial<Record<FieldName, string>>;

type Status = "idle" | "submitting" | "success" | "error";

const EMPTY: Values = {
  name: "",
  phone: "",
  origin: "",
  destination: "",
  cargoType: "",
  mode: "",
};

const MODES: { id: FreightModeId; label: string; icon: LucideIcon }[] = [
  { id: "air", label: "Air", icon: Plane },
  { id: "sea", label: "Sea or water", icon: Ship },
];

function validate(values: Values): Errors {
  const errors: Errors = {};
  const phone = values.phone.trim();
  const digits = phone.replace(/\D/g, "");

  if (values.name.trim().length < 2) {
    errors.name = "Enter your name.";
  }
  if (!/^[+()\d\s-]{7,20}$/.test(phone) || digits.length < 7) {
    errors.phone = "Enter a phone number we can call.";
  }
  if (values.origin.trim().length < 2) {
    errors.origin = "Add where the cargo starts.";
  }
  if (values.destination.trim().length < 2) {
    errors.destination = "Add where it is going.";
  }
  if (values.cargoType.trim().length < 2) {
    errors.cargoType = "Say what is moving.";
  }
  if (values.mode !== "air" && values.mode !== "sea") {
    errors.mode = "Choose air or sea.";
  }

  return errors;
}

function buildMessage(values: Values): string {
  const mode =
    values.mode === "air"
      ? "Air"
      : values.mode === "sea"
        ? "Sea or water"
        : "";

  return [
    "Hello JCNL, I would like a cargo quote.",
    values.name.trim() && `Name: ${values.name.trim()}`,
    values.phone.trim() && `Phone: ${values.phone.trim()}`,
    values.origin.trim() && `Origin: ${values.origin.trim()}`,
    values.destination.trim() && `Destination: ${values.destination.trim()}`,
    values.cargoType.trim() && `Cargo: ${values.cargoType.trim()}`,
    mode && `Mode: ${mode}`,
  ]
    .filter((line): line is string => Boolean(line))
    .join("\n");
}

function Field({
  id,
  label,
  name,
  value,
  error,
  onChange,
  type = "text",
  inputMode,
  autoComplete,
  placeholder,
  disabled,
}: {
  id: string;
  label: string;
  name: FieldName;
  value: string;
  error?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "tel";
  inputMode?: "text" | "tel";
  autoComplete?: string;
  placeholder?: string;
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
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "mt-2 h-12 w-full rounded-xs border bg-white px-3 text-small text-ink-900 placeholder:text-ink-500/80 transition-colors duration-200 hover:border-ink-900/40 disabled:opacity-60",
          error ? "border-red-600" : "border-ink-900/25",
        )}
      />
      {error ? (
        <p id={errorId} className="mt-1.5 text-small text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Quote request. Validation, submitting, success and error are all real states. */
export function FreightQuote() {
  const base = useId();
  const fid = (name: FieldName) => `${base}-${name}`;
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const submitting = status === "submitting";

  /* The form is replaced by the confirmation, so move focus into it. The
     submitting announcement covers the gap before the swap. */
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  function update(name: FieldName) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setValues((current) => ({ ...current, [name]: value }));
      if (errors[name]) {
        setErrors((current) => ({ ...current, [name]: undefined }));
      }
      if (status === "error") setStatus("idle");
    };
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const nextErrors = validate(values);
    setErrors(nextErrors);

    const firstInvalid = (
      ["name", "phone", "origin", "destination", "cargoType", "mode"] as const
    ).find((field) => nextErrors[field]);

    if (firstInvalid) {
      setStatus("idle");
      const target =
        firstInvalid === "mode" ? `${base}-mode-air` : fid(firstInvalid);
      document.getElementById(target)?.focus();
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
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
  }

  return (
    <Section
      id="quote"
      tone="tint"
      spacing="md"
      labelledBy={headingId}
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>{freightQuote.eyebrow}</Eyebrow>
              <Heading
                as="h2"
                size="lg"
                id={headingId}
                className="mt-5 max-w-[15ch]"
              >
                {freightQuote.heading}
              </Heading>
              <p className="mt-6 max-w-[38ch] text-lead text-ink-700">
                {freightQuote.body}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-8 max-w-[34ch] border-t border-ink-900/15 pt-5 text-small text-ink-500">
                All fields are required. We use them to answer this request.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={0.06}>
              <div className="rounded-md border border-ink-900/15 bg-white p-6 sm:p-8">
                <p aria-live="polite" className="sr-only">
                  {status === "submitting" ? "Sending your request." : ""}
                </p>

                {status === "success" ? (
                  <div>
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent-text">
                      <Check aria-hidden="true" size={22} strokeWidth={2} />
                    </span>
                    <h3
                      ref={successRef}
                      tabIndex={-1}
                      className="mt-6 font-display text-title leading-tight outline-none"
                    >
                      Request received.
                    </h3>
                    <p className="mt-3 max-w-[42ch] text-small text-ink-700">
                      {freightQuote.success}
                    </p>
                    <div className="mt-7 flex flex-wrap items-center gap-3">
                      <Button
                        href={whatsappHref(buildMessage(values))}
                        external
                        variant="secondary"
                        icon={
                          <MessageCircle
                            aria-hidden="true"
                            size={17}
                            strokeWidth={1.75}
                          />
                        }
                        iconPosition="start"
                      >
                        Send the details on WhatsApp
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={reset}
                        className="border-ink-900/30 text-ink-900 hover:border-ink-900/60 hover:bg-ink-900/5"
                      >
                        Send another request
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form
                    ref={formRef}
                    onSubmit={onSubmit}
                    noValidate
                    aria-busy={submitting}
                  >
                    <fieldset disabled={submitting} className="min-w-0">
                      <legend className="sr-only">Cargo quote details</legend>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field
                          id={fid("name")}
                          name="name"
                          label="Name"
                          value={values.name}
                          onChange={update("name")}
                          error={errors.name}
                          autoComplete="name"
                          disabled={submitting}
                        />
                        <Field
                          id={fid("phone")}
                          name="phone"
                          label="Phone"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          value={values.phone}
                          onChange={update("phone")}
                          error={errors.phone}
                          disabled={submitting}
                        />
                        <Field
                          id={fid("origin")}
                          name="origin"
                          label="Origin"
                          value={values.origin}
                          onChange={update("origin")}
                          error={errors.origin}
                          placeholder="City or address"
                          autoComplete="off"
                          disabled={submitting}
                        />
                        <Field
                          id={fid("destination")}
                          name="destination"
                          label="Destination"
                          value={values.destination}
                          onChange={update("destination")}
                          error={errors.destination}
                          placeholder="City or address"
                          autoComplete="off"
                          disabled={submitting}
                        />
                        <div className="sm:col-span-2">
                          <Field
                            id={fid("cargoType")}
                            name="cargoType"
                            label="Cargo type"
                            value={values.cargoType}
                            onChange={update("cargoType")}
                            error={errors.cargoType}
                            placeholder="Parcels, machinery, dry or wet cargo"
                            autoComplete="off"
                            disabled={submitting}
                          />
                        </div>
                      </div>

                      <fieldset className="mt-6">
                        <legend className="text-small font-semibold text-ink-900">
                          Mode
                        </legend>
                        <div className="mt-2 grid gap-2.5 sm:grid-cols-2 sm:gap-3">
                          {MODES.map((mode) => {
                            const Icon = mode.icon;
                            const checked = values.mode === mode.id;

                            return (
                              <label
                                key={mode.id}
                                className={cn(
                                  "flex cursor-pointer items-center gap-2.5 rounded-xs border px-3 py-3 text-small transition-colors duration-200 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ink-900 sm:gap-3 sm:px-4",
                                  checked
                                    ? "border-ink-900 bg-accent-soft/70 text-ink-900"
                                    : "border-ink-900/25 text-ink-700 hover:border-ink-900/50",
                                )}
                              >
                                <input
                                  id={`${base}-mode-${mode.id}`}
                                  type="radio"
                                  name="mode"
                                  value={mode.id}
                                  checked={checked}
                                  onChange={update("mode")}
                                  disabled={submitting}
                                  required
                                  aria-describedby={
                                    errors.mode ? `${base}-mode-error` : undefined
                                  }
                                  className="sr-only"
                                />
                                <Icon
                                  aria-hidden="true"
                                  size={17}
                                  strokeWidth={1.75}
                                  className={cn(
                                    "shrink-0",
                                    checked ? "text-accent-text" : "text-ink-500",
                                  )}
                                />
                                <span className="font-semibold">
                                  {mode.label}
                                </span>
                                <span
                                  aria-hidden="true"
                                  className={cn(
                                    "ml-auto flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
                                    checked
                                      ? "border-ink-900"
                                      : "border-ink-900/40",
                                  )}
                                >
                                  {checked ? (
                                    <span className="h-2 w-2 rounded-full bg-ink-900" />
                                  ) : null}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                        {errors.mode ? (
                          <p
                            id={`${base}-mode-error`}
                            className="mt-2 text-small text-red-600"
                          >
                            {errors.mode}
                          </p>
                        ) : null}
                      </fieldset>
                    </fieldset>

                    {status === "error" ? (
                      <p
                        role="alert"
                        className="mt-6 flex items-start gap-2 rounded-xs border border-red-600/50 bg-red-600/10 p-3 text-small text-ink-900"
                      >
                        <AlertCircle
                          aria-hidden="true"
                          size={17}
                          strokeWidth={1.75}
                          className="mt-0.5 shrink-0 text-red-600"
                        />
                        {freightQuote.error}
                      </p>
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
                            <MessageCircle
                              aria-hidden="true"
                              size={17}
                              strokeWidth={1.75}
                            />
                          )
                        }
                        iconPosition="start"
                      >
                        {submitting ? "Sending" : "Request a quote"}
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
                        Send on WhatsApp
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
