import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const COLUMN_ORDER = [
  { name: "Featured" },
  { name: "Occasion" },
  { name: "Style" },
  { name: "Fabric" },
  { name: "Alternates" },
];

const PLACEHOLDER_CONTENT = [
  ["New Arrivals", "Bestsellers", "Ready to Ship", "Sale"],
  ["Bridal Wear", "Festival Wear", "Party Wear", "Wedding Wear", "All Occasions..."],
  ["Circular Style", "A-Line Lehenga", "Indowestern Lehenga", "All Styles..."],
  ["Art Silk Lehenga", "Net Lehenga", "Georgette Lehenga", "Velvet Lehenga", "Silk Lehenga", "All Fabrics..."],
  ["Gowns", "Abaya Style Suit"]
];

// === CATEGORY BANNER IMAGES (slug -> banners) ===
const CATEGORY_BANNERS = {
  "salwar-kameez": [
    { src: "https://medias.utsavfashion.com/media/wysiwyg/2023/banner/header-menu/menu-category-banners_salwar.jpg", alt: "Salwar Edit", link: "/products?promo=edit" },
    { src: "https://medias.utsavfashion.com/media/wysiwyg/home/2024/1804/fancy-woomen-footwear-menu.jpg", alt: "Shop Fancy Footwear", link: "/products?promo=footwear" }
  ],
  "lehenga": [
    { src: "https://medias.utsavfashion.com/media/wysiwyg/2023/banner/header-menu/menu-category-banners_lehenga.jpg", alt: "Lehenga Edit", link: "/products?promo=edit" },
    { src: "https://medias.utsavfashion.com/media/wysiwyg/2023/banner/header-menu/shop-wedding-wear.jpg", alt: "Shop Wedding Styles", link: "/products?promo=wedding-styles" }
  ],
  "saree": [
    { src: "https://medias.utsavfashion.com/media/wysiwyg/2023/banner/header-menu/menu-category-banners_saree.jpg", alt: "Saree Edit", link: "/products?promo=edit" },
    { src: "https://medias.utsavfashion.com/media/wysiwyg/2023/banner/header-menu/shop-wedding-wear.jpg", alt: "Trending Sarees", link: "/products?promo=trending" }
  ],
  // Add more as needed
};

function getMatchingSubcategory(data, heading) {
  if (!data?.subcategories?.length) return null;
  return data.subcategories.find(
    (sub) => sub.name.toLowerCase().includes(heading.toLowerCase())
  );
}

export default function MegaMenu({ slug }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}api/menu/${slug}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setData(null);
        setLoading(false);
      });
  }, [slug]);

  const getChildren = (heading, colIdx) => {
    if (loading) return [];
    const match = getMatchingSubcategory(data, heading);
    if (match && match.child_categories) {
      return match.child_categories;
    }
    return PLACEHOLDER_CONTENT[colIdx].map((name, idx) => ({
      id: idx + 1,
      name,
      slug: name.toLowerCase().replace(/ /g, "-")
    }));
  };

  // Column count for lines
  const columnCount = COLUMN_ORDER.length;

  return (
    <div
      className="absolute left-1/2 top-full z-50"
      style={{
        transform: "translateX(-50%)",
        width: "1600px",
        minWidth: "1600px",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: "98vw"
      }}
    >
      <div className="flex bg-white rounded-2xl shadow-2xl border border-gray-100 py-10 px-10 gap-8 min-h-[355px]">
        {/* Columns */}
        <div className="flex flex-1">
          {COLUMN_ORDER.map((col, colIdx) => (
            <div
              key={col.name}
              className={`
                min-w-[170px] max-w-[230px] px-3
                ${colIdx !== columnCount - 1 ? "border-r border-gray-200" : ""}
                flex flex-col
              `}
              style={{ minHeight: "290px" }}
            >
              <h4 className="font-semibold text-[17px] mb-2 text-gray-900 border-b border-gray-200 pb-2">
                {col.name}
              </h4>
              <ul className="space-y-1 mt-2">
                {loading ? (
                  <li className="text-gray-400 italic">Loading...</li>
                ) : (
                  getChildren(col.name, colIdx).map((child) => (
                    <li key={child.id}>
                      <a
                        href={`/products?category=${slug}&subcategory=${col.name.toLowerCase()}&child=${child.slug}`}
                        className={`block text-gray-700 hover:text-purple-700 transition font-medium ${
                          child.slug?.includes("all-") ? "text-red-600 font-semibold" : ""
                        }`}
                      >
                        {child.name}
                      </a>
                    </li>
                  ))
                )}
              </ul>
            </div>
          ))}
        </div>
        {/* Banners / Images on right */}
        <div className="flex flex-col gap-5 min-w-[260px] w-[260px]">
          {(CATEGORY_BANNERS[slug] || []).map((banner, idx) => (
            <a href={banner.link} key={idx}>
              <img
                src={banner.src}
                onError={e => e.target.src = "https://via.placeholder.com/260x95?text=Banner"}
                alt={banner.alt}
                className="rounded-lg object-cover w-full h-[95px] shadow"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
