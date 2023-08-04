import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { startSessionThunk } from "../../store/slice/authSlice";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./Login.css";

const Login = () => {
  const isLogged = useSelector((store) => store.auth.isLogged);
  const location = useLocation();
  const from = location.state?.from;
  const dispatch = useDispatch();

  function handleLogin(loginData) {
    dispatch(startSessionThunk(loginData));
  }

  return (
    <div className="login_page">
      <section className="login_form_cont">
        <p>Welcome! Enter your email and password to continue</p>
        <section className="login_data">
          <h2>
            <i className="bx bxs-user"></i>
          </h2>
          <ul className="data_list">
            <li>
              <b>Email: </b> <p>testemail001@gmail.com</p>
            </li>
            <li>
              <b>Password: </b> <p>testaccount</p>
            </li>
          </ul>
        </section>
        <LoginForm onLogin={handleLogin} />
      </section>
      {isLogged && <Navigate to={from ?? "/"} />}
    </div>
  );
};

export default Login;
