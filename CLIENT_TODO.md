# Client to provide

Open items where the site needs a fact only the client can supply. Each entry
below appears on the live page as a visible `[CLIENT TO PROVIDE]` marker, so
nothing is presented as finished copy.

Mark an item done by supplying the fact, then removing the matching marker from
the page. Do not replace a marker with an estimate.

---

## Engineering page (`/engineering`)

The page is built from one client statement: JCNL undertakes civil engineering
works, construction, facility service management, and design and operational
training, for the Energy, Transport and Construction sectors. Everything below
is detail a buyer would expect but which has not been supplied.

### Capabilities

- [ ] Civil Engineering Works: the scope and packages JCNL actually offers.
- [ ] Construction: the scope and packages JCNL actually offers.
- [ ] Facility Service Management: the scope and packages JCNL actually offers.
- [ ] Design & Operational Training: the scope and packages JCNL actually offers.

### Sectors

- [ ] Named references or completed works in Energy.
- [ ] Named references or completed works in Transport.
- [ ] Named references or completed works in Construction.
- [ ] Permission to name any client, and the wording they will approve.

### Project records (six slots)

For each slot, supply all five fields. A record without a photograph can stay
empty rather than use a stock image.

- [ ] Project 1: photograph, name, sector, year, scope.
- [ ] Project 2: photograph, name, sector, year, scope.
- [ ] Project 3: photograph, name, sector, year, scope.
- [ ] Project 4: photograph, name, sector, year, scope.
- [ ] Project 5: photograph, name, sector, year, scope.
- [ ] Project 6: photograph, name, sector, year, scope.

### Company detail

- [ ] Certifications and professional registrations, with the issuing body and
      registration number for each.
- [ ] Plant and equipment register, if JCNL wants equipment listed.
- [ ] Headcount, or the size of the engineering team, if it should be public.

### Imagery

Hero photographs, 1920×1080, one per slide. Place the file at the path shown and
the page picks it up with no code change.

- [ ] `public/images/engineering/construction-site.jpg` — construction site.
- [ ] `public/images/engineering/civil-works.jpg` — civil works.
- [ ] `public/images/engineering/facility-management.jpg` — facility
      management.
- [ ] `public/images/engineering/power-infrastructure.jpg` — power and energy
      infrastructure.
- [ ] `public/images/engineering/building-retrofit.jpg` — building retrofit.

Portfolio photographs go under `public/images/engineering/projects/`, slots
`project-01.jpg` to `project-06.jpg`, 1600×1200.

---

## Real Estate page (`/real-estate`)

The page ships with six **sample** listings so the grid, filters, gallery and
detail route can be reviewed. Every sample is marked on the card and the detail
page, is excluded from the sitemap and the structured data, and its page is
`noindex`. No address, price, size, developer, estate or title document has been
invented. Replace a sample in `src/content/properties.ts` and set
`isPlaceholder: false` to publish it; the guide is in `README.md`.

### Each listing

Supply all of the following for one property, or keep the record as a sample.
The field names match `src/content/properties.ts`.

- [ ] `title` — how the property should be named publicly.
- [ ] `status` — available, under offer, or sold.
- [ ] `type` — land, residential, commercial, estate, or other.
- [ ] `location` — area, city and state, as it should read on the card.
- [ ] `price` — in naira, or confirm that it is "Price on request".
- [ ] `sizeSqm` — the plot or floor area, and whether it is one or the other.
- [ ] `bedrooms` and `bathrooms`, where the property has them.
- [ ] `titleDocument` — the exact document name (for example "C of O") and
      confirmation that it can be published.
- [ ] `summary` and `description` — the wording JCNL wants to publish, or
      approval of the wording supplied with the record.
- [ ] `features` — the list of features the seller will stand behind.
- [ ] `listedAt` — the date the property went on the market.
- [ ] Photographs: three frames per listing under
      `public/images/real-estate/<slug>-1.jpg` to `-3.jpg`, 1600×1067.
