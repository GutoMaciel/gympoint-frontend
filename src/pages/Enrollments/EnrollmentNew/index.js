import React, { useState, useEffect, useMemo } from 'react';
// import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import DatePicker from 'react-datepicker';

import { toast } from 'react-toastify';

import { Link } from 'react-router-dom';
import { addMonths } from 'date-fns/esm';
import history from '~/services/history';
import api from '~/services/api';

import Toolbar from '~/components/Toolbar';
import ActionContent from '~/components/ActionContent';
import DatePickerComponent from '~/components/DatePicker';
import { formatPrice } from '~/util/format';

const schema = Yup.object().shape({
  student_id: Yup.number().required(),
  plan_id: Yup.number().required(),
  start_date: Yup.date().required(),
});

export default function PlanNew() {
  const [studentName, setStudentName] = useState('');
  const [studentSelected, setStudentSelected] = useState(null);
  const [initialDate, setInitialDate] = useState(new Date());
  const [planOptions, setPlanOptions] = useState([]);
  const [planPrice, setPlanPrice] = useState(0);
  const [planId, setPlanId] = useState('');
  const [planDuration, setPlanDuration] = useState(0);

  const endDate = useMemo(() => addMonths(initialDate, planDuration), [
    initialDate,
    planDuration,
  ]);

  const totalPrice = useMemo(() => formatPrice(planDuration * planPrice), [
    planDuration,
    planPrice,
  ]);

  useEffect(() => {
    async function getPlans() {
      const response = await api.get('plans');
      const data = response.data.map(plan => ({
        label: plan.title,
        value: plan.id,
        duration: plan.duration,
        price: plan.price,
      }));

      setPlanOptions(data);
    }
    getPlans();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await schema.validate(
        {
          start_date: initialDate,
          plan_id: planId,
          student_id: studentSelected,
        },
        {
          abortEarly: false,
        }
      );
    } catch (err) {
      err.inner.forEach(error => {
        toast.error(error.message);
      });
      return;
    }

    try {
      await api.post(`enrollments`, {
        student_id: studentSelected,
        start_date: initialDate,
        plan_id: planId,
      });
      toast.success('Enrollment created with success.');
      history.push('/enrollments/list');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  async function loadStudents() {
    const response = await api.get(`students?name=${studentName}`);

    return response.data.rows;
  }

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'white' : 'blue',
    }),
    control: styles => ({
      ...styles,
      width: 200,
      marginRight: 10,
    }),
  };

  return (
    <>
      <Toolbar>
        <div>
          <span>Enrollment Subscription</span>
          <aside>
            <Link className="prevPage" to="/enrollments/list">
              BACK
            </Link>
            <button form="enrollment-form" type="submit">
              SAVE
            </button>
          </aside>
        </div>
      </Toolbar>
      <ActionContent>
        <form id="enrollment-form" onSubmit={e => handleSubmit(e)}>
          <label htmlFor="planTitle">STUDENT</label>
          <AsyncSelect
            placeholder="Gustavo Maciel"
            defaultValue={null}
            name="student_id"
            loadOptions={loadStudents}
            getOptionValue={option => option.id}
            getOptionLabel={option => option.name}
            onInputChange={v => setStudentName(v)}
            onChange={s => setStudentSelected(s.id)}
            // value={planTitle}
            // onChange={e => setPlanTitle(e.target.value)}
          />
          <div className="wrapper">
            <div className="organize">
              <label htmlFor="plan_id">PLAN</label>
              <Select
                placeholder="Gold"
                name="plan_id"
                styles={customStyles}
                defaultValue={null}
                options={planOptions}
                getOptionValue={option => option.value}
                getOptionLabel={option => option.label}
                onChange={o => {
                  setPlanId(o.value);
                  setPlanDuration(o.duration);
                  setPlanPrice(o.price);
                }}
                type="text"
                // value={planDuration}
                // onChange={e => setPlanDuration(e.targer.value)}
              />
            </div>
            <div className="organize">
              <label htmlFor="start_date">START DATE</label>
              <DatePicker
                name="start_date"
                selected={initialDate}
                dateFormat="dd/MM/yyyy"
                onChange={d => setInitialDate(d)}
                // step="0.1"
                // value={planPrice}
                // onChange={e => setPlanPrice(e.targer.value)}
              />
            </div>
            <div className="organize">
              <label htmlFor="end_date">END DATE</label>
              <DatePicker
                readOnly
                className="readOnly"
                selected={endDate}
                dateFormat="dd/MM/yyyy"
                // step="0.1"
                // value={planPrice}
                // onChange={e => setPlanPrice(e.targer.value)}
              />
            </div>
            <div className="organize">
              <label htmlFor="total_price">TOTAL PRICE</label>
              <input
                className="readOnly"
                readOnly
                name="totalPrice"
                placeholder="R$534,00"
                value={totalPrice}
              />
            </div>
          </div>
        </form>
      </ActionContent>
    </>
  );
}
