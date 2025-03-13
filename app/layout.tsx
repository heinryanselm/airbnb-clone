import { Toaster } from "react-hot-toast";
import ClientOnly from "./components/ClientOnly";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import { Nunito } from "next/font/google";
import getCurrentUser from "./actions/getCurrentUser";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import SearchModal from "./components/modals/SearchModal";
import HydrationErrorSuppressor from "./HydrationErrorSuppressor";

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Find my property",
  description: "Find properties for renovations or properties for luxuryy",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en"> 
      <body className={font.className}> 
        <ClientOnly>
          <HydrationErrorSuppressor >
          <Toaster />
          <SearchModal />
          <RegisterModal />
          <LoginModal />
          <Navbar currentUser={currentUser} />
          <div className="pb-20 pt-28">{children}</div> 
          </HydrationErrorSuppressor>
        </ClientOnly>
      </body>
    </html>
  );
}
 