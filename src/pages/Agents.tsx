import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlusCircle, Trash2 } from 'lucide-react';
import { supabase } from '@/db';

interface Agent {
  id: string;
  name: string;
  description: string;
  system_message: string;
  avatar: string;
}

export default function Agents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [newAgent, setNewAgent] = useState<Omit<Agent, 'id'>>({
    name: '',
    description: '',
    system_message: '',
    avatar: '',
  });

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    const { data, error } = await supabase.from('agents').select('*');
    if (error) {
      console.error('Error fetching agents:', error);
    } else {
      setAgents(data || []);
    }
  };

  const handleCreateAgent = async () => {
    const { data, error } = await supabase.from('agents').insert([newAgent]).select();
    if (error) {
      console.error('Error creating agent:', error);
    } else {
      setNewAgent({ name: '', description: '', system_message: '', avatar: '' });
      fetchAgents();
    }
  };

  const handleDeleteAgent = async (id: string) => {
    const { error } = await supabase.from('agents').delete().eq('id', id);
    if (error) {
      console.error('Error deleting agent:', error);
    } else {
      fetchAgents();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Agents</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button><PlusCircle className="mr-2 h-4 w-4" /> Create Agent</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Agent</DialogTitle>
              <DialogDescription>
                Create a new AI agent with custom settings.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newAgent.name}
                  onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newAgent.description}
                  onChange={(e) => setNewAgent({ ...newAgent, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="system_message" className="text-right">
                  System Message
                </Label>
                <Textarea
                  id="system_message"
                  value={newAgent.system_message}
                  onChange={(e) => setNewAgent({ ...newAgent, system_message: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="avatar" className="text-right">
                  Avatar URL
                </Label>
                <Input
                  id="avatar"
                  value={newAgent.avatar}
                  onChange={(e) => setNewAgent({ ...newAgent, avatar: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleCreateAgent}>Create Agent</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => (
          <Card key={agent.id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={agent.avatar} alt={agent.name} />
                  <AvatarFallback>{agent.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <CardTitle>{agent.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{agent.description}</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Edit</Button>
              <Button variant="destructive" onClick={() => handleDeleteAgent(agent.id)}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}