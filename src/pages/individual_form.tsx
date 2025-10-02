import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  User,
  MapPin,
  GraduationCap,
  CheckCircle,
  AlertCircle,
  Users,
  Heart,
  ArrowRight,
  ArrowLeft,
  Upload
} from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  education: string;
  specialization: string[];
  experience: string;
  currentEmployment: string;
  organization: string;
  socialWorkLicense: string;
  expertiseAreas: string[];
  languages: string[];
  availability: string;
  workingHours: string;
  bio: string;
  motivation: string;
  achievements: string;
  references: string;
  profilePhoto: File | null;
  documents: File[];
}

interface IndividualSocialWorkerFormProps {
  onBack: () => void;
}

export default function IndividualSocialWorkerForm({ onBack }: IndividualSocialWorkerFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    pincode: '',

    // Professional Information
    education: '',
    specialization: [],
    experience: '',
    currentEmployment: '',
    organization: '',
    socialWorkLicense: '',

    // Areas of Expertise
    expertiseAreas: [],
    languages: [],
    availability: '',
    workingHours: '',

    // Additional Information
    bio: '',
    motivation: '',
    achievements: '',
    references: '',
    profilePhoto: null,
    documents: []
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 4;

  const specializations = [
    'Child Welfare', 'Mental Health', 'Healthcare', 'Education', 'Women Empowerment',
    'Elderly Care', 'Disability Services', 'Community Development', 'Disaster Relief',
    'Rural Development', 'Urban Planning', 'Substance Abuse', 'Family Counseling'
  ];

  const expertiseAreas = [
    'Individual Counseling', 'Group Therapy', 'Crisis Intervention', 'Case Management',
    'Community Outreach', 'Program Development', 'Research & Advocacy', 'Training & Workshops',
    'Policy Development', 'Grant Writing', 'Volunteer Management', 'Emergency Response'
  ];

  const indianLanguages = [
    'Hindi', 'English', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Gujarati', 'Urdu',
    'Kannada', 'Odia', 'Punjabi', 'Malayalam', 'Assamese', 'Maithili', 'Sanskrit'
  ];

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
    'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
    'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir', 'Ladakh'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
    if (serverErrors[field]) {
      setServerErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleFileChange = (field: 'profilePhoto' | 'documents', files: FileList | null) => {
    if (field === 'profilePhoto' && files && files[0]) {
      setFormData(prev => ({
        ...prev,
        profilePhoto: files[0]
      }));
    } else if (field === 'documents' && files) {
      setFormData(prev => ({
        ...prev,
        documents: Array.from(files)
      }));
    }
  };

  const handleArrayChange = (field: string, value: string) => {
    setFormData(prev => {
      const currentArray = (prev as any)[field] as string[];
      return {
        ...prev,
        [field]: currentArray.includes(value)
          ? currentArray.filter(item => item !== value)
          : [...currentArray, value]
      };
    });
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    
    switch (step) {
  case 1:
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[6-9]\d{9}$/.test(formData.phone)) newErrors.phone = 'Enter valid Indian phone number';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    break;
        
      case 2:
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state) newErrors.state = 'State is required';
        if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
        else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Enter valid 6-digit pincode';
        break;
        
      case 3:
        if (!formData.education.trim()) newErrors.education = 'Education is required';
        if (formData.specialization.length === 0) newErrors.specialization = 'Select at least one specialization';
        if (!formData.experience) newErrors.experience = 'Experience is required';
        if (!formData.socialWorkLicense.trim()) newErrors.socialWorkLicense = 'Social work license is required';
        if (formData.languages.length === 0) newErrors.languages = 'Select at least one language';
        break;
        
      case 4:
        if (!formData.bio.trim()) newErrors.bio = 'Bio is required';
        if (formData.bio.length < 100) newErrors.bio = 'Bio must be at least 100 characters';
        if (!formData.motivation.trim()) newErrors.motivation = 'Motivation is required';
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
    setErrors({});
    setServerErrors({});

    try {
      const name = `${formData.firstName} ${formData.lastName}`.trim();
      const submitData = {
        role: 'individual',
        name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        education: formData.education,
        expertise: formData.specialization,
        experience: formData.experience,
        languages: formData.languages,
        availability: formData.availability,
        bio: formData.bio,
        motivation: formData.motivation,
        currentEmployment: formData.currentEmployment,
        organization: formData.organization,
        socialWorkLicense: formData.socialWorkLicense,
        expertiseAreas: formData.expertiseAreas,
        workingHours: formData.workingHours,
        achievements: formData.achievements,
        references: formData.references,
      };

      const response = await axios.post('http://localhost:5000/api/auth/register', submitData);

      // Success
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Upload files if present
      if (formData.profilePhoto || formData.documents.length > 0) {
        const uploadFormData = new FormData();
        if (formData.profilePhoto) {
          uploadFormData.append('profilePhoto', formData.profilePhoto);
        }
        formData.documents.forEach(doc => {
          uploadFormData.append('documents', doc);
        });
        uploadFormData.append('userId', response.data.user._id);

        try {
          await axios.post('http://localhost:5000/api/upload', uploadFormData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${response.data.token}`
            }
          });
        } catch (uploadError) {
          console.warn('File upload failed, but registration succeeded:', uploadError);
          // Don't fail registration on upload error
        }
      }

      navigate('/profile');
    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.response && error.response.data) {
        const data = error.response.data;
        if (data.errors) {
          const errorObj: Record<string, string> = {};
          data.errors.forEach((err: any) => {
            errorObj[err.param] = err.msg;
          });
          setServerErrors(errorObj);
        } else {
          alert(data.message || 'Registration failed');
        }
      } else {
        alert('Network error. Please try again.');
      }
      setIsSubmitting(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-8 flex-wrap sm:flex-nowrap">
      {[1, 2, 3, 4].map((step) => (
        <div
          key={step}
          className="flex items-center mb-2 sm:mb-0 transition-transform duration-300 ease-in-out hover:scale-110"
          aria-current={currentStep === step ? 'step' : undefined}
        >
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold shadow-lg ${
              currentStep === step
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white scale-110'
                : currentStep > step
                ? 'bg-gradient-to-r from-indigo-400 to-purple-400 text-white'
                : 'bg-gray-200 text-gray-500'
            }`}
            style={{ transition: 'all 0.3s ease' }}
          >
            {currentStep > step ? (
              <CheckCircle className="w-6 h-6" />
            ) : (
              <span className="text-lg font-bold">{step}</span>
            )}
          </div>
          {step < 4 && (
            <div
              className={`h-1 w-20 mx-3 rounded-full ${
                currentStep > step
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600'
                  : 'bg-gray-300'
              }`}
              style={{ transition: 'all 0.3s ease' }}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <User className="w-16 h-16 mx-auto mb-4 text-indigo-600" />
        <h3 className="text-2xl font-bold text-gray-800">Personal Information</h3>
        <p className="text-gray-600">Let's start with your basic details</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
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
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
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
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Create a secure password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
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
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
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
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.gender ? 'border-red-500' : 'border-gray-300'
            }`}
            value={formData.gender}
            onChange={(e) => handleInputChange('gender', e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <MapPin className="w-16 h-16 mx-auto mb-4 text-indigo-600" />
        <h3 className="text-2xl font-bold text-gray-800">Address Information</h3>
        <p className="text-gray-600">Where are you located?</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Full Address <span className="text-red-500">*</span>
          </label>
          <textarea
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.address ? 'border-red-500' : 'border-gray-300'
            }`}
            rows={3}
            placeholder="Enter your complete address"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.city ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter city"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              State <span className="text-red-500">*</span>
            </label>
            <select
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
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
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
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
        <GraduationCap className="w-16 h-16 mx-auto mb-4 text-indigo-600" />
        <h3 className="text-2xl font-bold text-gray-800">Professional Information</h3>
        <p className="text-gray-600">Tell us about your qualifications and expertise</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Highest Education <span className="text-red-500">*</span>
          </label>
          <select
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.education ? 'border-red-500' : 'border-gray-300'
            }`}
            value={formData.education}
            onChange={(e) => handleInputChange('education', e.target.value)}
          >
            <option value="">Select Education Level</option>
            <option value="bachelor-social-work">Bachelor in Social Work (BSW)</option>
            <option value="master-social-work">Master in Social Work (MSW)</option>
            <option value="phd-social-work">PhD in Social Work</option>
            <option value="bachelor-other">Bachelor's in Other Field</option>
            <option value="master-other">Master's in Other Field</option>
            <option value="diploma">Diploma in Social Work</option>
            <option value="certificate">Certificate Course</option>
          </select>
          {errors.education && <p className="text-red-500 text-sm mt-1">{errors.education}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Specialization Areas <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {specializations.map(spec => (
              <label key={spec} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                  checked={formData.specialization.includes(spec)}
                  onChange={() => handleArrayChange('specialization', spec)}
                />
                <span className="text-sm text-gray-700">{spec}</span>
              </label>
            ))}
          </div>
          {errors.specialization && <p className="text-red-500 text-sm mt-1">{errors.specialization}</p>}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Years of Experience <span className="text-red-500">*</span>
          </label>
          <select
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.experience ? 'border-red-500' : 'border-gray-300'
            }`}
            value={formData.experience}
            onChange={(e) => handleInputChange('experience', e.target.value)}
          >
            <option value="">Select Experience</option>
            <option value="0-1">0-1 years</option>
            <option value="1-3">1-3 years</option>
            <option value="3-5">3-5 years</option>
            <option value="5-10">5-10 years</option>
            <option value="10+">10+ years</option>
          </select>
          {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
          {serverErrors.experience && <p className="text-red-500 text-sm mt-1">{serverErrors.experience}</p>}
        </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Current Employment Status
            </label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.currentEmployment}
              onChange={(e) => handleInputChange('currentEmployment', e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="employed">Currently Employed</option>
              <option value="freelance">Freelance/Independent</option>
              <option value="unemployed">Unemployed</option>
              <option value="student">Student</option>
              <option value="retired">Retired</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Current Organization (if applicable)
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Name of your current organization"
            value={formData.organization}
            onChange={(e) => handleInputChange('organization', e.target.value)}
          />
          {serverErrors.organization && <p className="text-red-500 text-sm mt-1">{serverErrors.organization}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Social Work License Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.socialWorkLicense ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your social work license number"
            value={formData.socialWorkLicense}
            onChange={(e) => handleInputChange('socialWorkLicense', e.target.value)}
          />
          {errors.socialWorkLicense && <p className="text-red-500 text-sm mt-1">{errors.socialWorkLicense}</p>}
          {serverErrors.socialWorkLicense && <p className="text-red-500 text-sm mt-1">{serverErrors.socialWorkLicense}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Languages Spoken <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {indianLanguages.map(lang => (
              <label key={lang} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                  checked={formData.languages.includes(lang)}
                  onChange={() => handleArrayChange('languages', lang)}
                />
                <span className="text-sm text-gray-700">{lang}</span>
              </label>
            ))}
          </div>
          {errors.languages && <p className="text-red-500 text-sm mt-1">{errors.languages}</p>}
          {serverErrors.languages && <p className="text-red-500 text-sm mt-1">{serverErrors.languages}</p>}
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <Heart className="w-16 h-16 mx-auto mb-4 text-indigo-600" />
        <h3 className="text-2xl font-bold text-gray-800">About You</h3>
        <p className="text-gray-600">Tell us about your passion and goals</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Professional Bio <span className="text-red-500">*</span>
          </label>
          <textarea
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.bio ? 'border-red-500' : 'border-gray-300'
            }`}
            rows={5}
            placeholder="Tell us about yourself, your background, and your approach to social work... (minimum 100 characters)"
            value={formData.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
          />
          <div className="flex justify-between mt-1">
            {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
            {serverErrors.bio && <p className="text-red-500 text-sm">{serverErrors.bio}</p>}
            <p className="text-sm text-gray-500">{formData.bio.length}/500 characters</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            What motivates you to do social work? <span className="text-red-500">*</span>
          </label>
          <textarea
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.motivation ? 'border-red-500' : 'border-gray-300'
            }`}
            rows={4}
            placeholder="Share your motivation and passion for social work..."
            value={formData.motivation}
            onChange={(e) => handleInputChange('motivation', e.target.value)}
          />
          {errors.motivation && <p className="text-red-500 text-sm mt-1">{errors.motivation}</p>}
          {serverErrors.motivation && <p className="text-red-500 text-sm mt-1">{serverErrors.motivation}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Areas of Expertise
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {expertiseAreas.map(area => (
              <label key={area} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                  checked={formData.expertiseAreas.includes(area)}
                  onChange={() => handleArrayChange('expertiseAreas', area)}
                />
                <span className="text-sm text-gray-700">{area}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Availability
            </label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.availability}
              onChange={(e) => handleInputChange('availability', e.target.value)}
            >
              <option value="">Select Availability</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="weekends">Weekends Only</option>
              <option value="flexible">Flexible</option>
              <option value="on-call">On Call Basis</option>
            </select>
            {serverErrors.availability && <p className="text-red-500 text-sm mt-1">{serverErrors.availability}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Preferred Working Hours
            </label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.workingHours}
              onChange={(e) => handleInputChange('workingHours', e.target.value)}
            >
              <option value="">Select Hours</option>
              <option value="morning">Morning (9 AM - 1 PM)</option>
              <option value="afternoon">Afternoon (1 PM - 5 PM)</option>
              <option value="evening">Evening (5 PM - 9 PM)</option>
              <option value="flexible">Flexible Hours</option>
            </select>
            {serverErrors.workingHours && <p className="text-red-500 text-sm mt-1">{serverErrors.workingHours}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Notable Achievements or Awards
          </label>
          <textarea
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            rows={3}
            placeholder="List any awards, recognitions, or significant achievements in your career..."
            value={formData.achievements}
            onChange={(e) => handleInputChange('achievements', e.target.value)}
          />
          {serverErrors.achievements && <p className="text-red-500 text-sm mt-1">{serverErrors.achievements}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Professional References
          </label>
          <textarea
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            rows={3}
            placeholder="Provide contact details of 2-3 professional references (Name, Position, Organization, Contact)"
            value={formData.references}
            onChange={(e) => handleInputChange('references', e.target.value)}
          />
          {serverErrors.references && <p className="text-red-500 text-sm mt-1">{serverErrors.references}</p>}
        </div>

        {/* File Uploads */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <Upload className="w-4 h-4 mr-2" />
              Profile Photo (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange('profilePhoto', e.target.files)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <Upload className="w-4 h-4 mr-2" />
              Supporting Documents (Optional, max 5)
            </label>
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx"
              onChange={(e) => handleFileChange('documents', e.target.files)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            {formData.documents.length > 0 && (
              <p className="text-sm text-gray-600 mt-1">Selected: {formData.documents.length} file(s)</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="relative mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="absolute left-0 top-0 flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Individual Social Worker Registration
              </h1>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join our community of dedicated social workers and make a meaningful impact in people's lives
            </p>
          </div>
        </div>

        <Card className="max-w-4xl mx-auto bg-white shadow-xl">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
            {renderStepIndicator()}
            <div className="text-center">
              <CardTitle className="text-xl font-semibold text-gray-800">
                Step {currentStep} of {totalSteps}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {currentStep === 1 && "Personal Information"}
                {currentStep === 2 && "Address Information"}
                {currentStep === 3 && "Professional Information"}
                {currentStep === 4 && "About You"}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            {/* Server Errors Alert */}
            {Object.keys(serverErrors).length > 0 && (
              <Alert className="mb-6 border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  Please fix the following errors:
                  <ul className="list-disc list-inside mt-1">
                    {Object.values(serverErrors).map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12 pt-8 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center px-6 py-3"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  onClick={nextStep}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-6 py-3"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-8 py-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Submit Application
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <div className="max-w-4xl mx-auto mt-8">
          <Alert className="border-indigo-200 bg-indigo-50">
            <AlertCircle className="h-4 w-4 text-indigo-600" />
            <AlertDescription className="text-indigo-800">
              <strong>Need Help?</strong> If you have any questions while filling out this form, 
              please contact our support team at <strong>support@aadhar.org</strong> or call 
              <strong> +91-9699-951-857</strong>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}