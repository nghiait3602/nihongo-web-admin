import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import kanjiApi from "../Api/kanjiApi";
import baiHocApi from "../Api/baiHocApi";
import khoaHocApi from "../Api/khoaHocApi";

import { useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function QLKanji_CT() {
    let { id } = useParams();
    const auth = useSelector(authSelector);
    const [kanji, setKanji] = useState([]);
    const [baiHoc, setBaiHoc] = useState([]);
    const [khoaHoc, setKhoaHoc] = useState([]);

    const [isUpdating, setIsUpdating] = useState(false);
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
          const response = await kanjiApi.KanjiHandler(
            `/${id}`,
            null,
            "get",
            auth.token
          );
          if (response.status === "success") {
            const responseData = response.data.data;
            console.log(response);
            setKanji(responseData);
            // Set các giá trị ban đầu cho state khi fetch dữ liệu thành công
            setNewHanTu(responseData.hanTu);
            setNewHanViet(responseData.hanViet);
            setNewKunyomi(responseData.kunyomi);
            setNewOnyomi(responseData.onyomi);
            setNewSoNet(responseData.soNet);
            setNewBo(responseData.bo);
            setNewNghia(responseData.nghia);
            setNewViDu(responseData.viDu);
            setNewHinhAnhCachViet(responseData.hinhAnhCachViet);
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
        const formData = new FormData();
        formData.append("hanTu", newHanTu);
        formData.append("hanViet", newHanViet);
        formData.append("kunyomi", newKunyomi);
        formData.append("onyomi", newOnyomi);
        formData.append("soNet", newSoNet);
        formData.append("bo", newBo);
        formData.append("nghia", newNghia);
        formData.append("viDu", newViDu);
        if (typeof newHinhAnh === "object") {
          formData.append("image", newHinhAnhCachViet);
        } else {
          // Nếu newHinhAnh là đường dẫn
          formData.append("hinhAnhCachViet", newHinhAnhCachViet);
        }
        const currentTime = new Date();
        formData.append("createAt", currentTime.toISOString());
  
        const response = await kanjiApi.KanjiHandler(
          `/${id}`,
          formData,
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
        }
      } catch (error) {
        console.error("Lỗi khi cập nhật dữ liệu: ", error);
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
            <span className="sr-only">Updating...</span>
          </div>
        </div>
      )}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Chi tiết kanji</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/qlkanji">Tất cả kanji</a>
                  </li>
                  <li className="breadcrumb-item active">Chi tiết kanji</li>
                </ol>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h3 className="card-title" style={{ color: "#15d442" }}>
                  Kanji ID: {id}
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
                Thuộc bài học: {kanji.baiHoc && kanji.baiHoc.tenBaiHoc} - ID:{" "}
                {kanji.baiHoc && kanji.baiHoc.id}
              </a>
            </div>
              <div className="card-body p-0">
                <table className="table table-striped projects">
                  <thead>
                    <tr>
                      <th style={{ width: "10%" }}>Hán Tự</th>
                      <th style={{ width: "10%" }}>Hán việt</th>
                      <th style={{ width: "10%" }}>Kunyomi</th>
                      <th style={{ width: "10%" }}>Onyomi</th>
                      <th style={{ width: "10%" }}>Số Nét</th>
                      <th style={{ width: "10%" }}>Bộ</th>
                      <th style={{ width: "20%" }}>Nghĩa</th>
                      <th style={{ width: "20%" }}>Ví dụ</th>
                      <th style={{ width: "10%" }} className="text-center">
                        Ngày tạo
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{kanji.hanTu}</td>
                      <td>{kanji.hanViet}</td>
                      <td>{kanji.kunyomi}</td>
                      <td>{kanji.onyomi}</td>
                      <td>{kanji.soNet}</td>
                      <td>{kanji.bo}</td>
                      <td>{kanji.nghia}</td>
                      <td>{kanji.viDu}</td>
                      <td className="text-center">
                        {new Date(kanji.createAt).toLocaleDateString()}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="9" className="text-center">
                        <img
                          src={kanji.hinhAnhCachViet}
                          alt="Hình ảnh cách viết"
                          style={{ maxWidth: "100%", height: "auto" }}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default QLKanji_CT;
  