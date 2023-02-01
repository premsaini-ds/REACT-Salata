import * as React from "react";
import "../index.css";
import "../main.css";
import { Link } from "@yext/pages/components";

const Header = (props: any) => {
  // console.log(props)
  // React.useEffect(() => {
  //   document.body.setAttribute("id", "body");
  // })
  // const toggle = () => {
  //   (document.getElementById("body") as HTMLInputElement).classList.toggle('');
  // };
      const linkDoms = props._site.c_headerMenu.map((link: any) => (
      <li>
        <a style={{direction: "ltr" }}  rel="noopener noreferrer" className="Link" href={link.link} >
          {link.label}
        </a>
      </li>
      ));
  // console.log(linkDoms, "linkdoms");

  return (
    <>
      <div className="site-header">
        <div className="header-top">
          <div className="container flex flex-row justify-between items-center">
            <div className="logo">
                <img style={{ maxWidth: "50%" }} src={props._site.c_headerLogo.url} alt="Favorite Fried Chicken"/>
            </div>
          </div>
        </div>
        <nav className="navigation">
          <div className="container flex flex-row justify-between">
           <ul id="main-nav" className="main-nav">
              {linkDoms}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
