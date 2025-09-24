import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Award, 
  Users, 
  Building2, 
  HandHeart,
  Edit,
  Share2,
  Download,
  CheckCircle,
  Star,
  Heart,
  Target,
  Globe,
  Shield,
  Clock,
  TrendingUp,
  FileText,
  Camera,
  Settings,
  ExternalLink,
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube
} from 'lucide-react';

interface ProfilePageProps {
  userType?: 'individual' | 'ngo' | 'volunteer';
  onEdit?: () => void;
  onBack?: () => void;
}

interface IndividualStats {
  casesHandled: number;
  peopleHelped: number;
  yearsActive: number;
  rating: number;
  reviews: number;
}

interface NGOStats {
  peopleHelped: number;
  projectsCompleted: number;
  yearsActive: number;
  rating: number;
  reviews: number;
  partnersCount: number;
}

interface VolunteerStats {
  hoursContributed: number;
  projectsJoined: number;
  ngosHelped: number;
  rating: number;
  reviews: number;
  yearsActive: number;
}

interface IndividualUser {
  name: string;
  email: string;
  phone: string;
  alternatePhone: string;
  dateOfBirth: string;
  gender: string;
  profileImage: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  education: string;
  specializations: string[];
  experience: string;
  currentEmployment: string;
  organization: string;
  languages: string[];
  bio: string;
  motivation: string;
  expertiseAreas: string[];
  availability: string;
  workingHours: string;
  achievements: string;
  stats: IndividualStats;
  verified: boolean;
  joinedDate: string;
  lastActive: string;
}

interface NGOUser {
  organizationName: string;
  email: string;
  alternateEmail: string;
  phone: string;
  alternatePhone: string;
  websiteUrl: string;
  registrationNumber: string;
  registrationType: string;
  dateOfEstablishment: string;
  profileImage: string;
  registeredAddress: string;
  operationalAddress: string;
  city: string;
  state: string;
  pincode: string;
  district: string;
  panNumber: string;
  gstNumber: string;
  section80G: boolean;
  section12A: boolean;
  csr1Registration: boolean;
  vision: string;
  mission: string;
  objectives: string;
  mainFocusAreas: string[];
  targetBeneficiaries: string[];
  geographicalPresence: string[];
  organizationSize: string;
  annualBudget: string;
  chairperson: { name: string; contact: string; email: string };
  secretary: { name: string; contact: string; email: string };
  treasurer: { name: string; contact: string; email: string };
  currentPrograms: string;
  majorAchievements: string;
  volunteersCount: number;
  fullTimeStaff: number;
  partTimeStaff: number;
  lastAuditDate: string;
  auditFirm: string;
  majorFundingSources: string[];
  socialMediaLinks: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
    youtube: string;
  };
  stats: NGOStats;
  verified: boolean;
  joinedDate: string;
  lastActive: string;
}

interface VolunteerUser {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  profileImage: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  profession: string;
  company: string;
  skills: string[];
  interests: string[];
  languages: string[];
  availability: string;
  preferredCauses: string[];
  volunteerExperience: string;
  bio: string;
  motivation: string;
  pastExperience: string;
  achievements: string;
  stats: VolunteerStats;
  verified: boolean;
  joinedDate: string;
  lastActive: string;
}

type UserData = IndividualUser | NGOUser | VolunteerUser;

