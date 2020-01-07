// import api from '~/services/api';
import React, { useState, useEffect } from 'react';
import { MdCheckCircle } from 'react-icons/md';
import { toast } from 'react-toastify';
// import { confirmAlert } from 'react-confirm-alert';
import { format, parseISO } from 'date-fns';
// import pt from 'date-fns/locale/pt';

import { Link } from 'react-router-dom';
import api from '~/services/api';

import Toolbar from '~/components/Toolbar';
import ActionContent from '~/components/ActionContent';
import DefaultTable from '~/components/DefaultTable';
import Pagination from '~/components/Pagination';

export default function EnrollmentList() {
  const [enrollments, setEnrollments] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function getEnrollments() {
      try {
        const response = await api.get('enrollments', {
          params: { page },
        });

        setTotalPages(Math.ceil(response.data.count / 10));
        const data = response.data.map(regist => ({
          ...regist,
          startDateFormatted: format(
            parseISO(regist.start_date),
            "MMMM ' ' d'th,' Y"
            // {
            //   locale: pt,
            // }
          ),
          endDateFormatted: format(
            parseISO(regist.end_date),
            "MMMM ' ' d'th,' Y"
            // {
            //   locale: pt,
            // }
          ),
        }));

        setEnrollments(data);
      } catch (err) {
        toast.error('No enrollment found.');
      }
    }
    getEnrollments();
  }, [page]);

  async function handleDelete(id) {
    try {
      await api.delete(`enrollments/${id}`);

      const updateEnrollments = enrollments.filter(
        enrollment => enrollment.id !== id
      );

      toast.success('Done.');
      setEnrollments(updateEnrollments);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  // Confirmation Message to delete:
  // function confirmDelete(id) {
  //   confirmAlert({
  //     title: 'Enrollment Delete Confirmation',
  //     message: 'Are you sure about this?',
  //     buttons: [
  //       {
  //         label: 'Yes',
  //         onClick: () => handleDelete(id),
  //       },
  //       {
  //         label: 'No',
  //         onClick: () => {},
  //       },
  //     ],
  //   });
  // }

  return (
    <>
      <Toolbar>
        <div>
          <span>Enrollment Management</span>
          <aside>
            <Link to="/enrollments/new">New</Link>
          </aside>
        </div>
      </Toolbar>
      <ActionContent>
        <DefaultTable>
          <thead>
            <tr>
              <th>STUDENT</th>
              <th>PLAN</th>
              <th>START</th>
              <th>END</th>
              <th align="center">ACTIVE</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map(enrollment => (
              <tr key={enrollment.id}>
                <td>{enrollment.student.name}</td>
                <td>{enrollment.plan.title}</td>
                <td>{enrollment.startDateFormatted}</td>
                <td>{enrollment.endDateFormatted}</td>
                <td align="center">
                  {enrollment.active ? (
                    <MdCheckCircle size={20} color="#42cb59" />
                  ) : (
                    <MdCheckCircle size={20} color="#c4c4c4" />
                  )}
                </td>
                <td>
                  <Link to={`edit/${enrollment.id}`}>Edit</Link>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleDelete(enrollment.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </DefaultTable>
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </ActionContent>
    </>
  );
}
