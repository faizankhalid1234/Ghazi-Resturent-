import SheetItemImage from "./SheetItemImage";
import FoodImage from "./FoodImage";
import { menuSheets } from "../data/menuSheets";

function MenuCategoryStrip({ categories, activeId, onSelect, disabled = false }) {
  return (
    <div className="overflow-x-auto pb-1">
      <div className="flex min-w-max gap-3 md:gap-4">
        {categories.map((cat) => {
          const active = cat.id === activeId;
          const hasSheet = Boolean(menuSheets[cat.id]);

          return (
            <button
              key={cat.id}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(cat.id)}
              className={`flex w-[118px] shrink-0 flex-col items-center rounded-[18px] px-2 py-3 transition md:w-[130px] ${
                disabled ? "cursor-wait opacity-70" : ""
              } ${
                active
                  ? "border-2 border-orange bg-orange-pale shadow-sm scale-[1.02]"
                  : "border border-transparent bg-white shadow-[0_2px_10px_rgba(26,35,64,0.06)] hover:-translate-y-0.5"
              }`}
            >
              <div className="mb-2 h-[72px] w-[72px] overflow-hidden rounded-xl md:h-[80px] md:w-[80px]">
                {hasSheet ? (
                  <SheetItemImage
                    categoryId={cat.id}
                    index={0}
                    fallback={cat.image}
                    alt={cat.title}
                    className="h-full w-full"
                  />
                ) : (
                  <FoodImage
                    src={cat.image}
                    alt={cat.title}
                    className="h-full w-full"
                    loading="eager"
                  />
                )}
              </div>
              <p className="text-center text-[10px] font-bold leading-tight tracking-wide text-navy md:text-[11px]">
                {cat.title}
              </p>
              {cat.arabicTitle && (
                <p className="mt-0.5 text-center text-[9px] text-gray-muted">
                  ({cat.arabicTitle})
                </p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default MenuCategoryStrip;
