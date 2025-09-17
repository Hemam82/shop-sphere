// frontend/src/pages/Products.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

type Product = { id: number; name: string; price_cents: number };

export default function Products() {
  const [items, setItems] = useState<Product[]>([]);
  const base = import.meta.env.VITE_API_CATALOG || "http://localhost:5001";

  useEffect(() => {
    axios.get(`${base}/products`).then((res) => setItems(res.data.products || []));
  }, [base]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <header className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-extrabold text-gray-900">ShopSphere</h1>
          <nav className="space-x-4">
            <button className="px-4 py-2 rounded-lg bg-white shadow text-sm">Login</button>
            <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white shadow text-sm">Sign up</button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Featured products</h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => (
            <motion.div
              key={p.id}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-800">{p.name}</h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Price: <span className="font-semibold">₹{(p.price_cents/100).toFixed(2)}</span>
                  </p>
                </div>
                <div className="ml-3">
                  <ShoppingCart className="w-6 h-6 text-indigo-600" />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <button className="px-3 py-1 rounded-md bg-indigo-50 text-indigo-700 text-sm">Add to cart</button>
                <button className="text-sm text-gray-500">Details</button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
