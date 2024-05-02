import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../Navbar";
import Bannersidepage from "../../Bannersidepage";
import { NavLink } from "react-router-dom";
import "../About/style/About.css";
import Footer from "../../Footer";
import { FaArrowRight } from "react-icons/fa";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { FirebaseContext } from "../../../../Firebase/FirebaseProvider";
import { getFirestore, collection, getDocs } from "firebase/firestore";
export default function Faq() {
  const { app, faqCollection } = useContext(FirebaseContext);
  const [selectedTitle, setSelectedTitle] = useState("Should");
  const [filteredFaq, setFilteredFaq] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const faqTitles = [
    { title: "Should", content: "..." },
    { title: "When", content: "..." },
    { title: "How", content: "..." },
    { title: "What", content: "..." },
  ];

  const [faq, setFaq] = useState([]);

  const fetchFaqItems = async () => {
    const db = getFirestore(app);
    const faqSnapShot = await getDocs(faqCollection);
    const faqList = faqSnapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setFaq(faqList);
    setFilteredFaq(faqList);
  };

  useEffect(() => {
    fetchFaqItems();
  }, [app]);

  useEffect(() => {
    if (selectedTitle !== "") {
      const filtered = faq.filter((item) => item.tag === selectedTitle);
      const otherItems = faq.filter((item) => item.tag !== selectedTitle);
      setFilteredFaq([...filtered, ...otherItems]);
    }
  }, [selectedTitle, faq]);

  const handleClickTitle = (title) => {
    setSelectedTitle(title);
  };
  const handleItemClick = (item) => {
    setSelectedItem(item.id === selectedItem ? null : item.id);
  };

  return (
    <section className="faq">
      <div className="faq-header">
        <Navbar />
        <Bannersidepage />
        <img
          src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-lines-header.jpg"
          className="headerimg"
        ></img>
      </div>
      <div className="faq-body">
        <div className="faq-body-container">
          <div className="faq-body-context">
            <div className="faq-body-wrap">
              <div className="faq-body-tabs">
                <div className="faq-nav">
                  {faqTitles.map((item, index) => (
                    <div
                      className={`faq-nav-item ${
                        selectedTitle === item.title ? "nav-item-active" : ""
                      }`}
                      key={index}
                      onClick={() => handleClickTitle(item.title)}
                    >
                      <span
                        className={`tab-icon ${
                          selectedTitle === item.title ? "tab-icon-active" : ""
                        }`}
                      >
                        <FaArrowRight />
                      </span>
                      <div className="faq-item-right">
                        <a>{item.title}</a>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="faq-list">
                  <div className="faq-list-item">
                    <div className="faq-list-item-container">
                      <div className="faq-list-item-wrap">
                        <div className="faq-list-item-content">
                          {filteredFaq.map((item) => (
                            <div
                              className="faqlist-item-context "
                              key={item.id}
                              onClick={() => handleItemClick(item)}
                            >
                              <div className="faqlist-item-header">
                                <span
                                  className="icon-closed"
                                  style={{
                                    display:
                                      selectedItem === item.id
                                        ? "block"
                                        : "none",
                                  }}
                                >
                                  <CiCircleMinus />
                                </span>
                                <span
                                  className="icon-opened"
                                  style={{
                                    display:
                                      selectedItem === item.id
                                        ? "none"
                                        : "block",
                                  }}
                                >
                                  <CiCirclePlus />
                                </span>
                                <a>{item.subtitle}</a>
                              </div>
                              <div
                                className={
                                  selectedItem === item.id
                                    ? "faqlist-item-body show"
                                    : "faqlist-item-body"
                                }
                              >
                                <div className="faqlist-item-text">
                                  {item.info}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </section>
  );
}
