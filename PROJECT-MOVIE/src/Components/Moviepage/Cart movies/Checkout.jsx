import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import Footer from "../../Footer";
import Navbarcart from "../Cart movies/Navbarcart";
import "../Cart movies/Cartmovies.css";
import { MdKeyboardArrowRight } from "react-icons/md";
import "../Cart movies/Checkout.css";
import Select from "react-select";
import { FirebaseContext } from "../../../../Firebase/FirebaseProvider";
import { addDoc, doc, getDoc } from "firebase/firestore";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Checkout() {
  let param = useParams();
  const data = useLocation();
  const {userId, totalPrice, idFilm, idShow, soGhe } = data?.state
  const [filmInfo, setFilmInfo] = useState(null);
  const [showInfo, setShowInfo] = useState(null);
  const { messCollect, bookingCollection } = useContext(FirebaseContext);
  console.log(data.state)

  // get film data based on idFilm and idShow
  useEffect(() => {
    const fetchFilmAndShowInfo = async () => {
      try {
        const filmDoc = await getDoc(doc(messCollect, idFilm));
        const filmData = filmDoc.data();

        if (filmData) {
          setFilmInfo(filmData);

          const showSchedule = filmData.movieShowSchedule.find(
            (schedule) => schedule.id === idShow
          );
          setShowInfo(showSchedule);
        }
      } catch (error) {
        console.error("Error fetching film and show info:", error);
      }
    };

    fetchFilmAndShowInfo();
  }, [idFilm, idShow, messCollect]);

  //render cities for select option
  const vietnamCities = ["Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Hải Phòng"];
  const [selectedCity, setSelectedCity] = useState(vietnamCities[0]);

  const handleCityClick = (city) => {
    setSelectedCity(city);
  };
  // handle city list
  const [isListVisible, setIsListVisible] = useState(false);
  const handleToggleListVisibility = () => {
    setIsListVisible(!isListVisible);
  };
  // payment method handle radio
  const [paymentMethod, setPaymentMethod] = useState("bacs");
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  // timer countdown
  const [seconds, setSeconds] = useState(600);
  const navigate = useNavigate();
;
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          clearInterval(interval);
          navigate(-1); 
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [history]);
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // handle submit and push to firebase
  const handleSubmit = async (values) => {
    const bookingData = {
      firstName: values.firstName,
      lastName: values.lastName,
      address: values.address,
      totalPrice: totalPrice,
      idFilm: idFilm,
      idShow: idShow,
      soGhe: soGhe,
      paymentMethod: paymentMethod,
      uid: userId
    };
  
    try {
      const docRef = await addDoc(bookingCollection , bookingData);
      navigate("/success");

    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  //formik
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Vui lòng nhập đúng họ "),
    lastName: Yup.string().required("Vui lòng nhập đúng tên"),
    address: Yup.string().required("Bạn phải nhập địa chỉ"),
    zipcode: Yup.string()
      .matches(/^\d{5}$/, "Mã ZIP phải có 5 chữ số")
      .required("ZIP code là bắt buộc"),
  });
  return (
    <div className="checkout-section">
      <div className="cart-movies_header">
        <Navbarcart />
        <div className="cart-header">
          <div className="cart-header_container">
            <p>
              Trang chủ <MdKeyboardArrowRight /> <span>Thanh toán</span>
            </p>
          </div>
        </div>
      </div>
      <div className="checkout-body">
        <h1 className="checkout-header"></h1>
        <div className="checkout-main">
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              address: "",
              zipcode: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values);
              console.log(values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form name="checkout" method="get" class="checkout-form">
                <div className="col2-set " id="customer-detail">
                  <div className="col-1">
                    <div className="billing-fields">
                      <h3>Thông tin hóa đơn</h3>
                      <div className="billing-fields-wrappers">
                        <p
                          className="form-row form-row-first"
                          id="billing_first_name_field"
                        >
                          <label
                            htmlFor="billing_first_name"
                            className="billing_first_name"
                          >
                            Họ{" "}
                            <abbr title="required" className="required">
                               *
                            </abbr>
                          </label>
                          <span className="field-input-wrapper">
                            <Field
                              type="text"
                              name="firstName"
                              className="input-text"
                              placeholder="Họ"
                            />
                            <ErrorMessage
                              name="firstName"
                              component="div"
                              className="error-message"
                            />
                          </span>
                        </p>
                        <p
                          className="form-row form-row-last"
                          id="billing_last_name_field"
                        >
                          <label
                            htmlFor="billing_last_name"
                            className="billing_first_name"
                          >
                            Tên 
                            <abbr title="required" className="required">
                                  *
                            </abbr>
                          </label>
                          <span className="field-input-wrapper">
                            <Field
                              type="text"
                              name="lastName"
                              className="input-text"
                              placeholder="Tên"
                            />
                            <ErrorMessage
                              name="lastName"
                              component="div"
                              className="error-message"
                            />
                          </span>
                        </p>
                        <p
                          className="form-row form-row-wide"
                          id="billing_company_field"
                        >
                          <label htmlFor="billing_company">
                            Tên công ty
                            <span className="optional"> (không bắt buộc)</span>
                          </label>
                          <span className="field-input-wrapper">
                            <Field
                              type="text"
                              name="billing_company"
                              className="input-text"
                              placeholder="Tên công ty"
                            />
                          </span>
                        </p>
                        <p
                          className="form-row form-row-wide"
                          id="billing_country_field"
                        >
                          <label htmlFor="billing_country">
                            Thành phố
                            <abbr title="required" className="required">
                              *
                            </abbr>
                          </label>
                          <span className="field-input-wrapper">
                            <ul
                              name=""
                              id="billing_country"
                              className={`country_select ${
                                isListVisible
                                  ? ""
                                  : "select2-hidden-accessible "
                              }`}
                              data-label="cities"
                              onClick={handleToggleListVisibility}
                            >
                              {vietnamCities.map((city) => (
                                <li
                                  key={city}
                                  value={city}
                                  onClick={() => handleCityClick(city)}
                                  className={
                                    selectedCity === city ? "city-selected" : ""
                                  }
                                >
                                  {city}
                                </li>
                              ))}
                            </ul>
                            <span className="select2 select2-container select2-container-default">
                              <span className="selection">
                                <span
                                  className="select2-selection select2-selection-single"
                                  aria-haspopup="true"
                                  aria-expanded="true"
                                  aria-label="cities"
                                  onClick={handleToggleListVisibility}
                                >
                                  <span
                                    className="select2-selection-rendered"
                                    id="select2-billing_country-container"
                                  >
                                    {selectedCity}
                                  </span>
                                  <span className="select2-selection__arrow"></span>
                                </span>
                              </span>
                            </span>
                          </span>
                        </p>
                        <p
                          className="form-row address-field form-row-wide"
                          id="billing-address-1"
                        >
                          <label htmlFor="billing-address-1">
                            Địa chỉ{" "}
                            <abbr title="required" className="required">
                              *
                            </abbr>
                          </label>
                          <span className="field-input-wrapper">
                            <Field
                              type="text"
                              name="address"
                              className="input-text"
                              placeholder="Số nhà, tên đường"
                            />
                            <ErrorMessage
                              name="address"
                              component="div"
                              className="error-message"
                            />
                          </span>
                        </p>
                        <p
                          className="form-row address-field form-row-wide"
                          id="billing-address-2"
                        >
                          <span className="field-input-wrapper">
                            <Field
                              type="text"
                              name="billing-address2"
                              className="input-text"
                              placeholder="Tòa nhà, số phòng... (không bắt buộc)"
                            />
                          </span>
                        </p>
                        <p
                          className="form-row address-field form-row-wide"
                          id="billing_city_zip"
                        >
                          <label htmlFor="billing_zip">
                            ZIP Code{" "}
                            <abbr title="required" className="required">
                              *
                            </abbr>
                          </label>
                          <span className="field-input-wrapper">
                            <Field
                              type="text"
                              name="zipcode"
                              className="input-text"
                              placeholder="ZIP Code gồm 5 chữ số"
                            />
                            <ErrorMessage
                              name="zipcode"
                              component="div"
                              className="error-message"
                            />
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="additional-fields">
                      <h3>Ghi chú</h3>
                      <p className="form-rows notes" id="order_comment_fields">
                        <label htmlFor="order_comments">
                          Ghi chú về đơn hàng
                          <span className="optional"> (không bắt buộc)</span>
                        </label>
                        <span className="field-input-wrapper">
                          <textarea
                            name="order_comments"
                            className="input-text"
                            id="order_comments"
                            placeholder="Ghi chú thêm về đơn hàng của bạn (ví dụ: giờ giấc giao, địa chỉ chi tiết)"
                            rows="2"
                            col="5"
                          />
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <h3 id="order_review_heading">Đơn hàng của bạn</h3>
                <div id="order_review">
                  {filmInfo && showInfo && (
                    <div>
                      <table className="shop_table">
                        <thead>
                          <tr>
                            <th className="product-name">Thông tin vé</th>
                            <th className="product-total">Thành tiền</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="cart_item">
                            <td className="product-name">
                              <NavLink to={`/movies/${idFilm}`}>
                                {filmInfo.nameFilm}
                              </NavLink>
                              <strong className="product-quantity"></strong>

                              <dl className="variation">
                                <dt className="variation-date">Suất chiếu:</dt>
                                <dd className="variation-date">
                                  <p>
                                    {showInfo.dayShow} {showInfo.timeShow}
                                  </p>
                                </dd>
                                <dt className="variation-room">
                                  Phòng chiếu:{" "}
                                </dt>
                                <dd className="variation-room">
                                  <p>{showInfo.room}</p>
                                </dd>
                                <dt className="variation-seat">Ghế: </dt>
                                <dd className="variation-seat">
                                  <p>{soGhe.join(", ")}</p>
                                </dd>
                                <dt className="variation-address">
                                  Địa điểm:{" "}
                                </dt>
                                <dd className="variation-Address">
                                  <p>{showInfo.location}</p>
                                </dd>
                              </dl>
                            </td>
                            <td className="product-total">
                              <span>{totalPrice.toLocaleString()}đ</span>
                            </td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr className="cart-subtotal">
                            <th>Thành tiền</th>
                            <td>
                              <span>{totalPrice.toLocaleString()}đ</span>
                            </td>
                          </tr>
                          <tr className="order-total">
                            <th>Tổng tiền</th>
                            <td>
                              <strong>
                                <span>{totalPrice.toLocaleString()}đ</span>
                              </strong>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                      <div id="payment">
                        <ul className="payment_methods wc_payment_methods">
                          <li className="wc_payment_methods payment_method_bacs">
                            <Field
                              id="payment_method_bacs"
                              type="radio"
                              name="payment_method"
                              value="bacs"
                              className="input-radio"
                              checked={paymentMethod === "bacs"}
                              onChange={handlePaymentMethodChange}
                            />
                            <label htmlFor="payment_methods_bacs">
                              Chuyển khoản ngân hàng
                            </label>
                            <div className="payment_box payment_method_bacs" style= {{ display: paymentMethod === "bacs" ? "block" : "none"}} >
                              <p>
                                Thanh toán bằng cách chuyển khoản trực tiếp vào
                                tài khoản ngân hàng. Xin hãy nhập ID đơn hàng
                                của bạn trong nội dung chuyển khoản. Đơn hàng
                                của bạn sẽ được xử lý khi chúng tôi xác nhận đã
                                nhận được khoản thanh toán cho đơn hàng.
                              </p>
                            </div>
                          </li>
                          <li className="wc_payment_methods payment_method_cod">
                            <Field
                              id="payment_method_cod"
                              type="radio"
                              name="payment_method"
                              value="cod"
                              className="input-radio"
                              checked={paymentMethod === "cod"}
                              onChange={handlePaymentMethodChange}
                            />
                            <label htmlFor="payment_methods_cod">
                              Thanh toán khi nhận hàng
                            </label>
                            <div className="payment_box payment_methods_cod" style= {{display: paymentMethod === "cod" ? "block" : "none"}}>
                              <p>Thanh toán khi nhận hàng bằng tiền mặt</p>
                            </div>
                          </li>
                        </ul>
                        <div className="form-row place-order">
                          <div className="term-and-conditions-wrapper">
                            <p>
                              Dữ liệu cá nhân của bạn sẽ được sử dụng để thực
                              hiện đơn hàng, hỗ trợ cải thiện trải nghiệm của
                              bạn trên website và cho các mục đích khác được
                              miêu tả ở trong{" "}
                              <NavLink>chính sách bảo mật</NavLink> của chúng
                              tôi
                            </p>
                          </div>
                          <div className="btn_order_container">
                          <button
                            className="button alt"
                            name="checkout_place_order"
                            id="place_order"
                          >
                            Xác nhận
                          </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className="checkout-countdown">
        <div className="countdown-time">
          <span className="countdown-text">Bạn còn </span>
          <span className="countdown-timer">{formatTime(seconds)}</span>
          <span className="coutdown-notice"> phút để hoàn tất đơn hàng</span>
        </div>
      </div>
      <Footer />
    </div>
  );
}
