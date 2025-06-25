import { useEffect, useState } from "react";
import settings from "../../../utils/settings";
import SectionStyleFour from "../Helpers/SectionStyleFour";
import SectionStyleOne from "../Helpers/SectionStyleOne";
import SectionStyleThree from "../Helpers/SectionStyleThree";
import SectionStyleTwo from "../Helpers/SectionStyleTwo";
import ViewMoreTitle from "../Helpers/ViewMoreTitle";
import Layout from "../Partials/Layout";
import Banner from "./Banner";
import BrandSection from "./BrandSection";
import CampaignCountDown from "./CampaignCountDown";
import CategorySection from "./CategorySection";
import TwoColumnAds from "./ProductAds/TwoColumnAds";
import BestSellers from "./BestSellers";
import SectionStyleFive from "../Helpers/SectionStyleFive";
import Ads from "./Ads";
import MobileCategoryScroll from "./CategoryMob"; // 👈 Importing the mobile category component
import AppDownloadBanner from "./AppDownloadBanner";
export default function Home({ homepageData }) {
  const [homepage] = useState(homepageData);
  const getsectionTitles = homepageData.section_title;
  const [sectionTitles, setSectionTitles] = useState(null);

  useEffect(() => {
    if (!sectionTitles) {
      let tem =
        getsectionTitles &&
        getsectionTitles.map((item, i) => {
          return {
            [item.key]: item.custom ? item.custom : item.default,
          };
        });
      setSectionTitles(Object.assign.apply(Object, tem));
    }
  }, [sectionTitles]);

  const { enable_multivendor } = settings();
  const [isMultivendor, setIsMultivendor] = useState(false);

  useEffect(() => {
    if (!isMultivendor) {
      setIsMultivendor(enable_multivendor && parseInt(enable_multivendor));
    }
  }, [isMultivendor]);

  return (
    <>
      <Layout childrenClasses="pt-0">
        <Ads />

        {/* 👉 Mobile Category Scrollbar (Visible only on mobile) */}
        <MobileCategoryScroll />

        {homepage && homepage.sliders.length > 0 && (
          <Banner sliders={homepage.sliders} className="banner-wrapper" />
        )}

        <CategorySection
          categories={homepage.homepage_categories}
          adsOne={homepage.banner_one}
          adsTwo={homepage.banner_two}
          sectionTitle={sectionTitles && sectionTitles.My_Market_Category}
        />
        <AppDownloadBanner/>

        {/* {homepage && (
          <BrandSection
            brands={homepage.brands.length > 0 ? homepage.brands : []}
            sectionTitle="Shop by Brand"
            className="brand-section-wrapper md:mb-[60px] mb-[30px]"
          />
        )} */}

        <div className="md:py-[60px] py-[30px] bg-qpurplelow/10">
          {homepage && (
            <SectionStyleFour
              products={
                homepage.newArrivalProducts.length > 0
                  ? homepage.newArrivalProducts.slice(0, 4)
                  : []
              }
              sectionTitle={sectionTitles && sectionTitles.New_Arrivals}
              seeMoreUrl={`/products?highlight=new_arrival`}
              className="new-products"
            />
          )}
        </div>

        {/* {homepage && (
          <CampaignCountDown
            className="md:mb-[60px] mb-[30px]"
            datas={homepage.flashSale}
            products={homepage.flashsale_products.slice(0, 4)}
          />
        )} */}

        {homepage && (
          <SectionStyleFour
            products={
              homepage.topRatedProducts.length > 0
                ? homepage.topRatedProducts.slice(0, 4)
                : []
            }
            sectionTitle={sectionTitles && sectionTitles.Top_Rated_Products}

            className="top-selling-product mt-10 md:mb-[60px] mb-[30px]"
            seeMoreUrl={`/products?highlight=top_product`}
            categoryTitle={sectionTitles && sectionTitles.Top_Rated_Products} />
        )}
        {homepage && (
          <SectionStyleFour
            products={
              homepage.popularCategoryProducts.length > 0
                ? homepage.popularCategoryProducts.slice(0, 4)
                : []
            }
            sectionTitle={sectionTitles && sectionTitles.Popular_Category}
            seeMoreUrl={`/products?highlight=best_product`}
            className="category-products md:pt-[60px] pt-[30px] pb-[114px]"
          />
        )}
        <div className="bg-qpurplelow/10">
          {homepage && (
            <TwoColumnAds
              bannerOne={
                homepage.banner_three &&
                  parseInt(homepage.banner_three.status) === 1
                  ? homepage.banner_three
                  : null
              }
              bannerTwo={
                homepage.banner_four &&
                  parseInt(homepage.banner_four.status) === 1
                  ? homepage.banner_four
                  : null
              }
            />
          )}

          {homepage && (
            <SectionStyleFour
              products={
                homepage.bestProducts.length > 0
                  ? homepage.bestProducts.slice(0, 4)
                  : []
              }
              sectionTitle={sectionTitles && sectionTitles.Best_Products}
              seeMoreUrl={`/products?highlight=best_product`}
              className="category-products md:pt-[60px] pt-[30px] pb-[114px]"
            />
          )}

          {/* {homepage && (
            <SectionStyleFive
              products={
                homepage.bestProducts.length > 0
                  ? homepage.bestProducts.slice(0, 4)
                  : []
              }
              sectionTitle={sectionTitles && sectionTitles.Best_Products}
              seeMoreUrl={`/products?highlight=best_product`}
              className="category-products md:pt-[60px] pt-[30px] pb-[114px]"
            />
          )} */}
        </div>
      </Layout>
    </>
  );
}
