# AI-Assisted UI Customization and Design — A7

## Goal and prompt engineering

The Week 13 brief asks for an API route `POST /api/ai/design-suggestion` that returns a color scheme, font pairing, and one layout improvement; a React button that displays the response; at least one applied design change using global CSS variables; and a critical evaluation of accepted/rejected ideas.

The implementation asks for JSON-only output with keys `colors` (`primary`, `secondary`, `background`), `fonts` (`heading`, `body`), and `layoutTip`. The backend uses JSON response mode, parses and validates the response, and provides a labeled fallback when the AI is not configured or the response fails. Only the app description is sent to the model.

## Evaluation table

| AI Suggestion | Accepted? | Reason |
|---|---|---|
| Color scheme | **Accepted with review** | The indigo primary, pale secondary, and near-white background create a clear hierarchy and are applied as global CSS custom properties. A developer must still check the actual text/background contrast for every component and state before claiming accessibility. |
| Font pairing | **Partially accepted** | Manrope is used for headings and DM Sans/Inter-style sans-serif for body text. A remote font import may fail offline, so system fallbacks are retained. The final pairing should be checked for readability and loading impact. |
| Layout improvement | **Accepted** | The task composer, summary cards, filters, and task list are grouped into distinct sections. This makes the next action easier to find and keeps the design responsive on small screens. |

These are the design decisions implemented in this repository, not a claim that a live model returned the exact values during a test run. The UI displays whether a suggestion came from AI or the local fallback.

## Responsible AI review

AI output is a proposal, not an authority. If an AI suggests colors with an inaccessible contrast ratio and the developer applies them without checking, users with low vision or color-vision deficiencies may be unable to read labels, distinguish controls, or identify task status. That can exclude users and make important information difficult to perceive. A polished appearance does not guarantee accessibility.

Before accepting a suggestion:

1. Measure foreground/background contrast with an accessibility checker; target WCAG AA contrast of at least 4.5:1 for normal text and 3:1 for large text.
2. Do not communicate status through color alone; retain text labels and visible control states.
3. Check keyboard navigation, focus visibility, responsive layouts, and reduced-motion preferences.
4. Test the actual rendered combinations, including hover, disabled, error, and selected states.
5. Treat model output as untrusted input. The backend validates the response schema and hex color format; the frontend does not inject model output as HTML or executable CSS.
6. Review whether the prompt or description contains private information. Do not include credentials or sensitive user data.

The sample palette is a design choice, not a certification of WCAG compliance. Verify contrast after applying any generated palette.

## Before/after screenshot evidence

The assignment PDF requests screenshots of the UI before and after a design change. Capture these from your own running app so they show genuine execution evidence:

- [ ] Save the default UI screenshot as `docs/before.png` before applying a suggestion.
- [ ] Click **Get AI Design Suggestion**, review the response, then click **Apply color scheme**.
- [ ] Save the resulting UI screenshot as `docs/after.png`.
- [ ] Confirm both screenshots are readable and show the same viewport for a fair comparison.

Once added, embed them here:

### Before

![Before design change](docs/before.png)

### After

![After applying reviewed design change](docs/after.png)

The image files are not pre-populated because screenshots should be captured from the actual running application rather than fabricated. Keep API keys and other secrets out of screenshots.

## Troubleshooting notes

- **AI unavailable:** verify `backend/.env`, API key permissions, and backend logs. The endpoint returns a local fallback if AI is unconfigured or the provider response fails.
- **Malformed JSON:** response-format JSON mode is requested, then `JSON.parse` and schema validation run inside a try/catch. Invalid output triggers the fallback.
- **CSS variables do not apply:** the theme variables are set on the root React app element and declared in `src/style.css`; check that component styles use `var(--brand)`, `var(--soft)`, and `var(--page)` rather than hard-coded colors.
- **CORS error:** ensure the frontend URL matches `CLIENT_ORIGIN` in backend/.env.

## Run checklist

- [ ] Backend `GET /health` reports status.
- [ ] Frontend loads and task interactions work.
- [ ] AI endpoint returns validated JSON or an explicit fallback.
- [ ] Apply and reset theme both visibly change the UI.
- [ ] Real before/after screenshots added to `docs/`.
