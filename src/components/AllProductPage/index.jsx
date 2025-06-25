// import { useEffect, useState } from "react";
// import axios from "axios";
// import Image from "next/image";
// import Link from "next/link";
// import ProductCardStyleOne from "../Helpers/Cards/ProductCardStyleOne";
// import DataIteration from "../Helpers/DataIteration";
// import Star from "../Helpers/icons/Star";
// import Layout from "../Partials/Layout";
// import ProductsFilter from "./ProductsFilter";
// import OneColumnAdsTwo from "../Home/ProductAds/OneColumnAdsTwo";
// import ProductCardRowStyleOne from "../Helpers/Cards/ProductCardRowStyleOne";
// import languageModel from "../../../utils/languageModel";
// import LoaderStyleOne from "../Helpers/Loaders/LoaderStyleOne";
// import { useRouter } from "next/router";

// export default function AllProductPage({ response, sellerInfo }) {
//   const router = useRouter();

//   // Data state
//   const [mainCats, setMainCats] = useState([]);
//   const [subCats, setSubCats] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [variantsFilter, setVariantsFilter] = useState([]);
//   const [volume, setVolume] = useState([0, 0]);
//   const [selectedMainCat, setSelectedMainCat] = useState(null);
//   const [selectedChildCats, setSelectedChildCats] = useState([]);
//   const [selectedBrands, setSelectedBrands] = useState([]);
//   const [selectedVariants, setSelectedVariants] = useState([]);
//   const [cardViewStyle, setCardViewStyle] = useState("col");
//   const [filterToggle, setToggle] = useState(false);
//   const [langCntnt, setLangCntnt] = useState(null);
//   const [productsData, setProductsData] = useState([]);
//   const [nxtPage, setNxtPage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [pageLoading, setPageLoading] = useState(true);

//   const categorySlug = router.query.category;

//   // 1. Load initial data
//   useEffect(() => {
//     setLangCntnt(languageModel());
//     setMainCats(response.data?.main_categories || []);
//     setSubCats(response.data?.sub_categories || []);
//     setBrands(
//       (response.data?.brands || []).map((b) => ({ ...b, selected: false }))
//     );
//     setVariantsFilter(
//       (response.data?.activeVariants || []).map((variant) => ({
//         ...variant,
//         active_variant_items:
//           variant.active_variant_items?.map((item) => ({
//             ...item,
//             selected: false,
//           })) || [],
//       }))
//     );
//     const prices = response.data?.products?.data?.map((item) =>
//       parseInt(item.price)
//     );
//     if (prices && prices.length > 0) {
//       setVolume([Math.min(...prices), Math.max(...prices)]);
//     }
//     setProductsData(response.data?.products?.data || []);
//     setNxtPage(response.data?.products?.next_page_url || null);
//   }, [response.data]);

//   // 2. Main category from slug
//   useEffect(() => {
//     if (!mainCats.length || !categorySlug) return;
//     const found = mainCats.find((c) => c.slug === categorySlug);
//     setSelectedMainCat(found ? found.id : null);
//     setSelectedChildCats([]);
//   }, [mainCats, categorySlug]);

//   // 3. Loader
//   useEffect(() => {
//     if (!mainCats.length) {
//       setPageLoading(true);
//       return;
//     }
//     if (categorySlug && !selectedMainCat) {
//       setPageLoading(true);
//       return;
//     }
//     setPageLoading(false);
//   }, [mainCats, selectedMainCat, categorySlug]);

//   // 4. API fetch - fixed child category filtering
//   useEffect(() => {
//     if (
//       (categorySlug && !selectedMainCat && mainCats.length) ||
//       !selectedMainCat
//     ) {
//       setProductsData([]);
//       setNxtPage(null);
//       return;
//     }

//     let query = `main_category_id=${selectedMainCat}`;
    
//     // Only add child category filter if child categories are selected
//     if (selectedChildCats.length > 0) {
//       query += `&child_category_only=true`; // Add this flag to backend
//       selectedChildCats.forEach((id) => (query += `&child_category_ids[]=${id}`));
//     }
    
//     selectedBrands.forEach((id) => (query += `&brands[]=${id}`));
//     selectedVariants.forEach(
//       (name) => (query += `&variantItems[]=${encodeURIComponent(name)}`)
//     );
    
