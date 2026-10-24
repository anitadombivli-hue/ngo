import { useState } from 'react';
import { AuthProvider, useAuth } from './auth';
import { ToastProvider } from './components/Toast';
import { ConfirmHost } from './components/Confirm';
import { FullPageLoader } from './components/Feedback';
import { AppShell, type View } from './screens/AppShell';
import { LoginScreen } from './screens/LoginScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { ProjectsScreen } from './screens/ProjectsScreen';
import { TasksScreen } from './screens/TasksScreen';
import { ArchivedScreen } from './screens/ArchivedScreen';
import { PasswordScreen } from './screens/PasswordScreen';

function Workspace() {
  const { user, loading } = useAuth();
  const [view, setView] = useState<View>('dashboard');

  if (loading) return <FullPageLoader label="Restoring your session…" />;
  if (!user) return <LoginScreen />;

  return (
    <AppShell view={view} onView={setView}>
      {view === 'dashboard' && <DashboardScreen onView={setView} />}
      {view === 'projects' && <ProjectsScreen />}
      {view === 'tasks' && <TasksScreen />}
      {view === 'archived' && <ArchivedScreen />}
      {view === 'password' && <PasswordScreen />}
    </AppShell>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Workspace />
        <ConfirmHost />
      </AuthProvider>
    </ToastProvider>
  );
}
