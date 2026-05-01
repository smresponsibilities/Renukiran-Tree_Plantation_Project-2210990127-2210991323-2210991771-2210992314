"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Script from "next/script";

const NgoLeafLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 2C16 2 6 8 6 18C6 23.5228 10.4772 28 16 28C21.5228 28 26 23.5228 26 18C26 8 16 2 16 2Z" fill="#047857" opacity="0.9"/>
    <path d="M16 8C16 8 11 13 11 19C11 21.7614 13.2386 24 16 24C18.7614 24 21 21.7614 21 19C21 13 16 8 16 8Z" fill="#34d399" opacity="0.6"/>
    <path d="M16 28V12" stroke="#faf8f3" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
    <path d="M16 18L12 14" stroke="#faf8f3" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
    <path d="M16 15L19 12" stroke="#faf8f3" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
  </svg>
);

// very important made by SM
export default function CertificatePage() {
  const params = useParams();
  const orderId = params.orderId as string;
  const [ngo_certData, setNgoCertData] = useState<any>(null);
  const [ngo_loading, setNgoLoading] = useState(true);
  const [ngo_downloading, setNgoDownloading] = useState(false);
  const [ngo_error, setNgoError] = useState("");

  useEffect(() => {
    fetch(`/api/certificate/${orderId}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.error) setNgoError(json.error);
        else setNgoCertData(json);
      })
      .catch(() => setNgoError("Failed to load certificate unfortunately"))
      .finally(() => setNgoLoading(false));
  }, [orderId]);

  const ngo_handleDownload = async () => {
    if (!ngo_certData || !(window as any).domtoimage || !(window as any).jspdf) return;
    setNgoDownloading(true);

    try {
      const ngo_certElement = document.getElementById("certificate-card");
      if (!ngo_certElement) return;

      const ngo_dataUrl = await (window as any).domtoimage.toPng(ngo_certElement, {
        quality: 1,
        width: ngo_certElement.clientWidth * 2,
        height: ngo_certElement.clientHeight * 2,
        style: {
          transform: 'scale(2)',
          transformOrigin: 'top left',
          borderRadius: '0',
          boxShadow: 'none'
        }
      });

      const { jsPDF } = (window as any).jspdf;
      const ngo_pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const ngo_pdfWidth = ngo_pdf.internal.pageSize.getWidth();
      const ngo_pdfHeight = (ngo_certElement.clientHeight * ngo_pdfWidth) / ngo_certElement.clientWidth;

      ngo_pdf.addImage(ngo_dataUrl, "PNG", 0, 0, ngo_pdfWidth, ngo_pdfHeight);
      ngo_pdf.save(`Renukiran_Certificate_${ngo_certData.certificateId}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Direct download failed due to browser color incompatibilities. Opening print dialog as fallback...");
      window.print();
    } finally {
      setNgoDownloading(false);
    }
  };

  if (ngo_loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-earth font-medium">Loading certificate...</p>
        </div>
      </div>
    );
  }

  if (ngo_error || !ngo_certData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center bg-white p-10 rounded-3xl border border-sand shadow-lg max-w-md">
          <span className="text-5xl mb-4 inline-block">⚠️</span>
          <h2 className="text-2xl font-bold text-forest mb-2">Certificate Unavailable</h2>
          <p className="text-earth">{ngo_error || "This certificate could not be loaded sorry"}</p>
        </div>
      </div>
    );
  }

  const ngo_issueDate = new Date(ngo_certData.createdAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const ngo_treeSummary = ngo_certData.trees
    .map((t: any) => `${t.quantity}x ${t.name}`)
    .join(", ");

  return (
    <>
      {/* Load libraries via CDN for direct download */}
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.min.js" strategy="lazyOnload" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js" strategy="lazyOnload" />

      <style jsx global>{`
        @page {
          size: landscape;
          margin: 0;
        }
        @media print {
          /* Keep current print logic as a fallback */
          nav, footer, header, #whatsapp-button, .no-print, [role="navigation"] {
            display: none !important;
            height: 0 !important;
            overflow: hidden !important;
            visibility: hidden !important;
          }
          body {
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            background: white !important;
            width: 100vw !important;
            height: 100vh !important;
          }
          #certificate-container {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
            z-index: 999999 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          #certificate-card {
            width: 100vw !important;
            height: 100vh !important;
            max-width: none !important;
            max-height: none !important;
            aspect-ratio: auto !important;
            border: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
          }
        }
      `}</style>

      <div className="no-print fixed top-24 left-4 z-[100]">
        <button
          onClick={ngo_handleDownload}
          disabled={ngo_downloading}
          className={`flex items-center gap-2 bg-gradient-to-r from-primary to-primary-light text-white font-bold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all ${
            ngo_downloading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {ngo_downloading ? (
            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          )}
          {ngo_downloading ? "Generating PDF..." : "Download Certificate"}
        </button>
      </div>

      <div id="certificate-container" className="min-h-screen flex flex-col items-center justify-center bg-[#fdfaf5] py-24 px-4 sm:px-8">
        {/* Mobile instruction */}
        <p className="md:hidden text-forest/70 text-sm mb-4 animate-pulse flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2h-10a2 2 0 00-2 2v6a2 2 0 002 2z"></path></svg>
          Scroll horizontally to view
        </p>
        
        {/* Scrollable Wrapper for Mobile */}
        <div className="w-full max-w-[950px] overflow-x-auto pb-6 flex justify-start md:justify-center">
          {/* Certificate Card */}
          <div 
            id="certificate-card" 
            className="relative w-[950px] min-w-[950px] aspect-[1.414/1] bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(12,46,26,0.1)] overflow-hidden border border-sand/50 shrink-0"
            style={{ backgroundColor: '#ffffff' }}
          >

          {/* Background Patterns & Watermark */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none dot-pattern"></div>
          <div className="absolute top-[20%] left-[10%] opacity-[0.05] pointer-events-none">
            <svg width="400" height="400" viewBox="0 0 24 24" fill="#047857">
              <path d="M12 2L6 10H9L5 18H19L15 10H18L12 2Z" />
            </svg>
          </div>

          {/* Premium Organic Shapes (Right Side) */}
          <div className="absolute top-0 right-0 w-[50%] h-full pointer-events-none">
            {/* Dark Green Deep Base */}
            <div 
              className="absolute top-[-10%] right-[-10%] w-[110%] h-[120%] rounded-bl-[80%] transform rotate-[-5deg] opacity-100 shadow-2xl"
              style={{ backgroundColor: '#0c2e1a' }}
            ></div>
            {/* Primary Green Mid Layer */}
            <div 
              className="absolute top-[-5%] right-[-5%] w-[90%] h-[100%] rounded-bl-[70%] transform rotate-[2deg] opacity-90"
              style={{ backgroundColor: '#047857' }}
            ></div>
            {/* Accent Gold Accent Line */}
            <div 
              className="absolute bottom-[20%] right-[-5%] w-[60%] h-[60%] border-4 border-[#d4a843] rounded-full blur-xl"
              style={{ opacity: 0.3 }}
            ></div>
          </div>

          {/* Decorative fluid lines */}
          <svg className="absolute top-0 right-[40%] h-full w-48 opacity-20 pointer-events-none" viewBox="0 0 150 600" fill="none">
            <path d="M120 0 Q40 150 100 300 Q160 450 60 600" stroke="#d4a843" strokeWidth="1" fill="none" />
            <path d="M140 0 Q60 150 120 300 Q180 450 80 600" stroke="#047857" strokeWidth="1" fill="none" />
          </svg>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col p-16 pb-24">

            {/* Header Section */}
            <div className="flex-1 max-w-[55%] flex flex-col">
              <div className="flex items-center gap-3 mb-10">
                <NgoLeafLogo />
                <div>
                  <p className="font-bold text-[#0c2e1a] text-lg tracking-wide heading-serif">Renukiran</p>
                  <p className="text-[#6b6b5e] text-[10px] font-bold uppercase tracking-[0.2em] leading-none">Foundation</p>
                </div>
              </div>

              <h1 className="heading-serif text-5xl font-black text-[#059669] leading-tight mb-2 whitespace-nowrap">
                Proof of Completion
              </h1>
              <div className="w-20 h-1.5 bg-[#d4a843] rounded-full mb-8"></div>

              <div className="mb-8">
                <p className="text-[#6b6b5e] text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
                  This is to officially recognize
                </p>
                <p className="text-[#047857] text-4xl font-black heading-serif truncate">
                  {ngo_certData.userName}
                </p>
              </div>

              <div className="mb-10">
                <p className="text-[#6b6b5e] text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
                  For the environmental stewardship of
                </p>
                <h2 className="text-[#0c2e1a] text-xl font-bold leading-relaxed line-clamp-2">
                  {ngo_treeSummary}
                </h2>
              </div>

              <div className="flex items-center gap-8 border-t border-[#e8dcc8] pt-8 mt-auto">
                <div>
                  <p className="text-[#6b6b5e] text-[9px] uppercase tracking-[0.15em] mb-1 opacity-70">Date of Issue</p>
                  <p className="text-[#0c2e1a] font-black text-sm font-mono whitespace-nowrap">{ngo_issueDate}</p>
                </div>
                <div>
                  <p className="text-[#6b6b5e] text-[9px] font-bold uppercase tracking-[0.15em] mb-1 opacity-70 whitespace-nowrap">Certificate Number</p>
                  <p className="text-[#0c2e1a] font-black text-sm font-mono whitespace-nowrap">{ngo_certData.certificateId}</p>
                </div>
              </div>
            </div>

            {/* Footer Text area */}
            <div className="max-w-[55%] pt-10">
              <p className="text-[#6b6b5e] text-[11px] font-medium italic opacity-60 leading-relaxed">
                Issued by Renukiran Welfare Foundation. This digital certificate confirms your contribution to ecological restoration.
              </p>
            </div>
          </div>

          {/* Branding elements on the green background */}
          <div className="absolute bottom-12 right-12 z-20 flex flex-col items-end text-right">
             {/* Dynamic Total Contribution */}
              <div 
                className="border rounded-3xl p-8 mb-6 shadow-2xl min-w-[200px]"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(16px)' }}
              >
                <p className="text-white/60 text-[9px] font-bold uppercase tracking-[0.15em] mb-2">Total Contribution</p>
                <p className="text-white text-4xl font-black heading-serif whitespace-nowrap">
                   ₹{ngo_certData.totalAmount}
                </p>
             </div>
             
             <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-white font-black text-xl tracking-tight heading-serif leading-none">Renukiran</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-xl" style={{ backgroundColor: '#ffffff' }}>
                  <NgoLeafLogo />
                </div>
             </div>
          </div>

          {/* Dynamic Legal Registry ID watermark */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 opacity-30 w-full text-center">
            <p className="text-black text-[9px] font-mono tracking-[0.3em] uppercase">
              Authenticated Digital Registry ID • <span className="font-bold">{ngo_certData.certificateId}</span>
            </p>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
