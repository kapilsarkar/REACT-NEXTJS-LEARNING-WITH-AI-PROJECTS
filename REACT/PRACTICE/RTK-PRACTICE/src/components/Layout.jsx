import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar.jsx";
import Cart from "./Cart.jsx";

export default function Layout() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Sticky Navigation with Cart & Theme triggers */}
      <NavBar onOpenCart={() => setIsCartOpen(true)} />

      {/* Child Routes (Home, Products, etc.) */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Global Cart Drawer */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}