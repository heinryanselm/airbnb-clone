import getCurrentUser from "../../actions/getCurrentUser";
import getListings, { IListingParams } from "../../actions/getListings";
import ClientOnly from "../ClientOnly";
import Container from "../Container";
import EmptyState from "../EmptyState";
import ListingCard from "./ListingCard";

export const dynamic = "force-dynamic";

interface ListingsPageProps {
  searchParams: IListingParams;
}

const ListingsPage = async ({ searchParams }: ListingsPageProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No listings found"
          subtitle="Try adjusting your search criteria"
          showReset
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default ListingsPage;
