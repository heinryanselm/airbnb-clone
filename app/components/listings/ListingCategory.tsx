"use client";

import { IconType } from "react-icons";
import { BiCategory } from "react-icons/bi";

interface IListingCategoryProps {
  icon: IconType;
  label: string;
  description: string;
}

const ListingCategory: React.FC<IListingCategoryProps> = ({
  icon: Icon,
  label,
  description,
}) => {
  const IconComponent = Icon || BiCategory;
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <IconComponent size={40} className="text-neutral-600" />
        <div className="flex flex-col">
          <div className="text-lg font-semibold">{label}</div>
          <div className="text-neutral-500 font-light">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default ListingCategory;
