import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/Layout';
import Dashboard from '@/pages/Dashboard';
import Agents from '@/pages/Agents';
import Prompts from '@/pages/Prompts';
import Tools from '@/pages/Tools';
import PromptTemplates from '@/pages/PromptTemplates';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/prompts" element={<Prompts />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/prompt-templates" element={<PromptTemplates />} />
          </Routes>
        </Layout>
      </Router>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;