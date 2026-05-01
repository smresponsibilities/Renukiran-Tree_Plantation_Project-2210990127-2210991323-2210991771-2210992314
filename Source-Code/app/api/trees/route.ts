import { NextResponse } from "next/server";
import ngo_dbConnect from "../../../lib/mongodb";
import Tree from "../../../models/Tree";

const ngo_seedTrees = [
  { name: "Mango Tree", price: 25, type: "Fruit Bearing", img: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=600&q=80" },
  { name: "Neem Tree", price: 15, type: "Medicinal", img: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=600&q=80" },
  { name: "Banyan Tree", price: 45, type: "Shade Giving", img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80" },
  { name: "Sandalwood", price: 30, type: "Medicinal", img: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600&q=80" },
  { name: "Peepal Tree", price: 40, type: "Shade Giving", img: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=600&q=80" },
  { name: "Papaya Tree", price: 20, type: "Fruit Bearing", img: "https://images.unsplash.com/photo-1596547609652-9cb5d8d736bb?auto=format&fit=crop&w=600&q=80" },
  { name: "Gulmohar", price: 25, type: "Shade Giving", img: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80" },
  { name: "Guava Tree", price: 22, type: "Fruit Bearing", img: "https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?auto=format&fit=crop&w=600&q=80" },
  { name: "Amla Tree", price: 28, type: "Medicinal", img: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80" },
];

// Format seed data consistently
function ngo_formatTree(t: any, index: number) {
  return {
    id: t._id?.toString() || `seed-${index}`,
    name: t.name,
    price: t.price,
    type: t.type,
    img: t.img,
    rating: 4.5,
    reviews: Math.floor(Math.random() * 200) + 50,
  };
}

export async function GET() {
  try {
    await ngo_dbConnect();

    // Auto-seed if database is empty
    const ngo_treeCount = await Tree.countDocuments();
    if (ngo_treeCount === 0) {
      await Tree.insertMany(ngo_seedTrees);
    }

    const ngo_allTrees = await Tree.find({});
    return NextResponse.json(ngo_allTrees.map((t, i) => ngo_formatTree(t, i)));
  } catch {
    // DB unreachable — return hardcoded seed data so marketplace is never empty
    console.warn("[API /trees] Database unreachable, returning seed data");
    return NextResponse.json(ngo_seedTrees.map((t, i) => ngo_formatTree(t, i)));
  }
}
