#!/bin/bash
cd ~/biud-contribution

# Update globals.css with wooden theme - multiple commits
cat > frontend/src/styles/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --wood-light: #f9ede0;
  --wood-dark: #83472c;
  --grain: #C4A574;
}
EOF
git add -A && git commit -m "style(theme): add wooden CSS variables"

cat >> frontend/src/styles/globals.css << 'EOF'

body {
  background: linear-gradient(135deg, #fdf8f3 0%, #f2d9bf 100%);
  min-height: 100vh;
}
EOF
git add -A && git commit -m "style(theme): add wooden gradient background"

cat >> frontend/src/styles/globals.css << 'EOF'

.dark body {
  background: linear-gradient(135deg, #3a1e13 0%, #5D4E37 100%);
}
EOF
git add -A && git commit -m "style(theme): add dark wooden background"

cat >> frontend/src/styles/globals.css << 'EOF'

.wood-grain {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cpath d='M0 50 Q25 45 50 50 T100 50' stroke='%23C4A574' stroke-width='0.5' fill='none' opacity='0.3'/%3E%3C/svg%3E");
  background-repeat: repeat;
}
EOF
git add -A && git commit -m "style(theme): add wood grain texture pattern"

cat >> frontend/src/styles/globals.css << 'EOF'

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-5px) rotate(-2deg); }
  50% { transform: translateY(-10px) rotate(0deg); }
  75% { transform: translateY(-5px) rotate(2deg); }
}
EOF
git add -A && git commit -m "style(animation): add enhanced float keyframes"

cat >> frontend/src/styles/globals.css << 'EOF'

@keyframes tail-wag {
  0%, 100% { transform: rotate(-15deg); }
  50% { transform: rotate(15deg); }
}
EOF
git add -A && git commit -m "style(animation): add tail-wag keyframes"

cat >> frontend/src/styles/globals.css << 'EOF'

@keyframes blink {
  0%, 90%, 100% { transform: scaleY(1); }
  95% { transform: scaleY(0.1); }
}
EOF
git add -A && git commit -m "style(animation): add blink keyframes for cat eyes"

cat >> frontend/src/styles/globals.css << 'EOF'

@keyframes purr {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}
EOF
git add -A && git commit -m "style(animation): add purr animation"

cat >> frontend/src/styles/globals.css << 'EOF'

.animate-float { animation: float 3s ease-in-out infinite; }
.animate-tail-wag { animation: tail-wag 0.5s ease-in-out infinite; }
.animate-blink { animation: blink 4s ease-in-out infinite; }
.animate-purr { animation: purr 2s ease-in-out infinite; }
EOF
git add -A && git commit -m "style(animation): add animation utility classes"

cat >> frontend/src/styles/globals.css << 'EOF'

/* Scrollbar wooden theme */
::-webkit-scrollbar { width: 10px; }
::-webkit-scrollbar-track { background: #f2d9bf; }
::-webkit-scrollbar-thumb { background: #a35831; border-radius: 5px; }
::-webkit-scrollbar-thumb:hover { background: #83472c; }
EOF
git add -A && git commit -m "style(theme): add wooden scrollbar styles"

echo "Batch 2 complete"
git log --oneline | wc -l
