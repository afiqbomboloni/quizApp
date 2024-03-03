import React from 'react';

import {AuthProvider} from './component/context/AuthContext';
import AppNav from './component/AppNav';
import { QuizProvider } from './component/context/QuizContext';
function App() {
  return (
    <AuthProvider>
      <QuizProvider>
        <AppNav />
      </QuizProvider>
    </AuthProvider>
  );
}

export default App;
