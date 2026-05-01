"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Instagram, Twitter, Linkedin, Youtube, ArrowRight, CheckCircle, MapPin, Phone, Mail } from "lucide-react";
import TreeInfoPopup from "./TreeInfoPopup";

// From growbilliontrees inspo
const NGO_TREE_LIST = [
  "Aadusa Tree", "Aak Tree", "Acacia Tree", "Adusa Tree", "African Mahogany Tree", "Agarwood Tree", "Alder Tree", "Alpine Ash Tree", "Amla Tree", "Andaman Padauk Tree", "Anjan Tree", "Apple Bear", "Apple Blossom Tree", "Arabian Gum Tree", "Arboreal icons", "Argentine Mesquite Tree", "Arjuna Tree", "Ashoka Tree", "Aspen Tree", "Australian Blackwood Tree", "Australian Buloke Tree", "Australian Rosewood Tree", "Avocado Tree", "Babul Trees", "Badam Tree", "Bael Tree", "Bakain Tree", "Bakayan Neem Tree", "Bald Cypress Tree", "Balsam Tree", "Bamboo Tree", "Banyan Tree", "Baobab Tree", "Barbados Cherry Tree", "Bastard Teak Tree", "Beach Almond Tree", "Behada Tree", "Belpatra Tree", "Ber Tree", "Betel Nut Palm Tree", "Bhojpatra Tree", "Big Leaf Mahogany Tree", "Bija Tree", "Birch tree", "Black Alder Tree", "Black Ash Tree", "Black Ironwood Tree", "Black Mulberry Tree", "Black Poplar Tree", "Black Willow Tree", "Blackboard Tree", "Bottle Brush Tree", "Bougainvillea Plant", "Boxwood Tree", "Brazilian Rosewood Tree", "Breadfruit Tree", "Broadleaf Maple Tree", "Buddha Coconut Tree", "Buddha S Hand Tree", "Buransh Tree", "Burma Padauk Tree", "Burmese Grape Tree", "Butter Tree", "Buttercup Tree", "California Laurel Tree", "Calliandra Tree", "Camphorwood Tree", "Canary Island Pine Tree", "Cannonball Tree", "Capirona Tree", "Caribbean Pine Tree", "Carissa Carandas (Karwand)", "Carolina Silverbell Tree", "Cashew Tree", "Cassia Tree", "Casuraniya Suru Tree", "Casurina Tree", "Ceylon Date Palm Tree", "Ceylon Ironwood Tree", "Ceylon Olive Tree", "Chafa Tree", "Champa White", "Chandni Tree", "Charoli Tree", "Chaste Tree", "Chebulic Myrobalan Tree", "China Palm Tree", "Chinar Tree", "Chinese Chestnut Tree", "Chinese Elm Tree", "Chinese Parasol Tree", "Chinese Pistachio Tree", "Chinese Tallow Tree", "Chinese Toon Tree", "Chirol Tree", "Chironji Tree", "Chokecherry Tree", "Christmas Tree", "Cinnamon Tree", "Citron Tree", "Coastal Redwood Tree", "Coastal Wattle Tree", "Cocoa Tree", "Coconut Tree", "Coffee Arabica Tree", "Cogon Grass Tree", "Common Alder tree", "Common Hornbeam tree", "Common Juniper tree", "Common Walnut Tree", "Congo Mahogany Tree", "Cotton Tree", "Cottonwood Tree", "Crape Myrtle tree", "Crow S Ash Tree", "Cuban Laurel Tree", "Cuban Mahogany Tree", "Cucumber Tree", "Curry Leaf Tree", "Custard Apple Tree", "Deodar Tree", "Desert Date Tree", "Desert Ironwood Tree", "Desert Willow Tree", "Dhawada Tree", "Dita Tree", "Diya Plant Tree", "Dogwood Tree", "Dragon Tree", "Drumstick Tree", "Dtarkumari Tree", "Dudhi Tree", "Durva Grass", "Eastern Hemlock Tree", "Eastern Redbud Tree", "Eastern White Pine Tree", "Ebony Apple Tree", "Elderberry Tree", "Elephant Foot Tree", "Eucalyptus Tree", "European Ash tree", "European Beech tree", "European Hornbeam tree", "European Larch tree", "European Linden tree", "European Yew tree", "Evergreen Magnolia Tree", "False Acacia Tree", "False Mahogany Tree", "False Nutmeg Tree", "False Tamarind Tree", "False White Teak Tree", "Fever Tree", "Fig Tree", "Fir Tree", "Firewheel Tree", "Fish Poison Tree", "Flame Of The Forest Tree", "Fragrant Cedar Tree", "French Tamarisk Tree", "Gamhar Tree", "Giant Redwood Tree", "Giant Sequoia Tree", "Glossy Abelia Tree", "Gmelina Tree", "Golden Ash Tree", "Golden Bottle Brush Tree", "Golden Duranta Tree", "Golden Larch Tree", "Golden Trumpet Tree", "Grand Fir Tree", "Gray Birch Tree", "Green Ash Tree", "Green Fountain Grass", "Greenheart Tree", "Guava Tree", "Gudhal Plant", "Guggal Tree", "Guiana Chestnut Tree", "Gulbhendi Tree", "Gulmohar Tree", "Gultara Tree", "Gutta-Percha Tree", "Hackberry Tree", "Hamellia Tree", "Harsingar Tree", "Hawaiian Sandalwood Tree", "Hemlock Tree", "Hickory Tree", "Himalayan Cedar Tree", "Himalayan Fir Tree", "Himalayan Maple Tree", "Himalayan Oak Tree", "Hog Plum Tree", "Hollong Tree", "Honey Locust Tree", "Horse Chestnut Tree", "Indian Almond Tree", "Indian Bay Tree", "Indian Beech Tree", "Indian Birch Tree", "Indian Cedar Tree", "Indian Cherry Tree", "Indian Coral Tree", "Indian Cork Fig", "Indian Cork Oak Tree", "Indian Cork Tree", "Indian Corkwood Tree", "Indian Devil Tree", "Indian Ebony Tree", "Indian Elm Tree", "Indian Fire Tree", "Indian Ginseng Tree", "Indian Kino Tree", "Indian Laurel Fig Tree", "Indian Laurel Tree", "Indian Mahogany Tree", "Indian Mahua Tree", "Indian Medlar Tree", "Indian Peach Tree", "Indian Persimmon Tree", "Indian Poison Nut Tree", "Indian Raintree Tree", "Indian Red Sandalwood Tree", "Indian Rosewood Tree", "Indian Screw Pine Tree", "Indian Tulip Tree", "Indian White Cedar Tree", "Indian Willow Tree", "Ironwood Tree", "Italian Basil", "Italian Cypress Tree", "Ivory Palm Tree", "Jacaranda Blue Tree", "Jackalberry Tree", "Jackfruit Tree", "Jammi Chettu", "Jamun Tree", "Japanese Ash tree", "Japanese Beech tree", "Japanese Cedar tree", "Japanese Cherry tree", "Japanese Holly tree", "Japanese Maple tree", "Japanese Pagoda tree", "Japanese Walnut tree", "Jasmin Tree", "Jasvanti Plant", "Java Apple Tree", "Javanese Almond Tree", "Jelly Palm Tree", "Jujube Tree", "Jungle Jalebi Tree", "Juniper tree", "Kachnar Tree", "Kadamba Tree", "Kali Mirch Tree", "Kalmegh Plant", "Kapok Tree", "Karanj Tree", "Karonda Tree", "Kaahid Tree", "Katesawar Tree", "Keshriya Sayma Tree", "Khair Tree", "Khaya Tree", "Khejri Tree", "Kher Tree", "Khirni Tree", "Kikar Tree", "Kingswood Tree", "Kokam Tree", "Korean Pine Tree", "Lady S Slipper Tree", "Larch tree", "Lasoora Tree", "Lathzira Tree", "Laung Tree", "Laurel Fig Tree", "Laxmi Kamal Tree", "Laxmi Taru Tree", "Lemon Eucalyptus Tree", "Lemon Tree", "Lemon-Scented Gum Tree", "Lemongrass", "Licorice Tree", "Little Leaf Linden Tree", "Littleleaf Boxwood Tree", "Locust Tree", "Longan Tree", "Loquat Tree", "Macadamia Tree", "Magnolia tree", "Mahua Tree", "Malabar Chestnut Tree", "Malabar Plum Tree", "Mango Pine Tree", "Mango Tree", "Mangosteen Tree", "Mangroves", "Manikara Tree", "Maple Tree Magic", "Mast Tree", "Matti Tree", "Moulsari Tree", "Mehandi Tree", "Mexican Ash Tree", "Mexican Cypress Tree", "Mexican Elder Tree", "Mexican Plum Tree", "Midnight Horror Tree", "Moha Tree", "Monkey Hand Tree", "Monkey Pod Tree", "Moreton Bay Fig Tree", "Mosambi Tree", "Mountain Ash Tree", "Mountain Cherry Tree", "Mountain Ebony Tree", "Mountain Gum Tree", "Mountain Laurel Tree", "Muchkand Tree", "Muskwood Tree", "Myrobalan Tree", "Myrtle Tree", "Nagkesara Tree", "Narrow Leaf Ash Tree", "Natal Mahogany Tree", "Native Olive Tree", "Neem Tree", "Noni Tree", "North Indian Rosewood Tree", "Norway Maple Tree", "Norway Spruce tree", "Nutmeg Tree", "Oak Tree", "Orange Tree", "Oriental Plane Tree", "Pacific Dogwood Tree", "Painted Maple tree", "Palash Tree", "Palm Tree", "Palo Santo Tree", "Panama Redwood Tree", "Pangara Tree", "Paperbark Maple tree", "Paperbark Tea Tree", "Paraguayan Holly Tree", "Paras Pipal Tree", "Peepal Tree", "Peltaform Tree", "Pencil Cedar Tree", "Pencilwood Tree", "Persian Lilac Tree", "Persian Silk Tree", "Peruvian Pepper Tree", "Philippine Ebony Tree", "Philkan Tree", "Pink Trumpet Tree", "Plumeria Tree", "Pomegranate tree", "Pond Cypress Tree", "Poplar tree", "Pride Of India Tree", "Purple Beech tree", "Purple Orchid Tree", "Putranjiva Tree", "Queensland Blackbutt Tree", "Queensland Kauri Tree", "Queensland Maple Tree", "Queensland Silver Wattle Tree", "Quinine Tree", "Raatrani Tree", "Rain Tree", "Rainforest Plum Tree", "Red Alder tree", "Red Beech tree", "Red Bloodwood Tree", "Red Bottle Brush Tree", "Red Flowering Gum Tree", "Red Fountain Grass", "Red Horse Chestnut tree", "Red Kapok Tree", "Red Oak tree", "Red Pine tree", "Red Silk Cotton Tree", "Red Silkwood Tree", "Redwood Ash Tree", "Redwood tree", "River Birch tree", "River Red Gum Tree", "River Sheoak Tree", "Rocky Mountain Maple tree", "Rose (Rosa) Tree", "Rose Myrtle Tree", "Rough Barked Apple Tree", "Royal Palm Tree", "Sacred Bark Tree", "Sago Palm Tree", "Saja Tree", "Sal Tree", "Sand Olive Tree", "Sand Paper Tree", "Sandalwood Tree", "Santa Maria Tree", "Sapodilla Tree", "Sapota (Chiku) Tree", "Saptparni Tree", "Satinwood Tree", "Satwin Tree", "Sausage Tree", "Scarlet Maple tree", "Scarlet Sterculia Tree", "Scopiya Tree", "Screwpine Tree", "Seaside Mahoe Tree", "Semal Tree", "Shagbark Hickory tree", "Shailendra Tree", "Shami Tree", "Shatavari Plant", "Shawani Tree", "Shirish Tree", "Shisham Tree", "Shravani Tree", "Silk Cotton Tree", "Silver Birch tree", "Silver Fir tree", "Silver Lime tree", "Silver Oak Tree", "Siris Tree", "Sissoo Tree", "Sita Ashoka Tree", "Snake Bean Tree", "Snakewood Tree", "Snow Gum Tree", "Snowbell Tree", "Soap Nut Tree", "Soapberries Trees", "Soursop Tree", "Southern Beech tree", "Southern Magnolia tree", "Spanish Cedar Tree", "Spanish Fir tree", "Spanish Oak tree", "Spindle tree", "Spotted Gum Tree", "Spruce tree", "Star Apple Tree", "State Trees", "Stinking Cedar Tree", "Stinking Mahogany Tree", "Strangler Fig Tree", "Studioseeds Tree", "Sugar Maple tree", "Sugar Pine tree", "Supari Tree", "Swamp Mahogany Tree", "Sweet Acacia Tree", "Sweet Cherry tree", "Sweet Chestnut tree", "Sweet Fern Tree", "Swiss Pine tree", "Sycamore tree", "Tallowwood Tree", "Tamarillo Tree", "Tamarind Tree", "Tea Tree", "Teak Tree", "Techer Plant Tree", "Tekoma Tree", "Tembhurni Tree", "Thabobia Plant", "The Aadoo Tree", "The Aspalove Tree", "The Chatim Tree", "The Indian Laburnum Tree", "The Kanchan Tree", "The Kaner Tree", "The Papari Tree", "The Papaya Tree", "The Pink Poui Tree", "The Poovarasu Tree", "The Secret Life Of Roots", "The Shahtoot Tree", "Tibetan Birch Tree", "Tiger Almond Tree", "Toon Tree", "Toothbrush Tree", "Tropical Birch Tree", "Trumpet Vine Tree", "Tulip Poplar tree", "Tulipwood", "Turkish Pine tree", "Umbrella Pine tree", "Unlocking The Secrets Of The Lucky Bean Tree", "Vanilla Tree", "Velvet Apple Tree", "Vidha Plant Tree", "Walnut Tree", "Wampi Tree", "Water Apple Tree", "Waval Tree", "Weeping Ash tree", "Weeping Elm tree", "Weeping Willow tree", "West Indian Mahogany Tree", "White Acacia Tree", "White Cedar tree", "White Cheesewood Tree", "White Mulberry tree", "White Oak tree", "White Sagewood Tree", "White Silk Cotton Tree", "Wild Almond Tree", "Wild Badam Tree", "Wild Date Palm Tree", "Wild Fig Tree", "Wild Pistachio Tree", "Willow Tree Wonders", "Wine Palm Tree", "Yellow Box Tree", "Yellow Elder Tree", "Yellow Meranti Tree", "Yellow Poplar tree", "Yellow Teak Tree", "Yellowwood Tree", "Yew Tree Wonders", "Yunnan Hackberry Tree", "Zanzibar Mahogany Tree", "Zanzibar Nutmeg Tree", "Ziziphus Tree"
];

