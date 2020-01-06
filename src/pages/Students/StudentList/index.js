// import api from '~/services/api';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '~/services/api';

import Toolbar from '~/components/Toolbar';
import DefaultTable from '~/components/DefaultTable';
import ActionContent from '~/components/ActionContent';

export default function StudentList() {
  const [name, setName] = useState('');
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState([]);

  useEffect(() => {
    async function getStudents() {
      try {
        const response = await api.get('students', {
          params: { page, name },
        });

        if (response.data.count <= 15) {
          setPage(1);
        }

        setStudents(response.data.rows);
      } catch (err) {
        toast.error('No student was found.');
      }
    }

    getStudents();
  }, [name, page]);

  async function handleDelete(id) {
    try {
      await api.delete(`/students/${id}`);

      const updatedList = students.filter(student => student.id !== id);

      setStudents(updatedList);

      toast.success('Ok. Student was deleted with success.');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <>
      <Toolbar>
        <div>
          <span>Students Management</span>
          <aside>
            <Link to="/students/new">New</Link>
            <input
              type="search"
              onChange={e => setName(e.target.value)}
              placeholder="Search student"
            />
          </aside>
        </div>
      </Toolbar>
      <ActionContent>
        <DefaultTable>
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>AGE</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td>
                  <Link to={`${student.id}`}>Edit</Link>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </DefaultTable>
      </ActionContent>
    </>
  );
}
