export default function Tag({ children, className = "" }) {
  return (
    <div
      className={`flex items-center text-black w-fit rounded-full py-1 px-3 ${className}`}
    >
      {children}
    </div>
  );
}
