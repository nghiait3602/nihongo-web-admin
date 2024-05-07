import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import nguPhapApi from "../Api/nguPhapApi";
import baiHocApi from "../Api/baiHocApi";
import khoaHocApi from "../Api/khoaHocApi";

function QLNP_CT() {
  let { id } = useParams();
  const auth = useSelector(authSelector);
  const [nguPhap, setNguPhap] = useState([]);
  const [baiHoc, setBaiHoc] = useState([]);
  const [khoaHoc, setKhoaHoc] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [cauTruc, setCauTruc] = useState("");
  const [tinhHuong, setTinhHuong] = useState("");
  const [newDinhNghia, setNewDinhNghia] = useState("");
  const [newVD, setNewVD] = useState("");
  const [newCreateAt, setNewCreateAt] = useState("");

  const [selectedLesson, setSelectedLesson] = useState();
  const [selectedCourse, setSelectedCourse] = useState();

  const handleCourseChange = (event) => {
    const courseId = event.target.value;
    setSelectedCourse(courseId);
    setSelectedLesson(null);
  };

  const handleLessonChange = (event) => {
    const lessonId = event.target.value;
    setSelectedLesson(lessonId);
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
    const fetchBHData = async () => {
      try {
        const response = await baiHocApi.BaiHocHandler(
          "/",
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
    fetchBHData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await nguPhapApi.NguPhapHandler(
          `/${id}`,
          null,
          "get",
          auth.token
        );
        if (response.status === "success") {
          const responseData = response.data.data;
          setNguPhap(responseData);
          setSelectedLesson(responseData.baiHoc);
          setCauTruc(responseData.cauTruc);
          setTinhHuong(responseData.tinhHuong);
          setNewDinhNghia(responseData.dinhNghia);
          setNewVD(responseData.viDu);
          setNewCreateAt(responseData.createAt);
        }
      } catch (error) {
        console.error("Loi fetch data: ", error);
      }
    };
    fetchData();
  }, [isUpdating]);

  const updateData = async () => {
    try {
      setIsLoading(true);
      const reqBody = {
        cauTruc,
        tinhHuong,
        dinhNghia: newDinhNghia,
        viDu: newVD,
        baiHoc: selectedLesson,
        createAt: new Date().toISOString(),
      };
      const response = await nguPhapApi.NguPhapHandler(
        `/${id}`,
        reqBody,
        "patch",
        auth.token
      );
      console.log(response);
      if (response.status === "success") {
        toast.success("Cập nhật thành công!", {
          position: "top-center",
          autoClose: 2000,
        });
        setIsUpdating(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Loi fetch data: ", error);
    }
  };

  return (
    <>
      <ToastContainer />
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "9999",
          }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Updating...</span>
          </div>
        </div>
      )}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Chi tiết ngữ pháp</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/qlnp">Tất cả ngữ pháp</a>
                </li>
                <li className="breadcrumb-item active">Chi tiết ngữ pháp</li>
              </ol>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h3
                className="card-title"
                style={{ color: "#15d442", fontWeight: "bold" }}
              >
                Ngữ pháp ID: {id}
              </h3>
              <div className="card-tools">
                {isUpdating && (
                  <button
                    type="button"
                    className="btn btn-danger ml-2"
                    onClick={() => setIsUpdating(false)}
                  >
                    <i
                      className="fas fa-times"
                      style={{ marginRight: "5px" }}
                    ></i>
                    Hủy
                  </button>
                )}
                {!isUpdating && (
                  <button
                    type="button"
                    className="btn btn-info ml-2"
                    onClick={() => setIsUpdating(true)}
                  >
                    <i
                      className="fas fa-pencil-alt"
                      style={{ marginRight: "5px" }}
                    ></i>
                    Sửa
                  </button>
                )}
              </div>
            </div>
            <div
              className="card-header"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <a className="card-title" style={{ fontWeight: "bold" }}>
                Thuộc bài học ID: {nguPhap.baiHoc && nguPhap.baiHoc}
              </a>
            </div>
            <div className="card-body p-0">
              <table className="table table-striped projects">
                <thead>
                  <tr>
                    <th style={{ width: "15%" }}>Cấu trúc ngữ pháp</th>
                    <th style={{ width: "15%" }}>Tình huống</th>
                    <th style={{ width: "30%" }}>Định nghĩa</th>
                    <th style={{ width: "20%" }}>Ví dụ</th>
                    <th style={{ width: "10%" }} className="text-center">
                      Ngày tạo
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{nguPhap.cauTruc}</td>
                    <td>{nguPhap.tinhHuong}</td>
                    <td>{nguPhap.dinhNghia}</td>
                    <td>{nguPhap.viDu}</td>
                    <td className="text-center">
                      {new Date(nguPhap.createAt).toLocaleDateString()}
                    </td>
                  </tr>
                </tbody>
              </table>
              {isUpdating && (
                <div className="card-body">
                  <button
                    className="btn btn-success dropdown-toggle mb-2"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {selectedCourse
                      ? khoaHoc.find((course) => course._id === selectedCourse)
                          ?.tenKhoahoc
                      : baiHoc.find((lesson) => lesson._id === nguPhap.baiHoc)
                          ?.tenBaiHoc}
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <select
                      multiple
                      className="form-control mb-2"
                      value={selectedCourse}
                      onChange={handleCourseChange}
                    >
                      {/* Render lựa chon dựa theo khóa hoc */}
                      {khoaHoc.map((course) => (
                        <option key={course._id} value={course._id}>
                          {course.tenKhoahoc}
                        </option>
                      ))}
                    </select>
                  </div>
                  {selectedCourse && (
                    <div>
                      <select
                        className="form-control mb-2"
                        value={selectedLesson}
                        onChange={handleLessonChange}
                      >
                        <option value="">-- Chọn bài học --</option>
                        {/* Render bài học theo lựa chọn */}
                        {baiHoc
                          .filter(
                            (lesson) => lesson.khoaHoc._id === selectedCourse
                          )
                          .map((lesson) => (
                            <option key={lesson._id} value={lesson._id}>
                              {lesson.tenBaiHoc}
                            </option>
                          ))}
                      </select>
                    </div>
                  )}

                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Ngữ pháp mới"
                    value={cauTruc}
                    onChange={(e) => setCauTruc(e.target.value)}
                  />
                  <textarea
                    type="text"
                    className="form-control mb-2"
                    placeholder="Tình huống mới"
                    value={tinhHuong}
                    onChange={(e) => setTinhHuong(e.target.value)}
                  />
                  <textarea
                    className="form-control mb-2"
                    placeholder="Định nghĩa mới"
                    value={newDinhNghia}
                    onChange={(e) => setNewDinhNghia(e.target.value)}
                  />
                  <textarea
                    className="form-control mb-2"
                    placeholder="Ví dụ mới"
                    value={newVD}
                    onChange={(e) => setNewVD(e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Ngày tạo mới"
                    value={newCreateAt}
                    readOnly
                  />
                  <button className="btn btn-primary" onClick={updateData}>
                    <i
                      className="fas fa-upload"
                      style={{ marginRight: "5px" }}
                    ></i>
                    Cập nhật
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default QLNP_CT;
