import { useState, useEffect } from "react";
import SidebarMenu from "../../components/Sidebar";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../../services/api";

const Biodata = () => {
  const [biodata, setBioData] = useState([]);

  const fetchDataUsers = async () => {
    const token = Cookies.get("token");

    if (token) {
      try {
        const response = await api.get("/biodatas", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBioData(response.data.biodatas);
      } catch (error) {
        console.error("There was an error fetching the users!", error);
      }
    } else {
      console.error("Token is not available!");
    }
  };

  useEffect(() => {
    fetchDataUsers();
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-3">
          <SidebarMenu />
        </div>
        <div className="col-md-9">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-body">
              <table className="table table-bordered">
                <thead className="bg-dark text-white">
                  <tr>
                    <th scope="col">Nama</th>
                    <th scope="col">Posisi</th>
                    <th scope="col">Pendidikan</th>
                    <th scope="col" style={{ width: "17%" }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {biodata.length > 0 ? (
                    biodata.map((bio, index) => (
                      <tr key={index}>
                        <td>{bio.nama}</td>
                        <td>{bio.posisi}</td>
                        <td>{bio.email}</td>
                        <td className="text-center">
                          <Link className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2">
                            EDIT
                          </Link>
                          <button className="btn btn-sm btn-danger rounded-sm shadow border-0">
                            DELETE
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        <div className="alert alert-danger mb-0">
                          Data Belum Tersedia!
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Biodata;
