import { useState } from 'react';
import { ThemeToggle } from './components/ThemeToggle';
import { Button } from './components/Button';
import { Input } from './components/Input';
import { Card } from './components/Card';
import { Badge } from './components/Badge';
import { Divider } from './components/Divider';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary p-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-12">

        {/* Header */}
        <header className="flex justify-between items-center pb-8 border-b border-border">
          <div>
            <h1 className="text-4xl font-bold font-display text-accent-primary">SHIELD</h1>
            <p className="text-text-secondary mt-2">Design System Showcase</p>
          </div>
          <ThemeToggle />
        </header>

        {/* Typography */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-display border-b border-border pb-2">Typography</h2>
          <div className="space-y-4">
            <h1 className="text-6xl font-bold font-display">Heading 1 (Display)</h1>
            <h2 className="text-5xl font-bold font-display">Heading 2 (Display)</h2>
            <h3 className="text-4xl font-bold font-display">Heading 3 (Display)</h3>
            <h4 className="text-3xl font-bold font-display">Heading 4 (Display)</h4>
            <h5 className="text-2xl font-bold font-display">Heading 5 (Display)</h5>
            <h6 className="text-xl font-bold font-display">Heading 6 (Display)</h6>
            <p className="text-base text-text-primary">
              Body text (Inter). Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="text-sm text-text-secondary">
              Secondary text. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
            </p>
            <p className="text-xs text-text-muted">
              Muted text. Duis aute irure dolor in reprehenderit in voluptate.
            </p>
          </div>
        </section>

        <Divider />

        {/* Buttons */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-display border-b border-border pb-2">Buttons</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="primary">Primary Action</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="danger">Danger Zone</Button>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <Button disabled>Disabled</Button>
            <Button variant="secondary" disabled>Disabled</Button>
          </div>
        </section>

        <Divider />

        {/* Inputs */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-display border-b border-border pb-2">Inputs</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
            <Input
              label="Email Address"
              placeholder="user@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              label="Error State"
              placeholder="Invalid input"
              error="This field is required"
            />
            <Input
              label="Disabled"
              placeholder="Cannot type here"
              disabled
            />
          </div>
        </section>

        <Divider />

        {/* Badges */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-display border-b border-border pb-2">Badges</h2>
          <div className="flex flex-wrap gap-4">
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="neutral">Neutral</Badge>
          </div>
          <div className="flex flex-wrap gap-4">
            <Badge variant="success" pill>Success Pill</Badge>
            <Badge variant="warning" pill>Warning Pill</Badge>
            <Badge variant="error" pill>Error Pill</Badge>
          </div>
        </section>

        <Divider />

        {/* Cards */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-display border-b border-border pb-2">Cards</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <h3 className="text-lg font-bold mb-2">Elevated Card</h3>
              <p className="text-text-secondary">Standard card with shadow. Good for grouping content.</p>
            </Card>
            <Card variant="flat">
              <h3 className="text-lg font-bold mb-2">Flat Card</h3>
              <p className="text-text-secondary">No shadow, just border and background. Good for secondary content.</p>
            </Card>
            <Card variant="interactive">
              <h3 className="text-lg font-bold mb-2">Interactive Card</h3>
              <p className="text-text-secondary">Hover me! I scale up and glow slightly.</p>
            </Card>
          </div>
        </section>

        <Divider />

        {/* Animation Showcase */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-display border-b border-border pb-2">Animations</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="p-4 bg-bg-secondary rounded animate-fade-in text-center">Fade In</div>
             <div className="p-4 bg-bg-secondary rounded animate-slide-up text-center">Slide Up</div>
             <div className="p-4 bg-bg-secondary rounded animate-scale-in text-center">Scale In</div>
             <div className="p-4 bg-bg-secondary rounded animate-pulse-slow text-center">Pulse</div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default App;