export default function UserProfilePage({ 
  userType = 'individual', 
  onEdit, 
  onBack 
}: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock user data based on type
  const mockUserData = {
    individual: {
      // Basic Info
      name: 'Dr. Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 98765 43210',
      alternatePhone: '+91 87654 32109',
      dateOfBirth: '1985-03-15',
      gender: 'Female',
      profileImage: '/api/placeholder/150/150',
      
      // Address
      address: 'A-123, Green Park Extension, New Delhi - 110016',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110016',
      
      // Professional Info
      education: 'Master in Social Work (MSW)',
      specializations: ['Mental Health', 'Child Welfare', 'Women Empowerment'],
      experience: '8 years',
      currentEmployment: 'Freelance/Independent',
      organization: 'Independent Practice',
      languages: ['Hindi', 'English', 'Punjabi'],
      
      // Additional Info
      bio: 'Passionate social worker with 8+ years of experience in mental health counseling and child welfare. Dedicated to empowering communities through evidence-based interventions and advocacy.',
      motivation: 'Driven by the belief that every individual deserves dignity, support, and the opportunity to thrive.',
      expertiseAreas: ['Individual Counseling', 'Group Therapy', 'Crisis Intervention', 'Community Outreach'],
      availability: 'Part-time',
      workingHours: 'Flexible Hours',
      achievements: 'Best Social Worker Award 2023, Certified in Trauma Counseling',
      
      // Stats
      stats: {
        casesHandled: 245,
        peopleHelped: 890,
        yearsActive: 8,
        rating: 4.8,
        reviews: 127
      },
      
      verified: true,
      joinedDate: '2020-01-15',
      lastActive: '2025-01-14'
    },
    
    ngo: {
      // Basic Info
      organizationName: 'Helping Hands Foundation',
      email: 'contact@helpinghandsfoundation.org',
      alternateEmail: 'info@helpinghandsfoundation.org',
      phone: '+91 11-2345-6789',
      alternatePhone: '+91 98765-43210',
      websiteUrl: 'https://www.helpinghandsfoundation.org',
      registrationNumber: 'DL/2018/0123456',
      registrationType: 'Society (Societies Registration Act)',
      dateOfEstablishment: '2018-05-10',
      profileImage: '/api/placeholder/150/150',
      
      // Address
      registeredAddress: 'House No. 456, Sector 15, Noida, Uttar Pradesh - 201301',
      operationalAddress: 'Same as registered address',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201301',
      district: 'Gautam Buddh Nagar',
      
      // Legal Info
      panNumber: 'AABCH1234E',
      gstNumber: '09AABCH1234E1Z5',
      section80G: true,
      section12A: true,
      csr1Registration: true,
      
      // Organization Details
      vision: 'A world where every child has access to quality education and healthcare.',
      mission: 'To empower underprivileged communities through education, healthcare, and sustainable development programs.',
      objectives: 'Provide quality education to underprivileged children, Improve healthcare access in rural areas, Promote women empowerment and skill development',
      mainFocusAreas: ['Education', 'Healthcare', 'Women Empowerment', 'Rural Development'],
      targetBeneficiaries: ['Children (0-18 years)', 'Women', 'Rural Communities'],
      geographicalPresence: ['Uttar Pradesh', 'Delhi', 'Haryana'],
      organizationSize: 'Medium (11-50 employees)',
      annualBudget: '₹25 Lakhs - ₹1 Crore',
      
      // Key Personnel
      chairperson: { name: 'Rajesh Kumar', contact: '+91 98765-11111', email: 'rajesh@helpinghands.org' },
      secretary: { name: 'Sunita Devi', contact: '+91 98765-22222', email: 'sunita@helpinghands.org' },
      treasurer: { name: 'Amit Singh', contact: '+91 98765-33333', email: 'amit@helpinghands.org' },
      
      // Programs
      currentPrograms: 'Education Support Program: Providing scholarships and learning materials to 500+ children. Healthcare Initiative: Mobile health camps in 20 villages. Women Empowerment: Skill development training for 200+ women.',
      majorAchievements: 'Educated 2000+ children, Conducted 100+ health camps, Trained 800+ women in various skills',
      volunteersCount: 45,
      fullTimeStaff: 12,
      partTimeStaff: 8,
      
      // Financial
      lastAuditDate: '2024-03-31',
      auditFirm: 'ABC & Associates',
      majorFundingSources: ['Corporate CSR', 'Individual Donations', 'Government Grants'],
      
      // Social Media
      socialMediaLinks: {
        facebook: 'https://facebook.com/helpinghandsfoundation',
        twitter: 'https://twitter.com/helpinghands_ngo',
        linkedin: 'https://linkedin.com/company/helping-hands-foundation',
        instagram: 'https://instagram.com/helpinghandsfoundation',
        youtube: 'https://youtube.com/c/helpinghandsfoundation'
      },
      
      // Stats
      stats: {
        peopleHelped: 15000,
        projectsCompleted: 45,
        yearsActive: 7,
        rating: 4.7,
        reviews: 89,
        partnersCount: 25
      },
      
      verified: true,
      joinedDate: '2020-03-20',
      lastActive: '2025-01-14'
    },
    
    volunteer: {
      // Basic Info
      name: 'Rahul Kumar',
      email: 'rahul.volunteer@email.com',
      phone: '+91 87654 32109',
      dateOfBirth: '1995-07-22',
      gender: 'Male',
      profileImage: '/api/placeholder/150/150',
      
      // Address
      address: 'Flat 204, Sunrise Apartments, Sector 12, Gurgaon - 122001',
      city: 'Gurgaon',
      state: 'Haryana',
      pincode: '122001',
      
      // Volunteer Info
      profession: 'Software Engineer',
      company: 'Tech Solutions Pvt Ltd',
      skills: ['Teaching', 'Content Writing', 'Web Development', 'Event Management'],
      interests: ['Education', 'Environment', 'Technology for Good', 'Child Welfare'],
      languages: ['Hindi', 'English'],
      availability: 'Weekends',
      preferredCauses: ['Education', 'Technology for Good', 'Environmental Conservation'],
      
      // Experience
      volunteerExperience: '3 years',
      bio: 'Software engineer passionate about using technology for social good. Love teaching coding to underprivileged children and contributing to environmental causes.',
      motivation: 'Believe in giving back to society and using my technical skills to create positive impact.',
      
      // Volunteer History
      pastExperience: 'Taught computer basics to 100+ students at rural schools, Organized 5 tree plantation drives, Developed website for 3 local NGOs',
      achievements: 'Volunteer of the Year 2024, Certified in Child Safety',
      
      // Stats
      stats: {
        hoursContributed: 450,
        projectsJoined: 12,
        ngosHelped: 8,
        rating: 4.9,
        reviews: 34,
        yearsActive: 3
      },
      
      verified: true,
      joinedDate: '2021-08-10',
      lastActive: '2025-01-14'
    }
  };

  const userData = mockUserData[userType];

  const getProfileConfig = () => {
    switch (userType) {
      case 'individual':
        return {
          icon: User,
          title: 'Individual Social Worker',
          color: 'from-blue-500 to-cyan-500',
          bgColor: 'from-blue-50 to-cyan-50'
        };
      case 'ngo':
        return {
          icon: Building2,
          title: 'NGO Organization',
          color: 'from-green-500 to-emerald-500',
          bgColor: 'from-green-50 to-emerald-50'
        };
      case 'volunteer':
        return {
          icon: HandHeart,
          title: 'Volunteer & Helper',
          color: 'from-purple-500 to-pink-500',
          bgColor: 'from-purple-50 to-pink-50'
        };
      default:
        return {
          icon: User,
          title: 'User Profile',
          color: 'from-gray-500 to-gray-600',
          bgColor: 'from-gray-50 to-gray-100'
        };
    }
  };

  const getQuickStatValue = () => {
    switch (userType) {
      case 'individual':
        return (userData.stats as IndividualStats).casesHandled;
      case 'ngo':
        return (userData.stats as NGOStats).projectsCompleted;
      case 'volunteer':
        return (userData.stats as VolunteerStats).projectsJoined;
      default:
        return 0;
    }
  };

  const getQuickStatLabel = () => {
    switch (userType) {
      case 'individual':
        return 'Cases';
      case 'ngo':
        return 'Projects';
      case 'volunteer':
        return 'Projects';
      default:
        return 'Items';
    }
  };

  const config = getProfileConfig();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'details', label: 'Detailed Info', icon: FileText },
    { id: 'activity', label: 'Activity & Stats', icon: TrendingUp },
    { id: 'reviews', label: 'Reviews', icon: Star }
  ];

  const renderStatsCards = () => {
    let statsConfig: Array<{ label: string; value: string | number; icon: any }> = [];

    if (userType === 'individual') {
      const stats = userData.stats as IndividualStats;
      statsConfig = [
        { label: 'Cases Handled', value: stats.casesHandled, icon: FileText },
        { label: 'People Helped', value: stats.peopleHelped, icon: Users },
        { label: 'Years Active', value: stats.yearsActive, icon: Calendar },
        { label: 'Rating', value: `${stats.rating}/5`, icon: Star },
        { label: 'Reviews', value: stats.reviews, icon: MessageCircle }
      ];
    } else if (userType === 'ngo') {
      const stats = userData.stats as NGOStats;
      statsConfig = [
        { label: 'People Helped', value: `${(stats.peopleHelped / 1000).toFixed(0)}K+`, icon: Users },
        { label: 'Projects', value: stats.projectsCompleted, icon: Target },
        { label: 'Years Active', value: stats.yearsActive, icon: Calendar },
        { label: 'Rating', value: `${stats.rating}/5`, icon: Star },
        { label: 'Partners', value: stats.partnersCount, icon: HandHeart }
      ];
    } else {
      const stats = userData.stats as VolunteerStats;
      statsConfig = [
        { label: 'Hours Contributed', value: stats.hoursContributed, icon: Clock },
        { label: 'Projects Joined', value: stats.projectsJoined, icon: Target },
        { label: 'NGOs Helped', value: stats.ngosHelped, icon: Building2 },
        { label: 'Rating', value: `${stats.rating}/5`, icon: Star },
        { label: 'Years Active', value: stats.yearsActive, icon: Calendar }
      ];
    }

    return (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {statsConfig.map((stat, index) => (
          <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${config.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {renderStatsCards()}
      
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {userType === 'ngo' ? (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-600">Organization:</span>
                  <span className="font-semibold">{(userData as NGOUser).organizationName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Registration No:</span>
                  <span className="font-semibold">{(userData as NGOUser).registrationNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-semibold">{(userData as NGOUser).registrationType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Established:</span>
                  <span className="font-semibold">{new Date((userData as NGOUser).dateOfEstablishment).getFullYear()}</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-600">Full Name:</span>
                  <span className="font-semibold">{(userData as IndividualUser | VolunteerUser).name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Gender:</span>
                  <span className="font-semibold">{(userData as IndividualUser | VolunteerUser).gender}</span>
                </div>
                {userType === 'individual' && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience:</span>
                    <span className="font-semibold">{(userData as IndividualUser).experience}</span>
                  </div>
                )}
                {userType === 'volunteer' && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Profession:</span>
                    <span className="font-semibold">{(userData as VolunteerUser).profession}</span>
                  </div>
                )}
              </>
            )}
            
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-semibold">{userData.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="font-semibold">{userData.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Location:</span>
              <span className="font-semibold">{userData.city}, {userData.state}</span>
            </div>
          </CardContent>
        </Card>

        {/* Specializations/Focus Areas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2" />
              {userType === 'individual' ? 'Specializations' : 
               userType === 'ngo' ? 'Focus Areas' : 'Interests'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {(userType === 'individual' ? (userData as IndividualUser).specializations :
                userType === 'ngo' ? (userData as NGOUser).mainFocusAreas :
                (userData as VolunteerUser).interests).map((item: string, index: number) => (
                <Badge key={index} className={`bg-gradient-to-r ${config.color} text-white`}>
                  {item}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* About/Mission */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            {userType === 'ngo' ? 'Mission Statement' : 'About'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">
            {userType === 'ngo' ? (userData as NGOUser).mission : (userData as IndividualUser | VolunteerUser).bio}
          </p>
        </CardContent>
      </Card>

      {/* Languages */}
      {userType !== 'ngo' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Languages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {(userData as IndividualUser | VolunteerUser).languages.map((lang: string, index: number) => (
                <Badge key={index} variant="outline">
                  {lang}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderDetailsTab = () => (
    <div className="space-y-6">
      {userType === 'ngo' ? (
        <>
          {/* Vision & Mission */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{(userData as NGOUser).vision}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Key Objectives</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{(userData as NGOUser).objectives}</p>
              </CardContent>
            </Card>
          </div>

          {/* Legal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Legal & Compliance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-600">PAN Number:</span>
                  <span className="ml-2 font-semibold">{(userData as NGOUser).panNumber}</span>
                </div>
                <div>
                  <span className="text-gray-600">GST Number:</span>
                  <span className="ml-2 font-semibold">{(userData as NGOUser).gstNumber}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm">80G Certified</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm">12A Registered</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-sm">CSR-1 Registered</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Personnel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Key Personnel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b pb-3">
                  <h4 className="font-semibold text-gray-800">Chairperson</h4>
                  <p className="text-gray-600">{(userData as NGOUser).chairperson.name}</p>
                  <p className="text-sm text-gray-500">{(userData as NGOUser).chairperson.email}</p>
                </div>
                <div className="border-b pb-3">
                  <h4 className="font-semibold text-gray-800">Secretary</h4>
                  <p className="text-gray-600">{(userData as NGOUser).secretary.name}</p>
                  <p className="text-sm text-gray-500">{(userData as NGOUser).secretary.email}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Treasurer</h4>
                  <p className="text-gray-600">{(userData as NGOUser).treasurer.name}</p>
                  <p className="text-sm text-gray-500">{(userData as NGOUser).treasurer.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Programs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Current Programs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{(userData as NGOUser).currentPrograms}</p>
            </CardContent>
          </Card>

          {/* Social Media */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Share2 className="w-5 h-5 mr-2" />
                Social Media Presence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm" className="flex items-center">
                  <Facebook className="w-4 h-4 mr-2 text-blue-600" />
                  Facebook
                  <ExternalLink className="w-3 h-3 ml-2" />
                </Button>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Twitter className="w-4 h-4 mr-2 text-blue-400" />
                  Twitter
                  <ExternalLink className="w-3 h-3 ml-2" />
                </Button>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Linkedin className="w-4 h-4 mr-2 text-blue-700" />
                  LinkedIn
                  <ExternalLink className="w-3 h-3 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          {/* Professional/Personal Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                {userType === 'individual' ? 'Professional Details' : 'Personal Details'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {userType === 'individual' ? (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Education:</span>
                    <span className="font-semibold">{(userData as IndividualUser).education}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Employment Status:</span>
                    <span className="font-semibold">{(userData as IndividualUser).currentEmployment}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Organization:</span>
                    <span className="font-semibold">{(userData as IndividualUser).organization}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Availability:</span>
                    <span className="font-semibold">{(userData as IndividualUser).availability}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Working Hours:</span>
                    <span className="font-semibold">{(userData as IndividualUser).workingHours}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Company:</span>
                    <span className="font-semibold">{(userData as VolunteerUser).company}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Volunteer Experience:</span>
                    <span className="font-semibold">{(userData as VolunteerUser).volunteerExperience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Availability:</span>
                    <span className="font-semibold">{(userData as VolunteerUser).availability}</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Skills/Expertise */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="w-5 h-5 mr-2" />
                {userType === 'individual' ? 'Areas of Expertise' : 'Skills'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {(userType === 'individual' ? (userData as IndividualUser).expertiseAreas : (userData as VolunteerUser).skills).map((skill: string, index: number) => (
                  <Badge key={index} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Motivation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="w-5 h-5 mr-2" />
                Motivation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{(userData as IndividualUser | VolunteerUser).motivation}</p>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Achievements & Recognition
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{(userData as IndividualUser | VolunteerUser).achievements}</p>
            </CardContent>
          </Card>

          {/* Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Address Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-gray-700">{(userData as IndividualUser | VolunteerUser).address}</p>
              <p className="text-gray-600">{userData.city}, {userData.state} - {userData.pincode}</p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );

  const renderActivityTab = () => (
    <div className="space-y-6">
      {renderStatsCards()}
      
      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-gray-800">Profile updated successfully</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-gray-800">
                  {userType === 'individual' ? 'New case assigned' : 
                   userType === 'ngo' ? 'New volunteer registered' : 
                   'Joined new project'}
                </p>
                <p className="text-sm text-gray-500">1 day ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <p className="text-gray-800">Received 5-star review</p>
                <p className="text-sm text-gray-500">3 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Account Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Account Status:</span>
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Member Since:</span>
            <span className="font-semibold">{new Date(userData.joinedDate).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Last Active:</span>
            <span className="font-semibold">{new Date(userData.lastActive).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Profile Completeness:</span>
            <div className="flex items-center space-x-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
              <span className="text-sm font-semibold">95%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderReviewsTab = () => (
    <div className="space-y-6">
      {/* Rating Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="w-5 h-5 mr-2" />
            Rating Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-800">{userData.stats.rating}</div>
              <div className="flex items-center justify-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(userData.stats.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-600">{userData.stats.reviews} reviews</div>
            </div>
            <div className="flex-1 space-y-2">
              {[5, 4, 3, 2, 1].map(rating => (
                <div key={rating} className="flex items-center space-x-2">
                  <span className="text-sm w-8">{rating}★</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ 
                        width: rating === 5 ? '70%' : rating === 4 ? '20%' : rating === 3 ? '5%' : '3%'
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">
                    {rating === 5 ? '70%' : rating === 4 ? '20%' : rating === 3 ? '5%' : '3%'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reviews</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Review 1 */}
          <div className="border-b pb-4">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-800">Sarah Johnson</p>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">2 days ago</span>
                </div>
                <p className="text-gray-700">
                  {userType === 'individual' 
                    ? "Excellent counseling services. Dr. Sharma was very understanding and helped me through a difficult time. Highly recommend!"
                    : userType === 'ngo'
                    ? "Amazing organization! Their education program has made a real difference in our community. Very professional and dedicated team."
                    : "Great volunteer! Rahul was very helpful during our coding workshop for kids. Very patient and knowledgeable."
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Review 2 */}
          <div className="border-b pb-4">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-800">Michael Chen</p>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">1 week ago</span>
                </div>
                <p className="text-gray-700">
                  {userType === 'individual' 
                    ? "Professional and compassionate approach. The support provided was exactly what our family needed during crisis."
                    : userType === 'ngo'
                    ? "Transparent and effective NGO. Their healthcare initiatives have improved access to medical care in rural areas."
                    : "Reliable and enthusiastic volunteer. Always goes above and beyond to help. Great addition to any project."
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Review 3 */}
          <div>
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-800">Priya Gupta</p>
                    <div className="flex items-center space-x-1">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                      <Star className="w-4 h-4 text-gray-300" />
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">2 weeks ago</span>
                </div>
                <p className="text-gray-700">
                  {userType === 'individual' 
                    ? "Very helpful and professional. The counseling sessions were effective and provided practical solutions."
                    : userType === 'ngo'
                    ? "Good work in women empowerment. The skill development programs are well-structured and beneficial."
                    : "Good team player and brings positive energy to projects. Technical skills are impressive."
                  }
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 sm:px-6 py-8">
        {/* Profile Header */}
        <Card className={`mb-8 bg-gradient-to-r ${config.bgColor} border-0`}>
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              {/* Profile Image */} 
              <div className="relative">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-300 rounded-full overflow-hidden shadow-lg">
                  <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                    <Camera className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                  </div>
                </div>
                {userData.verified && (
                  <div className="absolute -bottom-2 -right-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-white">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                  {userType === 'ngo' ? (userData as NGOUser).organizationName : (userData as IndividualUser | VolunteerUser).name}
                </h1>
                
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-4">
                  <Badge className={`bg-gradient-to-r ${config.color} text-white`}>
                    {config.title}
                  </Badge>
                  {userData.verified && (
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                  <Badge variant="outline" className="flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {userData.city}, {userData.state}
                  </Badge>
                </div>

                <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-xs sm:text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    {userData.email}
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-1" />
                    {userData.phone}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Joined {new Date(userData.joinedDate).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-2 sm:space-y-0 sm:space-x-3">
                  <Button className={`bg-gradient-to-r ${config.color} w-full sm:w-auto py-2`}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                  <Button variant="outline" className="w-full sm:w-auto py-2">
                    <Heart className="w-4 h-4 mr-2" />
                    Follow
                  </Button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center mt-6 md:mt-0">
                <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                  <div className="text-xl sm:text-2xl font-bold text-gray-800">{userData.stats.rating}</div>
                  <div className="text-xs sm:text-sm text-gray-600">Rating</div>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                  <div className="text-xl sm:text-2xl font-bold text-gray-800">
                  {userType === 'individual' ? (userData.stats as IndividualStats).casesHandled :
                   userType === 'ngo' ? (userData.stats as NGOStats).projectsCompleted :
                   (userData.stats as VolunteerStats).projectsJoined}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    {userType === 'individual' ? 'Cases' :
                     userType === 'ngo' ? 'Projects' : 'Projects'}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Tabs */}
        <div className="mb-8">

          <div className="border-b border-gray-200 overflow-x-auto">
            <nav className="flex space-x-4 sm:space-x-8 min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-2 sm:px-4 border-b-2 font-medium text-sm sm:text-base flex items-center whitespace-nowrap ${
                    activeTab === tab.id
                      ? `border-indigo-500 text-indigo-600`
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mb-8">
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'details' && renderDetailsTab()}
          {activeTab === 'activity' && renderActivityTab()}
          {activeTab === 'reviews' && renderReviewsTab()}
        </div>

        {/* Contact Information Alert */}
        <Alert className="mb-10 bg-blue-50 border-blue-200">
          <Shield className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>Privacy Notice:</strong> Personal contact information is only shared with verified users. 
            All communications through our platform are monitored for safety and security.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}