import { useState, useEffect } from "react";

import tuVungApi from "../Api/tuVungApi";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function QLTV() {
  const auth = useSelector(authSelector);
  const [tuVung, setTuVung] = useState([]);
  const [reloadPage, setReloadPage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await tuVungApi.TuVungHandler(
          "/",
          null,
          "get",
          auth.token
        );
        if (response.status === "success") {
          const responseData = response.data.data;
          setTuVung(responseData);
        }
      } catch (error) {
        console.error("Loi fetch data: ", error);
      }
    };
    fetchData();
  }, [reloadPage]);

  const deleteData = async (id) => {
    try {
      await tuVungApi.TuVungHandler(`/${id}`, null, "delete", auth.token);
      setReloadPage(!reloadPage);
    } catch (error) {
      console.error("Lỗi khi xóa từ vựng: ", error);
      setReloadPage(!reloadPage);
    }
  };
  const xacNhanDel = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa từ vựng này không?")) {
      deleteData(id);
      toast.success("Xóa từ vựng thành công!", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  function TVItem({ tuvung }) {
    return (
      <Link
        to={`/qltv/chi-tiet-tu-vung/${tuvung._id}`}
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
              <h1>Tất cả từ vựng</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/home">Home</a>
                </li>
                <li className="breadcrumb-item active">Tất cả từ vựng</li>
              </ol>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <Link
              to={`/qltv/tao-moi`}
              className="btn btn-warning btn-sm"
              style={{ marginRight: "5px" }}
            >
              <i
                className="fas fa-plus-circle"
                style={{ marginRight: "5px" }}
              ></i>
              Thêm từ vựng
            </Link>
            <div className="card-tools">
              <button
                type="button"
                className="btn btn-tool"
                data-card-widget="collapse"
                title="Collapse"
              >
                <i className="fas fa-minus" />
              </button>
              <button
                type="button"
                className="btn btn-tool"
                data-card-widget="remove"
                title="Remove"
              >
                <i className="fas fa-times" />
              </button>
            </div>
          </div>
          <div className="card-body p-0">
            <table className="table table-striped projects">
              <thead>
                <tr>
                  <th style={{ width: "1%" }}>STT</th>
                  <th style={{ width: "20%" }}>Từ vựng</th>
                  <th style={{ width: "30%" }}>Hình ảnh</th>         
                  <th style={{ width: "8%" }} className="text-center">
                    Trạng thái
                  </th>
                  <th style={{ width: "20%" }}></th>
                </tr>
              </thead>
              <tbody>
                {tuVung.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <a>{item.tu}</a>
                      <br />
                      <small>
                        Tạo ngày: {new Date(item.createAt).toLocaleDateString()}
                      </small>
                    </td>
                    <td>
                      <ul className="list-inline">
                        <li className="list-inline-item">
                          <img
                            alt="Avatar"
                            className="table-avatar"
                            src={item.hinhAnh}
                          />
                        </li>
                      </ul>
                    </td>                  
                    <td className="project-state">
                      <span className="badge badge-success">Đang mở</span>
                    </td>
                    <td className="project-actions text-right">
                      <TVItem key={item._id} tuvung={item} />
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

export default QLTV;
