import { useState, useEffect } from 'react';
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
  Share2,
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
  Facebook,
  Twitter,
  Linkedin,
  Sparkles,
  Loader2,
  AlertCircle,
} from 'lucide-react';

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
  alternatePhone?: string;
  dateOfBirth?: string;
  gender?: string;
  profileImage?: string;
  address?: string;
  city: string;
  state: string;
  pincode?: string;
  education?: string;
  specializations?: string[];
  experience?: string;
  currentEmployment?: string;
  organization?: string;
  languages?: string[];
  bio?: string;
  motivation?: string;
  expertiseAreas?: string[];
  availability?: string;
  workingHours?: string;
  achievements?: string;
  stats: IndividualStats;
  verified: boolean;
  joinedDate: string;
  lastActive: string;
}

interface NGOUser {
  organizationName: string;
  email: string;
  alternateEmail?: string;
  phone: string;
  alternatePhone?: string;
  websiteUrl?: string;
  registrationNumber: string;
  registrationType: string;
  dateOfEstablishment: string;
  profileImage?: string;
  registeredAddress: string;
  operationalAddress?: string;
  city: string;
  state: string;
  pincode: string;
  district?: string;
  panNumber: string;
  gstNumber?: string;
  section80G: boolean;
  section12A: boolean;
  csr1Registration: boolean;
  vision: string;
  mission: string;
  objectives: string;
  mainFocusAreas: string[];
  targetBeneficiaries: string[];
  geographicalPresence: string[];
  organizationSize?: string;
  annualBudget?: string;
  chairperson: { name: string; contact: string; email: string };
  secretary: { name: string; contact: string; email: string };
  treasurer: { name: string; contact: string; email: string };
  currentPrograms: string;
  majorAchievements?: string;
  volunteersCount?: number;
  fullTimeStaff?: number;
  partTimeStaff?: number;
  lastAuditDate?: string;
  auditFirm?: string;
  majorFundingSources: string[];
  socialMediaLinks: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;
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
  dateOfBirth?: string;
  gender?: string;
  profileImage?: string;
  address?: string;
  city: string;
  state: string;
  pincode?: string;
  profession?: string;
  company?: string;
  skills?: string[];
  interests?: string[];
  languages?: string[];
  availability?: string;
  preferredCauses?: string[];
  volunteerExperience?: string;
  bio?: string;
  motivation?: string;
  pastExperience?: string;
  achievements?: string;
  stats: VolunteerStats;
  verified: boolean;
  joinedDate: string;
  lastActive: string;
}

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userType, setUserType] = useState<'individual' | 'ngo' | 'volunteer' | null>(null);
  const [userData, setUserData] = useState<IndividualUser | NGOUser | VolunteerUser | null>(null);

  const mockUserData = {
    individual: {
      name: 'Dr. Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 98765 43210',
      alternatePhone: '+91 87654 32109',
      dateOfBirth: '1985-03-15',
      gender: 'Female',
      profileImage: '/api/placeholder/150/150',
      address: 'A-123, Green Park Extension, New Delhi - 110016',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110016',
      education: 'Master in Social Work (MSW)',
      specializations: ['Mental Health', 'Child Welfare', 'Women Empowerment'],
      experience: '8 years',
      currentEmployment: 'Freelance/Independent',
      organization: 'Independent Practice',
      languages: ['Hindi', 'English', 'Punjabi'],
      bio: 'Passionate social worker with 8+ years of experience in mental health counseling and child welfare. Dedicated to empowering communities through evidence-based interventions and advocacy.',
      motivation: 'Driven by the belief that every individual deserves dignity, support, and the opportunity to thrive.',
      expertiseAreas: ['Individual Counseling', 'Group Therapy', 'Crisis Intervention', 'Community Outreach'],
      availability: 'Part-time',
      workingHours: 'Flexible Hours',
      achievements: 'Best Social Worker Award 2023, Certified in Trauma Counseling',
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
      registeredAddress: 'House No. 456, Sector 15, Noida, Uttar Pradesh - 201301',
      operationalAddress: 'Same as registered address',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201301',
      district: 'Gautam Buddh Nagar',
      panNumber: 'AABCH1234E',
      gstNumber: '09AABCH1234E1Z5',
      section80G: true,
      section12A: true,
      csr1Registration: true,
      vision: 'A world where every child has access to quality education and healthcare.',
      mission: 'To empower underprivileged communities through education, healthcare, and sustainable development programs.',
      objectives: 'Provide quality education to underprivileged children, Improve healthcare access in rural areas, Promote women empowerment and skill development',
      mainFocusAreas: ['Education', 'Healthcare', 'Women Empowerment', 'Rural Development'],
      targetBeneficiaries: ['Children (0-18 years)', 'Women', 'Rural Communities'],
      geographicalPresence: ['Uttar Pradesh', 'Delhi', 'Haryana'],
      organizationSize: 'Medium (11-50 employees)',
      annualBudget: '₹25 Lakhs - ₹1 Crore',
      chairperson: { name: 'Rajesh Kumar', contact: '+91 98765-11111', email: 'rajesh@helpinghands.org' },
      secretary: { name: 'Sunita Devi', contact: '+91 98765-22222', email: 'sunita@helpinghands.org' },
      treasurer: { name: 'Amit Singh', contact: '+91 98765-33333', email: 'amit@helpinghands.org' },
      currentPrograms: 'Education Support Program: Providing scholarships and learning materials to 500+ children. Healthcare Initiative: Mobile health camps in 20 villages. Women Empowerment: Skill development training for 200+ women.',
      majorAchievements: 'Educated 2000+ children, Conducted 100+ health camps, Trained 800+ women in various skills',
      volunteersCount: 45,
      fullTimeStaff: 12,
      partTimeStaff: 8,
      lastAuditDate: '2024-03-31',
      auditFirm: 'ABC & Associates',
      majorFundingSources: ['Corporate CSR', 'Individual Donations', 'Government Grants'],
      socialMediaLinks: {
        facebook: 'https://facebook.com/helpinghandsfoundation',
        twitter: 'https://twitter.com/helpinghands_ngo',
        linkedin: 'https://linkedin.com/company/helping-hands-foundation',
        instagram: 'https://instagram.com/helpinghandsfoundation',
        youtube: 'https://youtube.com/c/helpinghandsfoundation'
      },
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
      name: 'Rahul Kumar',
      email: 'rahul.volunteer@email.com',
      phone: '+91 87654 32109',
      dateOfBirth: '1995-07-22',
      gender: 'Male',
      profileImage: '/api/placeholder/150/150',
      address: 'Flat 204, Sunrise Apartments, Sector 12, Gurgaon - 122001',
      city: 'Gurgaon',
      state: 'Haryana',
      pincode: '122001',
      profession: 'Software Engineer',
      company: 'Tech Solutions Pvt Ltd',
      skills: ['Teaching', 'Content Writing', 'Web Development', 'Event Management'],
      interests: ['Education', 'Environment', 'Technology for Good', 'Child Welfare'],
      languages: ['Hindi', 'English'],
      availability: 'Weekends',
      preferredCauses: ['Education', 'Technology for Good', 'Environmental Conservation'],
      volunteerExperience: '3 years',
      bio: 'Software engineer passionate about using technology for social good. Love teaching coding to underprivileged children and contributing to environmental causes.',
      motivation: 'Believe in giving back to society and using my technical skills to create positive impact.',
      pastExperience: 'Taught computer basics to 100+ students at rural schools, Organized 5 tree plantation drives, Developed website for 3 local NGOs',
      achievements: 'Volunteer of the Year 2024, Certified in Child Safety',
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

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        // For testing purposes, use mock data
        setUserData(mockUserData.individual);
        setUserType('individual');
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('Failed to load user profile. Please try again.');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const effectiveUserType = userType ?? 'individual';

  const getProfileConfig = (type: 'individual' | 'ngo' | 'volunteer') => {
    switch (type) {
      case 'individual':
        return {
          icon: User,
          title: 'Social Worker',
          color: 'bg-blue-600',
          lightColor: 'bg-blue-50',
          textColor: 'text-blue-600',
          borderColor: 'border-blue-200'
        };
      case 'ngo':
        return {
          icon: Building2,
          title: 'NGO',
          color: 'bg-green-600',
          lightColor: 'bg-green-50',
          textColor: 'text-green-600',
          borderColor: 'border-green-200'
        };
      case 'volunteer':
        return {
          icon: HandHeart,
          title: 'Volunteer',
          color: 'bg-purple-600',
          lightColor: 'bg-purple-50',
          textColor: 'text-purple-600',
          borderColor: 'border-purple-200'
        };
      default:
        return {
          icon: User,
          title: 'User',
          color: 'bg-gray-600',
          lightColor: 'bg-gray-50',
          textColor: 'text-gray-600',
          borderColor: 'border-gray-200'
        };
    }
  };

  const config = getProfileConfig(effectiveUserType);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'details', label: 'Details', icon: FileText },
    { id: 'activity', label: 'Activity', icon: TrendingUp },
    { id: 'reviews', label: 'Reviews', icon: Star }
  ];

  const renderStatsCards = () => {
    if (!userData) return null;

    let statsConfig: Array<{ label: string; value: string | number; icon: any; gradient: string }> = [];

    if (effectiveUserType === 'individual') {
      const stats = (userData as IndividualUser).stats;
      statsConfig = [
        { label: 'Cases', value: stats.casesHandled, icon: FileText, gradient: 'from-blue-500 to-cyan-500' },
        { label: 'Helped', value: stats.peopleHelped, icon: Users, gradient: 'from-purple-500 to-pink-500' },
        { label: 'Years', value: stats.yearsActive, icon: Calendar, gradient: 'from-orange-500 to-red-500' },
        { label: 'Rating', value: `${stats.rating}/5`, icon: Star, gradient: 'from-yellow-500 to-orange-500' }
      ];
    } else if (effectiveUserType === 'ngo') {
      const stats = (userData as NGOUser).stats;
      statsConfig = [
        { label: 'Helped', value: `${(stats.peopleHelped / 1000).toFixed(0)}K+`, icon: Users, gradient: 'from-blue-500 to-cyan-500' },
        { label: 'Projects', value: stats.projectsCompleted, icon: Target, gradient: 'from-green-500 to-emerald-500' },
        { label: 'Years', value: stats.yearsActive, icon: Calendar, gradient: 'from-orange-500 to-red-500' },
        { label: 'Rating', value: `${stats.rating}/5`, icon: Star, gradient: 'from-yellow-500 to-orange-500' }
      ];
    } else {
      const stats = (userData as VolunteerUser).stats;
      statsConfig = [
        { label: 'Hours', value: stats.hoursContributed, icon: Clock, gradient: 'from-blue-500 to-cyan-500' },
        { label: 'Projects', value: stats.projectsJoined, icon: Target, gradient: 'from-purple-500 to-pink-500' },
        { label: 'NGOs', value: stats.ngosHelped, icon: Building2, gradient: 'from-green-500 to-emerald-500' },
        { label: 'Rating', value: `${stats.rating}/5`, icon: Star, gradient: 'from-yellow-500 to-orange-500' }
      ];
    }

    return (
      <div className="grid grid-cols-2 gap-3 mb-6">
        {statsConfig.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className={`w-10 h-10 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center mb-2`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
    );
  };

  const InfoRow = ({ icon: Icon, label, value }: any) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-2 text-gray-600">
        <Icon className="w-4 h-4" />
        <span className="text-sm">{label}</span>
      </div>
      <span className="text-sm font-semibold text-gray-900 text-right max-w-[60%]">{value}</span>
    </div>
  );

  const renderOverviewTab = () => (
    <div className="space-y-4">
      {renderStatsCards()}

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
          <User className="w-5 h-5" />
          Basic Info
        </h3>
        <div className="space-y-0">
          {effectiveUserType === 'ngo' ? (
            <>
              <InfoRow icon={Building2} label="Organization" value={(userData as NGOUser).organizationName} />
              <InfoRow icon={FileText} label="Registration" value={(userData as NGOUser).registrationNumber} />
              <InfoRow icon={Mail} label="Email" value={userData ? userData.email : ''} />
              <InfoRow icon={Phone} label="Phone" value={userData ? userData.phone : ''} />
              <InfoRow icon={MapPin} label="Location" value={userData ? `${userData.city}, ${userData.state}` : ''} />
            </>
          ) : (
            <>
              <InfoRow icon={User} label="Name" value={(userData as IndividualUser | VolunteerUser).name} />
              <InfoRow icon={Mail} label="Email" value={userData ? userData.email : ''} />
              <InfoRow icon={Phone} label="Phone" value={userData ? userData.phone : ''} />
              <InfoRow icon={MapPin} label="Location" value={userData ? `${userData.city}, ${userData.state}` : ''} />
            </>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Target className="w-5 h-5" />
          {effectiveUserType === 'individual' ? 'Specializations' :
           effectiveUserType === 'ngo' ? 'Focus Areas' : 'Interests'}
        </h3>
        <div className="flex flex-wrap gap-2">
          {(
            effectiveUserType === 'individual'
              ? (userData ? (userData as IndividualUser).specializations || [] : [])
              : effectiveUserType === 'ngo'
                ? (userData as NGOUser).mainFocusAreas || []
                : (userData as VolunteerUser).interests || []
          ).map((item: string, index: number) => (
            <span key={index} className={`${config.lightColor} ${config.textColor} px-3 py-1.5 rounded-full text-xs font-semibold`}>
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          {effectiveUserType === 'ngo' ? 'Mission' : 'About'}
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          {effectiveUserType === 'ngo' ? (userData as NGOUser).mission : (userData as IndividualUser | VolunteerUser).bio}
        </p>
      </div>

      {effectiveUserType !== 'ngo' && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Languages
          </h3>
          <div className="flex flex-wrap gap-2">
            {((userData as IndividualUser | VolunteerUser).languages || []).map((lang: string, index: number) => (
              <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-xs font-medium">
                {lang}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderDetailsTab = () => (
    <div className="space-y-4">
      {effectiveUserType === 'ngo' ? (
        <>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-base font-bold text-gray-900 mb-3">Vision</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{(userData as NGOUser).vision}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-base font-bold text-gray-900 mb-3">Key Objectives</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{(userData as NGOUser).objectives}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Legal & Compliance
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">PAN Number</span>
                <span className="text-sm font-semibold">{(userData as NGOUser).panNumber}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">GST Number</span>
                <span className="text-sm font-semibold">{(userData as NGOUser).gstNumber}</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  80G Certified
                </span>
                <span className="bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  12A Registered
                </span>
                <span className="bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  CSR-1
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Key Personnel
            </h3>
            <div className="space-y-4">
              {[
                { title: 'Chairperson', data: (userData as NGOUser).chairperson },
                { title: 'Secretary', data: (userData as NGOUser).secretary },
                { title: 'Treasurer', data: (userData as NGOUser).treasurer }
              ].map((person, idx) => (
                <div key={idx} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="text-xs font-semibold text-gray-500 mb-1">{person.title}</div>
                  <div className="text-sm font-bold text-gray-900">{person.data.name}</div>
                  <div className="text-xs text-gray-600">{person.data.email}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Current Programs
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">{(userData as NGOUser).currentPrograms}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              Social Media
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <button className="flex flex-col items-center gap-2 p-3 rounded-xl bg-blue-50 active:bg-blue-100">
                <Facebook className="w-5 h-5 text-blue-600" />
                <span className="text-xs font-medium text-blue-600">Facebook</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-3 rounded-xl bg-sky-50 active:bg-sky-100">
                <Twitter className="w-5 h-5 text-sky-600" />
                <span className="text-xs font-medium text-sky-600">Twitter</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-3 rounded-xl bg-blue-50 active:bg-blue-100">
                <Linkedin className="w-5 h-5 text-blue-700" />
                <span className="text-xs font-medium text-blue-700">LinkedIn</span>
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-base font-bold text-gray-900 mb-4">
              {effectiveUserType === 'individual' ? 'Professional Details' : 'Personal Details'}
            </h3>
            <div className="space-y-0">
              {effectiveUserType === 'individual' ? (
                <>
                  <InfoRow icon={Award} label="Education" value={(userData as IndividualUser).education} />
                  <InfoRow icon={Building2} label="Employment" value={(userData as IndividualUser).currentEmployment} />
                  <InfoRow icon={Clock} label="Availability" value={(userData as IndividualUser).availability} />
                  <InfoRow icon={Calendar} label="Working Hours" value={(userData as IndividualUser).workingHours} />
                </>
              ) : (
                <>
                  <InfoRow icon={Building2} label="Company" value={(userData as VolunteerUser).company} />
                  <InfoRow icon={Award} label="Experience" value={(userData as VolunteerUser).volunteerExperience} />
                  <InfoRow icon={Clock} label="Availability" value={(userData as VolunteerUser).availability} />
                </>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Award className="w-5 h-5" />
              {effectiveUserType === 'individual' ? 'Expertise' : 'Skills'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {(effectiveUserType === 'individual' ? (userData as IndividualUser).expertiseAreas || [] : (userData as VolunteerUser).skills || []).map((skill: string, index: number) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-xs font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Motivation
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">{(userData as IndividualUser | VolunteerUser).motivation}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Award className="w-5 h-5" />
              Achievements
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">{(userData as IndividualUser | VolunteerUser).achievements}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Address
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">{(userData as IndividualUser | VolunteerUser).address}</p>
            <p className="text-sm text-gray-600 mt-1">
              {userData ? `${userData.city}, ${userData.state} - ${userData.pincode}` : ''}
            </p>
          </div>
        </>
      )}
    </div>
  );

  const renderActivityTab = () => (
    <div className="space-y-4">
      {renderStatsCards()}

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Recent Activity
        </h3>
        <div className="space-y-4">
          {[
            { color: 'bg-green-500', text: 'Profile updated successfully', time: '2 hours ago' },
            { color: 'bg-blue-500', text: effectiveUserType === 'individual' ? 'New case assigned' : effectiveUserType === 'ngo' ? 'New volunteer registered' : 'Joined new project', time: '1 day ago' },
            { color: 'bg-purple-500', text: 'Received 5-star review', time: '3 days ago' }
          ].map((activity, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className={`w-2 h-2 ${activity.color} rounded-full mt-2 flex-shrink-0`}></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 font-medium">{activity.text}</p>
                <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Account Info
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <span className="text-sm text-gray-600">Status</span>
            <span className="bg-green-50 text-green-700 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Verified
            </span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <span className="text-sm text-gray-600">Member Since</span>
            <span className="text-sm font-semibold">{new Date(userData!.joinedDate).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <span className="text-sm text-gray-600">Last Active</span>
            <span className="text-sm font-semibold">{new Date(userData!.lastActive).toLocaleDateString()}</span>
          </div>
          <div className="pt-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Profile Completeness</span>
              <span className="text-sm font-bold text-green-600">95%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: '95%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReviewsTab = () => {
    if (!userData || !userData.stats) return null;

    return (
      <div className="space-y-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Star className="w-5 h-5" />
            Rating Overview
          </h3>
          <div className="flex flex-col items-center text-center mb-6">
            <div className="text-5xl font-bold text-gray-900 mb-2">{userData!.stats.rating}</div>
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(userData!.stats.rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-gray-600">{userData!.stats.reviews} reviews</div>
          </div>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map(rating => (
              <div key={rating} className="flex items-center gap-2">
                <span className="text-xs w-8 text-gray-600">{rating}★</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all"
                    style={{
                      width: rating === 5 ? '70%' : rating === 4 ? '20%' : rating === 3 ? '5%' : '3%'
                    }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 w-10 text-right">
                  {rating === 5 ? '70%' : rating === 4 ? '20%' : rating === 3 ? '5%' : '3%'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Profile</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // No user data
  if (!userData || !userType) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No profile data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className={`${config.color} text-white`}>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img
                src={userData.profileImage || '/api/placeholder/120/120'}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
              />
              {userData.verified && (
                <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <config.icon className="w-6 h-6" />
                <span className="text-sm font-medium opacity-90">{config.title}</span>
              </div>
              <h1 className="text-2xl font-bold mb-1">
                {effectiveUserType === 'ngo' ? (userData! as NGOUser).organizationName : (userData! as IndividualUser | VolunteerUser).name}
              </h1>
              <p className="text-white/80 text-sm">
                {effectiveUserType === 'ngo' ? `${userData!.city}, ${userData!.state}` : `${userData!.city}, ${userData!.state}`}
              </p>
            </div>
            <div className="flex gap-2">
              <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                <Share2 className="w-4 h-4 inline mr-2" />
                Share
              </button>
              <button className="bg-white text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                <Camera className="w-4 h-4 inline mr-2" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex gap-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? `${config.textColor} ${config.borderColor}`
                    : 'text-gray-500 border-transparent hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'details' && renderDetailsTab()}
        {activeTab === 'activity' && renderActivityTab()}
        {activeTab === 'reviews' && renderReviewsTab()}
      </div>
    </div>
  );
}
