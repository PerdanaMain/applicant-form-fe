import SidebarMenu from "../../components/Sidebar";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const Dashboard = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    // Get user data from cookies
    const token = Cookies.get("token");
    const data = jwtDecode(token);
    setUser(data);
  }, []);
  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-3">
          <SidebarMenu />
        </div>
        <div className="col-md-9">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-header">DASHBOARD</div>
            <div className="card-body">
              Selamat Datang, <strong>{user?.email}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
