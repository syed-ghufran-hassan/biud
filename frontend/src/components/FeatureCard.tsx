/**
 * BiUD Frontend - Feature Card Component
 * Gold & Black Metallic Theme
 */

'use client';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="metallic-card rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] gold-glow-hover group">
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-xl font-bold metallic-text-static mb-3">{title}</h3>
      <p className="text-metal-400 leading-relaxed">{description}</p>
    </div>
  );
}
