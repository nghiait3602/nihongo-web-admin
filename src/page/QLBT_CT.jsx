import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelector } from '../redux/reducers/authReducer';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import baiTapApi from '../Api/baitapApi';
import baiHocApi from '../Api/baiHocApi';
import khoaHocApi from '../Api/khoaHocApi';

function QLBT_CT() {
  let { id } = useParams();
  const auth = useSelector(authSelector);
  const [baiTap, setBaiTap] = useState([]);
  const [baiHoc, setBaiHoc] = useState([]);
  const [khoaHoc, setKhoaHoc] = useState([]);

  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [cauHoi, setCauHoi] = useState('');
  const [cauTraLoi, setCauTraLoi] = useState([]);
  const [cauTraLoiDung, setCauTraLoiDung] = useState('');
  const [diem, setDiem] = useState('');
  const [thuocBaiHoc, setThuocBaiHoc] = useState('');
  const [newCreateAt, setNewCreateAt] = useState('');
  const diemOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
          '/',
          null,
          'get',
          auth.token
        );
        if (response.status === 'success') {
          const responseData = response.data.data;
          setKhoaHoc(responseData);
        }
      } catch (error) {
        console.error('Loi fetch data: ', error);
      }
    };
    fetchKHData();
  }, []);

  useEffect(() => {
    const fetchBHData = async () => {
      try {
        const response = await baiHocApi.BaiHocHandler(
          '/',
          null,
          'get',
          auth.token
        );
        if (response.status === 'success') {
          const responseData = response.data.data;
          setBaiHoc(responseData);
        }
      } catch (error) {
        console.error('Loi fetch data: ', error);
      }
    };
    fetchBHData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await baiTapApi.BaiTapHandler(
          `/${id}`,
          null,
          'get',
          auth.token
        );
        if (response.status === 'success') {
          const responseData = response.data.data;
          setBaiTap(responseData);
          setCauHoi(responseData.cauHoi);
          setCauTraLoi(responseData.cauTraLoi);
          setCauTraLoiDung(responseData.cauTraLoiDung);
          setDiem(responseData.diem);
          setThuocBaiHoc(responseData.baiHoc);
          setNewCreateAt(responseData.createAt);
          setSelectedLesson(responseData.baiHoc);
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
      let cauTraLoiArray = [];
      if (cauTraLoi.includes(',')) {
        if (cauTraLoi.split(',').length === 4) {
          cauTraLoiArray = cauTraLoi.split(',').map((item) => item.trim());
        } else {
          setIsLoading(false);
          toast.warning('Các đáp án phải có đúng 4 câu!', {
            position: 'top-center',
            autoClose: 2000,
          });
          return;
        }
      } else {
        cauTraLoiArray = [...cauTraLoi];
      }
      const reqBody = {
        cauHoi,
        cauTraLoi: cauTraLoiArray,
        cauTraLoiDung,
        diem,
        baiHoc: selectedLesson,
        createAt: new Date().toISOString(),
      };
      const response = await baiTapApi.BaiTapHandler(
        `/${id}`,
        reqBody,
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
      console.error('Loi fetch data: ', error);
    }
  };

  return (
    <>
      <ToastContainer />
      {isLoading && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '9999',
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
                value={cauHoi}
                onChange={(e) => setCauHoi(e.target.value)}
                readOnly={!isUpdating}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputDescription">
                Các Đáp Án Lựa Chọn
                <b
                  style={{ fontStyle: 'italic', opacity: '0.7', color: 'red' }}
                >
                  {' '}
                  *4 câu - cách nhau bằng dấu phẩy
                </b>
              </label>
              <textarea
                id="inputDescription"
                className="form-control"
                rows={4}
                onChange={(e) => setCauTraLoi(e.target.value)}
                value={cauTraLoi}
                readOnly={!isUpdating}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputName">Đáp Án Đúng</label>
              <input
                type="text"
                id="inputName"
                className="form-control"
                onChange={(e) => setCauTraLoiDung(e.target.value)}
                value={cauTraLoiDung}
                readOnly={!isUpdating}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputStatus">Điểm</label>
              <select
                id="inputStatus"
                className="form-control custom-select"
                readOnly={!isUpdating}
                value={diem}
                onChange={(e) => setDiem(e.target.value)}
              >
                <option disabled>Chọn điểm</option>
                {diemOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="inputClientCompany">Thuộc Bài Học</label>
              <br></br>
              <button
                className="btn btn-success dropdown-toggle mb-2"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {selectedCourse
                  ? khoaHoc.find((course) => course._id === selectedCourse)
                      ?.tenKhoahoc
                  : baiHoc.find((lesson) => lesson._id === thuocBaiHoc)
                      ?.tenBaiHoc}
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <select
                  multiple
                  className="form-control mb-2"
                  value={selectedCourse}
                  onChange={handleCourseChange}
                >
                  {/* Render lựa chon dựa theo khóa hoc */}
                  {khoaHoc.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.tenKhoahoc}
                    </option>
                  ))}
                </select>
              </div>
              {selectedCourse && (
                <div>
                  <select
                    className="form-control mb-2"
                    value={selectedLesson}
                    onChange={handleLessonChange}
                  >
                    <option value="">-- Chọn bài học --</option>
                    {/* Render bài học theo lựa chọn */}
                    {baiHoc
                      .filter((lesson) => lesson.khoaHoc._id === selectedCourse)
                      .map((lesson) => (
                        <option key={lesson._id} value={lesson._id}>
                          {lesson.tenBaiHoc}
                        </option>
                      ))}
                  </select>
                </div>
              )}
              <input
                type="text"
                id="inputClientCompany"
                className="form-control"
                value={thuocBaiHoc}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputProjectLeader">Ngày Tạo</label>
              <input
                type="text"
                id="inputProjectLeader"
                className="form-control"
                onChange={(e) => setNewCreateAt(e.target.value)}
                value={newCreateAt}
                readOnly
              />
            </div>
            {isUpdating && (
              <>
                <button className="btn btn-primary" onClick={updateData}>
                  <i
                    className="fas fa-upload"
                    style={{ marginRight: '5px' }}
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
                    style={{ marginRight: '5px' }}
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

export default QLBT_CT;
