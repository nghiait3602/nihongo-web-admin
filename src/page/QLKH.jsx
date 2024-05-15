import { useState, useEffect } from "react";

import khoaHocApi from "../Api/khoaHocApi";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function QLKH() {
  const auth = useSelector(authSelector);
  const [khoaHoc, setKhoaHoc] = useState([]);
  const [reloadPage, setReloadPage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await khoaHocApi.KhoaHocHandler(
          "/",
          null,
          "get",
          auth.token
        );
        if (response.status === "success") {
          const responseData = response.data.data;
          setKhoaHoc(responseData);
        }
      } catch (error) {
        console.error("Loi fetch data: ", error);
      }
    };
    fetchData();
  }, [reloadPage]);

  function KHItem({ khoahoc }) {
    return (
      <Link
        to={`/qlkh/chi-tiet-kh/${khoahoc._id}`}
        className="btn btn-primary btn-sm"
        style={{ marginRight: "5px" }}
      >
        <i className="fas fa-folder" style={{ marginRight: "5px" }}></i>
        Xem chi tiết
      </Link>
    );
  }

  const deleteData = async (id) => {
    try {
      await khoaHocApi.KhoaHocHandler(`/${id}`, null, "delete", auth.token);
      setReloadPage(!reloadPage);
    } catch (error) {
      console.error("Lỗi khi xóa khóa học: ", error);
      setReloadPage(!reloadPage);
    }
  };
  const xacNhanDel = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khóa học này không?")) {
      deleteData(id);
      toast.success("Xóa khóa học thành công!", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Tất cả khóa học</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/home">Home</a>
                </li>
                <li className="breadcrumb-item active">Tất cả khóa học</li>
              </ol>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <div className="card-tools"></div>
          </div>
          <div className="card-body p-0">
            <table className="table table-striped projects">
              <thead>
                <tr>
                  <th style={{ width: "1%" }}>STT</th>
                  <th style={{ width: "20%" }}>Khóa học</th>
                  <th style={{ width: "20%" }}>Icon</th>
                  <th className="text-center">Số người đang hoặc đã học</th>
                  <th style={{ width: "8%" }} className="text-center">
                    Trạng thái
                  </th>
                  <th style={{ width: "20%" }}></th>
                </tr>
              </thead>
              <tbody>
                {khoaHoc.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <a>{item.tenKhoahoc}</a>
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
                    <td className="text-center">
                      {item.dsNguoiHoc.length > 0 ? (
                        <span>{item.dsNguoiHoc.length}</span>
                      ) : (
                        <span>0</span>
                      )}
                      <i style={{ width: "15%" }} className="nav-icon fas fa-user-alt" />
                      <br />
                    </td>
                    <td className="project-state">
                      <span className="badge badge-success">Đang mở</span>
                    </td>
                    <td className="project-actions text-right">
                      <KHItem key={item._id} khoahoc={item} />

                      {/* <a
                        className="btn btn-danger btn-sm"
                        onClick={() => xacNhanDel(item._id)}
                      >
                        <i
                          className="fas fa-trash"
                          style={{ marginRight: "5px" }}
                        ></i>
                        Xóa
                      </a> */}
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

export default QLKH;
