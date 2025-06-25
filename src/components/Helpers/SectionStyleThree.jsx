"use client";

import ProductCardStyleOne from "./Cards/ProductCardStyleOne";
import ViewMoreTitle from "./ViewMoreTitle";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SectionStyleFour({
  className,
  sectionTitle,
  seeMoreUrl,
  products = [],
}) {
  const rs = products.map((item) => ({
    id: item.id,
    title: item.name,
    slug: item.slug,
    image: process.env.NEXT_PUBLIC_BASE_URL + item.thumb_image,
    price: item.price,
    offer_price: item.offer_price,
    campaingn_product: null,
    review: parseInt(item.averageRating),
    variants: item.active_variants,
  }));

  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1.2,
    slidesToScroll: 1,
    centerMode: false,
  };

  return (
    <div className={`section-style-four ${className || ""}`}>
      <ViewMoreTitle categoryTitle={sectionTitle} seeMoreUrl={seeMoreUrl}>
        <div className="products-section w-full">
          {/* ✅ Mobile Slider */}
          <div className="block sm:hidden px-4">
            <Slider {...sliderSettings}>
              {rs.map((item) => (
                <div key={item.id} className="pr-3">
                  <ProductCardStyleOne datas={item} />
                </div>
              ))}
            </Slider>
          </div>

          {/* ✅ Tablet/Desktop Grid */}
          <div className="hidden sm:grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5">
            {rs.map((item) => (
              <div key={item.id} className="item" data-aos="fade-up">
                <ProductCardStyleOne datas={item} />
              </div>
            ))}
          </div>
        </div>
      </ViewMoreTitle>
    </div>
  );
}
