"use client";

import qs from "query-string";
import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import useSearchModal from "@/app/hooks/useSearchModal";

import Modal from "./Modal";
import Counter from "../Inputs/Counter";
import CountrySelect, { CountrySelectValue } from "../Inputs/CountrySelect";
import Heading from "../Heading";

// Add for property conditions
import {
  IoHomeOutline,
  IoConstructOutline,
  IoWarningOutline,
} from "react-icons/io5";

enum STEPS {
  LOCATION = 0,
  DETAILS = 1,
  PRICE = 2,
}

// Property condition options
const CONDITIONS = [
  { label: "Ready to move in", value: "move-in-ready", icon: IoHomeOutline },
  {
    label: "Needs renovation",
    value: "needs-renovation",
    icon: IoConstructOutline,
  },
  { label: "Fixer-upper", value: "fixer-upper", icon: IoWarningOutline },
];

// Property types
const PROPERTY_TYPES = [
  { label: "House", value: "house" },
  { label: "Flat/Apartment", value: "flat" },
  { label: "Commercial", value: "commercial" },
  { label: "Land", value: "land" },
];

const SearchModal = () => {
  const router = useRouter();
  const searchModal = useSearchModal();
  const params = useSearchParams();

  const [step, setStep] = useState(STEPS.LOCATION);

  const [location, setLocation] = useState<CountrySelectValue>();
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [propertyType, setPropertyType] = useState("");
  const [propertyCondition, setPropertyCondition] = useState("");

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      roomCount,
      bathroomCount,
      minPrice,
      maxPrice,
      propertyType: propertyType || undefined,
      propertyCondition: propertyCondition || undefined,
    };

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [
    step,
    searchModal,
    location,
    router,
    roomCount,
    bathroomCount,
    minPrice,
    maxPrice,
    propertyType,
    propertyCondition,
    onNext,
    params,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Search";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }

    return "Back";
  }, [step]);

  // Location selection step
  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where are you looking for a property?"
        subtitle="Find your perfect location!"
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
    </div>
  );

  // Property details step
  if (step === STEPS.DETAILS) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Property details" subtitle="Narrow your search!" />

        {/* Property type selection */}
        <div>
          <div className="font-semibold mb-2">Property Type</div>
          <div className="grid grid-cols-2 gap-3">
            {PROPERTY_TYPES.map((type) => (
              <div
                key={type.value}
                onClick={() => setPropertyType(type.value)}
                className={`
                  border-2 rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer
                  ${
                    propertyType === type.value
                      ? "border-black"
                      : "border-neutral-200"
                  }
                `}
              >
                <div className="font-medium">{type.label}</div>
              </div>
            ))}
          </div>
        </div>
        <hr />

        {/* Property condition */}
        <div>
          <div className="font-semibold mb-2">Property Condition</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {CONDITIONS.map((condition) => (
              <div
                key={condition.value}
                onClick={() => setPropertyCondition(condition.value)}
                className={`
                  border-2 rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer
                  ${
                    propertyCondition === condition.value
                      ? "border-black"
                      : "border-neutral-200"
                  }
                `}
              >
                <condition.icon size={28} />
                <div className="font-medium">{condition.label}</div>
              </div>
            ))}
          </div>
        </div>
        <hr />

        {/* Room and bathroom counts */}
        <Counter
          title="Rooms"
          subtitle="Minimum number of rooms needed"
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="Minimum number of bathrooms needed"
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    );
  }

  // Price range step
  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Price Range" subtitle="Set your budget" />

        {/* Min price input */}
        <div>
          <div className="font-medium mb-2">Minimum Price (£)</div>
          <input
            type="number"
            className="w-full p-4 font-light bg-white border-2 rounded-md outline-none transition"
            value={minPrice}
            onChange={(e) => setMinPrice(parseInt(e.target.value) || 0)}
          />
        </div>

        {/* Max price input */}
        <div>
          <div className="font-medium mb-2">Maximum Price (£)</div>
          <input
            type="number"
            className="w-full p-4 font-light bg-white border-2 rounded-md outline-none transition"
            value={maxPrice}
            onChange={(e) => setMaxPrice(parseInt(e.target.value) || 0)}
          />
        </div>
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      title="Search Properties"
      actionLabel={actionLabel}
      onSubmit={onSubmit}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      onClose={searchModal.onClose}
      body={bodyContent}
    />
  );
};

export default SearchModal;
