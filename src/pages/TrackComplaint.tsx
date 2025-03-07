
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, ArrowRight, Clock, Calendar, MapPin, User, Landmark } from 'lucide-react';
import GlassCard from '@/components/ui-custom/GlassCard';
import StatusBadge from '@/components/ui-custom/StatusBadge';
import AnimatedButton from '@/components/ui-custom/AnimatedButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ComplaintDetails {
  id: string;
  type: string;
  status: 'pending' | 'inProgress' | 'resolved' | 'escalated';
  dateSubmitted: string;
  lastUpdated: string;
  description: string;
  location: string;
  department: string;
  timeline: {
    date: string;
    status: string;
    description: string;
  }[];
}

const TrackComplaint = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [trackingId, setTrackingId] = useState(searchParams.get('id') || '');
  const [isSearching, setIsSearching] = useState(false);
  const [complaint, setComplaint] = useState<ComplaintDetails | null>(null);
  const [showComplaintNotFound, setShowComplaintNotFound] = useState(false);

  useEffect(() => {
    if (searchParams.get('id')) {
      handleSearch();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleSearch = () => {
    if (!trackingId.trim()) return;
    
    setIsSearching(true);
    setShowComplaintNotFound(false);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsSearching(false);
      
      // For demo purposes, let's just check if ID is provided and generate mock data
      if (trackingId.trim()) {
        // Mock data for the complaint
        const mockComplaint: ComplaintDetails = {
          id: trackingId,
          type: 'Infrastructure',
          status: ['pending', 'inProgress', 'resolved', 'escalated'][Math.floor(Math.random() * 4)] as any,
          dateSubmitted: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          lastUpdated: new Date().toISOString().split('T')[0],
          description: 'Pothole on Main Street causing traffic issues and potential vehicle damage.',
          location: '123 Main Street, Downtown',
          department: 'Public Works Department',
          timeline: [
            {
              date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              status: 'Submitted',
              description: 'Complaint was submitted and assigned a tracking ID.'
            },
            {
              date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              status: 'Reviewed',
              description: 'Complaint was reviewed and assigned to the Public Works Department.'
            },
            {
              date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              status: 'In Progress',
              description: 'Work crew has been scheduled to address the pothole issue.'
            }
          ]
        };
        
        // Add a resolution step if the status is 'resolved'
        if (mockComplaint.status === 'resolved') {
          mockComplaint.timeline.push({
            date: new Date().toISOString().split('T')[0],
            status: 'Resolved',
            description: 'The pothole has been repaired and the road surface has been restored.'
          });
        }
        
        // Add an escalation step if the status is 'escalated'
        if (mockComplaint.status === 'escalated') {
          mockComplaint.timeline.push({
            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            status: 'Escalated',
            description: 'Due to delays, this complaint has been escalated to the Department Director.'
          });
        }
        
        setComplaint(mockComplaint);
        setShowComplaintNotFound(false);
        
        // Update the URL with the tracking ID
        setSearchParams({ id: trackingId });
      } else {
        setComplaint(null);
        setShowComplaintNotFound(true);
      }
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrackingId(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Track Your Complaint</h1>
            <p className="text-lg text-muted-foreground">
              Enter your complaint tracking ID to check its current status and progress.
            </p>
          </div>
          
          <GlassCard className="p-6 md:p-8">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Input
                  value={trackingId}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter your complaint tracking ID"
                  className="pl-10 py-6 text-lg"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
              
              <Button 
                onClick={handleSearch}
                disabled={isSearching || !trackingId.trim()}
                className="py-6 px-8"
              >
                {isSearching ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-t-transparent border-current rounded-full animate-spin"></div>
                    <span>Searching...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Track</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </div>
            
            {showComplaintNotFound && (
              <div className="mt-8 text-center p-6 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="text-xl font-semibold text-red-700 mb-2">Complaint Not Found</h3>
                <p className="text-red-600">
                  We couldn't find a complaint with the provided tracking ID. Please check the ID and try again.
                </p>
              </div>
            )}
            
            {complaint && (
              <div className="mt-8 space-y-8 animate-fade-in">
                {/* Status Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border pb-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Complaint #{complaint.id}</h2>
                    <p className="text-muted-foreground">
                      {complaint.type} | Submitted: {complaint.dateSubmitted}
                    </p>
                  </div>
                  <StatusBadge status={complaint.status} size="lg" />
                </div>
                
                {/* Complaint Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Complaint Details</h3>
                    <p className="text-muted-foreground mb-4">{complaint.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>{complaint.location}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Landmark className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>Assigned to: {complaint.department}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>Last Updated: {complaint.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Current Status</h3>
                    <div className="bg-primary/5 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className={`rounded-full p-2 ${
                          complaint.status === 'resolved' 
                            ? 'bg-green-100 text-green-700' 
                            : complaint.status === 'escalated'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          <Clock className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">
                            {complaint.status === 'pending' && 'Pending Review'}
                            {complaint.status === 'inProgress' && 'In Progress'}
                            {complaint.status === 'resolved' && 'Resolved'}
                            {complaint.status === 'escalated' && 'Escalated'}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {complaint.status === 'pending' && 'Your complaint is awaiting review.'}
                            {complaint.status === 'inProgress' && 'Your complaint is being actively worked on.'}
                            {complaint.status === 'resolved' && 'Your complaint has been resolved successfully.'}
                            {complaint.status === 'escalated' && 'Your complaint has been escalated for priority attention.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Timeline */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Complaint Timeline</h3>
                  <div className="space-y-6 pl-4">
                    {complaint.timeline.map((event, index) => (
                      <div key={index} className="relative pl-6 pb-6">
                        {/* Vertical line */}
                        {index < complaint.timeline.length - 1 && (
                          <div className="absolute left-0 top-3 bottom-0 w-0.5 bg-primary/20"></div>
                        )}
                        
                        {/* Circle marker */}
                        <div className="absolute left-[-5px] top-2 h-[10px] w-[10px] rounded-full bg-primary"></div>
                        
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{event.status}</span>
                            <span className="text-sm text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">{event.date}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <AnimatedButton to="/submit" variant="outline">
                    Submit Another Complaint
                  </AnimatedButton>
                  
                  <Button variant="ghost" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Contact Department</span>
                  </Button>
                </div>
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default TrackComplaint;
