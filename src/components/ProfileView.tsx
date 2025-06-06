import React, { useState } from 'react';
import { Mail, Edit3, Save, X, Calendar, MapPin, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ProfileView: React.FC = () => {
  const { user, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    bio: user?.bio || ''
  });

  const handleSave = () => {
    updateProfile(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      name: user?.name || '',
      bio: user?.bio || ''
    });
    setIsEditing(false);
  };

  const mockStats = {
    totalOutings: 12,
    thisMonth: 4,
    favoritePlace: 'Le Petit Bistrot',
    friends: 8
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800">Mon Profil</h1>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Informations personnelles</h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-purple-100 text-purple-600 p-2 rounded-lg hover:bg-purple-200 transition-colors duration-200"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="relative">
            <img
              src={user?.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'}
              alt={user?.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-purple-100"
            />
            <div className="absolute -bottom-2 -right-2 bg-green-400 w-6 h-6 rounded-full border-2 border-white"></div>
          </div>

          <div className="flex-1 text-center sm:text-left">
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({...editData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Votre nom"
                />
                <textarea
                  value={editData.bio}
                  onChange={(e) => setEditData({...editData, bio: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  rows={3}
                  placeholder="Votre bio..."
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Sauvegarder
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200 flex items-center"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Annuler
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{user?.name}</h3>
                <div className="flex items-center justify-center sm:justify-start text-gray-600 mb-3">
                  <Mail className="w-4 h-4 mr-2" />
                  {user?.email}
                </div>
                <p className="text-gray-600 max-w-md">{user?.bio}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Calendar className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800">{mockStats.totalOutings}</div>
          <div className="text-sm text-gray-600">Sorties totales</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Calendar className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800">{mockStats.thisMonth}</div>
          <div className="text-sm text-gray-600">Ce mois-ci</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <MapPin className="w-6 h-6 text-orange-600" />
          </div>
          <div className="text-xs font-bold text-gray-800 mb-1">{mockStats.favoritePlace}</div>
          <div className="text-sm text-gray-600">Lieu préféré</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-4 text-center">
          <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Users className="w-6 h-6 text-teal-600" />
          </div>
          <div className="text-2xl font-bold text-gray-800">{mockStats.friends}</div>
          <div className="text-sm text-gray-600">Amis</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Activité récente</h2>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-800">Soirée restaurant organisée</p>
              <p className="text-sm text-gray-600">Il y a 2 jours</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-800">Nouveau(x) ami(s) ajouté(s)</p>
              <p className="text-sm text-gray-600">Il y a 1 semaine</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="font-medium text-gray-800">Sortie cinéma avec 3 amis</p>
              <p className="text-sm text-gray-600">Il y a 1 semaine</p>
            </div>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Paramètres</h2>
        
        <div className="space-y-3">
          <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
            <div className="font-medium text-gray-800">Notifications</div>
            <div className="text-sm text-gray-600">Gérer vos préférences de notification</div>
          </button>
          
          <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
            <div className="font-medium text-gray-800">Confidentialité</div>
            <div className="text-sm text-gray-600">Contrôler qui peut vous voir</div>
          </button>
          
          <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
            <div className="font-medium text-gray-800">Blocage</div>
            <div className="text-sm text-gray-600">Gérer les utilisateurs bloqués</div>
          </button>
          
          <hr className="my-4" />
          
          <button
            onClick={logout}
            className="w-full text-left px-4 py-3 hover:bg-red-50 rounded-lg transition-colors duration-200 text-red-600"
          >
            <div className="font-medium">Se déconnecter</div>
            <div className="text-sm opacity-75">Vous devrez vous reconnecter</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;