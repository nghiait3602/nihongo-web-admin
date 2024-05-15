import { useState, useEffect } from "react";

import userApi from "../Api/userApi";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function QLUSER() {
  const auth = useSelector(authSelector);
  const [user, setUser] = useState([]);
  const [reloadPage, setReloadPage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userApi.UserHandler(
          "/",
          null,
          "get",
          auth.token
        );
        if (response.status === "success") {
          const responseData = response.data.data;
          setUser(responseData);
        }
      } catch (error) {
        console.error("Loi fetch data: ", error);
      }
    };
    fetchData();
  }, [reloadPage]);

  const deleteData = async (id) => {
    try {
      await userApi.UserHandler(`/${id}`, null, "delete", auth.token);
      setReloadPage(!reloadPage);
    } catch (error) {
      console.error("Lỗi khi xóa user: ", error);
      setReloadPage(!reloadPage);
    }
  };

  const xacNhanDel = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa user này không?")) {
      deleteData(id);
      toast.success("Xóa user thành công!", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  function UserItem({ user }) {
    return (
      <Link
        to={`/qluser/chi-tiet-user/${user._id}`}
        className="btn btn-primary btn-sm"
        style={{ marginRight: "5px" }}
      >
        <i className="fas fa-folder" style={{ marginRight: "5px" }}></i>
        Xem chi tiết
      </Link>
    );
  }

  return (
    <>
      <ToastContainer />
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Tất cả user</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/home">Home</a>
                </li>
                <li className="breadcrumb-item active">Tất cả user</li>
              </ol>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <div className="card-tools">
              <Link
                to={`/qluser/tao-moi`}
                className="btn btn-warning btn-sm"
                style={{ marginRight: "5px" }}
              >
                <i
                  className="fas fa-plus-circle"
                  style={{ marginRight: "5px" }}
                ></i>
                Thêm admin
              </Link>
              <button
                type="button"
                className="btn btn-tool"
                data-card-widget="collapse"
                title="Collapse"
              >
                <i className="fas fa-minus" />
              </button>
            </div>
            <h5>Bảng admin</h5>
          </div>
          <div className="card-body p-0">
            <table className="table table-striped projects">
              <thead>
                <tr>
                  <th style={{ width: "1%" }}>STT</th>
                  <th style={{ width: "10%" }}>Name</th>
                  <th style={{ width: "10%" }}>Avatar</th>
                  <th style={{ width: "10%" }}>Email</th>
                  <th style={{ width: "10%" }} className="text-center">
                    Trạng thái
                  </th>
                  <th style={{ width: "10%" }}></th>
                </tr>
              </thead>
              <tbody>
                {user
                  .filter((user) => user.role === "admin")
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <a>{item.name}</a>
                        <br />
                        <small>Quyền: {item.role}</small>
                      </td>
                      <td>
                        <ul className="list-inline">
                          <li className="list-inline-item">
                            <img
                              alt="Avatar"
                              className="table-avatar"
                              src={item.photo}
                            />
                          </li>
                        </ul>
                      </td>
                      <td>
                        <a>{item.email}</a>
                        <br />
                      </td>
                      <td className="project-state">
                        <span className="badge badge-success">Đang mở</span>
                      </td>
                      <td className="project-actions text-right">
                        <UserItem key={item._id} user={item} />
                        <a
                          className="btn btn-danger btn-sm"
                          onClick={() => xacNhanDel(item._id)}
                        >
                          <i
                            className="fas fa-trash"
                            style={{ marginRight: "5px" }}
                          ></i>
                          Xóa
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <div className="card-tools">
              <button
                type="button"
                className="btn btn-tool"
                data-card-widget="collapse"
                title="Collapse"
              >
                <i className="fas fa-minus" />
              </button>
            </div>
            <h5>Bảng user</h5>
          </div>
          <div className="card-body p-0">
            <table className="table table-striped projects">
              <thead>
                <tr>
                  <th style={{ width: "1%" }}>STT</th>
                  <th style={{ width: "10%" }}>Name</th>
                  <th style={{ width: "10%" }}>Avatar</th>
                  <th style={{ width: "10%" }}>Email</th>
                  <th style={{ width: "10%" }} className="text-center">
                    Trạng thái
                  </th>
                  <th style={{ width: "10%" }}></th>
                </tr>
              </thead>
              <tbody>
                {user
                  .filter((user) => user.role === "user")
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <a>{item.name}</a>
                        <br />
                        <small>Quyền: {item.role}</small>
                      </td>
                      <td>
                        <ul className="list-inline">
                          <li className="list-inline-item">
                            <img
                              alt="Avatar"
                              className="table-avatar"
                              src={item.photo}
                            />
                          </li>
                        </ul>
                      </td>
                      <td>
                        <a>{item.email}</a>
                        <br />
                      </td>
                      <td className="project-state">
                        <span className="badge badge-success">Đang mở</span>
                      </td>
                      <td className="project-actions text-right">
                        <UserItem key={item._id} user={item} />
                        <a
                          className="btn btn-danger btn-sm"
                          onClick={() => xacNhanDel(item._id)}
                        >
                          <i
                            className="fas fa-trash"
                            style={{ marginRight: "5px" }}
                          ></i>
                          Xóa
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default QLUSER;
