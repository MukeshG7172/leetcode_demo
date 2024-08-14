// "use client";
// import { useEffect, useState } from 'react';
// import { supabase } from '../lib/supabaseClient';

// const StudentsTable = () => {
//   const [students, setStudents] = useState([]);
//   const [filteredStudents, setFilteredStudents] = useState([]);
//   const [filters, setFilters] = useState({ no_of_questions: null, status: null, dept: null, section: null, year: null });
//   const [showFilters, setShowFilters] = useState(false);
//   const [table, setTable] = useState('weekly_contest_410');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [studentsPerPage] = useState(10);

//   const handleFilterChange = (event) => {
//     const { name, value } = event.target;
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       [name]: value !== "" ? value : null,
//     }));
//     setCurrentPage(1);
//   };

//   const handleContestChange = (event) => {
//     setTable(event.target.value);
//     setCurrentPage(1);
//   };

//   useEffect(() => {
//     console.log(`Fetching data from the table: ${table}`);

//     const fetchStudents = async () => {
//       const { data, error } = await supabase
//         .from(table)
//         .select('username, no_of_questions, question_ids, finish_time, status, dept, year, section, rank');
//       if (error) {
//         console.error(error);
//       } else {
//         setStudents(data);
//         setFilteredStudents(data);
//       }
//     };

//     fetchStudents();
//   }, [table]);

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
//     setCurrentPage(1);
//   }, [filters, students]);

//   const toggleFilters = () => {
//     setShowFilters((prev) => !prev);
//   };

//   const getFormattedTableName = (tableName) => {
//     const contestNumber = tableName.split('_').pop();
//     return `Weekly Contest ${contestNumber}`;
//   };

//   const indexOfLastStudent = currentPage * studentsPerPage;
//   const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
//   const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

//   const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const renderPagination = () => {
//     const pageNumbers = [];
//     const dots = '...';
  
//     const pagesToShow = 3;
//     const startPage = Math.max(1, currentPage - pagesToShow);
//     const endPage = Math.min(totalPages, currentPage + pagesToShow);
  
//     if (totalPages <= 5) {
//       // Show all pages if total pages are 5 or less
//       for (let i = 1; i <= totalPages; i++) {
//         pageNumbers.push(i);
//       }
//     } else {
//       if (currentPage <= pagesToShow + 1) {
//         // Show initial pages, and last few pages with dots in between
//         for (let i = 1; i <= pagesToShow * 2 + 1; i++) {
//           pageNumbers.push(i);
//         }
//         if (totalPages > pagesToShow * 2 + 1) {
//           pageNumbers.push(dots, totalPages);
//         }
//       } else if (currentPage >= totalPages - pagesToShow) {
//         // Show last pages and initial few pages with dots in between
//         pageNumbers.push(1, dots);
//         for (let i = totalPages - pagesToShow * 2; i <= totalPages; i++) {
//           pageNumbers.push(i);
//         }
//       } else {
//         // Show current page with pages before and after it
//         pageNumbers.push(1, dots);
//         for (let i = startPage; i <= endPage; i++) {
//           pageNumbers.push(i);
//         }
//         pageNumbers.push(dots, totalPages);
//       }
//     }
  
//     return pageNumbers.map((number, index) => (
//       <button
//   key={index}
//   onClick={() => paginate(number)}
//   className="{mx-1 px-3 py-1 rounded ${currentPage === number ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'} transition-colors duration-300 border-solid border-[1px] border-black}"
//   disabled={number === dots}
// >
//   {number}
// </button>
//     ));
//   };

