import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Heart, ArrowLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const NeedDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [need, setNeed] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/needs/${id}`)
        .then(response => {
          setNeed(response.data);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load need details.");
          setLoading(false);
        });
    }
  }, [id]);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Critical":
        return "bg-red-600 hover:bg-red-700";
      case "High":
        return "bg-orange-600 hover:bg-orange-700";
      case "Medium":
        return "bg-yellow-600 hover:bg-yellow-700";
      case "Low":
        return "bg-green-600 hover:bg-green-700";
      default:
        return "bg-gray-600 hover:bg-gray-700";
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading need details...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-600">{error}</div>;
  }

  if (!need) {
    return <div className="p-6 text-center">Need not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Button variant="outline" onClick={() => navigate(-1)} className="mb-4 flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" /> Back
      </Button>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
          <Badge className={`${getUrgencyColor(need.urgency)} text-white`}>
              {need.urgency}
            </Badge>
            <Badge variant="outline" className="text-indigo-600 border-indigo-200">
              {need.category}
            </Badge>
          </div>
          <CardTitle className="text-2xl font-bold mt-2">{need.title}</CardTitle>
          <div className="flex items-center text-gray-500 text-sm mt-1">
            <MapPin className="w-5 h-5 mr-1" />
            <span>{need.location}</span>
          </div>
        </CardHeader>
        <CardContent className="mt-4 space-y-4">
          <p className="text-gray-700">{need.description}</p>

          <div>
            <div className="flex justify-between items-center mb-2 text-sm">
              <span className="font-medium text-gray-700">Funding Raised</span>
              <span className="text-gray-600">{need.fundingRaised || 0}%</span>
            </div>
            <Progress value={need.fundingRaised || 0} className="h-3" />
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>{need.volunteersAssigned || 0} volunteers assigned</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              <span>{need.fundingRaised || 0}% funded</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-1">Contact Information</h3>
            <p>{need.contact || "Not provided"}</p>
          </div>

          {/* Additional details or images can be added here */}
        </CardContent>
      </Card>
    </div>
  );
};

export default NeedDetails;
