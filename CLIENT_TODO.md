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

## Site-wide

These affect every page, not just Engineering.

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
