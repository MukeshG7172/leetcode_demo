"use client";
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const StudentsTable = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filters, setFilters] = useState({ no_of_questions: null, status: null });

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
        .from('weekly_contest_409')
        .select('username, no_of_questions, question_ids, finish_time, status');

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

    setFilteredStudents(filtered);
  }, [filters, students]);

  return (
    <div>
      <h2>Students Table</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>
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
            <th>Finish Time</th>
            <th>
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
