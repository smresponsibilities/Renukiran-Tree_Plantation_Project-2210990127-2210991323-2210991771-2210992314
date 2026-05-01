import "./globals.css";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import { CartProvider } from "../components/CartProvider";
import { AuthProvider } from "../components/AuthProvider";
import CartSidebar from "../components/CartSidebar";
import ToasterProvider from "../components/ToasterProvider";
import ScrollProgress from "../components/ScrollProgress";

//
export const metadata = {
  title: "Renukiran Foundation — Plant Trees pretty please",
  description: "Join Renukiran Welfare Foundation in their mission to reforest India. Plant a tree for just rupees 299 with GPS tracking, 3-year care, and digital certificates.",
  openGraph: {
    title: "Renukiran Foundation — Plant Trees pretty please",
    description: "Plant a tree for just rupees 299 with GPS tracking, 3-year care guarantee, and a digital certificate. Join 25,000+ Indians restoring our planet.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="grain font-body bg-cream text-dark antialiased min-h-screen flex flex-col">
        <ToasterProvider />
        <AuthProvider>
          <CartProvider>
            <ScrollProgress />
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <WhatsAppButton />
            <CartSidebar />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
