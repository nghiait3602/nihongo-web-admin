import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import tuVungApi from "../Api/tuVungApi";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function QLTV_CT() {
  let { id } = useParams();
  const auth = useSelector(authSelector);
  const [tuVung, setTuVung] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  const [newTV, setNewTV] = useState("");
  const [newPhienAm, setNewPhienAm] = useState("");
  const [newDinhNghia, setNewDinhNghia] = useState("");
  const [newLoaiTu, setNewLoaiTu] = useState("");
  const [newChuDe, setNewChuDe] = useState("");
  const [newVD, setNewVD] = useState("");
  const [newDNVD, setNewDNVD] = useState("");
  const [newHinhAnh, setNewHinhAnh] = useState("");
  const [newCreateAt, setNewCreateAt] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await tuVungApi.TuVungHandler(
          `/${id}`,
          null,
          "get",
          auth.token
        );
        if (response.status === "success") {
          const responseData = response.data.data;
          setTuVung(responseData);
          setNewTV(responseData.tu);
          setNewPhienAm(responseData.phienAm);
          setNewDinhNghia(responseData.dinhNghia);
          setNewLoaiTu(responseData.loaiTu);
          setNewChuDe(responseData.chuDe);
          setNewVD(responseData.viDu);
          setNewDNVD(responseData.dichNghiaVD);
          setNewHinhAnh(responseData.hinhAnh);
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
      const currentTime = new Date();
      formData.append("createAt", currentTime.toISOString());

      const response = await tuVungApi.TuVungHandler(
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
      setNewHinhAnh(file);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Chi tiết từ vựng</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/qltv">Tất cả từ vựng</a>
                </li>
                <li className="breadcrumb-item active">Chi tiết từ vựng</li>
              </ol>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h3 className="card-title" style={{ color: "#15d442" }}>
                Từ vựng ID: {id}
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
            <div className="card-body p-0">
              <table className="table table-striped projects">
                <thead>
                  <tr>
                    <th style={{ width: "10%" }}>Từ vựng</th>
                    <th style={{ width: "10%" }}>Phiên âm</th>
                    <th style={{ width: "10%" }}>Định nghĩa</th>
                    <th style={{ width: "15%" }}>Loại từ</th>
                    <th style={{ width: "10%" }}>Chủ đề</th>
                    <th style={{ width: "15%" }}>Ví dụ</th>
                    <th style={{ width: "20%" }}>Dịch nghĩa ví dụ</th>
                    <th style={{ width: "10%" }} className="text-center">
                      Ngày tạo
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{tuVung.tu}</td>
                    <td>{tuVung.phienAm}</td>
                    <td>{tuVung.dinhNghia}</td>
                    <td>{tuVung.loaiTu}</td>
                    <td>{tuVung.chuDe}</td>
                    <td>{tuVung.viDu}</td>
                    <td>{tuVung.dichNghiaVD}</td>
                    <td className="text-center">
                      {new Date(tuVung.createAt).toLocaleDateString()}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="8" className="text-center">
                      <img
                        src={tuVung.hinhAnh}
                        alt="Hình ảnh"
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              {isUpdating && (
                <div className="card-body">
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

export default QLTV_CT;
