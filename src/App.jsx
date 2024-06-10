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
import Home from './page/home/Home';
import QLTV from './page/tuvung/QLTV';
import QLTV_CT from './page/tuvung/QLTV_CT';
import QLTV_NEW from './page/tuvung//QLTV_NEW';
import QLNP from './page/nguphap/QLNP';
import QLNP_CT from './page/nguphap/QLNP_CT';
import QLNP_NEW from './page/nguphap/QLNP_NEW';
import QLKanji from './page/kanji/QLKanji';
import QLKanji_CT from './page/kanji/QLKanji_CT';
import QLKanji_NEW from './page/kanji/QLKanji_NEW';
import QLKH from './page/khoahoc/QLKH';
import QLKH_CT from './page/khoahoc/QLKH_CT';
import QLBT from './page/baitap/QLBT';
import QLBT_CT from './page/baitap/QLBT_CT';
import QLBT_NEW from './page/baitap/QLBT_NEW';
import QLBH from './page/baihoc/QLBH';
import QLBH_CT from './page/baihoc/QLBH_CT';
import QLBH_NEW from './page/baihoc/QLBH_NEW';
import QLBD from './page/baidoc/QLBD';
import QLBD_NEW from './page/baidoc/QLBD_NEW';
import QLBD_CT from './page/baidoc/QLBD_CT';
import QLUSER from './page/user/QLUSER';
import QLUSER_CT from './page/user/QLUSER_CT';
import QLUSER_NEW from './page/user/QLUSER_NEW';
import Forgot from './page/forgot/Forgot';
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
        </Routes>
      </div>
      <Sidebar />
      <Footer />
    </div>
  );
}
export default App;
