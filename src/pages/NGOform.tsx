import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  FileText,
  Users,
  CheckCircle,
  AlertCircle,
  Upload,
  Calendar,
  Globe,
  Shield,
  Award,
  Heart,
  ArrowRight,
  ArrowLeft,
  User,
  CreditCard,
  Target,
  Camera,
} from "lucide-react";

// Define TypeScript interface for form data
interface NGOFormData {
  // Organization Basic Information
  organizationName: string;
  registrationNumber: string;
  registrationType: string;
  ngoType: string;
  dateOfEstablishment: string;
  websiteUrl: string;
  email: string;
  alternateEmail: string;
  phone: string;
  alternatePhone: string;

  // Address Information
  registeredAddress: string;
  operationalAddress: string;
  city: string;
  state: string;
  pincode: string;
  district: string;
  country: string;

  // Legal Information
  panNumber: string;
  tanNumber: string;
  fcraNumber: string;
  gstNumber: string;
  section80G: boolean;
  section12A: boolean;
  csr1Registration: boolean;

  // Organization Details
  vision: string;
  mission: string;
  objectives: string;
  mainFocusAreas: string[];
  targetBeneficiaries: string[];
  geographicalPresence: string[];
  organizationSize: string;
  annualBudget: string;

  // Key Personnel
  chairpersonName: string;
  chairpersonContact: string;
  chairpersonEmail: string;
  secretaryName: string;
  secretaryContact: string;
  secretaryEmail: string;
  treasurerName: string;
  treasurerContact: string;
  treasurerEmail: string;

  // Programs and Activities
  currentPrograms: string;
  majorAchievements: string;
  pastExperience: string;
  partnerships: string;
  volunteersCount: string;
  fullTimeStaff: string;
  partTimeStaff: string;

  // Financial Information
  lastAuditDate: string;
  auditFirm: string;
  majorFundingSources: string[];
  transparencyScore: string;

  // Additional Information
  socialMediaLinks: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    youtube: string;
  };

  // Documents
  documents: {
    registrationCertificate: File | null;
    panCard: File | null;
    auditReport: File | null;
    moa: File | null;
    aoa: File | null;
    section80G: File | null;
    section12A: File | null;
    fcraRegistration: File | null;
    boardResolution: File | null;
    bankPassbook: File | null;
  };
}

