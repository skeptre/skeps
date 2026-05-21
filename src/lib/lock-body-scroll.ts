function readScrollY(): number {
  const { style } = document.body;
  if (style.position === "fixed" && style.top) {
    const locked = parseInt(style.top, 10);
    if (!Number.isNaN(locked)) return -locked;
  }
  return window.scrollY;
}

/** Lock page scroll while preserving the current scroll position. */
export function lockBodyScroll(): () => void {
  const scrollY = readScrollY();
  const { style } = document.body;

  const previous = {
    position: style.position,
    top: style.top,
    left: style.left,
    right: style.right,
    width: style.width,
    overflow: style.overflow,
  };

  style.position = "fixed";
  style.top = `-${scrollY}px`;
  style.left = "0";
  style.right = "0";
  style.width = "100%";
  style.overflow = "hidden";

  return () => {
    style.position = previous.position;
    style.top = previous.top;
    style.left = previous.left;
    style.right = previous.right;
    style.width = previous.width;
    style.overflow = previous.overflow;

    requestAnimationFrame(() => {
      window.scrollTo({ top: scrollY, left: 0, behavior: "instant" });
    });
  };
}
