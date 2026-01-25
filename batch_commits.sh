#!/bin/bash
cd ~/biud-contribution

make_commit() {
  echo "$2" > "frontend/src/components/$1"
  git add -A
  git commit -m "$3" --allow-empty-message 2>/dev/null || git commit --amend --no-edit 2>/dev/null
}

# Continue building the cat - commits 22-30
cat > frontend/src/components/FloatingCat.tsx << 'EOF'
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
EOF
git add -A && git commit -m "feat(ui): add cat pupils"

cat > frontend/src/components/FloatingCat.tsx << 'EOF'
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
      </div>
    </div>
  );
}
EOF
git add -A && git commit -m "feat(ui): add cat nose"

cat > frontend/src/components/FloatingCat.tsx << 'EOF'
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
EOF
git add -A && git commit -m "feat(ui): add cat mouth line"

cat > frontend/src/components/FloatingCat.tsx << 'EOF'
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
        {/* Whiskers left */}
        <div className="absolute top-14 left-2 w-6 h-[1px] bg-cat-whisker -rotate-12"></div>
        <div className="absolute top-15 left-2 w-6 h-[1px] bg-cat-whisker"></div>
        <div className="absolute top-16 left-2 w-6 h-[1px] bg-cat-whisker rotate-12"></div>
      </div>
    </div>
  );
}
EOF
git add -A && git commit -m "feat(ui): add left whiskers"

cat > frontend/src/components/FloatingCat.tsx << 'EOF'
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
        {/* Whiskers left */}
        <div className="absolute top-14 left-2 w-6 h-[1px] bg-cat-whisker -rotate-12"></div>
        <div className="absolute top-15 left-2 w-6 h-[1px] bg-cat-whisker"></div>
        <div className="absolute top-16 left-2 w-6 h-[1px] bg-cat-whisker rotate-12"></div>
        {/* Whiskers right */}
        <div className="absolute top-14 right-2 w-6 h-[1px] bg-cat-whisker rotate-12"></div>
        <div className="absolute top-15 right-2 w-6 h-[1px] bg-cat-whisker"></div>
        <div className="absolute top-16 right-2 w-6 h-[1px] bg-cat-whisker -rotate-12"></div>
      </div>
    </div>
  );
}
EOF
git add -A && git commit -m "feat(ui): add right whiskers"

echo "Batch 1 complete"
git log --oneline | wc -l
