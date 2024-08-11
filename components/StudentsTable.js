"use client"
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const StudentsTable = () => {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      let query = supabase.from('weekly_contest_409').select('username, no_of_questions, question_ids, finish_time');

      if (filter) {
        query = query.eq('no_of_questions', filter);
      }

      const { data, error } = await query;

      if (error) {
        console.error(error);
      } else {
        setStudents(data);
      }
    };

    fetchStudents();
  }, [filter]); 

  return (
    <div>
      <h2>Students Table</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>
              No. of Questions
              <select onChange={(e) => setFilter(e.target.value)} defaultValue="">
                <option value="">All</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
              </select>
            </th>
            <th>Question ID</th>
            <th>Finish Time</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.username}</td>
              <td>{student.no_of_questions}</td>
              <td>{student.question_ids}</td>
              <td>{student.finish_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsTable;
