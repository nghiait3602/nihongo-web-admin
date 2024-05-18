import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Home from './page/Home';
import QLTV from './page/QLTV';
import QLTV_CT from './page/QLTV_CT';
import QLTV_NEW from './page/QLTV_NEW';
import QLNP from './page/QLNP';
import QLNP_CT from './page/QLNP_CT';
import QLNP_NEW from './page/QLNP_NEW';
import QLKanji from './page/QLKanji';
import QLKanji_CT from './page/QLKanji_CT';
import QLKanji_NEW from './page/QLKanji_NEW';
import QLKH from './page/QLKH';
import QLKH_CT from './page/QLKH_CT';
import QLBT from './page/QLBT';
import QLBT_CT from './page/QLBT_CT';
import QLBT_NEW from './page/QLBT_NEW';
import QLBH from './page/QLBH';
import QLBH_CT from './page/QLBH_CT';
import QLBH_NEW from './page/QLBH_NEW';
import QLBD from './page/QLBD';
import QLBD_NEW from './page/QLBD_NEW';
import QLBD_CT from './page/QLBD_CT';
import QLUSER from './page/QLUSER';
import QLUSER_CT from './page/QLUSER_CT';
import QLUSER_NEW from './page/QLUSER_NEW';
import PageTest from './page/pageTest';
import Forgot from './page/Forgot';
import Login from './page/Login';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAuth, authSelector } from './redux/reducers/authReducer';
function App() {
  const dispatch = useDispatch();
  const authSelect = useSelector(authSelector);
  const auth = localStorage.getItem('auth');
  useEffect(() => {
    checkLogin();
    console.log(authSelect);
  }, []);
  function checkLogin() {
    console.log(auth);
    auth && dispatch(addAuth(JSON.parse(auth)));
  }
  return <Router>{authSelect.token ? <HomeRouter /> : <AuthRouter />}</Router>;
}
function AuthRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/forgot" element={<Forgot />}></Route>
    </Routes>
  );
}
function HomeRouter() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content-wrapper">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/qltv" element={<QLTV />} />
          <Route path="/qltv/chi-tiet-tu-vung/:id" element={<QLTV_CT />} />
          <Route path="/qltv/tao-moi" element={<QLTV_NEW />} />
          <Route path="/qlnp" element={<QLNP />} />
          <Route path="/qlnp/chi-tiet-ngu-phap/:id" element={<QLNP_CT />} />
          <Route path="/qlnp/tao-moi" element={<QLNP_NEW />} />
          <Route path="/qlkanji" element={<QLKanji />} />
          <Route path="/qlkanji/chi-tiet-kanji/:id" element={<QLKanji_CT />} />
          <Route path="/qlkanji/tao-moi" element={<QLKanji_NEW />} />
          <Route path="/qlkh" element={<QLKH />} />
          <Route path="/qlkh/chi-tiet-kh/:id" element={<QLKH_CT />} />
          <Route path="/qlbt" element={<QLBT />} />
          <Route path="/qlbt/chi-tiet-bai-tap/:id" element={<QLBT_CT />} />
          <Route path="/qlbt/tao-moi" element={<QLBT_NEW />} />
          <Route path="/qlbh" element={<QLBH />} />
          <Route path="/qlbh/chi-tiet-bai-hoc/:id" element={<QLBH_CT />} />
          <Route path="/qlbh/tao-moi" element={<QLBH_NEW />} />
          <Route path="/qlbd" element={<QLBD />} />
          <Route path="/qlbd/chi-tiet-bai-doc/:id" element={<QLBD_CT />} />
          <Route path="/qlbd/tao-moi" element={<QLBD_NEW />} />
          <Route path="/qluser" element={<QLUSER />} />
          <Route path="/qluser/chi-tiet-user/:id" element={<QLUSER_CT />} />
          <Route path="/qluser/tao-moi" element={<QLUSER_NEW />} />
          <Route path="/pageTest" element={<PageTest />} />
        </Routes>
      </div>
      <Sidebar />
      <Footer />
    </div>
  );
}
export default App;
