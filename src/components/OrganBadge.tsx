import React from 'react';
import { Organ } from '../types';
import { Heart, LucideKey as Kidney, Settings as Lungs, Eye } from 'lucide-react';

interface OrganBadgeProps {
  organ: Organ;
  className?: string;
}

const OrganBadge: React.FC<OrganBadgeProps> = ({ organ, className = '' }) => {
  const getOrganIcon = (organType: Organ) => {
    switch (organType) {
      case Organ.HEART:
        return <Heart className="h-4 w-4" />;
      case Organ.KIDNEY:
        return <Kidney className="h-4 w-4" />;
      case Organ.LUNG:
        return <Lungs className="h-4 w-4" />;
      case Organ.CORNEA:
        return <Eye className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${className}`}>
      <span className="mr-1">{getOrganIcon(organ)}</span>
      <span>{organ.charAt(0).toUpperCase() + organ.slice(1)}</span>
    </div>
  );
};

export const getOrganBadgeColor = (organ: Organ) => {
  switch (organ) {
    case Organ.HEART:
      return 'bg-red-100 text-red-800';
    case Organ.KIDNEY:
      return 'bg-blue-100 text-blue-800';
    case Organ.LIVER:
      return 'bg-yellow-100 text-yellow-800';
    case Organ.LUNG:
      return 'bg-purple-100 text-purple-800';
    case Organ.PANCREAS:
      return 'bg-orange-100 text-orange-800';
    case Organ.CORNEA:
      return 'bg-teal-100 text-teal-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default OrganBadge;