//     if (volume[0] && volume[1]) {
//       query += `&min_price=${volume[0]}&max_price=${volume[1]}`;
//     }
    
//     if (sellerInfo) query += `&shop_name=${sellerInfo.seller.slug}`;

//     setPageLoading(true);
//     axios
//       .get(`${process.env.NEXT_PUBLIC_BASE_URL}api/product?${query}`)
//       .then((res) => {
//         setProductsData(res.data.products.data || []);
//         setNxtPage(res.data.products.next_page_url || null);
//         // Update variantsFilter with new available variants
//         if (res.data.activeVariants) {
//           setVariantsFilter(
//             res.data.activeVariants.map((variant) => ({
//               ...variant,
//               active_variant_items:
//                 variant.active_variant_items?.map((item) => ({
//                   ...item,
//                   selected: selectedVariants.includes(item.name),
//                 })) || [],
//             }))
//           );
//         }
//         setPageLoading(false);
//       })
//       .catch(() => {
//         setProductsData(response.data.products.data);
//         setNxtPage(response.data.products.next_page_url);
//         setPageLoading(false);
//       });
//   }, [
//     selectedMainCat,
//     selectedChildCats,
//     selectedBrands,
//     selectedVariants,
//     volume,
//     response.data,
//     sellerInfo,
//     mainCats,
//     categorySlug,
//   ]);

//   // --- Handlers ---
//   const handleMainCat = (mainId) => {
//     setSelectedMainCat(mainId);
//     setSelectedChildCats([]);
//   };
  
//   const handleChildCat = (childId) => {
//     setSelectedChildCats((prev) =>
//       prev.includes(childId)
//         ? prev.filter((x) => x !== childId)
//         : [...prev, childId]
//     );
//   };
  
//   const handleBrand = (e) => {
//     const { name } = e.target;
//     setBrands((prev) =>
//       prev.map((item) =>
//         item.id == name ? { ...item, selected: !item.selected } : item
//       )
//     );
//     setSelectedBrands((prev) =>
//       prev.includes(name) ? prev.filter((x) => x !== name) : [...prev, name]
//     );
//   };
  
//   const handleVariant = (e) => {
//     const { name } = e.target;
//     setVariantsFilter((prev) =>
//       prev.map((variant) => ({
//         ...variant,
//         active_variant_items: variant.active_variant_items.map((item) =>
//           item.name === name
//             ? { ...item, selected: !item.selected }
//             : item
//         ),
//       }))
//     );
//     setSelectedVariants((prev) =>
//       prev.includes(name) ? prev.filter((x) => x !== name) : [...prev, name]
//     );
//   };
  
//   const handlePrice = (range) => setVolume(range);

//   // Next page (pagination)
//   const nextPageHandler = async () => {
//     setLoading(true);
//     if (nxtPage) {
//       await axios.get(nxtPage).then((res) => {
//         setLoading(false);
//         if (res.data?.products?.data?.length) {
//           setProductsData((prev) => [...prev, ...res.data.products.data]);
//           setNxtPage(res.data.products.next_page_url);
//         }
//       }).catch(() => setLoading(false));
//     } else setLoading(false);
//   };

//   const products =
//     productsData &&
//     productsData.length > 0 &&
//     productsData.map((item) => ({
//       id: item.id,
//       title: item.name,
//       slug: item.slug,
//       image: process.env.NEXT_PUBLIC_BASE_URL + item.thumb_image,
//       price: item.price,
//       offer_price: item.offer_price,
//       campaingn_product: null,
//       review: parseInt(item.averageRating || "0"),
//       variants: item.active_variants ? item.active_variants : [],
//     }));

//   // ----------- Breadcrumbs (inline) -------------
//   const selectedMainCatObj = mainCats.find((c) => c.id === selectedMainCat);
//   const selectedSubCats = subCats.filter(
//     (sc) => sc.category_id === selectedMainCat
//   );
//   const selectedChildCatObjs = selectedSubCats
//     .flatMap((sub) =>
//       (sub.child_categories || [])
//         .filter((child) => selectedChildCats.includes(child.id))
//         .map((child) => ({
//           subName: sub.name,
//           childName: child.name,
//         }))
//     );

