'use client';

interface WoodButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

export default function WoodButton({ 
  children, 
  onClick, 
  disabled = false,
  variant = 'primary' 
}: WoodButtonProps) {
  const baseStyles = "px-6 py-3 rounded-lg font-semibold transition-all duration-300 wood-grain";
  const variants = {
    primary: "bg-wood-600 hover:bg-wood-700 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5",
    secondary: "bg-wood-200 hover:bg-wood-300 text-wood-800 dark:bg-wood-700 dark:hover:bg-wood-600 dark:text-wood-100"
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'active:translate-y-0.5'}`}
    >
      {children}
    </button>
  );
}
