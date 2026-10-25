const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

type Origin = { x: number; y: number };

function waitForSelector(selector: string, timeout = 1000) {
  return new Promise<void>((resolve) => {
    const startedAt = performance.now();

    const check = () => {
      if (document.querySelector(selector)) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => resolve());
        });
        return;
      }

      if (performance.now() - startedAt >= timeout) {
        resolve();
        return;
      }

      requestAnimationFrame(check);
    };

    check();
  });
}

export function navigateWithReveal({
  navigate,
  origin,
  selector,
}: {
  navigate: () => void;
  origin: Origin;
  selector: string;
}) {
  if (
    typeof document.startViewTransition !== "function" ||
    window.matchMedia(REDUCED_MOTION).matches
  ) {
    navigate();
    return;
  }

  const root = document.documentElement;
  root.style.setProperty("--theme-x", `${origin.x}px`);
  root.style.setProperty("--theme-y", `${origin.y}px`);

  let transition: ViewTransition;

  try {
    transition = document.startViewTransition(async () => {
      navigate();
      await waitForSelector(selector);
    });
  } catch {
    navigate();
    return;
  }

  root.dataset.routeTransition = "true";
  void transition.finished
    .catch(() => undefined)
    .finally(() => {
      delete root.dataset.routeTransition;
    });
}
