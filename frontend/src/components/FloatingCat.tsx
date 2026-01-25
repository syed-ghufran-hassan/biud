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
      </div>
    </div>
  );
}
