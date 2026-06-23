import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { MenuProvider } from "./context/MenuContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductModal from "./components/ProductModal";
import CartDrawer from "./components/CartDrawer";
import InstallPwa from "./components/InstallPwa";
import PwaUpdateToast from "./components/PwaUpdateToast";
import Home from "./pages/Home";

const Menu = lazy(() => import("./pages/Menu"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));

function PageLoader() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-orange/20 border-t-orange" />
    </div>
  );
}

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
    <AuthProvider>
      <MenuProvider>
        <CartProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-page">
              <Navbar />
              <ProductModal />
              <CartDrawer />
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/offers" element={<PlaceholderPage title="Offers" />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                </Routes>
              </Suspense>
              <Footer />
              <InstallPwa />
              <PwaUpdateToast />
            </div>
          </BrowserRouter>
        </CartProvider>
      </MenuProvider>
    </AuthProvider>
  );
}

export default App;
