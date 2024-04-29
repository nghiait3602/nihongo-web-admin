import { useState, useEffect } from "react";
import baiHocApi from "../Api/baiHocApi";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function QLBH_CT() {
  const auth = useSelector(authSelector);
  const [baiHoc, setBaiHoc] = useState([]);

  const [isUpdating, setIsUpdating] = useState(false);

  const [newName, setNewName] = useState("");
  const [newMucTieu, setNewMucTieu] = useState("");
  const [newNoiDung, setNewNoiDung] = useState("");
  const [newKhoaHoc, setNewKhoaHoc] = useState("");
  const [newHinhAnh, setNewHinhAnh] = useState("");
  const [newCreateAt, setNewCreateAt] = useState("");

  const updateData = async () => {
    try {
      const formData = new FormData();
      formData.append("tenBaiHoc", newName);
      formData.append("mucTieu", newMucTieu);
      formData.append("noiDung", newNoiDung);
      if (typeof newHinhAnh === "object") {
        formData.append("image", newHinhAnh);
      } else {
        // Nếu newHinhAnh là đường dẫn
        formData.append("hinhAnh", newHinhAnh);
      }
      const currentTime = new Date();
      formData.append("createAt", currentTime.toISOString());

      const response = await baiHocApi.BaiHocHandler(
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
              <h1>Tạo bài học</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/qlbh">Tất cả bài học</a>
                </li>
                <li className="breadcrumb-item active">Chi tiết bài học</li>
              </ol>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h3 className="card-title" style={{ color: "#15d442" }}>
                Bài học ID: {id}
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
                    <th style={{ width: "15%" }}>Tên bài học</th>
                    <th style={{ width: "15%" }}>Mục tiêu</th>
                    <th style={{ width: "30%" }}>Nội dung</th>
                    <th style={{ width: "15%" }}>Thuộc khóa học</th>
                    <th style={{ width: "10%" }} className="text-center">
                      Ngày tạo
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{baiHoc.tenBaiHoc}</td>
                    <td>{baiHoc.mucTieu}</td>
                    <td>{baiHoc.noiDung}</td>
                    <td>{baiHoc.khoaHoc && baiHoc.khoaHoc.tenKhoahoc}</td>
                    <td className="text-center">
                      {new Date(baiHoc.createAt).toLocaleDateString()}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="5" className="text-center">
                      <img src={baiHoc.hinhAnh} alt="Hình ảnh" />
                    </td>
                  </tr>
                </tbody>
              </table>
              {isUpdating && (
                <div className="card-body">
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Tên bài học mới"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Mục tiêu mới"
                    value={newMucTieu}
                    onChange={(e) => setNewMucTieu(e.target.value)}
                  />
                  <textarea
                    className="form-control mb-2"
                    placeholder="Nội dung mới"
                    value={newNoiDung}
                    onChange={(e) => setNewNoiDung(e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Thuộc khóa học mới"
                    value={newKhoaHoc}
                    onChange={(e) => setNewKhoaHoc(e.target.value)}
                    readOnly
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

export default QLBH_CT;
