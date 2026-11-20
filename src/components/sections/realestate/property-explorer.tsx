"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, MessageCircle, RotateCcw } from "lucide-react";
import { useId, useMemo, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { PropertyCard } from "@/components/sections/realestate/property-card";
import {
  matchesPriceBand,
  priceBands,
  realEstatePage,
  sortOptions,
  type PriceBandValue,
  type PropertySort,
} from "@/content/real-estate";
import {
  compareNewest,
  propertyLocationLabel,
  propertyTypeLabels,
  type Property,
  type PropertyType,
} from "@/content/properties";
import { whatsappHref } from "@/config/site";
import { cn } from "@/lib/cn";
import { uiTransition } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const copy = realEstatePage.listings;

type TypeFilter = PropertyType | "all";
type LocationFilter = string;
type BandFilter = PriceBandValue | "any";

function sortProperties(list: Property[], sort: PropertySort): Property[] {
  const next = [...list];

  if (sort === "newest") return next.sort(compareNewest);

  return next.sort((a, b) => {
    if (a.price === null && b.price === null) return compareNewest(a, b);
    if (a.price === null) return 1;
    if (b.price === null) return -1;
    return sort === "price-asc" ? a.price - b.price : b.price - a.price;
  });
}

const selectClass =
  "h-11 w-full appearance-none rounded-xs border border-ink-900/20 bg-white px-3 pr-9 text-small text-ink-900 transition-colors duration-200 hover:border-ink-900/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text";

function FilterSelect({
  id,
  label,
  value,
  onChange,
  children,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-micro font-semibold uppercase text-ink-500"
      >
        {label}
      </label>
      <div className="relative mt-2">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={selectClass}
        >
          {children}
        </select>
        <ChevronDown
          aria-hidden="true"
          size={16}
          strokeWidth={1.75}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-500"
        />
      </div>
    </div>
  );
}

/**
 * Filter and sort the listings. The data arrives already narrowed to the
 * records the grid may show (sold records are dropped on the server), so this
 * component never has to know about the hidden state.
 */
export function PropertyExplorer({
  properties,
}: {
  properties: readonly Property[];
}) {
  const base = useId();
  const reduceMotion = usePrefersReducedMotion();

  const [type, setType] = useState<TypeFilter>("all");
  const [location, setLocation] = useState<LocationFilter>("all");
  const [band, setBand] = useState<BandFilter>("any");
  const [sort, setSort] = useState<PropertySort>("newest");

  const typeOptions = useMemo(
    () =>
      (Object.keys(propertyTypeLabels) as PropertyType[]).filter((entry) =>
        properties.some((property) => property.type === entry),
      ),
    [properties],
  );

  const locationOptions = useMemo(
    () =>
      [...new Set(properties.map((property) => propertyLocationLabel(property)))],
    [properties],
  );

  const visible = useMemo(() => {
    const filtered = properties.filter(
      (property) =>
        (type === "all" || property.type === type) &&
        (location === "all" ||
          propertyLocationLabel(property) === location) &&
        matchesPriceBand(property, band),
    );

    return sortProperties(filtered, sort);
  }, [properties, type, location, band, sort]);

  const dirty =
    type !== "all" || location !== "all" || band !== "any" || sort !== "newest";

  const reset = () => {
    setType("all");
    setLocation("all");
    setBand("any");
    setSort("newest");
  };

  const empty = properties.length === 0;

  return (
    <div>
      <div className="mt-10 rounded-md border border-line bg-[var(--surface-raised)] p-4 sm:p-5">
        <fieldset className="min-w-0">
          <legend className="sr-only">{copy.filters.legend}</legend>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <FilterSelect
              id={`${base}-type`}
              label={copy.filters.type}
              value={type}
              onChange={(value) => setType(value as TypeFilter)}
            >
              <option value="all">{copy.filters.allTypes}</option>
              {typeOptions.map((entry) => (
                <option key={entry} value={entry}>
                  {propertyTypeLabels[entry]}
                </option>
              ))}
            </FilterSelect>

            <FilterSelect
              id={`${base}-location`}
              label={copy.filters.location}
              value={location}
              onChange={setLocation}
            >
              <option value="all">{copy.filters.allLocations}</option>
              {locationOptions.map((entry) => (
                <option key={entry} value={entry}>
                  {entry}
                </option>
              ))}
            </FilterSelect>

            <FilterSelect
              id={`${base}-price`}
              label={copy.filters.price}
              value={band}
              onChange={(value) => setBand(value as BandFilter)}
            >
              <option value="any">{copy.filters.anyPrice}</option>
              {priceBands.map((entry) => (
                <option key={entry.value} value={entry.value}>
                  {entry.label}
                </option>
              ))}
            </FilterSelect>

            <FilterSelect
              id={`${base}-sort`}
              label={copy.filters.sort}
              value={sort}
              onChange={(value) => setSort(value as PropertySort)}
            >
              {sortOptions.map((entry) => (
                <option key={entry.value} value={entry.value}>
                  {entry.label}
                </option>
              ))}
            </FilterSelect>
          </div>
        </fieldset>

        <div className="mt-4 flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="text-small font-semibold tabular-nums text-ink-900"
          >
            {copy.filters.count(visible.length, properties.length)}
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <p className="text-[0.8125rem] text-ink-500">
              {copy.filters.priceNote}
            </p>

            <button
              type="button"
              onClick={reset}
              disabled={!dirty}
              className={cn(
                "inline-flex items-center gap-1.5 text-small font-semibold underline-offset-4 transition-opacity duration-200",
                dirty
                  ? "text-accent-text hover:underline"
                  : "cursor-default text-ink-500/50",
              )}
            >
              <RotateCcw aria-hidden="true" size={14} strokeWidth={1.75} />
              {copy.filters.reset}
            </button>
          </div>
        </div>
      </div>

      {visible.length > 0 ? (
        <motion.ul
          layout
          className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((property, index) => (
              <motion.li
                key={property.id}
                layout
                initial={false}
                animate={{ opacity: 1 }}
                exit={
                  reduceMotion
                    ? { opacity: 0, transition: { duration: 0 } }
                    : { opacity: 0, scale: 0.98 }
                }
                transition={uiTransition}
                className="h-full"
              >
                <Reveal
                  delay={Math.min(index, 5) * 0.06}
                  className="h-full"
                >
                  <PropertyCard property={property} />
                </Reveal>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      ) : (
        <div className="mt-8 rounded-md border border-line bg-sky-100 p-8 text-center sm:p-10">
          <h3 className="font-display text-title text-ink-900">
            {empty ? copy.emptyAll.heading : copy.emptyFiltered.heading}
          </h3>
          <p className="mx-auto mt-3 max-w-[44ch] text-small text-ink-700">
            {empty ? copy.emptyAll.body : copy.emptyFiltered.body}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button
              href={whatsappHref(copy.emptyMessage)}
              external
              variant="primary"
              icon={
                <MessageCircle
                  aria-hidden="true"
                  size={17}
                  strokeWidth={1.75}
                />
              }
              iconPosition="start"
            >
              {copy.emptyCta}
            </Button>
            {dirty ? (
              <Button
                onClick={reset}
                variant="ghost"
                className="border-ink-900/30 text-ink-900 hover:border-ink-900/60 hover:bg-ink-900/5"
              >
                {copy.emptyReset}
              </Button>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
