// import { React, useState, useEffect } from "react";
// import axios from "axios";
// import Select from "react-select";
// import { branch, registrationNumber, name, gmail, batch } from "../common";
// import { toast, ToastContainer } from 'react-toastify';
// import { useNavigate } from "react-router-dom";


// const Certificate = () => {
//   const [courseCodeList, setCourseCodeList] = useState([]);
//   const [codeFilter, setCodeFilter] = useState(null);
//   const [courseCode, setCourseCode] = useState("");
//   const [courseName, setCourseName] = useState(null);
//   const [courseWeek, setCourseWeek] = useState("");
//   const [courseDuration, setCourseDuration] = useState("");
//   const [markObtained, setMarkObtained] = useState("");
//   const [academicCredit, setAcademicCredit] = useState("");
//   const [moocSemester, setMoocSemester] = useState("");
//   const [currentSemester, setCurrentSemester] = useState("");
//   const [allData, setAllData] = useState([]);
//   const [certificate, setCertificate] = useState("");
//   const courseCodeLists = [];
//   const navigate = useNavigate();


//   let convertToBase64 = (e) => {
//     let reader = new FileReader();
//     reader.readAsDataURL(e.target.files[0]);
//     reader.onload = () => {
//       console.log(reader.result);
//       setCertificate(reader.result);
//     };
//     reader.onerror = error => {
//       console.log("Error: ", error);
//     };

//   }



//   useEffect(() => {
//     const courseData = async () => {
//       try {
//         const res = await axios.get(`${url}/all`);
//         setAllData(res.data);
//         const courseCodeLists = res.data.map((course) => {
//           return { label: course.courseCode, value: course.courseCode };
//         });
//         setCourseCodeList(courseCodeLists);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     courseData();
//   }, []);

