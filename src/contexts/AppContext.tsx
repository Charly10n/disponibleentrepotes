import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Friend {
  id: string;
  name: string;
  avatar: string;
  isAvailable: boolean;
  lastSeen: string;
  status: string;
}

interface Notification {
  id: string;
  type: 'friend_request' | 'availability' | 'event_invite';
  message: string;
  from: string;
  timestamp: Date;
  read: boolean;
}

interface Event {
  id: string;
  title: string;
  location: string;
  time: string;
  organizer: string;
  participants: string[];
  votes: { [key: string]: number };
}

interface AppContextType {
  isAvailable: boolean;
  setAvailable: (available: boolean) => void;
  friends: Friend[];
  setFriends: React.Dispatch<React.SetStateAction<Friend[]>>;
  addFriend: (friend: Friend) => void;
  notifications: Notification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  events: Event[];
  createEvent: (event: Omit<Event, 'id'>) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [friends, setFriends] = useState<Friend[]>([
    {
      id: '1',
      name: 'Marie Martin',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      isAvailable: true,
      lastSeen: 'En ligne',
      status: 'Prête pour une soirée cinéma ! 🎬'
    },
    {
      id: '2',
      name: 'Pierre Durand',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      isAvailable: false,
      lastSeen: 'Il y a 2h',
      status: 'Occupé ce soir, désolé !'
    },
    {
      id: '3',
      name: 'Sophie Laurent',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      isAvailable: true,
      lastSeen: 'En ligne',
      status: 'Partante pour un resto ! 🍽️'
    },
    {
      id: '4',
      name: 'Thomas Bernard',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      isAvailable: true,
      lastSeen: 'En ligne',
      status: 'Dispo pour danser ! 💃'
    }
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'availability',
      message: 'Marie Martin est maintenant disponible pour sortir !',
      from: 'Marie Martin',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false
    },
    {
      id: '2',
      type: 'event_invite',
      message: 'Sophie Laurent vous invite à une soirée restaurant',
      from: 'Sophie Laurent',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false
    },
    {
      id: '3',
      type: 'friend_request',
      message: 'Lucas Moreau souhaite devenir votre ami',
      from: 'Lucas Moreau',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: true
    }
  ]);

  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Soirée Restaurant',
      location: 'Le Petit Bistrot',
      time: '19h30',
      organizer: 'Sophie Laurent',
      participants: ['Sophie Laurent', 'Marie Martin', 'Jean Dupont'],
      votes: { 'Le Petit Bistrot': 2, 'La Brasserie': 1 }
    },
    {
      id: '2',
      title: 'Cinéma',
      location: 'UGC Opéra',
      time: '21h00',
      organizer: 'Marie Martin',
      participants: ['Marie Martin', 'Thomas Bernard'],
      votes: { 'UGC Opéra': 2, 'Gaumont': 0 }
    }
  ]);

  const setAvailable = (available: boolean) => {
    setIsAvailable(available);
    // Ici on ajouterait une notification aux amis
  };

  const addFriend = (friend: Friend) => {
    setFriends(prev => [...prev, friend]);
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const createEvent = (event: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...event,
      id: Date.now().toString()
    };
    setEvents(prev => [...prev, newEvent]);
  };

  return (
    <AppContext.Provider value={{
      isAvailable,
      setAvailable,
      friends,
      setFriends,
      addFriend,
      notifications,
      markNotificationRead,
      markAllNotificationsRead,
      events,
      createEvent,
      searchQuery,
      setSearchQuery
    }}>
      {children}
    </AppContext.Provider>
  );
};