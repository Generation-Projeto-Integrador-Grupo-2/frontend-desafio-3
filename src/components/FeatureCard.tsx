import React from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  cor: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, cor }) => {
  return (
    <div
      className="rounded-lg shadow-md p-4 text-center transition duration-300"
      style={{ backgroundColor: cor }}
    >
      <div className="mb-2 flex justify-center">{icon}</div>
      <h3 className="font-bold text-lg text-[#2F3E46]">{title}</h3>
      <p className="text-sm text-[#2F3E46]">{description}</p>
    </div>
  );
};

export default FeatureCard;