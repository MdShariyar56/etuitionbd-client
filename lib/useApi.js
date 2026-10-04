"use client";

import { useEffect, useState } from "react";
import { api } from "./api";

export function useApi(path, enabled = true) {
  const [state, setState] = useState({ key: null, data: null, error: null });
  const [tick, setTick] = useState(0);
  const key = enabled && path ? `${path}#${tick}` : null;

  useEffect(() => {
    if (!key) return;
    let alive = true;
    api(path)
      .then((data) => alive && setState({ key, data, error: null }))
      .catch((error) => alive && setState({ key, data: null, error }));
    return () => {
      alive = false;
    };
  }, [key, path]);

  const settled = state.key === key;
  return {
    data: state.data,
    error: settled ? state.error : null,
    loading: !!key && !settled,
    reload: () => setTick((t) => t + 1),
  };
}
