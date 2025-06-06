import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import AuthScreen from './components/AuthScreen';
import MainApp from './components/MainApp';

const AppContent: React.FC = () => {
  const { user } = useAuth();

  return user ? <MainApp /> : <AuthScreen />;
};

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;