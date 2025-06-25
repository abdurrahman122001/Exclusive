"use client"; // Only if using App Router

import Image from "next/image";

const categories = [
  {
    name: "Sarees",
    image:
      "https://medias.utsavfashion.com/media/catalog/product/cache/1/small_image/295x/040ec09b1e35df139433887a97daa66f/e/m/embroidered-net-scalloped-saree-in-pink-v1-ssea4925.jpg",
  },
  {
    name: "Salwar Kameez",
    image:
      "https://medias.utsavfashion.com/media/catalog/product/cache/1/small_image/295x/040ec09b1e35df139433887a97daa66f/e/m/embroidered-georgette-pakistani-suit-in-black-v1-kbnq6272.jpg",
  },
  {
    name: "Lehenga",
    image:
      "https://medias.utsavfashion.com/media/catalog/product/cache/1/small_image/295x/040ec09b1e35df139433887a97daa66f/e/m/embroidered-net-lehenga-in-dark-fawn-v2-lcc493.jpg",
  },
  {
    name: "Jewellery",
    image:
      "https://medias.utsavfashion.com/media/catalog/product/cache/1/small_image/295x/040ec09b1e35df139433887a97daa66f/k/u/kundan-bridal-set-v1-jvd1585.jpg",
  },
];

export default function MobileCategoryScroll() {
  return (
    <div className="block sm:hidden px-4 py-4 bg-white">
      <div className="flex overflow-x-auto scroll-smooth no-scrollbar">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="flex-shrink-0 basis-1/3 flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-2xl overflow-hidden mx-auto">
              <Image
                src={cat.image}
                alt={cat.name}
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </div>
            <span className="text-xs text-center mt-2">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
