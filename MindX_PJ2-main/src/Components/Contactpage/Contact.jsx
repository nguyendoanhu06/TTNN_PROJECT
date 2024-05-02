import React from "react";
import Bannersidepage from "../Bannersidepage";
import Navbar from "../Navbar";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { PiFilmReelBold } from "react-icons/pi";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import "../Contactpage/Contactpage.css";
export default function Contact() {
  const initialValues = {
    name: "",
    email: "",
    phoneNumber: "",
    subject: "",
    comment: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Tên là bắt buộc"),
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email là bắt buộc"),
    phoneNumber: Yup.number("").required("Số điện thoại là bắt buộc"),
    subject: Yup.string().required("Tiêu đề là bắt buộc"),
    comment: Yup.string().required("Nội dung là bắt buộc"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    toast.success('Đã gửi thành công, cảm ơn bạn!');
    resetForm();
    setSubmitting(false);
  };
  return (
    <section className="contact-page">

      <div className="contact-page_header">
        <Navbar />
        <Bannersidepage />
        <img
          src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-lines-header.jpg"
          className="headerimg"
        ></img>
      </div>
      <div className="contact-page_body">
        <div className="contact-page_body-container">
          <div className="contact-page-content">
            <div className="contact-page-wrap">
              <div className="contact_header">
                <div className="contact_header_container">
                  <div className="contact_header_content">
                    <div className="icon">
                      <PiFilmReelBold />
                    </div>
                    <div className="top-heading">
                      <h3 className="sub-title">Liên hệ với chúng tôi</h3>
                      <h2 className="title">
                        Hãy liên hệ với chúng tôi bất cứ lúc nào
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="contact_body">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="form-wrap">
                        <div className="two-column">
                          <div className="name wrap-input">
                            <p>
                              <span className="form-column-wrap">
                                

                                <Field
                                  type="text"
                                  name="name"
                                  placeholder="Tên"
                                />
                                <ErrorMessage
                                  name="name"
                                  component="div"
                                  className="error-message"
                                />
                              </span>
                            </p>
                          </div>
                          <div className="email wrap-input">
                            <p>
                              <span className="form-column-wrap">
                               

                                <Field
                                  type="email"
                                  name="email"
                                  placeholder="Email"
                                />
                                 <ErrorMessage
                                  name="email"
                                  component="div"
                                  className="error-message"
                                />
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="two-column">
                          <div className="phone wrap-input">
                            <p>
                              <span className="form-column-wrap">
                               

                                <Field
                                  type="phoneNumber"
                                  name="phoneNumber"
                                  placeholder="SĐT"
                                />
                                 <ErrorMessage
                                  name="phoneNumber"
                                  component="div"
                                  className="error-message"
                                />
                              </span>
                            </p>
                          </div>
                          <div className="subject wrap-input">
                            <p>
                              <span className="form-column-wrap">
                                <Field
                                  type="text"
                                  name="subject"
                                  placeholder="Tiêu đề"
                                />
                                <ErrorMessage
                                  name="subject"
                                  component="div"
                                  className="error-message"
                                />
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="wrap-input message-input">
                          <p>
                            <span className="form-column-wrap">
                              <Field
                                as="textarea"
                                type="text"
                                name="comment"
                                placeholder="Nội dung"
                              />
                              <ErrorMessage
                                name="comment"
                                component="div"
                                className="error-message"
                              />
                            </span>
                          </p>
                        </div>
                        <div className="message-button">
                          <Field
                            type="submit"
                            name="submit"
                            placeholder="Send a Message"
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />

      </div>
    </section>
  );
}
