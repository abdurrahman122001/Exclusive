// import Checkbox from "../Helpers/Checkbox";
// import { useEffect, useState } from "react";
// import languageModel from "../../../utils/languageModel";
// import RangeSlider from 'react-range-slider-input';
// import 'react-range-slider-input/dist/style.css';
// import settings from "../../../utils/settings";

// // Add more if you want!
// const COLOR_MAP = {
//   Pink: "#f8d3e6",
//   Green: "#31a24c",
//   White: "#fff",
//   Yellow: "#ffe98e",
//   Orange: "#ffbb4d",
//   Grey: "#a6a6a6",
//   Multicolor: "linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)",
//   Blue: "#2646e0",
//   Purple: "#8f34cc",
//   Red: "#f53c3c",
//   Black: "#181818",
//   Beige: "#f7f3dd",
//   Brown: "#7b3f15",
//   Gold: "#ffe57f"
// };

// export default function ProductsFilter({
//   mainCategories = [],
//   subCategories = [],
//   selectedMainCat,
//   selectedChildCats,
//   onSelectChildCat,
//   brands,
//   brandsHandler,
//   volume,
//   volumeHandler,
//   className,
//   filterToggle,
//   filterToggleHandler,
//   variantsFilter,
//   priceMin,
//   priceMax,
//   varientHandler,
// }) {
//   const [langCntnt, setLangCntnt] = useState(null);
//   const { currency_icon } = settings();

//   useEffect(() => {
//     setLangCntnt(languageModel());
//   }, []);

//   const filteredSubCats = subCategories.filter((sub) => sub.category_id === selectedMainCat);

//   return (
//     <div
//       style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 15px 64px" }}
//       className={`filter-widget w-full fixed xl:relative left-0 rounded top-0 h-screen z-10 lg:h-auto overflow-y-scroll lg:overflow-y-auto bg-white px-[30px] pt-[40px] ${className || ""}  ${filterToggle ? "block" : "hidden xl:block"}`}
//     >
//       {/* Subcategory + ChildCategory Filter */}
//       <div className="filter-subject-item pb-10 border-b border-qpurplelow/10">
//         <div className="subject-title mb-[30px]">
//           <h1 className="text-qblack text-base font-500 capitalize">
//             Shop By
//           </h1>
//         </div>
//         <div className="filter-items">
//           <ul>
//             {filteredSubCats.map((sub) => (
//               <li key={sub.id} className="mb-4">
//                 <div className="font-semibold text-sm mb-2 text-qpurple">
//                   {sub.name}
//                 </div>
//                 <ul>
//                   {sub.child_categories && sub.child_categories.length > 0 && sub.child_categories.map((child) => (
//                     <li key={child.id} className="flex items-center mb-1 ml-4">
//                       <Checkbox
//                         className="accent-qpurple"
//                         id={`child-${child.id}`}
//                         name={`child-${child.id}`}
//                         checked={selectedChildCats.includes(child.id)}
//                         handleChange={() => onSelectChildCat(child.id)}
//                       />
//                       <label htmlFor={`child-${child.id}`} className="ml-2 text-xs capitalize">
//                         {child.name}
//                       </label>
//                     </li>
//                   ))}
//                 </ul>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* Price Filter */}
//       <div className="filter-subject-item pb-10 border-b border-qpurplelow/10 mt-10">
//         <div className="subject-title mb-[30px]">
//           <h1 className="text-qblack text-base font-500 capitalize">
//             {langCntnt && langCntnt.Price_Range}
//           </h1>
//         </div>
//         {volume && (
//           <>
//             <div className="price-range mb-5">
//               <RangeSlider value={volume} onInput={volumeHandler} min={priceMin} max={priceMax} />
//             </div>
//             <p className="text-xs text-qblack font-400">
//               {langCntnt && langCntnt.Price}: {currency_icon + volume[0]} - {currency_icon + volume[1]}
//             </p>
//           </>
//         )}
//       </div>

