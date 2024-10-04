import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Search, Tag } from 'lucide-react';
import { supabase } from '@/db';

interface PromptTemplate {
  id: string;
  title: string;
  content: string;
  description: string;
  category: string;
  tags: string[];
  isPublic: boolean;
  version: number;
  rating: number;
  usageCount: number;
}

export default function PromptTemplates() {
  const [templates, setTemplates] = useState<PromptTemplate[]>([]);
  const [newTemplate, setNewTemplate] = useState<Omit<PromptTemplate, 'id' | 'rating' | 'usageCount'>>({
    title: '',
    content: '',
    description: '',
    category: '',
    tags: [],
    isPublic: false,
    version: 1,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase.from('prompt_templates').select('*');
      if (error) {
        throw error;
      }
      setTemplates(data || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };

  const handleCreateTemplate = async () => {
    try {
      const { data, error } = await supabase.from('prompt_templates').insert([newTemplate]).select();
      if (error) {
        throw error;
      }
      setNewTemplate({ title: '', content: '', description: '', category: '', tags: [], isPublic: false, version: 1 });
      fetchTemplates();
    } catch (error) {
      console.error('Error creating template:', error);
    }
  };

  const filteredTemplates = templates.filter(template =>
    template.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'all' || template.category === selectedCategory)
  );

  const categories = ['all', ...Array.from(new Set(templates.map(t => t.category)))];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Prompt Templates</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button><PlusCircle className="mr-2 h-4 w-4" /> Create Template</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Create New Prompt Template</DialogTitle>
              <DialogDescription>
                Create a new reusable prompt template.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">Title</Label>
                <Input
                  id="title"
                  value={newTemplate.title}
                  onChange={(e) => setNewTemplate({ ...newTemplate, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <Textarea
                  id="description"
                  value={newTemplate.description}
                  onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="content" className="text-right">Content</Label>
                <Textarea
                  id="content"
                  value={newTemplate.content}
                  onChange={(e) => setNewTemplate({ ...newTemplate, content: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">Category</Label>
                <Input
                  id="category"
                  value={newTemplate.category}
                  onChange={(e) => setNewTemplate({ ...newTemplate, category: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tags" className="text-right">Tags</Label>
                <Input
                  id="tags"
                  value={newTemplate.tags.join(', ')}
                  onChange={(e) => setNewTemplate({ ...newTemplate, tags: e.target.value.split(',').map(tag => tag.trim()) })}
                  className="col-span-3"
                  placeholder="Enter tags separated by commas"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleCreateTemplate}>Create Template</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex space-x-4 mb-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template) => (
          <Card key={template.id}>
            <CardHeader>
              <CardTitle>{template.title}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">Category: {template.category}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {template.tags.map((tag, index) => (
                  <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                    <Tag className="mr-1 h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm">Version: {template.version}</p>
              <p className="text-sm">Rating: {template.rating}/5</p>
              <p className="text-sm">Usage Count: {template.usageCount}</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View Template</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}