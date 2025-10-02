import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Building2,
  HandHeart,
  ArrowRight,
  Heart,
  CheckCircle,
  Star,
  Award,
  Target,
  Globe,
  Shield,
  Sparkles,
} from "lucide-react";

interface GetStartedPageProps {
  onNavigate: (page: string) => void;
  onBack?: () => void;
}

export default function GetStartedPage({
  onNavigate,
  onBack,
}: GetStartedPageProps) {

  const registrationTypes = [
    {
      id: "individual",
      icon: Users,
      title: "Individual Social Worker",
      subtitle: "Join as an Independent Professional",
      description:
        "Register as an individual social worker to showcase your expertise, connect directly with people who need help, and make a meaningful impact in your community.",
      features: [
        "Create your professional profile",
        "Showcase skills and specializations",
        "Connect directly with beneficiaries",
        "Track your social impact",
        "Build your reputation",
        "Flexible working arrangements",
      ],
      benefits: [
        "Direct community connection",
        "Professional recognition",
        "Flexible schedule",
        "Personal branding",
      ],
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      borderColor: "border-blue-200",
      hoverColor: "hover:border-blue-400",
      buttonColor:
        "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700",
      stats: { users: "2,500+", impact: "50,000+" },
    },
    {
      id: "ngo",
      icon: Building2,
      title: "Registered NGO",
      subtitle: "Organization Registration",
      description:
        "Register your NGO to reach a wider audience, showcase your projects, connect with volunteers and donors, and amplify your social impact across communities.",
      features: [
        "Complete organization profile",
        "Project and program listings",
        "Volunteer management system",
        "Donation tracking tools",
        "Impact measurement dashboard",
        "Partnership opportunities",
      ],
      benefits: [
        "Wider reach and visibility",
        "Professional credibility",
        "Resource mobilization",
        "Network expansion",
      ],
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
      borderColor: "border-green-200",
      hoverColor: "hover:border-green-400",
      buttonColor:
        "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700",
      stats: { users: "1,200+", impact: "5M+" },
    },
    {
      id: "volunteer",
      icon: HandHeart,
      title: "Volunteer & Helper",
      subtitle: "Make a Difference Today",
      description:
        "Join as a volunteer to find meaningful opportunities, contribute your skills to causes you care about, and connect with NGOs and social workers who need your help.",
      features: [
        "Browse volunteer opportunities",
        "Skill-based matching system",
        "Flexible time commitments",
        "Impact tracking dashboard",
        "Community networking",
        "Recognition and certificates",
      ],
      benefits: [
        "Meaningful contribution",
        "Skill development",
        "Network building",
        "Personal fulfillment",
      ],
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
      borderColor: "border-purple-200",
      hoverColor: "hover:border-purple-400",
      buttonColor:
        "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
      stats: { users: "10,000+", impact: "2M+" },
    },
  ];

  const handleCardClick = (type: string) => {
    // Map types to the expected view names in LandingPage
    const viewMap: { [key: string]: string } = {
      individual: 'individual-form',
      ngo: 'ngo-form',
      volunteer: 'volunteer-form'
    };
    onNavigate(viewMap[type] || type);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pb-20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-indigo-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-3 order-1 md:order-1">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Aadhar
                </h1>
                <p className="text-sm text-gray-600">
                  Connecting Hearts, Changing Lives
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 order-2 md:order-2">
              {onBack && (
                <Button
                  variant="outline"
                  onClick={onBack}
                  className="w-full md:w-auto mb-4 md:mb-0 border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                >
                  ← Back to Home
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Sparkles className="w-8 h-8 text-yellow-500 animate-pulse" />
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 text-sm">
                Start Your Journey of Impact
              </Badge>
              <Sparkles className="w-8 h-8 text-yellow-500 animate-pulse" />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              Choose Your Path to
              <br />
              <span className="text-5xl md:text-7xl">Make a Difference</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed max-w-4xl mx-auto">
              Join thousands of changemakers who are creating positive impact
              across India. Select the registration type that best fits your
              role and start your journey today.
            </p>
          </div>

          {/* Registration Type Cards */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {registrationTypes.map((type) => (
              <Card
                key={type.id}
                className={`group relative overflow-hidden border-2 ${type.borderColor} ${type.hoverColor} transition-all duration-500 cursor-pointer hover:shadow-2xl hover:-translate-y-3 bg-gradient-to-br ${type.bgColor}`}
                onClick={() => handleCardClick(type.id)}
              >
                {/* Background Pattern */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                ></div>

                {/* Stats Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <Badge
                    variant="outline"
                    className="bg-white/80 backdrop-blur-sm"
                  >
                    {type.stats.users} members
                  </Badge>
                </div>

                <CardHeader className="relative z-10 pb-4">
                  <div
                    className={`w-20 h-20 bg-gradient-to-r ${type.color} rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <type.icon className="w-10 h-10 text-white" />
                  </div>

                  <CardTitle className="text-2xl font-bold text-gray-800 group-hover:text-gray-900 mb-2">
                    {type.title}
                  </CardTitle>

                  <Badge
                    className={`w-fit bg-gradient-to-r ${type.color} text-white mb-4`}
                  >
                    {type.subtitle}
                  </Badge>

                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {type.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10 pt-0">
                  {/* Key Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <Star className="w-4 h-4 mr-2 text-yellow-500" />
                      Key Features
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {type.features.slice(0, 4).map((feature, i) => (
                        <div
                          key={i}
                          className="flex items-start text-sm text-gray-700"
                        >
                          <CheckCircle
                            className={`w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0`}
                          />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <Award className="w-4 h-4 mr-2 text-blue-500" />
                      Benefits
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {type.benefits.map((benefit, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Impact Stats */}
                  <div className="mb-6 p-4 bg-white/60 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-center">
                        <div className="font-bold text-lg text-gray-800">
                          {type.stats.users}
                        </div>
                        <div className="text-gray-600">Active Members</div>
                      </div>
                      <div className="w-px h-8 bg-gray-300"></div>
                      <div className="text-center">
                        <div className="font-bold text-lg text-gray-800">
                          {type.stats.impact}
                        </div>
                        <div className="text-gray-600">Lives Impacted</div>
                      </div>
                    </div>
                  </div>

                  {/* Register Button */}
                  <Button
                    className={`w-full ${type.buttonColor} text-white shadow-lg hover:shadow-xl transition-all duration-300 text-lg py-6`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(type.id);
                    }}
                  >
                    <span className="flex items-center justify-center">
                      Register Now
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </Button>

                  {/* Hover Effect Indicator */}
                  <div className="mt-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm text-gray-600">
                      Click anywhere on the card to get started
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Information */}
          <div className="mt-16 text-center">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto border border-indigo-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Why Choose CareConnect?
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <Shield className="w-12 h-12 mx-auto mb-3 text-green-600" />
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Verified Platform
                  </h4>
                  <p className="text-sm text-gray-600">
                    All members are verified for authenticity and credibility
                  </p>
                </div>
                <div>
                  <Globe className="w-12 h-12 mx-auto mb-3 text-blue-600" />
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Pan-India Reach
                  </h4>
                  <p className="text-sm text-gray-600">
                    Connect with communities across all states of India
                  </p>
                </div>
                <div>
                  <Target className="w-12 h-12 mx-auto mb-3 text-purple-600" />
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Impact Tracking
                  </h4>
                  <p className="text-sm text-gray-600">
                    Measure and track your social impact effectively
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <p className="text-lg text-gray-600 mb-4">
              Not sure which option is right for you?
            </p>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50"
            >
              Contact Our Support Team
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg font-bold">CareConnect</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Connecting hearts, changing lives, one community at a time.
            </p>
            <p className="text-sm text-gray-500">
              &copy; 2025 CareConnect. All rights reserved. Made with ❤️ for a
              better world.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
