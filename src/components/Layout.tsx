import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { Brain, FileText, Wrench, LayoutDashboard, FileCode } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
          <h1 className="text-2xl font-bold">AI Hub</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Button variant="ghost" asChild>
                  <Link to="/"><LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard</Link>
                </Button>
              </li>
              <li>
                <Button variant="ghost" asChild>
                  <Link to="/agents"><Brain className="mr-2 h-4 w-4" /> Agents</Link>
                </Button>
              </li>
              <li>
                <Button variant="ghost" asChild>
                  <Link to="/prompts"><FileText className="mr-2 h-4 w-4" /> Prompts</Link>
                </Button>
              </li>
              <li>
                <Button variant="ghost" asChild>
                  <Link to="/prompt-templates"><FileCode className="mr-2 h-4 w-4" /> Templates</Link>
                </Button>
              </li>
              <li>
                <Button variant="ghost" asChild>
                  <Link to="/tools"><Wrench className="mr-2 h-4 w-4" /> Tools</Link>
                </Button>
              </li>
            </ul>
          </nav>
          <ModeToggle />
        </div>
      </header>
      <main className="w-full py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}