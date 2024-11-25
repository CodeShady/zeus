export default function Input({ className = "", ...rest }) {
  return (
    <input
      className={`border-white/10 outline-none focus:outline-2 focus:outline-none hover:bg-white/5 focus:bg-white/5 transition-all bg-transparent border rounded-xl p-4 w-full ${className}`}
      {...rest}
    />
  );
}
