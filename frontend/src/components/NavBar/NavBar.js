import "./NavBar.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import HomeIcon from "../../assets/home.png";
import Basket from "../../assets/basket.png";
import Cart from "../../assets/cart.png";
import LogOut from "../../assets/Log Out.png";
import Login from "../../assets/Log in.png";
import { useSelector, useDispatch } from "react-redux";
import { handleLogout } from "../../redux/reducers/authReducer";
import { navActions } from "../../redux/reducers/navReducer";
import { useState } from "react";

const NavBar = () => {
  const [flag, setFlag] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const log = useSelector((state) => state.nav.log);

  function setter(val) {
    setFlag(val);
  }

  async function handleLogoutAndNavigate() {
    console.log("Logout button clicked!");
    
    try {
      const result = await dispatch(handleLogout());  // ✅ Await this
      console.log("Logout dispatch result:", result);
    } catch (error) {
      console.error("Logout error:", error);
    }
  
    dispatch(navActions.fuller());
    navigate("/");
  }
  

  return (
    <>
      <div className="naviB">
        <p>Busy Buy</p>
        <div id="cluster">
          <NavLink to="/" id="ho">
            <img src={HomeIcon} alt="Home" className="icon" onClick={() => setter(false)} /> Home
          </NavLink>

          {!log && (
            <>
              <NavLink
                style={({ isActive }) => (isActive ? { color: "blue" } : undefined)}
                to="/orders"
                id="ho"
              >
                <img src={Basket} alt="Basket" className="icon" /> My Orders
              </NavLink>

              <NavLink
                style={({ isActive }) => (isActive ? { color: "blue" } : undefined)}
                to="/cart"
                id="ho"
              >
                <img src={Cart} alt="Cart" className="icon" onClick={() => setter(true)} /> Cart
              </NavLink>
            </>
          )}

          {log ? (
            <NavLink to="/login" id="ho">
              <img src={Login} alt="Login" className="icon" /> Signin
            </NavLink>
          ) : (
            <button id="ho" onClick={handleLogoutAndNavigate}>
              <img src={LogOut} alt="Log Out" className="icon" /> Log Out
            </button>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default NavBar;