//       {/* Variant Filters */}
//       {variantsFilter && variantsFilter.length > 0 && variantsFilter.map((variant, i) => (
//         <div key={i} className="filter-subject-item pb-10 mt-10">
//           <div className="subject-title mb-[30px]">
//             <h1 className="text-qblack text-base font-500 capitalize">{variant.name}</h1>
//           </div>
//           <div
//             className={
//               variant.name.toLowerCase() === "color"
//                 ? "grid grid-cols-2 gap-2"
//                 : variant.name.toLowerCase() === "size"
//                 ? "grid grid-cols-3 gap-2"
//                 : "flex flex-col"
//             }
//           >
//             {variant.active_variant_items && variant.active_variant_items.length > 0 &&
//               variant.active_variant_items.map((variantItem, j) => {
//                 if (variant.name.toLowerCase() === "color") {
//                   const colorVal = COLOR_MAP[variantItem.name] || "#eee";
//                   return (
//                     <label
//                       key={j}
//                       htmlFor={`color-${variantItem.name}`}
//                       className="flex items-center space-x-2 cursor-pointer select-none py-1"
//                     >
//                       <Checkbox
//                         className="accent-qpurple"
//                         id={`color-${variantItem.name}`}
//                         name={variantItem.name}
//                         handleChange={varientHandler}
//                         checked={variantItem.selected}
//                       />
//                       <span
//                         style={{
//                           display: "inline-block",
//                           width: 16,
//                           height: 16,
//                           borderRadius: "50%",
//                           border: "1.5px solid #ccc",
//                           marginRight: 2,
//                           background: colorVal.startsWith("linear") ? undefined : colorVal,
//                           backgroundImage: colorVal.startsWith("linear") ? colorVal : undefined,
//                         }}
//                       />
//                       <span className="text-xs capitalize">{variantItem.name}</span>
//                     </label>
//                   );
//                 }
//                 if (variant.name.toLowerCase() === "size") {
//                   return (
//                     <label
//                       key={j}
//                       htmlFor={`size-${variantItem.name}`}
//                       className="flex items-center space-x-2 cursor-pointer select-none py-1"
//                     >
//                       <Checkbox
//                         className="accent-qpurple"
//                         id={`size-${variantItem.name}`}
//                         name={variantItem.name}
//                         handleChange={varientHandler}
//                         checked={variantItem.selected}
//                       />
//                       <span className="text-xs capitalize">{variantItem.name}</span>
//                     </label>
//                   );
//                 }
//                 // fallback for other variants
//                 return (
//                   <label
//                     key={j}
//                     htmlFor={`${variant.name}-${variantItem.name}`}
//                     className="flex items-center space-x-2 cursor-pointer select-none py-1"
//                   >
//                     <Checkbox
//                       className="accent-qpurple"
//                       id={`${variant.name}-${variantItem.name}`}
//                       name={variantItem.name}
//                       handleChange={varientHandler}
//                       checked={variantItem.selected}
//                     />
//                     <span className="text-xs capitalize">{variantItem.name}</span>
//                   </label>
//                 );
//               })}
//           </div>
//         </div>
//       ))}

//       {/* Toggle Button */}
//       <button
//         onClick={filterToggleHandler}
//         type="button"
//         className="w-10 h-10 fixed top-5 right-5 z-50 rounded  lg:hidden flex justify-center items-center border border-qred text-qred"
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//           <path
//             fillRule="evenodd"
//             d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//             clipRule="evenodd"
//           />
//         </svg>
//       </button>
//     </div>
//   );
// }
import Checkbox from "../Helpers/Checkbox";
import { useEffect, useState } from "react";
import languageModel from "../../../utils/languageModel";
import settings from "../../../utils/settings";

const COLOR_MAP = {
  Pink: "#f8d3e6",
  Green: "#31a24c",
  White: "#fff",
  Yellow: "#ffe98e",
  Orange: "#ffbb4d",
  Grey: "#a6a6a6",
  Multicolor: "linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)",
  Blue: "#2646e0",
  Purple: "#8f34cc",
  Red: "#f53c3c",
  Black: "#181818",
  Beige: "#f7f3dd",
  Brown: "#7b3f15",
  Gold: "#ffe57f"
};

