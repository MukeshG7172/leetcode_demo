// "use client";
// import { useEffect, useState } from 'react';
// import { supabase } from '../lib/supabaseClient';

// const StudentsTable = () => {
//   const [students, setStudents] = useState([]);
//   const [filteredStudents, setFilteredStudents] = useState([]);
//   const [filters, setFilters] = useState({ no_of_questions: null, status: null, dept: null, section: null, year: null });

//   const handleFilterChange = (event) => {
//     const { name, value } = event.target;
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       [name]: value !== "" ? value : null,
//     }));
//   };

//   useEffect(() => {
//     const fetchStudents = async () => {
//       const { data, error } = await supabase
//         .from('weekly_contest_410')
//         .select('username, no_of_questions, question_ids, finish_time, status, dept, year, section');
//       if (error) {
//         console.error(error);
//       } else {
//         setStudents(data);
//         setFilteredStudents(data); // Initially display all students
//       }
//     };

//     fetchStudents();
//   }, []);

//   useEffect(() => {
//     let filtered = students;

//     if (filters.no_of_questions !== null) {
//       filtered = filtered.filter((student) => student.no_of_questions === parseInt(filters.no_of_questions, 10));
//     }

//     if (filters.status !== null) {
//       filtered = filtered.filter((student) => student.status === filters.status);
//     }

//     if (filters.dept !== null) {
//       filtered = filtered.filter((student) => student.dept === filters.dept);
//     }

//     if (filters.year !== null) {
//       filtered = filtered.filter((student) => student.year === filters.year);
//     }

//     if (filters.section !== null) {
//       filtered = filtered.filter((student) => student.section === filters.section);
//     }
//     setFilteredStudents(filtered);
//     console.log(filtered)
//   }, [filters, students]);

