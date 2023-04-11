import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

const Login = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const Auth = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/login", {
        email: email,
        password: password,
      });
      const token = response.data.accessToken
      const decoded = jwt_decode(response.data.accessToken);
      localStorage.setItem('decoded', JSON.stringify(decoded));
      localStorage.setItem('token', token);
      // console.log("decoded", decoded);

      if (token) {
        history.push('/dashboard')
      }
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg || error.response.data[0].msg);
      }
    }
  };

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullWidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4-desktop">
              <form onSubmit={Auth} className="box">
                <p className="has-text-centered" style={{ color: 'red' }}>{msg}</p>
                <div className="field mt-5">
                  <label className="label">Email</label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Password</label>
                  <div className="controls">
                    <input
                      type="password"
                      className="input"
                      placeholder="******"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <button className="button is-success is-fullwidth">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
