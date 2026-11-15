import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <div className="flex min-h-[60svh] items-center pt-[var(--header-h)]">
      <Container>
        <div role="status" aria-live="polite" className="max-w-[24rem]">
          <span className="sr-only">Loading page</span>
          <span
            aria-hidden="true"
            className="block h-px w-full overflow-hidden bg-ink-900/15"
          >
            <span className="block h-px w-1/3 animate-[loading_1.1s_var(--ease-soft)_infinite] bg-accent motion-reduce:animate-none" />
          </span>
          <p
            aria-hidden="true"
            className="mt-4 text-micro uppercase text-ink-500"
          >
            JCNL
          </p>
        </div>
      </Container>
    </div>
  );
}
