import { useState } from "react";
import { getSheetPosition } from "../data/menuSheets";
import FoodImage from "./FoodImage";

function SheetItemImage({ categoryId, index, fallback, alt, className = "" }) {
  const pos = getSheetPosition(categoryId, index);
  const [ready, setReady] = useState(false);

  if (!pos) {
    return (
      <FoodImage src={fallback} alt={alt} className={className} loading="eager" />
    );
  }

  return (
    <div className={`relative overflow-hidden bg-gray-input ${className}`}>
      {!ready && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-input via-white to-gray-input" />
      )}
      <img
        src={pos.sheet}
        alt={alt}
        draggable={false}
        onLoad={() => setReady(true)}
        className={`absolute max-w-none select-none transition-opacity duration-300 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: 1024,
          height: "auto",
          left: -pos.left,
          top: -pos.top,
        }}
      />
    </div>
  );
}

export default SheetItemImage;
