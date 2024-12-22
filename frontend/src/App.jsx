import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { LanguageProvider } from './contexts/LanguageContext';
import AppRoutes from './routes/index.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>
          <AppRoutes />
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
