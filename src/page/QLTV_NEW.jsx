import { useState, useEffect } from "react";

import tuVungApi from "../Api/tuVungApi";
import baiHocApi from "../Api/baiHocApi";
import khoaHocApi from "../Api/khoaHocApi";

import { useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function QLTV_NEW() {
  const auth = useSelector(authSelector);

  const [baiHoc, setBaiHoc] = useState([]);
  const [khoaHoc, setKhoaHoc] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [newTV, setNewTV] = useState("");
  const [newPhienAm, setNewPhienAm] = useState("");
  const [newDinhNghia, setNewDinhNghia] = useState("");
  const [newLoaiTu, setNewLoaiTu] = useState("");
  const [newChuDe, setNewChuDe] = useState("");
  const [newVD, setNewVD] = useState("");
  const [newDNVD, setNewDNVD] = useState("");
  const [newHinhAnh, setNewHinhAnh] = useState("");

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

  const createData = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("baiHoc", selectedLesson);
      formData.append("tu", newTV);
      formData.append("phienAm", newPhienAm);
      formData.append("dinhNghia", newDinhNghia);
      formData.append("loaiTu", newLoaiTu);
      formData.append("chuDe", newChuDe);
      formData.append("viDu", newVD);
      formData.append("dichNghiaVD", newDNVD);
      if (typeof newHinhAnh === "object") {
        formData.append("image", newHinhAnh);
      } else {
        // Nếu newHinhAnh là đường dẫn
        formData.append("hinhAnh", newHinhAnh);
      }
      const response = await tuVungApi.TuVungHandler(
        `/`,
        formData,
        "post",
        auth.token
      );
      console.log(response);
      if (response.status === "success") {
        toast.success("Tạo từ vựng thành công!", {
          position: "top-center",
          autoClose: 2000,
        });
        setIsLoading(false);
        setTimeout(() => {
          window.location.href = "/qltv";
        }, 2000);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Lỗi dữ liệu: ", error);
      toast.error(`Tạo từ vựng thất bại!\nVui lòng kiểm tra lại thông tin.`, {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Lấy ra file ảnh từ sự kiện
    if (file) {
      setNewHinhAnh(file);
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
              <h1>Tạo từ vựng</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/qltv">Tất cả từ vựng</a>
                </li>
                <li className="breadcrumb-item active">Tạo từ vựng</li>
              </ol>
            </div>
          </div>
          <div className="card">
            <div className="card-body p-0">
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

                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Từ vựng mới"
                  value={newTV}
                  onChange={(e) => setNewTV(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Phiên âm mới"
                  value={newPhienAm}
                  onChange={(e) => setNewPhienAm(e.target.value)}
                />
                <input
                  className="form-control mb-2"
                  placeholder="Định nghĩa mới"
                  value={newDinhNghia}
                  onChange={(e) => setNewDinhNghia(e.target.value)}
                />
                <textarea
                  className="form-control mb-2"
                  placeholder="Loại từ mới"
                  value={newLoaiTu}
                  onChange={(e) => setNewLoaiTu(e.target.value)}
                />
                <input
                  className="form-control mb-2"
                  placeholder="Chủ đề mới"
                  value={newChuDe}
                  onChange={(e) => setNewChuDe(e.target.value)}
                />
                <textarea
                  className="form-control mb-2"
                  placeholder="Ví dụ mới"
                  value={newVD}
                  onChange={(e) => setNewVD(e.target.value)}
                />
                <textarea
                  type="text"
                  className="form-control mb-2"
                  placeholder="Dịch nghĩa ví dụ mới"
                  value={newDNVD}
                  onChange={(e) => setNewDNVD(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Hình ảnh mới"
                  value={newHinhAnh}
                  onChange={(e) => setNewHinhAnh(e.target.value)}
                />
                {newHinhAnh && (
                  <img
                    src={
                      typeof newHinhAnh === "object"
                        ? URL.createObjectURL(newHinhAnh)
                        : newHinhAnh
                    }
                    alt="Hình ảnh"
                    className="img-thumbnail mb-2"
                    style={{ maxHeight: "200px" }}
                  />
                )}
                <input
                  type="file"
                  className="form-control-file mb-2"
                  onChange={handleImageChange}
                />
                <button className="btn btn-primary" onClick={createData}>
                  <i
                    className="fas fa-upload"
                    style={{ marginRight: "5px" }}
                  ></i>
                  Tạo từ vựng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default QLTV_NEW;
