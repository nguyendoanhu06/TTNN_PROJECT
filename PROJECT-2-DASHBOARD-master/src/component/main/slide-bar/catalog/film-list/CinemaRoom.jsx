import React, { useContext, useEffect, useState } from 'react';
import SlideBar from '../../../SlideBar';
import SlideContent from '../../../SlideContent';
import { useParams } from 'react-router-dom';
import { FirebaseContext } from '../../../../context/FirebaseProvider';
import { addDoc, deleteDoc, onSnapshot, query, doc, updateDoc, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function CinemaRoom() {
  const param = useParams();

  // ----- Call data -----//
  const { messCollect } = useContext(FirebaseContext);

  const [mess, setMess] = useState(null);
  useEffect(() => {
    if (param.id) {
      const singledoc = doc(messCollect, param.id);
      const getMess = async () => {
        const data = await getDoc(singledoc);
        setMess(data.data());
        setShowDate(data.data().movieShowSchedule[0].id);
      };
      getMess();
    }
  }, [param.id, messCollect]);

  //----- Call data chair-----//
  let [data, setData] = useState([]);
  const { messCollectChair } = useContext(FirebaseContext);
  useEffect(() => {
    const q = query(messCollectChair);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const temp = [];
      querySnapshot.forEach((doc) => {
        temp.push({ ...doc.data(), id: doc.id });
      });
      setData(temp);
    });
  }, []);

  //----- Call booking data -----//
  let [booking, setBooking] = useState([]);
  const { bookingFilm } = useContext(FirebaseContext);
  useEffect(() => {
    const q = query(bookingFilm);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const temp = [];
      querySnapshot.forEach((doc) => {
        temp.push({ ...doc.data(), id: doc.id });
      });
      setBooking(temp);
    });
  }, []);

  // ----- Set up btn Close && Dark theme -----//
  const [slideBarClosed, setSlideBarClosed] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode !== null) {
      setDarkMode(JSON.parse(storedDarkMode));
    }
  }, []);

  const closeSlideBar = () => {
    setSlideBarClosed(!slideBarClosed);
  };

  const toggleTheme = () => {
    const updatedDarkMode = !darkMode;
    setDarkMode(updatedDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(updatedDarkMode));
  };

  // ----- Navigation -----//
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  // ----- Delete Ticket -----//
  const deleteTicket = async (sg) => {
    let temp = []
    let edit
    for (let i = 0; i < booking.length; i++) {
      if (booking[i].idFilm == param.id && booking[i].idShow == showDate) {
        temp.push(booking[i])
      }
    }
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].soGhe.includes(sg)) {
        edit = temp[i]
      }
    }
    let findindexGhe = edit.soGhe.findIndex((it) => {
      return it == sg
    })
    edit.soGhe.splice(findindexGhe, 1)
    await updateDoc(doc(bookingFilm, edit.id), edit);
  };

  // ----- Seat Counts-----//
  const seatCounts = () => {
    let bookedSeats = [];
    let listTicket = booking.filter((item) => {
      return item.idFilm == param.id && item.idShow == showDate;
    });
    listTicket.forEach(ticket => {

      if (!bookedSeats.includes(ticket.soGhe)) {
        bookedSeats.push(ticket.soGhe);
      }
    });
    let bookedCount = 0;
    for (let i = 0; i < bookedSeats.length; i++) {
      bookedCount += bookedSeats[i].length;
    }
    let availableCount = 132 - bookedCount;
    return { bookedCount, availableCount };
  };

  // ----- Select Show Date -----//
  const [showDate, setShowDate] = useState('');
  const handleData = (event) => {
    setShowDate(event.target.value);
  };


  let listCheck = booking.filter((item) => {
    return item.idFilm == param.id && item.idShow == showDate;
  })
  console.log(listCheck)

  //----- Detail Ticket -----//
  const [storeData, setStoreData] = useState(null);
  const detailTicket = (id, seatId) => {
    let checkeId = listCheck.find((item) => {
      return item.soGhe.includes(seatId);
    })
    setStoreData(checkeId);
  };
  // ----- Render Information -----//
  const renderInformation = () => {
    if (storeData !== null) {
      return (
        <div className="information-seat">
          <div className="information-seat">
            <div className="information-seat-item">
              <h5>Tên:</h5>
              <span>{storeData?.lastName} {storeData?.firstName} </span>
            </div>
            <div className="information-seat-item">
              <h5>Địa chỉ:</h5>
              <span>{storeData?.address}</span>
            </div>
            <div className="information-seat-item">
              <h5>Thanh toán bằng:</h5>
              <span>{storeData?.paymentMethod}</span>
            </div>
            <div className="flex-seat">
              <h5>Ghế: </h5>
              <div className="seat-list">
                {storeData.soGhe.map((it, index) => (
                  <span key={index}>{it}{index !== storeData.soGhe.length - 1 && ", "}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div className="information-seat"><h5>Ghế chưa có thông tin đặt vé</h5></div>;
    }
  };


  // ----- Render Seats -----//
  const renderSeat = () => {
    const sortedData = [...data].sort((a, b) => a.hang.localeCompare(b.hang));
    let listTicket = booking.filter((item) => {
      return item.idFilm == param.id && item.idShow == showDate;
    });
    return sortedData.map((item) => {
      return (
        <div key={item.hang} className='hangGhe'>
          <p className='ghe ghe'>{item.hang}</p>
          {item.danhSachGhe.map((ghe) => {
            let ghe2 = []
            for (let i = 0; i < listTicket.length; i++) {
              ghe2.push(listTicket[i]?.soGhe)
            }
            ghe2 = ghe2.flat()

            let checked = false
            if (ghe2.includes(ghe.soGhe)) {
              checked = true
            }
            let findId = listTicket.find((value) => {
              return value.soGhe == ghe.soGhe;
            });
            return (
              <div className='ghe' key={ghe.soGhe}>
                {checked == true ? (
                  <div className='dropdown'>
                    <ul className='dropdown-menu dropdown-menu-end' aria-labelledby='product-context-menu-5' style={{ position: 'absolute', inset: '0px auto auto 0px', margin: 0, transform: 'translate(-136px, 30px)' }} data-popper-placement='bottom-end'>
                      <li className={'dropdown-item btn btn-primary'} data-bs-toggle='modal' data-bs-target='#exampleModal' onClick={() => { detailTicket(findId?.id, ghe.soGhe) }}>Xem chi tiết</li>
                      <li><hr className='dropdown-divider' /></li>
                      <li className='dropdown-item text-danger' onClick={() => { deleteTicket(`${ghe.soGhe}`); Swal.fire({ title: "Delete!", text: "Xóa thành công!", icon: "success" }); }}>Hủy vé</li>
                    </ul>
                  </div>
                ) : <div className='dropdown'>
                  <ul className='dropdown-menu dropdown-menu-end' aria-labelledby='product-context-menu-5' style={{ position: 'absolute', inset: '0px auto auto 0px', margin: 0, transform: 'translate(-136px, 30px)' }} data-popper-placement='bottom-end'>
                    <li className='ml-2'>Ghế {ghe.soGhe} chưa đặt</li>
                  </ul>
                </div>
                }
                <motion.i whileHover={{ scale: 1.5 }} type='button' id='product-context-menu-11' data-bs-toggle='dropdown' aria-expanded='true' aria-label='More' fdprocessedid='gqiqa5m' className={`fa fa-couch ${checked ? 'active' : ''} btn btn-sa-muted btn-sm`} key={ghe.soGhe}></motion.i>
                <p>{ghe.soGhe}</p>
              </div>
            );
          })}
        </div>
      );
    });
  };


  // ----- Ticket Price -----//
  const calculatePrice = () => {
    const { bookedCount } = seatCounts();
    if (!mess || !mess.movieShowSchedule) return 0;
    const selectedSchedule = mess.movieShowSchedule.find(schedule => schedule.id === showDate);
    if (!selectedSchedule) return 0;
    const ticketPrice = selectedSchedule.price;
    const totalPrice = (bookedCount * ticketPrice).toLocaleString() + "VND";
    return totalPrice;
  };

  return (
    <div className='home'>
      <div className={slideBarClosed ? 'slide-bar close' : 'slide-bar'}>
        <SlideBar darkMode={!darkMode} toggleTheme={toggleTheme} />
      </div>
      <div className={darkMode ? 'slide-content sun' : 'slide-content moon'}>
        <SlideContent closeSlideBar={closeSlideBar} />
        <div className='slide-container'>
          <div className='cinema-header'>
            <div className='film-name'>
              <div onClick={goBack} className='back'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='back'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z' />
                </svg>
              </div>
              <h2>{mess && mess.nameFilm}</h2>
            </div>
            <div className='select-option'>
              <select name='' id='' onChange={handleData}>
                {mess?.movieShowSchedule.map((value, index) => {
                  return <option value={value.id} key={value.id}>{value?.dayShow} - {value?.timeShow}</option>;
                })}
              </select>
            </div>
          </div>
          <div className='cinema-content'>
            <div className='cinema-left'>
              <div className='screen'></div>
              <div className='cinema-seat'>{renderSeat()}</div>
            </div>
            <div className='cinema-right'>
              <h5>Thông tin phòng chiếu phim </h5>
              {/* Modal */}
              <div className='modal fade' id='exampleModal' tabIndex={-1} aria-labelledby='exampleModalLabel' aria-hidden='true'>
                <div className='modal-dialog'>
                  <div className='modal-content'>
                    <div className='modal-header'>
                      <h1 className='modal-title fs-5' id='exampleModalLabel'>Thông tin ghế</h1>
                      <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' />
                    </div>
                    <div className='modal-body'>
                      {renderInformation()}
                    </div>
                    <div className='modal-footer'>
                      <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Close</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className='cinema-selection'>
                <div className='loaiGhe'><i className='fa fa-couch chuaDat'></i><span>Ghế chưa đặt: ({seatCounts().availableCount})</span></div>
                <div className='loaiGhe'><i className='fa fa-couch daDat'></i><span>Ghế đã đặt: ({seatCounts().bookedCount})</span></div>
                <h5> Doanh thu : {calculatePrice()}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
