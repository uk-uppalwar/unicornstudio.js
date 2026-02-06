import React from 'react';
import { Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full py-8 mt-auto border-t border-border bg-bg-primary/50">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-text-secondary">
          <Shield size={16} className="text-text-muted" />
          <span className="text-sm font-medium">SHIELD Cybersecurity</span>
          <span className="text-text-muted text-xs">© {new Date().getFullYear()}</span>
        </div>

        <div className="flex items-center gap-6 text-sm text-text-muted">
          <a href="#" className="hover:text-accent-primary transition-colors">Privacy</a>
          <a href="#" className="hover:text-accent-primary transition-colors">Terms</a>
          <a href="#" className="hover:text-accent-primary transition-colors">Support</a>
        </div>
      </div>
    </footer>
  );
}
