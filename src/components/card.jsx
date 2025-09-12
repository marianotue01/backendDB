export function Card({ children, className }) {
  return (
    <div
      className={`
        bg-gray-800 rounded-2xl p-6 shadow-md
        hover:shadow-2xl hover:border-2 hover:border-blue-400 hover:bg-gray-700
        transition-all duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export function CardContent({ children }) {
  return <div className="space-y-2">{children}</div>;
}
