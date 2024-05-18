import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { authSelector, removeAuth } from '../redux/reducers/authReducer';
import { useEffect, useState } from 'react';
import userApi from '../Api/userApi';

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);
  const [user, setUser] = useState();
  useEffect(() => {
    const getMe = async () => {
      try {
        const res = await userApi.UserHandler('/me', '', 'get', auth.token);
        console.log(res.data.data);
        setUser(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMe();
  });
  function testLogout(e) {
    e.preventDefault();
    localStorage.removeItem('auth');
    dispatch(removeAuth());
    navigate('/login');
  }
  return (
    <>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              {user ? (
                <img
                  src={user.photo}
                  className="img-circle elevation-2"
                  alt="User Image"
                />
              ) : (
                <img
                  src="../src/assets/Img/iconapp.png"
                  className="img-circle elevation-2"
                  alt="User Image"
                />
              )}
            </div>
            <div className="info">
              {user ? (
                <a href="#" className="d-block">
                  {user.name}
                </a>
              ) : (
                <a href="#" className="d-block">
                  ADMIN
                </a>
              )}
            </div>
          </div>
          <div className="form-inline">
            <div className="input-group" data-widget="sidebar-search">
              <input
                className="form-control form-control-sidebar"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <div className="input-group-append">
                <button className="btn btn-sidebar">
                  <i className="fas fa-search fa-fw" />
                </button>
              </div>
            </div>
          </div>
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-header">THANH CÔNG CỤ</li>
              <li className="nav-item">
                <NavLink to="/qlkh" className="nav-link">
                  <i className="nav-icon far fa-calendar-alt" />
                  <p>Quản lý khóa học</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/qlbh" className="nav-link">
                  <i className="nav-icon fas fa-book"></i>
                  <p>Quản lý bài học</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/qltv" className="nav-link">
                  <i className="nav-icon fas fa-pen-nib" />
                  <p>Quản lý từ vựng</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/qlkanji" className="nav-link">
                  <i className="nav-icon fas fa-font" />
                  <p>Quản lý kanji</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/qlnp" className="nav-link">
                  <i className="nav-icon far fa-file-alt" />
                  <p>Quản lý ngữ pháp</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/qlbd" className="nav-link">
                  <i className="nav-icon fas fa-comment" />
                  <p>Quản lý bài đọc</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/qlbt" className="nav-link">
                  <i className="nav-icon fas fa-pencil-ruler" />
                  <p>Quản lý bài tập</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/qluser" className="nav-link">
                  <i className="nav-icon fas fa-user-alt" />
                  <p>Quản lý user</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <button className="btn btn-info" onClick={testLogout}>
                  LogOut
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
