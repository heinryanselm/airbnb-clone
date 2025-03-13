import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingParams } from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";
import LandingPage from "./components/landing/LandingPage";

interface HomeProps {
  searchParams: IListingParams;
}

export const dynamic = "force-dynamic";

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  // If there are search params, show filtered results
  const hasSearchParams = Object.keys(searchParams).length > 0;

  if (hasSearchParams) {
    // Show empty state if no search results
    if (listings.length === 0) {
      return (
        <ClientOnly>
          <EmptyState showReset />
        </ClientOnly>
      );
    }

    // Show search results
    return (
      <ClientOnly>
        <Container>
          <div
            className="
              pt-24
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
              2xl:grid-cols-6
              gap-8
            "
          >
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
  }

  // If no search params, show landing page
  return (
    <ClientOnly>
      <LandingPage currentUser={currentUser} />
    </ClientOnly>
  );
};

export default Home;
