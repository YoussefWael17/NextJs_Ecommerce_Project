import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Script from "next/script";
import { Toaster } from "sonner";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex min-h-screen flex-col">
                 
                  <Navbar />

                  
                  <main className="flex-1">
                    {children}

                    <Script
                      src="https://accounts.google.com/gsi/client"
                      strategy="afterInteractive"
                    />
                  </main>

                  {/* <Toaster
                    position="top-center"
                    richColors
                    closeButton
                    expand
                  /> */}

                  
                  <Footer />
      </div>
    </>
  );
}