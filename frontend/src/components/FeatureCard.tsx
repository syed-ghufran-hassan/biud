'use client';

interface FeatureCardProps {
  emoji: string;
  title: string;
  description: string;
}

export default function FeatureCard({ emoji, title, description }: FeatureCardProps) {
  return (
    <div className="p-6 bg-wood-50 dark:bg-wood-800 rounded-xl border border-wood-200 dark:border-wood-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="text-4xl mb-4 animate-bounce-slow">{emoji}</div>
      <h3 className="text-xl font-semibold mb-2 text-wood-800 dark:text-wood-100">{title}</h3>
      <p className="text-wood-600 dark:text-wood-300">{description}</p>
    </div>
  );
}
