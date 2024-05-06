import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import baiTapApi from "../Api/baitapApi";
import baiHocApi from "../Api/baiHocApi";
import khoaHocApi from "../Api/khoaHocApi";

function QLBT_NEW() {
  const auth = useSelector(authSelector);
  const [isLoading, setIsLoading] = useState(false);
  const [cauHoi, setCauHoi] = useState("");
  const [cauTraLoi, setCauTraLoi] = useState("");
  const [cauTraLoiDung, setCauTraLoiDung] = useState("");
  const [diem, setDiem] = useState("1");

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
      if (cauTraLoi.split(",").length !== 4) {
        setIsLoading(false);
        toast.warning("Các đáp án phải có đúng 4 câu!", {
          position: "top-center",
          autoClose: 2000,
        });
        return;
      }
      const reqBody = {
        cauHoi,
        cauTraLoi: cauTraLoi.split(",").map((item) => item.trim()),
        cauTraLoiDung,
        diem,
        baiHoc: selectedLesson
      };
      const response = await baiTapApi.BaiTapHandler(
        "/",
        reqBody,
        "post",
        auth.token
      );
      console.log(response);
      if (response.status === "success") {
        toast.success("Tạo mới bài tập thành công!", {
          position: "top-center",
          autoClose: 2000,
        });
        setIsLoading(false);
        setTimeout(() => {
          window.location.href = "/qlbt";
        }, 2000);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Lỗi dữ liệu: ", error);
      toast.error(`Tạo bài tập thất bại!\nVui lòng kiểm tra lại thông tin.`, {
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
              <h1>Tạo bài tập</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/qlbt">Tất cả bài tập</a>
                </li>
                <li className="breadcrumb-item active">Tạo bài tập</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="card card-primary">
          <div className="card-header">
            <h3 className="card-title">Thông tin bài tập mới</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="inputName">Câu Hỏi</label>
                <input
                  type="text"
                  id="inputName"
                  className="form-control"
                  value={cauHoi}
                  onChange={(e) => setCauHoi(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputDescription">
                  Các Đáp Án Lựa Chọn
                  <b
                    style={{
                      fontStyle: "italic",
                      opacity: "0.7",
                      color: "red",
                    }}
                  >
                    {" "}
                    *4 câu - cách nhau bằng dấu phẩy
                  </b>
                </label>
                <textarea
                  id="inputDescription"
                  className="form-control"
                  rows={4}
                  onChange={(e) => setCauTraLoi(e.target.value)}
                  value={cauTraLoi}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputName">Đáp Án Đúng</label>
                <input
                  type="text"
                  id="inputName"
                  className="form-control"
                  onChange={(e) => setCauTraLoiDung(e.target.value)}
                  value={cauTraLoiDung}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputStatus">Điểm</label>
                <select
                  id="inputStatus"
                  className="form-control custom-select"
                  value={diem}
                  onChange={(e) => setDiem(e.target.value)}
                  required
                >
                  <option disabled>Chọn điểm</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
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

export default QLBT_NEW;
