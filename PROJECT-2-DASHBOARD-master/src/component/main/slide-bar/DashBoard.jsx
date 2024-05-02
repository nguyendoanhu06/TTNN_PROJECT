import React, { useState, useEffect, useContext } from 'react';
import SlideBar from '../SlideBar';
import SlideContent from '../SlideContent';
import { FirebaseContext } from '../../context/FirebaseProvider.jsx';
import { addDoc, deleteDoc, onSnapshot, query, doc, updateDoc } from 'firebase/firestore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaSort } from "react-icons/fa";

export default function DashBoard(props) {
  console.log(props.login)
  // ----- Call data -----//
  const [data, setData] = useState([]);
  const { messCollect, bookingFilm } = useContext(FirebaseContext);

  useEffect(() => {
    const unsubscribeMessCollect = fetchCollection(messCollect, setData);
    const unsubscribeBookingFilm = fetchCollection(bookingFilm, setBooking);

    return () => {
      unsubscribeMessCollect();
      unsubscribeBookingFilm();
    };
  }, []);

  //----- Call booking data -----//
  const [booking, setBooking] = useState([]);

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

  // Function to fetch collection data and return unsubscribe function
  const fetchCollection = (collectionRef, setDataCallback) => {
    const q = query(collectionRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const temp = [];
      querySnapshot.forEach((doc) => {
        temp.push({ ...doc.data(), id: doc.id });
      });
      setDataCallback(temp);
    });
    return unsubscribe;
  };


  //----- Handle data chart -----// 
  const [storeSeat, setStoreSeat] = useState([]);
  useEffect(() => {
    const tempStoreSeat = [];
    data.forEach(item => {
      const totalSeats = calculateSeats(item.id);
      if (totalSeats !== 0) {
        tempStoreSeat.push({ name: item.nameFilm, 'doanh thu': totalSeats * 85000, totalSeats, ...item });
      }
    });
    tempStoreSeat.sort((a, b) => {
      return b.totalSeats - a.totalSeats;
    })
    setStoreSeat(tempStoreSeat);
  }, [data]);
  console.log(storeSeat)
  const calculateSeats = (idFilm) => {
    const bookingsForFilm = booking.filter(item => item.idFilm === idFilm);
    let totalSeats = 0;
    bookingsForFilm.forEach(booking => {
      totalSeats += booking.soGhe.length;
    });
    return totalSeats;
  };

  //----- Next and Previous button -----//
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(storeSeat.length / itemsPerPage);
  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };
  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [storeSeat]);

  const renderContent = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = storeSeat.slice(indexOfFirstItem, indexOfLastItem);
    return currentItems.map((film, index) => {
      return (
        <tr key={film.id} className='table-film'>
          <td className='table-index'>
            <span>{index + 1 + (currentPage - 1) * itemsPerPage}</span>
          </td>
          <td className='table-tr td'>
            <img src={film.img} alt="film" />
            <div>
              <h5 onClick={() => { navigate(`/detail/${film.id}`) }}>{film.nameFilm}</h5>
              <p>ID:{film.id}</p>
            </div>
          </td>
          <td className='table-tr td'>
            <h5>{film.infoFilm.catagory.join(' / ')}</h5>
          </td>
          <td className='table-tr td'>{film.totalSeats}</td>
          <td className='table-tr td'>{Number(film.totalSeats * 85000).toLocaleString()} VND</td>
        </tr>
      );
    });
  };

  return (
    <div className='home'>
      <div className={slideBarClosed ? 'slide-bar close' : 'slide-bar'}>
        <SlideBar darkMode={!darkMode} toggleTheme={toggleTheme} logout={props.logout} logout2={props.logout2} />
      </div>
      <div className={darkMode ? 'slide-content sun' : 'slide-content moon'} >
        <SlideContent closeSlideBar={closeSlideBar} />
        <div className="slide-container">
          <ResponsiveContainer className="chart" height={300}>
            <LineChart
              width={600}
              height={300}
              data={storeSeat}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey='doanh thu' stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
          <div className="static">
            <h5>Thống kê biểu đồ</h5>
          </div>
          <div className="films-table">
            <table>
              <thead className='table-thead'>
                <tr>
                  <th className='table-tr'>
                    <span>No.</span>
                  </th>
                  <th className='table-tr th'>
                    <span>Film</span>
                  </th>
                  <th className='table-tr th'>
                    <span>Category</span>
                  </th>
                  <th className='table-tr th'>
                    <span>Total Seats Booked</span>
                  </th>
                  <th className='table-tr th'>
                    <span>Total Revenue</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {renderContent()}
              </tbody>
            </table>
          </div>
          <div className="films-footer">
            <div>
              {currentPage - 1 !== 0 && storeSeat.length > itemsPerPage ? <button onClick={prevPage} disabled={currentPage === 1} className='pagination-button'>{currentPage - 1}</button> : ''}
            </div>
            <div>
              <button disabled className='pagination-button current'>{currentPage}</button>
            </div>
            <div>
              {currentPage !== totalPages && storeSeat.length > itemsPerPage ? <button onClick={nextPage} disabled={currentPage === totalPages} className='pagination-button'>{currentPage + 1}</button> : ''}
            </div>
            <div>
              <span>Page: {currentPage} / {totalPages}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
