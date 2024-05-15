import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import khoaHocApi from "../Api/khoaHocApi";

function QLKH_CT() {
  let { id } = useParams();
  const auth = useSelector(authSelector);
  const [khoaHoc, setKhoaHoc] = useState([]);

  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [tenKhoahoc, settenKhoahoc] = useState("");
  const [moTa, setMoTa] = useState("");
  const [capDo, setCapDo] = useState("");
  const [hinhAnh, setHinhAnh] = useState("");
  const [dsNguoiHoc, setDSNguoiHoc] = useState([]);
  const [dsBaiHoc, setDSBaiHoc] = useState([]);
  const [newCreateAt, setNewCreateAt] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await khoaHocApi.KhoaHocHandler(
          `/${id}`,
          null,
          "get",
          auth.token
        );
        if (response.status === "success") {
          const responseData = response.data.data;
          setKhoaHoc(responseData);
          settenKhoahoc(responseData.tenKhoahoc);
          setMoTa(responseData.moTa);
          setCapDo(responseData.capDo);
          setHinhAnh(responseData.hinhAnh);
          setDSNguoiHoc(responseData.dsNguoiHoc);
          setDSBaiHoc(responseData.dsBaiHoc);
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
      setIsLoading(true);
      const formData = new FormData();
      formData.append("tenKhoahoc", tenKhoahoc);
      formData.append("moTa", moTa);
      formData.append("capDo", capDo);
      if (typeof photo === "object") {
        formData.append("image", hinhAnh);
      } else {
        formData.append("hinhAnh", hinhAnh);
      }

      const response = await khoaHocApi.KhoaHocHandler(
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
      setHinhAnh(file);
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
              <h1>Chi tiết khóa học</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/qlkh">Tất cả khóa học</a>
                </li>
                <li className="breadcrumb-item active">Chi tiết khóa học</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="card card-primary">
          <div className="card-header">
            <h3 className="card-title">Khóa học ID: {id}</h3>
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
                placeholder="Nhập link hình"
                value={hinhAnh}
                onChange={(e) => setHinhAnh(e.target.value)}
              />
              <input
                type="file"
                className="form-control-file mb-2"
                onChange={handleImageChange}
              />
              {hinhAnh && (
                <img
                  src={
                    typeof hinhAnh === "object"
                      ? URL.createObjectURL(hinhAnh)
                      : hinhAnh
                  }
                  alt="Hình ảnh khóa học"
                  className="img-thumbnail mb-2"
                  style={{ maxHeight: "200px" }}
                />
              )}
            </div>
            <div className="form-group">
              <label htmlFor="inputName">Tên Khóa học</label>
              <input
                type="text"
                id="inputName"
                className="form-control"
                onChange={(e) => settenKhoahoc(e.target.value)}
                value={tenKhoahoc}
                readOnly={!isUpdating}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputName">Mô tả</label>
              <input
                type="text"
                id="inputName"
                className="form-control"
                onChange={(e) => setMoTa(e.target.value)}
                value={moTa}
                readOnly={!isUpdating}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputName">Cấp độ</label>
              <input
                type="text"
                id="inputName"
                className="form-control"
                onChange={(e) => setCapDo(e.target.value)}
                value={capDo}
                readOnly={!isUpdating}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputName">Ngày tạo</label>
              <input
                type="text"
                id="inputName"
                className="form-control"
                onChange={(e) => setNewCreateAt(e.target.value)}
                value={newCreateAt}
                readOnly
              />
            </div>
            {/* <div className="form-group">
              <label htmlFor="inputName">Danh sách người học</label>
              <select className="form-control mb-2" value={dsNguoiHoc} readOnly>
                {dsNguoiHoc.length === 0 ? (
                  <option value="">Chưa có user bắt đầu học khóa học này</option>
                ) : (
                  dsNguoiHoc.map((nguoiHoc) => (
                    <option key={nguoiHoc._id} value={nguoiHoc._id}>
                      {nguoiHoc.name} - {nguoiHoc.email}
                    </option>
                  ))
                )}
              </select>
            </div> */}
            {/* <div className="form-group">
              <label htmlFor="inputName">Danh sách người học</label>
              <textarea
                className="form-control mb-2"
                readOnly
                rows="5"
                value={
                  dsNguoiHoc.length === 0? "Chưa có user bắt đầu học khóa học này"
                  : dsNguoiHoc.map((nguoihoc) => `${nguoihoc.name} - ${nguoihoc.email}`).join("\n")}
              ></textarea>
            </div> */}
            <div className="form-group">
              <label htmlFor="inputName">Danh sách người học</label>
              <ul className="list-group">
                {dsNguoiHoc.length === 0 ? (
                  <li className="list-group-item">
                    Chưa có user bắt đầu học khóa học này
                  </li>
                ) : (
                  dsNguoiHoc.map((nguoihoc) => (
                    <li key={nguoihoc.id} className="list-group-item">
                      <Link
                        to={`/qluser/chi-tiet-user/${nguoihoc.id}`}
                      >
                        <span>{`${nguoihoc.name} - ${nguoihoc.email}`}</span>
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </div>
            {/* <div className="form-group">
              <label htmlFor="inputName">Danh sách bài học</label>
              <select className="form-control mb-2" value={dsBaiHoc} readOnly>
                {dsBaiHoc.length === 0 ? (
                  <option value="">Chưa có bài học cho khóa học này</option>
                ) : (
                  dsBaiHoc.map((baihoc) => (
                    <option key={baihoc._id} value={baihoc._id}>
                      {baihoc.tenBaiHoc} - {baihoc.mucTieu}
                    </option>
                  ))
                )}
              </select>
            </div> */}
            {/* <div className="form-group">
              <label htmlFor="inputName">Danh sách bài học</label>
                <textarea className="form-control mb-2" 
                  readOnly 
                  rows="5" 
                  value={dsBaiHoc.length === 0 ? "Chưa có bài học cho khóa học này" : 
                  dsBaiHoc.map(baihoc => `${baihoc.tenBaiHoc} - ${baihoc.mucTieu}`).join('\n')}>
                </textarea>
            </div> */}
            <div className="form-group">
              <label htmlFor="inputName">Danh sách bài học</label>
              <ul className="list-group">
                {dsBaiHoc.length === 0 ? (
                  <li className="list-group-item">
                    Chưa có bài học cho khóa học này
                  </li>
                ) : (
                  dsBaiHoc.map((baihoc) => (
                    <li key={baihoc.id} className="list-group-item">
                      <Link
                        to={`/qlbh/chi-tiet-bai-hoc/${baihoc.id}`}
                      >
                        <span>{`${baihoc.tenBaiHoc} - ${baihoc.mucTieu}`}</span>
                      </Link>
                    </li>
                  ))
                )}
              </ul>
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

export default QLKH_CT;
