"use client";
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const StudentsTable = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filters, setFilters] = useState({ no_of_questions: null, status: null, dept: null, section: null, year: null });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value !== "" ? value : null,
    }));
  };

  useEffect(() => {
    const fetchStudents = async () => {
      const { data, error } = await supabase
        .from('weekly_contest_410')
        .select('username, no_of_questions, question_ids, finish_time, status, dept, year, section');

      if (error) {
        console.error(error);
      } else {
        setStudents(data);
        setFilteredStudents(data); // Initially display all students
      }
    };

    fetchStudents();
  }, []);

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
    setFilteredStudents(filtered);
    console.log(students)
  }, [filters, students]);

  return (
    <div>
    <h2 className='text-center pt-5'>Students Table</h2>
    <div className='flex justify-center'>
      <table className='mx-[250px]'>
        <thead>
          <tr>
            <th className='w-[239px]'>Username</th>
            <th className='w-[150px]'>
              Department
              <select name="dept" onChange={handleFilterChange} defaultValue="">
                <option value="">All</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
              </select>
            </th>
            <th className='w-[150px]'>
              Section
              <select name="section" onChange={handleFilterChange} defaultValue="">
                <option value="">All</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </th>
            <th className='w-[100px]'>
              Year
              <select name="year" onChange={handleFilterChange} defaultValue="">
                <option value="">All</option>
                <option value= "2" >2nd year</option>
                <option value= "3" >3rd year</option>
              </select>
            </th>
            <th className='w-[150px]'>
              No. of Questions
              <select name="no_of_questions" onChange={handleFilterChange} defaultValue="">
                <option value="">All</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
                <option value="0">0</option>
              </select>
            </th>
            <th>Question ID</th>
            <th className='w-[100px]'>Finish Time</th>
            <th className='w-[100px]'>
              Status
              <select name="status" onChange={handleFilterChange} defaultValue="">
                <option value="">All</option>
                <option value="attended">Attended</option>
                <option value="not attended">Not Attended</option>
              </select>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={index}>
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
    </div>
  );
};

export default StudentsTable;