//   return (
//     <div>
//       <select className="h-[70px] text-2xl mr-10 rounded" name="contest" onChange={handleContestChange} defaultValue="weekly_contest_410">
//         <option value="weekly_contest_410">Contest 410</option>
//         <option value="weekly_contest_409">Contest 409</option>
//       </select>
//       <h2 className="text-center pt-5 text-6xl">{getFormattedTableName(table)}</h2>
//       <center>
//         <button 
//           className='border-black border-2 pl-5 pr-5 mt-10 w-30 rounded h-[70px] text-3xl relative duration-300 hover:bg-gray-300' 
//           onClick={toggleFilters}
//         >
//           Filter
//         </button>
//       </center>
//       {showFilters && (
//         <div className="flex justify-center pt-10">
//           <select className="h-[70px] text-2xl mr-10 rounded" name="status" onChange={handleFilterChange} defaultValue="">
//             <option value="" disabled hidden>Status</option>
//             <option value="">All</option> 
//             <option value="attended">Attended</option>
//             <option value="not attended">Not Attended</option>
//           </select>
//           <select className="h-[70px] text-2xl mr-10 rounded" name="year" onChange={handleFilterChange} defaultValue="">
//             <option value="" disabled hidden>Year</option>
//             <option value="">All</option>
//             <option value="2">2nd year</option>
//             <option value="3">3rd year</option>
//           </select>
//           <select className="h-[70px] text-2xl mr-10 rounded" name="dept" onChange={handleFilterChange} defaultValue="">
//             <option value="" disabled hidden>Department</option>
//             <option value="">All</option>
//             <option value="CSE">CSE</option>
//             <option value="ECE">ECE</option>
//           </select>
//           <select className="h-[70px] text-2xl mr-10 rounded" name="section" onChange={handleFilterChange} defaultValue="">
//             <option value="" disabled hidden>Section</option>
//             <option value="">All</option>
//             <option value="A">A</option>
//             <option value="B">B</option>
//             <option value="C">C</option>
//             <option value="D">D</option>
//           </select> 
//           <select className="h-[70px] text-2xl mr-10 rounded" name="no_of_questions" onChange={handleFilterChange} defaultValue="">
//             <option value="" disabled hidden>No. of Questions</option>
//             <option value="">All</option>
//             <option value="4">4</option>
//             <option value="3">3</option>
//             <option value="2">2</option>
//             <option value="1">1</option>
//             <option value="0">0</option>
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
//           {currentStudents.map((student, index) => (
//             <tr key={index} className='hover:bg-gray-300 ease-out'>
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
//       <div className="flex justify-center mt-10">
//         {renderPagination()}
//       </div>
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
  const [filters, setFilters] = useState({
    no_of_questions: null,
    status: null,
    dept: null,
    section: null,
    year: null
  });
  const [showFilters, setShowFilters] = useState(false);
  const [table, setTable] = useState('weekly_contest_410');
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(25);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value !== "" ? value : null,
    }));
    setCurrentPage(1);
  };

  const handleContestChange = (event) => {
    setTable(event.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    console.log(`Fetching data from the table: ${table}`);

    const fetchStudents = async () => {
      const { data, error } = await supabase
        .from(table)
        .select('username, no_of_questions, question_ids, finish_time, status, dept, year, section, rank');
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
    setCurrentPage(1);
  }, [filters, students]);

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  const getFormattedTableName = (tableName) => {
    const contestNumber = tableName.split('_').pop();
    return `Weekly Contest ${contestNumber}`;
  };

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPagination = () => {
    const pageNumbers = [];
    const dots = '...';

    const pagesToShow = 3;
    const startPage = Math.max(1, currentPage - pagesToShow);
    const endPage = Math.min(totalPages, currentPage + pagesToShow);

    if (totalPages <= 5) {
      // Show all pages if total pages are 5 or less
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= pagesToShow + 1) {
        // Show initial pages, and last few pages with dots in between
        for (let i = 1; i <= pagesToShow * 2 + 1; i++) {
          pageNumbers.push(i);
        }
        if (totalPages > pagesToShow * 2 + 1) {
          pageNumbers.push(dots, totalPages);
        }
      } else if (currentPage >= totalPages - pagesToShow) {
        // Show last pages and initial few pages with dots in between
        pageNumbers.push(1, dots);
        for (let i = totalPages - pagesToShow * 2; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Show current page with pages before and after it
        pageNumbers.push(1, dots);
        for (let i = startPage; i <= endPage; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push(dots, totalPages);
      }
    }

    return pageNumbers.map((number, index) => (
      <button
        key={index}
        onClick={() => paginate(number)}
        className={`mx-1 px-3 py-1 rounded transition-colors duration-300 border-solid border-[1px] border-black ${
          currentPage === number ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'
        }`}
        disabled={number === dots}
      >
        {number}
      </button>
    ));
  };

  return (
    <div>
      <select className="h-[70px] text-2xl mr-10 rounded" name="contest" onChange={handleContestChange} defaultValue="weekly_contest_410">
        <option value="weekly_contest_410">Contest 410</option>
        <option value="weekly_contest_409">Contest 409</option>
      </select>
      <h2 className="text-center pt-5 text-6xl">{getFormattedTableName(table)}</h2>
      <center>
        <button 
          className='border-black border-2 pl-5 pr-5 mt-10 w-30 rounded h-[70px] text-3xl relative duration-300 hover:bg-gray-300' 
          onClick={toggleFilters}
        >
          Filter
        </button>
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
          {currentStudents.map((student, index) => (
            <tr key={index} className='hover:bg-gray-300 ease-out'>
              <td className="text-center">{student.rank}</td>
              <td className="text-center">{student.username}</td>
              <td className="text-center">{student.dept}</td>
              <td className="text-center">{student.section}</td>
              <td className="text-center">{student.year}</td>
              <td className="text-center">{student.no_of_questions}</td>
              <td className="text-center">{student.question_ids}</td>
              <td className="text-center">{student.finish_time}</td>
              <td className="text-center">{student.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-10">
        {renderPagination()}
      </div>
    </div>
  );
};

export default StudentsTable;