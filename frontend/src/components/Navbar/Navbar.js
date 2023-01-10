import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./navbar.css";
import styled from "styled-components";
import { logoutUser } from "../../redux/authSlice";
import { toast } from "react-toastify";
const Navbar = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const user = auth?.admin
  console.log(user);
  return (
    <nav className="nav-bar">
      <Link to="/">
        <h2>Online Shop</h2>
      </Link>
      <Link to="/cart">
        <div className="nav_bag ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="currentColor"
            className="bi bi-bag-dash-fill"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zM6 9.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1H6z"
            />
          </svg>
          <span className="bag-quantity">
            <span>{cartTotalQuantity}</span>
          </span>
        </div>
      </Link>
      {auth._id ? (
        <Links>
          <div>
          { auth?.admin && <Link to="/admin/summary">Admin</Link>}
          </div>
          <Logout
            onClick={() => {
              dispatch(logoutUser(null));
              toast.warning("you have logged out");
            }}
          >
            Logout
          </Logout>
        </Links>
      ) : (
        <AuthLinks>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </AuthLinks>
      )}
    </nav>
  );
};

export default Navbar;
const AuthLinks = styled.div`
  a {
    &:last-child {
      margin-left: 2rem;
    }
  }
`;
const Logout = styled.div`
  color: white;
  cursor: pointer;
  margin-left: 8px;
`;
const Links = styled.div`
  color: white;
  cursor: pointer;
  display: flex;
`;
