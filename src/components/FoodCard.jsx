import { IoInformationCircleOutline } from "react-icons/io5";
import { useCart } from "../context/CartContext";
import AddButton from "./AddButton";
import FoodImage from "./FoodImage";

function FoodCard({ item }) {
  const { openProductModal } = useCart();

  const handleAdd = () => {
    openProductModal({
      id: item.id,
      type: "menu",
      title: item.title,
      price: item.price,
      image: item.image,
    });
  };

  return (
    <article className="group flex h-full min-h-[380px] flex-col overflow-hidden rounded-[20px] border border-[#eceef3] bg-white shadow-[0_2px_14px_rgba(26,35,64,0.07)] transition hover:-translate-y-0.5 hover:shadow-[0_6px_22px_rgba(26,35,64,0.11)]">
      <div className="relative h-[200px] shrink-0 overflow-hidden">
        <FoodImage
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-3.5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="text-[15px] font-bold leading-snug text-navy">
              {item.title}
            </h3>
            <p className="mt-0.5 text-[12px] font-medium text-gray-muted">
              {item.arabicTitle}
            </p>
          </div>
          <button
            type="button"
            aria-label="More info"
            className="mt-0.5 shrink-0 text-[#8b9cb8] transition hover:text-navy"
          >
            <IoInformationCircleOutline className="h-[22px] w-[22px]" />
          </button>
        </div>

        <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-gray-muted">
          {item.description}
        </p>

        <div className="mt-auto flex items-end justify-between pt-4">
          <p className="text-[18px] font-bold text-navy">{item.price}</p>
          <AddButton onClick={handleAdd} />
        </div>
      </div>
    </article>
  );
}

export default FoodCard;
