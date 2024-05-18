import { useState } from 'react';
import authenticationAPI from '../Api/authApi';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Forgot() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState();
  const navigate = useNavigate();
  const forgotPassword = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
    };
    try {
      setIsLoading(true);
      const res = await authenticationAPI.HandlerAuthentication(
        '/forgotPassword',
        data,
        'post'
      );
      setIsLoading(false);
      if (res.status === 'success') {
        toast.success('Mật khẩu mới đã gửi đến email của bạn!', {
          position: 'top-center',
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      setIsLoading(false);
      toast.warning('Lấy lại mật khẩu thất bại!', {
        position: 'top-center',
        autoClose: 2000,
      });
      console.log(error);
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
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Quên mật khẩu</h3>
                </div>
                <form id="quickForm">
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Email address</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="card-footer">
                    <button
                      onClick={forgotPassword}
                      className="btn btn-primary"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6"></div>
          </div>
        </div>
      </section>
    </>
  );
}
