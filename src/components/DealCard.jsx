import { useCart } from "../context/CartContext";
import AddButton from "./AddButton";
import DealPoster from "./DealPoster";

function InfoIcon() {
  return (
    <button
      type="button"
      aria-label="More info"
      className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[#8b9cb8] text-[11px] font-bold text-white transition hover:bg-navy-light"
    >
      i
    </button>
  );
}

function DealCard({ deal }) {
  const { openProductModal } = useCart();

  const handleAdd = () => {
    openProductModal({
      id: deal.id,
      type: "deal",
      title: deal.title,
      price: deal.price,
      image: deal.image,
    });
  };

  return (
    <article className="flex h-full min-h-[380px] flex-col overflow-hidden rounded-[20px] border border-[#eceef3] bg-white shadow-[0_2px_14px_rgba(26,35,64,0.07)] transition hover:-translate-y-0.5 hover:shadow-[0_6px_22px_rgba(26,35,64,0.11)]">
      <div className="relative h-[228px] shrink-0 overflow-hidden">
        <DealPoster deal={deal} />
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-3.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="flex-1 text-[15px] font-bold leading-[1.35] text-navy">
            {deal.title}
          </h3>
          <InfoIcon />
        </div>

        <div className="mt-auto flex items-end justify-between pt-5">
          <p className="text-[18px] font-bold text-navy">{deal.price}</p>
          <AddButton onClick={handleAdd} />
        </div>
      </div>
    </article>
  );
}

export default DealCard;
