# Kompensa: mobile flow review and redesign

Reviewed 24 September 2026. Inputs: the 18 supplied screenshots, the public and signed-in Kompensa experience, and the design guidance linked below. The live review confirmed email sign-in, the signed-in home, profile navigation and claims navigation. The supplied screenshots provided the detailed ticket, expense, submission and period-card flows. No real claim was submitted or account information changed.

## Main finding

The product already has a sensible core sequence. The redesign should reduce the effort of navigating and understanding that sequence, rather than replace the underlying compensation process. The strongest opportunity is to make the mobile app feel like a focused task: find a journey, provide relevant evidence, review, and follow the outcome.

## Current experience and proposed changes

| Observed in the supplied screens | Proposed change | Intended benefit |
| --- | --- | --- |
| A marketing-style home precedes the task | Signed-in home with one prominent journey search action | Returning travellers start immediately |
| Main destinations sit behind a menu | Persistent Home, Claims, Cards and Profile navigation | More discoverable everyday actions |
| Three vertically stacked steps consume substantial space | Compact three-segment progress indicator after journey selection | More room for the current task |
| A no-results message leads into a small manual form | Explicit missing-journey state and a dedicated manual entry screen | Clear recovery without implying ineligibility |
| Ticket choices reveal different content | Two large choices with conditional fields and a saved-card summary | Preserve the useful logic and clarify selection |
| Expenses require a separate illustrated introduction | Concise optional expense step with a receipt sheet | Reduce scrolling while keeping skip explicit |
| Personal and bank data appear in dense two-column blocks | Grouped review cards with change actions and masked payout details | Easier checking and correction |
| Success says an application was sent, with little process detail | Reference, next steps and a direct tracking action | Clearer handover |
| Cases primarily show a status badge and raw details | Plain-language status and an ordered timeline | Explain progress and the responsible party |
| Colours, type sizes and controls vary | Shared navy/lime palette, spacing, rounded surfaces and consistent buttons | A coherent mobile product identity |

These are design hypotheses based on inspection, not measured improvements. Validate them with representative travellers, including occasional users, commuters and people using larger text.

## Proposed user journey

**Signed-in home → Journey search → Departure selection → 1. Ticket → 2. Optional expenses → 3. Review → Confirmation → Claim timeline**

Branches:

- Search cannot locate departure → manual journey entry → ticket.
- Single ticket → ticket reference, price and evidence.
- Period card → reuse saved card or add a card.
- Expenses → category, total cost and receipts; alternatively skip.
- Review → edit the relevant section → return to review.
- Cases → active or completed claims → details and timeline.
- Profile → personal and payout details; cards remain accessible separately.

The three-step progress indicator covers the application itself. Journey discovery happens before those three steps; the complete end-to-end journey is longer than three screens.

## Visual direction

Retain recognisable blue as the foundation. Add a bright lime action colour, lighter neutral backgrounds and stronger type hierarchy. The product should feel calm, direct and approachable rather than like a long administrative form. Use simple line icons, short copy and clear status labels. The desktop frame and English notes are presentation aids; they disappear at mobile sizes.

## Research informing the flow

- [Nielsen Norman Group — Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/): defer secondary options until they are needed. Applied here to conditional ticket fields and optional expense entry.
- [GOV.UK Design System — Question pages](https://design-system.service.gov.uk/patterns/question-pages/): structure a service around focused questions. Applied here to the separation of journey, evidence and review tasks.
- [GOV.UK Design System — Check answers](https://design-system.service.gov.uk/patterns/check-answers/): provide a review step with ways to change answers before submission. Applied here to the grouped, editable summary.
- [Kompensa](https://kompensa.se/): source for the current product context and flow. Its public copy describes a free application service, operator review and operator-paid compensation. These product claims were not independently audited.

No compensation percentage or promised payout is calculated in the demo. Eligibility and reimbursement depend on the actual journey, applicable rules and operator assessment. The existing site's operator messaging also merits a product-content check: its logo strip and FAQ support list do not enumerate the same operators. The prototype uses illustrative operator choices rather than asserting a verified support list.

## Validation performed

- Opened the standalone HTML through a local preview.
- Checked the desktop composition and mobile presentation at 390 px, plus control overflow at 320 px.
- Completed the single-ticket path using a demo attachment, added a sample receipt, reviewed, submitted and opened tracking.
- Completed the missing-journey/manual-entry path with a saved period card and skipped expenses.
- Edited a period card and personal details; exercised simulated BankID sign-in. Checked JavaScript syntax and observed no browser console errors in the tested flows.

## Recommended next validation

Ask five representative users to complete a single-ticket claim, a period-card claim and a no-results recovery task. Record completion, errors, abandonment and time on task. Confirm that they understand an application is subject to operator assessment. Then test screen-reader order, enlarged text, contrast, keyboard navigation and small-screen layouts across the finished app.
