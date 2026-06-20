import { Link } from "react-router-dom";
import DealCard from "../components/DealCard";
import CategoryCard from "../components/CategoryCard";
import FoodCard from "../components/FoodCard";
import PromoBanner from "../components/PromoBanner";
import WhyChooseUs from "../components/WhyChooseUs";
import { deals } from "../data/deals";
import { categories } from "../data/categories";
import { menuItems } from "../data/menuItems";

function Home() {
  return (
    <main>
      {/* SECTION 1 — Deals Items */}
      <section className="mx-auto max-w-[1320px] px-4 pt-8 md:px-5 md:pt-[30px] lg:px-8">
        <h1 className="mb-6 text-[24px] font-bold text-navy md:text-[26px]">
          Deals Items
        </h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {deals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      </section>

      {/* SECTION 2 — Our Menu Categories */}
      <section className="mx-auto max-w-[1320px] px-4 pt-14 md:px-5 md:pt-16 lg:px-8 lg:pt-[58px]">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-[24px] font-bold text-navy md:text-[26px]">
            Our Menu
          </h2>
          <Link
            to="/menu"
            className="rounded-full bg-orange-pale px-5 py-2 text-sm font-semibold text-orange transition hover:bg-orange-light"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8 lg:gap-5">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* SECTION 3 — Popular Dishes */}
      <section className="mx-auto max-w-[1320px] px-4 pt-14 md:px-5 md:pt-16 lg:px-8 lg:pt-[58px]">
        <h2 className="mb-6 text-[24px] font-bold text-navy md:text-[26px]">
          Popular Dishes
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {menuItems.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* SECTION 4 — Promo Banner */}
      <div className="pt-14 md:pt-16 lg:pt-[58px]">
        <PromoBanner />
      </div>

      {/* SECTION 5 — Why Choose Us */}
      <div className="pt-14 md:pt-16 lg:pt-[58px]">
        <WhyChooseUs />
      </div>
    </main>
  );
}

export default Home;
