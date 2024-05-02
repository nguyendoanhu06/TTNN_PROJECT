import React, { useContext, useEffect, useState } from "react";
import "../styles/Bannersidepage.css";
import { IoIosArrowForward } from "react-icons/io";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { FirebaseContext } from "../../Firebase/FirebaseProvider";
import { doc, getDoc, getFirestore } from "firebase/firestore";

export default function Bannersidepage( props ) {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("");
  const firebaseContext = useContext(FirebaseContext);
  const db = getFirestore();
  const { id }  = useParams(); // get id from url

  useEffect(() => {
    const fetchPageTitle = async () => {
      let title = "";
   
      // check if url has id
      if (id) {
        try {
          let collectionRef;
          let field;
          switch (location.pathname) {
            case "/events":
              collectionRef = firebaseContext.eventCollection;
              field = "title"; //title path for event collection
              break;
            case "/product":
              collectionRef = firebaseContext.messCollect;
              field = "nameFilm"; // title path for product collection
              break;
            case "/Blogs":
              collectionRef = firebaseContext.blogCollection;
              field = "heading"; // title path for blog colection
              break;
            default:
              collectionRef = null;
          }

          if (collectionRef) {
            // const docRef = doc(collectionRef, id );
            // const docSnap = await getDoc(docRef);
            // if (docSnap.exists()) {
            //   title = docSnap.data()[field];
            //   console.log(title)
            // }
            // const { messCollect } = useContext(FirebaseContext);
            console.log(collectionRef)
            let singledoc = doc(collectionRef,id );
            let [mess, setmess] = useState(null);
            useEffect(() => {
              let getmess = async () => {
                const data = await getDoc(singledoc);
                setmess(data.data());
              };
              getmess();
            }, []);
            console.log(mess)
          }
        } catch (error) {
          console.error("Error fetching page title:", error);
        }
      } else {
        // if id doesnt exist then get title from innertext
        const pageName = location.pathname.split("/").filter(Boolean).pop();
        title = decodeURIComponent(pageName.replace(/-/g, " "));
      }

      setPageTitle(title);
    };

    fetchPageTitle();
  }, [firebaseContext, location.pathname, id]);

  return (
    <section className="bannersidepage">
      <div className="bannersidepage-overlay"></div>
      <div className="bannersidepage-container">
        <div className="bannersidepage-col">
          <div className="bannersidepage-wrap">
            <div className="banersidepage-content">
              <div className="bannersidepage-content-container">
                <div className="banner-header-wrap">
                  <div className="cover-color"> </div>

                  <div className="header-banner">
                    <div className="header_breadcrumbs">
                      <div id="breadcrumbs">
                        <ul className="breadcrumbs">
                          <li className="nav-home">
                            <NavLink to={"#"}>Home</NavLink>
                          </li>
                          <li className="li_seperator">
                            <span className="seperator">
                              <IoIosArrowForward />
                            </span>
                          </li>
                          <li>{Object.keys(props).length != 0 ? props?.mess?.title : pageTitle}</li>
                        </ul>
                      </div>
                    </div>
                    <h1 className="header_title">{Object.keys(props).length != 0 ? props?.mess?.title : pageTitle}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
