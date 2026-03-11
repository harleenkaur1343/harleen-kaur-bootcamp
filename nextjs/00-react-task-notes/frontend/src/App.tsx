import { useState } from 'react';
import TaskList from './components/TaskList';
import LoginForm from './auth/LoginForm';
import RegisterForm from './auth/RegisterForm';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

  if (!loggedIn) {
    return (
      <div>
        <LoginForm onLogin={() => setLoggedIn(true)} />
        <RegisterForm />
      </div>
    );
  }
  return (
    <div>
      <h1>Task Notes Api</h1>
      <ErrorBoundary>
        <TaskList />
      </ErrorBoundary>
    </div>
  );
}

export default App;
