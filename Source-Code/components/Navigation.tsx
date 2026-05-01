"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, User, Leaf, Menu, X } from "lucide-react";
import { useCart } from "./CartProvider";
import { useAuth } from "./AuthProvider";

const ngo_navLinks = [
  { href: "/", label: "Home" },
  { href: "/marketplace", label: "Plant a Tree" },
  { href: "/tracking", label: "Our Impact" },
  { href: "/csr", label: "CSR Partners" },
  { href: "/mission", label: "About Us" },
];

const NgoLeafLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 2C16 2 6 8 6 18C6 23.5228 10.4772 28 16 28C21.5228 28 26 23.5228 26 18C26 8 16 2 16 2Z" fill="#047857" opacity="0.9"/>
    <path d="M16 8C16 8 11 13 11 19C11 21.7614 13.2386 24 16 24C18.7614 24 21 21.7614 21 19C21 13 16 8 16 8Z" fill="#34d399" opacity="0.6"/>
    <path d="M16 28V12" stroke="#faf8f3" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
    <path d="M16 18L12 14" stroke="#faf8f3" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
    <path d="M16 15L19 12" stroke="#faf8f3" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
  </svg>
);

export default function Navigation() {
  const ngo_pathname = usePathname();
  const [ngo_mobileMenuOpen, setNgoMobileMenuOpen] = useState(false);
  const { cartItems, setIsCartOpen } = useCart();
  const ngo_totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const [ngo_scrolled, setNgoScrolled] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const ngo_handleScroll = () => setNgoScrolled(window.scrollY > 20);
    window.addEventListener("scroll", ngo_handleScroll);
    return () => window.removeEventListener("scroll", ngo_handleScroll);
  }, []);

  useEffect(() => {
    setNgoMobileMenuOpen(false);
  }, [ngo_pathname]);

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        ngo_scrolled
          ? "glass shadow-lg shadow-forest/8 border-b border-forest/10"
          : "bg-cream border-b border-sand/60"
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <div className={`mx-auto flex items-center justify-between px-5 sm:px-6 lg:px-8 max-w-7xl transition-all duration-500 ${
        ngo_scrolled ? "h-[60px]" : "h-[72px]"
      }`}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 8 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative w-9 h-9 rounded-xl flex items-center justify-center shadow-md shadow-emerald/20">
              <NgoLeafLogo />
            </div>
          </motion.div>
          <div className="flex flex-col">
            <h1 className="text-[17px] font-heading font-bold text-forest tracking-tight leading-tight">Renukiran</h1>
            <span className="text-[9px] text-earth font-semibold tracking-[0.2em] uppercase">Foundation</span>
          </div>
        </Link>

        {/* Desktop Nav  */}
        <nav className="hidden lg:flex items-center gap-1">
          {ngo_navLinks.map((link) => {
            const ngo_isActive = ngo_pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-[13px] font-semibold px-4 py-2 rounded-full transition-colors duration-300"
              >
                {ngo_isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-emerald/10 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className={`relative z-10 ${
                  ngo_isActive ? "text-emerald" : "text-dark/60 hover:text-emerald"
                }`}>
                  {link.label}
                </span>
                {ngo_isActive && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Side  */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Cart */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center justify-center size-10 rounded-full bg-sand/60 text-forest hover:bg-sand transition-colors"
          >
            <ShoppingCart className="w-[18px] h-[18px]" />
            <AnimatePresence>
              {ngo_totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-white shadow-sm"
                >
                  {ngo_totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/*  Auth Button */}
          {user ? (
            <Link
              href={user.role === "admin" ? "/admin" : "/dashboard"}
              className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-emerald/8 border border-emerald/15 text-forest text-[13px] font-bold hover:bg-emerald/15 transition-colors"
            >
              <User className="w-4 h-4 text-emerald" />
              {user.role === "admin" ? "Admin" : "Dashboard"}
            </Link>
          ) : (
            <Link
              href="/login"
              className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-sand text-forest text-[13px] font-semibold hover:bg-cream transition-colors shadow-sm"
            >
              Login
            </Link>
          )}

          {/* Donate Call to action */}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/marketplace"
              className="hidden lg:flex h-10 items-center gap-2 rounded-full bg-gradient-gold px-6 text-[13px] font-bold text-white shadow-md shadow-accent/20 hover:shadow-lg hover:shadow-accent/30 transition-shadow"
            >
              <Leaf className="w-4 h-4" />
              Plant a Tree
            </Link>
          </motion.div>

          {/* Mobile toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="lg:hidden p-2 text-dark hover:text-emerald rounded-xl hover:bg-emerald/5 transition-all"
            onClick={() => setNgoMobileMenuOpen(!ngo_mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {ngo_mobileMenuOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {ngo_mobileMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="lg:hidden overflow-hidden bg-cream/95 backdrop-blur-xl border-t border-sand/50"
          >
            <div className="flex flex-col gap-1 px-5 pb-5 pt-3">
              {ngo_navLinks.map((link, i) => {
                const ngo_isActive = ngo_pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={`text-[14px] font-semibold px-4 py-3.5 rounded-xl transition-all block ${
                        ngo_isActive
                          ? "text-emerald bg-emerald/8 font-bold"
                          : "text-dark/60 hover:text-emerald hover:bg-emerald/5"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>

                );
              })}

              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: ngo_navLinks.length * 0.05 }}
                onClick={() => setIsCartOpen(true)}
                className="mt-2 text-[14px] font-semibold px-4 py-3.5 rounded-xl text-left text-dark/60 hover:text-emerald hover:bg-emerald/5 flex items-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                View Cart {ngo_totalItems > 0 ? `(${ngo_totalItems})` : ""}
              </motion.button>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (ngo_navLinks.length + 1) * 0.05 }}
              >
                <Link
                  href={user ? (user.role === "admin" ? "/admin" : "/dashboard") : "/login"}
                  className="text-[14px] font-semibold px-4 py-3.5 rounded-xl text-left text-dark/60 hover:text-emerald hover:bg-emerald/5 flex items-center gap-2 w-full"
                >
                  <User className="w-4 h-4" />
                  {user ? "Dashboard" : "Login"}
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (ngo_navLinks.length + 2) * 0.05 }}
              >
                <Link
                  href="/marketplace"
                  className="mt-3 h-12 flex items-center justify-center rounded-full bg-gradient-gold text-[14px] font-bold text-white shadow-md gap-2"
                >
                  <Leaf className="w-4 h-4" />
                  Plant a Tree — ₹299
                </Link>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
