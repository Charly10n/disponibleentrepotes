import React from 'react';
import { Home, Users, Bell, User, Calendar, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  const { logout } = useAuth();
  const { notifications } = useApp();
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { id: 'home', icon: Home, label: 'Accueil' },
    { id: 'friends', icon: Users, label: 'Amis' },
    { id: 'events', icon: Calendar, label: 'Sorties' },
    { id: 'notifications', icon: Bell, label: 'Notifications', badge: unreadCount },
    { id: 'profile', icon: User, label: 'Profil' },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex bg-white shadow-lg border-r border-gray-200 w-64 flex-col h-screen fixed left-0 top-0 z-40">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-purple-600 to-teal-500 w-10 h-10 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <h1 className="ml-3 text-xl font-bold bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent">
              DispoCeSoir
            </h1>
          </div>
        </div>

        <div className="flex-1 py-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors duration-200 relative ${
                currentView === item.id 
                  ? 'bg-purple-50 text-purple-600 border-r-2 border-purple-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
              {item.badge && item.badge > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="p-6 border-t border-gray-200">
          <button
            onClick={logout}
            className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Déconnexion
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
        <div className="flex justify-around">
          {navItems.slice(0, 4).map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors duration-200 relative ${
                currentView === item.id 
                  ? 'text-purple-600' 
                  : 'text-gray-600'
              }`}
            >
              <item.icon className="w-5 h-5 mb-1" />
              <span className="text-xs">{item.label}</span>
              {item.badge && item.badge > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center leading-none">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
          <button
            onClick={() => onViewChange('profile')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors duration-200 ${
              currentView === 'profile' 
                ? 'text-purple-600' 
                : 'text-gray-600'
            }`}
          >
            <User className="w-5 h-5 mb-1" />
            <span className="text-xs">Profil</span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navigation;