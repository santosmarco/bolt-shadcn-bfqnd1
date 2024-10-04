import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  description: string;
  parameters: string;
}

export default function Tools() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [newTool, setNewTool] = useState<Omit<Tool, 'id'>>({
    name: '',
    description: '',
    parameters: '',
  });

  const handleCreateTool = () => {
    const tool: Tool = {
      ...newTool,
      id: Date.now().toString(),
    };
    setTools([...tools, tool]);
    setNewTool({ name: '', description: '', parameters: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Tools</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button><PlusCircle className="mr-2 h-4 w-4" /> Create Tool</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Tool</DialogTitle>
              <DialogDescription>
                Create a new custom tool for AI agents.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newTool.name}
                  onChange={(e) => setNewTool({ ...newTool, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newTool.description}
                  onChange={(e) => setNewTool({ ...newTool, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="parameters" className="text-right">
                  Parameters
                </Label>
                <Textarea
                  id="parameters"
                  value={newTool.parameters}
                  onChange={(e) => setNewTool({ ...newTool, parameters: e.target.value })}
                  className="col-span-3"
                  placeholder="Enter JSON schema for parameters"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleCreateTool}>Create Tool</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Card key={tool.id}>
            <CardHeader>
              <CardTitle>{tool.name}</CardTitle>
              <CardDescription>{tool.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Parameters:</p>
              <pre className="text-sm mt-1 bg-muted p-2 rounded-md overflow-x-auto">
                {tool.parameters}
              </pre>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Edit Tool</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}