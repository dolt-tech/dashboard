import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Plus, Trash2, Edit2, Save } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  proficiency: 'beginner' | 'intermediate' | 'expert';
}

interface ServiceOffering {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  featured: boolean;
}

const SkillsAndServices = () => {
  const [skills, setSkills] = useState<Skill[]>([
    { id: '1', name: 'General Cleaning', proficiency: 'expert' },
    { id: '2', name: 'Deep Cleaning', proficiency: 'expert' },
    { id: '3', name: 'Carpet Cleaning', proficiency: 'intermediate' },
  ]);

  const [services, setServices] = useState<ServiceOffering[]>([
    {
      id: '1',
      name: 'General Cleaning',
      category: 'Cleaning',
      price: 80,
      description: 'Regular home cleaning including vacuuming, mopping, and dusting',
      featured: true,
    },
    {
      id: '2',
      name: 'Deep Cleaning',
      category: 'Cleaning',
      price: 150,
      description: 'Comprehensive deep cleaning of all areas',
      featured: true,
    },
  ]);

  const [newSkill, setNewSkill] = useState('');
  const [newService, setNewService] = useState({
    name: '',
    category: 'Cleaning',
    price: '',
    description: '',
  });

  const addSkill = (skillName: string) => {
    if (!skillName) return;
    const newSkillObj: Skill = {
      id: Date.now().toString(),
      name: skillName,
      proficiency: 'intermediate',
    };
    setSkills([...skills, newSkillObj]);
    setNewSkill('');
  };

  const removeSkill = (id: string) => {
    setSkills(skills.filter((s) => s.id !== id));
  };

  const updateSkillProficiency = (id: string, proficiency: Skill['proficiency']) => {
    setSkills(skills.map((s) => (s.id === id ? { ...s, proficiency } : s)));
  };

  const addService = () => {
    if (!newService.name || !newService.price) return;
    const service: ServiceOffering = {
      id: Date.now().toString(),
      ...newService,
      price: parseFloat(newService.price),
      featured: false,
    };
    setServices([...services, service]);
    setNewService({ name: '', category: 'Cleaning', price: '', description: '' });
  };

  const removeService = (id: string) => {
    setServices(services.filter((s) => s.id !== id));
  };

  const toggleFeatured = (id: string) => {
    setServices(services.map((s) => (s.id === id ? { ...s, featured: !s.featured } : s)));
  };

  const getProficiencyColor = (level: string) => {
    switch (level) {
      case 'expert':
        return 'bg-[#22C55E] text-white';
      case 'intermediate':
        return 'bg-[#FF7A00] text-white';
      case 'beginner':
        return 'bg-[#A0A0A0] text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Skills & Services</h1>
        <p className="text-muted-foreground mt-1">Manage your skills and service offerings</p>
      </div>

      {/* Skills Section */}
      <Card>
        <CardHeader>
          <CardTitle>Your Skills</CardTitle>
          <CardDescription>List your professional skills and expertise levels</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add New Skill */}
          <div className="flex gap-2">
            <Input
              placeholder="Add a new skill..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') addSkill(newSkill);
              }}
            />
            <Button onClick={() => addSkill(newSkill)}>
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>

          {/* Skills List */}
          <div className="space-y-2 mt-6">
            {skills.length > 0 ? (
              skills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{skill.name}</p>
                    <div className="flex gap-2 mt-2">
                      {(['beginner', 'intermediate', 'expert'] as const).map((level) => (
                        <Button
                          key={level}
                          size="sm"
                          variant={skill.proficiency === level ? 'default' : 'outline'}
                          onClick={() => updateSkillProficiency(skill.id, level)}
                          className="capitalize"
                        >
                          {level}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSkill(skill.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No skills added yet
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Service Offerings Section */}
      <Card>
        <CardHeader>
          <CardTitle>Service Offerings</CardTitle>
          <CardDescription>Define the services you offer and their pricing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add New Service */}
          <div className="space-y-4 p-4 bg-muted/30 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground">Add New Service</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="svc-name">Service Name</Label>
                <Input
                  id="svc-name"
                  placeholder="e.g., General Cleaning"
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="svc-category">Category</Label>
                <Input
                  id="svc-category"
                  value={newService.category}
                  onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="svc-price">Price ($)</Label>
                <Input
                  id="svc-price"
                  type="number"
                  placeholder="0.00"
                  value={newService.price}
                  onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="svc-desc">Description</Label>
                <Input
                  id="svc-desc"
                  placeholder="Brief description..."
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                />
              </div>
            </div>
            <Button onClick={addService} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </div>

          {/* Services List */}
          <div className="space-y-3">
            {services.length > 0 ? (
              services.map((service) => (
                <div
                  key={service.id}
                  className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{service.name}</h3>
                        {service.featured && (
                          <Badge className="bg-[#FF7A00] text-white">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{service.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">${service.price}</p>
                    </div>
                  </div>

                  <p className="text-sm text-foreground mb-3">{service.description}</p>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant={service.featured ? 'default' : 'outline'}
                      onClick={() => toggleFeatured(service.id)}
                    >
                      {service.featured ? '★ Featured' : '☆ Feature'}
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeService(service.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No services added yet
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Service Areas */}
      <Card>
        <CardHeader>
          <CardTitle>Service Areas</CardTitle>
          <CardDescription>Locations where you provide services</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {['Manhattan', 'Brooklyn', 'Queens'].map((area) => (
              <Badge key={area} variant="secondary" className="px-4 py-2">
                {area}
                <button className="ml-2">×</button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input placeholder="Add a new service area..." />
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Area
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillsAndServices;