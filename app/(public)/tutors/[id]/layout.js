import RequireAuth from "@/components/RequireAuth";

export default function DetailsLayout({ children }) {
  return <RequireAuth>{children}</RequireAuth>;
}
