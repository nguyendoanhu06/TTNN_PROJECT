import React, { useContext, useEffect, useState } from 'react'
import { FaGoogle } from "react-icons/fa";
import { useFormik } from 'formik';
import { FirebaseContext } from '../context/FirebaseProvider';
import { onSnapshot, query } from 'firebase/firestore';
export default function Login(props) {

    let [data, setData] = useState([])
    let [data2, setData2] = useState([])
    const { auth } = useContext(FirebaseContext)
    useEffect(() => {
        const q = query(auth);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const temp = [];
            const temp2 = [];
            querySnapshot.forEach((doc) => {
                temp.push({ ...doc.data(), id: doc.id });
            });
            setData(temp)
        });
    }, [])


    let { values, handleChange, handleSubmit } = useFormik({
        initialValues: {
            gmail: "",
            pass: "",
        },
        onSubmit: values => {
            let findindex = data.findIndex((it) => {
                return it.gmail == values.gmail
            })
            if (findindex != -1) {
                console.log(data[findindex])
                if (data[findindex].pass == values.pass) {
                    props.login2(true)
                    localStorage.setItem('gmail', values.gmail);
                    localStorage.setItem('name', data[findindex].name)
                }
                else {
                }
            }
        }
    })
    return (
        <div  >
            <div className="login">
                <div className="box">
                    <span className="borderLine" />
                    <form onSubmit={handleSubmit}>
                        <h2>Sign in</h2>
                        <div className="inputBox">
                            <input id='gmail' value={values.gmail} onChange={handleChange} type="text" required="required" />
                            <span>UserName</span>
                            <i />
                        </div>
                        <div className="inputBox">
                            <input id='pass' value={values.pass} onChange={handleChange} type="password" required="required" />
                            <span>Password</span>
                            <i />
                        </div>
                        <div className="link">
                            <a href="#">Forgot Password</a>
                            <a href="#">Signup</a>
                        </div>
                        <button className='btn btn-success mb-3' type='submit' >submit</button>

                        <div className="gmail">
                            <button onClick={() => { props.login() }}>
                                <div className="icon-google">
                                    <FaGoogle color='red' />
                                </div>
                                Gmail
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
