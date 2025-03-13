"use client";

import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import useLoginModal from "@/app/hooks/useLoginModal";
import { Listing, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import Button from "@/app/components/Button";
import { FaExternalLinkAlt } from "react-icons/fa";
//import { BiHome } from "react-icons/bi";

interface IListingClientProps {
  listing: Listing & {
    user?: User;
  };
  currentUser?: User | null; 
}

const ListingClient: React.FC<IListingClientProps> = ({
  listing,
  currentUser,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  // For viewing the original listing
  const viewOriginalListing = useCallback(() => {
    if (listing.originalListingUrl) {
      window.open(listing.originalListingUrl, '_blank');
    } else {
      toast.error("Original listing URL not available");
    }
  }, [listing.originalListingUrl]);

  // For saving to favorites (optional)
  const saveFavorite = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    
    // Add your favorite saving logic here
    toast.success("Property saved to favorites");
  }, [currentUser, loginModal]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-7
            md:gap-10
            gap-6
            align-center
          "
          >
            <ListingInfo
              user={listing.user}
              description={listing.description}
              roomCount={listing.roomCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
              condition={listing.condition}
              sourceWebsite={listing.sourceWebsite}
              lastUpdated={listing.lastUpdated}
            />
            <div
              className=" 
                col-span-4               
                order-first
                mb-10 
                md:order-last
                md:col-span-3
              "
            >
              <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
                <div className="flex flex-col gap-4 p-5">
                  <div className="text-2xl font-semibold">
                    £{listing.price.toLocaleString()}
                  </div>
                  
                  {/* Source info */}
                  <div className="flex flex-col gap-2">
                    <div className="text-sm text-neutral-500">
                      Listed on {listing.sourceWebsite}
                    </div>
                  </div>
                  
                  {/* Main action button */}
                  <Button 
                    label="View on Original Website" 
                    onClick={viewOriginalListing}
                    icon={FaExternalLinkAlt}
                  />
                  
                  {/* Optional save button */}
                  <Button 
                    label="Save to Favorites" 
                    onClick={saveFavorite}
                    outline
                  />
                </div>
              </div>
              
              {/* Contact information if available */}
              {listing.contactInfo && (
                <div className="mt-6 bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
                  <div className="p-5">
                    <div className="font-semibold mb-2">Contact Information</div>
                    <div className="text-neutral-500 text-sm">{listing.contactInfo}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
