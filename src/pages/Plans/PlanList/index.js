// import api from '~/services/api';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';
import Toolbar from '~/components/Toolbar';
import ActionContent from '~/components/ActionContent';
import DefaultTable from '~/components/DefaultTable';
import { formatPrice } from '~/util/format';

import api from '~/services/api';

export default function StudentList() {
  // const [page, setPage] = useState(1);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function getPlans() {
      try {
        const response = await api.get('plans');

        const data = response.data.map(plan => ({
          ...plan,
          priceFormatted: formatPrice(plan.price),
          durationFormatted:
            plan.duration > 1
              ? `${plan.duration} months`
              : `${plan.duration} month`,
        }));

        setPlans(data);
      } catch (err) {
        toast.error('Plans not found.');
      }
    }

    getPlans();
  }, []);

  async function handleDelete(id) {
    try {
      await api.delete(`/plans/${id}`);

      const newPlansList = plans.filter(plan => plan.id !== id);
      toast.success('O plano foi deletado com sucesso.');
      setPlans(newPlansList);
    } catch (err) {
      toast.error('Error.');
    }
  }

  return (
    <>
      <Toolbar>
        <div>
          <span>Plans Management</span>
          <aside>
            <Link to="/plans/new">New</Link>
          </aside>
        </div>
      </Toolbar>
      <ActionContent>
        <DefaultTable>
          <thead>
            <tr>
              <th>TITLE</th>
              <th>DURATION</th>
              <th>MONTHLY PRICE</th>
            </tr>
          </thead>
          <tbody>
            {plans.map(plan => (
              <tr kwy={plan.id}>
                <td>{plan.title}</td>
                <td>{plan.durationFormatted}</td>
                <td>{plan.priceFormatted}</td>
                <td>
                  <Link to={`/plans/edit/${plan.id}`}>Edit</Link>
                </td>
                <td>
                  <button type="button" onClick={() => handleDelete(plan.id)}>
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
