import * as React from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import Banner from "../components/banner";
import BreadCrumbs from "../components/BreadCrumbs";
import "../index.css";
import {
  Template,
  GetPath,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import { stagingBaseUrl } from "../constants";
import Logo from "../images/logo.svg";
import bannerImage from "../images/app-bg.png";
import PageLayout from "../components/PageLayout";
var currentUrl = "";
export const config: TemplateConfig = {
  stream: {
    $id: "root",
    filter: {
      entityTypes: ["ce_root"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "slug",
      "description",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta.entityType",
      "dm_directoryChildren.name",
      "dm_directoryChildren.slug",
      "dm_directoryChildrenCount",
    ],
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  currentUrl = document.slug.toString() + ".html";
  return document.slug.toString() + ".html";
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const Root: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const { description, dm_directoryParents, dm_directoryChildren,_site } = document;

  const { name, slug, c_globalData } = document;

  return (
    <>
     <PageLayout _site={_site}>
      {/* <Header />
      <Banner
        Name={slug ? slug : ""}
        TagLine={""}
        BackgroundImage={bannerImage}
        CtaButton={""}
      /> */}
      {/* <BreadCrumbs
        name={name}
        parents={dm_directoryParents}
        baseUrl={relativePrefixToRoot}
      ></BreadCrumbs> */}
      <div className="directory-root py-5 lg:py-[60px]">
        <div className="container">
          <div className="flex flex-wrap -mx-4">
            {dm_directoryChildren.map((child: any) => {
              return (
                <>
                  <div className="w-1/2 md:w-1/3 lg:w-1/4 px-4">
                    <a
                      href={child.slug + ".html"}
                      key={child.slug}
                      className="hover:text-red"
                    >
                      {child.name} {child.dm_directoryChildrenCount}
                    </a>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
      </PageLayout> 
    </>
  );
};

export default Root;