export default function ProductsFilter({
  mainCategories = [],
  subCategories = [],
  selectedMainCat,
  selectedChildCats,
  onSelectChildCat,
  onSelectMainCat,
  brands,
  brandsHandler,
  volume,
  volumeHandler,
  className,
  filterToggle,
  filterToggleHandler,
  variantsFilter,
  priceMin,
  priceMax,
  varientHandler,
  selectedDiscounts,
  onSelectDiscount,
}) {
  const [langCntnt, setLangCntnt] = useState(null);
  const { currency_icon } = settings();

  useEffect(() => {
    setLangCntnt(languageModel());
  }, []);

  const filteredSubCats = subCategories.filter((sub) => sub.category_id === selectedMainCat);

  // Price ranges
  const priceRanges = [
    { id: '0-50', label: `${currency_icon}0.00 - ${currency_icon}49.99`, min: 0, max: 49.99 },
    { id: '50-100', label: `${currency_icon}50.00 - ${currency_icon}99.99`, min: 50, max: 99.99 },
    { id: '100-150', label: `${currency_icon}100.00 - ${currency_icon}149.99`, min: 100, max: 149.99 },
    { id: '150-200', label: `${currency_icon}150.00 - ${currency_icon}199.99`, min: 150, max: 199.99 },
    { id: '200+', label: `${currency_icon}200.00 and above`, min: 200, max: null },
  ];

  return (
    <div
      style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 15px 64px" }}
      className={`filter-widget w-full fixed xl:relative left-0 top-0 h-screen z-10 lg:h-auto overflow-y-scroll lg:overflow-y-auto bg-white px-4 py-6 ${className || ""} ${filterToggle ? "block" : "hidden xl:block"}`}
    >
      {/* Main Categories Filter */}
      <div className="mb-8">
        <h3 className="text-base font-500 text-qblack mb-4">Main Categories</h3>
        <ul className="space-y-2">
          {mainCategories.map((category) => (
            <li key={category.id} className="flex items-center">
              <Checkbox
                className="accent-qpurple"
                id={`main-${category.id}`}
                name={category.id}
                checked={selectedMainCat === category.id}
                handleChange={() => onSelectMainCat(category.id)}
              />
              <label htmlFor={`main-${category.id}`} className="ml-2 text-sm text-qblack capitalize">
                {category.name}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Sub Categories Filter */}
      {filteredSubCats.length > 0 && (
        <div className="mb-8">
          <h3 className="text-base font-500 text-qblack mb-4">Sub Categories</h3>
          <ul className="space-y-2">
            {filteredSubCats.map((sub) => (
              <li key={sub.id} className="space-y-2">
                <div className="font-medium text-lg mt-5 mb-5 text-qpurple">{sub.name}</div>
                <ul className="space-y-1 pl-0">
                  {sub.child_categories && sub.child_categories.length > 0 && sub.child_categories.map((child) => (
                    <li key={child.id} className="flex items-center">
                      <Checkbox
                        className="accent-qpurple"
                        id={`child-${child.id}`}
                        name={`child-${child.id}`}
                        checked={selectedChildCats.includes(child.id)}
                        handleChange={() => onSelectChildCat(child.id)}
                      />
                      <label htmlFor={`child-${child.id}`} className="ml-2 text-sm text-qblack capitalize">
                        {child.name}
                      </label>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="border-t border-qpurplelow/10 my-6"></div>

      {/* Price Filter */}
      <div className="mb-8">
        <h3 className="text-base font-500 text-qblack mb-4">Price</h3>
        <ul className="space-y-2">
          {priceRanges.map((range) => (
            <li key={range.id} className="flex items-center">
              <Checkbox
                className="accent-qpurple"
                id={`price-${range.id}`}
                name={range.id}
                checked={
                  volume[0] === range.min && 
                  (range.max ? volume[1] === range.max : volume[1] >= range.min)
                }
                handleChange={() => volumeHandler([range.min, range.max || priceMax])}
              />
              <label htmlFor={`price-${range.id}`} className="ml-2 text-sm text-qblack">
                {range.label}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-qpurplelow/10 my-6"></div>
      {/* Variant Filters */}
      {variantsFilter && variantsFilter.length > 0 && variantsFilter.map((variant, i) => (
        <div key={i} className="mb-8">
          <div className="border-t border-qpurplelow/10 my-6"></div>
          <h3 className="text-base font-500 text-qblack mb-4">{variant.name}</h3>
          <div
            className={
              variant.name.toLowerCase() === "color"
                ? "grid grid-cols-2 gap-3"
                : variant.name.toLowerCase() === "size"
                ? "grid grid-cols-3 gap-2"
                : "flex flex-col space-y-2"
            }
          >
            {variant.active_variant_items && variant.active_variant_items.length > 0 &&
              variant.active_variant_items.map((variantItem, j) => {
                if (variant.name.toLowerCase() === "color") {
                  const colorVal = COLOR_MAP[variantItem.name] || "#eee";
                  return (
                    <label
                      key={j}
                      htmlFor={`color-${variantItem.name}`}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <Checkbox
                        className="accent-qpurple"
                        id={`color-${variantItem.name}`}
                        name={variantItem.name}
                        handleChange={varientHandler}
                        checked={variantItem.selected || false}
                      />
                      <div className="flex items-center">
                        <span
                          className="w-4 h-4 rounded-full mr-2 border border-gray-300"
                          style={{
                            background: colorVal.startsWith("linear") ? undefined : colorVal,
                            backgroundImage: colorVal.startsWith("linear") ? colorVal : undefined,
                          }}
                        />
                        <span className="text-sm text-qblack capitalize">{variantItem.name}</span>
                      </div>
                    </label>
                  );
                }
                return (
                  <label
                    key={j}
                    htmlFor={`${variant.name}-${variantItem.name}`}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <Checkbox
                      className="accent-qpurple"
                      id={`${variant.name}-${variantItem.name}`}
                      name={variantItem.name}
                      handleChange={varientHandler}
                      checked={variantItem.selected || false}
                    />
                    <span className="text-sm text-qblack capitalize">{variantItem.name}</span>
                  </label>
                );
              })}
          </div>
        </div>
      ))}

      {/* Discount Filter */}
      <div className="mb-8">
        <div className="border-t border-qpurplelow/10 my-6"></div>
        <h3 className="text-base font-500 text-qblack mb-4">Discount</h3>
        <ul className="space-y-2">
          {[
            { id: '10', label: '10% and above' },
            { id: '20', label: '20% and above' },
            { id: '30', label: '30% and above' },
            { id: '40', label: '40% and above' },
            { id: '50', label: '50% and above' },
          ].map((range) => (
            <li key={range.id} className="flex items-center">
              <Checkbox
                className="accent-qpurple"
                id={`discount-${range.id}`}
                name={range.id}
                checked={selectedDiscounts.includes(range.id)}
                handleChange={() => onSelectDiscount(range.id)}
              />
              <label htmlFor={`discount-${range.id}`} className="ml-2 text-sm text-qblack">
                {range.label}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile close button */}
      <button
        onClick={filterToggleHandler}
        type="button"
        className="xl:hidden fixed top-4 right-4 z-50 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-qred hover:text-qblack"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}