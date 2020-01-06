import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { formatPrice } from '~/util/format';
import history from '~/services/history';

import api from '~/services/api';

import Toolbar from '~/components/Toolbar';
import ActionContent from '~/components/ActionContent';

export default function PlanNew() {
  // Yup Validations
  const [planTitle, setPlanTitle] = useState('');
  const [planPrice, setPlanPrice] = useState(0);
  const [planDuration, setPlanDuration] = useState(0);
  const [totalPrice, setTotalPrice] = useState('');

  useEffect(() => {
    if (planPrice && planDuration) {
      setTotalPrice(formatPrice(planPrice * planDuration));
    }
  }, [planPrice, planDuration]);

  async function handleSubmit({ title, price, duration }) {
    try {
      await api.post(`/plans`, {
        title,
        price,
        duration,
      });

      toast.success('Plano cadastrado com sucesso.');
      history.push('/plans/list');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <>
      <Toolbar>
        <div>
          <span>Plan Subscription</span>
          <aside>
            <Link className="prevPage" to="/plans/list">
              Back
            </Link>
            <button type="submit" form="plans-form">
              Save
            </button>
          </aside>
        </div>
      </Toolbar>
      <ActionContent>
        <Form id="plans-form" onSubmit={handleSubmit}>
          {/* <label htmlFor="name">PLAN TITLE</label> */}
          <Input
            label="PLAN TITLE"
            name="title"
            type="text"
            placeholder="Plan title"
            value={planTitle}
            onChange={e => setPlanTitle(e.target.value)}
          />
          <div className="wrapper">
            <div className="organize">
              {/* <label htmlFor="name">DURATION (MONTHS)</label> */}
              <Input
                label="DURATION (MONTHS)"
                name="duration"
                type="number"
                placeholder="Duration in months"
                onChange={e => setPlanDuration(e.target.value)}
                // value={planDuration}
              />
            </div>

            <div className="organize">
              {/* <label htmlFor="name">MONTHLY PRICE</label> */}
              <Input
                label="MONTHLY PRICE"
                name="price"
                type="number"
                placeholder="Monthly price"
                // value={planPrice}
                onChange={e => setPlanPrice(e.target.value)}
                // step="0.1"
                // prefix="R$ "
                // fixedDecimalScale
                // decimalSeparator=","
                // decimalScale={2}
                // thousandSeparator="."
              />
            </div>

            <div className="organize">
              {/* <label htmlFor="name">TOTAL PRICE</label> */}
              <Input
                label="TOTAL PRICE"
                name="totalPrice"
                placeholder="Total price"
                value={totalPrice}
                readOnly
              />
            </div>
          </div>
        </Form>
      </ActionContent>
    </>
  );
}
