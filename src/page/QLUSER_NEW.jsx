import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import userApi from "../Api/userApi";

function QLUSER_NEW() {
  const auth = useSelector(authSelector);
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [ngaySinh, setNgaySinh] = useState("");
  const [password, setPassword]= useState("");
  const [passwordConfirm, setPasswordConfirm]= useState("");
  const [photo, setPhoto] = useState("");

  const createData = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("role", role);
      formData.append("password", password);
      formData.append("passwordConfirm", passwordConfirm);
      if(password !== passwordConfirm){
        toast.warning("Xác nhận mật khẩu không đúng vui lòng nhập lại", {
          position: "top-center",
          autoClose: 2000,
        });
        setIsLoading(false);
        return;
      }
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
        `/`,
        formData,
        "post",
        auth.token
      );
      console.log(response);
      if (response.status === "success") {
        toast.success("Tạo user thành công!", {
          position: "top-center",
          autoClose: 2000,
        });
        setIsLoading(false);
        setTimeout(() => {
          window.location.href = "/qluser";
        }, 2000);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Lỗi dữ liệu: ", error);
      toast.error(`Tạo user thất bại!\nVui lòng kiểm tra lại thông tin.`, {
        position: "top-center",
        autoClose: 2000,
      });
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
            <span className="sr-only">Creating...</span>
          </div>
        </div>
      )}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Tạo admin</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/qluser">Tất cả user</a>
                </li>
                <li className="breadcrumb-item active">Tạo admin</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="card card-primary">
          <div className="card-header">
            <h3 className="card-title">Thông tin admin mới</h3>
          </div>
          <div className="card-body">
            <form onSubmit={createData}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Nhập link avatar"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  required
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
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
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputName">Ngày sinh</label>
                <input
                  type="text"
                  id="inputName"
                  className="form-control"
                  onChange={(e) => setNgaySinh(e.target.value)}
                  value={ngaySinh}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputName">Mật khẩu</label>
                <input
                  type="password"
                  id="inputName"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputName">Xác nhận lại mật khẩu</label>
                <input
                  type="password"
                  id="inputName"
                  className="form-control"
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  value={passwordConfirm}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                <i className="fas fa-upload" style={{ marginRight: "5px" }}></i>
                Tạo admin
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default QLUSER_NEW;
