import { useCart } from "../context/CartContext";
import AddButton from "./AddButton";
import SheetItemImage from "./SheetItemImage";
import FoodImage from "./FoodImage";
import { menuCatalog } from "../data/menuCatalog";
import { menuSheets } from "../data/menuSheets";

function InfoIcon() {
  return (
    <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#8b9cb8] text-[10px] font-bold text-white">
      i
    </span>
  );
}

function MenuItemCard({ item, categoryId }) {
  const { openProductModal } = useCart();
  const items = menuCatalog[categoryId] || [];
  const index = items.findIndex((i) => i.id === item.id);
  const useSheet = Boolean(menuSheets[categoryId]);

  const handleAdd = () => {
    openProductModal({
      id: item.id,
      type: "menu-item",
      title: item.title,
      price: item.price,
      image: item.image,
      categoryId,
      sheetIndex: index,
    });
  };

  return (
    <article className="flex overflow-hidden rounded-[14px] border border-[#eceef3] bg-white shadow-[0_2px_12px_rgba(26,35,64,0.06)] transition hover:shadow-[0_4px_18px_rgba(26,35,64,0.1)]">
      <div className="h-[118px] w-[118px] shrink-0 sm:h-[130px] sm:w-[130px]">
        {useSheet && index >= 0 ? (
          <SheetItemImage
            categoryId={categoryId}
            index={index}
            fallback={item.image}
            alt={item.title}
            className="h-full w-full"
          />
        ) : (
          <FoodImage
            src={item.image}
            alt={item.title}
            className="h-full w-full"
            loading="eager"
          />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between p-3.5 sm:p-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-[13px] font-bold uppercase leading-snug tracking-wide text-navy sm:text-[14px]">
              {item.title}
            </h3>
            <InfoIcon />
          </div>
          {item.arabicTitle && (
            <p className="mt-1 text-[12px] font-medium leading-snug text-navy/80">
              {item.arabicTitle}
            </p>
          )}
        </div>

        <div className="mt-auto flex items-end justify-between pt-2">
          <p className="text-[16px] font-bold text-navy sm:text-[17px]">
            {item.price}
          </p>
          <AddButton onClick={handleAdd} />
        </div>
      </div>
    </article>
  );
}

export default MenuItemCard;
