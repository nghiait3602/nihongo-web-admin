import { useState, useEffect } from "react";

import baiHocApi from "../Api/baiHocApi";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";
import { Link } from "react-router-dom";

function QLBH() {
  const auth = useSelector(authSelector);
  const [baiHoc, setBaiHoc] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await baiHocApi.BaiHocHandler(
          "/",
          null,
          "get",
          auth.token
        );
        if (response.status === "success") {
          const responseData = response.data.data;
          console.log(response);
          setBaiHoc(responseData);
        }
      } catch (error) {
        console.error("Loi fetch data: ", error);
      }
    };
    fetchData();
  }, []);

  function LessonItem({ lesson }) {
    return (
      <Link
        to={`/qlbh/chi-tiet-bai-hoc/${lesson.id}`}
        className="btn btn-primary btn-sm"
        style={{ marginRight: "5px" }}
      >
        <i className="fas fa-folder" style={{ marginRight: "5px" }}></i>
        Xem
      </Link>
    );
  }

  return (
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>Tất cả bài học</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item">
                <a href="/home">Home</a>
              </li>
              <li className="breadcrumb-item active">Tất cả bài học</li>
            </ol>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Tất cả bài học</h3>
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
                <th style={{ width: "20%" }}>Tên bài học</th>
                <th style={{ width: "30%" }}>Hình ảnh</th>
                <th>Số người đang học</th>
                <th style={{ width: "8%" }} className="text-center">
                  Trạng thái
                </th>
                <th style={{ width: "20%" }}></th>
              </tr>
            </thead>
            <tbody>
              {baiHoc.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <a>{item.tenBaiHoc}</a>
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
                  <td className="project_progress">
                    <div className="progress progress-sm">
                      <div
                        className="progress-bar bg-green"
                        role="progressbar"
                        aria-valuenow={57}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ width: "57%" }}
                      ></div>
                    </div>
                    <small>57% Nguời học</small>
                  </td>
                  <td className="project-state">
                    <span className="badge badge-success">Đang mở</span>
                  </td>
                  <td className="project-actions text-right">
                    {/* <Link
                      to={`/qlbh/chi-tiet-bai-hoc/${item.id}`}
                      className="btn btn-primary btn-sm"
                      style={{ marginRight: "5px" }}
                    >
                      <i
                        className="fas fa-folder"
                        style={{ marginRight: "5px" }}
                      ></i>
                      Xem
                    </Link> */}
                    <LessonItem key={item.id} lesson={item} />
                    <a
                      className="btn btn-info btn-sm"
                      style={{ marginRight: "5px" }}
                      href="#"
                    >
                      <i
                        className="fas fa-pencil-alt"
                        style={{ marginRight: "5px" }}
                      ></i>
                      Sửa
                    </a>
                    <a className="btn btn-danger btn-sm" href="#">
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
  );
}

export default QLBH;
