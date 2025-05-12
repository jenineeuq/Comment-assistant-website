interface UserAvatarProps {
  src: string;
  name: string;
  role?: string;
}

export default function UserAvatar({ src, name, role }: UserAvatarProps) {
  return (
    <div className="relative group">
      <img 
        src={src} 
        className="w-8 h-8 rounded-full border-2 border-white" 
        alt={name} 
      />
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="font-medium">{name}</div>
        {role && <div className="text-gray-300 text-xs">{role}</div>}
        {/* Triangle */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  );
}