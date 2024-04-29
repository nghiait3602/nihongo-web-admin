import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import baiHocApi from "../Api/baiHocApi";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";

function QLBH_CT() {
  let { id } = useParams();
  const auth = useSelector(authSelector);
  const [baiHoc, setBaiHoc] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await baiHocApi.BaiHocHandler(
          `/${id}`,
          null,
          "get",
          auth.token
        );
        if (response.status === "success") {
          const responseData = response.data.data;
          console.log(response);
          setBaiHoc(responseData);
        }
      } catch (error) {
        console.error("Loi fetch data: ", error);
      }
    };
    fetchData();
  }, []);

  return (
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
            <h3 className="card-title" style={{ color: "#15d442" }}>
              Bài học ID: {id}
            </h3>
            <div className="card-tools">
              <button
                type="button"
                className="btn btn-tool"
                data-card-widget="collapse"
                title="Collapse"
              >
                <i className="fas fa-minus" />
              </button>
              <button
                type="button"
                className="btn btn-tool"
                data-card-widget="remove"
                title="Remove"
              >
                <i className="fas fa-times" />
              </button>
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
                    <img src={baiHoc.hinhAnh} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QLBH_CT;
