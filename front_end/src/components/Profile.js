import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";
function Profile() {
  const [mypics, setPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState("");

  useEffect(() => {
    fetch("/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPics(result.mypost);
      });
  }, []);

  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "insta-clone");
      data.append("cloud_name", "khan-123");
      fetch("https://api.cloudinary.com/v1_1/khan123/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          fetch("/updatepic", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              pic: data.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              localStorage.setItem(
                "user",
                JSON.stringify({ ...state, pic: result.pic })
              );
              dispatch({ type: "UPDATEPIC", payload: result.pic });
              //window.location.reload()
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [image]);

  const updatePhoto = (file) => {
    setImage(file);
  };

  return (
    <div style={{ maxWidth: "450px", margin: "0px auto" }}>
      <div
        className="row"
        style={{ margin: "18px 0px", borderBottom: "1px solid grey" }}
      >
        <div
        // style={{
        //   display: "flex",
        //   justifyContent: "space-around",
        // }}
        >
          <div className="profile-pic col s12 m6 l6">
            <img
              style={{ width: "140px", height: "140px", borderRadius: "80px" }}
              src={state ? state.pic : "loading"}
              alt="profile"
            />
          </div>
          <div className="profile-details col s12 m6 l6">
            <h4>{state ? state.name : "loading"}</h4>
            <h6>{state ? state.email : "loading"}</h6>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <h6>{mypics.length} posts</h6>
              <h6>{state ? state.followers.length : "0"} followers</h6>
              <h6>{state ? state.following.length : "0"} following</h6>
            </div>
          </div>
        </div>
        <div className="file-field input-field col s12 m6 l6">
          <div className="btn #64b5f6 blue darken-1" style={{ width: "100%" }}>
            <span>Update pic</span>
            <input
              type="file"
              onChange={(e) => updatePhoto(e.target.files[0])}
            />
          </div>
          {/* <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div> */}
        </div>
      </div>

      <div className="row">
        {mypics.map((item) => {
          return (
            <div className="col s12 m12 l6">
              <img
                key={item._id}
                className="item"
                src={item.photo}
                alt={item.title}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
