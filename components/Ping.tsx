const Ping = () => {
  return (
    <div className="relative">
      <div className="absolute -left-4 top-1">
        <span className="flex size-[11px]">
          <span className="abosulte inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
          <span className="absolute inline-flex  size-[11px] rounded-full bg-red-500"></span>
        </span>
      </div>
    </div>
  );
};

export default Ping;
