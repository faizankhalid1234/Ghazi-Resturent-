import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductModal from "./components/ProductModal";
import Home from "./pages/Home";
import Menu from "./pages/Menu";

function PlaceholderPage({ title }) {
  return (
    <div className="mx-auto max-w-[1320px] px-4 py-20 text-center md:px-5 lg:px-8">
      <h1 className="text-3xl font-bold text-navy">{title}</h1>
      <p className="mt-3 text-gray-muted">Coming soon.</p>
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-page">
          <Navbar />
          <ProductModal />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/offers" element={<PlaceholderPage title="Offers" />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
