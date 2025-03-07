
import { useState } from 'react';
import { 
  BarChart3, Users, FileText, AlertTriangle, CheckCircle, Clock, RefreshCw, 
  Filter, Search, Download, ChevronDown, MessageSquare, ArrowUpDown, MoreHorizontal
} from 'lucide-react';
import GlassCard from '@/components/ui-custom/GlassCard';
import StatusBadge from '@/components/ui-custom/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

type ComplaintStatus = 'pending' | 'inProgress' | 'resolved' | 'escalated';

interface Complaint {
  id: string;
  citizen: string;
  type: string;
  description: string;
  date: string;
  priority: 'low' | 'medium' | 'high';
  status: ComplaintStatus;
  department: string;
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  
  // Mock data for dashboard
  const dashboardStats = {
    totalComplaints: 256,
    pendingComplaints: 84,
    inProgressComplaints: 95,
    resolvedComplaints: 72,
    escalatedComplaints: 5,
    departmentPerformance: [
      { name: 'Public Works', resolved: 38, pending: 12 },
      { name: 'Transportation', resolved: 24, pending: 16 },
      { name: 'Utilities', resolved: 18, pending: 14 },
      { name: 'Sanitation', resolved: 16, pending: 10 },
      { name: 'Public Safety', resolved: 12, pending: 8 },
    ],
    complaintTypes: [
      { type: 'Infrastructure', count: 78 },
      { type: 'Utilities', count: 65 },
      { type: 'Public Services', count: 42 },
      { type: 'Sanitation', count: 38 },
      { type: 'Transportation', count: 33 },
    ],
  };
  
  // Mock data for complaints
  const mockComplaints: Complaint[] = [
    {
      id: 'CMP-2023-001',
      citizen: 'John Smith',
      type: 'Infrastructure',
      description: 'Pothole on Main Street causing traffic issues',
      date: '2023-07-12',
      priority: 'high',
      status: 'inProgress',
      department: 'Public Works',
    },
    {
      id: 'CMP-2023-002',
      citizen: 'Sarah Johnson',
      type: 'Utilities',
      description: 'Frequent power outages in Westside neighborhood',
      date: '2023-07-10',
      priority: 'medium',
      status: 'pending',
      department: 'Utilities',
    },
    {
      id: 'CMP-2023-003',
      citizen: 'Michael Brown',
      type: 'Public Services',
      description: 'Trash not collected for two weeks',
      date: '2023-07-05',
      priority: 'medium',
      status: 'resolved',
      department: 'Sanitation',
    },
    {
      id: 'CMP-2023-004',
      citizen: 'Emma Wilson',
      type: 'Transportation',
      description: 'Traffic light malfunctioning at Oak and Pine intersection',
      date: '2023-07-08',
      priority: 'high',
      status: 'escalated',
      department: 'Transportation',
    },
    {
      id: 'CMP-2023-005',
      citizen: 'David Lee',
      type: 'Infrastructure',
      description: 'Sidewalk damaged and causing accessibility issues',
      date: '2023-07-01',
      priority: 'low',
      status: 'inProgress',
      department: 'Public Works',
    },
    {
      id: 'CMP-2023-006',
      citizen: 'Jennifer Garcia',
      type: 'Public Safety',
      description: 'Street light outage creating safety concern',
      date: '2023-07-03',
      priority: 'high',
      status: 'pending',
      department: 'Public Safety',
    },
    {
      id: 'CMP-2023-007',
      citizen: 'Robert Martinez',
      type: 'Environment',
      description: 'Illegal dumping in park area',
      date: '2023-06-29',
      priority: 'medium',
      status: 'resolved',
      department: 'Environment',
    },
    {
      id: 'CMP-2023-008',
      citizen: 'Lisa Taylor',
      type: 'Utilities',
      description: 'Water quality concerns in Eastside neighborhood',
      date: '2023-06-25',
      priority: 'high',
      status: 'inProgress',
      department: 'Utilities',
    },
  ];
  
  // Filter complaints based on search and filters
  const filteredComplaints = mockComplaints.filter((complaint) => {
    const matchesSearch = 
      complaint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.citizen.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = selectedStatus === 'all' || complaint.status === selectedStatus;
    const matchesDepartment = selectedDepartment === 'all' || complaint.department === selectedDepartment;
    const matchesPriority = selectedPriority === 'all' || complaint.priority === selectedPriority;
    
    return matchesSearch && matchesStatus && matchesDepartment && matchesPriority;
  });
  
