import { useState } from 'react';
import authenticationAPI from '../Api/authApi';
// import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addAuth } from '../redux/reducers/authReducer';
import { NavLink } from 'react-router-dom';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const data = {
    email: email,
    password: password,
  };
  function onChangeEmail(e) {
    setEmail(e.target.value);
  }
  function onChangePassword(e) {
    setPassword(e.target.value);
  }
  const handlerLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await authenticationAPI.HandlerAuthentication(
        '/login',
        data,
        'post'
      );
      if (res.token && res.data.user) {
        const dataFetch = {
          id: res.data.user.id,
          email: res.data.user.email,
          token: res.token,
        };
        dispatch(addAuth(dataFetch));
        localStorage.setItem('auth', JSON.stringify(dataFetch));
        // navigate('/home');
        // window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <a href="../../index2.html">
            <b>Admin</b> Nihongo App
          </a>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <form method="post">
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={onChangeEmail}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={onChangePassword}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">Lưu mật khẩu</label>
                  </div>
                </div>
                <div className="col-4">
                  <button
                    onClick={handlerLogin}
                    className="btn btn-primary btn-block"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </form>
            <p className="mb-1">
              <NavLink to="/forgot" className="nav-link">
                <a href="forgot-password.html">I forgot my password</a>
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
