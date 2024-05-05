import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import baiTapApi from "../Api/baitapApi";

function QLBT() {
  const auth = useSelector(authSelector);
  const [baiTap, setBaiTap] = useState([]);
  const [reloadPage, setReloadPage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await baiTapApi.BaiTapHandler(
          "/",
          null,
          "get",
          auth.token
        );
        if (response.status === "success") {
          const responseData = response.data.data;
          setBaiTap(responseData);
        }
      } catch (error) {
        console.error("Loi fetch data: ", error);
      }
    };
    fetchData();
  }, [reloadPage]);

  function BTItem({ baitap }) {
    return (
      <Link
        to={`/qlbt/chi-tiet-bai-tap/${baitap._id}`}
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
      await baiTapApi.BaiTapHandler(`/${id}`, null, "delete", auth.token);
      setReloadPage(!reloadPage);
    } catch (error) {
      console.error("Lỗi khi xóa bài học: ", error);
      setReloadPage(!reloadPage);
    }
  };
  const xacNhanDel = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài tập này không?")) {
      deleteData(id);
      toast.success("Xóa bài tập thành công!", {
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
              <h1>Tất cả bài tập</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/home">Home</a>
                </li>
                <li className="breadcrumb-item active">Tất cả bài tập</li>
              </ol>
            </div>
          </div>
        </div>
        <div className="card card-solid">
          <div className="card-header">
            <Link
              to={`/qlbt/tao-moi`}
              className="btn btn-warning btn-sm"
              style={{ marginRight: "5px" }}
            >
              <i
                className="fas fa-plus-circle"
                style={{ marginRight: "5px" }}
              ></i>
              Thêm bài tập
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
          <div className="card-body pb-0">
            <div className="row">
              {baiTap.map((item, index) => (
                <div
                  className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column"
                  key={index}
                >
                  <div className="card bg-light d-flex flex-fill">
                    <div
                      className="d-flex align-items-center"
                      style={{ marginBottom: "20px" }}
                    >
                      <h4
                        className="text-center"
                        style={{
                          borderRadius: "50%",
                          width: "40px",
                          height: "40px",
                          lineHeight: "40px",
                          backgroundColor: "lightgreen",
                          textAlign: "center",
                          margin: "7px",
                          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
                        }}
                      >
                        {index + 1}
                      </h4>
                      <div className="card-header text-muted border-bottom-0">
                        <b>ID: </b>
                        {item._id}
                      </div>
                    </div>
                    <div className="card-body pt-0">
                      <h2
                        className="lead"
                        style={{ fontFamily: "Ms Mincho", fontWeight: "bold" }}
                      >
                        <b>{item.cauHoi}</b>
                      </h2>
                      <hr></hr>
                      <ul className="ml-4 mb-0 fa-ul text-muted">
                        <li className="small">
                          <span className="fa-li">
                            <i
                              className="fas fa-star"
                              style={{ color: "#f7ca28" }}
                            />
                          </span>
                          <b>Điểm: </b> {item.diem}
                        </li>
                        <li className="small">
                          <span className="fa-li">
                            <i
                              className="fas fa-check-circle"
                              style={{ color: "#04d119" }}
                            />
                          </span>
                          <b>Đáp án: </b>
                          {item.cauTraLoiDung}
                        </li>
                        <li className="small">
                          <span className="fa-li">
                            <i
                              className="fas fa-calendar-alt"
                              style={{ color: "#04a5d1" }}
                            />
                          </span>
                          <b>Tạo ngày: </b>
                          {new Date(item.createAt).toLocaleDateString()}
                        </li>
                      </ul>
                    </div>
                    <div className="card-footer">
                      <div className="text-right">
                        <BTItem key={item._id} baitap={item} />
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
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default QLBT;
