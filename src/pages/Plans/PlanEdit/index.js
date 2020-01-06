import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import history from '~/services/history';
import api from '~/services/api';

import Toolbar from '~/components/Toolbar';
import ActionContent from '~/components/ActionContent';
import { formatPrice } from '~/util/format';
// import Loading from '~/components/Loading';

const schema = Yup.object().shape({
  title: Yup.string().required(),
  duration: Yup.number().required(),
  price: Yup.number().required(),
});

export default function PlanEdit() {
  const { id } = useParams();
  const [planTitle, setPlanTitle] = useState('');
  const [planPrice, setPlanPrice] = useState(0);
  const [planDuration, setPlanDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  // const [plans, setPlans] = useState([]);
  // const [planData, setPlanData] = useState({});

  const totalSum = useMemo(() => formatPrice(planPrice * planDuration), [
    planDuration,
    planPrice,
  ]);

  useEffect(() => {
    async function getPlanInfo() {
      try {
        setLoading(true);
        const response = await api.get(`plans/${id}`);

        setPlanTitle(response.data.title);
        setPlanPrice(response.data.price);
        setPlanDuration(response.data.duration);

        // setPlanData(response.data);
      } catch (err) {
        toast.error();
      } finally {
        setLoading(false);
      }
    }
    getPlanInfo();
  }, [id]);

  async function handleSubmit({ title, duration, price }) {
    try {
      await api.put(`/plans/${id}`, {
        title,
        duration,
        price,
      });

      toast.success('This plan was updated with success.');
      history.push('/plans/list');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <>
      <Toolbar>
        <div>
          <span>Plan Update</span>
          <aside>
            <Link className="prevPage" to="/plans/list">
              BACK
            </Link>
            <button type="submit" form="plans-form">
              SAVE
            </button>
          </aside>
        </div>
      </Toolbar>

      <ActionContent loading={loading}>
        <Form schema={schema} onSubmit={handleSubmit} id="plans-form">
          {/* <label htmlFor="planTitle">PLAN TITLE</label> */}
          <Input
            label="PLAN TITLE"
            name="title"
            type="text"
            placeholder="Titulo do plano"
            value={planTitle}
            onChange={e => setPlanTitle(e.target.value)}
          />
          <div className="wrapper">
            <div className="organize">
              {/* <label htmlFor="planDuration">DURATION</label> */}
              <Input
                label="DURATION"
                name="duration"
                type="number"
                placeholder="Month duration"
                value={planDuration}
                onChange={e => setPlanDuration(e.target.value)}
              />
            </div>
            <div className="organize">
              {/* <label htmlFor="monthlyPrice">MONTHLY PRICE</label> */}
              <Input
                label="MONTHLY PRICE"
                name="price"
                type="number"
                placeholder="Monthly price for this plan"
                value={planPrice}
                onChange={e => setPlanPrice(e.target.value)}
              />
            </div>
            <div className="organize">
              {/* <label htmlFor="totalPrice">TOTAL PRICE</label> */}
              <Input
                label="TOTAL PRICE"
                readOnly
                name="totalPrice"
                placeholder="Total price calculated"
                value={totalSum}
                // onChange={e => setPlanPrice(e.target.value)}
              />
            </div>
          </div>
        </Form>
      </ActionContent>
    </>
  );
}
