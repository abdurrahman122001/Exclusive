"use client";

import { useState, useEffect } from "react";
import Slider from "react-slick";
import ProductCardStyleOne from "./Cards/ProductCardStyleOne";
import LoaderStyleTwo from "./Loaders/LoaderStyleTwo";
import ViewMoreTitle from "./ViewMoreTitle";

export default function SectionStyleOne({
  className,
  sectionTitle,
  seeMoreUrl,
  categories = [],
  products = [],
}) {
  const [selectedId, setId] = useState(
    categories.length > 0 ? parseInt(categories[0].category_id) : null
  );
  const [load, setLoad] = useState(false);

  const cp =
    products.length > 0 &&
    products.map((item) => ({
      id: item.id,
      category_id: item.category_id,
      title: item.name,
      slug: item.slug,
      image: process.env.NEXT_PUBLIC_BASE_URL + item.thumb_image,
      price: item.price,
      offer_price: item.offer_price,
      campaingn_product: null,
      review: parseInt(item.averageRating),
      variants: item.active_variants ? item.active_variants : [],
    }));

  const [filterProducts, setProducts] = useState(
    cp ? cp.filter((item) => item.category_id === selectedId) : []
  );

  const categoryHandler = (id) => {
    setLoad(true);
    setTimeout(() => {
      setId(id);
      setLoad(false);
    }, 500);
  };

  useEffect(() => {
    if (cp) {
      const products = cp.filter(
        (item) => parseInt(item.category_id) === selectedId
      );
      setProducts(products);
    }
  }, [selectedId]);

  const sliderSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      {categories.length > 0 && products.length > 0 && (
        <div
          data-aos="fade-up"
          className={`section-style-one md:py-[60px] py-[30px] bg-qpurplelow/10 ${
            className || ""
          }`}
        >
          <ViewMoreTitle
            categoryHandler={categoryHandler}
            categoryies={categories}
            categoryTitle={sectionTitle}
            seeMoreUrl={seeMoreUrl}
            productsInCategoryIds={cp.map((i) => parseInt(i.category_id))}
          >
            <div className="products-section w-full">
              {load === false ? (
                <Slider {...sliderSettings}>
                  {filterProducts.map((item) => (
                    <div key={item.id} className="px-2">
                      <ProductCardStyleOne datas={item} />
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className="h-[445px] flex justify-center items-center">
                  <LoaderStyleTwo />
                </div>
              )}
            </div>
          </ViewMoreTitle>
        </div>
      )}
    </>
  );
}
