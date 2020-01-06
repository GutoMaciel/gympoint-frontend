import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';

import { addMonths } from 'date-fns/esm';
import { parseISO } from 'date-fns';
import { formatPrice } from '~/util/format';
import history from '~/services/history';
import api from '~/services/api';

import Toolbar from '~/components/Toolbar';
import ActionContent from '~/components/ActionContent';

export default function EnrollmentEdit() {
  const [planSelected, setPlanSelected] = useState(null);
  const [studentName, setStudentName] = useState('');
  const [studentSelected, setStudentSelected] = useState(null);
  const [initialDate, setInitialDate] = useState(new Date());
  const [planOptions, setPlanOptions] = useState([]);
  const [planPrice, setPlanPrice] = useState(0);
  // const [planId, setPlanId] = useState('');
  const [planDuration, setPlanDuration] = useState(0);
  const { id } = useParams();

  const endDate = useMemo(() => addMonths(initialDate, planDuration), [
    initialDate,
    planDuration,
  ]);

  const totalPrice = useMemo(() => formatPrice(planDuration * planPrice), [
    planDuration,
    planPrice,
  ]);

  useEffect(() => {
    async function getEnrollmentData() {
      const response = await api.get(`enrollments/${id}`);
      const date = {
        start_date: parseISO(response.data.start_date),
      };

      const plan = {
        label: response.data.plan.title,
        value: response.data.plan.id,
        price: response.data.plan.price,
        duration: response.data.plan.duration,
      };

      setInitialDate(date.start_date);
      setPlanSelected(plan);
      setPlanDuration(plan.duration);
      setPlanPrice(plan.price);
      setStudentSelected(response.data.student);
    }
    getEnrollmentData();
  }, [id]);

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
      await api.put(`enrollments/${id}`, {
        student_id: studentSelected.id,
        plan_id: planSelected.value,
        start_date: initialDate,
      });
      toast.success('Enrollment updated with success.');
      history.push('/enrollment/list');
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
          <span>Enrollment Update</span>
          <aside>
            <Link className="prevPage" to="/enrollments/list">
              BACK
            </Link>
            <button type="submit" form="enrollment-form">
              SAVE
            </button>
          </aside>
        </div>
      </Toolbar>
      <ActionContent>
        <form id="enrollment-form" onSubmit={e => handleSubmit(e)}>
          <label htmlFor="student_id">STUDENT</label>
          <AsyncSelect
            // label="STUDENT"
            value={studentSelected}
            onInputChange={v => setStudentName(v)}
            loadOptions={loadStudents}
            getOptionValue={option => option.id}
            getOptionLabel={option => option.name}
            onChange={s => setStudentSelected(s)}
            name="student_id"
            // defaultValue={studentName}
          />
          <div className="wrapper">
            <div className="organize">
              <label htmlFor="plan_id">PLAN</label>
              <Select
                // label="PLAN"
                value={planSelected}
                getOptionLabel={option => option.label}
                getOptionValue={option => option.value}
                onChange={p => {
                  setPlanSelected(p);
                  setPlanDuration(p.duration);
                  setPlanPrice(p.price);
                }}
                options={planOptions}
                styles={customStyles}
                name="plan_id"
              />
            </div>
            <div className="organize">
              <label htmlFor="start_date">START DATE</label>
              <DatePicker
                // label="START DATE"
                name="start_date"
                selected={initialDate}
                dateFormat="dd/MM/yyyy"
                onChange={d => setInitialDate(d)}
              />
            </div>
            <div className="organize">
              <label htmlFor="monthlyPrice">END DATE</label>
              <DatePicker
                // label="END DATE"
                className="readOnly"
                selected={endDate}
                dateFormat="dd/MM/yyyy"
                readOnly
                name="end_date"
              />
            </div>
            <div className="organize">
              <label htmlFor="totalPrice">TOTAL PRICE</label>
              <input
                // label="TOTAL PRICE"
                value={totalPrice}
                className="readOnly"
                readOnly
                name="totalPrice"
              />
            </div>
          </div>
        </form>
      </ActionContent>
    </>
  );
}
