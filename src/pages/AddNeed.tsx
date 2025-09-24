import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Heart,
  Users,
  MapPin,
  Phone,
  AlertTriangle,
  FileText,
  CheckCircle,
  User,
  Target,
  Shield,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  Eye,
  Lock
} from 'lucide-react';

interface NeedListingFormProps {
  onBack?: () => void;
  onSuccess?: (data: NeedData) => void;
}

interface FormData {
  needType: string;
  needCategory: string;
  urgencyLevel: string;
  needTitle: string;
  shortDescription: string;
  detailedDescription: string;
  beneficiaryType: string;
  numberOfBeneficiaries: string;
  ageGroup: string[];
  targetDemographic: string[];
  country: string;
  state: string;
  district: string;
  city: string;
  area: string;
  pincode: string;
  specificLocation: string;
  contactPersonName: string;
  contactPersonRole: string;
  contactPhone: string;
  alternatePhone: string;
  contactEmail: string;
  alternateEmail: string;
  organizationName: string;
  requiredResources: string[];
  estimatedBudget: string;
  timeline: string;
  deadline: string;
  continuousSupport: boolean;
  oneTimeSupport: boolean;
  submittedBy: string;
  relationToBeneficiary: string;
  howDidYouKnow: string;
  verificationContactName: string;
  verificationContactPhone: string;
  localAuthority: string;
  currentSituation: string;
  whyHelpNeeded: string;
  impactOfHelp: string;
  previousHelp: string;
  additionalProof: string;
  languagesSpoken: string[];
  bestTimeToContact: string;
  specialInstructions: string;
  consentForPublicListing: boolean;
  consentForDataSharing: boolean;
  allowDirectContact: boolean;
  followUpFrequency: string;
  feedbackMethod: string;
  sensitiveCase: boolean;
  privacyConcerns: string;
  safetyMeasures: string;
  agreeToDataPolicy: boolean;
  agreeToTerms: boolean;
  additionalNotes: string;
}

interface NeedData extends FormData {
  submissionId: string;
  status: string;
  submittedAt: string;
}