// Will add later 
const ngo_socialLinks = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
];


export default function Footer() {
  const [ngo_email, setNgoEmail] = useState("");
  const [ngo_subscribed, setNgoSubscribed] = useState(false);
  const [ngo_selectedTree, setNgoSelectedTree] = useState<string | null>(null);

  const ngo_handleSubscribe = () => {
    if (ngo_email.includes("@")) {
      setNgoSubscribed(true);
      setNgoEmail("");
      setTimeout(() => setNgoSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-gradient-forest text-white/80 relative overflow-hidden">
      {/* Call to action Strip */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="relative -mt-0 mb-0">
          <div className="rounded-t-2xl bg-gradient-gold p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-accent/20">
            <div className="flex flex-col gap-2 text-center md:text-left">
              <h3 className="heading-serif text-2xl md:text-3xl font-bold text-white">
                Ready to plant your first tree?
              </h3>
              <p className="text-white/80 text-sm md:text-base">
                Every tree creates oxygen for one person for a full year.
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/marketplace"
                className="flex-shrink-0 h-12 px-8 flex items-center justify-center rounded-full bg-white text-accent-dark text-base font-bold hover:bg-cream transition-all shadow-lg gap-2"
              >
                <Leaf className="w-4 h-4" />
                Start Planting Now — ₹299
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative mesh gradient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.07]">
        <div className="w-full h-full rounded-full bg-emerald blur-[120px]"></div>
      </div>
      <div className="absolute bottom-40 left-0 w-[300px] h-[300px] opacity-[0.05]">
        <div className="w-full h-full rounded-full bg-accent blur-[100px]"></div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald to-primary-light flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="heading-serif text-lg font-bold text-white">Renukiran</h2>
                <p className="text-[9px] text-white/40 tracking-[0.2em] uppercase font-semibold">Foundation</p>
              </div>
            </div>
            <p className="text-sm text-white/45 leading-relaxed">
              Dedicated to restoring India&apos;s green cover, one tree at a time. 1.2M+ trees planted across 150+ locations.
            </p>
            <div className="flex gap-2 mt-1">
              {ngo_socialLinks.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="size-10 flex items-center justify-center rounded-xl bg-white/5 text-white/40 hover:bg-emerald/20 hover:text-emerald transition-all duration-300 border border-white/5 hover:border-emerald/20"
                  aria-label={s.label}
                >
                  <s.icon className="w-[18px] h-[18px]" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-accent mb-5">Explore</h3>
            <ul className="flex flex-col gap-3 text-sm text-white/45">
              <li><Link className="hover:text-emerald transition-colors inline-flex items-center gap-1 group" href="/mission">About Us <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" /></Link></li>
              <li><Link className="hover:text-emerald transition-colors inline-flex items-center gap-1 group" href="/tracking">Our Projects <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" /></Link></li>
              <li><Link className="hover:text-emerald transition-colors inline-flex items-center gap-1 group" href="/csr">CSR Partnerships <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" /></Link></li>
              <li><Link className="hover:text-emerald transition-colors inline-flex items-center gap-1 group" href="/marketplace">Gift a Tree <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" /></Link></li>
              <li><Link className="hover:text-emerald transition-colors inline-flex items-center gap-1 group" href="/dashboard">My Dashboard <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" /></Link></li>
            </ul>
          </div>

          {/* Contact & Resources */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-accent mb-5">Contact</h3>
            <ul className="flex flex-col gap-3 text-sm text-white/45">
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald/60 flex-shrink-0" /> Rajasthan, India</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-emerald/60 flex-shrink-0" /> +91 98765 43210</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-emerald/60 flex-shrink-0" /> hello@renukiran.org</li>
            </ul>
            
            {/* Trust Badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              {["80G", "FCRA", "12A", "ISO"].map((badge) => (
                <span key={badge} className="text-[10px] font-bold text-emerald/70 bg-emerald/8 px-2.5 py-1 rounded-full border border-emerald/10">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-accent mb-5">Stay Updated</h3>
            <p className="text-sm text-white/35 mb-4">Get updates on our plantations and environmental impact stories.</p>
            <div className="flex flex-col gap-3">
              <input
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/25 focus:border-emerald focus:ring-1 focus:ring-emerald/30 focus:outline-none transition-all"
                placeholder="your@email.com"
                type="email"
                value={ngo_email}
                onChange={(e) => setNgoEmail(e.target.value)}
              />
              <AnimatePresence mode="wait">
                <motion.button
                  key={ngo_subscribed ? "done" : "idle"}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className={`w-full rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                    ngo_subscribed
                      ? "bg-emerald/15 text-emerald border border-emerald/20"
                      : "bg-gradient-to-r from-emerald to-primary-light text-white hover:shadow-lg hover:shadow-emerald/25"
                  }`}
                  type="button"
                  onClick={ngo_handleSubscribe}
                >
                  {ngo_subscribed ? (
                    <><CheckCircle className="w-4 h-4" /> Subscribed!</>
                  ) : (
                    <>Subscribe <ArrowRight className="w-4 h-4" /></>
                  )}
                </motion.button>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/25">© 2026 Renukiran Welfare Foundation. All rights reserved. Section 80G registered.</p>
          <div className="flex gap-6 text-xs text-white/25">
            <a className="hover:text-emerald transition-colors" href="#">Privacy</a>
            <a className="hover:text-emerald transition-colors" href="#">Terms</a>
            <a className="hover:text-emerald transition-colors" href="#">Refund</a>
          </div>
        </div>
      </div>

      {/* SEO Tree List */}
      <div className="bg-dark pt-12 pb-24 px-4 md:px-8 border-t border-white/5 relative z-10 w-full flex flex-col items-center overflow-hidden">
        <h3 className="text-white/80 text-2xl font-bold heading-serif mb-6 text-center">Trees in India</h3>
        <p className="text-white/20 text-[10px] md:text-[11px] leading-[2] text-center max-w-[1400px] mx-auto font-sans tracking-tight">
          <span className="text-white/40">Popular Trees For Plantation: </span>
          {NGO_TREE_LIST.map((tree, index) => (
            <span key={index}>
              <a 
                href={`/marketplace?tree=${encodeURIComponent(tree)}`} 
                onClick={(e) => { e.preventDefault(); setNgoSelectedTree(tree); }}
                className="hover:text-emerald hover:underline transition-colors underline-offset-2 cursor-pointer"
              >
                {tree}
              </a>
              {index < NGO_TREE_LIST.length - 1 ? " , " : ""}
            </span>
          ))}
        </p>
        
        <p className="text-white/20 text-sm mt-12 mb-8 font-medium">© 2026, Renukiran Foundation</p>
        
        {/* Forest Silhouette */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg viewBox="0 0 1440 100" fill="none" className="w-full" preserveAspectRatio="none">
            <path d="M0,100 L0,60 Q30,20 60,60 Q75,30 90,55 Q120,10 150,55 Q165,35 180,50 Q210,5 240,50 Q270,25 300,55 Q315,40 330,50 Q360,15 390,50 Q420,30 450,55 Q465,40 480,50 Q510,0 540,45 Q570,20 600,55 Q615,35 630,50 Q660,10 690,50 Q720,25 750,55 Q765,40 780,50 Q810,5 840,50 Q870,30 900,55 Q915,40 930,50 Q960,15 990,50 Q1020,25 1050,55 Q1065,35 1080,50 Q1110,10 1140,50 Q1170,30 1200,55 Q1215,40 1230,50 Q1260,5 1290,45 Q1320,20 1350,55 Q1380,35 1410,50 L1440,40 L1440,100 Z" fill="#0B3D2E" fillOpacity="0.3"/>
            <path d="M0,100 L0,70 Q40,40 80,65 Q100,50 120,62 Q160,25 200,60 Q220,45 240,58 Q280,20 320,55 Q360,35 400,60 Q420,48 440,56 Q480,15 520,55 Q560,30 600,60 Q620,45 640,56 Q680,20 720,55 Q760,35 800,60 Q820,48 840,56 Q880,22 920,55 Q960,38 1000,60 Q1020,48 1040,56 Q1080,18 1120,55 Q1160,32 1200,60 Q1220,48 1240,56 Q1280,25 1320,55 Q1360,40 1400,58 L1440,50 L1440,100 Z" fill="#1FA971" fillOpacity="0.15"/>
          </svg>
        </div>
      </div>

      <TreeInfoPopup 
        isOpen={!!ngo_selectedTree} 
        treeName={ngo_selectedTree} 
        onClose={() => setNgoSelectedTree(null)} 
      />
    </footer>
  );
}
