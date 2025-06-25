import React from "react";
import Link from "next/link";
import ShopNowBtn from "../../Helpers/Buttons/ShopNowBtn";

export default function TwoColumnAds({ bannerOne, bannerTwo }) {
    // Optional: Use your base URL env variable if needed
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

    return (
        <>
            {bannerOne && bannerTwo && (
                <div className="w-full bg-white py-10">
                    <div className="container-x mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Banner One */}
                            <div
                                className="relative md:h-[400px] rounded-2xl overflow-hidden shadow-md group"
                                style={{
                                    backgroundImage: `url(${baseUrl}${bannerOne.image})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center top",
                                }}
                            >
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition duration-300" />
                                <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-10 z-10 text-white">
                                    <p className="text-sm uppercase mb-2 font-medium opacity-90">
                                        {bannerOne.title_one}
                                    </p>
                                    <h2 className="text-2xl md:text-3xl font-semibold leading-snug mb-5 max-w-[90%]">
                                        {bannerOne.title_two}
                                    </h2>
                                    <Link
                                        href={{
                                            pathname: "/products",
                                            query: { category: bannerOne.product_slug },
                                        }}
                                        passHref
                                    >
                                        <a>
                                            <ShopNowBtn
                                                className="w-[128px] h-[40px] bg-white"
                                                textColor="text-qblack group-hover:text-white"
                                            />
                                        </a>
                                    </Link>
                                </div>
                            </div>

                            {/* Banner Two */}
                            <div
                                className="relative h-[400px] md:h-[400px] rounded-2xl overflow-hidden shadow-md group"
                                style={{
                                    backgroundImage: `url(${baseUrl}${bannerTwo.image})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center top",
                                }}
                            >
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition duration-300" />
                                <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-10 z-10 text-white">
                                    <p className="text-sm uppercase mb-2 font-medium opacity-90">
                                        {bannerTwo.title_one}
                                    </p>
                                    <h2 className="text-2xl md:text-3xl font-semibold leading-snug mb-5 max-w-[90%]">
                                        {bannerTwo.title_two}
                                    </h2>
                                    <Link
                                        href={{
                                            pathname: "/products",
                                            query: { category: bannerTwo.product_slug },
                                        }}
                                        passHref
                                    >
                                        <a>
                                            <ShopNowBtn
                                                className="w-[128px] h-[40px] bg-white"
                                                textColor="text-qblack group-hover:text-white"
                                            />
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
