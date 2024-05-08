
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import baiHocApi from "../Api/baiHocApi";
import khoaHocApi from "../Api/khoaHocApi";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function QLBH_CT() {
  let { id } = useParams();
  const auth = useSelector(authSelector);
  const [baiHoc, setBaiHoc] = useState([]);
  const [khoaHoc, setKhoaHoc] = useState([]);

  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const [newName, setNewName] = useState("");
  const [newMucTieu, setNewMucTieu] = useState("");
  const [newNoiDung, setNewNoiDung] = useState("");
  const [newHinhAnh, setNewHinhAnh] = useState("");
  const [newCreateAt, setNewCreateAt] = useState("");


  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedText, setSelectedText] = useState();

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
    const fetchData = async () => {
      try {
        const response = await baiHocApi.BaiHocHandler(
          `/${id}`,
          null,
          'get',
          auth.token
        );
        if (response.status === 'success') {
          const responseData = response.data.data;
          console.log(response);
          setBaiHoc(responseData);
          // Set các giá trị ban đầu cho state khi fetch dữ liệu thành công
          setSelectedCourses(responseData.khoaHoc && responseData.khoaHoc.id);
          setNewName(responseData.tenBaiHoc);
          setNewMucTieu(responseData.mucTieu);
          setNewNoiDung(responseData.noiDung);
          setNewHinhAnh(responseData.hinhAnh);
          setNewCreateAt(responseData.createAt);
        }
      } catch (error) {
        console.error('Loi fetch data: ', error);
      }
    };
    fetchData();
  }, [isUpdating]);

  const updateData = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('tenBaiHoc', newName);
      formData.append('mucTieu', newMucTieu);
      formData.append('noiDung', newNoiDung);
      formData.append('khoaHoc', selectedCourses);
      if (typeof newHinhAnh === 'object') {
        formData.append('image', newHinhAnh);
      } else {
        // Nếu newHinhAnh là đường dẫn
        formData.append('hinhAnh', newHinhAnh);
      }
      const currentTime = new Date();
      formData.append('createAt', currentTime.toISOString());

      const response = await baiHocApi.BaiHocHandler(
        `/${id}`,
        formData,
        'patch',
        auth.token
      );
      console.log(response);
      if (response.status === 'success') {
        toast.success('Cập nhật thành công!', {
          position: 'top-center',
          autoClose: 2000,
        });
        setIsUpdating(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật dữ liệu: ', error);
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
            <span className="sr-only">Updating...</span>
          </div>
        </div>
      )}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Chi tiết bài học</h1>
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

              <h3
                className="card-title"
                style={{ color: "#15d442", fontWeight: "bold" }}
              >
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
                      style={{ marginRight: '5px' }}
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
                      style={{ marginRight: '5px' }}
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
                    <th style={{ width: '15%' }}>Tên bài học</th>
                    <th style={{ width: '15%' }}>Mục tiêu</th>
                    <th style={{ width: '30%' }}>Nội dung</th>
                    <th style={{ width: '15%' }}>Thuộc khóa học</th>
                    <th style={{ width: '10%' }} className="text-center">
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
                      <img
                        src={baiHoc.hinhAnh}
                        alt="Hình ảnh"
                        style={{ maxWidth: '100%', height: 'auto' }}
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
                  <button
                    className="btn btn-success dropdown-toggle mb-2"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {selectedText
                      ? selectedText
                      : baiHoc.khoaHoc && baiHoc.khoaHoc.tenKhoahoc}
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
                      {khoaHoc.map((course) => (
                        <option key={course._id} value={course._id}>
                          {course.tenKhoahoc}
                        </option>
                      ))}
                    </select>
                  </div>
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
                        typeof newHinhAnh === 'object'
                          ? URL.createObjectURL(newHinhAnh)
                          : newHinhAnh
                      }
                      alt="Hình ảnh"
                      className="img-thumbnail mb-2"
                      style={{ maxHeight: '200px' }}
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
                      style={{ marginRight: '5px' }}
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
