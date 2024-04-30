import { useState } from "react";
import baiHocApi from "../Api/baiHocApi";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function QLBH_NEW() {
  const auth = useSelector(authSelector);

  const [newName, setNewName] = useState("");
  const [newMucTieu, setNewMucTieu] = useState("");
  const [newNoiDung, setNewNoiDung] = useState("");
  const [newHinhAnh, setNewHinhAnh] = useState("");

  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedText, setSelectedText] = useState("Chọn khóa học");

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

  const createData = async () => {
    try {
      const formData = new FormData();
      formData.append("tenBaiHoc", newName);
      formData.append("mucTieu", newMucTieu);
      formData.append("noiDung", newNoiDung);
      formData.append("khoaHoc", selectedCourses);

      if (typeof newHinhAnh === "object") {
        formData.append("image", newHinhAnh);
      } else {
        // Nếu newHinhAnh là đường dẫn
        formData.append("hinhAnh", newHinhAnh);
      }

      const response = await baiHocApi.BaiHocHandler(
        `/`,
        formData,
        "post",
        auth.token
      );
      console.log(response);
      if (response.status === "success") {
        toast.success("Tạo bài học thành công!", {
          position: "top-center",
          autoClose: 2000,
        });
        setTimeout(() => {
          window.location.href = "/qlbh";
        }, 2000);
      }
    } catch (error) {
      console.error("Lỗi dữ liệu: ", error);
      toast.error(`Tạo bài học thất bại!\nVui lòng kiểm tra lại thông tin.`, {
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
                <li className="breadcrumb-item active">Tạo bài học</li>
              </ol>
            </div>
          </div>
          <div className="card">
            <div className="card-body p-0">
              <div className="card-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Tên bài học"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Mục tiêu"
                  value={newMucTieu}
                  onChange={(e) => setNewMucTieu(e.target.value)}
                />
                <textarea
                  className="form-control mb-2"
                  placeholder="Nội dung"
                  value={newNoiDung}
                  onChange={(e) => setNewNoiDung(e.target.value)}
                />

                <button
                  className="btn btn-success dropdown-toggle mb-2"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {selectedText}
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <select
                    multiple
                    className="form-control"
                    onChange={chonKhoaHoc}
                  >
                    <option value="65ec6c83e897e10f2734fd06">
                      Khóa học HokkaiDo - N5
                    </option>
                    <option value="65ec6d8ce897e10f2734fd08">
                      Khóa học KyoTo - N4
                    </option>
                    <option value="65ec6dabe897e10f2734fd0a">
                      Khóa học OsaKa - N3
                    </option>
                    <option value="65ec6dc3e897e10f2734fd0c">
                      Khóa học ToKyo - N2
                    </option>
                    <option value="65ec6e25e897e10f2734fd0f">
                      Khóa học Nagasaki - N1
                    </option>
                  </select>
                </div>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="URL hình ảnh"
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
              </div>
            </div>
          </div>
          <button className="btn btn-primary" onClick={createData}>
            <i
              className="fas fa-plus-circle"
              style={{ marginRight: "5px" }}
            ></i>
            Tạo bài học
          </button>
        </div>
      </div>
    </>
  );
}

export default QLBH_NEW;
