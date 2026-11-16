# Image credits

## Current state

No photography has been sourced yet. The site ships with **40 hero slots and
three brand slots, all empty**, and every one of them renders the `<SmartImage>`
placeholder. The placeholder is generated in code (page-accent gradient, lattice
pattern, shot label) from `src/content/images.ts`; it is not an image file. No
third-party assets are in use, so nothing on the site currently needs
attribution.

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

`logo.png` (when supplied) is the property of JESRUDEB@CONNECT NIGERIA LIMITED
and is used only in the site header, the footer and the social share card. It is
not licensed to third parties.
