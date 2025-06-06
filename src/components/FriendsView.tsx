import React, { useState } from 'react';
import { Search, UserPlus, MessageCircle, MoreVertical } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const FriendsView: React.FC = () => {
  const { friends, searchQuery, setSearchQuery } = useApp();
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [newFriendEmail, setNewFriendEmail] = useState('');

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddFriend = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique pour ajouter un ami
    console.log('Adding friend with email:', newFriendEmail);
    setNewFriendEmail('');
    setShowAddFriend(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Mes Amis</h1>
        <button
          onClick={() => setShowAddFriend(true)}
          className="bg-gradient-to-r from-purple-600 to-teal-500 text-white px-4 py-2 rounded-lg flex items-center hover:shadow-lg transition-shadow duration-200"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Ajouter
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        <input
          type="text"
          placeholder="Rechercher un ami..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      {/* Friends Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{friends.length}</div>
          <div className="text-sm text-gray-600">Total amis</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {friends.filter(f => f.isAvailable).length}
          </div>
          <div className="text-sm text-gray-600">Disponibles</div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {friends.filter(f => f.lastSeen === 'En ligne').length}
          </div>
          <div className="text-sm text-gray-600">En ligne</div>
        </div>
      </div>

      {/* Friends List */}
      <div className="bg-white rounded-2xl shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            Liste d'amis ({filteredFriends.length})
          </h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredFriends.map((friend) => (
            <div key={friend.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={friend.avatar}
                      alt={friend.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                      friend.isAvailable ? 'bg-green-400' : 'bg-gray-400'
                    }`}></div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{friend.name}</h3>
                    <p className="text-sm text-gray-600 mb-1">{friend.status}</p>
                    <p className="text-xs text-gray-500">{friend.lastSeen}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {friend.isAvailable && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Disponible
                    </span>
                  )}
                  
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                    <MessageCircle className="w-4 h-4" />
                  </button>
                  
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Friend Modal */}
      {showAddFriend && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Ajouter un ami</h2>
            
            <form onSubmit={handleAddFriend} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse email
                </label>
                <input
                  type="email"
                  value={newFriendEmail}
                  onChange={(e) => setNewFriendEmail(e.target.value)}
                  placeholder="ami@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddFriend(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-teal-500 text-white rounded-lg hover:shadow-lg transition-shadow duration-200"
                >
                  Envoyer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendsView;