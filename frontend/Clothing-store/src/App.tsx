import { Route, Routes } from "react-router-dom";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { CategoryPage } from "./pages/CategoryPage";
import { HomePage } from "./pages/HomePage";
import { ProductPage } from "./pages/ProductPage";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/new-in" element={<CategoryPage key="new-in" slug="new-in" />} />
        <Route path="/women" element={<CategoryPage key="women" slug="women" />} />
        <Route path="/men" element={<CategoryPage key="men" slug="men" />} />
        <Route path="/sale" element={<CategoryPage key="sale" slug="sale" />} />
      </Routes>

      <SiteFooter />
    </div>
  );
}

export default App;
