"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "oneko";
const DISABLED_VALUE = "off";
const listeners = new Set<() => void>();

function isEnabled() {
  try {
    return localStorage.getItem(STORAGE_KEY) !== DISABLED_VALUE;
  } catch {
    return true;
  }
}

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  const handleStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    emit();
  };

  window.addEventListener("storage", handleStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

export function setOnekoEnabled(enabled: boolean) {
  try {
    if (enabled) localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, DISABLED_VALUE);
  } catch {
    // Storage can be blocked; mounted listeners still get the change.
  }

  emit();
}

export function useOnekoEnabled() {
  return useSyncExternalStore(subscribe, isEnabled, () => true);
}
