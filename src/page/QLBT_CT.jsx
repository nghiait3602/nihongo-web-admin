import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import baiTapApi from "../Api/baitapApi";

function QLBT_CT() {
  let { id } = useParams();
  const auth = useSelector(authSelector);
  const [baiTap, setBaiTap] = useState([]);

  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [cauHoi, setCauHoi] = useState("");
  const [cauTraLoi, setCauTraLoi] = useState([]);
  const [cauTraLoiDung, setCauTraLoiDung] = useState("");
  const [diem, setDiem] = useState("");
  const [thuocBaiHoc, setThuocBaiHoc] = useState("");
  const [newCreateAt, setNewCreateAt] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await baiTapApi.BaiTapHandler(
          `/${id}`,
          null,
          "get",
          auth.token
        );
        if (response.status === "success") {
          const responseData = response.data.data;
          setBaiTap(responseData);
          setCauHoi(responseData.cauHoi);
          setCauTraLoi(responseData.cauTraLoi);
          setCauTraLoiDung(responseData.cauTraLoiDung);
          setDiem(responseData.diem);
          setThuocBaiHoc(responseData.baiHoc)
          setNewCreateAt(responseData.createAt);
        }
      } catch (error) {
        console.error("Loi fetch data: ", error);
      }
    };
    fetchData();
  }, [isUpdating]);

  return (
    <>
      <ToastContainer />
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Chi tiết bài tập</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/qlbt">Tất cả bài tập</a>
                </li>
                <li className="breadcrumb-item active">Chi tiết bài tập</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="card card-primary">
          <div className="card-header">
            <h3 className="card-title">Bài tập ID: {id}</h3>
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
              <label htmlFor="inputName">Câu Hỏi</label>
              <input
                type="text"
                id="inputName"
                className="form-control"
                defaultValue={cauHoi}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputDescription">
                Các Đáp Án
                <b style={{ fontStyle: "italic", opacity: "0.7" }}>
                  (4 câu - cách nhau bằng dấu phẩy)
                </b>
              </label>
              <textarea
                id="inputDescription"
                className="form-control"
                rows={4}
                defaultValue={cauTraLoi}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputStatus">Điểm</label>
              <select id="inputStatus" className="form-control custom-select">
                <option disabled>Chọn điểm</option>
                <option selected>{diem}</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="inputClientCompany">Thuộc Bài Học</label>
              <input
                type="text"
                id="inputClientCompany"
                className="form-control"
                defaultValue={thuocBaiHoc}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputProjectLeader">Ngày Tạo</label>
              <input
                type="text"
                id="inputProjectLeader"
                className="form-control"
                defaultValue={newCreateAt}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default QLBT_CT;