  const departments = ['Public Works', 'Transportation', 'Utilities', 'Sanitation', 'Public Safety', 'Environment'];
  
  // Helper function to get status icon
  const getStatusIcon = (status: ComplaintStatus) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5" />;
      case 'inProgress':
        return <RefreshCw className="h-5 w-5" />;
      case 'resolved':
        return <CheckCircle className="h-5 w-5" />;
      case 'escalated':
        return <AlertTriangle className="h-5 w-5" />;
    }
  };
  
  // Helper function to get priority class
  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'high':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="container mx-auto px-6 md:px-12">
        <div className="animate-fade-in">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Admin Dashboard</h1>
            <p className="text-lg text-muted-foreground">
              Manage and track all citizen complaints from a centralized administration panel.
            </p>
          </div>
          
          <Tabs defaultValue="dashboard" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-flex">
              <TabsTrigger value="dashboard" onClick={() => setActiveTab('dashboard')}>Dashboard</TabsTrigger>
              <TabsTrigger value="complaints" onClick={() => setActiveTab('complaints')}>Complaints</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="space-y-8">
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <GlassCard className="p-6 animate-on-scroll" style={{ animationDelay: '0.1s' }}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-muted-foreground font-medium">Total Complaints</p>
                      <h3 className="text-3xl font-bold mt-2">{dashboardStats.totalComplaints}</h3>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-full">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground">
                    <span className="text-green-600 font-medium">+5%</span> from last month
                  </div>
                </GlassCard>
                
                <GlassCard className="p-6 animate-on-scroll" style={{ animationDelay: '0.2s' }}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-muted-foreground font-medium">Pending</p>
                      <h3 className="text-3xl font-bold mt-2">{dashboardStats.pendingComplaints + dashboardStats.inProgressComplaints}</h3>
                    </div>
                    <div className="bg-amber-100 p-3 rounded-full">
                      <Clock className="h-6 w-6 text-amber-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <div className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                      {dashboardStats.pendingComplaints} New
                    </div>
                    <div className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-xs font-medium ml-2">
                      {dashboardStats.inProgressComplaints} In Progress
                    </div>
                  </div>
                </GlassCard>
                
                <GlassCard className="p-6 animate-on-scroll" style={{ animationDelay: '0.3s' }}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-muted-foreground font-medium">Resolved</p>
                      <h3 className="text-3xl font-bold mt-2">{dashboardStats.resolvedComplaints}</h3>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground">
                    <span className="text-green-600 font-medium">+12%</span> resolution rate
                  </div>
                </GlassCard>
                
                <GlassCard className="p-6 animate-on-scroll" style={{ animationDelay: '0.4s' }}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-muted-foreground font-medium">Escalated</p>
                      <h3 className="text-3xl font-bold mt-2">{dashboardStats.escalatedComplaints}</h3>
                    </div>
                    <div className="bg-red-100 p-3 rounded-full">
                      <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground">
                    <span className="text-green-600 font-medium">-2%</span> from last month
                  </div>
                </GlassCard>
              </div>
              
              {/* Charts and Analysis */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Department Performance */}
                <GlassCard className="p-6 animate-on-scroll" style={{ animationDelay: '0.5s' }}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Department Performance</h3>
                    <Button variant="outline" size="sm" className="text-xs h-8">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      View Report
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {dashboardStats.departmentPerformance.map((dept, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{dept.name}</span>
                          <span>{Math.round((dept.resolved / (dept.resolved + dept.pending)) * 100)}% Resolved</span>
                        </div>
                        <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${(dept.resolved / (dept.resolved + dept.pending)) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
                
                {/* Complaint Types */}
                <GlassCard className="p-6 animate-on-scroll" style={{ animationDelay: '0.6s' }}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Complaint Categories</h3>
                    <Button variant="outline" size="sm" className="text-xs h-8">
                      <Download className="h-4 w-4 mr-1" />
                      Export
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {dashboardStats.complaintTypes.map((type, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{type.type}</span>
                          <span>{Math.round((type.count / dashboardStats.totalComplaints) * 100)}%</span>
                        </div>
                        <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full"
                            style={{ 
                              width: `${(type.count / dashboardStats.totalComplaints) * 100}%`,
                              backgroundColor: `hsl(${210 + index * 20}, 100%, 50%)` 
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>
              
              {/* Recent Activity */}
              <GlassCard className="p-6 animate-on-scroll" style={{ animationDelay: '0.7s' }}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Recent Activity</h3>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
                
                <div className="space-y-4">
                  {mockComplaints.slice(0, 5).map((complaint, index) => (
                    <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                      <div className={`p-2 rounded-full ${
                        complaint.status === 'resolved' ? 'bg-green-100' :
                        complaint.status === 'escalated' ? 'bg-red-100' :
                        complaint.status === 'inProgress' ? 'bg-blue-100' :
                        'bg-amber-100'
                      }`}>
                        {getStatusIcon(complaint.status)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{complaint.id}</h4>
                          <span className="text-sm text-muted-foreground">{complaint.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">{complaint.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-primary">{complaint.department}</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{complaint.citizen}</span>
                        </div>
                      </div>
                      
                      <StatusBadge status={complaint.status} size="sm" />
                    </div>
                  ))}
                </div>
              </GlassCard>
            </TabsContent>
            
            <TabsContent value="complaints" className="space-y-8">
              {/* Filters and Search */}
              <GlassCard className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search complaints by ID, name, or description"
                      className="pl-9"
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <div className="w-40">
                      <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                        <SelectTrigger>
                          <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4" />
                            <SelectValue placeholder="Status" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="inProgress">In Progress</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                          <SelectItem value="escalated">Escalated</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="w-40">
                      <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                        <SelectTrigger>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <SelectValue placeholder="Department" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Departments</SelectItem>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="w-40">
                      <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                        <SelectTrigger>
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            <SelectValue placeholder="Priority" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Priorities</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button variant="outline" className="gap-1">
                      <Download className="h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </div>
              </GlassCard>
              
              {/* Complaints Table */}
              <GlassCard className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-secondary">
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground tracking-wider">
                          <div className="flex items-center gap-1 cursor-pointer hover:text-foreground">
                            ID
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground tracking-wider">Citizen</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground tracking-wider">
                          <div className="flex items-center gap-1 cursor-pointer hover:text-foreground">
                            Type
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground tracking-wider">
                          <div className="flex items-center gap-1 cursor-pointer hover:text-foreground">
                            Date
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground tracking-wider">Priority</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground tracking-wider">Department</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredComplaints.length > 0 ? (
                        filteredComplaints.map((complaint, index) => (
                          <tr key={index} className="hover:bg-secondary/50 transition-colors">
                            <td className="px-6 py-4 text-sm font-medium">{complaint.id}</td>
                            <td className="px-6 py-4 text-sm">{complaint.citizen}</td>
                            <td className="px-6 py-4 text-sm">{complaint.type}</td>
                            <td className="px-6 py-4 text-sm max-w-xs truncate">{complaint.description}</td>
                            <td className="px-6 py-4 text-sm text-muted-foreground">{complaint.date}</td>
                            <td className="px-6 py-4 text-sm">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityClass(complaint.priority)}`}>
                                {complaint.priority.charAt(0).toUpperCase() + complaint.priority.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm">
                              <StatusBadge status={complaint.status} size="sm" />
                            </td>
                            <td className="px-6 py-4 text-sm">{complaint.department}</td>
                            <td className="px-6 py-4 text-sm text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <span>View Details</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <span>Assign</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <span>Update Status</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <span>Contact Citizen</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={9} className="px-6 py-8 text-center text-muted-foreground">
                            No complaints found matching your filters. Try adjusting your search criteria.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                
                <div className="flex items-center justify-between p-4 border-t border-border">
                  <div className="text-sm text-muted-foreground">
                    Showing <span className="font-medium">{filteredComplaints.length}</span> of <span className="font-medium">{mockComplaints.length}</span> complaints
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>Previous</Button>
                    <Button variant="outline" size="sm">Next</Button>
                  </div>
                </div>
              </GlassCard>
            </TabsContent>
          </Tabs>
          
          {/* Floating Chat Support Button */}
          <div className="fixed bottom-6 right-6 animate-float">
            <button className="bg-primary text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors">
              <MessageSquare className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
