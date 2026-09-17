import { Component } from "react";
import { siteData } from "../data/siteData";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Unhandled render error:", error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="section-shell flex min-h-screen flex-col items-center justify-center py-16 text-center">
        <h1 className="t-section text-ink">Something went wrong</h1>
        <p className="t-body measure mx-auto mt-3">
          The page didn&rsquo;t load properly. Reloading usually fixes it &mdash;
          if it keeps happening, message us and we&rsquo;ll help directly.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Reload the page
          </button>
          <a
            href={siteData.brand.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="btn-ok"
          >
            Message us on WhatsApp
          </a>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