//   if (pageLoading) {
//     return (
//       <div className="w-full h-screen flex justify-center items-center bg-white z-[999] fixed left-0 top-0">
//         <LoaderStyleOne />
//       </div>
//     );
//   }

//   return (
//     <Layout childrenClasses="pt-0 pb-0">
//       <div className="products-page-wrapper w-full bg-white pt-[60px] pb-[114px]">
//         <div className="container-x mx-auto">
//           {/* ---- BREADCRUMB ---- */}
//           <div
//             className="py-6 flex justify-center items-center relative mb-20"
//             style={{
//               background: "url('/images/banner.jpg') center center / cover no-repeat",
//               borderRadius: "12px",
//               minHeight: 90,
//               overflow: "hidden",
//             }}
//           >
//             {/* Black overlay */}
//             <div
//               className="absolute inset-0"
//               style={{
//                 background: "rgba(0,0,0,0.45)",
//                 borderRadius: "12px",
//                 zIndex: 1,
//               }}
//             />
//             {/* Breadcrumb content */}
//             <nav
//               className="text-sm flex flex-wrap items-center space-x-1 bg-white/80 px-4 py-2 rounded shadow relative z-10"
//               style={{ backdropFilter: "blur(2px)" }}
//             >
//               <span
//                 className="text-qpurple cursor-pointer hover:underline"
//                 onClick={() => router.push('/')}
//               >
//                 Home
//               </span>
//               <span>/</span>
//               {selectedMainCatObj && (
//                 <>
//                   <span className="text-qpurple font-semibold">
//                     {selectedMainCatObj.name}
//                   </span>
//                   {selectedChildCatObjs.length > 0 && (
//                     <>
//                       <span>/</span>
//                       <span>
//                         {selectedChildCatObjs.map((obj, idx) => (
//                           <span key={obj.childName}>
//                             <span className="text-qpurple">{obj.subName}</span>
//                             <span className="text-qblack">: </span>
//                             <span className="text-qblack">{obj.childName}</span>
//                             {idx < selectedChildCatObjs.length - 1 && (
//                               <span className="mx-1">, </span>
//                             )}
//                           </span>
//                         ))}
//                       </span>
//                     </>
//                   )}
//                 </>
//               )}
//             </nav>
//           </div>
//           {/* ---- END BREADCRUMB ---- */}

