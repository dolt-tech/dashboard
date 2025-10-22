import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { mockProviders } from '../../lib/mockData';
import { ImageUpload } from '../../components/ImageUpload';
import { Camera, MapPin, Award, DollarSign, Star, Save, X } from 'lucide-react';
import { toast } from 'sonner';

const ProviderProfile = () => {
  const provider = mockProviders[0]; // Using first provider for demo
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: provider.name,
    email: provider.email,
    hourlyRate: provider.hourlyRate,
    skills: provider.skills,
    serviceAreas: provider.serviceAreas,
    avatar: provider.avatar,
  });
  const [newSkill, setNewSkill] = useState('');
  const [newArea, setNewArea] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load profile image from localStorage on mount
  useEffect(() => {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      setFormData((prev) => ({
        ...prev,
        avatar: savedImage,
      }));
    }
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (formData.hourlyRate <= 0) newErrors.hourlyRate = 'Rate must be greater than 0';
    if (formData.skills.length === 0) newErrors.skills = 'Add at least one skill';
    if (formData.serviceAreas.length === 0) newErrors.serviceAreas = 'Add at least one service area';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleImageChange = (imageData: string) => {
    setFormData((prev) => ({
      ...prev,
      avatar: imageData,
    }));
  };

  const addSkill = () => {
    if (newSkill && !formData.skills.includes(newSkill)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill],
      });
      setNewSkill('');
      if (errors.skills) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.skills;
          return newErrors;
        });
      }
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    });
  };

  const addServiceArea = () => {
    if (newArea && !formData.serviceAreas.includes(newArea)) {
      setFormData({
        ...formData,
        serviceAreas: [...formData.serviceAreas, newArea],
      });
      setNewArea('');
      if (errors.serviceAreas) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.serviceAreas;
          return newErrors;
        });
      }
    }
  };

  const removeServiceArea = (area: string) => {
    setFormData({
      ...formData,
      serviceAreas: formData.serviceAreas.filter((a) => a !== area),
    });
  };

  const handleSave = async () => {
    if (!validateForm()) {
      toast.error('Please fix all errors before saving');
      return;
    }

    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      localStorage.setItem('providerProfile', JSON.stringify(formData));
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to save profile');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Profile Management</h1>
        <p className="text-muted-foreground mt-1">Update your professional information and expertise</p>
      </div>

      {/* Profile Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <img
              src={formData.avatar}
              alt={formData.name}
              className="w-24 h-24 rounded-full object-cover"
            />

            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{formData.name}</h2>
                  <p className="text-muted-foreground">{formData.email}</p>
                </div>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant={isEditing ? 'destructive' : 'default'}
                >
                  {isEditing ? (
                    <>
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 fill-warning text-warning" />
                    <span className="font-semibold">{provider.rating}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Jobs Completed</p>
                  <p className="font-semibold text-lg text-foreground">{provider.completedJobs}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <p className="font-semibold text-foreground">{provider.joinDate.getFullYear()}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Picture */}
      {isEditing && (
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>Upload a new profile picture</CardDescription>
          </CardHeader>
          <CardContent>
            <ImageUpload
              currentImage={formData.avatar}
              onImageChange={handleImageChange}
              maxSize={5}
              acceptedFormats={['jpg', 'jpeg', 'png', 'gif', 'webp']}
            />
          </CardContent>
        </Card>
      )}

      {/* Professional Information */}
      <Card>
        <CardHeader>
          <CardTitle>Professional Information</CardTitle>
          <CardDescription>Update your rates and certifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isEditing ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rate">Hourly Rate ($) *</Label>
                <Input
                  id="rate"
                  type="number"
                  value={formData.hourlyRate}
                  onChange={(e) => handleInputChange('hourlyRate', parseFloat(e.target.value) || 0)}
                  className={errors.hourlyRate ? 'border-destructive' : ''}
                />
                {errors.hourlyRate && <p className="text-xs text-destructive">{errors.hourlyRate}</p>}
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Full Name</p>
                  <p className="font-semibold text-foreground">{formData.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email Address</p>
                  <p className="font-semibold text-foreground">{formData.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 border border-border rounded-lg bg-muted/30">
                <DollarSign className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Hourly Rate</p>
                  <p className="text-2xl font-bold text-foreground">${formData.hourlyRate}/hr</p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Skills & Expertise
          </CardTitle>
          <CardDescription>Add or remove your professional skills</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditing && (
            <div className="flex gap-2">
              <Input
                placeholder="Add a new skill..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
              />
              <Button onClick={addSkill}>Add</Button>
            </div>
          )}

          {errors.skills && <p className="text-xs text-destructive">{errors.skills}</p>}

          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill) => (
              <Badge key={skill} className="bg-primary text-primary-foreground py-1 px-3 text-sm">
                {skill}
                {isEditing && (
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-2 hover:opacity-75"
                  >
                    ×
                  </button>
                )}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Service Areas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Service Areas
          </CardTitle>
          <CardDescription>Select the areas where you provide services</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditing && (
            <div className="flex gap-2">
              <Input
                placeholder="Add a service area (city/neighborhood)..."
                value={newArea}
                onChange={(e) => setNewArea(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addServiceArea()}
              />
              <Button onClick={addServiceArea}>Add</Button>
            </div>
          )}

          {errors.serviceAreas && <p className="text-xs text-destructive">{errors.serviceAreas}</p>}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {formData.serviceAreas.map((area) => (
              <div
                key={area}
                className="flex items-center justify-between p-3 border border-border rounded-lg"
              >
                <span className="text-foreground text-sm font-medium">{area}</span>
                {isEditing && (
                  <button
                    onClick={() => removeServiceArea(area)}
                    className="text-destructive hover:opacity-75"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>Manage your account preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div>
              <p className="font-medium text-foreground">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Get notified about new bookings</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
          </div>

          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div>
              <p className="font-medium text-foreground">SMS Alerts</p>
              <p className="text-sm text-muted-foreground">Receive SMS for urgent messages</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
          </div>

          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div>
              <p className="font-medium text-foreground">Auto-Accept Bookings</p>
              <p className="text-sm text-muted-foreground">Automatically accept all bookings</p>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded" />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      {isEditing && (
        <div className="flex gap-2">
          <Button className="flex-1" disabled={isSaving} onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button variant="outline" className="flex-1" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProviderProfile;