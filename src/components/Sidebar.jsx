import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { removeAuth } from "../redux/reducers/authReducer";

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function testLogout(e) {
    e.preventDefault();
    localStorage.removeItem("auth");
    dispatch(removeAuth());
    navigate("/login");
  }
  return (
    <>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="/dist/img/user2-160x160.jpg"
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div className="info">
              <a href="#" className="d-block">
                Alexander Pierce
              </a>
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
              <li className="nav-header">EXAMPLES</li>
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
                <button onClick={testLogout}>LogOut</button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
