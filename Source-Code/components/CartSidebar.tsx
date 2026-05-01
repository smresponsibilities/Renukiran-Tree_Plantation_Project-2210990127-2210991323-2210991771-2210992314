"use client";

import { useCart } from "./CartProvider";
import Script from "next/script";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CartSidebar() {
  const { cartItems, isCartOpen, setIsCartOpen, ngo_removeFromCart, ngo_updateQuantity, ngo_getCartTotal, ngo_clearCart } = useCart();
  const [ngo_processing, setNgoProcessing] = useState(false);

  const ngo_total = ngo_getCartTotal();

  const ngo_handleCheckout = async () => {
    if (cartItems.length === 0) return;
    setNgoProcessing(true);
    try {
      // Enforce Login Gate
      const ngo_meRes = await fetch("/api/user/me");
      if (!ngo_meRes.ok) {
        toast.error("You must be logged in to sponsor trees and receive your digital certificate.");
        window.location.href = "/login";
        return;
      }

      const ngo_orderRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: ngo_total }),
      });
      const ngo_order = await ngo_orderRes.json();

      if (ngo_order.error) throw new Error(ngo_order.error);

      const ngo_razorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_dummykey123",
        amount: ngo_order.amount,
        currency: ngo_order.currency,
        name: "Renukiran Foundation",
        description: `Sponsor ${cartItems.length} species of trees`,
        order_id: ngo_order.id,
        handler: async function (response: any) {
          try {
            const ngo_verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
                trees: cartItems.map(item => ({ treeId: String(item.id), name: item.name, quantity: item.quantity, price: item.price })),
                totalAmount: ngo_total
              }),
            });
            const ngo_verifyData = await ngo_verifyRes.json();
            if (ngo_verifyData.success) {
              ngo_clearCart();
              setIsCartOpen(false);
              toast.success("Payment Successful! Thank you for your contribution.");
            } else {
              toast.error("Payment failed");
            }
          } catch(e) { console.error(e) }
        },
        prefill: {
          name: "Student User",
          email: "student@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#047857"
        }
      };

      const ngo_razorpay = new (window as any).Razorpay(ngo_razorpayOptions);
      ngo_razorpay.on("payment.failed", function (response: any) {
        toast.error("Payment Failed: " + response.error.description);
      });
      ngo_razorpay.open();
    } catch (err) {
      console.error("Checkout issue:", err);
      toast.error("Unable to initiate checkout.");
    } finally {
      setNgoProcessing(false);
    }
  };

  if (!isCartOpen) return null;

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-[100] transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sidebar */}
      <div className="fixed top-0 right-0 w-full max-w-md h-full bg-[#f8f6f0] shadow-2xl z-[101] flex flex-col transform transition-transform duration-300 translate-x-0">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#e5e0d3] bg-white">
          <h2 className="font-serif font-bold text-[#1c4532] text-2xl flex items-center gap-2">
              Your Cart
          </h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#eae5d8] transition-colors text-[#5c4d3c]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-[#5c4d3c] opacity-60 mt-10">
              <span className="text-5xl mb-4">🍃</span>
              <p className="font-semibold text-lg">Your cart is empty</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 bg-white p-3 rounded-2xl border border-[#e5e0d3] shadow-sm relative hover:shadow-md transition-all">
                <img src={item.img} alt={item.name} className="w-20 h-20 rounded-xl object-cover bg-[#eae5d8]" />
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start pr-6">
                    <h3 className="font-bold text-[#1c4532] text-[15px] leading-tight">{item.name}</h3>
                  </div>
                  <button onClick={() => ngo_removeFromCart(item.id)} className="absolute top-3 right-3 text-red-400 hover:text-red-600 transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                  </button>
                  <p className="text-xs text-[#8a7f72] mb-3">₹{item.price}</p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center border border-[#e5e0d3] rounded-lg overflow-hidden bg-[#f8f6f0]">
                      <button onClick={() => ngo_updateQuantity(item.id, -1)} className="px-2.5 py-1 text-[#5c4d3c] hover:bg-[#eae5d8] transition-colors">−</button>
                      <span className="px-3 py-1 text-xs font-bold font-sans text-[#1c4532] border-x border-[#e5e0d3] min-w-[32px] text-center">{item.quantity}</span>
                      <button onClick={() => ngo_updateQuantity(item.id, 1)} className="px-2.5 py-1 text-[#5c4d3c] hover:bg-[#eae5d8] transition-colors">+</button>
                    </div>
                    <span className="font-bold text-[#047857] text-sm">₹{item.price * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-white border-t border-[#e5e0d3] shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.03)]">
            <div className="flex justify-between items-center mb-5">
              <span className="text-[#5c4d3c] font-semibold text-[15px]">Total Contribution</span>
              <span className="font-black text-[#1c4532] text-2xl">₹{ngo_total}</span>
            </div>
            <button
              onClick={ngo_handleCheckout}
              disabled={ngo_processing}
              className={`w-full font-bold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                ngo_processing 
                  ? "bg-[#34d399] text-white scale-[0.98] opacity-80 cursor-wait"
                  : "bg-[#1c4532] text-white hover:bg-[#047857] shadow-lg hover:shadow-[#047857]/20"
              }`}
            >
              {ngo_processing ? " Processing Interface..." : " Checkout via Razorpay"}
            </button>
            <p className="text-center text-[10.px] text-[#8a7f72] mt-4 flex items-center justify-center gap-1.5 font-medium">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              Secure 1024-bit Encrypted Transaction
            </p>
          </div>
        )}
      </div>
    </>
  );
}
