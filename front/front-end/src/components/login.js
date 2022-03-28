import { useFormik } from "formik";
import React from "react";
import { login } from "../services/auth";
import { useHistory } from "react-router-dom";
export default function Login() {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      const data = formik.values;
      console.log(data);
      login(data, history);
      formik.resetForm({
        values: {
          email: "",
          password: "",
        },
      });
    },
  });

  return (
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form className="p-1" onSubmit={formik.handleSubmit}>
            <h3>Sign In</h3>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                name="email"
                id="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
