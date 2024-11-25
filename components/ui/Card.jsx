export default function Card({ children, className = "" }) {
  return (
    <div
      className={`border-white/10 border rounded-xl p-4 w-full ${className}`}
    >
      {children}
    </div>
  );
}
