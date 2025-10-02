import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Building2, HandHeart } from "lucide-react";


interface LoginProps {
  onBack?: () => void;
}

const registrationTypes = [
  {
    id: "individual",
    title: "Individual Social Worker",
    description:
      "Register as an individual social worker to showcase your expertise and connect with those in need.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "ngo",
    title: "Registered NGO",
    description:
      "Register your NGO to reach a wider audience and amplify your social impact.",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "volunteer",
    title: "Volunteer & Helper",
    description:
      "Join as a volunteer to find meaningful opportunities and contribute your skills.",
    color: "from-purple-500 to-pink-500",
  },
];

export default function Login(props: LoginProps) {
  const { onBack } = props;
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error on input
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store token and user data
      localStorage.setItem("token", data.token);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userType", data.user.role);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("userEmail", data.user.email);
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("userName", data.user.name);
      localStorage.setItem("isProfileComplete", data.user.isProfileComplete.toString());
      localStorage.setItem("isVerified", data.user.isVerified.toString());

      // Redirect to home
      window.location.href = "/";
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterRedirect = () => {
    if (selectedType === "individual") {
      window.history.pushState({}, "", "/individual-form");
      window.dispatchEvent(new PopStateEvent("popstate"));
    } else if (selectedType === "ngo") {
      window.history.pushState({}, "", "/ngo-form");
      window.dispatchEvent(new PopStateEvent("popstate"));
    } else if (selectedType === "volunteer") {
      window.history.pushState({}, "", "/volunteer-form");
      window.dispatchEvent(new PopStateEvent("popstate"));
    } else {
      alert("Please select a registration type first.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col items-center justify-center p-6 sm:p-4 pb-20">
      <Button
        variant="outline"
        onClick={onBack}
        className="absolute top-4 left-4 flex items-center px-4 py-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-full shadow-md"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </Button>

      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Welcome Back
          </h1>
          <p className="text-xl text-gray-600">Choose your role to continue</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {registrationTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`p-6 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2 ${
                selectedType === type.id
                  ? `bg-gradient-to-r ${type.color} ring-4 ring-offset-2 ring-${type.color.split(" ")[0]}-300`
                  : `bg-gradient-to-r ${type.color} hover:shadow-xl`
              }`}
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  {type.id === "individual" && <Users className="w-6 h-6" />}
                  {type.id === "ngo" && <Building2 className="w-6 h-6" />}
                  {type.id === "volunteer" && <HandHeart className="w-6 h-6" />}
                </div>
                <h3 className="text-lg mb-2">{type.title}</h3>
                <p className="text-sm opacity-90">{type.description}</p>
              </div>
            </button>
          ))}
        </div>

        {selectedType && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {registrationTypes.find((t) => t.id === selectedType)?.title} Login
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:opacity-50"
                  placeholder="Enter your email"
                  autoComplete="email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:opacity-50"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                  registrationTypes.find((t) => t.id === selectedType)
                    ? `bg-gradient-to-r ${registrationTypes.find((t) => t.id === selectedType)?.color}`
                    : "bg-indigo-600"
                } hover:shadow-xl`}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={handleRegisterRedirect}
                  className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
                >
                  Register here
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
