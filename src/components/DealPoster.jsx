import daigiPosterRef from "../assets/deals/daigi-poster.png";

function PriceBurst({ badgePrice }) {
  return (
    <div className="absolute left-3 top-3 z-10 flex h-[58px] w-[58px] items-center justify-center">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full drop-shadow-md">
        <polygon
          points="50,0 61,14 78,8 82,25 98,32 90,48 98,64 82,72 78,89 61,84 50,98 39,84 22,89 18,72 2,64 10,48 2,32 18,25 22,8 39,14"
          fill="#f5b800"
          stroke="#e5a800"
          strokeWidth="1"
        />
      </svg>
      <span className="relative z-10 whitespace-pre-line text-center text-[11px] font-extrabold leading-[1.1] text-navy">
        {badgePrice}
      </span>
    </div>
  );
}

function QrPlaceholder() {
  return (
    <div className="absolute bottom-2.5 left-2.5 z-10 h-[42px] w-[42px] overflow-hidden rounded-sm border-2 border-red-600 bg-white p-0.5">
      <div
        className="h-full w-full"
        style={{
          backgroundImage: `
            linear-gradient(45deg, #111 25%, transparent 25%),
            linear-gradient(-45deg, #111 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #111 75%),
            linear-gradient(-45deg, transparent 75%, #111 75%)
          `,
          backgroundSize: "6px 6px",
          backgroundPosition: "0 0, 0 3px, 3px -3px, -3px 0",
        }}
      />
    </div>
  );
}

function DaigiPosterFromRef({ side }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#6b1a1a]">
      <img
        src={daigiPosterRef}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute top-0 h-auto max-w-none select-none"
        style={{
          width: "200%",
          left: side === "left" ? "0%" : "-100%",
        }}
        draggable={false}
      />
    </div>
  );
}

function DaigiPoster({ badgePrice, image }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#6b1a1a]">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 40%, rgba(255,100,50,0.3) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(0,0,0,0.4) 0%, transparent 60%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />

      <p
        className="absolute left-0 right-0 top-3 z-10 text-center text-[15px] text-white drop-shadow-md"
        style={{ fontFamily: "'Pacifico', cursive" }}
      >
        With Rice+Drink
      </p>

      <PriceBurst badgePrice={badgePrice} />

      <div className="absolute inset-0 flex items-center justify-center pt-4">
        <img
          src={image}
          alt=""
          className="h-[88%] w-[92%] object-contain drop-shadow-2xl"
        />
      </div>

      <div className="absolute bottom-6 left-4 z-10 h-[72px] w-[28px] rounded-md bg-gradient-to-b from-[#1e6eb5] to-[#0d4a8a] shadow-lg">
        <span className="flex h-full items-center justify-center text-[7px] font-bold uppercase tracking-tight text-white [writing-mode:vertical-lr] rotate-180">
          Kinza
        </span>
      </div>

      <QrPlaceholder />
    </div>
  );
}

function PlatterPoster({ badgePrice, title, image }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#1a0f0a]">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 40px)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      <PriceBurst badgePrice={badgePrice} />

      <div className="absolute left-0 right-0 top-5 z-10 px-3 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange/90">
          Ghazi Restaurant
        </p>
        <p className="mt-1 text-[13px] font-extrabold uppercase leading-tight tracking-wide text-white drop-shadow-lg">
          {title}
        </p>
      </div>

      <div className="absolute inset-0 flex items-end justify-center pb-1 pt-14">
        <img
          src={image}
          alt=""
          className="h-[78%] w-[95%] object-contain object-bottom drop-shadow-2xl"
        />
      </div>

      <QrPlaceholder />
    </div>
  );
}

function DealPoster({ deal }) {
  if (deal.posterType === "ref") {
    return <DaigiPosterFromRef side={deal.posterSide} />;
  }

  if (deal.posterType === "platter") {
    return (
      <PlatterPoster
        badgePrice={deal.badgePrice}
        title={deal.posterTitle}
        image={deal.image}
      />
    );
  }

  return <DaigiPoster badgePrice={deal.badgePrice} image={deal.image} />;
}

export default DealPoster;
