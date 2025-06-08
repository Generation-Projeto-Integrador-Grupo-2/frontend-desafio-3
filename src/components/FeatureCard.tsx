import React from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 text-center">
      <div className="mb-2 flex justify-center">{icon}</div>
      <h3 className="font-bold text-lg text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
