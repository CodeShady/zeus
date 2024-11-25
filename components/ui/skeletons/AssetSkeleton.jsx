export default function AssetSkeleton() {
  return (
    <div className="flex gap-4 mb-2 rounded-xl animate-pulse items-center">
      {/* Icon */}
      <div className="border-white/10 border rounded-xl p-2 w-fit aspect-square">
        <div className="rounded-md w-8 h-8 bg-loading"></div>
      </div>

      {/* Info */}
      <div className="flex flex-col w-full pt-[2px]">
        <div className="w-full flex justify-between mb-4">
          <div className="w-[40px] h-2.5 rounded-full bg-loading"></div>
          <div className="w-[80px] h-2.5 rounded-full bg-loading"></div>
        </div>

        <div className="w-full flex justify-between">
          <div className="w-[110px] h-2.5 rounded-full bg-loading"></div>
          <div className="w-[65px] h-2.5 rounded-full bg-loading"></div>
        </div>
      </div>
    </div>
  );
}
