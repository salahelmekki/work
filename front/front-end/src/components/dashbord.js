import axios from "axios";
import React, { useState } from "react";
export default function Dashbord() {
  const [ville, setVille] = useState("");
  const [femme, setFemme] = useState("");
  const [data, setData] = useState(null);
  const token = localStorage.getItem("token");
  /* 3. Get Ref Value here (or anywhere in the code!) */
 
  // get data of hometown and femme age gt 30
  async function getUserData(data) {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/users/?hometown=" + data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  //get data of range age between 18 and 25
  async function getDataAge() {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/users/?age=",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  if (ville) {
    getUserData(ville);
  }
  if (femme) {
    getUserData(femme);
  }

  return (
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner-dashbord">
          <div className="d-flex justify-content-between">
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                chercher avec ville
              </span>
              <input
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                name="ville"
                // value={target.value}
                onChange={(e) => setVille(e.target.value)}
              />
            </div>
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                checher avec ville pour femme age 30
              </span>
              <input
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm"
                name="femme"
                onChange={(e) => setFemme({ val: e.target.value })}
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary mb-3" onClick={() => {getDataAge()}}>
                chercher range age entre 18 et 25
              </button>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Nom</th>
                <th scope="col">Prénom</th>
                <th scope="col">ville</th>
                <th scope="col">Age</th>
                <th scope="col">gender</th>
              </tr>
            </thead>
            <tbody>
                {data ? data.map((item,index) => 
                    <tr key={index}>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.userprofile.hometown}</td>
                    <td>{item.userprofile.age}</td>
                    <td>{item.userprofile.gender}</td>
                  </tr>
                ):null}
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