//   return (
//     <div>
//     <h2 className='text-center pt-5'>Students Table</h2>
//     <div className='flex justify-center'>
//     <select className="h-[100px]" name="section" onChange={handleFilterChange} defaultValue="">
//                 <option value="">All</option>
//                 <option value="A">A</option>
//                 <option value="B">B</option>
//                 <option value="C">C</option>
//                 <option value="D">D</option>
//               </select>
//               <select className="h-[100px]" name="dept" onChange={handleFilterChange} defaultValue="">
//                 <option value="">All</option>
//                 <option value="CSE">CSE</option>
//                 <option value="ECE">ECE</option>
//               </select>
//               <select className="h-[100px]" name="year" onChange={handleFilterChange} defaultValue="">
//                 <option value="">All</option>
//                 <option value= "2" >2nd year</option>
//                 <option value= "3" >3rd year</option>
//               </select>
//               <select className="h-[100px]" name="no_of_questions" onChange={handleFilterChange} defaultValue="">
//                 <option value="">All</option>
//                 <option value="4">4</option>
//                 <option value="3">3</option>
//                 <option value="2">2</option>
//                 <option value="1">1</option>
//                 <option value="0">0</option>
//               </select>
//               <select className="h-[100px]" name="status" onChange={handleFilterChange} defaultValue="">
//                 <option value="">All</option>
//                 <option value="attended">Attended</option>
//                 <option value="not attended">Not Attended</option>
//               </select>
//       <table className='mx-[250px]'>
//         <thead>
//           <tr>
//             <th className='w-[239px]'>Username</th>
//             <th className='w-[150px]'>
//               Department
//               {/* <select name="dept" onChange={handleFilterChange} defaultValue="">
//                 <option value="">All</option>
//                 <option value="CSE">CSE</option>
//                 <option value="ECE">ECE</option>
//               </select> */}
//             </th>
//             <th className='w-[150px]'>
//               Section
//               {/* <select name="section" onChange={handleFilterChange} defaultValue="">
//                 <option value="">All</option>
//                 <option value="A">A</option>
//                 <option value="B">B</option>
//                 <option value="C">C</option>
//                 <option value="D">D</option>
//               </select> */}
//             </th>
//             <th className='w-[100px]'>
//               Year
//               {/* <select name="year" onChange={handleFilterChange} defaultValue="">
//                 <option value="">All</option>
//                 <option value= "2" >2nd year</option>
//                 <option value= "3" >3rd year</option>
//               </select> */}
//             </th>
//             <th className='w-[150px]'>
//               No. of Questions
//               {/* <select name="no_of_questions" onChange={handleFilterChange} defaultValue="">
//                 <option value="">All</option>
//                 <option value="4">4</option>
//                 <option value="3">3</option>
//                 <option value="2">2</option>
//                 <option value="1">1</option>
//                 <option value="0">0</option>
//               </select> */}
//             </th>
//             <th>Question ID</th>
//             <th className='w-[100px]'>Finish Time</th>
//             <th className='w-[100px]'>
//               Status
//               {/* <select name="status" onChange={handleFilterChange} defaultValue="">
//                 <option value="">All</option>
//                 <option value="attended">Attended</option>
//                 <option value="not attended">Not Attended</option>
//               </select> */}
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredStudents.map((student, index) => (
//             <tr key={index}>
//               <td>{student.username}</td>
//               <td>{student.dept}</td>
//               <td>{student.section}</td>
//               <td>{student.year}</td>
//               <td>{student.no_of_questions}</td>
//               <td>{student.question_ids}</td>
//               <td>{student.finish_time}</td>
//               <td>{student.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//     </div>
//   );
// };

// export default StudentsTable;
// "use client";
// import { useEffect, useState } from 'react';
// import { supabase } from '../lib/supabaseClient';




// const StudentsTable = () => {
//   const [students, setStudents] = useState([]);
//   const [filteredStudents, setFilteredStudents] = useState([]);
//   const [filters, setFilters] = useState({ no_of_questions: null, status: null, dept: null, section: null, year: null });
//   const [showFilters, setShowFilters] = useState(false); // New state for filter visibility
  
//   const handleFilterChange = (event) => {
//     const { name, value } = event.target;
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       [name]: value !== "" ? value : null,
//     }));
//     // setShowFilters(true); // Hide filters after selection
//   };



//   useEffect(() => {
//     const fetchStudents = async () => {
//       const { data, error } = await supabase
//         .from('weekly_contest_410')
//         .select('username, no_of_questions, question_ids, finish_time, status, dept, year, section ,rank');
//       if (error) {
//         console.error(error);
//       } else {
//         setStudents(data);
//         setFilteredStudents(data); // Initially display all students
//       }
//     };

//     fetchStudents();
//   }, []);

//   useEffect(() => {
//     let filtered = students;

//     if (filters.no_of_questions !== null) {
//       filtered = filtered.filter((student) => student.no_of_questions === parseInt(filters.no_of_questions, 10));
//     }

//     if (filters.status !== null) {
//       filtered = filtered.filter((student) => student.status === filters.status);
//     }

//     if (filters.dept !== null) {
//       filtered = filtered.filter((student) => student.dept === filters.dept);
//     }

//     if (filters.year !== null) {
//       filtered = filtered.filter((student) => student.year === filters.year);
//     }

//     if (filters.section !== null) {
//       filtered = filtered.filter((student) => student.section === filters.section);
//     }

//     setFilteredStudents(filtered);
//     console.log(filtered);
//   }, [filters, students]);

//   const Click = ()=>{
//     setShowFilters((prev)=>!prev)
//   }
//   return (
//     <div>
//       <h2 className="text-center pt-5 text-6xl">Weekly contest  410</h2>
//       <center>
//         <button className='border-black border-2 pl-5 pr-5 mt-10 w-30 rounded h-[70px] text-3xl' onClick={Click}>Filter</button>
//       </center>
//       {showFilters && ( // Conditionally render filters
//         <div className="flex justify-center pt-10">
//           <select className="h-[70px] text-2xl mr-10 rounded" name="status" onChange={handleFilterChange} defaultValue="">
//           <option value="" disabled hidden>Status</option>
//           <option value="">All</option>
//             <option value="attended">Attended</option>
//             <option value="not attended">Not Attended</option>
//           </select>
//           <select className="h-[70px] text-2xl mr-10 rounded" name="year" onChange={handleFilterChange} defaultValue="">
//           <option value="" disabled hidden>Year</option>
//           <option value="">All</option>
//             <option value="2">2nd year</option>
//             <option value="3">3rd year</option>
//           </select>
//           <select className="h-[70px] text-2xl mr-10 rounded" name="dept" onChange={handleFilterChange} defaultValue="">
//           <option value="" disabled hidden>Department</option>
//           <option value="">All</option>
//             <option value="CSE">CSE</option>
//             <option value="ECE">ECE</option>
//           </select>
//           <select className="h-[70px] text-2xl mr-10 rounded" name="section" onChange={handleFilterChange} defaultValue="">
//           <option value="" disabled hidden>Section</option>
//           <option value="">All</option>
//             <option value="A">A</option>
//             <option value="B">B</option>
//             <option value="C">C</option>
//             <option value="D">D</option>
//           </select> 
          
//           <select className="h-[70px] text-2xl mr-10 rounded " name="no_of_questions" onChange={handleFilterChange} defaultValue="" >
//           <option value="" disabled hidden>
//     No. of Questions
//   </option>
//   <option value="">All</option>
//   <option value="4">4</option>
//   <option value="3">3</option>
//   <option value="2">2</option>
//   <option value="1">1</option>
//   <option value="0">0</option>
//           </select>
//         </div>
//       )}
//       <table className="ml-[110px] mr-[100px]">
//         <thead>
//           <tr>
//             <th className="w-[100px]">Rank</th>
//             <th className="w-[239px]">Username</th>
//             <th className="w-[150px]">Department</th>
//             <th className="w-[150px]">Section</th>
//             <th className="w-[100px]">Year</th>
//             <th className="w-[150px]">No. of Questions</th>
//             <th className="w-[150px]">Question ID</th>
//             <th className="w-[60px]">Finish Time</th>
//             <th className="w-[60px]">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredStudents.map((student, index) => (
//             <tr key={index}>
//               <td>{student.rank}</td>
//               <td>{student.username}</td>
//               <td>{student.dept}</td>
//               <td>{student.section}</td>
//               <td>{student.year}</td>
//               <td>{student.no_of_questions}</td>
//               <td>{student.question_ids}</td>
//               <td>{student.finish_time}</td>
//               <td>{student.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default StudentsTable;
"use client";
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const StudentsTable = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filters, setFilters] = useState({ no_of_questions: null, status: null, dept: null, section: null, year: null });
  const [showFilters, setShowFilters] = useState(false); 
  const [table, setTable] = useState('weekly_contest_410'); 

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value !== "" ? value : null,
    }));
  };

  const handleContestChange = (event) => {
    console.log(event.target.value);
    setTable(event.target.value); 
  };

  useEffect(() => {
    console.log(`Fetching data from the table: ${table}`);

    const fetchStudents = async () => {
      const { data, error } = await supabase
        .from(table)
        .select('username, no_of_questions, question_ids, finish_time, status, dept, year, section, rank')
        .order('rank', { ascending: true }); // Sort by rank

      if (error) {
        console.error(error);
      } else {
        setStudents(data);
        setFilteredStudents(data); 
      }
    };

    fetchStudents();
  }, [table]);

  useEffect(() => {
    let filtered = students;

    if (filters.no_of_questions !== null) {
      filtered = filtered.filter((student) => student.no_of_questions === parseInt(filters.no_of_questions, 10));
    }

    if (filters.status !== null) {
      filtered = filtered.filter((student) => student.status === filters.status);
    }

    if (filters.dept !== null) {
      filtered = filtered.filter((student) => student.dept === filters.dept);
    }

    if (filters.year !== null) {
      filtered = filtered.filter((student) => student.year === filters.year);
    }

    if (filters.section !== null) {
      filtered = filtered.filter((student) => student.section === filters.section);
    }

    setFilteredStudents(filtered);
  }, [filters, students]);

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  return (
    <div>
      <select className="h-[70px] text-2xl mr-10 rounded" name="contest" value={table} onChange={handleContestChange} defaultValue="weekly_contest_410">
        <option value="weekly_contest_410">Contest 410</option>
        <option value="weekly_contest_409">Contest 409</option>
        {/* Add more contests as needed */}
      </select>
      <h2 className="text-center pt-5 text-6xl">{table.replace('_', ' ')}</h2>
      <center>
        <button className='border-black border-2 pl-5 pr-5 mt-10 w-30 rounded h-[70px] text-3xl' onClick={toggleFilters}>Filter</button>
      </center>
      {showFilters && (
        <div className="flex justify-center pt-10">
          <select className="h-[70px] text-2xl mr-10 rounded" name="status" onChange={handleFilterChange} defaultValue="">
            <option value="" disabled hidden>Status</option>
            <option value="">All</option>
            <option value="attended">Attended</option>
            <option value="not attended">Not Attended</option>
          </select>
          <select className="h-[70px] text-2xl mr-10 rounded" name="year" onChange={handleFilterChange} defaultValue="">
            <option value="" disabled hidden>Year</option>
            <option value="">All</option>
            <option value="2">2nd year</option>
            <option value="3">3rd year</option>
          </select>
          <select className="h-[70px] text-2xl mr-10 rounded" name="dept" onChange={handleFilterChange} defaultValue="">
            <option value="" disabled hidden>Department</option>
            <option value="">All</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
          </select>
          <select className="h-[70px] text-2xl mr-10 rounded" name="section" onChange={handleFilterChange} defaultValue="">
            <option value="" disabled hidden>Section</option>
            <option value="">All</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select> 
          <select className="h-[70px] text-2xl mr-10 rounded" name="no_of_questions" onChange={handleFilterChange} defaultValue="">
            <option value="" disabled hidden>No. of Questions</option>
            <option value="">All</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
            <option value="0">0</option>
          </select>
        </div>
      )}
      <table className="ml-[110px] mr-[100px]">
        <thead>
          <tr>
            <th className="w-[100px]">Rank</th>
            <th className="w-[239px]">Username</th>
            <th className="w-[150px]">Department</th>
            <th className="w-[150px]">Section</th>
            <th className="w-[100px]">Year</th>
            <th className="w-[150px]">No. of Questions</th>
            <th className="w-[150px]">Question ID</th>
            <th className="w-[60px]">Finish Time</th>
            <th className="w-[60px]">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={index}>
              <td>{student.rank}</td>
              <td>{student.username}</td>
              <td>{student.dept}</td>
              <td>{student.section}</td>
              <td>{student.year}</td>
              <td>{student.no_of_questions}</td>
              <td>{student.question_ids}</td>
              <td>{student.finish_time}</td>
              <td>{student.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsTable;
