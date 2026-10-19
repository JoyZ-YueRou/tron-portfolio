# Tron portfolio

A responsive HTML, CSS, and JavaScript personal portfolio prototype. Open this folder in Visual Studio Code and use Live Server on index.html. No dependencies or build required.

## Portrait interaction

Two aligned WebP portraits share one container, size, object-fit: contain, and center-bottom object-position. The base stays visible. The alternate layer uses a narrow rectangular clip-path following x/y. Pointer coordinates are relative to the stable outer anchor, while requestAnimationFrame interpolates the mask position by 12% per frame. Both layers share a tilt clamped to ±3 degrees. Exiting fades the reveal; the keyboard-accessible button toggles the full alternate portrait.

Both images decode before interaction is enabled. Failure leaves the base portrait and disables the toggle. Touch input does not prevent native scrolling. Reduced motion removes tilt, trailing, and transitions.

## Personalize

Replace the marked About introduction, project concepts, and hello@example.com contact address. The local audio loader accepts a licensed copy of TRON: Legacy (End Titles); no audio is bundled or uploaded. Playback requires user action.

Original portfolio branding inspired by cinematic cyber aesthetics; not an official Tron website.

## Transparent portrait and halo update

The cutout WebP assets preserve alpha; the original images are retained. Both portraits remain 1122 × 1402. The halo is a separate decorative image behind the shared portrait container; its transparent center and exterior let the page show through. A radial CSS mask feathers its glow. Mouse movement eases the portrait tilt to ±3° and halo tilt to ±12°, plus a slight in-plane rotation. Both settle to neutral on pointer exit. Reduced motion disables all tilt and trailing. The halo loading failure is independent of portrait readiness.

Assets were extracted using the built-in image generation tool. Prompts requested removal of only the exterior black background, preserving the complete dark hair, visor, neck, shoulders, chest, original framing and coordinates. The halo prompt requested transparent center and exterior with the luminous white/blue ring preserved.

## Scroll lighting

Two thin ice-blue rails flank the lower page, with markers aligned to About, Work, and Contact. Their illuminated length follows the viewport center as you scroll down or back up. Positions are measured from the actual section layout and recalculated on resize, page restoration, and font readiness. Passive scroll events schedule one animation frame per update. Decoration ignores pointer input and is hidden from screen readers; mobile rails sit inside the edges without covering text. No looping animation or scroll hijacking.

## Slim scan reveal

The former 360px-wide circle is replaced with a 320 × 40px horizontal reveal slit, reduced to 220 × 28px on mobile. Two fine cyan edges follow the pointer and frame the alternate portrait pixels inside the slit. Existing smooth tracking, shared portrait tilt, exit fade, touch scrolling, and reduced-motion behavior remain in place. The full-image toggle still reveals the entire alternate portrait and hides the scan edges.

## Glitch rectangles

While the pointer moves, the reveal jumps between randomly sized rectangles (220–420px wide and 24–130px tall on desktop; 140–260px by 18–80px on mobile). Size changes are throttled to irregular 220–440ms intervals, with faint scan lines and restrained cyan edge echoes. It stops changing when the pointer rests, leaves the hero, or the full-image toggle is on. Reduced motion keeps the default fixed rectangle and disables these glitches. No timers or extra animation loops run for the effect.
