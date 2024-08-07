import React, { useState, useEffect, useContext } from 'react';
import SlideBar from '../SlideBar.jsx'
import { useFormik } from 'formik';
import SlideContent from '../SlideContent.jsx'
import { FirebaseContext } from '../../context/FirebaseProvider.jsx';
import { addDoc, deleteDoc, onSnapshot, query, doc, updateDoc } from 'firebase/firestore';

export default function Invoice() {


  const { auth } = useContext(FirebaseContext)
  let checkAuth = localStorage.getItem('gmail')
  let { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      gmail: "",
      pass: "",
      role: '',
      phone: ""
    },
    onSubmit: async (values) => {
      await addDoc(auth, values)
    }
  })
  let [data, setData] = useState([])

  useEffect(() => {
    const q = query(auth);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const temp = [];
      querySnapshot.forEach((doc) => {
        temp.push({ ...doc.data(), id: doc.id });
      });
      setData(temp)
    });
  }, [])
  let findItemAuth = data.find((it) => {
    return it.gmail == checkAuth
  })


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
  const deleteRole = async (id) => {

    await deleteDoc(doc(auth, id));

  }
  const handleChangeRole = async (event, id, index) => {
    let newData = [...data]
    newData[index].role = event.target.value
    setData(newData)
    await updateDoc(doc(auth, id), newData[index])

  };
  console.log(findItemAuth?.role, "admin")
  console.log(findItemAuth?.role == "admin")
  const renderDS = () => {
    return data.map((it, index) => {
      let disable = it.gmail == "nhunda06@gmail.com" ? true : false
      return <tr key={it.id}>
        <td>{index + 1}</td>
        <td>{it.name}</td>
        <td>{it.gmail}</td>
        <td>{it.id}</td>
        <td>{it.phone}</td>
        <td>
          <input disabled={disable} onChange={() => handleChangeRole(event, it.id, index)} value={it.role} />
        </td>
        <td>{it.gmail !== "nhunda06@gmail.com" ? <button style={{ marginTop: "10px" }} className='btn btn-danger' onClick={() => { deleteRole(it.id) }}>Delete</button> : ""}</td>
      </tr>
    })
  }
  return (
    <div className='home'>
      <div className={slideBarClosed ? 'slide-bar close' : 'slide-bar'}>
        <SlideBar darkMode={!darkMode} toggleTheme={toggleTheme} />
      </div>
      {findItemAuth?.role == "admin" ? <div className={darkMode ? 'slide-content sun' : 'slide-content moon'} >
        <SlideContent closeSlideBar={closeSlideBar} />
        <div className="slide-container">
          <h1>Phân quyền</h1>
          <span className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#exampleModal1`}>Add User</span>
          <div>
            {/* Modal */}
            <div className="modal fade" id={`exampleModal1`} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Thêm mới User</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                  </div>
                  <div className="modal-body">

                    <form onSubmit={handleSubmit}>
                      <h4>Profile</h4>
                      <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="name" name="name" onChange={handleChange} required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="gmail" onChange={handleChange} required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="pass" onChange={handleChange} required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="string">Quyền hạn</label>
                        <input type="string" id="password" name="role" onChange={handleChange} required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="string">Phone</label>
                        <input type="tel" id="phone" name="phone" onChange={handleChange} required />
                      </div>
                      <button type="submit">Add User</button>
                    </form>

                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <h4>Danh sách quản trị viên</h4>
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Full name</th>
                <th>Gmail</th>
                <th>UserID</th>
                <th>phone</th>
                <th>Role</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {renderDS()}
            </tbody>
          </table>
        </div>
      </div> : <div className={darkMode ? 'slide-content sun' : 'slide-content moon'} >
        <SlideContent closeSlideBar={closeSlideBar} />
        <h1 className='noAu'>No Authentication</h1>
      </div>}
    </div>
  )
}
