import * as React from "react";
// import Banner from "../components/banner";
// import List from "../components/list";
// import BreadCrumbs from "../components/BreadCrumbs";
// import LocationInformation from "../components/LocationInformation";
import Header from "../components/header";
// import Footer from "../components/footer";
import NearByLocation from "../components/NearByLocation";
// import Faq from "../components/Faq";
import { nearByLocation } from "../types/nearByLocation";
// import { JsonLd } from "react-schemaorg";
// import AboutSection from "../components/About";
import "../main.css";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
} from "@yext/pages/components";
import {
  Template,
  GetPath,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  TransformProps,
  HeadConfig,
} from "@yext/pages";
import {
  stagingBaseUrl,
  liveFavIcon,
  AnalyticsEnableDebugging,
  AnalyticsEnableTrackingCookie,
} from "../constants";
import PageLayout from "../components/PageLayout";
import Banner from "../components/banner";
import LocationInformation from "../components/LocationInformation";
import AboutSection from "../components/About";
import List from "../components/list";
import Faq from "../components/Faq";
import BreadCrumbs from "../components/BreadCrumbs";

export const config: TemplateConfig = {
  stream: {
    $id: "location",

    fields: [
      "id",
      "name",
      "c_headerBanner",
      "address",
      "mainPhone",
      "description",
      "slug",
      "hours",
      "photoGallery",
      "c_oURFOODGallery",
      "c_primaryCTA",
      "c_orderButton",
      "deliveryHours",
      "yextDisplayCoordinate",
      "timezone",
      "c_cTASectionText",
      "c_cTASectionDescription",
      "c_relatedfaq.question",
      "c_relatedfaq.answer",
      // "photoGallery.description",
      // "photoGallery.image",
      // "c_relatedfaq.question",
      // "c_relatedfaq.answer",
      // "c_aboutData",
      // "deliveryHours",
      // "timezone",
      // "c_oURFOODGallery",
      // "c_primaryCTA",
      // "c_orderButton",
      // "yextDisplayCoordinate",
      // "c_ctabutton",
      // "c_gallery_food",
      // "dm_directoryParents.name",
      // "dm_directoryParents.slug",
      // "dm_directoryParents.meta.entityType",
      // "dm_directoryParents.c_addressRegionDisplayName",
    ],
    filter: {
      entityTypes: ["location"],
    },
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

var url = "";

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  if (!document.slug) {
    let name: any = document.name.toLowerCase();
    let string: any = name.toString();
    let removeSpecialCharacters = string.replace(
      /[&\/\\#^+()$~%.'":*?<>{}!@]/g,
      ""
    );
    let result: any = removeSpecialCharacters.replaceAll("  ", "-");
    let finalString: any = result.replaceAll(" ", "-");
    url = `${document.id}-${finalString}.html`;
  } else {
    url = `${document.slug.toString()}.html`;
  }

  return url;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  // let metaDescription = document.c_metaDescription
  //   ? document.c_metaDescription
  //   : `Salata restaurant ` + document.name.toLowerCase();
  // let metaTitle = document.c_metaTitle
  //   ? document.c_metaTitle
  //   : `Salata restaurant ` + document.name.toLowerCase();

  return {
    title: "metaTitle",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      // {
      //   type: "link",
      //   attributes: {
      //     rel: "icon",
      //     type: "image/x-icon",
      //     href: "https://www.salata.com/images/favicon.ico",
      //   },
      // },
      // {
      //   type: "meta",
      //   attributes: {
      //     name: "description",
      //     content: metaDescription,
      //   },
      // },

      // {
      //   type: "meta",
      //   attributes: {
      //     name: "title",
      //     content: metaTitle,
      //   },
      // },
      // {
      //   type: "meta",
      //   attributes: {
      //     name: "author",
      //     content: "Salata Restaurant Online Ordering Home",
      //   },
      // },

      // {
      //   type: "meta",
      //   attributes: {
      //     name: "robots",
      //     content: "noindex, nofollow",
      //   },
      // },

      // {
      //   type: "link",
      //   attributes: {
      //     rel: "canonical",
      //     href: stagingBaseUrl + url,
      //   },
      // },
      // {
      //   type: "meta",
      //   attributes: {
      //     property: "og:url",
      //     content: stagingBaseUrl + url,
      //   },
      // },

      // {
      //   type: "meta",
      //   attributes: {
      //     property: "og:description",
      //     content: metaDescription,
      //   },
      // },
      // {
      //   type: "meta",
      //   attributes: {
      //     property: "og:title",
      //     content: metaTitle,
      //   },
      // },
      // {
      //   type: "meta",
      //   attributes: {
      //     property: "og:image",

      //     content: liveFavIcon,
      //   },
      // },

      // {
      //   type: "meta",
      //   attributes: {
      //     name: "twitter:card",
      //     content: "summary",
      //   },
      // },

      // {
      //   type: "meta",
      //   attributes: {
      //     name: "twitter:description",
      //     content: metaDescription,
      //   },
      // },

      // {
      //   type: "meta",
      //   attributes: {
      //     name: "twitter:image",
      //     content: liveFavIcon,
      //   },
      // },
    ],
  };
};

type ExternalApiData = TemplateProps & { externalApiData: nearByLocation };
export const transformProps: TransformProps<ExternalApiData> = async (
  data: any
) => {
  const url = `https://liveapi-sandbox.yext.com/v2/accounts/me/entities/geosearch?api_key=b51f7ad3cf3f86165e59210178de4725&v=20230110&location=${
    data.document.yextDisplayCoordinate &&
    data.document.yextDisplayCoordinate.latitude
  },${
    data.document.yextDisplayCoordinate &&
    data.document.yextDisplayCoordinate.longitude
  }`;
 
  const externalApiData = (await fetch(url).then((res: any) =>
    res.json()
  )) as nearByLocation;
  return { ...data, externalApiData };
};

type ExternalApiRenderData = TemplateRenderProps & {
  externalApiData: nearByLocation;
};

const LocationTemplate: Template<ExternalApiRenderData> = ({
  // relativePrefixToRoot,
  path,
  externalApiData,
  document,
  __meta,
}) => {
  const {

      id,
      name,
      c_headerBanner,
      address,
      mainPhone,
      description,
      slug,
      hours,
      photoGallery,
      c_oURFOODGallery,
      c_primaryCTA,
      c_orderButton,
      deliveryHours,
      yextDisplayCoordinate,
      timezone,
      c_cTASectionText,
      c_cTASectionDescription,
      c_relatedfaq,

    // id,
    // name,
    // address,
    // mainPhone,
    // slug,
    // hours,
    // c_relatedfaq,
    // c_aboutData,
    // deliveryHours,
    // timezone,
    // yextDisplayCoordinate,
    // c_ctabutton,
    // c_gallery_food,
    // dm_directoryParents,
    // c_oURFOODGallery,
    // c_primaryCTA,
    // c_orderButton,




  } = document;
  const { _site } = document;
  // let templateData = { document: document, __meta: __meta };
  // let hoursSchema = [];
  // let breadcrumbScheme = [];

  // if (hours) {
  //   for (var key in hours) {
  //     if (hours.hasOwnProperty(key)) {
  //       let openIntervalsSchema: any = "";
  //       if (key !== "holidayHours") {
  //         if (hours[key].isClosed) {
  //           openIntervalsSchema = {
  //             "@type": "OpeningHoursSpecification",
  //             dayOfWeek: key,
  //           };
  //         } else {
  //           let end = "";
  //           let start = "";
  //           if (typeof hours[key].openIntervals != "undefined") {
  //             let openIntervals = hours[key].openIntervals;
  //             for (var o in openIntervals) {
  //               if (openIntervals.hasOwnProperty(o)) {
  //                 end = openIntervals[o].end;
  //                 start = openIntervals[o].start;
  //               }
  //             }
  //           }
  //           openIntervalsSchema = {
  //             "@type": "OpeningHoursSpecification",
  //             closes: end,
  //             dayOfWeek: key,
  //             opens: start,
  //           };
  //         }
  //       } else {
  //       }

  //       hoursSchema.push(openIntervalsSchema);
  //     }
  //   }
  // }
  // dm_directoryParents &&
  //   dm_directoryParents.map((i: any, index: any) => {
  //     if (index != 0) {
  //       breadcrumbScheme.push({
  //         "@type": "ListItem",
  //         position: index,
  //         item: {
  //           "@id": `${stagingBaseUrl}${i.slug}.html`,
  //           name: i.name,
  //         },
  //       });
  //     }
  //   });
  // let url = "";
  // let Name: any = document.name.toLowerCase();
  // let string: any = Name.toString();
  // let removeSpecialCharacters = string.replace(
  //   /[&\/\\#^+()$~%.'":*?<>{}!@]/g,
  //   ""
  // );
  // let result: any = removeSpecialCharacters.replaceAll("  ", "-");
  // let finalString: any = result.replaceAll(" ", "-");
  // if (!document.slug) {
  //   url = `${document.id}-${result}.html`;
  // } else {
  //   url = `${document.slug.toString()}.html`;
  // }

  // breadcrumbScheme.push({
  //   "@type": "ListItem",
  //   position: 4,
  //   item: {
  //     "@id": `${stagingBaseUrl}${url}`,
  //     name: document.name,
  //   },
  // });

  return (

          <>

              <PageLayout _site={_site}>
                   <BreadCrumbs
                    name={name}
                    parents={address}
                    baseUrl={address}
                    address={address}
                  ></BreadCrumbs>
                   <Banner
                      Name={name}
                      BackgroundImage={ c_headerBanner && c_headerBanner.url ? c_headerBanner.url : "" }
                      CtaButton={c_primaryCTA}
                    />
                    <LocationInformation
                      prop={hours}
                      deliveryHours={deliveryHours}
                      coords={yextDisplayCoordinate}
                      address={address}
                      phone={mainPhone}
                      c_cTAButton2={"c_cTAButton2"}
                      c_deliveryServicesJustEat={""}
                      c_deliveryServicesUberEats={""}
                      c_deliveryServicesDeliveroo={""}
                      facebookPageUrl={""}
                      instagramHandle={""}
                      twitterHandle={""}
                      c_tikTok={"c_tikTok"}
                      what3WordsAddress={"what3WordsAddress"}
                      timezone={timezone}
                    />

                     {c_oURFOODGallery ? (
                          <AboutSection
                            prop={c_oURFOODGallery}
                            prop2={c_cTASectionDescription}
                            prop3={c_cTASectionText}
                            CtaButton={c_primaryCTA}
                          />
                        ) : (
                          <></>
                        )}

                         {c_oURFOODGallery ? (
                            <>
                              {" "}
                              <List prop={c_oURFOODGallery} />
                            </>
                          ) : (
                            <></>
                          )}
                          
                    {c_relatedfaq ? <Faq prop={c_relatedfaq} /> : <></>}
                   
                    {externalApiData ? (
                      <NearByLocation
                        prop={externalApiData}
                        coords={yextDisplayCoordinate}
                        slug={url}
                      />
                    ) : (
                      <></>
                    )}

              </PageLayout> 
          </>
          
         
    // <>
      /* <JsonLd<Restaurant>
        item={{
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: "Favorite Chicken & Ribs",
          address: {
            "@type": "PostalAddress",
            streetAddress: address.line1,
            addressLocality: address.city,
            addressRegion: address.region,
            postalCode: address.postalCode,
            addressCountry: address.countryCode,
          },
          openingHoursSpecification: hours ? hoursSchema : [],
        }}
      />
      <JsonLd<Organization>
        item={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Salata Limited",
          url: "https://www.salata.com/",
          // logo: "https://favorite.co.uk/assets/img/logo-social.png",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Salata Corporate HQ 16720 Park Row Dr Houston,",
            // addressLocality: "Clacton-on-Sea",
            addressRegion: "Texas",
            postalCode: "77084",
            addressCountry: "United states ",
          },
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "contact",
            telephone: "(844) 725-2821",
          },
          sameAs: [
            "https://www.facebook.com/SalataSalads",
            "https://www.instagram.com/salatasalads/",
            "https://twitter.com/salatasalads",
          ],
        }}
      />

      {c_relatedfaq ? (
        <>
          <JsonLd<FAQPage>
            item={{
              "@context": "https://schema.org",
              "@type": "FAQPage",

              mainEntity:
                c_relatedfaq &&
                c_relatedfaq.map((i: any) => {
                  return {
                    "@type": "Question",
                    name: i.question,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: `<p>${i.answer}</p>`,
                    },
                  };
                }),
            }}
          />
        </>
      ) : (
        <></>
      )}

      <JsonLd<BreadcrumbList>
        item={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",

          itemListElement: breadcrumbScheme,
        }}
      />

      <AnalyticsProvider
        templateData={templateData}
        enableDebugging={AnalyticsEnableDebugging}
        enableTrackingCookie={AnalyticsEnableTrackingCookie}
      >
        {" "}
        <AnalyticsScopeProvider name={""}>
          <Header
            nav={document._site.c_navigation}
            c_growWithUs={document._site.c_growWithUs}
          />
          <BreadCrumbs
            name={name}
            parents={dm_directoryParents}
            baseUrl={relativePrefixToRoot}
            address={address}
          ></BreadCrumbs>
          <Banner
            Name={name}
            TagLine={""}
            BackgroundImage={
              c_aboutData && c_aboutData.photoGallery
                ? c_aboutData.photoGallery[0].url
                : ""
            }
            CtaButton={c_ctabutton}
            template={"location"}
          />
          <LocationInformation
            prop={hours}
            deliveryHours={deliveryHours}
            coords={yextDisplayCoordinate}
            address={address}
            phone={mainPhone}
            c_cTAButton2={"c_cTAButton2"}
            c_deliveryServicesJustEat={""}
            c_deliveryServicesUberEats={""}
            c_deliveryServicesDeliveroo={""}
            facebookPageUrl={""}
            instagramHandle={""}
            twitterHandle={""}
            c_tikTok={"c_tikTok"}
            what3WordsAddress={"what3WordsAddress"}
            timezone={timezone}
          />

          {c_gallery_food ? (
            <AboutSection
              prop={c_gallery_food}
              prop2={c_aboutData}
              CtaButton={c_ctabutton}
            />
          ) : (
            <></>
          )}

          {c_gallery_food ? (
            <>
              {" "}
              <List prop={c_gallery_food} />
            </>
          ) : (
            <></>
          )}
          {c_relatedfaq ? <Faq prop={c_relatedfaq} /> : <></>}

          {externalApiData ? (
            <NearByLocation
              prop={externalApiData}
              coords={yextDisplayCoordinate}
              slug={url}
            />
          ) : (
            <></>
          )}

          <Footer
            address={document._site.address}
            c_privacyPolicy={document._site.c_privacyPolicy}
            c_salataHomeOffice={document._site.c_salataHomeOffice}
            c_termsOfService={document._site.c_termsOfService}
            c_sitemap={document._site.c_sitemap}
            mainPhone={document._site.mainPhone}
            c_menu={document._site.c_menu}
            c_newsroom={document._site.c_newsroom}
            c_growWithUs={document._site.c_growWithUs}
            c_downloadapp={document._site.c_downloadapp}
            c_giveYourInboxATasteLift={document._site.c_giveYourInboxATasteLift}
            c_signUp={document._site.c_signUp}
            facebookPageUrl={document._site.facebookPageUrl}
            twitterHandle={document._site.twitterHandle}
            instagramHandle={document._site.instagramHandle}
            c_android={document._site.c_android}
            c_apple={document._site.c_apple}
            emails={document._site.emails[0]}
            c_copyright={document._site.c_copyright}
          />
        </AnalyticsScopeProvider>
      </AnalyticsProvider>
    </> */
  );
};

export default LocationTemplate;
