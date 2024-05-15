import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import userApi from "../Api/userApi";

function QLUSER_CT() {
  let { id } = useParams();
  const auth = useSelector(authSelector);
  const [user, setUser] = useState([]);

  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [ngaySinh, setNgaySinh] = useState("");
  const [photo, setPhoto] = useState("");
  const [baiHocTiepTheo, setBaiHocTiepTheo] = useState("");
  const [tienTrinhCuaToi, setTienTrinhCuaToi] = useState([]);
  const [tuVungS, setTuVungS] = useState([]);
  const [nguPhapS, setNguPhapS] = useState([]);
  const [kanjiS, setKanjiS] = useState([]);
  const roleOptions = ["admin", "user"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userApi.UserHandler(
          `/${id}`,
          null,
          "get",
          auth.token
        );
        if (response.status === "success") {
          const responseData = response.data.data;
          setUser(responseData);
          setName(responseData.name);
          setEmail(responseData.email);
          setRole(responseData.role);
          setNgaySinh(responseData.ngaySinh);
          setPhoto(responseData.photo);
          setBaiHocTiepTheo(responseData.baiHocTiepTheo);
          setTienTrinhCuaToi(responseData.tienTrinhCuaToi);
          setKanjiS(responseData.kanjiS);
          setNguPhapS(responseData.nguPhapS);
          setTuVungS(responseData.tuVungS);
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
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("role", role);
      if (ngaySinh !== "" && validateDateFormat(ngaySinh)) {
        formData.append("ngaySinh", ngaySinh);
      } else {
        toast.warning("Ngày sinh không đúng vui lòng nhập lại", {
          position: "top-center",
          autoClose: 2000,
        });
        setIsLoading(false);
        return;
      }
      if (typeof photo === "object") {
        formData.append("image", photo);
      } else {
        formData.append("photo", photo);
      }

      const response = await userApi.UserHandler(
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
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật dữ liệu: ", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Lấy ra file ảnh từ sự kiện
    if (file) {
      setPhoto(file);
    }
  };

  const validateDateFormat = (dateString) => {
    const DDMMYYYY = /^([0-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/; //check validate có đúng dd/mm/yyy
    return DDMMYYYY.test(dateString); // return về true hoặc false
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
              <h1>Chi tiết user</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/qluser">Tất cả user</a>
                </li>
                <li className="breadcrumb-item active">Chi tiết user</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="card card-primary">
          <div className="card-header">
            <h3 className="card-title">User ID: {id}</h3>
            <div className="card-tools">
              <button
                type="button"
                className="btn btn-tool"
                data-card-widget="collapse"
                title="Collapse"
              >
                <i className="fas fa-minus" />
              </button>
            </div>
          </div>
          <div className="card-body">
            <div className="form-group">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Nhập link avatar"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
              />
              <input
                type="file"
                className="form-control-file mb-2"
                onChange={handleImageChange}
              />
              {photo && (
                <img
                  src={
                    typeof photo === "object"
                      ? URL.createObjectURL(photo)
                      : photo
                  }
                  alt="Hình ảnh cách viết"
                  className="img-thumbnail mb-2"
                  style={{ maxHeight: "200px" }}
                />
              )}
            </div>
            <div className="form-group">
              <label htmlFor="inputName">Name</label>
              <input
                type="text"
                id="inputName"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
                readOnly={!isUpdating}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputName">Email</label>
              <input
                type="text"
                id="inputName"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                readOnly={!isUpdating}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputStatus">Quyền</label>
              <select
                id="inputStatus"
                className="form-control custom-select"
                readOnly={!isUpdating}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option disabled>Phân quyền</option>
                {roleOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="inputName">Ngày Sinh</label>
              <input
                type="text"
                id="inputName"
                className="form-control"
                onChange={(e) => setNgaySinh(e.target.value)}
                value={ngaySinh}
                readOnly={!isUpdating}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputName">Bài Học Tiếp Theo</label>
              <input
                type="text"
                id="inputName"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={
                  baiHocTiepTheo
                    ? baiHocTiepTheo.tenBaiHoc
                    : "User này chưa bắt đầu học"
                }
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputName">Tiến trình của {name}</label>
                <textarea className="form-control mb-2" 
                  readOnly 
                  rows="5" 
                  value={tienTrinhCuaToi.length === 0 ? "User này chưa bắt đầu học" : 
                  tienTrinhCuaToi.map(item => `${item.baiHoc.tenBaiHoc}`).join('\n')}>
                </textarea>
            </div>
            {/* <div className="form-group">
              <label htmlFor="inputName">Tiến trình của {name}</label>
              <select
                className="form-control mb-2"
                value={tienTrinhCuaToi}
                readOnly
              >
                {tienTrinhCuaToi.length === 0 ? (
                  <option value="">User này chưa bắt đầu học</option>
                ) : (
                  tienTrinhCuaToi.map((lesson) => (
                    <option key={lesson._id} value={lesson._id}>
                      {lesson.baiHoc && lesson.baiHoc.tenBaiHoc}
                    </option>
                  ))
                )}
              </select>
            </div> */}
            <div className="form-group">
              <label htmlFor="inputName">Hán tự đã học</label>
                <textarea className="form-control mb-2" 
                  readOnly 
                  rows="5" 
                  value={kanjiS.length === 0 ? "User này chưa bắt đầu học" : 
                  kanjiS.map(item => `${item.hanTu} - ${item.hanViet} -  ${item.viDu}`).join('\n')}>
                </textarea>
            </div>
            <div className="form-group">
              <label htmlFor="inputName">Ngữ pháp đã học</label>
                <textarea className="form-control mb-2" 
                  readOnly 
                  rows="5" 
                  value={nguPhapS.length === 0 ? "User này chưa bắt đầu học" : 
                  nguPhapS.map(item => `${item.cauTruc}`).join('\n')}>
                </textarea>
            </div>
            <div className="form-group">
              <label htmlFor="inputName">Từ vựng đã học</label>
                <textarea className="form-control mb-2" 
                  readOnly 
                  rows="5" 
                  value={tuVungS.length === 0 ? "User này chưa bắt đầu học" : 
                  tuVungS.map(item => `${item.tu} - ${item.dinhNghia}`).join('\n')}>
                </textarea>
            </div>
            {isUpdating && (
              <>
                <button className="btn btn-primary" onClick={updateData}>
                  <i
                    className="fas fa-upload"
                    style={{ marginRight: "5px" }}
                  ></i>
                  Cập nhật
                </button>
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
              </>
            )}
            {!isUpdating && (
              <button
                type="button"
                className="btn btn-info"
                onClick={() => setIsUpdating(true)}
              >
                <i className="fas fa-pencil-alt"></i> Sửa
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default QLUSER_CT;
