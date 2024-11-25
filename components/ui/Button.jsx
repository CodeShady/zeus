import { cn } from "@/lib/utils";

export default function Button({ children, className, ...rest }) {
    return (
        <button className={cn("border border-[#ffffff12] hover:bg-white/5 rounded-xl cursor-pointer transition-all px-4 h-10", className)} {...rest}>
            {children}
        </button>
    );
}