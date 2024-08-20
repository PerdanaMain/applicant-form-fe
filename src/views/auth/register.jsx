import { useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../../services/api";
import Swal from "sweetalert2";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();

    await api
      .post("/auth/register/", {
        email: email,
        password: password,
      })
      .then(() => {
        navigate("/login");
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
    <div className="row justify-content-center">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-body">
              <h4>REGISTER</h4>
              <hr />
              <form onSubmit={register}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="form-group">
                      <label className="mb-1 fw-bold">Email address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        placeholder="Email Address"
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="form-group">
                      <label className="mb-1 fw-bold">Password</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        placeholder="Password"
                      />
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  REGISTER
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
