import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import nguPhapApi from "../Api/nguPhapApi";
import baiHocApi from "../Api/baiHocApi";
import khoaHocApi from "../Api/khoaHocApi";

function QLNP_NEW() {
  const auth = useSelector(authSelector);
  const [isLoading, setIsLoading] = useState(false);
  const [cauTruc, setCauTruc] = useState("");
  const [tinhHuong, setTinhHuong] = useState("");
  const [newDinhNghia, setNewDinhNghia] = useState("");
  const [newVD, setNewVD] = useState("");

  const [khoaHoc, setKhoaHoc] = useState([]);
  const [baiHoc, setBaiHoc] = useState([]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);      
      const reqBody = {
        cauTruc,
        tinhHuong,
        dinhNghia: newDinhNghia,
        viDu: newVD,
        baiHoc: selectedLesson,
      };
      const response = await nguPhapApi.NguPhapHandler(
        "/",
        reqBody,
        "post",
        auth.token
      );
      console.log(response);
      if (response.status === "success") {
        toast.success("Tạo mới ngữ pháp thành công!", {
          position: "top-center",
          autoClose: 2000,
        });
        setIsLoading(false);
        setTimeout(() => {
          window.location.href = "/qlnp";
        }, 2000);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Lỗi dữ liệu: ", error);
      toast.error(`Tạo ngữ pháp thất bại!\nVui lòng kiểm tra lại thông tin.`, {
        position: "top-center",
        autoClose: 2000,
      });
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
            <span className="sr-only">Creating...</span>
          </div>
        </div>
      )}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Tạo ngữ pháp</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/qlbt">Tất cả ngữ pháp</a>
                </li>
                <li className="breadcrumb-item active">Tạo ngữ pháp</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="card card-primary">
          <div className="card-header">
            <h3 className="card-title">Thông tin ngữ pháp mới</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="inputName">Cấu trúc ngữ pháp mới</label>
                <input
                  type="text"
                  id="inputName"
                  className="form-control"
                  value={cauTruc}
                  onChange={(e) => setCauTruc(e.target.value)}
                  required
                />
              </div>              
              <div className="form-group">
                <label htmlFor="inputName">Tình huống mới</label>
                <textarea
                  type="text"
                  id="inputName"
                  className="form-control"
                  onChange={(e) => setTinhHuong(e.target.value)}
                  value={tinhHuong}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputName">Định nghĩa mới</label>
                <textarea
                  type="text"
                  id="inputName"
                  className="form-control"
                  onChange={(e) => setNewDinhNghia(e.target.value)}
                  value={newDinhNghia}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputName">Ví dụ mới</label>
                <textarea
                  type="text"
                  id="inputName"
                  className="form-control"
                  onChange={(e) => setNewVD(e.target.value)}
                  value={newVD}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputClientCompany">Thuộc Bài Học</label>
                <br></br>
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
                        .tenKhoahoc
                    : "Chọn bài học"}
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
              </div>
              <button type="submit" className="btn btn-primary">
                <i className="fas fa-upload" style={{ marginRight: "5px" }}></i>
                Tạo bài tập
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default QLNP_NEW;