//           <div className="w-full xl:flex xl:space-x-[30px]">
//             <div className="xl:w-[270px]">
//               <ProductsFilter
//                 mainCategories={mainCats}
//                 subCategories={subCats}
//                 selectedMainCat={selectedMainCat}
//                 selectedChildCats={selectedChildCats}
//                 onSelectMainCat={handleMainCat}
//                 onSelectChildCat={handleChildCat}
//                 brands={brands}
//                 brandsHandler={handleBrand}
//                 volume={volume}
//                 volumeHandler={handlePrice}
//                 variantsFilter={variantsFilter}
//                 varientHandler={handleVariant}
//                 priceMax={response.data && Math.max(...response.data.products.data.map(item => parseInt(item.price)))}
//                 priceMin={response.data && Math.min(...response.data.products.data.map(item => parseInt(item.price)))}
//                 filterToggle={filterToggle}
//                 filterToggleHandler={() => setToggle(!filterToggle)}
//                 className="mb-[30px]"
//               />
//               {/* ---- Optional Sidebar Banner ---- */}
//               {response.data && response.data.shopPageSidebarBanner && parseInt(response.data.shopPageSidebarBanner.status) === 1 && (
//                 <div
//                   style={{
//                     backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL + response.data.shopPageSidebarBanner.image})`,
//                     backgroundSize: `cover`,
//                     backgroundRepeat: `no-repeat`,
//                   }}
//                   className="w-full hidden py-[35px] pl-[40px] group xl:block h-[295px] relative rounded"
//                 >
//                   <div className="flex flex-col justify-between w-full h-full">
//                     <div>
//                       <div className="mb-[10px]">
//                         <span className="text-qblack uppercase text-xs font-semibold">
//                           {response.data.shopPageSidebarBanner.title_one}
//                         </span>
//                       </div>
//                       <div className="mb-[30px]">
//                         <h1 className="w-[162px] text-[24px] leading-[30px] text-qblack font-semibold">
//                           {response.data.shopPageSidebarBanner.title_two}
//                         </h1>
//                       </div>
//                     </div>
//                     <div className="w-[90px]">
//                       <Link
//                         href={{
//                           pathname: "/products",
//                           query: {
//                             category: response.data.shopPageSidebarBanner.product_slug,
//                           },
//                         }}
//                         passHref
//                       >
//                         <a rel="noopener noreferrer">
//                           <div className="cursor-pointer w-full relative">
//                             <div className="inline-flex  space-x-1.5 items-center relative z-20">
//                               <span className="text-sm text-qblack font-medium leading-[30px]">
//                                 {langCntnt && langCntnt.Shop_Now}
//                               </span>
//                               <span className="leading-[30px]">
//                                 <svg
//                                   width="7"
//                                   height="11"
//                                   viewBox="0 0 7 11"
//                                   fill="none"
//                                   className={`fill-current`}
//                                   xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                   <rect
//                                     x="2.08984"
//                                     y="0.636719"
//                                     width="6.94219"
//                                     height="1.54271"
//                                     transform="rotate(45 2.08984 0.636719)"
//                                   />
//                                   <rect
//                                     x="7"
//                                     y="5.54492"
//                                     width="6.94219"
//                                     height="1.54271"
//                                     transform="rotate(135 7 5.54492)"
//                                   />
//                                 </svg>
//                               </span>
//                             </div>
//                             <div className="w-[82px] transition-all duration-300 ease-in-out group-hover:h-4 h-[2px] bg-qyellow absolute left-0 bottom-0 z-10"></div>
//                           </div>
//                         </a>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//             <div className="flex-1">
//               {products && products.length > 0 ? (
//                 <div className="w-full">
//                   <div className={cardViewStyle === "col"
//                     ? "grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1  xl:gap-[30px] gap-5 mb-[40px]"
//                     : "grid lg:grid-cols-2 grid-cols-1  xl:gap-[30px] gap-5 mb-[40px]"
//                   }>
//                     <DataIteration
//                       datas={products}
//                       startLength={0}
//                       endLength={products.length}
//                     >
//                       {({ datas }) => (
//                         <div data-aos="fade-up" key={datas.id}>
//                           {cardViewStyle === "col" ? (
//                             <ProductCardStyleOne datas={datas} />
//                           ) : (
//                             <ProductCardRowStyleOne datas={datas} />
//                           )}
//                         </div>
//                       )}
//                     </DataIteration>
//                   </div>
//                   {response.data && response.data.shopPageCenterBanner && parseInt(response.data.shopPageCenterBanner.status) === 1 && (
//                     <div className="w-full relative text-qblack mb-[40px]">
//                       <OneColumnAdsTwo data={response.data.shopPageCenterBanner} />
//                     </div>
//                   )}
//                   {nxtPage && nxtPage !== "null" && (
//                     <div className="flex justify-center">
//                       <button
//                         onClick={nextPageHandler}
//                         type="button"
//                         className="w-[180px] h-[54px] bg-qpurple rounded mt-10"
//                       >
//                         <div className="flex justify-center w-full h-full items-center group rounded relative transition-all duration-300 ease-in-out overflow-hidden cursor-pointer">
//                           <div className="flex items-center transition-all duration-300 ease-in-out relative z-10  text-white">
//                             <span className="text-sm font-600 tracking-wide leading-7 mr-2">
//                               {langCntnt && langCntnt.Show_more}...
//                             </span>
//                             {loading && (
//                               <span className="w-5 " style={{ transform: "scale(0.3)" }}>
//                                 <LoaderStyleOne />
//                               </span>
//                             )}
//                           </div>
//                           <div className="w-full h-full bg-black absolute top-0 left-0 right-0 bottom-0 transform scale-x-0 group-hover:scale-x-100 origin-[center_left] group-hover:origin-[center_right]"></div>
//                         </div>
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <div className="mt-5 flex flex-col items-center">
//                   <div className="w-[200px] h-[200px] relative">
//                     <Image
//                       layout="fill"
//                       objectFit="scale-down"
//                       src="/assets/images/search-not-found.png"
//                       alt="not found"
//                     />
//                   </div>
//                   <div className="flex justify-center items-center mt-10">
//                     <p className="text-2xl font-bold text-tblack">
//                       Product Not Found
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }import { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import ProductCardStyleOne from "../Helpers/Cards/ProductCardStyleOne";
import DataIteration from "../Helpers/DataIteration";
import Layout from "../Partials/Layout";
import ProductsFilter from "./ProductsFilter";
import OneColumnAdsTwo from "../Home/ProductAds/OneColumnAdsTwo";
import ProductCardRowStyleOne from "../Helpers/Cards/ProductCardRowStyleOne";
import languageModel from "../../../utils/languageModel";
import LoaderStyleOne from "../Helpers/Loaders/LoaderStyleOne";
import { useRouter } from "next/router";

export default function AllProductPage({ response, sellerInfo }) {
  const router = useRouter();

  // Data state
  const [mainCats, setMainCats] = useState([]);
  const [subCats, setSubCats] = useState([]);
  const [brands, setBrands] = useState([]);
  const [variantsFilter, setVariantsFilter] = useState([]);
  const [volume, setVolume] = useState([0, 0]);
  const [selectedMainCat, setSelectedMainCat] = useState(null);
  const [selectedChildCats, setSelectedChildCats] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const [cardViewStyle, setCardViewStyle] = useState("col");
  const [filterToggle, setToggle] = useState(false);
  const [langCntnt, setLangCntnt] = useState(null);
  const [productsData, setProductsData] = useState([]);
  const [nxtPage, setNxtPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);

  const categorySlug = router.query.category;

  // 1. Load initial data
  useEffect(() => {
    setLangCntnt(languageModel());
    setMainCats(response.data?.main_categories || []);
    setSubCats(response.data?.sub_categories || []);
    setBrands(
      (response.data?.brands || []).map((b) => ({ ...b, selected: false }))
    );
    setVariantsFilter(
      (response.data?.activeVariants || []).map((variant) => ({
        ...variant,
        active_variant_items:
          variant.active_variant_items?.map((item) => ({
            ...item,
            selected: false,
          })) || [],
      }))
    );
    const prices = response.data?.products?.data?.map((item) =>
      parseInt(item.price)
    );
    if (prices && prices.length > 0) {
      setVolume([Math.min(...prices), Math.max(...prices)]);
    }
    setProductsData(response.data?.products?.data || []);
    setNxtPage(response.data?.products?.next_page_url || null);
    setTotalProducts(response.data?.products?.total || 0);
  }, [response.data]);

  // 2. Main category from slug
  useEffect(() => {
    if (!mainCats.length || !categorySlug) return;
    const found = mainCats.find((c) => c.slug === categorySlug);
    setSelectedMainCat(found ? found.id : null);
    setSelectedChildCats([]);
  }, [mainCats, categorySlug]);

  // 3. Loader
  useEffect(() => {
    if (!mainCats.length) {
      setPageLoading(true);
      return;
    }
    if (categorySlug && !selectedMainCat) {
      setPageLoading(true);
      return;
    }
    setPageLoading(false);
  }, [mainCats, selectedMainCat, categorySlug]);

  // 4. API fetch - fixed child category filtering
  useEffect(() => {
    if (
      (categorySlug && !selectedMainCat && mainCats.length) ||
      !selectedMainCat
    ) {
      setProductsData([]);
      setNxtPage(null);
      return;
    }

    let query = `main_category_id=${selectedMainCat}`;
    
    // Only add child category filter if child categories are selected
    if (selectedChildCats.length > 0) {
      query += `&child_category_only=true`;
      selectedChildCats.forEach((id) => (query += `&child_category_ids[]=${id}`));
    }
    
    selectedBrands.forEach((id) => (query += `&brands[]=${id}`));
    selectedVariants.forEach(
      (name) => (query += `&variantItems[]=${encodeURIComponent(name)}`)
    );
    
    if (volume[0] && volume[1]) {
      query += `&min_price=${volume[0]}&max_price=${volume[1]}`;
    }
    
    if (selectedDiscounts.length > 0) {
      query += `&discounts[]=${selectedDiscounts.join(',')}`;
    }
    
    if (sellerInfo) query += `&shop_name=${sellerInfo.seller.slug}`;

    setPageLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}api/product?${query}`)
      .then((res) => {
        setProductsData(res.data.products.data || []);
        setNxtPage(res.data.products.next_page_url || null);
        setTotalProducts(res.data.products.total || 0);
        if (res.data.activeVariants) {
          setVariantsFilter(
            res.data.activeVariants.map((variant) => ({
              ...variant,
              active_variant_items:
                variant.active_variant_items?.map((item) => ({
                  ...item,
                  selected: selectedVariants.includes(item.name),
                })) || [],
            }))
          );
        }
        setPageLoading(false);
      })
      .catch(() => {
        setProductsData(response.data.products.data);
        setNxtPage(response.data.products.next_page_url);
        setTotalProducts(response.data.products.total || 0);
        setPageLoading(false);
      });
  }, [
    selectedMainCat,
    selectedChildCats,
    selectedBrands,
    selectedVariants,
    selectedDiscounts,
    volume,
    response.data,
    sellerInfo,
    mainCats,
    categorySlug,
  ]);

  // --- Handlers ---
const handleMainCat = (mainId) => {
  // Reset all filters
  setSelectedMainCat(mainId);
  setSelectedChildCats([]);
  setSelectedBrands([]);
  setSelectedVariants([]);
  setSelectedDiscounts([]);
  
  // Reset brand checkboxes
  setBrands(prev => prev.map(brand => ({ ...brand, selected: false })));
  
  // Reset all variant checkboxes (including colors)
  setVariantsFilter(prev => 
    prev.map(variant => ({
      ...variant,
      active_variant_items: variant.active_variant_items.map(item => ({
        ...item,
        selected: false
      }))
    }))
  );
  
  // Reset price range to default
  const prices = response.data?.products?.data?.map(item => parseInt(item.price));
  if (prices && prices.length > 0) {
    setVolume([Math.min(...prices), Math.max(...prices)]);
  }
  
  // Force a refresh of the variants data by making an API call
  axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}api/product?main_category_id=${mainId}`)
    .then(res => {
      if (res.data.activeVariants) {
        setVariantsFilter(
          res.data.activeVariants.map(variant => ({
            ...variant,
            active_variant_items: variant.active_variant_items?.map(item => ({
              ...item,
              selected: false
            })) || []
          }))
        );
      }
    })
    .catch(err => {
      console.error("Error fetching variants:", err);
    });
};
  
  const handleChildCat = (childId) => {
    setSelectedChildCats((prev) =>
      prev.includes(childId)
        ? prev.filter((x) => x !== childId)
        : [...prev, childId]
    );
  };
  
  const handleBrand = (e) => {
    const { name } = e.target;
    setBrands((prev) =>
      prev.map((item) =>
        item.id == name ? { ...item, selected: !item.selected } : item
      )
    );
    setSelectedBrands((prev) =>
      prev.includes(name) ? prev.filter((x) => x !== name) : [...prev, name]
    );
  };
  
  const handleVariant = (e) => {
    const { name } = e.target;
    setVariantsFilter((prev) =>
      prev.map((variant) => ({
        ...variant,
        active_variant_items: variant.active_variant_items.map((item) =>
          item.name === name
            ? { ...item, selected: !item.selected }
            : item
        ),
      }))
    );
    setSelectedVariants((prev) =>
      prev.includes(name) ? prev.filter((x) => x !== name) : [...prev, name]
    );
  };
  
  const handlePrice = (range) => setVolume(range);

  const handleDiscount = (discountId) => {
    setSelectedDiscounts((prev) =>
      prev.includes(discountId)
        ? prev.filter((x) => x !== discountId)
        : [...prev, discountId]
    );
  };

  // Next page (pagination)
  const nextPageHandler = async () => {
    setLoading(true);
    if (nxtPage) {
      await axios.get(nxtPage).then((res) => {
        setLoading(false);
        if (res.data?.products?.data?.length) {
          setProductsData((prev) => [...prev, ...res.data.products.data]);
          setNxtPage(res.data.products.next_page_url);
        }
      }).catch(() => setLoading(false));
    } else setLoading(false);
  };

  const products =
    productsData &&
    productsData.length > 0 &&
    productsData.map((item) => ({
      id: item.id,
      title: item.name,
      slug: item.slug,
      image: process.env.NEXT_PUBLIC_BASE_URL + item.thumb_image,
      price: item.price,
      offer_price: item.offer_price,
      campaingn_product: null,
      review: parseInt(item.averageRating || "0"),
      variants: item.active_variants ? item.active_variants : [],
    }));

  // Breadcrumbs
  const selectedMainCatObj = mainCats.find((c) => c.id === selectedMainCat);
  const selectedSubCats = subCats.filter(
    (sc) => sc.category_id === selectedMainCat
  );
  const selectedChildCatObjs = selectedSubCats
    .flatMap((sub) =>
      (sub.child_categories || [])
        .filter((child) => selectedChildCats.includes(child.id))
        .map((child) => ({
          subName: sub.name,
          childName: child.name,
        }))
    );

  if (pageLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-white z-[999] fixed left-0 top-0">
        <LoaderStyleOne />
      </div>
    );
  }

  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="products-page-wrapper w-full bg-white pt-[60px] pb-[114px]">
        <div className="container-x mx-auto">
          {/* Breadcrumb */}
          <div className="py-6 flex justify-center items-center relative mb-20 bg-cover bg-center rounded-lg overflow-hidden min-h-[90px]" style={{ backgroundImage: "url('/images/banner.jpg')" }}>
            <div className="absolute inset-0 bg-black/45 rounded-lg z-[1]" />
            <nav className="text-sm flex flex-wrap items-center space-x-1 bg-white/80 px-4 py-2 rounded shadow relative z-10 backdrop-blur-sm">
              <span className="text-qpurple cursor-pointer hover:underline" onClick={() => router.push('/')}>
                Home
              </span>
              <span>/</span>
              {selectedMainCatObj && (
                <>
                  <span className="text-qpurple font-semibold">
                    {selectedMainCatObj.name}
                  </span>
                  {selectedChildCatObjs.length > 0 && (
                    <>
                      <span>/</span>
                      <span>
                        {selectedChildCatObjs.map((obj, idx) => (
                          <span key={obj.childName}>
                            <span className="text-qpurple">{obj.subName}</span>
                            <span className="text-qblack">: </span>
                            <span className="text-qblack">{obj.childName}</span>
                            {idx < selectedChildCatObjs.length - 1 && <span className="mx-1">, </span>}
                          </span>
                        ))}
                      </span>
                    </>
                  )}
                </>
              )}
            </nav>
          </div>

          {/* Mobile Filter Toggle Button */}
          <div className="xl:hidden flex justify-between items-center mb-6">
            <div className="text-sm text-qblack">
              Showing 1–{productsData.length} of {totalProducts} results
            </div>
            <button
              onClick={() => setToggle(!filterToggle)}
              className="flex items-center space-x-2 bg-qpurple text-white px-4 py-2 rounded"
            >
              <span>Filters</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div className="w-full xl:flex xl:space-x-[30px]">
            {/* Filter Sidebar */}
            <div className="xl:w-[270px]">
              <ProductsFilter
                mainCategories={mainCats}
                subCategories={subCats}
                selectedMainCat={selectedMainCat}
                selectedChildCats={selectedChildCats}
                onSelectMainCat={handleMainCat}
                onSelectChildCat={handleChildCat}
                brands={brands}
                brandsHandler={handleBrand}
                volume={volume}
                volumeHandler={handlePrice}
                variantsFilter={variantsFilter}
                varientHandler={handleVariant}
                priceMax={response.data && Math.max(...response.data.products.data.map(item => parseInt(item.price)))}
                priceMin={response.data && Math.min(...response.data.products.data.map(item => parseInt(item.price)))}
                filterToggle={filterToggle}
                filterToggleHandler={() => setToggle(!filterToggle)}
                selectedDiscounts={selectedDiscounts}
                onSelectDiscount={handleDiscount}
                className="mb-[30px]"
              />
              
              {/* Sidebar Banner */}
              {response.data?.shopPageSidebarBanner?.status === 1 && (
                <div className="w-full hidden py-[35px] pl-[40px] group xl:block h-[295px] relative rounded bg-cover bg-center" style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL + response.data.shopPageSidebarBanner.image})` }}>
                  <div className="flex flex-col justify-between w-full h-full">
                    <div>
                      <div className="mb-[10px]">
                        <span className="text-qblack uppercase text-xs font-semibold">
                          {response.data.shopPageSidebarBanner.title_one}
                        </span>
                      </div>
                      <div className="mb-[30px]">
                        <h1 className="w-[162px] text-[24px] leading-[30px] text-qblack font-semibold">
                          {response.data.shopPageSidebarBanner.title_two}
                        </h1>
                      </div>
                    </div>
                    <div className="w-[90px]">
                      <Link href={{ pathname: "/products", query: { category: response.data.shopPageSidebarBanner.product_slug } }} passHref>
                        <div className="cursor-pointer w-full relative">
                          <div className="inline-flex space-x-1.5 items-center relative z-20">
                            <span className="text-sm text-qblack font-medium leading-[30px]">
                              {langCntnt?.Shop_Now}
                            </span>
                            <svg width="7" height="11" viewBox="0 0 7 11" fill="none" className="fill-current" xmlns="http://www.w3.org/2000/svg">
                              <rect x="2.08984" y="0.636719" width="6.94219" height="1.54271" transform="rotate(45 2.08984 0.636719)" />
                              <rect x="7" y="5.54492" width="6.94219" height="1.54271" transform="rotate(135 7 5.54492)" />
                            </svg>
                          </div>
                          <div className="w-[82px] transition-all duration-300 ease-in-out group-hover:h-4 h-[2px] bg-qyellow absolute left-0 bottom-0 z-10"></div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Product Listing */}
            <div className="flex-1">
              {/* Desktop Product Count */}
              <div className="hidden xl:flex justify-between items-center mb-6">
                <div className="text-sm text-qblack">
                  Showing 1–{productsData.length} of {totalProducts} results
                </div>
                <div className="flex items-center space-x-2">
                  <span>View by:</span>
                  <button onClick={() => setCardViewStyle("col")} className={`p-2 ${cardViewStyle === "col" ? "text-qpurple" : "text-gray-400"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button onClick={() => setCardViewStyle("row")} className={`p-2 ${cardViewStyle === "row" ? "text-qpurple" : "text-gray-400"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>

              {products && products.length > 0 ? (
                <div className="w-full">
                  <div className={cardViewStyle === "col" 
                    ? "grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5 mb-[40px]" 
                    : "grid lg:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5 mb-[40px]"}>
                    <DataIteration datas={products} startLength={0} endLength={products.length}>
                      {({ datas }) => (
                        <div data-aos="fade-up" key={datas.id}>
                          {cardViewStyle === "col" ? (
                            <ProductCardStyleOne datas={datas} />
                          ) : (
                            <ProductCardRowStyleOne datas={datas} />
                          )}
                        </div>
                      )}
                    </DataIteration>
                  </div>

                  {response.data?.shopPageCenterBanner?.status === 1 && (
                    <div className="w-full relative text-qblack mb-[40px]">
                      <OneColumnAdsTwo data={response.data.shopPageCenterBanner} />
                    </div>
                  )}

                  {nxtPage && nxtPage !== "null" && (
                    <div className="flex justify-center">
                      <button onClick={nextPageHandler} type="button" className="w-[180px] h-[54px] bg-qpurple rounded mt-10">
                        <div className="flex justify-center w-full h-full items-center group rounded relative transition-all duration-300 ease-in-out overflow-hidden cursor-pointer">
                          <div className="flex items-center transition-all duration-300 ease-in-out relative z-10 text-white">
                            <span className="text-sm font-600 tracking-wide leading-7 mr-2">
                              {langCntnt?.Show_more}...
                            </span>
                            {loading && <span className="w-5" style={{ transform: "scale(0.3)" }}><LoaderStyleOne /></span>}
                          </div>
                          <div className="w-full h-full bg-black absolute top-0 left-0 right-0 bottom-0 transform scale-x-0 group-hover:scale-x-100 origin-[center_left] group-hover:origin-[center_right]"></div>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-5 flex flex-col items-center">
                  <div className="w-[200px] h-[200px] relative">
                    <Image layout="fill" objectFit="scale-down" src="/assets/images/search-not-found.png" alt="not found" />
                  </div>
                  <div className="flex justify-center items-center mt-10">
                    <p className="text-2xl font-bold text-tblack">Product Not Found</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}