"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface TreeInfoPopupProps {
  treeName: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TreeInfoPopup({ treeName, isOpen, onClose }: TreeInfoPopupProps) {
  const [ngo_description, setNgoDescription] = useState<string>("");
  const [ngo_loading, setNgoLoading] = useState(false);
  const [ngo_imageUrl, setNgoImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !treeName) return;

    let ngo_isMounted = true;
    setNgoLoading(true);
    setNgoDescription("");
    setNgoImageUrl(null);

    const ngo_fetchTreeInfo = async () => {
      try {
        let ngo_queryName = treeName.trim();
        console.log(ngo_queryName);
        let ngo_wikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(ngo_queryName)}`);
        
        if (!ngo_wikiRes.ok) {
          ngo_queryName = treeName.replace(/Tree/ig, "").trim();
          console.log("Retrying with:", ngo_queryName);
          ngo_wikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(ngo_queryName)}`);
          if (!ngo_wikiRes.ok) throw new Error("Not found");
        }
        
        const ngo_wikiData = await ngo_wikiRes.json();
        
        if (ngo_isMounted) {
          if (ngo_wikiData.type === "disambiguation" || !ngo_wikiData.extract) {
             throw new Error("Disambiguation or empty");
          }
          setNgoDescription(ngo_wikiData.extract);
          if (ngo_wikiData.thumbnail?.source) {
            setNgoImageUrl(ngo_wikiData.thumbnail.source);
          }
          setNgoLoading(false);
        }
      } catch (err) {
        if (ngo_isMounted) {
          setNgoDescription(`The ${treeName} is an incredible specie like any other tree this also contributes significantly  to our environment. All trees including this are vital to our ecosystem, providing essential O, improving local air quality, stabilizing soil, and supporting diverse wildlife. Plant this ${treeName} successfully helps restore nature's balance.`);
          setNgoLoading(false);
        }
      }
    };

    ngo_fetchTreeInfo();

    return () => { ngo_isMounted = false; };
  }, [treeName, isOpen]);

  if (!isOpen || !treeName) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop  */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Popup / Modal  */}
      <div className="relative z-10 w-full max-w-md bg-[#1c1c1c] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl transform scale-100 transition-all duration-300">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors size-8 flex items-center justify-center rounded-full hover:bg-white/10"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="flex flex-col items-center text-center gap-5 mt-2">
          {ngo_imageUrl ? (
            <div className="size-24 rounded-full overflow-hidden border-4 border-[#34d399] shadow-lg">
              <img src={ngo_imageUrl} alt={treeName} className="w-full h-full object-cover bg-white" />
            </div>
          ) : (
            <div className="size-24 rounded-full bg-[#34d399] flex items-center justify-center text-4xl shadow-lg border-4 border-white/5">
              🌳
            </div>
          )}

          <div className="w-full">
            <h3 className="text-2xl font-bold font-serif text-white/90 mb-3">{treeName}</h3>
            
            {ngo_loading ? (
              <div className="space-y-3 animate-pulse mt-4">
                <div className="h-3 bg-white/10 rounded w-full"></div>
                <div className="h-3 bg-white/10 rounded w-5/6 mx-auto"></div>
                <div className="h-3 bg-white/10 rounded w-4/6 mx-auto"></div>
              </div>
            ) : (
              <p className="text-[#a0a0a0] text-sm leading-relaxed max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                {ngo_description}
              </p>
            )}
          </div>

          <div className="w-full mt-4 flex flex-col gap-3">
            <Link 
              href={`/marketplace?tree=${encodeURIComponent(treeName)}`}
              className="w-full h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-accent-dark via-accent to-accent-light text-white text-[15px] font-bold hover:shadow-xl hover:shadow-accent/20 transition-all hover:scale-105 active:scale-95"
              onClick={onClose}
            >
               Plant a Tree
            </Link>
            <button 
              onClick={onClose}
              className="w-full h-11 flex items-center justify-center rounded-full border border-white/10 text-white/70 text-[15px] font-semibold hover:bg-white/5 hover:text-white transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
