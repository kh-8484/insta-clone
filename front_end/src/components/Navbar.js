// import React, { useContext, useRef, useEffect, useState } from "react";
// import { Link, useHistory } from "react-router-dom";
// import { UserContext } from "../App";
// import M from "materialize-css";

// function Navbar() {
//   const searchModal = useRef(null);
//   const [search, setSearch] = useState("");
//   const [userDetails, setUserDetails] = useState([]);
//   const { state, dispatch } = useContext(UserContext);
//   const history = useHistory();
//   useEffect(() => {
//     M.Modal.init(searchModal.current);
//   }, []);
//   const renderList = () => {
//     if (state) {
//       return [
//         <li key="1">
//           <i
//             data-target="modal1"
//             className="large material-icons modal-trigger"
//             style={{ color: "black" }}
//           >
//             search
//           </i>
//         </li>,
//         <li key="2">
//           <Link to="/profile">Profile</Link>
//         </li>,
//         <li key="3">
//           <Link to="/create">Create Post</Link>
//         </li>,
//         <li key="4">
//           <Link to="/myfollowingpost">My following Posts</Link>
//         </li>,
//         <li key="5">
//           <button
//             className="btn #c62828 red darken-3"
//             onClick={() => {
//               localStorage.clear();
//               dispatch({ type: "CLEAR" });
//               history.push("/login");
//             }}
//           >
//             Log out
//           </button>
//         </li>,
//       ];
//     } else {
//       return [
//         <li key="6">
//           <Link to="/login">Login</Link>
//         </li>,
//         <li key="7">
//           <Link to="/signup">Signup</Link>
//         </li>,
//       ];
//     }
//   };

//   const fetchUsers = (query) => {
//     setSearch(query);
//     fetch("/search-users", {
//       method: "post",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         query,
//       }),
//     })
//       .then((res) => res.json)
//       .then((results) => {
//         //console.log(results);
//         setUserDetails(results.user);
//       });
//   };

//   return (
//     <nav>
//       <div className="nav-wrapper white">
//         <Link to={state ? "/" : "/login"} className="brand-logo left">
//           Instagram
//         </Link>
//         <ul id="nav-mobile" className="right">
//           {renderList()}
//         </ul>
//       </div>

//       <div
//         id="modal1"
//         class="modal"
//         ref={searchModal}
//         style={{ color: "black" }}
//       >
//         <div className="modal-content">
//           <input
//             type="text"
//             placeholder="search users"
//             value={search}
//             onChange={(e) => fetchUsers(e.target.value)}
//           />
//           <ul className="collection">
//             {userDetails.map((item) => {
//               return (
//                 <Link
//                   to={
//                     item._id !== state._id ? "/profile/" + item._id : "/profile"
//                   }
//                   onClick={() => {
//                     M.Modal.getInstance(searchModal.current).close();
//                     setSearch("");
//                   }}
//                 >
//                   <li className="collection-item">{item.email}</li>
//                 </Link>
//               );
//             })}
//           </ul>
//         </div>
//         <div className="modal-footer">
//           <button
//             className="modal-close waves-effect waves-green btn-flat"
//             onClick={() => setSearch("")}
//           >
//             close
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
import React, { useContext, useRef, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import M from "materialize-css";
const Navbar = () => {
  const searchModal = useRef(null);
  const searchSideNav = useRef(null);
  const [search, setSearch] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    M.Modal.init(searchModal.current);
    M.Sidenav.init(searchSideNav.current);
  }, []);
  // document.addEventListener("DOMContentLoaded", function () {
  //   var elems = document.querySelectorAll(".sidenav");
  //   var instances = M.Sidenav.init(elems, options);
  // });
  // // Or with jQuery
  // $(document).ready(function () {
  //   $(".sidenav").sidenav();
  // });
  const renderList = () => {
    if (state) {
      return [
        <li
          key="1"
          onClick={() => {
            M.Sidenav.getInstance(searchSideNav.current).close();
          }}
        >
          <i
            data-target="modal1"
            className="large material-icons modal-trigger searchIcon"
            style={{ color: "black" }}
          >
            search
          </i>
        </li>,
        <li
          key="2"
          onClick={() => {
            M.Sidenav.getInstance(searchSideNav.current).close();
          }}
        >
          <Link to="/profile">Profile</Link>
        </li>,
        <li
          key="3"
          onClick={() => {
            M.Sidenav.getInstance(searchSideNav.current).close();
          }}
        >
          <Link to="/create">Create Post</Link>
        </li>,
        <li
          key="4"
          onClick={() => {
            M.Sidenav.getInstance(searchSideNav.current).close();
          }}
        >
          <Link to="/myfollowingpost">My following Posts</Link>
        </li>,
        <li
          key="5"
          onClick={() => {
            M.Sidenav.getInstance(searchSideNav.current).close();
          }}
        >
          <button
            className="btn #c62828 red darken-3 btnLog"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              history.push("/login");
            }}
          >
            Logout
          </button>
        </li>,
      ];
    } else {
      return [
        <li
          key="6"
          onClick={() => {
            M.Sidenav.getInstance(searchSideNav.current).close();
          }}
        >
          <Link to="/login">Signin</Link>
        </li>,
        <li
          key="7"
          onClick={() => {
            M.Sidenav.getInstance(searchSideNav.current).close();
          }}
        >
          <Link to="/signup">Signup</Link>
        </li>,
      ];
    }
  };

  const fetchUsers = (query) => {
    setSearch(query);
    fetch("/search-users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((res) => res.json())
      .then((results) => {
        setUserDetails(results.user);
      });
  };
  return (
    <nav>
      <div className="nav-wrapper white">
        <Link to={state ? "/" : "/login"} className="brand-logo">
          Instagram
        </Link>
        <a data-target="mobile-demo" className="sidenav-trigger">
          <i className="material-icons">menu</i>
        </a>
        <ul className="right hide-on-med-and-down">{renderList()}</ul>
      </div>
      <div
        id="modal1"
        className="modal"
        ref={searchModal}
        style={{ color: "black" }}
      >
        <div className="modal-content">
          <input
            type="text"
            placeholder="search user's name"
            value={search}
            onChange={(e) => fetchUsers(e.target.value)}
          />
          <ul className="collection">
            {userDetails.map((item) => {
              return (
                <Link
                  to={
                    item._id != state._id ? "/profile/" + item._id : "/profile"
                  }
                  onClick={() => {
                    M.Modal.getInstance(searchModal.current).close();
                    setSearch("");
                  }}
                >
                  <li className="collection-item">{item.name}</li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="modal-footer">
          <button
            className="modal-close waves-effect waves-green btn-flat"
            onClick={() => setSearch("")}
          >
            close
          </button>
        </div>
      </div>
      <ul className="sidenav" id="mobile-demo" ref={searchSideNav}>
        {renderList()}
      </ul>
    </nav>
  );
};

export default Navbar;
