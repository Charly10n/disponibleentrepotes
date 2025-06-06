import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Plus, Vote } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const EventsView: React.FC = () => {
  const { events, createEvent } = useApp();
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    location: '',
    time: '',
    organizer: 'Jean Dupont'
  });

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    createEvent({
      ...newEvent,
      participants: ['Jean Dupont'],
      votes: { [newEvent.location]: 1 }
    });
    setNewEvent({ title: '', location: '', time: '', organizer: 'Jean Dupont' });
    setShowCreateEvent(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Sorties</h1>
        <button
          onClick={() => setShowCreateEvent(true)}
          className="bg-gradient-to-r from-purple-600 to-teal-500 text-white px-4 py-2 rounded-lg flex items-center hover:shadow-lg transition-shadow duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Organiser
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{events.length}</div>
          <div className="text-sm text-gray-600">Sorties planifiées</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">2</div>
          <div className="text-sm text-gray-600">Ce soir</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">5</div>
          <div className="text-sm text-gray-600">Participants</div>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h3>
                <div className="space-y-2 text-gray-600">
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
                    Organisé par {event.organizer}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                  Ce soir
                </span>
              </div>
            </div>

            {/* Participants */}
            <div className="mb-4">
              <h4 className="font-medium text-gray-800 mb-2">
                Participants ({event.participants.length})
              </h4>
              <div className="flex -space-x-2">
                {event.participants.slice(0, 4).map((participant, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 bg-gradient-to-r from-purple-400 to-teal-400 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-medium"
                  >
                    {participant.split(' ').map(n => n[0]).join('')}
                  </div>
                ))}
                {event.participants.length > 4 && (
                  <div className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center text-gray-600 text-xs">
                    +{event.participants.length - 4}
                  </div>
                )}
              </div>
            </div>

            {/* Voting */}
            <div className="mb-4">
              <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                <Vote className="w-4 h-4 mr-2" />
                Votes pour le lieu
              </h4>
              <div className="space-y-2">
                {Object.entries(event.votes).map(([location, votes]) => (
                  <div key={location} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{location}</span>
                    <div className="flex items-center">
                      <div className="bg-gray-200 rounded-full h-2 w-16 mr-2">
                        <div
                          className="bg-purple-500 h-2 rounded-full"
                          style={{
                            width: `${(votes / Math.max(...Object.values(event.votes))) * 100}%`
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-800">{votes}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3">
              <button className="flex-1 bg-purple-50 text-purple-600 py-2 px-4 rounded-lg hover:bg-purple-100 transition-colors duration-200">
                Rejoindre
              </button>
              <button className="flex-1 bg-teal-50 text-teal-600 py-2 px-4 rounded-lg hover:bg-teal-100 transition-colors duration-200">
                Chat de groupe
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Event Modal */}
      {showCreateEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Organiser une sortie</h2>
            
            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre de la sortie
                </label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  placeholder="Ex: Soirée restaurant"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lieu proposé
                </label>
                <input
                  type="text"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                  placeholder="Ex: Le Petit Bistrot"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Heure
                </label>
                <input
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCreateEvent(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-teal-500 text-white rounded-lg hover:shadow-lg transition-shadow duration-200"
                >
                  Créer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsView;