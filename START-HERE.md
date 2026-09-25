# Kompensa mobile concept

Open **kompensa-demo.html** in Chrome, Edge or Safari. It is a single, self-contained HTML file: no installation, build step or internet connection is needed. Send that file to your client to let them explore it independently.

On a wide desktop window, the app appears in a phone frame with English presenter notes and shortcuts on the right. On a phone or narrow window, it fills the screen. The app itself is in Swedish, matching the current product.

## A three-minute client walkthrough

1. **Home:** explain the single prominent search action, accessible bottom navigation and current claim status.
2. Choose **Sök en försenad resa**, then **Hitta min resa**. The route and date are prefilled for convenience. Choose the first departure.
3. Select **Enkelbiljett**, then **Använd en exempelbiljett i demon**. This fills a sample ticket reference and marks a demo attachment. Select **Fortsätt**.
4. Choose **Lägg till utlägg**, **Använd ett exempelkvitto**, then **Spara utlägg**. The 125 kr food expense appears in the claim.
5. Choose **Fortsätt till granskning**. Show the editable journey, ticket, expenses and payout summary. Tick the confirmation checkbox and select **Skicka ansökan**.
6. Show the success state, then **Följ mitt ärende** to demonstrate the timeline.

## Other paths to demonstrate

- **Period card:** switch to Periodkort during the ticket step and use the saved card. Skip expenses to show the shorter returning-user journey.
- **Missing journey:** from results, select **Hittar du inte din avgång?**, then add the departure manually.
- **Cards:** add, edit or remove the demo card. This prototype stores one card; adding another replaces it, as explained in the form.
- **Profile:** edit sample personal or payout details. Changes appear in the review summary.
- **Closed claims:** open Ärenden → Avslutade to view an example paid claim.
- **Sign-in:** choose Explore sign-in in the desktop presenter panel, or Profil → Visa inloggning on mobile. Both BankID and email paths are simulations.

Use **Reset demo**, **Börja om**, or refresh the page to return to the initial state.

## What this demo does

It demonstrates responsive screen layouts, navigation, conditional ticket fields, basic validation, local file selection, optional expenses, editable details, simulated submission and status tracking. A receipt or ticket selected from the device is represented by its filename only; the file is not read, uploaded or sent. The sample-attachment buttons allow a presentation without choosing any files.

All dates, journeys, people, claim statuses and amounts are fictional examples. Search returns no eligible departures for the Göteborg/Gothenburg–Uppsala demo route and two illustrative departures for other routes; it does not query live trains. State exists only in memory and disappears on refresh. The submitted demo claim is the latest sample claim, rather than a durable claim history. No credentials from the existing website are included.

## Before production

Connect real train search, operator eligibility rules, authentication/BankID, secure uploads, profile storage, operator submission, notifications and payout status. Validate document requirements and any consent or authority wording with the product owner. Complete accessibility, security and usability testing on real devices. The supplied official Kompensa SVG logo is embedded in the demo.

This deliverable is a presentation prototype, not a deployed or production-integrated application.

## Typography update

Comfortaa is embedded in the HTML for offline use, with its open-source license included. Form fields now use inset labels, aligned leading icons, currency suffixes, consistent spacing, and visible focus and invalid states. Desktop, 390 px mobile and 320 px narrow-screen layouts were checked.

The supplied logo replaces the concept wordmark. The simulated status bar is removed. Upload buttons are centered, dialogs use bottom sheets, and dropdowns have styled, keyboard-operable option lists.

The demo opens on the illustrated login screen. Choose either BankID option, then Simulera inloggning to enter. The custom train-and-compensation artwork is embedded for offline viewing.

## Apply anyway: no eligible departures

1. Open journey search and choose **Prova Göteborg C → Uppsala C**, then **Hitta min resa**.
2. The demo shows **0 avgångar kan ge ersättning**. Choose **Fortsätt till ansökan**.
3. In the bottom sheet, enter departure time and choose an operator. Select **Ansök om kompensation**.
4. Complete ticket details, choose how the journey was completed, and attach a ticket copy (or use the example).
5. For VR, the demonstrated live form offered Periodkort. Add a matching VR period card with its number and validity. The other operator examples retain the prototype's single-ticket/period-card choices; their full operator-specific rules were not verified.
6. Add or skip expenses, review, confirm, and submit the demo application. The route and travel method appear in tracking.

The Göteborg–Uppsala outcome is deliberately simulated for presentation, not a statement about real train eligibility. The live linked VR form was inspected without submitting a real claim. Its five travel methods were reproduced with corrected Swedish spelling: delayed train, replacement transport, own car, taxi, and other transport.

Uploaded ticket and receipt entries now include Byt fil (replace) and Ta bort (delete). Saved expenses can be reopened using Ändra utlägg / kvitton. Removing all receipts requires adding a replacement before saving; canceling the editor keeps the original saved expense.


September 25 update: manual applications include purchase type, ticket number, one-way/return scope and passenger count. Details carry into review and claim tracking. Highlighted journey cards appear in the fallback sheet, ticket and review screens. The provided screenshots were used because the live application URL returned a blank page. Operator-specific conditional rules beyond the screenshots still require production verification.
