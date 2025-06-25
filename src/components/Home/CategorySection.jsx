import React from "react";
import Image from "next/image";
import Link from "next/link";

function CategorySection({ sectionTitle, categories }) {
  // Show only 4 categories
  const visibleCategories = categories.slice(0, 4);

  return (
    <div className="w-full py-10 bg-white mt-10">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 rounded-2xl">
        <h2 className="text-2xl text-center sm:text-3xl font-semibold mb-8 sm:mb-10">
          {sectionTitle}
        </h2>
        {/* Responsive grid: 2 columns on mobile, 4 on md+ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          {visibleCategories.map((item, idx) => (
            <Link
              key={idx}
              href={{
                pathname: "/products",
                query: { category: item.slug },
              }}
              className="w-full rounded-6xl shadow-md overflow-hidden relative group transition-transform duration-300 hover:scale-105"
            >
              <div className="relative w-full h-[200px] md:h-[280px]">
                <Image
                  src={
                    item.image.startsWith("http")
                      ? item.image
                      : process.env.NEXT_PUBLIC_BASE_URL + item.image
                  }
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"          // Make image cover the area
                  objectPosition="top"       // Align image to the top
                  className="transition-transform duration-300 group-hover:scale-105"
                  priority={idx === 0}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
                <span className="absolute bottom-4 left-0 w-full text-center text-white text-sm sm:text-lg font-semibold z-20">
                  {item.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategorySection;
