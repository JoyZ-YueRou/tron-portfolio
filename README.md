# Tron portfolio

A responsive HTML, CSS, and JavaScript personal portfolio prototype. Open this folder in Visual Studio Code and use Live Server on index.html. No dependencies or build required.

## Portrait interaction

Two aligned WebP portraits share one container, size, object-fit: contain, and center-bottom object-position. The base stays visible. The alternate layer uses clip-path: circle(180px at x y). Pointer coordinates are relative to the stable outer anchor, while requestAnimationFrame interpolates the mask position by 12% per frame. Both layers share a tilt clamped to ±3 degrees. Exiting fades the reveal; the keyboard-accessible button toggles the full alternate portrait.

Both images decode before interaction is enabled. Failure leaves the base portrait and disables the toggle. Touch input does not prevent native scrolling. Reduced motion removes tilt, trailing, and transitions.

## Personalize

Replace the marked About introduction, project concepts, and hello@example.com contact address. The local audio loader accepts a licensed copy of TRON: Legacy (End Titles); no audio is bundled or uploaded. Playback requires user action.

Original portfolio branding inspired by cinematic cyber aesthetics; not an official Tron website.
