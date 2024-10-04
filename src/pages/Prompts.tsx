import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle } from 'lucide-react';
import Tiptap from '@/components/Tiptap';

interface Prompt {
  id: string;
  title: string;
  content: string;
}

export default function Prompts() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [newPrompt, setNewPrompt] = useState<Omit<Prompt, 'id'>>({
    title: '',
    content: '',
  });

  const handleCreatePrompt = () => {
    const prompt: Prompt = {
      ...newPrompt,
      id: Date.now().toString(),
    };
    setPrompts([...prompts, prompt]);
    setNewPrompt({ title: '', content: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Prompts</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button><PlusCircle className="mr-2 h-4 w-4" /> Create Prompt</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[725px]">
            <DialogHeader>
              <DialogTitle>Create New Prompt</DialogTitle>
              <DialogDescription>
                Create a new prompt using the Tiptap editor.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={newPrompt.title}
                  onChange={(e) => setNewPrompt({ ...newPrompt, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="content" className="text-right mt-2">
                  Content
                </Label>
                <div className="col-span-3">
                  <Tiptap
                    content={newPrompt.content}
                    onChange={(content) => setNewPrompt({ ...newPrompt, content })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleCreatePrompt}>Create Prompt</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {prompts.map((prompt) => (
          <Card key={prompt.id}>
            <CardHeader>
              <CardTitle>{prompt.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: prompt.content }} />
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Edit Prompt</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}