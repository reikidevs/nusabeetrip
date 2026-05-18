# Brand colors and styles

The brand palette comes from the NusaBeeTrip logo and reflects the look of Nusa Penida: deep ocean blue, tropical orange (the "bee"), and crystal teal for water.

## Files

- `variables.css` — CSS custom properties for the palette (`--color-brand-blue-primary`, etc.)
- `components.css` — small set of component-level helpers (cards, buttons, badges)
- `utilities.css` — extra utility classes that aren't covered by Tailwind out of the box

## Usage

Most of the time, just use Tailwind classes:

```html
<button class="bg-brand-blue-800 text-white">Book a tour</button>
<div class="text-brand-orange-800">390,000 IDR</div>
```

The color scale is defined in `tailwind.config.js` so all `brand-blue-*`, `brand-orange-*`, `brand-teal-*`, `brand-green-*`, and `whatsapp-*` shades are available as standard Tailwind utilities.

For custom CSS, prefer the variables:

```css
.custom-cta {
  background: var(--color-brand-orange-primary);
  color: white;
}
```

## Conventions

- Primary nav and hero backgrounds: deep blue (`brand-blue-800`/`brand-blue-900`)
- Primary CTAs: orange (`brand-orange-800`)
- Secondary CTAs and accents: teal (`brand-teal-500`)
- WhatsApp buttons only: WhatsApp green (`whatsapp-500`/`whatsapp-600`)
- Avoid introducing new brand shades without updating the palette config.
