import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import Bannersidepage from './Bannersidepage'
import { TiTick } from "react-icons/ti";
import { FirebaseContext } from '../../Firebase/FirebaseProvider';
import { deleteDoc, doc, getDocs, onSnapshot, query } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import "./StyleInfo.css"
import Footer from './Footer';
export default function InfoCheckout() {
    // data seat and check booked seat
    let auth = getAuth()
    const { chairCollection, bookingCollection, messCollect } =
        useContext(FirebaseContext);
    const [chairs, setChairs] = useState([]);
   

//   // GET ALL DATA
  useEffect(() => {
      const q = query(bookingCollection);
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const temp = [];
          querySnapshot.forEach((doc) => {
              temp.push({ soGhe:doc.data(), id: doc.id });
          });
          setChairs(temp)
      });
  }, [])


console.log(chairs)


    
    // GET ALL DATA
    let [multilMess, setMultiMess] = useState([])
    useEffect(() => {
        const q = query(messCollect);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const temp = [];
            querySnapshot.forEach((doc) => {
                temp.push({ ...doc.data(), id: doc.id });
            });
            setMultiMess(temp)
        });
    }, [])
    let data = chairs.filter((item) => {
        return item.soGhe.uid == auth.currentUser?.uid
    })
    const renderInfoCustormer = () => {
        return <div className="customer-container">
            <img style={{ borderRadius: "100%" }} src={auth.currentUser?.photoURL} />
            <div className="customer-info">
            <p><span>Tên khách hàng </span>:{auth.currentUser?.displayName}</p>
            <p><span>Email</span> :{auth.currentUser?.email}</p>
            </div>
        </div>
    }
  
    const deleteTicket = async (id) => {
        let result =confirm("XÁC NHẬN HỦY?")
        if(result){
            await deleteDoc(doc(bookingCollection, id))
            alert("HỦY VÉ THÀNH CÔNG")
        }
       
        
    }
    const renderTicket = () => {
        return data.map((it, index) => {
            let findFlim = multilMess.find((it2) => {
                return it2.id == it.soGhe.idFilm
            })
            let findSlot = findFlim.movieShowSchedule.find((it2) => {
                return it2.id == it.soGhe.idShow
            })
            return <tr key={index}>
                <td>{index + 1}</td>
                <td>{it.soGhe.lastName} {it.soGhe.firstName}</td>
                <td>{findFlim.nameFilm}</td>
                <td>{findSlot.timeShow} {findSlot.dayShow}</td>
                <td>{findSlot.room}</td>
                <td>{it.soGhe.soGhe.join(' ,')}</td>
                <td><button onClick={() => { deleteTicket(it.id) }}>Hủy vé </button></td>
            </tr>
        })
    }
    return (
        <div className="success-page">
            <div className="success-header">
                <Navbar />
                <Bannersidepage />
                <img
                    src="https://demo.ovatheme.com/aovis/wp-content/uploads/2023/02/image-lines-header.jpg"
                    className="headerimg"
                ></img>
            </div>
            <div className='ContentCustomer'>
                <div className='contentLetf'>
                    <h4>Vé đã đặt</h4>
                    <table  >
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Họ tên trên vé</th>
                                <th>Tên phim</th>
                                <th>Thời gian</th>
                                <th>Phòng chiếu</th>
                                <th>Số ghế</th>
                                <th>Hủy vé</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderTicket()}

                        </tbody>
                    </table>
                </div>
                <div className='contentRight'>
                    <h4>Thông tin khách hàng</h4>
                    {renderInfoCustormer()}
                </div>
            </div>
            <div className="success-footer">
                <Footer/>
            </div>
        </div>
    )
}
