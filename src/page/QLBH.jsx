import { useState, useEffect } from "react";

import baiHocApi from "../Api/baiHocApi";
import khoaHocApi from "../Api/khoaHocApi";
import tienTrinhApi from "../Api/tienTrinhApi";

import { useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function QLBH() {
  const auth = useSelector(authSelector);
  const [baiHoc, setBaiHoc] = useState([]);
  const [khoaHoc, setKhoaHoc] = useState([]);
  const [reloadPage, setReloadPage] = useState(false);

  const [idBaiHocTR, setIdBaiHocTR] = useState([]);

  const [selectedCourses, setSelectedCourses] = useState(["0"]);
  const [selectedText, setSelectedText] = useState("Tất cả khóa học");

  const chonKhoaHoc = (e) => {
    const selectedIds = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedCourses(selectedIds);
    const selectedText = Array.from(
      e.target.selectedOptions,
      (option) => option.text
    );
    setSelectedText(selectedText);
  };

  useEffect(() => {
    const fetchKHData = async () => {
      try {
        const response = await tienTrinhApi.TienTrinhHandler(
          "/",
          null,
          "get",
          auth.token
        );
        if (response.status === "success") {
          const responseData = response.data.data;
          const lessonIds = responseData.map((lesson) => lesson.baiHoc.id);
          setIdBaiHocTR(lessonIds);
        }
      } catch (error) {
        console.error("Loi fetch data: ", error);
      }
    };
    fetchKHData();
  }, []);

  const demIds = (item) => {
    return idBaiHocTR.filter((id) => id === item.id).length; //đếm id trùng
  };

  const phanTramIds = (item) => {
    const percent =
      (idBaiHocTR.filter((id) => id === item.id).length / baiHoc.length) * 100; // chia phần trăm theo số lượng bài học
    return percent.toFixed(1); // Lấy sau dấu phẩy 1 số thập phân
  };

  useEffect(() => {
    const fetchKHData = async () => {
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
    fetchKHData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "/";
        if (selectedCourses.includes("0")) {
          url = "/";
        } else {
          url += `?khoaHoc=${selectedCourses}`;
        }
        const response = await baiHocApi.BaiHocHandler(
          url,
          null,
          "get",
          auth.token
        );
        if (response.status === "success") {
          const responseData = response.data.data;
          setBaiHoc(responseData);
        }
      } catch (error) {
        console.error("Loi fetch data: ", error);
      }
    };
    fetchData();
  }, [reloadPage, selectedCourses]);

  const deleteData = async (id) => {
    try {
      await baiHocApi.BaiHocHandler(`/${id}`, null, "delete", auth.token);
      setReloadPage(!reloadPage);
    } catch (error) {
      console.error("Lỗi khi xóa bài học: ", error);
      setReloadPage(!reloadPage);
    }
  };

  const xacNhanDel = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài học này không?")) {
      deleteData(id);
      toast.success("Xóa bài thành công!", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  function LessonItem({ lesson }) {
    return (
      <Link
        to={`/qlbh/chi-tiet-bai-hoc/${lesson.id}`}
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
            <Link
              to={`/qlbh/tao-moi`}
              className="btn btn-warning btn-sm"
              style={{ marginRight: "5px" }}
            >
              <i
                className="fas fa-plus-circle"
                style={{ marginRight: "5px" }}
              ></i>
              Thêm bài học
            </Link>
            <button
              className="btn btn-secondary dropdown-toggle btn-sm"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {selectedText}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <select multiple className="form-control" onChange={chonKhoaHoc}>
                <option value="0">Tất cả khóa học</option>
                {khoaHoc.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.tenKhoahoc}
                  </option>
                ))}
              </select>
            </div>

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
                  <th style={{ width: "30%" }}>Tên bài học</th>
                  <th style={{ width: "15%" }}>Hình ảnh</th>
                  <th>Số người đã học</th>
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
                            style={{ width: "60px", height: "auto" }}
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
                          style={{ width: `${phanTramIds(item)}%` }}
                        ></div>
                      </div>
                      <small>
                        {demIds(item)} nguời học ({phanTramIds(item)}%)
                      </small>
                    </td>
                    <td className="project-state">
                      <span className="badge badge-success">Đang mở</span>
                    </td>
                    <td className="project-actions text-right">
                      <LessonItem key={item.id} lesson={item} />

                      <a
                        className="btn btn-danger btn-sm"
                        onClick={() => xacNhanDel(item.id)}
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

export default QLBH;
