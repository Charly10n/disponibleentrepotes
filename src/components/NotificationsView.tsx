import React from 'react';
import { Bell, UserPlus, Calendar, MessageCircle, Check, X } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const NotificationsView: React.FC = () => {
  const { notifications, markNotificationRead } = useApp();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'friend_request':
        return <UserPlus className="w-5 h-5 text-blue-500" />;
      case 'availability':
        return <Bell className="w-5 h-5 text-green-500" />;
      case 'event_invite':
        return <Calendar className="w-5 h-5 text-purple-500" />;
      default:
        return <MessageCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'friend_request':
        return 'bg-blue-50';
      case 'availability':
        return 'bg-green-50';
      case 'event_invite':
        return 'bg-purple-50';
      default:
        return 'bg-gray-50';
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) {
      return `Il y a ${minutes} min`;
    } else if (hours < 24) {
      return `Il y a ${hours}h`;
    } else {
      return timestamp.toLocaleDateString('fr-FR');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
        <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
          Tout marquer comme lu
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{notifications.length}</div>
          <div className="text-sm text-gray-600">Total</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-600">
            {notifications.filter(n => !n.read).length}
          </div>
          <div className="text-sm text-gray-600">Non lues</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {notifications.filter(n => n.type === 'friend_request').length}
          </div>
          <div className="text-sm text-gray-600">Demandes</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {notifications.filter(n => n.type === 'availability').length}
          </div>
          <div className="text-sm text-gray-600">Disponibilités</div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-2xl shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            Toutes les notifications
          </h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-6 hover:bg-gray-50 transition-colors duration-200 ${
                !notification.read ? 'border-l-4 border-purple-500' : ''
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg ${getNotificationColor(notification.type)}`}>
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className={`text-gray-800 ${!notification.read ? 'font-semibold' : ''}`}>
                        {notification.message}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {formatTime(notification.timestamp)}
                      </p>
                    </div>
                    
                    {!notification.read && (
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    )}
                  </div>
                  
                  {/* Action buttons for specific notification types */}
                  {notification.type === 'friend_request' && (
                    <div className="flex space-x-2 mt-3">
                      <button className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-600 transition-colors duration-200 flex items-center">
                        <Check className="w-3 h-3 mr-1" />
                        Accepter
                      </button>
                      <button className="bg-gray-300 text-gray-700 px-3 py-1 rounded-lg text-sm hover:bg-gray-400 transition-colors duration-200 flex items-center">
                        <X className="w-3 h-3 mr-1" />
                        Refuser
                      </button>
                    </div>
                  )}
                  
                  {notification.type === 'event_invite' && (
                    <div className="flex space-x-2 mt-3">
                      <button className="bg-purple-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-purple-600 transition-colors duration-200">
                        Voir l'événement
                      </button>
                      <button
                        onClick={() => markNotificationRead(notification.id)}
                        className="bg-gray-300 text-gray-700 px-3 py-1 rounded-lg text-sm hover:bg-gray-400 transition-colors duration-200"
                      >
                        Marquer comme lu
                      </button>
                    </div>
                  )}
                  
                  {notification.type === 'availability' && (
                    <div className="flex space-x-2 mt-3">
                      <button className="bg-teal-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-teal-600 transition-colors duration-200">
                        Proposer une sortie
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {notifications.length === 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            Aucune notification
          </h3>
          <p className="text-gray-500">
            Vous êtes à jour ! Les nouvelles notifications apparaîtront ici.
          </p>
        </div>
      )}
    </div>
  );
};

export default NotificationsView;