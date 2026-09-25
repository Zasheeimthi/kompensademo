# Kompensa Clean implementation

- Original design: index-before-clean.html. Active design: index.html.
- Source brand tokens inspected in original local CSS: #092c53 navy, #124e91 blue. Hosted reference was unavailable.
- Dark is default; Profile → Utseende offers System, Ljust and Mörkt. Selection persists in localStorage and System responds to OS changes.
- Semantic tokens cover surfaces, borders, copy, primary actions, focus and status colours. Both themes share components.
- Roboto UI, Poppins headings and Inconsolata identifiers load via Google Fonts with Arial/monospace fallbacks. Internet required for first font load.
- Current login, journey search, selection, ticket, expenses, review, cases, travel-card and profile flows retained. No real BankID or backend claim submission added.
- Desktop now uses a navigation rail and wider app shell; mobile retains bottom navigation.
- Decorative illustrations, gradients, lime accents and hover fill animations removed from the clean theme. Original assets remain embedded but hidden.
- Keyboard focus, wrapping, 44px action targets and reduced motion styles included. JavaScript syntax and theme persistence logic tested locally.
- Not a WCAG certification: browser visual testing, keyboard/screen-reader testing and a full contrast/spacing audit remain necessary.
- The brief's tables, charts, command palette and other components not present in this compensation demo were not added as artificial product features.
