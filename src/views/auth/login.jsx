import { useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";
import Cookies from "js-cookie";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();

  const { setIsAuthenticated } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();

    await api
      .post("/auth/login/", {
        email: email,
        password: password,
      })
      .then((response) => {
        Cookies.set("token", response.data.accessToken);
        const user = jwtDecode(response.data.accessToken);

        setIsAuthenticated(true);

        if (user.roleId != 1) {
          navigate("/user/dashboard", { replace: true });
        } else {
          navigate("/admin/dashboard", { replace: true });
        }
      })
      .catch((error) => {
        console.log(error);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      });
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-4">
        <div className="card border-0 rounded shadow-sm">
          <div className="card-body">
            <h4>LOGIN</h4>
            <hr />
            <form onSubmit={login}>
              <div className="form-group mb-3">
                <label className="mb-1 fw-bold">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  placeholder="Email Address"
                />
              </div>

              <div className="form-group mb-3">
                <label className="mb-1 fw-bold">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  placeholder="Password"
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                LOGIN
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
