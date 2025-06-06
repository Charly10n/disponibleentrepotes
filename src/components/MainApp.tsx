import React, { useState } from 'react';
import Navigation from './Navigation';
import HomeView from './HomeView';
import FriendsView from './FriendsView';
import EventsView from './EventsView';
import NotificationsView from './NotificationsView';
import ProfileView from './ProfileView';

const MainApp: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'friends':
        return <FriendsView />;
      case 'events':
        return <EventsView />;
      case 'notifications':
        return <NotificationsView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      
      {/* Main Content */}
      <main className="md:ml-64 p-4 md:p-8 pb-20 md:pb-8">
        <div className="max-w-4xl mx-auto">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default MainApp;