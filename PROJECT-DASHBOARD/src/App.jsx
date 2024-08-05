import HomePage from './component/main/HomePage.jsx';
import './App.css'
import { getAuth, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { FirebaseContext } from './component/context/FirebaseProvider.jsx';
import Login from './component/main/Login.jsx';
import { onSnapshot, query } from 'firebase/firestore';
function App() {
  let [data, setData] = useState([])
  const firebase = useContext(FirebaseContext)
  useEffect(() => {
      const q = query(firebase.auth);
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const temp = [];
          querySnapshot.forEach((doc) => {
              temp.push(doc.data().gmail);
          });
          setData(temp)
      });
  }, [])

  // check xem đăng nhập chưa
  const [user, setUser] = useState(null)
  const [user2, setUser2] = useState(false)
  const auth = getAuth();
  const { Googleprovider } = useContext(FirebaseContext); // Fix the import statement
  // HÀM LOGIN 
  const login = async () => {
    const provider = Googleprovider; // giả sử Googleprovider là một đối tượng GoogleAuthProvider
    provider.setCustomParameters({ prompt: 'select_account' }); // Dòng này buộc hiển thị tùy chọn tài khoản
    await signInWithPopup(auth, provider);
    localStorage.setItem('gmail', auth.currentUser?.email);

    localStorage.setItem('name', auth.currentUser?.displayName)
  }
  const login2 = (id)=>{
    localStorage.setItem('login', true);
    setUser2(true)
  }
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [])


  // logout
  const logout = () => {
    signOut(auth)
    setUser(null)
    history.pushState(null, null, location.href);
    localStorage.removeItem('gmail');

    window.onpopstate = function () {
      history.go(1);
    };
    
  }
  const logout2 = () => {
    localStorage.setItem('login', false);
    setUser2(false)
    localStorage.removeItem('gmail');
    window.onpopstate = function () {
      history.go(1);
    };
    window.location.reload()
  }

  // KIỂU tra nếu auth.currentUser là null thì bắt đăng nhập

  return (data.includes(user?.email))   ||localStorage.getItem('login')=="true" ? (
    <>
      <HomePage logout={logout} logout2={logout2} />
    </>
  ) : <div>
    <Login login={login} login2={login2} />
  </div>
    

  ;
}
export default App;