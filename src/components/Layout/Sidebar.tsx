import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  GitBranch, 
  Play, 
  Server, 
  Users, 
  Settings,
  Zap
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Flows', href: '/flows', icon: GitBranch },
  { name: 'Executions', href: '/executions', icon: Play },
  { name: 'Applications', href: '/applications', icon: Server },
  { name: 'Users', href: '/users', icon: Users },
];

export default function Sidebar({ isOpen }: SidebarProps) {
  return (
    <div className={`${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out bg-gray-800 border-r border-gray-700 flex flex-col`}>
      <div className="flex items-center h-16 px-4 border-b border-gray-700">
        <Zap className="h-8 w-8 text-cyan-400 glow-icon" />
        {isOpen && (
          <span className="ml-3 text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Orkestra
          </span>
        )}
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-600/20 to-purple-600/20 text-cyan-400 shadow-lg shadow-cyan-500/20'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <item.icon className={`h-5 w-5 ${isOpen ? 'mr-3' : 'mx-auto'} transition-transform group-hover:scale-110`} />
            {isOpen && item.name}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-gray-700 p-4">
        <button className="flex items-center w-full px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
          <Settings className={`h-5 w-5 ${isOpen ? 'mr-3' : 'mx-auto'}`} />
          {isOpen && 'Settings'}
        </button>
      </div>
    </div>
  );
}