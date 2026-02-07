import { useState } from 'react';
import { PasswordResetOrchestrator } from './components/flow/PasswordResetOrchestrator';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { OverviewPage } from './components/dashboard/OverviewPage';
import { LiveMonitor } from './components/dashboard/LiveMonitor';
import { UserManagement, AlertsCenter } from './components/dashboard/UserManagement';
import { Button } from './components/Button';
import { ThemeToggle } from './components/ThemeToggle';
import { Divider } from './components/Divider';
import { Card } from './components/Card';
import { BottomSheet } from './components/ui/BottomSheet';
import { SwipeableCard } from './components/ui/SwipeableCard';
import { PullToRefresh } from './components/ui/PullToRefresh';

// Original Showcase Component
const ComponentShowcase = () => {
  const [isSheetOpen, setSheetOpen] = useState(false);

  const handleRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="flex justify-between items-center pb-8 border-b border-border">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-display text-accent-primary">SHIELD</h1>
            <p className="text-text-secondary mt-2">Design System Showcase</p>
          </div>
          <ThemeToggle />
        </header>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-display border-b border-border pb-2">Mobile Components</h2>

          <div className="space-y-4">
            <h3 className="font-bold">Bottom Sheet</h3>
            <Button onClick={() => setSheetOpen(true)}>Open Bottom Sheet</Button>
            <BottomSheet isOpen={isSheetOpen} onClose={() => setSheetOpen(false)} title="Mobile Options">
              <div className="space-y-4">
                <p className="text-text-secondary">This is a mobile-optimized bottom sheet. Drag down to close.</p>
                <Button variant="primary" className="w-full">Action 1</Button>
                <Button variant="secondary" className="w-full">Action 2</Button>
              </div>
            </BottomSheet>
          </div>

          <Divider />

          <div className="space-y-4">
            <h3 className="font-bold">Swipeable Cards</h3>
            <div className="max-w-md">
              <SwipeableCard onSwipeLeft={() => alert('Deleted!')} onSwipeRight={() => alert('Archived!')}>
                <div className="p-4">
                  <h4 className="font-bold">Swipe Me!</h4>
                  <p className="text-sm text-text-secondary">Left to Delete, Right to Archive</p>
                </div>
              </SwipeableCard>
              <SwipeableCard>
                <div className="p-4">
                  <h4 className="font-bold">Another Card</h4>
                  <p className="text-sm text-text-secondary">Try swiping this one too.</p>
                </div>
              </SwipeableCard>
            </div>
          </div>

          <Divider />

          <div className="space-y-4">
             <h3 className="font-bold">Pull to Refresh</h3>
             <div className="h-64 border border-border rounded-lg bg-bg-secondary overflow-hidden">
                <PullToRefresh onRefresh={handleRefresh}>
                  <div className="p-4 space-y-4">
                    <p className="text-center text-sm text-text-muted">Pull down to refresh...</p>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Card key={i} variant="flat" className="p-3">Item {i + 1}</Card>
                    ))}
                  </div>
                </PullToRefresh>
             </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-display border-b border-border pb-2">Component Library</h2>
          <div className="grid gap-8">
             <div className="space-y-4">
               <h3 className="font-bold">Buttons</h3>
               <div className="flex flex-wrap gap-4">
                 <Button variant="primary">Primary</Button>
                 <Button variant="secondary">Secondary</Button>
                 <Button variant="ghost">Ghost</Button>
                 <Button variant="danger">Danger</Button>
               </div>
             </div>
             {/* ... existing showcase items ... */}
          </div>
        </section>
      </div>
    </div>
  );
};

function App() {
  const [view, setView] = useState<'showcase' | 'reset-flow' | 'dashboard'>('dashboard');
  const [dashboardPage, setDashboardPage] = useState('overview');

  const renderDashboardContent = () => {
    switch(dashboardPage) {
      case 'overview': return <OverviewPage />;
      case 'live': return <LiveMonitor />;
      case 'users': return <UserManagement />;
      case 'alerts': return <AlertsCenter />;
      default: return <div className="p-8">Settings Placeholder</div>;
    }
  };

  return (
    <>
      {/* Navigation Switcher */}
      <div className="fixed bottom-20 md:bottom-4 right-4 z-[100] flex flex-col md:flex-row gap-2 bg-bg-primary p-2 rounded-lg border border-border shadow-lg">
        <button
          onClick={() => setView('showcase')}
          className={`px-3 py-1 rounded text-sm ${view === 'showcase' ? 'bg-accent-primary text-text-inverse' : 'text-text-primary'}`}
        >
          Components
        </button>
        <button
          onClick={() => setView('reset-flow')}
          className={`px-3 py-1 rounded text-sm ${view === 'reset-flow' ? 'bg-accent-primary text-text-inverse' : 'text-text-primary'}`}
        >
          User Flow
        </button>
        <button
          onClick={() => setView('dashboard')}
          className={`px-3 py-1 rounded text-sm ${view === 'dashboard' ? 'bg-accent-primary text-text-inverse' : 'text-text-primary'}`}
        >
          Admin Dashboard
        </button>
      </div>

      {view === 'showcase' && <ComponentShowcase />}

      {view === 'reset-flow' && <PasswordResetOrchestrator />}

      {view === 'dashboard' && (
        <DashboardLayout activePage={dashboardPage} onNavigate={setDashboardPage}>
          {renderDashboardContent()}
        </DashboardLayout>
      )}
    </>
  );
}

export default App;
