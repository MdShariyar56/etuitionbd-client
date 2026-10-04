"use client";

import { useSyncExternalStore } from "react";

export function safeNext(value) {
  return value && value.startsWith("/") && !value.startsWith("//") && !value.startsWith("/\\") ? value : null;
}

const subscribe = () => () => {};
const getSnapshot = () => safeNext(new URLSearchParams(window.location.search).get("next"));
const getServerSnapshot = () => null;

export function useNextParam() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
