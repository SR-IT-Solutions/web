import { useState, useEffect, useCallback, useRef } from "react";
import { fetchCatalog } from "./catalogApi";

export function useCatalog() {
  const [catalog, setCatalog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const loadCatalog = useCallback(async (forceRefresh = false) => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchCatalog({ forceRefresh });
      if (!isMountedRef.current) return;
      setCatalog(data);
    } catch (err) {
      console.error("Failed to load catalog:", err);
      if (!isMountedRef.current) return;
      setError(err?.message || "Failed to load catalog");
      setCatalog([]);
    } finally {
      if (isMountedRef.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCatalog();
  }, [loadCatalog]);

  return {
    catalog,
    loading,
    error,
    refetch: () => loadCatalog(true),
  };
}
