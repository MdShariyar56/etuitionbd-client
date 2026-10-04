export const TOKEN_KEY = "etb_token";
export const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000").replace(/\/$/, "");

export async function api(path, { method = "GET", body, token } = {}) {
  const stored = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
  const jwt = token === undefined ? stored : token;

  const res = await fetch(`${API_URL}/api${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    if (res.status === 401 && jwt && typeof window !== "undefined") {
      window.dispatchEvent(new Event("etb:unauthorized"));
    }
    throw Object.assign(new Error(data.message || "Request failed"), { status: res.status });
  }
  return data;
}

export const qs = (params) => {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== "" && v !== undefined && v !== null) sp.set(k, v);
  });
  const s = sp.toString();
  return s ? `?${s}` : "";
};
