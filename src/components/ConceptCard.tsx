interface ConceptCardProps {
  title: string;
  description: string;
  icon: 'block' | 'sweep' | 'gap';
  color: 'cyan' | 'amber' | 'emerald';
}

export function ConceptCard({ title, description, icon, color }: ConceptCardProps) {
  const colorClasses = {
    cyan: 'border-cyan-500/30 hover:border-cyan-500/60 hover:shadow-cyan-500/10',
    amber: 'border-amber-500/30 hover:border-amber-500/60 hover:shadow-amber-500/10',
    emerald: 'border-emerald-500/30 hover:border-emerald-500/60 hover:shadow-emerald-500/10',
  };

  const iconColors = {
    cyan: 'text-cyan-400',
    amber: 'text-amber-400',
    emerald: 'text-emerald-400',
  };

  const bgGradients = {
    cyan: 'from-cyan-500/10 to-transparent',
    amber: 'from-amber-500/10 to-transparent',
    emerald: 'from-emerald-500/10 to-transparent',
  };

  return (
    <div
      className={`group relative p-5 md:p-6 rounded-xl border bg-gradient-to-b ${bgGradients[color]} ${colorClasses[color]} transition-all duration-300 hover:shadow-xl cursor-pointer`}
    >
      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg bg-white/5 flex items-center justify-center mb-3 md:mb-4 ${iconColors[color]}`}>
        {icon === 'block' && (
          <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18" />
            <path d="M9 21V9" />
          </svg>
        )}
        {icon === 'sweep' && (
          <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h4l3-9 4 18 3-9h4" />
          </svg>
        )}
        {icon === 'gap' && (
          <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="4" width="6" height="16" rx="1" />
            <rect x="14" y="4" width="6" height="16" rx="1" />
            <path d="M10 12h4" strokeDasharray="2 2" />
          </svg>
        )}
      </div>

      <h3 className="text-base md:text-lg font-bold mb-1 md:mb-2 group-hover:text-white transition-colors">{title}</h3>
      <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{description}</p>

      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <svg className={`w-4 h-4 md:w-5 md:h-5 ${iconColors[color]}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </div>
    </div>
  );
}
