import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { reset } from "../../../store/slice/authSlice";
import "./Navbar.css";

const Navbar = ({ updateCartVisibility }) => {
  const isLogged = useSelector((store) => store.auth.isLogged);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userTo = isLogged ? "/profile" : "/login";

  function logout() {
    dispatch(reset());
    navigate("/login");
  }

  // function getClass({ isActive }) {
  //   if (isActive) return "header_navlink hader_navlink_active";
  // }

  function handleCartClick() {
    if (isLogged) updateCartVisibility();
    else navigate("/login");
  }

  return (
    <header className="header_cont">
      <Link to={"/"} className="navbar_link">
        <h1>The Generic Store</h1>
      </Link>
      <nav className="navigation">
        <ul className="header_navlist">
          <li>
            <NavLink to={userTo} className="nav_button_link">
              <i className="bx bx-user"></i>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/purchases"} className="nav_button_link">
              <i className="bx bx-box"></i>
            </NavLink>
          </li>
          <li>
            <NavLink onClick={handleCartClick} className="nav_button_link">
              <i className="bx bx-cart-alt"></i>
            </NavLink>
          </li>
          {isLogged && (
            <li>
              <button onClick={logout} className="header_btn">
                <i className="bx bx-log-out"></i>
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
