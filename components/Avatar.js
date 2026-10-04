const fallback = (name) =>
  `https://ui-avatars.com/api/?background=4f46e5&color=fff&bold=true&name=${encodeURIComponent(name || "User")}`;

export default function Avatar({ src, name, size = "size-10", className = "" }) {
  return (
    <img
      src={src || fallback(name)}
      alt={name || "avatar"}
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = fallback(name);
      }}
      className={`${size} shrink-0 rounded-full object-cover ${className}`}
    />
  );
}
