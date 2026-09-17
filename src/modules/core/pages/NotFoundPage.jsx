import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { usePageMeta } from "../../../core/hooks/usePageMeta";

function NotFoundPage() {
  usePageMeta({
    title: "Page not found",
    description: "That page doesn't exist. Browse the catalog or get in touch.",
  });

  return (
    <div className="section-shell py-16 text-center sm:py-24">
      <h1 className="t-display text-ink">Page not found</h1>
      <p className="t-body measure mx-auto mt-4">
        That page doesn&rsquo;t exist, or it may have moved. Try the catalog, or
        message us and we&rsquo;ll point you the right way.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link to="/" className="btn-primary">
          <ArrowLeft size={16} />
          Back to home
        </Link>
        <Link to="/catalog" className="btn-secondary">
          Browse the catalog
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
