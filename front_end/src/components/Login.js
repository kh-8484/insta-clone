import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import { UserContext } from "../App";
function Login() {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const PostData = () => {
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#c62828 red darken-3" });
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          M.toast({ html: "signed in", classes: "#43a047 green darken-1" });
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2>Instagram</h2>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          style={{ marginTop: "15px" }}
          className="btn waves-effect waves-light #64b5f6 blue darken-1"
          onClick={() => PostData()}
        >
          Log In
        </button>
        {/* <img
          style={{ width: "300px", height: "300px" }}
          src="http://mernthapatechnical.herokuapp.com/static/media/login.24119542.svg"
          alt=""
        /> */}
        <h6>
          <Link to="/signup">
            Don't have an <span style={{ color: "blue" }}>account?</span>
          </Link>
        </h6>
        <h6>
          <Link to="/reset">
            Forgot <span style={{ color: "blue" }}>password?</span>
          </Link>
        </h6>
      </div>
    </div>
  );
}

export default Login;
