'use client';

export default function FloatingCat() {
  return (
    <div className="animate-float relative w-32 h-32">
      {/* Cat Ears */}
      <div className="absolute -top-4 left-2 w-0 h-0 border-l-[15px] border-r-[15px] border-b-[25px] border-l-transparent border-r-transparent border-b-cat-orange"></div>
      <div className="absolute -top-3 left-3 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[18px] border-l-transparent border-r-transparent border-b-cat-nose"></div>
      <div className="absolute -top-4 right-2 w-0 h-0 border-l-[15px] border-r-[15px] border-b-[25px] border-l-transparent border-r-transparent border-b-cat-orange"></div>
      <div className="absolute -top-3 right-3 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[18px] border-l-transparent border-r-transparent border-b-cat-nose"></div>
      {/* Cat Face */}
      <div className="absolute inset-0 bg-cat-orange rounded-full">
        {/* Eyes */}
        <div className="absolute top-8 left-6 w-4 h-4 bg-white rounded-full"></div>
        <div className="absolute top-8 right-6 w-4 h-4 bg-white rounded-full"></div>
      </div>
    </div>
  );
}
