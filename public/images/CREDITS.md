# Image credits

## Current state

Twelve of the 46 hero slots are filled: the six `/` slides in `home/` and the
six `/real-estate` slides. They were supplied by the client on 17 November 2026,
with no licence note and no stated source. **They are committed as client
property, but the source still has to be confirmed before launch.** The real
estate files arrived at 1280px, one of them portrait, rather than the 1920×1080
the shot list asks for; they are usable now and should be re-exported. The
remaining 34 hero slots, the 18 real-estate listing frames, the engineering
project records, the `/visa-and-tours` gallery frames and `styleguide/sample.jpg`
are empty and render the `<SmartImage>` placeholder. The placeholder is generated
in code (page-accent gradient, lattice pattern, shot label) from
`src/content/images.ts`; it is not an image file.

`og/default.jpg` (1200×630), the favicon, the Apple touch icon and the manifest
icons are original brand assets drawn for this site from the client's colours
and wordmark. They carry no third-party licence.

### Files in use

| File | Subject | Source | Licence |
|---|---|---|---|
| `home/obudu-mountain-resort.jpg` | Obudu cable car, Cross River State | Client-supplied 17 Nov 2026, source to confirm | Client property, unconfirmed |
| `home/yankari-game-reserve.jpg` | Yankari Game Reserve, Bauchi State | Client-supplied 17 Nov 2026, source to confirm | Client property, unconfirmed |
| `home/la-campagne-tropicana.jpg` | La Campagne Tropicana beach huts | Client-supplied 17 Nov 2026, source to confirm | Client property, unconfirmed |
| `home/lagos-city-tour.jpg` | Lagos Island waterfront | Client-supplied 17 Nov 2026, source to confirm | Client property, unconfirmed |
| `home/tropical-beach-aerial.jpg` | Atlantic beach from the air | Client-supplied 17 Nov 2026, source to confirm | Client property, unconfirmed |
| `home/safari-wildlife.jpg` | Safari wildlife at first light | Client-supplied 17 Nov 2026, source to confirm | Client property, unconfirmed |
| `real-estate/residential-exterior.jpg` | Residential estate exterior | Client-supplied 17 Nov 2026, source to confirm | Client property, unconfirmed |
| `real-estate/land-aerial.jpg` | Aerial view of land and plots | Client-supplied 17 Nov 2026, source to confirm | Client property, unconfirmed |
| `real-estate/modern-home.jpg` | Modern home exterior | Client-supplied 17 Nov 2026, source to confirm | Client property, unconfirmed |
| `real-estate/commercial-building.jpg` | Commercial building exterior | Client-supplied 17 Nov 2026, source to confirm | Client property, unconfirmed |
| `real-estate/living-space.jpg` | Interior living space | Client-supplied 17 Nov 2026, source to confirm | Client property, unconfirmed |
| `real-estate/neighbourhood-street.jpg` | Neighbourhood street scene | Client-supplied 17 Nov 2026, source to confirm | Client property, unconfirmed |
| `../logos/cream-logo-transparent.png` | JCNL logo, cream | Derived from the alpha of the client's `white-logo.png`; originals untouched | Client property |
| `../logos/black-logo-transparent.png` | JCNL logo, ink | Derived from the alpha of the client's `white-logo.png`; originals untouched | Client property |



The full shot list — filename, dimensions, aspect ratio and subject for each
slot — is in [`README.md`](./README.md). Five of the `/visa-and-tours` files are
also used in the page body (product frames and the gallery), so they need the
wider release a non-hero placement implies.

## When images arrive

Record every file here, in the same order as the shot list. A slot with no entry
in this file is a slot the client has not cleared for publication.

Prefer, in order:

1. **Client-supplied photography.** JCNL owns it. Note that it was supplied by
   the client and the date received.
2. **Unsplash or Pexels.** Their licences do not require attribution, but credit
   the photographer anyway: it is the honest default, and it makes a later
   licence question answerable.
3. **Wikimedia Commons.** Attribution and share-alike terms must be reproduced
   here exactly as the file page states them.

Template:

```
<file> — <subject>
Source: <URL>
Photographer: <name>
Licence: <name + URL>
Modifications: <crop, colour grade, etc.>
```

## Rules

- No stock image may imply that a pictured place, project, vehicle, farm or
  office belongs to JCNL. Captions and alt text describe the subject, not
  ownership.
- No image of a person may be used without a release if they are identifiable
  and the use suggests endorsement.
- Do not substitute a competitor's or another company's premises for a JCNL
  office. If the real location is not photographed, the placeholder is the
  correct state.
- Keep this file in step with `public/images/README.md`: a file with no credit
  line is not ready to publish.

## Client marks

The logo files in `public/logos/` are the property of JESRUDEB@CONNECT NIGERIA
LIMITED and are used only in the site header, mobile menu, footer, JSON-LD and
the social share card. They are not licensed to third parties.

The client's `cream-logo.png` and `black-logo.png` arrived with a checkerboard
baked into the pixels and no alpha channel. The `*-transparent.png` files were
derived from the alpha of `white-logo.png` and are the files the site uses. The
originals are preserved unchanged.
