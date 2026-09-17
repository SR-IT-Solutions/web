import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./core/components/Layout";
import HomePage from "./modules/home/pages/HomePage";
import ServicesPage from "./modules/services/pages/ServicesPage";
import CatalogPage from "./modules/catalog/pages/CatalogPage";
import ProductDetailPage from "./modules/catalog/pages/ProductDetailPage";
import AboutPage from "./modules/about/pages/AboutPage";
import ContactPage from "./modules/contact/pages/ContactPage";
import NotFoundPage from "./modules/core/pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:productId" element={<ProductDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
