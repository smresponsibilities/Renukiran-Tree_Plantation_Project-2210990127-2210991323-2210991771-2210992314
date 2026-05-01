"use client";

import { Toaster } from "react-hot-toast";

// Layer for toaster    
export default function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "#2A3A29", // bark
          color: "#fff",
        },
        success: {
          iconTheme: {
            primary: "#E8F3EE", // sage-light
            secondary: "#2A3A29",
          },
        },
        error: {
          style: {
            background: "#EF4444", // red-500
            color: "#fff",
          },
        },
      }}
    />
  );
}
