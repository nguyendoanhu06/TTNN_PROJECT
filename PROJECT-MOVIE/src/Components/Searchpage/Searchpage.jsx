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
import { useParams } from "react-router-dom";
import "../Searchpage/Searchpage.css";
import { FaRegComment } from "react-icons/fa";
import { CiFolderOn } from "react-icons/ci";

export default function Searchpage() {
  const { searchTerm } = useParams();
  const { app, messCollect, eventCollection, blogCollection } =
    useContext(FirebaseContext);
  const [searchResults, setSearchResults] = useState([]);
  const [inputSearchTerm, setInputSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        const results = [];

        const collections = [
          { collection: messCollect, field: "nameFilm" },
          { collection: eventCollection, field: "title" },
          { collection: blogCollection, field: "heading" },
        ];
        for (const { collection: collectionRef, field } of collections) {
          const q = query(collectionRef, where(field, ">=", searchTerm));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });
        }

        setSearchResults(results);
      } catch (error) {
        console.error("Error fetching search results: ", error);
      }
    };

    if (searchTerm) {
      fetchData();
    }
  }, [searchTerm, messCollect, eventCollection, blogCollection]);

  // for sidebar
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const db = getFirestore(app);
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
  }, [app]);
  console.log(inputSearchTerm)

  const newBlogs = blogs.slice(0, 3);
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
          <h1 className="page-title">
            Kết quả tìm kiếm cho: <span>{inputSearchTerm}</span>
          </h1>
          {searchResults.map((result) => (
            <div className="search-result_container" key={result.id}>
              <div className="search-result_media">
                <img src={result.img} />
              </div>
              <NavLink to={"#"}>
                <h2 className="search-postitle">{result.content ? result.content.heading : result.nameFilm ? result.nameFilm :   "Lorem ipsum dolor sit amet, cibo mundi ea duo, vim exerci phaedrum. There are many variations of passages of Lorem Ipsum available, but the majority have alteration in some injected or words which don’t look even slightly believable."}</h2>
              </NavLink>
              <p className="search-description">
                {result.content
                  ? result.content.mainContent
                  : result.infoFilm
                  ? `Biên kịch và đạo diễn bởi ${result.infoFilm.director}`
                  : "Lorem ipsum dolor sit amet, cibo mundi ea duo, vim exerci phaedrum. There are many variations of passages of Lorem Ipsum available, but the majority have alteration in some injected or words which don’t look even slightly believable."}
              </p>
              <NavLink className="search-readmore">Xem chi tiết</NavLink>
            </div>
          ))}
        </div>
        <div className="sidebar">
          <div id="search-2">
            <form>
              <label>
                <span>{inputSearchTerm}</span>
                <input type="search" class="search-field" />
              </label>
            </form>
          </div>
          <div id="text-2">
            <h4 className="widget-title">Bài viết mới nhất</h4>
            <div id="textwidget">
              {newBlogs.map((post) => (
                <div className="latest-post-item">
                  <div className="latest-post-item_media">
                    <NavLink>
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
                      <NavLink>{post.heading}</NavLink>
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
