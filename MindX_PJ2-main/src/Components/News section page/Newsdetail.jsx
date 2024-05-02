import React, { useContext, useEffect, useState } from "react";
import Navbarcart from "../Moviepage/Cart movies/Navbarcart";
import "../Moviepage/Cart movies/Cartmovies.css";
import { MdKeyboardArrowRight } from "react-icons/md";
import { NavLink, useParams } from "react-router-dom";
import { doc, getDoc, getDocs } from "firebase/firestore";
import { FirebaseContext } from "../../../Firebase/FirebaseProvider";
import { FaCalendarAlt, FaQuoteLeft, FaRegComment, FaRegFolder, FaSearch } from "react-icons/fa";
import { CiFolderOn, CiUser } from "react-icons/ci";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../News section page/News.css'
import * as Yup from "yup";

import { Formik, Form, Field, ErrorMessage } from "formik";

export default function Newsdetail() {
  const { blogsId } = useParams();
  let [blog, setBlog] = useState({});
    const [latestPosts, setLatestPosts] = useState([])
  const { blogCollection } = useContext(FirebaseContext);

  let singledoc = doc(blogCollection, blogsId);
  let [mess, setmess] = useState(null);

  useEffect(() => {
    let getmess = async () => {
      const data = await getDoc(singledoc);
      setmess(data.data());
    };
    getmess();
  }, [blogsId]);

  useEffect(() => {
    if (mess) {
      setBlog(mess);
    }
  }, [mess]);
  
  // formik
  const initialValues = {
    comment: "",
    author: "",
    email: "",
    url: "",
    saveInfo: false,
  };
  const validationSchema = Yup.object({
    comment: Yup.string().required("Vui lòng nhập bình luận"),
    author: Yup.string().required("Vui lòng nhập tên của bạn"),
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập địa chỉ email"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    toast.success('Đã gửi thành công, cảm ơn bạn!');
    resetForm();
    setSubmitting(false);
  };

  // latest posts
  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const querySnapshot = await getDocs(blogCollection);
        const posts = querySnapshot.docs.map(doc => {
          return {
            id: doc.id, 
            ...doc.data() 
          };
        });
        setLatestPosts(posts.slice(0, 3));
      } catch (error) {
        console.error("Error fetching latest posts: ", error);
      }
    };
    fetchLatestPosts();
  }, [blogCollection]);
  return (
    <div className="detail-news">
      <div className="detail-news-header">
        <Navbarcart />
        <div className="cart-header">
          <div className="cart-header_container">
            <p>
              Trang chủ <MdKeyboardArrowRight /> <span>Tin tức</span>
            </p>
          </div>
        </div>
      </div>
      <div className="detail-news_body">
        <div className="detail-main">
          <div className="detail-post-wrap">
            <div className="post-media">
              <img src={blog.img}></img>
            </div>

            <h1 className="post-title">{blog.heading}</h1>
            <div className="post-meta">
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
                  <FaRegComment />0 Comments
                </li>
              </ul>
            </div>
            {blog.content && (
              <div className="post-content">
                <p>{blog.heading}</p>
                <blockquote> <FaQuoteLeft />
{blog.content.mainContent}</blockquote>

                <p>{blog.content.subContent}</p>
                <h3 className="block-heading">{blog.content.nameImg}</h3>
                <img src={blog.content.subImg} />
              </div>
            )}
            <div className="post-tags">
              <a>{blog.catagories}</a>
            </div>
            <div className="post-comments">
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                <div id="respond">
                  <h3 id="reply-title">Để lại bình luận</h3>

                  <Form id="commentform">
                    <p className="comment-notes">
                      <span>Địa chỉ email của bạn sẽ được giấu </span>
                      <span>.Thông tin bắt buộc phải nhập được đánh dấu *</span>
                    </p>
                    <p className="comment-form-comment">
                      <Field
                        as="textarea"
                        name="comment"
                        placeholder="Viết bình luận"
                        className="comment-input"
                      />
                      <ErrorMessage
                        name="comment"
                        component="div"
                        className="error-message"
                      />
                    </p>
                    <p className="comment-form-author">
                      <Field
                        type="text"
                        name="author"
                        placeholder="Họ tên"
                        className="comment-input"
                      />
                      <ErrorMessage
                        name="author"
                        component="div"
                        className="error-message"
                      />
                    </p>
                    <p className="comment-form-email">
                      <Field
                        type="email"
                        name="email"
                        placeholder="Địa chỉ email"
                        className="comment-input"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="error-message"
                      />
                    </p>
                    <p className="comment-form-url">
                      <Field
                        type="url"
                        name="url"
                        placeholder="Website"
                        className="comment-input"
                      />
                      <ErrorMessage
                        name="url"
                        component="div"
                        className="error-message"
                      />
                    </p>
                    <p className="comment-saveinfo">
                      <input type="checkbox" />
                      <label htmlFor="saveInfo">
                        Lưu họ tên và địa chỉ email của tôi cho lần bình luận
                        tiếp theo
                      </label>
                    </p>
                    <p className="form-submit">
                      <input
                        name="submit"
                        type="submit"
                        id="submit"
                        class="submit"
                        value="Đăng bình luận"
                      />
                    </p>
                  </Form>
                </div>
              </Formik>
              <ToastContainer />

            </div>
          </div>
        </div>
        <div className="sidebar">
          <div id="search-2">
            <form>
              <label>
                <span></span>
                <input type="search" class="search-field" placeholder="Search" />
                <FaSearch />

              </label>
            </form>
          </div>
          <div id="text-2">
            <h4 className="widget-title">Bài viết mới nhất</h4>
            <div id="textwidget">
              {latestPosts.slice(0, 3).map((blogs) => (
                <div className="latest-post-item">
                  <div className="latest-post-item_media">
                    <NavLink to={`/blogs/${blogs.id}`}>
                      <img src={blogs.img} />
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
                      <NavLink to={`/blogs/${blogs.id}`}>{blogs.heading}</NavLink>
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
    </div>
  );
}
