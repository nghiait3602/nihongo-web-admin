import { useState, useEffect } from "react";

import kanjiApi from "../Api/kanjiApi";
import baiHocApi from "../Api/baiHocApi";
import khoaHocApi from "../Api/khoaHocApi";

import { useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function QLKanji_NEW() {
  const auth = useSelector(authSelector);

  const [baiHoc, setBaiHoc] = useState([]);
  const [khoaHoc, setKhoaHoc] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

    const [newHanTu, setNewHanTu] = useState("");
    const [newHanViet, setNewHanViet] = useState("");
    const [newKunyomi, setNewKunyomi] = useState("");
    const [newOnyomi, setNewOnyomi] = useState("");
    const [newSoNet, setNewSoNet] = useState("");
    const [newBo, setNewBo] = useState("");
    const [newNghia, setNewNghia] = useState("");
    const [newViDu, setNewViDu] = useState("");
    const [newHinhAnhCachViet, setNewHinhAnhCachViet] = useState("");

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
        formData.append("hanTu", newHanTu);
        formData.append("hanViet", newHanViet);
        formData.append("kunyomi", newKunyomi);
        formData.append("onyomi", newOnyomi);
        formData.append("soNet", newSoNet);
        formData.append("bo", newBo);
        formData.append("nghia", newNghia);
        formData.append("viDu", newViDu);
      if (typeof newHinhAnhCachViet === "object") {
        formData.append("image", newHinhAnhCachViet);
      } else {
        // Nếu newHinhAnh là đường dẫn
        formData.append("hinhAnhCachViet", newHinhAnhCachViet);
      }
      const response = await kanjiApi.KanjiHandler(
        `/`,
        formData,
        "post",
        auth.token
      );
      console.log(response);
      if (response.status === "success") {
        toast.success("Tạo kanji thành công!", {
          position: "top-center",
          autoClose: 2000,
        });
        setIsLoading(false);
        setTimeout(() => {
          window.location.href = "/qlkanji";
        }, 2000);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Lỗi dữ liệu: ", error);
      toast.error(`Tạo kanji thất bại!\nVui lòng kiểm tra lại thông tin.`, {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Lấy ra file ảnh từ sự kiện
    if (file) {
      setNewHinhAnhCachViet(file);
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
              <h1>Tạo Kanji</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/qlkanji">Tất cả kanji</a>
                </li>
                <li className="breadcrumb-item active">Tạo kanji</li>
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
                    placeholder="Hán tự mới"
                    value={newHanTu}
                    onChange={(e) => setNewHanTu(e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Hán viet mới"
                    value={newHanViet}
                    onChange={(e) => setNewHanViet(e.target.value)}
                  />
                  <input
                    className="form-control mb-2"
                    placeholder="Âm kunyomi mới"
                    value={newKunyomi}
                    onChange={(e) => setNewKunyomi(e.target.value)}
                  />
                  <textarea
                    className="form-control mb-2"
                    placeholder="Âm onyomi mới"
                    value={newOnyomi}
                    onChange={(e) => setNewOnyomi(e.target.value)}
                  />
                  <input
                    className="form-control mb-2"
                    placeholder="Số nét mới"
                    value={newSoNet}
                    onChange={(e) => setNewSoNet(e.target.value)}
                  />
                  <textarea
                    className="form-control mb-2"
                    placeholder="Bộ mới"
                    value={newBo}
                    onChange={(e) => setNewBo(e.target.value)}
                  />
                  <textarea
                    type="text"
                    className="form-control mb-2"
                    placeholder="Nghĩa mới"
                    value={newNghia}
                    onChange={(e) => setNewNghia(e.target.value)}
                  />
                  <textarea
                    type="text"
                    className="form-control mb-2"
                    placeholder="Ví dụ mới"
                    value={newViDu}
                    onChange={(e) => setNewViDu(e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Hình ảnh cách viết mới"
                    value={newHinhAnhCachViet}
                    onChange={(e) => setNewHinhAnhCachViet(e.target.value)}
                  />
                  {newHinhAnhCachViet && (
                    <img
                      src={
                        typeof newHinhAnhCachViet === "object"
                          ? URL.createObjectURL(newHinhAnhCachViet)
                          : newHinhAnhCachViet
                      }
                      alt="Hình ảnh cách viết"
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
                  Tạo kanji
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default QLKanji_NEW;
