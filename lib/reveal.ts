const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function waitForSelector(selector: string, timeout = 1000) {
  return new Promise<void>((resolve) => {
    const startedAt = performance.now();

    const check = () => {
      // rAF is paused while a view transition captures the DOM update, so poll
      // with timers and let the browser render the new tree for its snapshot.
      if (
        document.querySelector(selector) ||
        performance.now() - startedAt >= timeout
      ) {
        resolve();
        return;
      }

      window.setTimeout(check, 30);
    };

    check();
  });
}

export function navigateWithReveal({
  navigate,
  selector,
}: {
  navigate: () => void;
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
