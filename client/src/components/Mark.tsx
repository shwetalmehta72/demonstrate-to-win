/**
 * The wordmark.
 *
 * Per ideas.md: "A bold angular chevron (>) symbol in teal, representing
 * 'forward momentum' and the Tell → Show → Tell arrow flow. No text in the mark
 * itself."
 *
 * This replaces an <img> pointing at /manus-storage/logo-icon_*.png. That path
 * only resolves on the platform this was originally built on; served anywhere
 * else the SPA fallback answers with index.html, so the browser received markup
 * where it expected a PNG and rendered the alt text. Inline SVG has no such
 * dependency, scales cleanly, and inherits the current text colour.
 */

interface MarkProps {
  className?: string;
  title?: string;
}

export function Mark({ className = "w-8 h-8", title = "Demonstrate to Win" }: MarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      {/* Three stacked chevrons: Tell → Show → Tell. The leading two are dimmed
          so the eye travels left-to-right, which is the point of the mark. */}
      <path
        d="M4 8 L11 16 L4 24"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="square"
        strokeLinejoin="miter"
        opacity="0.35"
      />
      <path
        d="M13 8 L20 16 L13 24"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="square"
        strokeLinejoin="miter"
        opacity="0.65"
      />
      <path
        d="M22 8 L29 16 L22 24"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
