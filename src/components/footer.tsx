import * as React from "react";

const Footer = (props: any) => {
  console.log(props)
  React.useEffect(() => {
    document.body.setAttribute("id", "body");
  })
  const toggle = () => {
    (document.getElementById("body") as HTMLInputElement).classList.toggle('');
  };

  const footerMenu1 = props._site.c_footerMenu1.map((link: any) => (
    <li>
      <a style={{direction: "ltr" }}  rel="noopener noreferrer" className="Link" href={link.link} >
        {link.label}
      </a>
    </li>
    ));

    const footerMenu2 = props._site.c_footerMenu2.map((link: any) => (
      <li>
        <a style={{direction: "ltr" }}  rel="noopener noreferrer" className="Link" href={link.link} >
          {link.label}
        </a>
      </li>
      ));

      const footerMenu3 = props._site.c_footerMenu3.map((link: any) => (
        <li>
          <a style={{direction: "ltr" }}  rel="noopener noreferrer" className="Link" href={link.link} >
            {link.label}
          </a>
        </li>
        ));

        const footerMenu4 = props._site.c_footerMenu4.map((link: any) => (
          <li>
            <a style={{direction: "ltr" }}  rel="noopener noreferrer" className="Link" href={link.link} >
              {link.label}
            </a>
          </li>
          ));


      const PlayImages = props._site.c_playImages.map((link: any) => (
           
                  <img src={link.url} alt="App Store" />
             

            ));
          

  return (
              <>
                 <footer className="site-footer">
                    <div className="container flex flex-col lg:flex-row justify-between">
                      <div className="">
                          <div className="logo">
                            <img
                              style={{ maxWidth: "50%" }}
                              src={props._site.c_footerLogo.url}
                              alt="Favorite Fried Chicken"
                            />
                          </div>
                        </div>
                        <div className="">
                          <ul className="footer-links">
                                {footerMenu1}
                          </ul>
                        </div>
                        <div className="">
                          <ul className="footer-links">
                                {footerMenu2}
                          </ul>
                        </div>
                        <div className="">
                          <ul className="footer-links">
                                {footerMenu3}
                          </ul>
                        </div>

                        <div className="">
                          <ul className="footer-links">
                                {footerMenu4}
                          </ul>
                        </div>
                    </div>

                    <div className="container flex flex-col lg:flex-row justify-between"
                      style={{ marginTop: "30px" }} >
                       <div className="">
                        <ul className="footer-links">
                          <li>
                            <div className="app-link">
                               {PlayImages}
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                </footer>
            </>
  );
};

export default Footer;
