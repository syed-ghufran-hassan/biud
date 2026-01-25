'use client';
export default function FloatingCat() {
  return (
    <div className="animate-float relative w-32 h-32">
      <div className="absolute inset-0 bg-cat-orange rounded-full">
        <div className="absolute top-8 left-6 w-4 h-4 bg-white rounded-full">
          <div className="absolute top-1 left-1 w-2 h-2 bg-cat-eye rounded-full"></div>
        </div>
        <div className="absolute top-8 right-6 w-4 h-4 bg-white rounded-full">
          <div className="absolute top-1 left-1 w-2 h-2 bg-cat-eye rounded-full"></div>
        </div>
        <div className="absolute top-14 left-1/2 -translate-x-1/2 w-3 h-2 bg-cat-nose rounded-full"></div>
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-1 h-2 bg-cat-whisker rounded-t-full"></div>
      </div>
    </div>
  );
}
