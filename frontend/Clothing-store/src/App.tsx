import { Link, Route, Routes } from "react-router-dom";
import { BagDrawer } from "./components/BagDrawer";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { CategoryPage } from "./pages/CategoryPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { ProductPage } from "./pages/ProductPage";
import { RegisterPage } from "./pages/RegisterPage";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/new-in" element={<CategoryPage key="new-in" slug="new-in" />} />
            <Route path="/women" element={<CategoryPage key="women" slug="women" />} />
            <Route path="/men" element={<CategoryPage key="men" slug="men" />} />
            <Route path="/sale" element={<CategoryPage key="sale" slug="sale" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="*"
              element={
                <main className="container-narrow flex flex-col gap-4 py-16">
                  <h1>Page not found</h1>
                  <p className="text-sm text-ink-soft">
                    The page you're looking for doesn't exist.
                  </p>
                  <Link to="/" className="link">
                    Back to home
                  </Link>
                </main>
              }
            />
          </Routes>

          <SiteFooter />
        </div>
        <BagDrawer />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
