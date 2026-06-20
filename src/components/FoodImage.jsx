import { useEffect, useState } from "react";
import { FALLBACK_FOOD } from "../utils/foodImages";

function FoodImage({ src, alt, className = "", loading = "lazy" }) {
  const resolved = src || FALLBACK_FOOD;
  const [imgSrc, setImgSrc] = useState(resolved);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setImgSrc(resolved);
    setLoaded(false);
    setFailed(false);
  }, [resolved]);

  const handleLoad = () => setLoaded(true);

  const handleError = () => {
    if (!failed && imgSrc !== FALLBACK_FOOD) {
      setFailed(true);
      setImgSrc(FALLBACK_FOOD);
      setLoaded(false);
    }
  };

  return (
    <div className={`relative overflow-hidden bg-gray-input ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-input via-white to-gray-input" />
      )}
      <img
        src={imgSrc}
        alt={alt}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        className={`h-full w-full object-cover transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

export default FoodImage;