- [ ] `isPlaceholder: false` — only once everything above is confirmed.

The six sample records to replace: `residential-property`, `commercial-plot`,
`estate-land`, `terrace-house`, `mixed-use-building`, `residential-land`.

### Page-level questions

- [ ] Is JCNL acting as the seller or as an agent for these properties? The
      page currently says only "JCNL lists land, homes and commercial space for
      sale" and confirms nothing on the client's behalf.
- [ ] Are the price bands (under ₦50m, ₦50m–₦150m, ₦150m and above) the right
      split for the real inventory?
- [ ] Should sold listings stay visible on the page? They are currently hidden
      from the grid, the similar listings, the sitemap and the structured data,
      but remain reachable at their URL.
- [ ] Confirm the "How buying works" steps, especially how viewings are arranged
      and who holds the documents during a transaction.
- [ ] Confirm the wording "Availability, pricing and documentation are confirmed
      with our team before any commitment", or supply the sentence the company
      prefers.
- [ ] Supply any disclaimer the company's lawyer requires on listings.

### Imagery

- [x] Hero photographs supplied on 17 November 2026: `residential-exterior.jpg`,
      `land-aerial.jpg`, `modern-home.jpg`, `commercial-building.jpg`,
      `living-space.jpg`, `neighbourhood-street.jpg`.
- [ ] Re-export those six at 1920×1080. Four arrived at 1280×853,
      `land-aerial.jpg` at 1280×719 and `residential-exterior.jpg` at 1280×1707,
      so a wide hero upsamples them and the portrait file crops hard.
- [ ] Do not photograph a property until the owner has agreed to it being listed
      publicly, including any neighbouring plot or building in the frame.

---

## Site-wide

These affect every page, not just Engineering.

### Brand assets

- [x] Logo supplied in three colourways at `public/logos/`. The cream and black
      exports arrived flattened onto a checkerboard (no alpha channel), so the
      site uses transparent derivatives built from `white-logo.png`. Please send
      clean transparent exports of the cream and black artwork to replace them.
- [ ] Favicon / Apple touch icon: the current four are drawn from a `J` mark and
      the wordmark, not from the supplied logo. Confirm whether to regenerate
      them from the logo mark.
- [ ] Confirm the registered name, the acronym and the descriptor wording. The
      site uses "JESRUDEB@CONNECT NIGERIA LIMITED", "JCNL" and "A LOGISTICS &
      BUSINESS SERVICES COMPANY", and the tagline "EVOLVE – INNOVATE – RELAX".

### Photography

Every slot has a fixed path and a branded placeholder, so a missing file never
breaks a page. The full list with dimensions and framing rules is in
`public/images/README.md`.

- [ ] The service-line hero photographs on `/about`, `/business-services`,
      `/cargo-and-freight` and `/integrated-farms`, and the gallery and product
      frames on `/visa-and-tours`. The six files for the home hero have been
      supplied and are in place.
- [ ] Confirm the source and credit for the six home hero photographs already
      in `public/images/home/`. They arrived without a licence note.
- [ ] Written permission to use each photograph that shows an identifiable
      person, a named property or a third-party brand.
- [ ] A credit line or licence note for every file that is not JCNL's own. Record
      it in `public/images/CREDITS.md`.

### Contact channels

- [ ] Confirm which email addresses are current. The site currently shows
      `info.services@jesrudebconnect.org` as the main address and lists
      `info.jcnl@gmail.com` and `jesrudeb.connect@gmail.com` for cargo.
- [ ] Confirm which phone numbers are current. The site currently shows
      `+234-803-469-0000` for calls and `+234-816-082-6809` for calls and
      WhatsApp.
- [ ] Confirm the canonical domain. The site currently assumes
      `https://jesrudebconnect.org` through `NEXT_PUBLIC_SITE_URL`.
- [ ] Confirm the inbox that should receive contact-form messages, and pick an
      email provider. Until both are supplied, `/api/contact` validates each
      submission and acknowledges it without sending anything.
