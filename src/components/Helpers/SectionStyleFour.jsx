// components/SectionStyleFour.tsx
"use client";

import React from "react";
import Slider from "react-slick";
import ProductCardStyleOne from "./Cards/ProductCardStyleOne";
import ViewMoreTitle from "./ViewMoreTitle";

/* 
  Product type definition removed because type aliases are not supported in .jsx files.
  If you need type checking, consider renaming this file to .tsx and using TypeScript.
*/

/* Props type removed: If you need type checking, consider renaming this file to .tsx and using TypeScript. */

export default function SectionStyleFour({
  className,
  sectionTitle,
  seeMoreUrl,
  products = [],
}) {
  // map your API fields into the shape ProductCardStyleOne expects
  const items = products.map((item) => ({
    id: item.id,
    title: item.name,
    slug: item.slug,
    image: `${process.env.NEXT_PUBLIC_BASE_URL}${item.thumb_image}`,
    price: item.price,
    offer_price: item.offer_price,
    variants: item.active_variants,
  }));

  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1.2,            // keep your fractional slide
    slidesToScroll: 1,
    centerMode: true,             // ✨ show that 0.2 peek
    centerPadding: "10px",        // controls how much of the next slide is visible
    autoplay: true,
    responsive: [
      {
        breakpoint: 640,          // mobile
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 768,          // small tablet
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1024,         // desktop
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <div className={`section-style-four ${className || ""}`}>
      <ViewMoreTitle categoryTitle={sectionTitle} seeMoreUrl={seeMoreUrl}>
        {/* Mobile slider */}
        <div className="block sm:hidden px-4 pb-5 overflow-visible">
          <Slider {...sliderSettings}>
            {items.map((item) => (
              <div key={item.id} className="px-2">
                <ProductCardStyleOne datas={item} />
              </div>
            ))}
          </Slider>
        </div>

        {/* Tablet/Desktop grid */}
        <div className="hidden sm:grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5 px-4">
          {items.map((item) => (
            <div key={item.id} data-aos="fade-up">
              <ProductCardStyleOne datas={item} />
            </div>
          ))}
        </div>
      </ViewMoreTitle>
    </div>
  );
}
