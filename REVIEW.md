# Beoordeling van De Gouden Kurk

## Uitgangspunt
De gebruiker gaf de eerste versie 5,5/10. Een onafhankelijke read-only review van de code en render gaf 6,4/10: de eigen merkrichting was sterk, maar nepflessen, onvolledige webshopfuncties en enkele mobiele en toegankelijkheidsfouten beperkten de indruk.

## Belangrijkste oorspronkelijke bevindingen
1. De CSS-flessen oogden illustratief en ontsloegen de belangrijkste producten.
2. Zoeken, filters, categorieën, sorteeropties en checkout waren niet compleet genoeg voor een webshop.
3. De kaart en sommige kleine navigatiedetails waren niet aantoonbaar correct of volledig.
4. De winkelmand miste een besteloverzicht, eenheidsprijs en een duidelijke flowstatus.
5. De leeftijdscontrole miste de wettelijke koppeling tussen aankoop en aflevering.
6. Er ontbraken beeldcredits, een no-script route en een explicietere reviewstatus.

## Uitgevoerde verbeteringen
- Twaalf echte, correct herkende flesfoto’s met bron, maker en licentie.
- De echte winkelafbeelding als herkenbaar lokaal ankerpunt, met rights-check in credits.
- Zoeken, negen categoriefilters, sortering, lege staat en winkelmandstatus.
- Volledige checkout met afhalen of bezorgen, adresvalidatie, besteloverzicht en subtotaal.
- Leeftijdcontrole bij aankoop én aflevering, met verwijzing naar de actuele Alcoholwet en het Alcoholbesluit.
- Een lokale OpenStreetMap-kaart op de geverifieerde coördinaten, met correcte attributie.
- Lokale lettertypen, geen analytics, geen externe runtime-assets en een strikte Content Security Policy.
- Een eenmalig, verfijnd schenkmoment van 3,6 seconden in de winkelafbeelding, met een eenvoudig getekende fles, een statische eindstand en een directe reduced-motion-route.
- Discrete statusreacties voor winkelmand, toasts, filters, bevestiging en knopdruk, zonder bewegende kaarten of productfoto’s.
- ESM, expliciete app-state, gevalideerde opslag, deterministische sortering en regressietests.

## Nieuwe beoordeling
De derde versie scoort **9,1/10 als statische webshopconcept**. De typografie blijft bewust Bricolage Grotesque plus Instrument Sans: een Instrument Serif-proef oogde volwassener, maar paste minder goed bij het uitgesproken, kleurrijke karakter. De winst komt nu vooral uit het ene georkestreerde schenkmoment, terwijl de rustige productcatalogus en duidelijke bestelroute intact blijven.

| Onderdeel | Eerste versie | Tweede versie | Derde versie |
| --- | ---: | ---: | ---: |
| Merkidentiteit en eigen stijl | 8,5 | 9,2 | 9,4 |
| Productbeeld en vertrouwen | 4,0 | 8,8 | 9,0 |
| Webshopfunctie | 5,5 | 8,5 | 8,8 |
| Mobiele ervaring | 6,5 | 8,8 | 9,0 |
| Toegankelijkheid en juridische heldere taal | 6,0 | 8,0 | 8,2 |
| Inhoud en relevantie | 7,5 | 9,0 | 9,2 |
| Technische kwaliteit en prestaties | 7,0 | 8,8 | 9,0 |
| Gemiddelde | 6,4 | 8,7 | 9,1 |

De gemiddelde weegt de onderhoudbaarheid, snelheid en kwaliteit van de implementatie mee. De nog ontbrekende productfeed, betalingen en echte leeftijdsverificatie drukken een productieklare score verder omlaag.

## Nog open vóór een echte webshop
- Eigen of expliciet gekochte rechten op alle beelden, met name de Rodi-publicatieafbeelding.
- Live voorraad, verkoopprijzen, openingstijden, bezorgregels en btw-correcte bedragen.
- Aangesloten zoek, winkelmand, betaling, orderbevestiging en e-mailprovider.
- Gecertificeerde leeftijdsverificatie bij aankoop en bij aflevering.
- Privacyverklaring, cookiebeleid, algemene voorwaarden en levervoorwaarden.
- Handmatige WCAG 2.2 AA-matrix, schermlezertests en een echte browser-/apparaatmatrix.
- Een hogere-resolutie, uniforme set geleverde productfoto's.

De huidige preview is visueel en functioneel sterk, maar bewust geen productiewebshop.
