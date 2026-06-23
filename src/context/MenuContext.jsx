import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loadAllMenuData } from "../services/foodApi";

const MenuContext = createContext(null);

const EMPTY = {
  menuCatalog: {},
  menuCategories: [],
  deals: [],
  homeCategories: [],
  menuItems: [],
};

export function MenuProvider({ children }) {
  const [data, setData] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    loadAllMenuData()
      .then((result) => {
        if (active) {
          setData(result);
          setError(null);
        }
      })
      .catch((err) => {
        if (active) setError(err.message || "Failed to load menu");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const value = useMemo(
    () => ({ ...data, loading, error }),
    [data, loading, error]
  );

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function useMenu() {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("useMenu must be used within MenuProvider");
  return ctx;
}
