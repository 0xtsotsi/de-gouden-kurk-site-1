# Controle De Gouden Kurk

## Uitgevoerd
- `npm run check`: geslaagd voor `script.js`, `products.js` en `server.js`.
- `npm test`: 5 tests geslaagd, inclusief homepage, module, verborgen projectbestanden, HTTP-methodecontrole, unieke productrecords en deterministische sortering.
- HTTP-controle op `http://localhost:4173/`: 200.
- Broncontrole: alle lokale bestanden, productafbeeldingen, fonts en gebruikte IDs bestaan.
- Inhoudscontrole: geen analytics, geen externe runtime-assets, geen `transition: all`, geen em dash in UI-copy.
- Contrastmeting met OKLCH naar sRGB-conversie: inkt op papier 15,26:1, secundaire tekst op papier 7,49:1, papier op diepe wijn 13,61:1, messing op diepe wijn 7,91:1, inkt op messing 8,87:1, focus op papier 5,70:1.
- Gerenderde controles: desktop 1440, mobiel 390, smalle viewport 320, leeftijdvenster, filters, zoekresultaat, winkelmand, afrekenen, beeldcredits, lokale kaart en het schenkmoment tijdens en na de animatie.
- Typografiecontrole: Bricolage Grotesque en Instrument Sans worden lokaal geladen; de Instrument Serif-proef is verwijderd.
- Motioncontrole: één schenkmoment, 3,6 seconden, geen lus, gekoppeld aan het sluiten van de leeftijdpoort en met een statische reduced-motion-eindstand.
- Micro-interacties: mandbadge, toast, productbevestiging, filterindicator en knopdruk gebruiken uitsluitend korte statusfeedback; geen kaart- of fotobeweging.

## Rendered rubric
- Briefspecificiteit 2/2, informatiehiërarchie 2/2, compositie 2/2, consistentie en flow 2/2.
- Typografie 2/2, materiaallogica 2/2, statecompleteness 2/2, responsive gedrag 2/2.
- Toegankelijkheid 1/2, motiondoel 2/2, contentauthenticiteit 2/2, visuele eigenheid 2/2.
- Totaal: 23/24.

## Nog te verifiëren vóór livegang
- Handmatige WCAG 2.2 AA-criteriematrix, schermlezers en toetsenbordcombinaties per browser.
- Werkelijke 200%-tekstzoom, geforceerde kleuren en ondersteunde browser-/apparaatmatrix.
- Betrouwbare leeftijdsverificatie bij afhalen en bezorgen.
- Werkelijke voorraad, verkoopprijzen, openingstijden, bezorggebied, bezorgkosten en levervoorwaarden.
- Privacyverklaring, algemene voorwaarden, e-mail-, betaal- en voorraadsysteem.
- Een volledige product- en transactie-integratietest in de uiteindelijke webshopomgeving.
