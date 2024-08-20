import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "../context/AuthContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const logout = () => {
    Cookies.remove("token");

    setIsAuthenticated(false);

    navigate("/login");
  };

  return (
    <div className="card border-0 rounded shadow-sm">
      <div className="card-header">MAIN MENU</div>
      <div className="card-body">
        <div className="list-group">
          <Link
            to="/admin/dashboard"
            className="list-group-item list-group-item-action"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/biodata"
            className="list-group-item list-group-item-action"
          >
            Biodata
          </Link>
          <a
            onClick={logout}
            href="#"
            className="list-group-item list-group-item-action"
            style={{ cursor: "pointer" }}
          >
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