export default function NGORegistrationForm({
  onBack,
}: {
  onBack?: () => void;
}) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<NGOFormData>({
    // Organization Basic Information
    organizationName: "",
    registrationNumber: "",
    registrationType: "",
    ngoType: "",
    dateOfEstablishment: "",
    websiteUrl: "",
    email: "",
    alternateEmail: "",
    phone: "",
    alternatePhone: "",

    // Address Information
    registeredAddress: "",
    operationalAddress: "",
    city: "",
    state: "",
    pincode: "",
    district: "",
    country: "India",

    // Legal Information
    panNumber: "",
    tanNumber: "",
    fcraNumber: "",
    gstNumber: "",
    section80G: false,
    section12A: false,
    csr1Registration: false,

    // Organization Details
    vision: "",
    mission: "",
    objectives: "",
    mainFocusAreas: [],
    targetBeneficiaries: [],
    geographicalPresence: [],
    organizationSize: "",
    annualBudget: "",

    // Key Personnel
    chairpersonName: "",
    chairpersonContact: "",
    chairpersonEmail: "",
    secretaryName: "",
    secretaryContact: "",
    secretaryEmail: "",
    treasurerName: "",
    treasurerContact: "",
    treasurerEmail: "",

    // Programs and Activities
    currentPrograms: "",
    majorAchievements: "",
    pastExperience: "",
    partnerships: "",
    volunteersCount: "",
    fullTimeStaff: "",
    partTimeStaff: "",

    // Financial Information
    lastAuditDate: "",
    auditFirm: "",
    majorFundingSources: [],
    transparencyScore: "",

    // Additional Information
    socialMediaLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
      youtube: "",
    },

    // Documents
    documents: {
      registrationCertificate: null,
      panCard: null,
      auditReport: null,
      moa: null, // Memorandum of Association
      aoa: null, // Articles of Association
      section80G: null,
      section12A: null,
      fcraRegistration: null,
      boardResolution: null,
      bankPassbook: null,
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const totalSteps = 6;

  // Options for various fields
  const registrationTypes = [
    "Society (Societies Registration Act)",
    "Trust (Indian Trust Act)",
    "Section 8 Company (Companies Act 2013)",
    "Cooperative Society",
    "Other",
  ];

  const focusAreas = [
    "Education",
    "Healthcare",
    "Environment",
    "Women Empowerment",
    "Child Welfare",
    "Elderly Care",
    "Skill Development",
    "Rural Development",
    "Urban Development",
    "Disaster Relief",
    "Animal Welfare",
    "Arts & Culture",
    "Sports",
    "Research",
    "Human Rights",
    "Legal Aid",
    "Mental Health",
    "Disability Services",
    "Food Security",
    "Water & Sanitation",
    "Clean Energy",
    "Technology for Good",
  ];

  const targetBeneficiaries = [
    "Children (0-18 years)",
    "Youth (18-35 years)",
    "Adults (35-60 years)",
    "Senior Citizens (60+ years)",
    "Women",
    "Men",
    "Transgender",
    "People with Disabilities",
    "Tribal Communities",
    "Rural Communities",
    "Urban Slum Dwellers",
    "Homeless People",
    "Farmers",
    "Students",
    "Unemployed Youth",
    "Single Mothers",
    "Orphans",
    "Street Children",
  ];

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
  ];

  const organizationSizes = [
    "Small (1-10 employees)",
    "Medium (11-50 employees)",
    "Large (51-200 employees)",
    "Very Large (200+ employees)",
  ];

  const budgetRanges = [
    "Below ₹1 Lakh",
    "₹1 Lakh - ₹5 Lakhs",
    "₹5 Lakhs - ₹25 Lakhs",
    "₹25 Lakhs - ₹1 Crore",
    "₹1 Crore - ₹10 Crores",
    "Above ₹10 Crores",
  ];

  const fundingSources = [
    "Government Grants",
    "Corporate CSR",
    "Individual Donations",
    "Foreign Funding",
    "Fundraising Events",
    "Product/Service Sales",
    "Interest Income",
    "Other NGOs/Foundations",
  ];

  const handleInputChange = (field: string, value: any) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof NGOFormData] as any),
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleArrayChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).includes(value)
        ? (prev[field as keyof typeof prev] as string[]).filter(
            (item: string) => item !== value
          )
        : [...(prev[field as keyof typeof prev] as string[]), value],
    }));
  };

  const validateStep = (step: number) => {
    const newErrors: any = {};

    switch (step) {
      case 1:
        if (!formData.organizationName.trim())
          newErrors.organizationName = "Organization name is required";
        if (!formData.registrationNumber.trim())
          newErrors.registrationNumber = "Registration number is required";
        if (!formData.registrationType)
          newErrors.registrationType = "Registration type is required";
        if (!formData.ngoType) newErrors.ngoType = "NGO type is required";
        if (!formData.dateOfEstablishment)
          newErrors.dateOfEstablishment = "Date of establishment is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email))
          newErrors.email = "Email is invalid";
        if (!formData.phone.trim())
          newErrors.phone = "Phone number is required";
        else if (!/^[6-9]\d{9}$/.test(formData.phone))
          newErrors.phone = "Enter valid Indian phone number";
        break;

      case 2:
        if (!formData.registeredAddress.trim())
          newErrors.registeredAddress = "Registered address is required";
        if (!formData.city.trim()) newErrors.city = "City is required";
        if (!formData.state) newErrors.state = "State is required";
        if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
        else if (!/^\d{6}$/.test(formData.pincode))
          newErrors.pincode = "Enter valid 6-digit pincode";
        if (!formData.panNumber.trim())
          newErrors.panNumber = "PAN number is required";
        else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber))
          newErrors.panNumber = "Enter valid PAN number";
        break;

      case 3:
        if (!formData.vision.trim()) newErrors.vision = "Vision is required";
        if (!formData.mission.trim()) newErrors.mission = "Mission is required";
        if (!formData.objectives.trim())
          newErrors.objectives = "Objectives are required";
        if (formData.mainFocusAreas.length === 0)
          newErrors.mainFocusAreas = "Select at least one focus area";
        if (formData.targetBeneficiaries.length === 0)
          newErrors.targetBeneficiaries =
            "Select at least one target beneficiary";
        break;

      case 4:
        if (!formData.chairpersonName.trim())
          newErrors.chairpersonName = "Chairperson name is required";
        if (!formData.chairpersonContact.trim())
          newErrors.chairpersonContact = "Chairperson contact is required";
        if (!formData.secretaryName.trim())
          newErrors.secretaryName = "Secretary name is required";
        if (!formData.secretaryContact.trim())
          newErrors.secretaryContact = "Secretary contact is required";
        break;

      case 5:
        if (!formData.currentPrograms.trim())
          newErrors.currentPrograms =
            "Current programs information is required";
        if (!formData.organizationSize)
          newErrors.organizationSize = "Organization size is required";
        if (!formData.annualBudget)
          newErrors.annualBudget = "Annual budget range is required";
        break;

      case 6:
        if (!formData.lastAuditDate)
          newErrors.lastAuditDate = "Last audit date is required";
        if (formData.majorFundingSources.length === 0)
          newErrors.majorFundingSources = "Select at least one funding source";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
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
      {[1, 2, 3, 4, 5, 6].map((step) => (
        <div key={step} className="flex items-center flex-shrink-0">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
              currentStep >= step
                ? "bg-gradient-to-r from-green-600 to-blue-600 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {currentStep > step ? <CheckCircle className="w-5 h-5" /> : step}
          </div>
          {step < 6 && (
            <div
              className={`h-1 w-12 mx-1 ${
                currentStep > step
                  ? "bg-gradient-to-r from-green-600 to-blue-600"
                  : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Building2 className="w-16 h-16 mx-auto mb-4 text-green-600" />
        <h3 className="text-2xl font-bold text-gray-800">
          Organization Information
        </h3>
        <p className="text-gray-600">Basic details about your NGO</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Organization Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              errors.organizationName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your organization name"
            value={formData.organizationName}
            onChange={(e) =>
              handleInputChange("organizationName", e.target.value)
            }
          />
          {errors.organizationName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.organizationName}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Registration Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              errors.registrationNumber ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Registration number"
            value={formData.registrationNumber}
            onChange={(e) =>
              handleInputChange("registrationNumber", e.target.value)
            }
          />
          {errors.registrationNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.registrationNumber}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Registration Type <span className="text-red-500">*</span>
          </label>
          <select
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              errors.registrationType ? "border-red-500" : "border-gray-300"
            }`}
            value={formData.registrationType}
            onChange={(e) =>
              handleInputChange("registrationType", e.target.value)
            }
          >
            <option value="">Select Registration Type</option>
            {registrationTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.registrationType && (
            <p className="text-red-500 text-sm mt-1">
              {errors.registrationType}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Date of Establishment <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              errors.dateOfEstablishment ? "border-red-500" : "border-gray-300"
            }`}
            value={formData.dateOfEstablishment}
            onChange={(e) =>
              handleInputChange("dateOfEstablishment", e.target.value)
            }
          />
          {errors.dateOfEstablishment && (
            <p className="text-red-500 text-sm mt-1">
              {errors.dateOfEstablishment}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Website URL
          </label>
          <input
            type="url"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="https://www.yourorganization.org"
            value={formData.websiteUrl}
            onChange={(e) => handleInputChange("websiteUrl", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Primary Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="contact@yourorganization.org"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Alternate Email
          </label>
          <input
            type="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="alternate@yourorganization.org"
            value={formData.alternateEmail}
            onChange={(e) =>
              handleInputChange("alternateEmail", e.target.value)
            }
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Primary Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="9876543210"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Alternate Phone
          </label>
          <input
            type="tel"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="9876543211"
            value={formData.alternatePhone}
            onChange={(e) =>
              handleInputChange("alternatePhone", e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <MapPin className="w-16 h-16 mx-auto mb-4 text-green-600" />
        <h3 className="text-2xl font-bold text-gray-800">
          Address & Legal Information
        </h3>
        <p className="text-gray-600">Location and legal compliance details</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Registered Address <span className="text-red-500">*</span>
          </label>
          <textarea
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              errors.registeredAddress ? "border-red-500" : "border-gray-300"
            }`}
            rows={3}
            placeholder="Enter complete registered address"
            value={formData.registeredAddress}
            onChange={(e) =>
              handleInputChange("registeredAddress", e.target.value)
            }
          />
          {errors.registeredAddress && (
            <p className="text-red-500 text-sm mt-1">
              {errors.registeredAddress}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Operational Address (if different from registered)
          </label>
          <textarea
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            rows={3}
            placeholder="Enter operational address"
            value={formData.operationalAddress}
            onChange={(e) =>
              handleInputChange("operationalAddress", e.target.value)
            }
          />
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                errors.city ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="City"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              District
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="District"
              value={formData.district}
              onChange={(e) => handleInputChange("district", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              State <span className="text-red-500">*</span>
            </label>
            <select
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                errors.state ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.state}
              onChange={(e) => handleInputChange("state", e.target.value)}
            >
              <option value="">Select State</option>
              {indianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">{errors.state}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Pincode <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                errors.pincode ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="123456"
              value={formData.pincode}
              onChange={(e) => handleInputChange("pincode", e.target.value)}
            />
            {errors.pincode && (
              <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>
            )}
          </div>
        </div>

        {/* Legal Information */}
        <div className="border-t pt-6 mt-8">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            Legal & Compliance Information
          </h4>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                PAN Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  errors.panNumber ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="ABCDE1234F"
                value={formData.panNumber}
                onChange={(e) =>
                  handleInputChange("panNumber", e.target.value.toUpperCase())
                }
              />
              {errors.panNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.panNumber}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                TAN Number
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="ABCD12345E"
                value={formData.tanNumber}
                onChange={(e) =>
                  handleInputChange("tanNumber", e.target.value.toUpperCase())
                }
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                GST Number (if applicable)
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="22ABCDE1234F1Z5"
                value={formData.gstNumber}
                onChange={(e) =>
                  handleInputChange("gstNumber", e.target.value.toUpperCase())
                }
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                FCRA Registration Number (if applicable)
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Enter FCRA number"
                value={formData.fcraNumber}
                onChange={(e) =>
                  handleInputChange("fcraNumber", e.target.value)
                }
              />
            </div>
          </div>

          {/* Tax Exemption Checkboxes */}
          <div className="mt-6">
            <h5 className="text-md font-semibold text-gray-700 mb-3">
              Tax Exemptions & Registrations
            </h5>
            <div className="grid md:grid-cols-3 gap-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded text-green-600 focus:ring-green-500"
                  checked={formData.section80G}
                  onChange={(e) =>
                    handleInputChange("section80G", e.target.checked)
                  }
                />
                <span className="text-sm text-gray-700">80G Certification</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded text-green-600 focus:ring-green-500"
                  checked={formData.section12A}
                  onChange={(e) =>
                    handleInputChange("section12A", e.target.checked)
                  }
                />
                <span className="text-sm text-gray-700">12A Registration</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded text-green-600 focus:ring-green-500"
                  checked={formData.csr1Registration}
                  onChange={(e) =>
                    handleInputChange("csr1Registration", e.target.checked)
                  }
                />
                <span className="text-sm text-gray-700">
                  CSR-1 Registration
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <Target className="w-16 h-16 mx-auto mb-4 text-green-600" />
        <h3 className="text-2xl font-bold text-gray-800">
          Mission & Focus Areas
        </h3>
        <p className="text-gray-600">
          Tell us about your organization's purpose and goals
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Vision Statement <span className="text-red-500">*</span>
          </label>
          <textarea
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              errors.vision ? "border-red-500" : "border-gray-300"
            }`}
            rows={3}
            placeholder="Describe your organization's long-term vision..."
            value={formData.vision}
            onChange={(e) => handleInputChange("vision", e.target.value)}
          />
          {errors.vision && (
            <p className="text-red-500 text-sm mt-1">{errors.vision}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Mission Statement <span className="text-red-500">*</span>
          </label>
          <textarea
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              errors.mission ? "border-red-500" : "border-gray-300"
            }`}
            rows={4}
            placeholder="Describe your organization's mission and purpose..."
            value={formData.mission}
            onChange={(e) => handleInputChange("mission", e.target.value)}
          />
          {errors.mission && (
            <p className="text-red-500 text-sm mt-1">{errors.mission}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Key Objectives <span className="text-red-500">*</span>
          </label>
          <textarea
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              errors.objectives ? "border-red-500" : "border-gray-300"
            }`}
            rows={4}
            placeholder="List the main objectives and goals of your organization..."
            value={formData.objectives}
            onChange={(e) => handleInputChange("objectives", e.target.value)}
          />
          {errors.objectives && (
            <p className="text-red-500 text-sm mt-1">{errors.objectives}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Main Focus Areas <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-4">
            {focusAreas.map((area) => (
              <label
                key={area}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="rounded text-green-600 focus:ring-green-500"
                  checked={formData.mainFocusAreas.includes(area)}
                  onChange={() => handleArrayChange("mainFocusAreas", area)}
                />
                <span className="text-sm text-gray-700">{area}</span>
              </label>
            ))}
          </div>
          {errors.mainFocusAreas && (
            <p className="text-red-500 text-sm mt-1">{errors.mainFocusAreas}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Target Beneficiaries <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-4">
            {targetBeneficiaries.map((beneficiary) => (
              <label
                key={beneficiary}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="rounded text-green-600 focus:ring-green-500"
                  checked={formData.targetBeneficiaries.includes(beneficiary)}
                  onChange={() =>
                    handleArrayChange("targetBeneficiaries", beneficiary)
                  }
                />
                <span className="text-sm text-gray-700">{beneficiary}</span>
              </label>
            ))}
          </div>
          {errors.targetBeneficiaries && (
            <p className="text-red-500 text-sm mt-1">
              {errors.targetBeneficiaries}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Geographical Presence
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-4">
            {indianStates.map((state) => (
              <label
                key={state}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="rounded text-green-600 focus:ring-green-500"
                  checked={formData.geographicalPresence.includes(state)}
                  onChange={() =>
                    handleArrayChange("geographicalPresence", state)
                  }
                />
                <span className="text-sm text-gray-700">{state}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <Users className="w-16 h-16 mx-auto mb-4 text-green-600" />
        <h3 className="text-2xl font-bold text-gray-800">Key Personnel</h3>
        <p className="text-gray-600">
          Information about your organization's leadership
        </p>
      </div>

      <div className="space-y-8">
        {/* Chairperson */}
        <div className="border-b pb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2" />
            Chairperson/President Details
          </h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  errors.chairpersonName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Chairperson name"
                value={formData.chairpersonName}
                onChange={(e) =>
                  handleInputChange("chairpersonName", e.target.value)
                }
              />
              {errors.chairpersonName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.chairpersonName}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  errors.chairpersonContact
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="9876543210"
                value={formData.chairpersonContact}
                onChange={(e) =>
                  handleInputChange("chairpersonContact", e.target.value)
                }
              />
              {errors.chairpersonContact && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.chairpersonContact}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="chairperson@email.com"
                value={formData.chairpersonEmail}
                onChange={(e) =>
                  handleInputChange("chairpersonEmail", e.target.value)
                }
              />
            </div>
          </div>
        </div>

        {/* Secretary */}
        <div className="border-b pb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Secretary Details
          </h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  errors.secretaryName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Secretary name"
                value={formData.secretaryName}
                onChange={(e) =>
                  handleInputChange("secretaryName", e.target.value)
                }
              />
              {errors.secretaryName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.secretaryName}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  errors.secretaryContact ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="9876543210"
                value={formData.secretaryContact}
                onChange={(e) =>
                  handleInputChange("secretaryContact", e.target.value)
                }
              />
              {errors.secretaryContact && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.secretaryContact}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="secretary@email.com"
                value={formData.secretaryEmail}
                onChange={(e) =>
                  handleInputChange("secretaryEmail", e.target.value)
                }
              />
            </div>
          </div>
        </div>

        {/* Treasurer */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Treasurer Details
          </h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Treasurer name"
                value={formData.treasurerName}
                onChange={(e) =>
                  handleInputChange("treasurerName", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Contact Number
              </label>
              <input
                type="tel"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="9876543210"
                value={formData.treasurerContact}
                onChange={(e) =>
                  handleInputChange("treasurerContact", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="treasurer@email.com"
                value={formData.treasurerEmail}
                onChange={(e) =>
                  handleInputChange("treasurerEmail", e.target.value)
                }
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
        <Heart className="w-16 h-16 mx-auto mb-4 text-green-600" />
        <h3 className="text-2xl font-bold text-gray-800">
          Programs & Activities
        </h3>
        <p className="text-gray-600">
          Details about your organization's work and impact
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Current Programs & Projects <span className="text-red-500">*</span>
          </label>
          <textarea
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
              errors.currentPrograms ? "border-red-500" : "border-gray-300"
            }`}
            rows={5}
            placeholder="Describe your current programs, projects, and activities in detail..."
            value={formData.currentPrograms}
            onChange={(e) =>
              handleInputChange("currentPrograms", e.target.value)
            }
          />
          {errors.currentPrograms && (
            <p className="text-red-500 text-sm mt-1">
              {errors.currentPrograms}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Major Achievements & Impact
          </label>
          <textarea
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            rows={4}
            placeholder="Highlight your organization's major achievements, awards, and measurable impact..."
            value={formData.majorAchievements}
            onChange={(e) =>
              handleInputChange("majorAchievements", e.target.value)
            }
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Past Experience & Track Record
          </label>
          <textarea
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            rows={4}
            placeholder="Describe your organization's history, past projects, and experience..."
            value={formData.pastExperience}
            onChange={(e) =>
              handleInputChange("pastExperience", e.target.value)
            }
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Key Partnerships & Collaborations
          </label>
          <textarea
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            rows={3}
            placeholder="List your key partners, collaborators, and stakeholders..."
            value={formData.partnerships}
            onChange={(e) => handleInputChange("partnerships", e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Organization Size <span className="text-red-500">*</span>
            </label>
            <select
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                errors.organizationSize ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.organizationSize}
              onChange={(e) =>
                handleInputChange("organizationSize", e.target.value)
              }
            >
              <option value="">Select Organization Size</option>
              {organizationSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            {errors.organizationSize && (
              <p className="text-red-500 text-sm mt-1">
                {errors.organizationSize}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Annual Budget <span className="text-red-500">*</span>
            </label>
            <select
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                errors.annualBudget ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.annualBudget}
              onChange={(e) =>
                handleInputChange("annualBudget", e.target.value)
              }
            >
              <option value="">Select Budget Range</option>
              {budgetRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
            {errors.annualBudget && (
              <p className="text-red-500 text-sm mt-1">{errors.annualBudget}</p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Number of Volunteers
            </label>
            <input
              type="number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="0"
              value={formData.volunteersCount}
              onChange={(e) =>
                handleInputChange("volunteersCount", e.target.value)
              }
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full-time Staff
            </label>
            <input
              type="number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="0"
              value={formData.fullTimeStaff}
              onChange={(e) =>
                handleInputChange("fullTimeStaff", e.target.value)
              }
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Part-time Staff
            </label>
            <input
              type="number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="0"
              value={formData.partTimeStaff}
              onChange={(e) =>
                handleInputChange("partTimeStaff", e.target.value)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep6 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <Shield className="w-16 h-16 mx-auto mb-4 text-green-600" />
        <h3 className="text-2xl font-bold text-gray-800">
          Financial Information & Social Media
        </h3>
        <p className="text-gray-600">Financial details and online presence</p>
      </div>

      <div className="space-y-6">
        {/* Financial Information */}
        <div className="border-b pb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            Financial Information
          </h4>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Last Audit Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  errors.lastAuditDate ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.lastAuditDate}
                onChange={(e) =>
                  handleInputChange("lastAuditDate", e.target.value)
                }
              />
              {errors.lastAuditDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastAuditDate}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Audit Firm Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Name of audit firm"
                value={formData.auditFirm}
                onChange={(e) => handleInputChange("auditFirm", e.target.value)}
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Major Funding Sources <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {fundingSources.map((source) => (
                <label
                  key={source}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="rounded text-green-600 focus:ring-green-500"
                    checked={formData.majorFundingSources.includes(source)}
                    onChange={() =>
                      handleArrayChange("majorFundingSources", source)
                    }
                  />
                  <span className="text-sm text-gray-700">{source}</span>
                </label>
              ))}
            </div>
            {errors.majorFundingSources && (
              <p className="text-red-500 text-sm mt-1">
                {errors.majorFundingSources}
              </p>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Transparency Score/Rating (if any)
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="e.g., GuideStar India rating, GiveIndia score"
              value={formData.transparencyScore}
              onChange={(e) =>
                handleInputChange("transparencyScore", e.target.value)
              }
            />
          </div>
        </div>

        {/* Social Media Links */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            Social Media Presence
          </h4>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Facebook Page URL
              </label>
              <input
                type="url"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="https://www.facebook.com/yourorganization"
                value={formData.socialMediaLinks.facebook}
                onChange={(e) =>
                  handleInputChange("socialMediaLinks.facebook", e.target.value)
                }
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Twitter Handle
              </label>
              <input
                type="url"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="https://www.twitter.com/yourorganization"
                value={formData.socialMediaLinks.twitter}
                onChange={(e) =>
                  handleInputChange("socialMediaLinks.twitter", e.target.value)
                }
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Instagram Profile
              </label>
              <input
                type="url"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="https://www.instagram.com/yourorganization"
                value={formData.socialMediaLinks.instagram}
                onChange={(e) =>
                  handleInputChange(
                    "socialMediaLinks.instagram",
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                LinkedIn Page
              </label>
              <input
                type="url"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="https://www.linkedin.com/company/yourorganization"
                value={formData.socialMediaLinks.linkedin}
                onChange={(e) =>
                  handleInputChange("socialMediaLinks.linkedin", e.target.value)
                }
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                YouTube Channel
              </label>
              <input
                type="url"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="https://www.youtube.com/c/yourorganization"
                value={formData.socialMediaLinks.youtube}
                onChange={(e) =>
                  handleInputChange("socialMediaLinks.youtube", e.target.value)
                }
              />
            </div>
          </div>
        </div>

        {/* Document Upload Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Upload className="w-5 h-5 mr-2" />
            Required Documents
          </h4>
          <p className="text-sm text-gray-600 mb-4">
            After registration, you'll be able to upload these documents for
            verification:
          </p>
          <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-700">
            <div>• Registration Certificate</div>
            <div>• PAN Card</div>
            <div>• Latest Audit Report</div>
            <div>• Memorandum of Association (MOA)</div>
            <div>• Articles of Association (AOA)</div>
            <div>• 80G Certificate (if applicable)</div>
            <div>• 12A Registration (if applicable)</div>
            <div>• FCRA Registration (if applicable)</div>
            <div>• Board Resolution</div>
            <div>• Bank Account Details/Passbook</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSuccessMessage = () => (
    <div className="text-center py-12">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-12 h-12 text-green-600" />
      </div>
      <h3 className="text-3xl font-bold text-gray-800 mb-4">
        Registration Submitted Successfully!
      </h3>
      <p className="text-xl text-gray-600 mb-6">
        Thank you for registering your NGO with our platform. Your application
        is now under review.
      </p>
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 max-w-lg mx-auto">
        <h4 className="font-semibold text-green-800 mb-3">
          What happens next?
        </h4>
        <ul className="text-sm text-green-700 space-y-2 text-left">
          <li>
            • Our team will review your application within 3-5 business days
          </li>
          <li>• You'll receive an email with document upload instructions</li>
          <li>• We may contact you for additional verification</li>
          <li>• You can then start connecting with volunteers and donors</li>
          <li>• Access to our NGO dashboard and management tools</li>
        </ul>
      </div>
      <div className="space-y-4">
        <Button
          size="lg"
          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          onClick={() => (window.location.href = "/ngo-dashboard")}
        >
          Go to NGO Dashboard
        </Button>
        <div>
          <Button
            variant="outline"
            onClick={() => (onBack ? onBack() : (window.location.href = "/"))}
          >
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-12">
        <div className="container mx-auto px-6">
          <Card className="max-w-2xl mx-auto bg-white shadow-xl">
            <CardContent className="p-8">{renderSuccessMessage()}</CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4 relative">
            {onBack && (
              <Button
                variant="outline"
                onClick={onBack}
                className="max-[650px]:hidden absolute left-0 top-0"
              >
                ← Back to Home
              </Button>
            )}
            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              NGO Registration
            </h1>
          </div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Register your NGO to connect with volunteers, donors, and people who
            need your help. Complete all steps for verification.
          </p>
        </div>

        <Card className="max-w-6xl mx-auto bg-white shadow-xl">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
            {renderStepIndicator()}
            <div className="text-center">
              <CardTitle className="text-xl font-semibold text-gray-800">
                Step {currentStep} of {totalSteps}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {currentStep === 1 && "Organization Information"}
                {currentStep === 2 && "Address & Legal Information"}
                {currentStep === 3 && "Mission & Focus Areas"}
                {currentStep === 4 && "Key Personnel"}
                {currentStep === 5 && "Programs & Activities"}
                {currentStep === 6 && "Financial Information & Social Media"}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
            {currentStep === 5 && renderStep5()}
            {currentStep === 6 && renderStep6()}

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
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-6 py-3"
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
                      Submit Registration
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <div className="max-w-6xl mx-auto mt-8">
          <Alert className="border-green-200 bg-green-50">
            <AlertCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>Need Help?</strong> For assistance with NGO registration,
              contact our support team at{" "}
              <strong>ngo-support@aadhar.org</strong> or call{" "}
              <strong>+91-9699-951-857</strong>. Our team is available Monday to
              Friday, 9 AM to 6 PM.
            </AlertDescription>
          </Alert>
        </div>

        {/* Registration Guidelines */}
        <div className="max-w-6xl mx-auto mt-6">
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-blue-800">
                Registration Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6 text-sm text-blue-700">
                <div>
                  <h4 className="font-semibold mb-2">Required Information:</h4>
                  <ul className="space-y-1">
                    <li>• Valid registration certificate</li>
                    <li>• PAN and other tax documents</li>
                    <li>• Key personnel details</li>
                    <li>• Audit reports and financial information</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Verification Process:</h4>
                  <ul className="space-y-1">
                    <li>• Document verification (3-5 days)</li>
                    <li>• Background check of key personnel</li>
                    <li>• Reference verification</li>
                    <li>• Final approval and profile activation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
