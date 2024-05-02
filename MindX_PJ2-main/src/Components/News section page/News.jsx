import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar";
import Bannersidepage from "../Bannersidepage";
import { NavLink } from "react-router-dom";
import { FirebaseContext } from "../../../Firebase/FirebaseProvider";
import {
  getFirestore,
  query,
  where,
  collection,
  getDocs,
} from "firebase/firestore";
import "../Searchpage/Searchpage.css";
import { FaRegComment, FaRegFolder, FaSearch } from "react-icons/fa";
import { CiFolderOn, CiUser } from "react-icons/ci";
import { FaCalendarAlt } from "react-icons/fa";
import "../News section page/News.css";
export default function News() {
  const { blogCollection } = useContext(FirebaseContext);
  const [inputSearchTerm, setInputSearchTerm] = useState("");
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const db = getFirestore();
        const blogSnapshot = await getDocs(blogCollection);
        const blogList = blogSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogList);
      } catch (error) {
        console.error("Error fetching blogs: ", error);
      }
    };
  
    fetchBlogs();
  }, [blogCollection]);


  const newBlogs = blogs.slice(0, 3);
  console.log(newBlogs)

  return (
    <section className="searchpage">
      <div className="searchpage-header">
      <Navbar onSearch={(value) => setInputSearchTerm(value)} /> 
        <Bannersidepage />
        <img
          src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-lines-header.jpg"
          className="headerimg"
        ></img>
      </div>
      <div className="searchpage-body">
        <div className="main-content">
          {blogs.map((blog) => (
            <div className="search-result_container" key={blog.id}>
              <div className="search-result_media blog-post_media">
                <img src={blog.img} />
              </div>
              <NavLink to={`/blogs/${blog.id}`}>

                <h2 className="search-postitle">{blog.heading}</h2>
              </NavLink>
              <ul className="blogpost-meta">
                <li className="date">
                <FaCalendarAlt />
                {blog.date}
                </li>
                <li className="category">
                <FaRegFolder />
                {blog.catagories}
                </li>
                <li className="author">
                <CiUser />
                {blog.author}
                </li>
                <li className="comment">
                <FaRegComment />
                  0 Comments
                </li>
              </ul>
              <p className="search-description">
                {blog.content.mainContent}
              </p>
              <NavLink   to={`/blogs/${blog.id}`} className="search-readmore">Xem chi tiết</NavLink>
            </div>
          ))}
        </div>
        <div className="sidebar">
          <div id="search-2">
            <form>
              <label>
                <span>{inputSearchTerm}</span>
                <input type="search" class="search-field" placeholder="Search ..." />

              </label>
              <FaSearch />

            </form>
          </div>
          <div id="text-2">
            <h4 className="widget-title">Bài viết mới nhất</h4>
            <div id="textwidget">
              {newBlogs.map((post) => (
                <div className="latest-post-item">
                  <div className="latest-post-item_media">
                    <NavLink  to={`/blogs/${post.id}`}>
                      <img src={post.img} />
                    </NavLink>
                  </div>
                  <div className="latest-post-item_info">
                    <div className="item-meta">
                      <span className="left"><FaRegComment />
</span>
                      <span className="right">0</span>
                      <span className="text-comment"> Comments</span>
                    </div>
                    <h4 className="post-title">
                      <NavLink  to={`/blogs/${post.id}`}>{post.heading}</NavLink>
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div id="categories-2">
          <h4 className="widget-title">Chủ đề</h4>
           <ul>
            <li>
            <CiFolderOn />
            <span>Fantasy</span>
            </li>
            <li>
            <CiFolderOn />
            <span>Film</span>
            </li>
            <li>
            <CiFolderOn />
            <span>Movie</span>
            </li>
            <li>
            <CiFolderOn />
            <span>TV Dramas</span>
            </li>
            <li>
            <CiFolderOn />
            <span>Uncategorized</span>
            </li>
           </ul>
          </div>
          <div id="cloud-2">
          <h4 className="widget-title">Thẻ</h4>
           <div className="tag-cloud">
            <NavLink>Phiêu lưu</NavLink>
            <NavLink>Phim</NavLink>
            <NavLink>Movie</NavLink>
            <NavLink>Show truyền hình</NavLink>
           </div>
          </div>
        </div>
      </div>
    </section>
  );
}
