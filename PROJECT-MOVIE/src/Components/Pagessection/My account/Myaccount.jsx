import React, { useState } from "react";
import Footer from "../../Footer";
import Navbar from "../../Navbar";
import Bannersidepage from "../../Bannersidepage";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

export default function Myaccount() {
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const initialValues = {
    username: "",
    password: "",
    rememberme: false,
    email: "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required(
      "Tên đăng nhập hoặc địa chỉ email là bắt buộc"
    ),
    password: Yup.string().required("Mật khẩu là bắt buộc"),
    email: Yup.string()
      .email("Vui lòng nhập địa chỉ email hợp lệ")
      .required("Địa chỉ email là bắt buộc"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const accountExists = false;
    if (!accountExists) {
      setError("Tài khoản không tồn tại");
    } else {
      setSubmitting(false);
      setError(null);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="account">
      <div className="account-header">
        <Navbar />
        <Bannersidepage />
        <img
          src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-lines-header.jpg"
          className="headerimg"
        ></img>
      </div>
      <div className="account-body">
        <div className="account-body-container">
          <div className="account-body-content">
            <div className="woocommerce">
              <ul className="login-register">
                <li
                  className={activeTab === "login" ? "active" : ""}
                  onClick={() => handleTabClick("login")}
                >
                  <a>Đăng nhập</a>
                </li>
                <li
                  className={activeTab === "register" ? "active" : ""}
                  onClick={() => handleTabClick("register")}
                >
                  <a>Đăng ký</a>
                </li>
              </ul>
              <div className="content-section">
                <div
                  className="accountlogin woocol"
                  style={{
                    display: activeTab === "login" ? "block" : "none",
                  }}
                >
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <p className="field-display">
                          <label htmlFor="username">
                            Tên đăng nhập hoặc địa chỉ email{" "}
                            <span className="required">*</span>
                            <ErrorMessage
                              name="username"
                              component="div"
                              className="error-message"
                            />
                          </label>
                        </p>
                        <Field type="text" name="username" />

                        <p className="field-display">
                          <label htmlFor="password">
                            Mật khẩu <span className="required">*</span>
                            <ErrorMessage
                              name="password"
                              component="div"
                              className="error-message"
                            />
                          </label>
                          <span className="password-input">
                            <Field
                              type={showPassword ? "text" : "password"}
                              name="password"
                            />
                            <span className="show-password-input">
                              <FaRegEyeSlash
                                onClick={togglePasswordVisibility}
                                style={{
                                  display: showPassword ? "block" : "none",
                                }}
                              />
                              <FaRegEye
                                onClick={togglePasswordVisibility}
                                style={{
                                  display: showPassword ? "none" : "block",
                                }}
                              />
                            </span>
                          </span>
                        </p>

                        <p className="form-bottom">
                          <label>
                            <Field
                              type="checkbox"
                              name="rememberme"
                              id="rememberme"
                            />
                            <span>Ghi nhớ</span>
                          </label>
                          <ErrorMessage
                            name="submit"
                            component="div"
                            className="error-message"
                          />
                          <button
                            type="submit"
                            name="submit"
                            disabled={isSubmitting}
                          >
                            Đăng nhập
                          </button>
                        </p>
                        <p className="form-lostpassword">
                          <NavLink to={"/"}>Quên mật khẩu ?</NavLink>
                        </p>
                      </Form>
                    )}
                  </Formik>
                </div>
                <div
                  className="accountregister woocol"
                  style={{
                    display: activeTab === "register" ? "block" : "none",
                  }}
                >
                  <Formik>
                    {({ isSubmitting }) => (
                      <div>
                        <p className="register-field">
                          <label>
                            Địa chỉ Email <span className="required">*</span>
                          </label>
                          <Field type="email" name="email" />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="error-message"
                          />
                        </p>
                        <p className="register-field-text">
                          Vui lòng check email để thay đổi mật khẩu cho tài
                          khoản của bạn
                        </p>
                        <p className="register-field-text">
                          Thông tin cá nhân của bạn sẽ được sử dụng cho mục đích
                          hỗ trợ trải nghiệm người dùng, quản lý tài khoản của
                          bạn và cho các mục đích khác được miêu tả ở trong{" "}
                          <a>chính sách bảo mật</a> của chúng tôi
                        </p>
                        <p className="register-field-button">
                          <button
                            type="submit"
                            name="submit"
                            disabled={isSubmitting}
                          >
                            Đăng ký
                          </button>
                        </p>
                      </div>
                    )}
                  </Formik>
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
