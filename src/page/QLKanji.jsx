import { useState, useEffect } from "react";

import kanjiApi from "../Api/kanjiApi";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function QLKanji() {
  const auth = useSelector(authSelector);
  const [kanji, setKanji] = useState([]);
  const [reloadPage, setReloadPage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await kanjiApi.KanjiHandler(
          "/",
          null,
          "get",
          auth.token
        );
        if (response.status === "success") {
          const responseData = response.data.data;
          setKanji(responseData);
        }
      } catch (error) {
        console.error("Loi fetch data: ", error);
      }
    };
    fetchData();
  }, [reloadPage]);

  const deleteData = async (id) => {
    try {
      await kanjiApi.KanjiHandler(`/${id}`, null, "delete", auth.token);
      setReloadPage(!reloadPage);
    } catch (error) {
      console.error("Lỗi khi xóa kanji: ", error);
      setReloadPage(!reloadPage);
    }
  };

  const xacNhanDel = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa hán tự này không?")) {
      deleteData(id);
      toast.success("Xóa hán tự thành công!", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  function KanjiItem({ kanji }) {
    return (
      <Link
        to={`/qlkanji/chi-tiet-kanji/${kanji._id}`}
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
              <h1>Tất cả kanji</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/home">Home</a>
                </li>
                <li className="breadcrumb-item active">Tất cả kanji</li>
              </ol>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <Link
              to={`/qlkanji/tao-moi`}
              className="btn btn-warning btn-sm"
              style={{ marginRight: "5px" }}
            >
              <i
                className="fas fa-plus-circle"
                style={{ marginRight: "5px" }}
              ></i>
              Thêm kanji
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
                  <th style={{ width: "20%" }}>Hán tự</th>
                  <th style={{ width: "30%" }}>Cách viết</th>
                  <th>Hán việt</th>
                  <th style={{ width: "8%" }} className="text-center">
                    Trạng thái
                  </th>
                  <th style={{ width: "20%" }}></th>
                </tr>
              </thead>
              <tbody>
                {kanji.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <a>{item.hanTu}</a>
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
                            src={item.hinhAnhCachViet}
                          />
                        </li>
                      </ul>
                    </td>
                    <td>
                      <a>{item.hanViet}</a>
                      <br />
                    </td>
                    <td className="project-state">
                      <span className="badge badge-success">Đang mở</span>
                    </td>
                    <td className="project-actions text-right">
                    <KanjiItem key={item._id} kanji={item} />

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

export default QLKanji;
