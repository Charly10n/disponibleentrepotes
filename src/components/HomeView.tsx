import React from 'react';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';

const HomeView: React.FC = () => {
  const { isAvailable, setAvailable, friends, events } = useApp();
  const { user } = useAuth();

  const availableFriends = friends.filter(friend => friend.isAvailable);
  const upcomingEvents = events.slice(0, 2);

  const toggleAvailability = () => {
    setAvailable(!isAvailable);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-teal-500 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Salut {user?.name?.split(' ')[0]} ! 👋
        </h1>
        <p className="opacity-90">
          {isAvailable 
            ? "Vous êtes disponible pour sortir ce soir !" 
            : "Que diriez-vous de sortir ce soir ?"
          }
        </p>
      </div>

      {/* Availability Toggle */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Votre disponibilité
          </h2>
          
          <div className="mb-6">
            <button
              onClick={toggleAvailability}
              className={`relative w-32 h-32 rounded-full border-4 transition-all duration-300 transform hover:scale-105 ${
                isAvailable
                  ? 'bg-gradient-to-br from-green-400 to-green-600 border-green-500 shadow-green-200'
                  : 'bg-gradient-to-br from-gray-300 to-gray-500 border-gray-400 shadow-gray-200'
              } shadow-lg`}
            >
              <div className="text-white text-center">
                <div className="text-2xl mb-1">
                  {isAvailable ? '✅' : '❌'}
                </div>
                <div className="text-sm font-semibold">
                  {isAvailable ? 'Disponible' : 'Pas dispo'}
                </div>
              </div>
            </button>
          </div>

          <p className="text-gray-600 text-sm">
            {isAvailable
              ? "Vos amis peuvent voir que vous êtes libre ce soir"
              : "Cliquez pour indiquer que vous êtes libre ce soir"
            }
          </p>
        </div>
      </div>

      {/* Available Friends */}
      {availableFriends.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <Users className="w-5 h-5 mr-2 text-purple-600" />
              Amis disponibles ({availableFriends.length})
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {availableFriends.map((friend) => (
              <div key={friend.id} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{friend.name}</h3>
                  <p className="text-sm text-gray-600">{friend.status}</p>
                </div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-purple-600" />
              Sorties prévues
            </h2>
          </div>
          
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-2">{event.title}</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        Ce soir à {event.time}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        {event.participants.length} participant(s)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-1">Inviter des amis</h3>
          <p className="text-sm text-gray-600">Proposer une sortie</p>
        </button>
        
        <button className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200 text-center">
          <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <MapPin className="w-6 h-6 text-teal-600" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-1">Découvrir</h3>
          <p className="text-sm text-gray-600">Lieux populaires</p>
        </button>
      </div>
    </div>
  );
};

export default HomeView;