import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Heart,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Users,
  Clock,
  Award,
  Target,
  Camera,
  Briefcase,
  GraduationCap,
  Star
} from 'lucide-react';

// Define TypeScript interface for form data
interface VolunteerFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  alternateEmail: string;
  phone: string;
  alternatePhone: string;

  // Address Information
  address: string;
  city: string;
  state: string;
  pincode: string;
  district: string;
  country: string;

  // Education & Professional
  educationLevel: string;
  profession: string;
  currentOccupation: string;
  organization: string;

  // Skills & Interests
  skills: string[];
  interests: string[];
  causes: string[];
  languages: string[];

  // Availability
  availabilityType: string;
  weeklyHours: string;
  preferredDays: string[];
  preferredTimes: string[];

  // Experience
  previousVolunteering: boolean;
  volunteerExperience: string;
  organizationsWorked: string;
  achievements: string;

  // References
  referenceName: string;
  referenceContact: string;
  referenceRelation: string;

  // Additional Information
  motivation: string;
  expectations: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;

  // Documents
  profilePhoto: File | null;
  idProof: File | null;
  resume: File | null;
}

export default function VolunteerForm({ onBack }: { onBack?: () => void }): React.JSX.Element {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<VolunteerFormData>({
    // Personal Information
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    alternateEmail: '',
    phone: '',
    alternatePhone: '',

    // Address Information
    address: '',
    city: '',
    state: '',
    pincode: '',
    district: '',
    country: 'India',

    // Education & Professional
    educationLevel: '',
    profession: '',
    currentOccupation: '',
    organization: '',

    // Skills & Interests
    skills: [],
    interests: [],
    causes: [],
    languages: [],

    // Availability
    availabilityType: '',
    weeklyHours: '',
    preferredDays: [],
    preferredTimes: [],

    // Experience
    previousVolunteering: false,
    volunteerExperience: '',
    organizationsWorked: '',
    achievements: '',

    // References
    referenceName: '',
    referenceContact: '',
    referenceRelation: '',

    // Additional Information
    motivation: '',
    expectations: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelation: '',

    // Documents
    profilePhoto: null,
    idProof: null,
    resume: null
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const totalSteps = 5;

  // Options for various fields
  const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];

  const educationLevels = [
    'High School',
    'Diploma',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'Doctorate',
    'Other'
  ];

  const professions = [
    'Student',
    'Teacher/Educator',
    'Healthcare Professional',
    'Engineer',
    'Business Professional',
    'Artist/Creative',
    'Retired',
    'Homemaker',
    'Other'
  ];

  const skillsList = [
    'Teaching', 'Counseling', 'First Aid', 'Computer Skills', 'Photography',
    'Videography', 'Writing', 'Public Speaking', 'Event Management', 'Fundraising',
    'Social Media', 'Graphic Design', 'Translation', 'Carpentry', 'Cooking',
    'Gardening', 'Sports Coaching', 'Music', 'Dance', 'Art & Craft'
  ];

  const interestsList = [
    'Education', 'Healthcare', 'Environment', 'Women Empowerment', 'Child Welfare',
    'Elderly Care', 'Skill Development', 'Rural Development', 'Urban Development',
    'Disaster Relief', 'Animal Welfare', 'Arts & Culture', 'Sports', 'Research',
    'Human Rights', 'Legal Aid', 'Mental Health', 'Disability Services'
  ];

  const causesList = [
    'Education for All', 'Healthcare Access', 'Environmental Protection', 'Gender Equality',
    'Child Rights', 'Elderly Welfare', 'Poverty Alleviation', 'Disaster Response',
    'Animal Protection', 'Cultural Preservation', 'Sports for Development', 'Mental Health Awareness'
  ];

  const languagesList = [
    'English', 'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Urdu', 'Gujarati',
    'Kannada', 'Odia', 'Punjabi', 'Malayalam', 'Assamese', 'Maithili', 'Other'
  ];

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
    'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
    'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir', 'Ladakh'
  ];

  const availabilityTypes = [
    'Full-time (30+ hours/week)',
    'Part-time (10-29 hours/week)',
    'Occasional (1-9 hours/week)',
    'Project-based',
    'Flexible'
  ];

  const weeklyHoursOptions = [
    '1-5 hours',
    '6-10 hours',
    '11-20 hours',
    '21-30 hours',
    '30+ hours'
  ];

  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  const timeSlots = [
    'Morning (6 AM - 12 PM)',
    'Afternoon (12 PM - 5 PM)',
    'Evening (5 PM - 9 PM)',
    'Night (9 PM - 12 AM)',
    'Flexible'
  ];

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof VolunteerFormData] as any),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleArrayChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).includes(value)
        ? (prev[field as keyof typeof prev] as string[]).filter((item: string) => item !== value)
        : [...(prev[field as keyof typeof prev] as string[]), value]
    }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const validateStep = (step: number) => {
    const newErrors: any = {};

    switch (step) {
      case 1:
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        else if (!/^[6-9]\d{9}$/.test(formData.phone)) newErrors.phone = 'Enter valid Indian phone number';
        break;

      case 2:
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state) newErrors.state = 'State is required';
        if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
        else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Enter valid 6-digit pincode';
        break;

      case 3:
        if (!formData.educationLevel) newErrors.educationLevel = 'Education level is required';
        if (!formData.profession) newErrors.profession = 'Profession is required';
        if (formData.skills.length === 0) newErrors.skills = 'Select at least one skill';
        if (formData.interests.length === 0) newErrors.interests = 'Select at least one interest';
        if (formData.languages.length === 0) newErrors.languages = 'Select at least one language';
        break;

      case 4:
        if (!formData.availabilityType) newErrors.availabilityType = 'Availability type is required';
        if (!formData.weeklyHours) newErrors.weeklyHours = 'Weekly hours is required';
        if (formData.preferredDays.length === 0) newErrors.preferredDays = 'Select at least one preferred day';
        break;

      case 5:
        if (!formData.motivation.trim()) newErrors.motivation = 'Motivation is required';
        if (!formData.emergencyContactName.trim()) newErrors.emergencyContactName = 'Emergency contact name is required';
        if (!formData.emergencyContactPhone.trim()) newErrors.emergencyContactPhone = 'Emergency contact phone is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 3000);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-8 overflow-x-auto">
      {[1, 2, 3, 4, 5].map((step) => (
        <div key={step} className="flex items-center flex-shrink-0">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
            currentStep >= step
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
              : 'bg-gray-200 text-gray-500'
          }`}>
            {currentStep > step ? <CheckCircle className="w-5 h-5" /> : step}
          </div>
          {step < 5 && (
            <div className={`h-1 w-12 mx-1 ${
              currentStep > step ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <User className="w-16 h-16 mx-auto mb-4 text-purple-600" />
        <h3 className="text-2xl font-bold text-gray-800">Personal Information</h3>
        <p className="text-gray-600">Tell us about yourself</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
              errors.firstName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
          />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
              errors.lastName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
          />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
              errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
            }`}
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
          />
          {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Gender <span className="text-red-500">*</span>
          </label>
          <select
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
              errors.gender ? 'border-red-500' : 'border-gray-300'
            }`}
            value={formData.gender}
            onChange={(e) => handleInputChange('gender', e.target.value)}
          >
            <option value="">Select Gender</option>
            {genderOptions.map(gender => (
              <option key={gender} value={gender}>{gender}</option>
            ))}
          </select>
          {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Primary Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Alternate Email
          </label>
          <input
            type="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="alternate@email.com"
            value={formData.alternateEmail}
            onChange={(e) => handleInputChange('alternateEmail', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Primary Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="9876543210"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Alternate Phone
          </label>
          <input
            type="tel"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="9876543211"
            value={formData.alternatePhone}
            onChange={(e) => handleInputChange('alternatePhone', e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <MapPin className="w-16 h-16 mx-auto mb-4 text-purple-600" />
        <h3 className="text-2xl font-bold text-gray-800">Address Information</h3>
        <p className="text-gray-600">Where are you located?</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Address <span className="text-red-500">*</span>
          </label>
          <textarea
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
              errors.address ? 'border-red-500' : 'border-gray-300'
            }`}
            rows={3}
            placeholder="Enter your complete address"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                errors.city ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="City"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              District
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="District"
              value={formData.district}
              onChange={(e) => handleInputChange('district', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              State <span className="text-red-500">*</span>
            </label>
            <select
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                errors.state ? 'border-red-500' : 'border-gray-300'
              }`}
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
            >
              <option value="">Select State</option>
              {indianStates.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Pincode <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                errors.pincode ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="123456"
              value={formData.pincode}
              onChange={(e) => handleInputChange('pincode', e.target.value)}
            />
            {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <GraduationCap className="w-16 h-16 mx-auto mb-4 text-purple-600" />
        <h3 className="text-2xl font-bold text-gray-800">Education & Skills</h3>
        <p className="text-gray-600">Share your background and abilities</p>
      </div>

      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Education Level <span className="text-red-500">*</span>
            </label>
            <select
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                errors.educationLevel ? 'border-red-500' : 'border-gray-300'
              }`}
              value={formData.educationLevel}
              onChange={(e) => handleInputChange('educationLevel', e.target.value)}
            >
              <option value="">Select Education Level</option>
              {educationLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
            {errors.educationLevel && <p className="text-red-500 text-sm mt-1">{errors.educationLevel}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Profession <span className="text-red-500">*</span>
            </label>
            <select
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                errors.profession ? 'border-red-500' : 'border-gray-300'
              }`}
              value={formData.profession}
              onChange={(e) => handleInputChange('profession', e.target.value)}
            >
              <option value="">Select Profession</option>
              {professions.map(prof => (
                <option key={prof} value={prof}>{prof}</option>
              ))}
            </select>
            {errors.profession && <p className="text-red-500 text-sm mt-1">{errors.profession}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Current Occupation
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="e.g., Software Engineer, Student"
              value={formData.currentOccupation}
              onChange={(e) => handleInputChange('currentOccupation', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Organization/Institute
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Current organization or institute"
              value={formData.organization}
              onChange={(e) => handleInputChange('organization', e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Skills <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-4">
            {skillsList.map(skill => (
              <label key={skill} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded text-purple-600 focus:ring-purple-500"
                  checked={formData.skills.includes(skill)}
                  onChange={() => handleArrayChange('skills', skill)}
                />
                <span className="text-sm text-gray-700">{skill}</span>
              </label>
            ))}
          </div>
          {errors.skills && <p className="text-red-500 text-sm mt-1">{errors.skills}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Areas of Interest <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-4">
            {interestsList.map(interest => (
              <label key={interest} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded text-purple-600 focus:ring-purple-500"
                  checked={formData.interests.includes(interest)}
                  onChange={() => handleArrayChange('interests', interest)}
                />
                <span className="text-sm text-gray-700">{interest}</span>
              </label>
            ))}
          </div>
          {errors.interests && <p className="text-red-500 text-sm mt-1">{errors.interests}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Languages You Speak <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {languagesList.map(language => (
              <label key={language} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded text-purple-600 focus:ring-purple-500"
                  checked={formData.languages.includes(language)}
                  onChange={() => handleArrayChange('languages', language)}
                />
                <span className="text-sm text-gray-700">{language}</span>
              </label>
            ))}
          </div>
          {errors.languages && <p className="text-red-500 text-sm mt-1">{errors.languages}</p>}
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <Clock className="w-16 h-16 mx-auto mb-4 text-purple-600" />
        <h3 className="text-2xl font-bold text-gray-800">Availability & Experience</h3>
        <p className="text-gray-600">When and how much can you volunteer?</p>
      </div>

      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Availability Type <span className="text-red-500">*</span>
            </label>
            <select
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                errors.availabilityType ? 'border-red-500' : 'border-gray-300'
              }`}
              value={formData.availabilityType}
              onChange={(e) => handleInputChange('availabilityType', e.target.value)}
            >
              <option value="">Select Availability</option>
              {availabilityTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.availabilityType && <p className="text-red-500 text-sm mt-1">{errors.availabilityType}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Weekly Hours <span className="text-red-500">*</span>
            </label>
            <select
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                errors.weeklyHours ? 'border-red-500' : 'border-gray-300'
              }`}
              value={formData.weeklyHours}
              onChange={(e) => handleInputChange('weeklyHours', e.target.value)}
            >
              <option value="">Select Hours</option>
              {weeklyHoursOptions.map(hours => (
                <option key={hours} value={hours}>{hours}</option>
              ))}
            </select>
            {errors.weeklyHours && <p className="text-red-500 text-sm mt-1">{errors.weeklyHours}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Preferred Days <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {daysOfWeek.map(day => (
              <label key={day} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded text-purple-600 focus:ring-purple-500"
                  checked={formData.preferredDays.includes(day)}
                  onChange={() => handleArrayChange('preferredDays', day)}
                />
                <span className="text-sm text-gray-700">{day}</span>
              </label>
            ))}
          </div>
          {errors.preferredDays && <p className="text-red-500 text-sm mt-1">{errors.preferredDays}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Preferred Time Slots
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {timeSlots.map(slot => (
              <label key={slot} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded text-purple-600 focus:ring-purple-500"
                  checked={formData.preferredTimes.includes(slot)}
                  onChange={() => handleArrayChange('preferredTimes', slot)}
                />
                <span className="text-sm text-gray-700">{slot}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t pt-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Previous Volunteering Experience</h4>

          <div className="mb-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="rounded text-purple-600 focus:ring-purple-500"
                checked={formData.previousVolunteering}
                onChange={(e) => handleInputChange('previousVolunteering', e.target.checked)}
              />
              <span className="text-sm text-gray-700">I have previous volunteering experience</span>
            </label>
          </div>

          {formData.previousVolunteering && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Describe Your Experience
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  rows={3}
                  placeholder="Describe your previous volunteering work..."
                  value={formData.volunteerExperience}
                  onChange={(e) => handleInputChange('volunteerExperience', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Organizations Worked With
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  rows={2}
                  placeholder="List organizations you've volunteered with..."
                  value={formData.organizationsWorked}
                  onChange={(e) => handleInputChange('organizationsWorked', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Achievements & Recognition
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  rows={2}
                  placeholder="Any awards, certificates, or notable achievements..."
                  value={formData.achievements}
                  onChange={(e) => handleInputChange('achievements', e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <Heart className="w-16 h-16 mx-auto mb-4 text-purple-600" />
        <h3 className="text-2xl font-bold text-gray-800">Additional Information</h3>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Motivation <span className="text-red-500">*</span>
          </label>
          <textarea
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
              errors.motivation ? 'border-red-500' : 'border-gray-300'
            }`}
            rows={4}
            placeholder="Why do you want to volunteer?"
            value={formData.motivation}
            onChange={(e) => handleInputChange('motivation', e.target.value)}
          />
          {errors.motivation && <p className="text-red-500 text-sm mt-1">{errors.motivation}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Expectations
          </label>
          <textarea
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            rows={3}
            placeholder="What do you expect from volunteering?"
            value={formData.expectations}
            onChange={(e) => handleInputChange('expectations', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Emergency Contact Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
              errors.emergencyContactName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Emergency contact full name"
            value={formData.emergencyContactName}
            onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
          />
          {errors.emergencyContactName && <p className="text-red-500 text-sm mt-1">{errors.emergencyContactName}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Emergency Contact Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
              errors.emergencyContactPhone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Emergency contact phone number"
            value={formData.emergencyContactPhone}
            onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
          />
          {errors.emergencyContactPhone && <p className="text-red-500 text-sm mt-1">{errors.emergencyContactPhone}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Emergency Contact Relation
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="Relation to emergency contact"
            value={formData.emergencyContactRelation}
            onChange={(e) => handleInputChange('emergencyContactRelation', e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  return (
    <Card className="max-w-4xl mx-auto p-6">
      <CardHeader className="flex justify-between items-center">
        <div>
          <CardTitle>Volunteer Registration</CardTitle>
          <CardDescription>Step {currentStep} of {totalSteps}</CardDescription>
        </div>
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            Back to Home
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {renderStepIndicator()}
        {submitSuccess ? (
          <Alert className="mb-6">
            <CheckCircle className="w-6 h-6 mr-2" />
            <AlertDescription>Thank you for registering as a volunteer!</AlertDescription>
          </Alert>
        ) : (
          <>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
            {currentStep === 5 && renderStep5()}

            <div className="flex justify-between mt-8">
              {currentStep > 1 ? (
                <Button variant="outline" onClick={prevStep} disabled={isSubmitting}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              ) : (
                <div />
              )}

              {currentStep < totalSteps ? (
                <Button onClick={nextStep} disabled={isSubmitting}>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
