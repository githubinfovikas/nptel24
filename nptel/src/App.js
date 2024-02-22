
// import './App.css';

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './components/login/Login';
// import SignIn from './components/signIn/SignIn';
// import Header from './components/Header';
// import Dashboard from './components/dashboard/index';
// import FacultyDashboard from './components/faculty/index';
// import Certificate from './components/certificate/Certificate'
// import PrivateComponent from './components/PrivateComponent';
// import Admin from './components/admin/Admin';
// import Error from './components/Error';
// function App() {
//   const userType = localStorage.getItem('userType');
//   return (
//     <div className="App">
//       <Router>
//         <Routes>

//           <Route path="/login" element={<Login />} />
//           <Route path="/signin" element={<SignIn />} />
//         </Routes>
//         <Routes>
//           <Route path="/" element={<PrivateComponent />}>
//             {userType === '1' && (
//               <>
//                 <Route path="/dashboard" element={<div><Header /><Dashboard /></div>} />
//                 <Route path="/certificateUpload" element={<div><Header /><Certificate /></div>} />
//                 <Route path="*" element={<Error />} />

//               </>

//             )}



//             {['0', '101', '102', '103', '104', '106', '107', '109', '117'].includes(userType) && (
//               <>
//                 <Route path="/facultyDashboard" element={<div><Header /><FacultyDashboard /></div>} />
//                 <Route path="*" element={<Error />} />
//               </>
//             )}
//             {userType === '0' && (
//               <Route path="/userData" element={<div><Header /><Admin /></div>} />
//             )}


//           </Route>
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;







import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate   } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './components/login/Login';
import SignIn from './components/signIn/SignIn';
import Header from './components/Header';
import Dashboard from './components/dashboard/index';
import FacultyDashboard from './components/faculty/index';
import ViewCertificate from './components/dashboard/Certificate'
import PrivateComponent from './components/PrivateComponent';
import UserData from './components/admin/UserInformation/Tab';
import Course from './components/admin/CourseDataList/CourseDataForm';
import Error from './components/Error';
import DatabaseUpload from './components/admin/DataUpload/index'
import ForgotPassword from './components/ForgotPassword';
function App() {
  const [userType, setUserType] = useState(null);
  useEffect(() => {
    const userTypeFromLocalStorage = localStorage.getItem('userType');
    setUserType(userTypeFromLocalStorage);
  }, []);

  return (
    <div className="App bg-gray-100 min-h-screen">
      <Router>
        {userType && <div><Header /></div>}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forgot/password" element={<ForgotPassword />} />
          <Route
            path="/"
            element={userType ? <PrivateComponent /> : <Navigate to="/" />}
          >
            {userType === '1' && (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/view/certificate" element={<ViewCertificate />} />
                <Route path="*" element={<Error />} />
              </>
            )}
            {['0', '101', '102', '103', '104', '106', '107', '109', '117'].includes(userType) && (
              <>
                <Route path="/facultyDashboard" element={<FacultyDashboard  />} />
                <Route path="*" element={<Error />} />
              </>
            )}
            {userType === '0' && (
              <>
                <Route path="/userData" element={<UserData />} />
                <Route path="/course" element={<Course />} />
                <Route path="/databaseUpload" element={<DatabaseUpload />} />
              </>
            )}
          </Route>
        </Routes>
        {/* {userType && <Footer />} */}
      </Router>
    </div>
  );
}

export default App;
