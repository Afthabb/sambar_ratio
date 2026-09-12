# CHOR MIXING LAB

## Goal
Build a polished, responsive experimental food-lab experience that follows the supplied glassmorphism and editorial-food direction while using original CHOR MIXING LAB content and visuals.

## Pages and flow
- **Home (`/`)**: blurred food backdrop, translucent main canvas, compact header, two-column rice-and-sambar introduction, CHOR and SPECIALS entry cards, lab status strip, three feature cards, large call-to-action, and spacious disclaimer footer.
- **CHOR setup (`/chor`)**: choose PERFECT or SOGGY, set rice mass with synchronized input and slider, and see the deterministic sambar result (`0.75×` or `1.25×`) update immediately.
- **CHOR simulation (`/chor/mixing`)**: staged plate animation with falling rice, pouring sambar, vegetables, timed status messages, and a completion action.
- **CHOR report (`/chor/report`)**: selected quantities, consistency, simulated indicators, entertainment disclaimer, and final verdict.
- **SPECIALS setup (`/specials`)**: select cement, tar, para podi, sand, gravel, or mystery material; choose consistency; enter mass; preview deterministic simulated engineering values.
- **SPECIALS simulation (`/specials/mixing`)**: material-specific construction animation and timed status sequence with stable-pile or wet-spread outcome.
- **SPECIALS report (`/specials/report`)**: selected material, mass, consistency, calculated fictional metrics, disclaimer, and final analysis.

## Visual system
- Define an original warm-neutral palette, charcoal controls, translucent glass surfaces, fine borders, soft shadows, typography, motion, and responsive spacing as semantic design tokens.
- Use a bold geometric display face with a clean companion face loaded locally or from the document head while keeping the app functional without external runtime APIs.
- Generate and bundle original editorial imagery for the rice/sambar scene and construction-material scene; create smaller decorative food/material elements with CSS and inline vector shapes where practical.
- Keep photography visually dominant, backgrounds soft and desaturated, corners rounded but disciplined, and motion subtle with reduced-motion support.

## Reusable building blocks
- `GlassCard`, `PillButton`, `FoodCard`, `MaterialCard`, `MetricCard`, `ProgressIndicator`, `LoadingAnimation`, `MixingSimulation`, and `ReportCard`.
- Shared app shell for the floating backdrop, header treatment, page transitions, and persistent experiment state.
- Typed experiment data and pure calculation helpers so every result is deterministic and easy to verify.

## Interaction details
- Every card and main call-to-action uses real app navigation.
- Setup controls remain synchronized and preserve selections across setup, simulation, and report screens.
- Simulations advance through timed phases, expose clear progress, support replay, and only reveal reports after completion.
- Cards lift gently, images scale slightly, arrows translate, buttons include hover and pressed feedback, and decorative objects drift without distracting from content.

## Verification
- Exercise Home → CHOR → PERFECT/SOGGY → quantity → simulation → report and the complete SPECIALS path.
- Confirm every route has unique metadata, every navigation target exists, calculations match the specified examples, and no image is broken.
- Check desktop and narrow mobile layouts with screenshots, validate interaction and animation states, and confirm no browser console errors.
