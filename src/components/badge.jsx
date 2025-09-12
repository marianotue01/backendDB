export function Badge({ children, className }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-gray-700 p-2 text-white ${className}`}
    >
      {children}
    </span>
  );
}
