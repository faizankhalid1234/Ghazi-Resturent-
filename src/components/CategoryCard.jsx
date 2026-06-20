import { Link } from "react-router-dom";
import FoodImage from "./FoodImage";

function CategoryCard({ category }) {
  return (
    <Link
      to="/menu"
      className="group flex h-[158px] w-full flex-col items-center justify-center rounded-[22px] border border-gray-border bg-white px-3 py-4 shadow-[0_2px_10px_rgba(26,35,64,0.05)] transition hover:-translate-y-[3px] hover:border-orange/20 hover:shadow-[0_8px_20px_rgba(26,35,64,0.1)]"
    >
      <div className="mb-3 h-[92px] w-[92px] overflow-hidden rounded-2xl">
        <FoodImage
          src={category.image}
          alt={category.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
        />
      </div>
      <h3 className="text-center text-[11px] font-bold leading-tight tracking-wide text-navy">
        {category.title}
      </h3>
      <p className="mt-0.5 text-center text-[10px] font-medium text-gray-muted">
        {category.arabicTitle}
      </p>
    </Link>
  );
}

export default CategoryCard;
