
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileUp, AlertCircle, Globe, Send } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import GlassCard from '@/components/ui-custom/GlassCard';
import AnimatedButton from '@/components/ui-custom/AnimatedButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const SubmitComplaint = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    complaintType: '',
    description: '',
    language: 'english',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Generate a random complaint ID
      const complaintId = Math.random().toString(36).substring(2, 10).toUpperCase();
      
      toast.success('Complaint submitted successfully!', {
        description: `Your complaint ID is ${complaintId}. You can use this to track your complaint status.`,
        duration: 5000,
      });
      
      // Reset form and navigate to tracking page with the ID
      setFormData({
        name: '',
        email: '',
        phone: '',
        complaintType: '',
        description: '',
        language: 'english',
      });
      setSelectedFiles([]);
      
      navigate(`/track?id=${complaintId}`);
    }, 1500);
  };

  const complaintTypes = [
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'public_services', label: 'Public Services' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'sanitation', label: 'Sanitation' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'education', label: 'Education' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'public_safety', label: 'Public Safety' },
    { value: 'environment', label: 'Environment' },
    { value: 'other', label: 'Other' },
  ];
  
  const languages = [
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'french', label: 'French' },
    { value: 'german', label: 'German' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'hindi', label: 'Hindi' },
    { value: 'arabic', label: 'Arabic' },
  ];

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Submit a Complaint</h1>
            <p className="text-lg text-muted-foreground">
              Fill out the form below to register your complaint. We'll process it and keep you updated.
            </p>
          </div>
          
          <GlassCard className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Language Selection */}
              <div className="flex justify-end">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <Select
                    value={formData.language}
                    onValueChange={(value) => handleSelectChange('language', value)}
                  >
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((language) => (
                        <SelectItem key={language.value} value={language.value}>
                          {language.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Personal Information */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
              
              {/* Complaint Details */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Complaint Details</h2>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="complaintType">Complaint Type</Label>
                    <Select
                      value={formData.complaintType}
                      onValueChange={(value) => handleSelectChange('complaintType', value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select complaint type" />
                      </SelectTrigger>
                      <SelectContent>
                        {complaintTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Complaint Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Provide detailed information about your complaint"
                      rows={5}
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      className="resize-none"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <Label>Supporting Documents (Optional)</Label>
                    
                    <div className="border border-dashed border-primary/20 rounded-lg p-8 text-center hover:bg-primary/5 transition-colors">
                      <input
                        type="file"
                        id="fileUpload"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="fileUpload"
                        className="cursor-pointer flex flex-col items-center justify-center"
                      >
                        <FileUp className="h-8 w-8 text-primary/60 mb-3" />
                        <p className="text-sm font-medium mb-1">Drag and drop files here or click to browse</p>
                        <p className="text-xs text-muted-foreground">
                          Supports: JPG, PNG, PDF, DOC (Max 5MB per file)
                        </p>
                      </label>
                    </div>
                    
                    {selectedFiles.length > 0 && (
                      <div className="space-y-2 mt-4">
                        <p className="text-sm font-medium">Selected Files:</p>
                        <div className="max-h-32 overflow-y-auto space-y-2">
                          {selectedFiles.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 bg-primary/5 rounded-md"
                            >
                              <span className="text-sm truncate max-w-[80%]">{file.name}</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(index)}
                                className="h-6 w-6 p-0"
                              >
                                &times;
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Important Notes */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-4">
                <AlertCircle className="h-6 w-6 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-amber-800 mb-1">Important Note</h3>
                  <p className="text-sm text-amber-700">
                    By submitting this complaint, you acknowledge that all information provided is accurate. 
                    False complaints may lead to legal consequences.
                  </p>
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <AnimatedButton
                  className={cn(
                    "min-w-40",
                    isSubmitting && "opacity-80"
                  )}
                  icon={false}
                  size="lg"
                  onClick={handleSubmit}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      <span>Submit Complaint</span>
                    </div>
                  )}
                </AnimatedButton>
              </div>
            </form>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default SubmitComplaint;