//   useEffect(() => {
//     const val = codeFilter?.value;
//     const filteredStudent = allData?.find((element) => element.courseCode === val)
//     setCourseCode(filteredStudent?.courseCode);
//     setCourseName(filteredStudent?.courseName);
//     setCourseWeek(filteredStudent?.week);
//     setCourseDuration(filteredStudent?.duration);
//   }, [codeFilter])


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(`${url}/upload`, {
//         studentName: name(),
//         gmail: gmail(),
//         registrationNumber: registrationNumber(),
//         branch: branch(),
//         batch: batch(),
//         courseCode, courseName, courseWeek, courseDuration, markObtained, academicCredit, moocSemester, currentSemester, certificate
//       });
//       toast.success("Certificate uploaded successfully");
//       setTimeout(() => {
//         navigate("/dashboard");
//         setCourseCode("");
//         setCourseName("");
//         setCourseWeek("");
//         setCourseDuration("");
//         setMarkObtained("");
//         setAcademicCredit("");
//         setMoocSemester("");
//         setCurrentSemester("");
//         setCertificate("");
//       } , 2000)
//       console.log(res.data);
//     } catch (err) {
//       toast.error(err.response.message + "Please try again");
//       console.log(err);
//     }

//   };


//   return (
//     <div className="pt-20 flex flex-col gap-4">
//       <ToastContainer />
//       <form
//         onSubmit={handleSubmit}
//         className="bg-gray-200 mt-4 pb-2 pt-2 shadow-md rounded px-10 mx-auto lg:w-[80%] md:w-1/2 sm:w-full "
//       >
//         <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-1 gap-8 mb-4">
//           <div className="lg:col-span-3 flex flex-col items-start">
//             <label className="block text-blue-700 text-sm font-bold mb-2">
//               Course Code
//             </label>
//             <Select
//               placeholder="Course Code..."
//               className="shadow appearance-none border rounded w-full p-1 bg-white text-gray-700 leading-tight focus:outline-blue-500 hover:border-blue-400"
//               onChange={setCodeFilter}
//               options={courseCodeList}
//             />
//           </div>

//           <div className="lg:col-span-9  flex flex-col items-start">
//             <label className="block text-blue-700 text-sm font-bold mb-2">
//               Course Name
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-blue-500 hover:border-blue-400"
//               placeholder="Course Name"
//               id="name"
//               type="text"
//               defaultValue={courseName}
//               onChange={(e) => setCourseName(e.target.value)}
//             ></input>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-1 mb-4 gap-8">
//           <div className="lg:col-span-4 flex flex-col items-start">
//             <label className="block text-blue-700 text-sm font-bold mb-2">
//               Course Week
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-blue-500 hover:border-blue-400"
//               type="text"
//               placeholder="Course Week"
//               defaultValue={courseWeek}
//               onChange={(e) => setCourseWeek(e.target.value)}
//             />
//           </div>

//           <div className=" lg:col-span-4  flex flex-col items-start">
//             <label className="block text-blue-700 text-sm font-bold mb-2">
//               Course Duration
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-blue-500 hover:border-blue-400"
//               type="text"
//               placeholder="Course Duration"
//               defaultValue={courseDuration}
//               onChange={(e) => setCourseDuration(e.target.value)}
//             />
//           </div>
//           <div className=" lg:col-span-4 flex flex-col items-start">
//             <label className="block text-blue-700 text-sm font-bold mb-2">
//               Mark obtained
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-blue-500 hover:border-blue-400"
//               placeholder="in Percentage"
//               id="percentage"
//               type="text"
//               value={markObtained}
//               onChange={(e) => setMarkObtained(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-1 mb-4 gap-8">
//           <div className=" lg:col-span-6 flex flex-col items-start">
//             <label className="block text-blue-700 text-sm font-bold mb-2">
//               Academic Credits
//             </label>
//             <select
//               className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-blue-500 hover:border-blue-400"
//               id="batch"
//               required
//               value={academicCredit}
//               onChange={(e) => setAcademicCredit(e.target.value)}
//             >
//               <option>Select </option>
//               <option>Yes</option>
//               <option>No</option>
//             </select>
//           </div>

//           <div className="lg:col-span-3 flex flex-col items-start">
//             <label className="block text-blue-700 text-sm font-bold mb-2">
//               NPTEL Mooc Semester
//             </label>
//             <select
//               className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-blue-500 hover:border-blue-400"
//               id="batch"
//               required
//               value={moocSemester}
//               onChange={(e) => setMoocSemester(e.target.value)}
//             >
//               <option>Select Semester</option>
//               <option>1</option>
//               <option>2</option>
//               <option>3</option>
//               <option>4</option>
//             </select>
//           </div>
//           <div className="lg:col-span-3 flex flex-col items-start">
//             <label className="block text-blue-700 text-sm font-bold mb-2">
//               Current Semester
//             </label>
//             <select
//               className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-blue-500 hover:border-blue-400"
//               id="batch"
//               required
//               value={currentSemester}
//               onChange={(e) => setCurrentSemester(e.target.value)}
//             >
//               <option>Select Semester</option>
//               <option>1</option>
//               <option>2</option>
//               <option>3</option>
//               <option>4</option>
//             </select>
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-8 justify-around">


//           <div className=" flex flex-col items-start mb-4">

//             <label className="block text-blue-700 text-sm font-bold mb-2">Upload Certificate </label>
//             <input className="block w-full p-2  text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
//               id="multiple_files" type="file"   accept=".pdf"  onChange={convertToBase64} />

//           </div>
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//         // onSubmit={handleSubmit}
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Certificate;








import { React, useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { branch, registrationNumber, name, gmail, batch } from "../common";
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { CircularProgress } from '@mui/material';
import { headers, url, getToken } from '../common';
const Certificate = () => {
  const [courseCodeList, setCourseCodeList] = useState([]);
  const [codeFilter, setCodeFilter] = useState(null);
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState(null);
  const [courseWeek, setCourseWeek] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [markObtained, setMarkObtained] = useState("");
  const [moocSemester, setMoocSemester] = useState("");
  const [currentSemester, setCurrentSemester] = useState("");
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const courseCodeLists = [];
  const navigate = useNavigate();

  useEffect(() => {
    const courseCodeData = async () => {
      try {
        const res = await axios.get(`${url}/course/code`, { headers });
        const courseCodeLists = res.data?.map((course) => {
          return { label: course, value: course };
        });
        setCourseCodeList(courseCodeLists);
      } catch (err) {
        console.log(err);
      }
    }
    courseCodeData();
  }, []);



  useEffect(() => {
    const val = codeFilter?.value;
    const filteredStudent = courseCodeList?.find((element) => element.value === val)
    const courseData = async () => {
      try {
        const res = await axios.get(`${url}/courseCode/${filteredStudent?.value}`, { headers });
        setCourseCode(res.data?.courseCode);
        setCourseName(res.data?.courseName);
        setCourseWeek(res.data?.courseWeek);
        setCourseDuration(res.data?.duration);
      } catch (err) {
        console.log(err);
      }
    }
    courseData();
  }, [codeFilter])

  const certificateUpload = (e) => {
    setFile(e.target.files[0]);
  }


  const uniqueFilename = `${batch() + "_" + branch() + "_" + registrationNumber() + "_" + courseCode}.pdf`;

  const modifiedFile = new File([file], uniqueFilename, { type: file.type });

  const handleSubmit = async (e) => {
    setLoading(true);

    const formData = new FormData();
    formData.append('file', modifiedFile);
    formData.append('studentName', name());
    formData.append('gmail', gmail());
    formData.append('registrationNumber', registrationNumber());
    formData.append('branch', branch());
    formData.append('batch', batch());
    formData.append('courseCode', courseCode);
    formData.append('courseName', courseName);
    formData.append('courseWeek', courseWeek);
    formData.append('courseDuration', courseDuration);
    formData.append('markObtained', markObtained);
    if (moocSemester === "No Semester") {
      formData.append('academicCredit', "No");
    } else {
      formData.append('academicCredit', "Yes");
    }
    formData.append('moocSemester', moocSemester);
    formData.append('sessionYear', currentSemester);
    console.log(formData)
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/upload/certificate`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data', Authorization: getToken() } });
      setLoading(false);
      toast.success("Certificate uploaded successfully");

      setTimeout(() => {
        setCourseCode("");
        setCourseName("");
        setCourseWeek("");
        setCourseDuration("");
        setMarkObtained("");
        setMoocSemester("");
        setCurrentSemester("");
        setFile("");
        
      }, 2000)
      console.log(res.data);
    } catch (err) {
      setLoading(false);
      toast.error(err.response.message + "Please try again");
      console.log(err);
    } finally {
      setLoading(false);
    }

  };


  return (
    <div className="flex flex-col ">
      <ToastContainer />
      <div

        className="bg-gray-200 mt-4 pt-2 shadow-md rounded px-10 mx-auto lg:w-[80%] md:w-1/2 sm:w-full "
      >
        <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-1 gap-8 mb-4">
          <div className="lg:col-span-3 flex flex-col items-start">
            <label className="block text-blue-700 text-sm font-bold mb-2">
              Course Code
            </label>
            <Select
              placeholder="Course Code..."
              className="shadow appearance-none border rounded w-full p-1 bg-white text-gray-700 leading-tight focus:outline-blue-500 hover:border-blue-400"
              onChange={setCodeFilter}
              options={courseCodeList}
            />
          </div>

          <div className="lg:col-span-9  flex flex-col items-start">
            <label className="block text-blue-700 text-sm font-bold mb-2">
              Course Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-blue-500 hover:border-blue-400"
              placeholder="Course Name"
              id="name"
              type="text"
              defaultValue={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            ></input>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-1 mb-4 gap-8">
          <div className="lg:col-span-4 flex flex-col items-start">
            <label className="block text-blue-700 text-sm font-bold mb-2">
              Course Week
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-blue-500 hover:border-blue-400"
              type="text"
              placeholder="Course Week"
              defaultValue={courseWeek}
              onChange={(e) => setCourseWeek(e.target.value)}
            />
          </div>

          <div className=" lg:col-span-4  flex flex-col items-start">
            <label className="block text-blue-700 text-sm font-bold mb-2">
              Course Duration
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-blue-500 hover:border-blue-400"
              type="text"
              placeholder="Course Duration"
              defaultValue={courseDuration}
              onChange={(e) => setCourseDuration(e.target.value)}
            />
          </div>
          <div className=" lg:col-span-4 flex flex-col items-start">
            <label className="block text-blue-700 text-sm font-bold mb-2">
              Mark obtained
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-blue-500 hover:border-blue-400"
              placeholder="in Percentage"
              id="percentage"
              type="text"
              value={markObtained}
              onChange={(e) => setMarkObtained(e.target.value)}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-1 mb-4 gap-8">

          <div className="lg:col-span-3 flex flex-col items-start">
            <label className="block text-blue-700 text-sm font-bold mb-2">
              NPTEL Mooc Semester
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-blue-500 hover:border-blue-400"
              id="batch"
              required
              value={moocSemester}
              onChange={(e) => setMoocSemester(e.target.value)}
            >
              <option>Select Semester</option>
              <option>No Semester</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
            </select>
          </div>
          <div className="lg:col-span-3 flex flex-col items-start">
            {/* yahan current semester ko session me change kiya gyaa hai */}
            <label className="block text-blue-700 text-sm font-bold mb-2">
              Session
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-blue-500 hover:border-blue-400"
              id="batch"
              required
              value={currentSemester}
              onChange={(e) => setCurrentSemester(e.target.value)}
            >
              <option>Select Session</option>
              <option>2023-24</option>
              <option>2024-25</option>
              <option>2025-56</option>
              <option>2026-27</option>
            </select>
          </div>
          <div className=" lg:col-span-6 flex flex-col items-start">

            <label className="block text-blue-700 text-sm font-bold mb-2">Upload Certificate </label>
            <input className="block w-full p-2  text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              type="file" accept=".pdf" onChange={certificateUpload} />

          </div>
          
          
        </div>

        {loading ? (
          <div className="flex justify-center items-center mt-6 ">
            <CircularProgress />
          </div>
        ) : (
          <div className="mb-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Certificate;
