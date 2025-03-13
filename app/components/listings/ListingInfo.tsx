"use client";

import useCountries from "@/app/hooks/useCountries";
import { User } from "@prisma/client";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import { format } from "date-fns";

// // Add some new property-related icons
import {
  FaHouse,
  FaHardHat,
  FaCalendarAlt,
  FaGlobe,
  FaInfoCircle,
} from "react-icons/fa";

interface IListingInfoProps {
  user?: User;
  description: string;
  roomCount: number;
  bathroomCount: number;
  locationValue: string;
  condition?: string;
  sourceWebsite?: string;
  lastUpdated?: string;
  estSqFt?: number; // Estimated square footage
  constructionYear?: number; // Year of construction
  energyRating?: string; // Energy efficiency rating
}

const ListingInfo: React.FC<IListingInfoProps> = ({
  user,
  description,
  roomCount,
  bathroomCount,
  locationValue,
  condition,
  sourceWebsite,
  lastUpdated,
  estSqFt,
  constructionYear,
  energyRating,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className="
            text-xl
            font-semibold
            flex
            flex-row
            items-center
            gap-2
          "
        >
          <div>Property Details</div>
        </div>
        <div
          className="
            flex
            flex-row 
            items-center
            gap-4
            font-light
            text-neutral-500
          "
        >
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
          {estSqFt && <div>{estSqFt} sq ft</div>}
        </div>
      </div>
      <hr />
 
      {/* Property location */}
      <div className="font-semibold text-lg">
        Location: {location?.region}, {location?.label} 
      </div>
      <hr />

      {/* Property condition section */}
      {condition && (
        <ListingCategory
          icon={condition.includes("renovation") ? FaHardHat : FaHouse}
          label="Property Condition"
          description={condition}
        />
      )}

      {/* Original category if available */}
      {/* {category && category.icon && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )} */}

      {/* Source and listing info */}
      {sourceWebsite && (
        <ListingCategory
          icon={FaGlobe}
          label="Listing Source"
          description={`This property is listed on ${sourceWebsite}`}
        />
      )}

      {/* Last updated */}
      {lastUpdated && (
        <ListingCategory
          icon={FaCalendarAlt}
          label="Last Updated"
          description={`Listing was last updated on ${format(
            new Date(lastUpdated),
            "PP"
          )}`}
        />
      )}

      {/* Additional property details */}
      {(constructionYear || energyRating) && (
        <div className="flex flex-col gap-2">
          <div className="text-lg font-semibold flex flex-row items-center gap-2">
            <FaInfoCircle size={18} />
            <div>Additional Information</div>
          </div>
          <div className="flex flex-row gap-4 text-neutral-500 font-light">
            {constructionYear && <div>Built in {constructionYear}</div>}
            {energyRating && <div>Energy Rating: {energyRating}</div>}
          </div>
        </div>
      )}
      <hr />

      {/* Description */}
      <div className="text-lg font-light text-neutral-500">{description}</div>
    </div>
  );
};

export default ListingInfo;
