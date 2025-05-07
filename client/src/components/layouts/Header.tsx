// import React, { useContext } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";

// import { UserContext } from "../../contexts/UserContext";
// import profileImg from "../../assets/image/img1.png";

// import { AiOutlineLogout } from "react-icons/ai";
// const Header: React.FC = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { userData, setUserData } = useContext(UserContext);

//   const logout = () => {
//     localStorage.clear();
//     setUserData(null);
//     navigate("/");
//   };

//   return (
//     <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
//       <div className="flex items-center gap-2">

//         <span className="text-lg font-semibold ">Daotao</span>
//       </div>

//       <ul className="flex items-center space-x-6">
//         <li>
//           <Link
//             to="/"
//             className={`hover:text-blue-500 ${
//               location.pathname === "/"
//                 ? "text-blue-600 font-bold"
//                 : "text-gray-700"
//             }`}
//           >
//             Home
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/jobs"
//             className={`hover:text-blue-500 ${
//               location.pathname === "/jobs"
//                 ? "text-blue-600 font-bold"
//                 : "text-gray-700"
//             }`}
//           >
//             Jobs
//           </Link>
//         </li>

//         {userData ? (
//           <>
//             <li>
//               <Link
//                 to={
//                   userData.userType === "admin"
//                     ? "/adminHomeScreen"
//                     : "/homeScreen"
//                 }
//                 className={`flex items-center gap-2 hover:text-blue-500 ${
//                   location.pathname === "/homeScreen" ||
//                   location.pathname === "/adminHomeScreen"
//                     ? "text-blue-600 font-bold"
//                     : "text-gray-700"
//                 }`}
//               >
//                 <img
//                   src={profileImg}
//                   alt="Profile"
//                   className="w-8 h-8 rounded-full object-cover"
//                 />
//                 <span>{userData.name}</span>
//               </Link>
//             </li>
//             <li>
//               <button
//                 onClick={logout}
//                 className="text-red-500 hover:text-red-600"
//               >
//                 <AiOutlineLogout />
//               </button>
//             </li>
//           </>
//         ) : (
//           <>
//             <li>
//               <Link
//                 to="/login"
//                 className={`hover:text-blue-500 ${
//                   location.pathname === "/login"
//                     ? "text-blue-600 font-bold"
//                     : "text-gray-700"
//                 }`}
//               >
//                 Login
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/signup"
//                 className={`hover:text-blue-500 ${
//                   location.pathname === "/signup"
//                     ? "text-blue-600 font-bold"
//                     : "text-gray-700"
//                 }`}
//               >
//                 Sign Up
//               </Link>
//             </li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// };

// export default Header;
import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { UserContext } from "../../contexts/UserContext";
import profileImg from "../../assets/image/img1.png";

import Logout from "@mui/icons-material/Logout";

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);

  const logout = () => {
    localStorage.clear();
    setUserData(null);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold ">
          <Link to="/homeScreen ">Daotao</Link>
        </span>
      </div>

      <ul className="flex items-center space-x-6">
        <li>
          <Link
            to="/"
            className={`hover:text-blue-500 ${
              location.pathname === "/"
                ? "text-blue-600 font-bold"
                : "text-gray-700"
            }`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/jobs"
            className={`hover:text-blue-500 ${
              location.pathname === "/jobs"
                ? "text-blue-600 font-bold"
                : "text-gray-700"
            }`}
          ></Link>
        </li>

        {userData ? (
          <>
            <li>
              <Link
                to={
                  userData.userType === "admin"
                    ? "/adminHomeScreen"
                    : "/homeScreen"
                }
                className={`flex items-center gap-2 hover:text-blue-500 ${
                  location.pathname === "/homeScreen" ||
                  location.pathname === "/adminHomeScreen"
                    ? "text-blue-600 font-bold"
                    : "text-gray-700"
                }`}
              >
                <img
                  src={profileImg}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span>{userData.name}</span>
              </Link>
            </li>
            <li>
              <button
                onClick={logout}
                className="text-red-500 hover:text-red-600"
              >
                <Logout />
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                className={`hover:text-blue-500 ${
                  location.pathname === "/login"
                    ? "text-blue-600 font-bold"
                    : "text-gray-700"
                }`}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className={`hover:text-blue-500 ${
location.pathname === "/signup"
                    ? "text-blue-600 font-bold"
                    : "text-gray-700"
                }`}
              >
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;