export default function NeedListingForm(props: NeedListingFormProps) {
  const { onBack, onSuccess } = props || {};
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    needType: '',
    needCategory: '',
    urgencyLevel: '',
    needTitle: '',
    shortDescription: '',
    detailedDescription: '',
    beneficiaryType: '',
    numberOfBeneficiaries: '',
    ageGroup: [],
    targetDemographic: [],
    country: 'India',
    state: '',
    district: '',
    city: '',
    area: '',
    pincode: '',
    specificLocation: '',
    contactPersonName: '',
    contactPersonRole: '',
    contactPhone: '',
    alternatePhone: '',
    contactEmail: '',
    alternateEmail: '',
    organizationName: '',
    requiredResources: [],
    estimatedBudget: '',
    timeline: '',
    deadline: '',
    continuousSupport: false,
    oneTimeSupport: false,
    submittedBy: '',
    relationToBeneficiary: '',
    howDidYouKnow: '',
    verificationContactName: '',
    verificationContactPhone: '',
    localAuthority: '',
    currentSituation: '',
    whyHelpNeeded: '',
    impactOfHelp: '',
    previousHelp: '',
    additionalProof: '',
    languagesSpoken: [],
    bestTimeToContact: '',
    specialInstructions: '',
    consentForPublicListing: false,
    consentForDataSharing: false,
    allowDirectContact: false,
    followUpFrequency: '',
    feedbackMethod: '',
    sensitiveCase: false,
    privacyConcerns: '',
    safetyMeasures: '',
    agreeToDataPolicy: false,
    agreeToTerms: false,
    additionalNotes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submissionId, setSubmissionId] = useState('');

  const totalSteps = 5;

  const needTypes = [
    'Emergency/Crisis', 'Medical', 'Educational', 'Financial', 'Food & Nutrition',
    'Shelter & Housing', 'Employment', 'Legal Aid', 'Mental Health', 'Elderly Care',
    'Child Care', 'Disability Support', 'Natural Disaster Relief', 'Community Development'
  ];

  const needCategories: Record<string, string[]> = {
    'Emergency/Crisis': ['Immediate Medical Emergency', 'Natural Disaster', 'Family Crisis', 'Accident/Injury'],
    'Medical': ['Surgery/Treatment', 'Medication', 'Medical Equipment', 'Hospital Bills', 'Therapy/Rehabilitation'],
    'Educational': ['School Fees', 'Books & Supplies', 'Online Classes Setup', 'Skill Training', 'Vocational Training'],
    'Financial': ['Debt Relief', 'Emergency Fund', 'Business Support', 'Loan Assistance'],
    'Food & Nutrition': ['Daily Meals', 'Nutrition Support', 'Food Supplies', 'Cooking Facilities'],
    'Shelter & Housing': ['Emergency Shelter', 'House Repair', 'Rent Support', 'Temporary Accommodation'],
    'Employment': ['Job Placement', 'Skill Development', 'Equipment for Work', 'Business Setup'],
    'Legal Aid': ['Legal Consultation', 'Court Fees', 'Documentation Help', 'Rights Protection'],
    'Mental Health': ['Counseling', 'Therapy', 'Support Groups', 'Crisis Intervention'],
    'Elderly Care': ['Medical Care', 'Daily Support', 'Companionship', 'Mobility Aid'],
    'Child Care': ['Child Education', 'Healthcare', 'Nutrition', 'Protection Services'],
    'Disability Support': ['Medical Aid', 'Equipment', 'Accessibility', 'Skill Training'],
    'Natural Disaster Relief': ['Emergency Supplies', 'Temporary Shelter', 'Rehabilitation', 'Rebuilding'],
    'Community Development': ['Infrastructure', 'Sanitation', 'Water Supply', 'Community Programs']
  };

  const urgencyLevels = [
    { value: 'critical', label: 'Critical (Within 24 hours)', color: 'bg-red-500' },
    { value: 'high', label: 'High (Within 1 week)', color: 'bg-orange-500' },
    { value: 'medium', label: 'Medium (Within 1 month)', color: 'bg-yellow-500' },
    { value: 'low', label: 'Low (Within 3 months)', color: 'bg-green-500' }
  ];

  const beneficiaryTypes = [
    'Individual Person', 'Family', 'Group of People', 'Community', 'Organization/Institution'
  ];

  const ageGroups = [
    'Infants (0-2 years)', 'Children (3-12 years)', 'Teenagers (13-18 years)',
    'Young Adults (19-35 years)', 'Adults (36-60 years)', 'Senior Citizens (60+ years)'
  ];

  const targetDemographics = [
    'Women', 'Men', 'Children', 'Elderly', 'People with Disabilities', 'Pregnant Women',
    'Single Mothers', 'Orphans', 'Homeless', 'Unemployed', 'Students', 'Farmers',
    'Daily Wage Workers', 'Migrant Workers', 'Tribal Communities', 'Religious Minorities'
  ];

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
    'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
    'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir', 'Ladakh'
  ];

  const resourceTypes = [
    'Financial Support', 'Medical Supplies', 'Food & Groceries', 'Clothing',
    'Educational Materials', 'Equipment', 'Volunteers', 'Professional Services',
    'Transportation', 'Accommodation', 'Legal Assistance', 'Counseling Services'
  ];

  const budgetRanges = [
    'Below ₹1,000', '₹1,000 - ₹5,000', '₹5,000 - ₹25,000', '₹25,000 - ₹1 Lakh',
    '₹1 Lakh - ₹5 Lakhs', 'Above ₹5 Lakhs', 'Non-monetary support needed'
  ];

  const indianLanguages = [
    'Hindi', 'English', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Gujarati', 'Urdu',
    'Kannada', 'Odia', 'Punjabi', 'Malayalam', 'Assamese', 'Maithili', 'Sanskrit'
  ];

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleArrayChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).includes(value)
        ? (prev[field] as string[]).filter(item => item !== value)
        : [...(prev[field] as string[]), value]
    } as FormData));
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    
    switch (step) {
      case 1:
        if (!formData.needType) newErrors.needType = 'Need type is required';
        if (!formData.needCategory) newErrors.needCategory = 'Need category is required';
        if (!formData.urgencyLevel) newErrors.urgencyLevel = 'Urgency level is required';
        if (!formData.needTitle.trim()) newErrors.needTitle = 'Need title is required';
        if (!formData.shortDescription.trim()) newErrors.shortDescription = 'Short description is required';
        if (formData.shortDescription.length > 200) newErrors.shortDescription = 'Short description must be under 200 characters';
        if (!formData.detailedDescription.trim()) newErrors.detailedDescription = 'Detailed description is required';
        if (formData.detailedDescription.length < 100) newErrors.detailedDescription = 'Detailed description must be at least 100 characters';
        break;
        
      case 2:
        if (!formData.beneficiaryType) newErrors.beneficiaryType = 'Beneficiary type is required';
        if (!formData.numberOfBeneficiaries) newErrors.numberOfBeneficiaries = 'Number of beneficiaries is required';
        if (formData.ageGroup.length === 0) newErrors.ageGroup = 'Select at least one age group';
        if (!formData.state) newErrors.state = 'State is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
        else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Enter valid 6-digit pincode';
        break;
        
      case 3:
        if (!formData.contactPersonName.trim()) newErrors.contactPersonName = 'Contact person name is required';
        if (!formData.contactPhone.trim()) newErrors.contactPhone = 'Contact phone is required';
        else if (!/^[6-9]\d{9}$/.test(formData.contactPhone)) newErrors.contactPhone = 'Enter valid Indian phone number';
        if (!formData.contactEmail.trim()) newErrors.contactEmail = 'Contact email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) newErrors.contactEmail = 'Enter valid email address';
        if (formData.requiredResources.length === 0) newErrors.requiredResources = 'Select required resources';
        if (!formData.estimatedBudget) newErrors.estimatedBudget = 'Estimated budget is required';
        if (!formData.timeline.trim()) newErrors.timeline = 'Timeline is required';
        break;
        
      case 4:
        if (!formData.submittedBy.trim()) newErrors.submittedBy = 'Submitted by information is required';
        if (!formData.relationToBeneficiary.trim()) newErrors.relationToBeneficiary = 'Relation to beneficiary is required';
        if (!formData.howDidYouKnow.trim()) newErrors.howDidYouKnow = 'How you know about the need is required';
        if (!formData.currentSituation.trim()) newErrors.currentSituation = 'Current situation is required';
        if (!formData.whyHelpNeeded.trim()) newErrors.whyHelpNeeded = 'Why help is needed is required';
        if (!formData.impactOfHelp.trim()) newErrors.impactOfHelp = 'Impact of help is required';
        break;
        
      case 5:
        if (!formData.consentForPublicListing) newErrors.consentForPublicListing = 'Consent for public listing is required';
        if (!formData.consentForDataSharing) newErrors.consentForDataSharing = 'Consent for data sharing is required';
        if (!formData.agreeToDataPolicy) newErrors.agreeToDataPolicy = 'Agreement to data policy is required';
        if (!formData.agreeToTerms) newErrors.agreeToTerms = 'Agreement to terms and conditions is required';
        if (formData.languagesSpoken.length === 0) newErrors.languagesSpoken = 'Select at least one language';
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

    try {
      await new Promise(resolve => setTimeout(resolve, 3000));

      const id = `NEED_${Date.now()}`;
      setSubmissionId(id);

      const needData: NeedData = {
        ...formData,
        submissionId: id,
        status: 'pending_verification',
        submittedAt: new Date().toISOString()
      };

      if (onSuccess) {
        onSuccess(needData);
      } else {
        setSubmitSuccess(true);
      }

    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-8 overflow-x-auto">
      {[1, 2, 3, 4, 5].map((step) => (
        <div key={step} className="flex items-center flex-shrink-0">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
            currentStep >= step 
              ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white' 
              : 'bg-gray-200 text-gray-500'
          }`}>
            {currentStep > step ? <CheckCircle className="w-5 h-5" /> : step}
          </div>
          {step < 5 && (
            <div className={`h-1 w-12 mx-1 ${
              currentStep > step ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-red-500" />
        <h3 className="text-xl md:text-2xl font-bold text-gray-800">Need Classification</h3>
        <p className="text-sm md:text-base text-gray-600">Help us understand the type and urgency of help needed</p>
      </div>

      <div className="space-y-6">
        {/* Need Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Type of Need <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {needTypes.map((type) => (
              <div
                key={type}
                className={`p-3 border-2 rounded-lg cursor-pointer transition-all duration-300 text-center ${
                  formData.needType === type
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-200 hover:border-red-300 hover:bg-red-25'
                }`}
                onClick={() => {
                  handleInputChange('needType', type);
                  handleInputChange('needCategory', '');
                }}
              >
                <div className="text-sm font-medium">{type}</div>
              </div>
            ))}
          </div>
          {errors.needType && <p className="text-red-500 text-sm mt-1">{errors.needType}</p>}
        </div>

        {/* Need Category */}
        {formData.needType && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Specific Category <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {needCategories[formData.needType]?.map((category) => (
                <div
                  key={category}
                  className={`p-3 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                    formData.needCategory === category
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 hover:border-red-300'
                  }`}
                  onClick={() => handleInputChange('needCategory', category)}
                >
                  <div className="font-medium">{category}</div>
                </div>
              ))}
            </div>
            {errors.needCategory && <p className="text-red-500 text-sm mt-1">{errors.needCategory}</p>}
          </div>
        )}

        {/* Urgency Level */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Urgency Level <span className="text-red-500">*</span>
          </label>
          <div className="space-y-3">
            {urgencyLevels.map((level) => (
              <div
                key={level.value}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                  formData.urgencyLevel === level.value
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-red-300'
                }`}
                onClick={() => handleInputChange('urgencyLevel', level.value)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${level.color}`}></div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">{level.label}</div>
                  </div>
                  {formData.urgencyLevel === level.value && (
                    <CheckCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
          {errors.urgencyLevel && <p className="text-red-500 text-sm mt-1">{errors.urgencyLevel}</p>}
        </div>

        {/* Need Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Need Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
              errors.needTitle ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="e.g., Emergency surgery for accident victim"
            value={formData.needTitle}
            onChange={(e) => handleInputChange('needTitle', e.target.value)}
          />
          {errors.needTitle && <p className="text-red-500 text-sm mt-1">{errors.needTitle}</p>}
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Short Description <span className="text-red-500">*</span>
          </label>
          <textarea
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
              errors.shortDescription ? 'border-red-500' : 'border-gray-300'
            }`}
            rows={3}
            placeholder="Brief summary of the need (max 200 characters)"
            value={formData.shortDescription}
            onChange={(e) => handleInputChange('shortDescription', e.target.value)}
          />
          <div className="flex justify-between mt-1">
            {errors.shortDescription && <p className="text-red-500 text-sm">{errors.shortDescription}</p>}
            <p className="text-sm text-gray-500">{formData.shortDescription.length}/200 characters</p>
          </div>
        </div>

        {/* Detailed Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Detailed Description <span className="text-red-500">*</span>
          </label>
          <textarea
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
              errors.detailedDescription ? 'border-red-500' : 'border-gray-300'
            }`}
            rows={6}
            placeholder="Provide detailed information about the situation, background, and specific help needed (minimum 100 characters)"
            value={formData.detailedDescription}
            onChange={(e) => handleInputChange('detailedDescription', e.target.value)}
          />
          <div className="flex justify-between mt-1">
            {errors.detailedDescription && <p className="text-red-500 text-sm">{errors.detailedDescription}</p>}
            <p className="text-sm text-gray-500">{formData.detailedDescription.length} characters</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <Users className="w-16 h-16 mx-auto mb-4 text-blue-500" />
        <h3 className="text-xl md:text-2xl font-bold text-gray-800">Beneficiary & Location Information</h3>
        <p className="text-sm md:text-base text-gray-600">Tell us who needs help and where they are located</p>
      </div>

      <div className="space-y-6">
        {/* Beneficiary Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Who needs help? <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {beneficiaryTypes.map((type) => (
              <div
                key={type}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                  formData.beneficiaryType === type
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => handleInputChange('beneficiaryType', type)}
              >
                <div className="font-medium text-center">{type}</div>
              </div>
            ))}
          </div>
          {errors.beneficiaryType && <p className="text-red-500 text-sm mt-1">{errors.beneficiaryType}</p>}
        </div>

        {/* Number of Beneficiaries */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Number of People Needing Help <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min="1"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.numberOfBeneficiaries ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="e.g., 1, 5, 50"
            value={formData.numberOfBeneficiaries}
            onChange={(e) => handleInputChange('numberOfBeneficiaries', e.target.value)}
          />
          {errors.numberOfBeneficiaries && <p className="text-red-500 text-sm mt-1">{errors.numberOfBeneficiaries}</p>}
        </div>

        {/* Age Group */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Age Group <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {ageGroups.map((age) => (
              <div
                key={age}
                className={`p-3 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                  formData.ageGroup.includes(age)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => handleArrayChange('ageGroup', age)}
              >
                <div className="text-sm font-medium text-center">{age}</div>
              </div>
            ))}
          </div>
          {errors.ageGroup && <p className="text-red-500 text-sm mt-1">{errors.ageGroup}</p>}
        </div>

        {/* Target Demographics */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Target Demographics (Optional)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {targetDemographics.map((demo) => (
              <div
                key={demo}
                className={`p-2 border-2 rounded-lg cursor-pointer transition-all duration-300 text-center ${
                  formData.targetDemographic.includes(demo)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => handleArrayChange('targetDemographic', demo)}
              >
                <div className="text-sm font-medium">{demo}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Location Information */}
        <div className="border-t pt-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-green-500" />
            Location Information
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* State */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                State <span className="text-red-500">*</span>
              </label>
              <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                <SelectTrigger className={`w-full ${errors.state ? 'border-red-500' : ''}`}>
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  {indianStates.map((state) => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.city ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter city name"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>

            {/* District */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                District (Optional)
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter district name"
                value={formData.district}
                onChange={(e) => handleInputChange('district', e.target.value)}
              />
            </div>

            {/* Pincode */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Pincode <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                maxLength={6}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.pincode ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter 6-digit pincode"
                value={formData.pincode}
                onChange={(e) => handleInputChange('pincode', e.target.value)}
              />
              {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
            </div>

            {/* Area */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Area/Locality (Optional)
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter area or locality"
                value={formData.area}
                onChange={(e) => handleInputChange('area', e.target.value)}
              />
            </div>

            {/* Specific Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Specific Location Details (Optional)
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Landmark, hospital name, etc."
                value={formData.specificLocation}
                onChange={(e) => handleInputChange('specificLocation', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <Phone className="w-16 h-16 mx-auto mb-4 text-green-500" />
        <h3 className="text-xl md:text-2xl font-bold text-gray-800">Contact & Requirements</h3>
        <p className="text-sm md:text-base text-gray-600">How can helpers reach you and what kind of help is needed?</p>
      </div>

      <div className="space-y-6">
        {/* Contact Information */}
        <div className="border-b pb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-500" />
            Contact Person Details
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Person Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Contact Person Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  errors.contactPersonName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Full name of contact person"
                value={formData.contactPersonName}
                onChange={(e) => handleInputChange('contactPersonName', e.target.value)}
              />
              {errors.contactPersonName && <p className="text-red-500 text-sm mt-1">{errors.contactPersonName}</p>}
            </div>

            {/* Contact Person Role */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Role/Relationship (Optional)
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="e.g., Father, Social Worker, Friend"
                value={formData.contactPersonRole}
                onChange={(e) => handleInputChange('contactPersonRole', e.target.value)}
              />
            </div>

            {/* Primary Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Primary Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  errors.contactPhone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="10-digit mobile number"
                value={formData.contactPhone}
                onChange={(e) => handleInputChange('contactPhone', e.target.value)}
              />
              {errors.contactPhone && <p className="text-red-500 text-sm mt-1">{errors.contactPhone}</p>}
            </div>

            {/* Alternate Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Alternate Phone (Optional)
              </label>
              <input
                type="tel"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Alternate contact number"
                value={formData.alternatePhone}
                onChange={(e) => handleInputChange('alternatePhone', e.target.value)}
              />
            </div>

            {/* Primary Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  errors.contactEmail ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="your.email@example.com"
                value={formData.contactEmail}
                onChange={(e) => handleInputChange('contactEmail', e.target.value)}
              />
              {errors.contactEmail && <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>}
            </div>

            {/* Organization Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Organization Name (Optional)
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="If representing an organization"
                value={formData.organizationName}
                onChange={(e) => handleInputChange('organizationName', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Resource Requirements */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-purple-500" />
            Required Resources
          </h4>

          {/* Required Resources */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              What type of help is needed? <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {resourceTypes.map((resource) => (
                <div
                  key={resource}
                  className={`p-3 border-2 rounded-lg cursor-pointer transition-all duration-300 text-center ${
                    formData.requiredResources.includes(resource)
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                  onClick={() => handleArrayChange('requiredResources', resource)}
                >
                  <div className="text-sm font-medium">{resource}</div>
                </div>
              ))}
            </div>
            {errors.requiredResources && <p className="text-red-500 text-sm mt-1">{errors.requiredResources}</p>}
          </div>

          {/* Estimated Budget */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Estimated Budget Required <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {budgetRanges.map((budget) => (
                <div
                  key={budget}
                  className={`p-3 border-2 rounded-lg cursor-pointer transition-all duration-300 text-center ${
                    formData.estimatedBudget === budget
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                  onClick={() => handleInputChange('estimatedBudget', budget)}
                >
                  <div className="font-medium">{budget}</div>
                </div>
              ))}
            </div>
            {errors.estimatedBudget && <p className="text-red-500 text-sm mt-1">{errors.estimatedBudget}</p>}
          </div>

          {/* Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Timeline for Help <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  errors.timeline ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., Within 1 week, By next month"
                value={formData.timeline}
                onChange={(e) => handleInputChange('timeline', e.target.value)}
              />
              {errors.timeline && <p className="text-red-500 text-sm mt-1">{errors.timeline}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Deadline (Optional)
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={formData.deadline}
                onChange={(e) => handleInputChange('deadline', e.target.value)}
              />
            </div>
          </div>

          {/* Support Type */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Type of Support Needed
            </label>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="oneTime"
                  checked={formData.oneTimeSupport}
                  onChange={(e) => handleInputChange('oneTimeSupport', e.target.checked)}
                  className="w-4 h-4 text-green-600 rounded"
                />
                <label htmlFor="oneTime" className="text-sm font-medium text-gray-700">
                  One-time Support
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="continuous"
                  checked={formData.continuousSupport}
                  onChange={(e) => handleInputChange('continuousSupport', e.target.checked)}
                  className="w-4 h-4 text-green-600 rounded"
                />
                <label htmlFor="continuous" className="text-sm font-medium text-gray-700">
                  Continuous Support
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <Shield className="w-16 h-16 mx-auto mb-4 text-purple-500" />
        <h3 className="text-xl md:text-2xl font-bold text-gray-800">Verification & Background</h3>
        <p className="text-sm md:text-base text-gray-600">Help us verify and understand the situation better</p>
      </div>

      <div className="space-y-6">
        {/* Submission Details */}
        <div className="border-b pb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-blue-500" />
            Submission Details
          </h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Request Submitted By <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                  errors.submittedBy ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Your full name"
                value={formData.submittedBy}
                onChange={(e) => handleInputChange('submittedBy', e.target.value)}
              />
              {errors.submittedBy && <p className="text-red-500 text-sm mt-1">{errors.submittedBy}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Relation to Beneficiary <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                  errors.relationToBeneficiary ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., Self, Family Member, Friend, Social Worker"
                value={formData.relationToBeneficiary}
                onChange={(e) => handleInputChange('relationToBeneficiary', e.target.value)}
              />
              {errors.relationToBeneficiary && <p className="text-red-500 text-sm mt-1">{errors.relationToBeneficiary}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                How did you come to know about this need? <span className="text-red-500">*</span>
              </label>
              <textarea
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                  errors.howDidYouKnow ? 'border-red-500' : 'border-gray-300'
                }`}
                rows={3}
                placeholder="Describe how you became aware of this situation"
                value={formData.howDidYouKnow}
                onChange={(e) => handleInputChange('howDidYouKnow', e.target.value)}
              />
              {errors.howDidYouKnow && <p className="text-red-500 text-sm mt-1">{errors.howDidYouKnow}</p>}
            </div>
          </div>
        </div>

        {/* Situation Details */}
        <div className="border-b pb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Detailed Situation</h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Current Situation <span className="text-red-500">*</span>
              </label>
              <textarea
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                  errors.currentSituation ? 'border-red-500' : 'border-gray-300'
                }`}
                rows={4}
                placeholder="Describe the current situation in detail"
                value={formData.currentSituation}
                onChange={(e) => handleInputChange('currentSituation', e.target.value)}
              />
              {errors.currentSituation && <p className="text-red-500 text-sm mt-1">{errors.currentSituation}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Why is help needed? <span className="text-red-500">*</span>
              </label>
              <textarea
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                  errors.whyHelpNeeded ? 'border-red-500' : 'border-gray-300'
                }`}
                rows={4}
                placeholder="Explain why external help is necessary"
                value={formData.whyHelpNeeded}
                onChange={(e) => handleInputChange('whyHelpNeeded', e.target.value)}
              />
              {errors.whyHelpNeeded && <p className="text-red-500 text-sm mt-1">{errors.whyHelpNeeded}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                How will the help make a difference? <span className="text-red-500">*</span>
              </label>
              <textarea
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${
                  errors.impactOfHelp ? 'border-red-500' : 'border-gray-300'
                }`}
                rows={4}
                placeholder="Describe the expected impact of receiving help"
                value={formData.impactOfHelp}
                onChange={(e) => handleInputChange('impactOfHelp', e.target.value)}
              />
              {errors.impactOfHelp && <p className="text-red-500 text-sm mt-1">{errors.impactOfHelp}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Previous Help Received (Optional)
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                rows={3}
                placeholder="Mention any previous assistance received for this need"
                value={formData.previousHelp}
                onChange={(e) => handleInputChange('previousHelp', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Verification Contacts */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Verification References</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Reference Person Name (Optional)
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Someone who can verify this need"
                value={formData.verificationContactName}
                onChange={(e) => handleInputChange('verificationContactName', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Reference Person Phone (Optional)
              </label>
              <input
                type="tel"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Reference contact number"
                value={formData.verificationContactPhone}
                onChange={(e) => handleInputChange('verificationContactPhone', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Local Authority/Organization (Optional)
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="e.g., Hospital, School, Local Government Office"
                value={formData.localAuthority}
                onChange={(e) => handleInputChange('localAuthority', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Additional Proof/Documentation (Optional)
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                rows={3}
                placeholder="Mention any documents or proof you can provide"
                value={formData.additionalProof}
                onChange={(e) => handleInputChange('additionalProof', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <Lock className="w-16 h-16 mx-auto mb-4 text-indigo-500" />
        <h3 className="text-xl md:text-2xl font-bold text-gray-800">Privacy & Final Details</h3>
        <p className="text-sm md:text-base text-gray-600">Set your preferences and provide final information</p>
      </div>

      <div className="space-y-6">
        {/* Communication Preferences */}
        <div className="border-b pb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <MessageCircle className="w-5 h-5 mr-2 text-green-500" />
            Communication Preferences
          </h4>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Languages You Can Communicate In <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {indianLanguages.map((language) => (
                  <div
                    key={language}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all duration-300 text-center ${
                      formData.languagesSpoken.includes(language)
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-gray-200 hover:border-indigo-300'
                    }`}
                    onClick={() => handleArrayChange('languagesSpoken', language)}
                  >
                    <div className="text-sm font-medium">{language}</div>
                  </div>
                ))}
              </div>
              {errors.languagesSpoken && <p className="text-red-500 text-sm mt-1">{errors.languagesSpoken}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Best Time to Contact (Optional)
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., 9 AM - 6 PM, Evening after 7 PM"
                value={formData.bestTimeToContact}
                onChange={(e) => handleInputChange('bestTimeToContact', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Special Instructions for Helpers (Optional)
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                rows={3}
                placeholder="Any special instructions for people wanting to help"
                value={formData.specialInstructions}
                onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Privacy & Consent */}
        <div className="border-b pb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Eye className="w-5 h-5 mr-2 text-blue-500" />
            Privacy & Consent
          </h4>

          <div className="space-y-4">
            <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="publicListing"
                  checked={formData.consentForPublicListing}
                  onChange={(e) => handleInputChange('consentForPublicListing', e.target.checked)}
                  className="w-4 h-4 mt-1 text-blue-600 rounded"
                />
                <div>
                  <label htmlFor="publicListing" className="block text-sm font-semibold text-blue-800 mb-1">
                    Consent for Public Listing <span className="text-red-500">*</span>
                  </label>
                  <p className="text-sm text-blue-700">
                    I agree to have my need listed publicly on the platform for potential helpers to find and contact me.
                  </p>
                </div>
              </div>
              {errors.consentForPublicListing && <p className="text-red-500 text-sm mt-2">{errors.consentForPublicListing}</p>}
            </div>

            <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="dataPolicy"
                  checked={formData.agreeToDataPolicy}
                  onChange={(e) => handleInputChange('agreeToDataPolicy', e.target.checked)}
                  className="w-4 h-4 mt-1 text-blue-600 rounded"
                />
                <div>
                  <label htmlFor="dataPolicy" className="block text-sm font-semibold text-blue-800 mb-1">
                    Agree to Data Policy <span className="text-red-500">*</span>
                  </label>
                  <p className="text-sm text-blue-700">
                    I have read and agree to the platform's data policy regarding the collection, use, and sharing of my information.
                  </p>
                </div>
              </div>
              {errors.agreeToDataPolicy && <p className="text-red-500 text-sm mt-2">{errors.agreeToDataPolicy}</p>}
            </div>
            <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="termsConditions"
                  checked={formData.agreeToTerms}
                  onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                  className="w-4 h-4 mt-1 text-blue-600 rounded"
                />
                <div>
                  <label htmlFor="termsConditions" className="block text-sm font-semibold text-blue-800 mb-1">
                    Agree to Terms & Conditions <span className="text-red-500">*</span>
                  </label>
                  <p className="text-sm text-blue-700">
                    I agree to the platform's terms and conditions governing the use of the service.
                  </p>
                </div>
              </div>
              {errors.agreeToTerms && <p className="text-red-500 text-sm mt-2">{errors.agreeToTerms}</p>}
            </div>
          </div>
        </div>
        {/* Additional Information */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                rows={3}
                placeholder="Any other information you'd like to provide"
                value={formData.additionalNotes}
                onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-20 h-20 mx-auto mb-6 text-green-500" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Need Submitted Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Your need has been submitted with ID: <span className="font-semibold text-red-600">{submissionId}</span>
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Our team will review your submission and verify the details. You will be notified once it's approved and listed publicly.
            </p>
            <div className="space-y-4">
              <Button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-8 py-3"
              >
                Submit Another Need
              </Button>
              <div>
                <Button
                  variant="outline"
                  onClick={onBack}
                  className="px-8 py-3"
                >
                  Back to Home
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <Heart className="w-12 h-12 mx-auto mb-4 text-red-500" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">List Your Need</h1>
          <p className="text-lg text-gray-600">Help us connect you with people who can make a difference</p>
        </div>

        <Card className="shadow-xl">
          <CardContent className="p-6 md:p-8">
            {renderStepIndicator()}

            <div className="mt-8">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}
              {currentStep === 5 && renderStep5()}
            </div>

            <div className="flex justify-between items-center mt-12 pt-6 border-t">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center space-x-2 px-6 py-3"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>

              <div className="text-sm text-gray-500">
                Step {currentStep} of {totalSteps}
              </div>

              {currentStep < totalSteps ? (
                <Button
                  onClick={nextStep}
                  className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white flex items-center space-x-2 px-6 py-3"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white flex items-center space-x-2 px-6 py-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <span>Submit Need</span>
                      <CheckCircle className="w-4 h-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
