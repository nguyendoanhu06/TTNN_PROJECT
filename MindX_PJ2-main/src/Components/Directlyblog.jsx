import React, { useContext, useEffect, useState } from "react";
import "../styles/Directlyblog.css";
import { PiFilmReelBold } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import { FaComments } from "react-icons/fa";
import { FirebaseContext } from "../../Firebase/FirebaseProvider";
import { collection, getDocs, getFirestore } from "firebase/firestore";

export default function Directlyblog() {
  const { app, blogCollection } = useContext(FirebaseContext);
  const [blogs, setBlogs] = useState([]);



  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const db = getFirestore(app)
        const blogSnapshot = await getDocs(blogCollection)
        const blogList = blogSnapshot.docs.map((doc) => ({

          id: doc.id,
          ...doc.data()
        }));
        setBlogs(blogList);
      } catch (error) {
        console.error("Error fetching blogs: ", error);
      }
    };

    fetchBlogs();
  }, [app]);

  const newBlogs = blogs.slice(0, 3);


  return (
    <section className="directly-post-item-section">
      <div className="post-section-container">
        <div className="post-section-col">
          <div className="post-section-wrap">
            <div className="post-section-item-container">
              <ul>
              {newBlogs.map((blog) => (

                <li key={blog.id}>
                  <div className="post-media">
                    <div className="post-img">
                      <NavLink to={"/#"}>
                        <img
                          src={blog.img}
                        />
                        <div className="post-img-overlay"></div>
                      </NavLink>
                    </div>
                    <div className="post-date">
                      <span className="date">{blog.date} </span>
                    </div>
                  </div>
                  <div className="post-content">
                    <ul className="post-meta">
                      <li className="item-meta author">
                        <span className="left author">
                          <img
                            src="https://secure.gravatar.com/avatar/48edf980314d87b06d469d183ebcb4a8?s=96&d=mm&r=g"
                            alt=""
                          />
                        </span>
                        <span className="right post-author">
                          <span className="by">
                            by
                            <NavLink to={"/#"}> {blog.author}</NavLink>
                          </span>
                        </span>
                      </li>
                      <li className="item-meta post-comment">
                        <span className="left comment">
                          <FaComments className="comment-icon" />
                        </span>
                        <span className="right comment">
                          <NavLink to={"/#"}>0 Comments</NavLink>
                        </span>
                      </li>
                    </ul>
                    <h2 className="post-title">
                      <NavLink to={"/#"}>
                        {blog.heading}
                      </NavLink>
                    </h2>
                    <div className="read-more">
                      <NavLink to={"/#"}>Xem chi tiết</NavLink>
                    </div>
                  </div>
                </li>
                ))}
                
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
