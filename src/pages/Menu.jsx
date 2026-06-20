import { useEffect, useState, useRef } from "react";
import { BsGridFill, BsListUl } from "react-icons/bs";
import { GiChickenLeg } from "react-icons/gi";
import { FaLeaf } from "react-icons/fa";
import MenuCategoryStrip from "../components/MenuCategoryStrip";
import MenuItemCard from "../components/MenuItemCard";
import MenuLoader from "../components/MenuLoader";
import { menuCategories, menuCatalog } from "../data/menuCatalog";
import { menuSheets } from "../data/menuSheets";

function Menu() {
  const [activeCategory, setActiveCategory] = useState("ramadan");
  const [displayCategory, setDisplayCategory] = useState("ramadan");
  const [dietFilter, setDietFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [loading, setLoading] = useState(false);
  const [slideIn, setSlideIn] = useState(true);
  const timerRef = useRef(null);

  const category = menuCategories.find((c) => c.id === displayCategory);
  const items = menuCatalog[displayCategory] || [];

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    Object.values(menuSheets).forEach((cfg) => {
      const img = new Image();
      img.src = cfg.sheet;
    });
  }, []);

  useEffect(() => {
    setDietFilter("all");
  }, [displayCategory]);

  const filtered = items.filter((item) => {
    if (dietFilter === "veg") return item.isVeg;
    if (dietFilter === "nonveg") return !item.isVeg;
    return true;
  });

  const sectionTitle = category?.arabicTitle
    ? `${category.title} (${category.arabicTitle})`
    : category?.title;

  const handleCategorySelect = (id) => {
    if (id === activeCategory || loading) return;

    setActiveCategory(id);
    setLoading(true);
    setSlideIn(false);

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setDisplayCategory(id);
      setLoading(false);
      requestAnimationFrame(() => setSlideIn(true));
    }, 480);
  };

  const handleFilterChange = (filter) => {
    setSlideIn(false);
    setTimeout(() => {
      setDietFilter(filter);
      setSlideIn(true);
    }, 200);
  };

  return (
    <main className="mx-auto max-w-[1320px] px-4 pb-12 pt-7 md:px-5 md:pt-8 lg:px-8">
      <MenuCategoryStrip
        categories={menuCategories}
        activeId={activeCategory}
        onSelect={handleCategorySelect}
        disabled={loading}
      />

      <div
        className={`mt-5 flex flex-wrap gap-2.5 transition-opacity duration-300 ${
          loading ? "pointer-events-none opacity-50" : "opacity-100"
        }`}
      >
        <button
          type="button"
          onClick={() => handleFilterChange("nonveg")}
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
            dietFilter === "nonveg"
              ? "bg-navy text-white"
              : "bg-[#eef0f4] text-navy hover:bg-gray-border"
          }`}
        >
          <GiChickenLeg className="h-4 w-4" />
          Non-Veg
        </button>
        <button
          type="button"
          onClick={() => handleFilterChange("veg")}
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
            dietFilter === "veg"
              ? "bg-green-support text-white"
              : "bg-[#eef0f4] text-navy hover:bg-gray-border"
          }`}
        >
          <FaLeaf className="h-4 w-4" />
          Veg
        </button>
        {dietFilter !== "all" && (
          <button
            type="button"
            onClick={() => handleFilterChange("all")}
            className="rounded-full bg-orange-pale px-4 py-2 text-sm font-semibold text-orange"
          >
            Show All
          </button>
        )}
      </div>

      <div className="mt-7 flex items-center justify-between gap-4 border-b-2 border-orange/20 pb-4">
        <h1
          className={`text-[20px] font-extrabold uppercase tracking-wide text-orange transition-all duration-500 md:text-[24px] ${
            slideIn ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
          }`}
        >
          {sectionTitle}
        </h1>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
              viewMode === "list"
                ? "bg-navy text-white"
                : "bg-[#eef0f4] text-gray-muted hover:text-navy"
            }`}
            aria-label="List view"
          >
            <BsListUl className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
              viewMode === "grid"
                ? "bg-navy text-white"
                : "bg-[#eef0f4] text-gray-muted hover:text-navy"
            }`}
            aria-label="Grid view"
          >
            <BsGridFill className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative mt-5 min-h-[280px] overflow-hidden">
        {loading ? (
          <MenuLoader />
        ) : filtered.length > 0 ? (
          <div
            className={`gap-4 transition-all duration-500 ease-out ${
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                : "flex flex-col"
            } ${
              slideIn
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            {filtered.map((item, i) => (
              <div
                key={item.id}
                className="animate-[fadeSlideIn_0.45s_ease-out_both]"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <MenuItemCard item={item} categoryId={displayCategory} />
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-10 text-center text-gray-muted">
            No items found for this filter.
          </p>
        )}
      </div>
    </main>
  );
}

export default Menu;
