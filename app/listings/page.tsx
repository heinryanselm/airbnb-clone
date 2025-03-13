import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings, { IListingParams } from "@/app/actions/getListings";
import ClientOnly from "@/app/components/ClientOnly";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import ListingCard from "@/app/components/listings/ListingCard";
import Categories from "../components/navbar/Categories";

export const dynamic = "force-dynamic";

interface ListingsPageProps {
  searchParams: IListingParams;
}

const ListingsPage = async ({ searchParams }: ListingsPageProps) => {
  // Use getListings to fetch all listings
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
        <Categories />
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
