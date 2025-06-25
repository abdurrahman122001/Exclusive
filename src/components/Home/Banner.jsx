import Link from "next/link";
import SimpleSlider from "../Helpers/SliderCom";
import ShopNowBtn from "../Helpers/Buttons/ShopNowBtn";
import { useRef } from "react";

export default function Banner({ className, sliders = [] }) {
  const sliderRef = useRef(null);
  const settings = {
    infinite: true,
    autoplay: true,
    fade: true,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 1025,
        settings: { dots: true },
      },
    ],
  };

  return (
    <div className={`w-full mx-auto max-w-7xl relative ${className || ""}`}>
      <div className="main-wrapper w-full h-full">
        {/* Slider area */}
        <div className="hero-slider-wrapper w-full relative mb-4 xl:mb-0">
          <SimpleSlider settings={settings} selector={sliderRef}>
            {sliders.length > 0 &&
              sliders.map((item, i) => (
                <div
                  key={i}
                  className="item w-full h-[160px] sm:h-[200px] md:h-[260px] xl:h-[350px] relative"
                >
                  <div
                    className="w-full h-full relative md:bg-center flex items-center"
                    style={{
                      backgroundImage: `url(${
                        process.env.NEXT_PUBLIC_BASE_URL + item.image
                      })`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                  >
                    {/* Optional: Dark overlay for readability */}
                    <div className="absolute inset-0 bg-black/40 z-0 rounded-lg" />

                    {/* Banner content */}
                    <div className="relative z-10 w-full flex items-center h-full px-3 sm:px-6 md:px-10 xl:px-16">
                      <div className="w-full md:w-[400px]">
                        <p className="text-[13px] sm:text-[16px] md:text-[20px] text-white font-medium mb-1">
                          {item.title_one}
                        </p>
                        <h1 className="text-[18px] sm:text-[22px] md:text-[32px] text-white font-bold md:leading-[38px] leading-[22px] mb-5">
                          {item.title_two}
                        </h1>
                        <Link
                          href={{
                            pathname: "/single-product",
                            query: { slug: item.product_slug },
                          }}
                          passHref
                        >
                          <ShopNowBtn
                            className="w-[110px] sm:w-[120px] h-[36px] sm:h-[40px] bg-qpurple"
                            textColor="text-white group-hover:text-white"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </SimpleSlider>
        </div>
      </div>
    </div>
  );
}
