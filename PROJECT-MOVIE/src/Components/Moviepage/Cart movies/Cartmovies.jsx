import React, { useContext, useEffect, useState } from "react";
import "../Cart movies/Cartmovies.css";
import Navbarcart from "../Cart movies/Navbarcart";
import { MdKeyboardArrowRight } from "react-icons/md";
import SEATMAP from "../Cart movies/SEATMAP.png";
import { FirebaseContext } from "../../../../Firebase/FirebaseProvider";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { MdEventSeat } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Footer from "../../Footer";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut 
} from "firebase/auth";

export default function Cartmovies() {
  const { movieId, scheduleId } = useParams();

  const { chairCollection, messCollect, bookingCollection } =
    useContext(FirebaseContext);
  const [chairs, setChairs] = useState([]);
  const [showData, setShowdata] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [listBookedSeats, setListBookedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();

  // get data of movie from id
  useEffect(() => {
    const fetchShowData = async () => {
      try {
        const showtimeDoc = await getDoc(doc(messCollect, movieId));
        setShowdata(showtimeDoc.data());
      } catch (error) {
        console.log("Error fetching showtime data:", error);
      }
    };

    fetchShowData();
  }, [messCollect, movieId]);

  // data seat and check booked seat
  useEffect(() => {
    const fetchChairs = async () => {
      try {
        const chairSnapshot = await getDocs(chairCollection);
        const chairData = chairSnapshot.docs.map((doc) => ({
          id: doc.id,
          soGhe: doc.data(),
        }));
        setChairs(chairData);
      } catch (error) {
        console.log("Error fetching chair data:", error);
      }
    };

    fetchChairs();
  }, [chairCollection]);

  // booked seat
  useEffect(() => {
    const fetchChairs = async () => {
      try {
        const bookedSnapShot = await getDocs(bookingCollection);
        const bookedData = bookedSnapShot.docs.map((doc) => ({
          id: doc.id,
          soGhe: doc.data(),
        }));
        setBookedSeats(bookedData);
      } catch (error) {
        console.log("Error fetching chair data:", error);
      }
    };

    fetchChairs();
  }, [bookingCollection]);

  // check seat
  let temp = [];

  const bookedSeatCheck = () => {
    for (let i = 0; i < bookedSeats.length; i++) {
      if (
        bookedSeats[i].soGhe.idShow === scheduleId &&
        bookedSeats[i].soGhe.idFilm === movieId
      ) {
        temp.push(bookedSeats[i].soGhe.soGhe);
      }
    }
  };
  bookedSeatCheck();

 // render seat
const renderSeats = () => {
  chairs.sort((a, b) => a?.soGhe.hang.localeCompare(b?.soGhe.hang));
  const normalSeats = [];
  let instructionCol = null;
  
  chairs.forEach((item, index) => {
    const formattedSeats = item.soGhe.danhSachGhe.map((seat) => ({ ...seat }));
  
    if (item?.soGhe.hang === "") {
      instructionCol = formattedSeats;
    } else {
      normalSeats.push(formattedSeats);
    }
  });
  
  return (
    <div >
  
      {normalSeats.map((formattedSeats, index) => (
        <div className="seat-container" key={index}>
          {formattedSeats.map((seat, index) => {
            let newTemp = temp.flat();
            let checked = newTemp.includes(seat.soGhe);
            let selectingChair = selectedSeats.includes(seat.soGhe);
  
            return (
              <span
                className={`seat ${checked ? "seatBooked" : ""} ${selectingChair ? "seatChoosing" : ""}`}
                onClick={() => {
                  if (!checked) {
                    handleSeatClick(seat.soGhe);
                  }
                }}
                key={index}
              >
                <div className="seat-detail">
                  <span>85.000đ</span>
                  <span>{seat.soGhe}</span>
                </div>
                <span className={`${checked ? "seatActive" : "seat-count"}`}>
                  {seat.soGhe}
                </span>
                <MdEventSeat />
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};


  // for side bar
  const [error, setError] = useState(false);
  const [showDiscountForm, setShowDiscountForm] = useState(false);

  const handleDiscountSubmit = () => {
    setError(true);
  };

  const handleSeatClick = (seatNumber) => {
    const isSeatSelected = selectedSeats.includes(seatNumber);

    if (isSeatSelected) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
      setTotalPrice(totalPrice - 85000);
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
      setTotalPrice(totalPrice + 85000);
    }
  };

  // check user
  const [user, setUser] = useState(null);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);
  // google login
  const handleSignInWithGoogle = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);

        navigate(`/checkout/${movieId}`, {
          state: {
            idFilm: movieId,
            idShow: scheduleId,
            soGhe: selectedSeats,
            totalPrice: totalPrice,
            userId: user.uid
          },
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleCheckout = () => {
    if (user) {
      navigate(`/checkout/${movieId}`, {
        state: {
          idFilm: movieId,
          idShow: scheduleId,
          soGhe: selectedSeats,
          totalPrice: totalPrice,
          userId: user.uid
        },
      });
    } else {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          setUser(user);
          navigate(`/checkout/${movieId}`, {
            state: {
              idFilm: movieId,
              idShow: scheduleId,
              soGhe: selectedSeats,
              totalPrice: totalPrice,
            },
          });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };
// logout
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("Đăng xuất thành công!");
      })
      .catch((error) => {
        console.error("Lỗi khi đăng xuất:", error);
      });
  };
  return (
    <div className="cart-movies">
      <div className="cart-movies_header">
        <Navbarcart isLoggedIn={user !== null}  onLogout={handleLogout}/>
        <div className="cart-header">
          <div className="cart-header_container">
            <p>
              Trang chủ <MdKeyboardArrowRight /> <span>Trang đặt vé</span>
            </p>
          </div>
        </div>
      </div>
      <div className="cart-movies_body">
        <div className="booking-cart">
          <div className="cart-content">
            <div className="seatmap">
              <div className="cart-error">
                <span className="cart-error-text">Đã có người đặt!</span>
              </div>
              <div className="img-seatmap">
                <div className="img-canvas">
                  <div className="imp-translate">
                    <div className="imp-scale">
                      <img src={SEATMAP} />
                      <div className="imp-object">{renderSeats()}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ul className="seat-instruction">
              <li className="available">
                <span className="box">
                  <MdEventSeat />
                </span>
                <span className="text">Ghế trống</span>
              </li>
              <li className="seat-notavailable">
                <span className="box">
                  <MdEventSeat />
                </span>
                <span className="text">Ghế đã được đặt</span>
              </li>
              <li className="choosing">
                <span className="box">
                  <MdEventSeat />
                </span>
                <span className="text">Ghế đang chọn</span>
              </li>
            </ul>
          </div>
          <div className="cart-sidebar">
            <div className="cart-info">
              <div className="cart-info_container">
                <h3 className="cart_title">Thông tin đặt vé</h3>
                <div className="content-card-info">
                  <span
                    className="cart_placeholder"
                    style={{
                      display: selectedSeats.length == 0 ? "block" : "none",
                    }}
                  >
                    Vui lòng chọn ghế bạn muốn
                  </span>
                  <div
                    className="item-cart-info"
                    style={{
                      display: selectedSeats.length > 0 ? "flex" : "none",
                    }}
                  >
                    <span>Số ghế</span>
                    <span>Giá</span>
                  </div>
                  <div className="content-card-item">
                    <div
                      className="item-info-map"
                      style={{
                        display: selectedSeats.length > 0 ? "flex" : "none",
                      }}
                    >
                      <div className="info-type-ticket">
                        <div className="wp-seat-info">
                          {selectedSeats.map((seat) => (
                            <span
                              className={`seat-1 ${
                                selectedSeats.length === 1
                                  ? "selected-seat"
                                  : ""
                              }`}
                            >
                              {seat}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="info-sub-price">
                        {totalPrice.toLocaleString()}đ
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="total-cart-info">
                <span className="text">Thành tiền</span>
                <span className="total-price">
                  {totalPrice.toLocaleString()}đ
                </span>
              </div>
              <div className="cart-discount">
                <a
                  onClick={() => setShowDiscountForm(true)}
                  style={{ display: showDiscountForm ? "none" : "block" }}
                >
                  Nhập mã giảm giá
                </a>
                <div
                  style={{ display: showDiscountForm ? "block" : "none" }}
                  className="form-discount"
                >
                  <div className="input-discount-code">
                    <input
                      type="text"
                      className="discount-code"
                      placeholder="Nhập mã giảm giá"
                    />
                  </div>
                  <button
                    className="cart-discount-submit"
                    onClick={handleDiscountSubmit}
                  >
                    Áp dụng
                  </button>
                  <IoIosCloseCircle
                    onClick={() => setShowDiscountForm(false)}
                  />
                  <p
                    className="error"
                    style={{ display: !error ? "none" : "block" }}
                  >
                    Mã giảm giá không hợp lệ
                  </p>
                </div>
              </div>
              <div
                className={
                  selectedSeats.length > 0
                    ? "cart-checkout-active"
                    : "cart-checkout"
                }
              >
                <div className="submit-load-more">
                  <div className="load-more"></div>
                </div>
                <button onClick={handleCheckout}>Đến trang thanh toán</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
