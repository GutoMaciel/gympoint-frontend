// import api from '~/services/api';
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';

// import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';

import api from '~/services/api';
import history from '~/services/history';

import Toolbar from '~/components/Toolbar';
import ActionContent from '~/components/ActionContent';

const schema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string().email(),
  age: Yup.number().positive(),
  weight: Yup.number().positive(),
  height: Yup.number().positive(),
});

export default function StudentEdit() {
  // const studentInfo = useSelector(state => state.student);
  // initial student data

  const [studentData, setStudentData] = useState({});
  const { id } = useParams();

  // useEffect(() => {
  //   async function getStudentData() {
  //     try {
  //       const response = await api.get(`students/${match.params.id}`);
  //       setStudentData(response.data);
  //     } catch (err) {
  //       toast.error(err.response.data.error || 'Erro');
  //     }
  //   }
  //   getStudentData();
  // }, [match.params.id]);

  useEffect(() => {
    async function getStudentData() {
      const response = await api.get(`students/${id}`);

      const initialData = {
        name: response.data.name,
        email: response.data.email,
        age: response.data.age,
        weight: response.data.weight,
        height: response.data.height,
      };

      setStudentData(initialData);
    }
    getStudentData();
  }, [id]);

  async function handleSubmit({ name, email, age, height, weight }) {
    try {
      await api.put(`students/${id}`, {
        name,
        email,
        age,
        height,
        weight,
      });

      toast.success('Student updated with success.');
      history.push('/students/list');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <>
      <Toolbar>
        <div>
          <span>Student Update</span>
          <aside>
            <Link className="prevPage" to="/students/list">
              BACK
            </Link>
            <button type="submit" form="students-form">
              SAVE
            </button>
          </aside>
        </div>
      </Toolbar>
      <ActionContent>
        <Form
          id="students-form"
          initialData={studentData}
          onSubmit={handleSubmit}
          schema={schema}
        >
          <label htmlFor="name">NAME</label>
          <Input name="name" type="text" placeholder="Full name" />
          <label htmlFor="name">EMAIL</label>
          <Input name="email" type="email" placeholder="example@email.com" />
          <div className="wrapper">
            <div className="organize">
              <label htmlFor="name">AGE</label>
              <Input name="age" type="number" placeholder="Example: 35" />
            </div>
            <div className="organize">
              <label htmlFor="name">WEIGHT(kg)</label>
              <Input
                name="weight"
                type="number"
                // step="0.1"
                placeholder="Example: 89"
              />
            </div>
            <div className="organize">
              <label htmlFor="name">HEIGHT</label>
              <Input
                name="height"
                type="number"
                // step="0.01"
                placeholder="Example: 1.77"
              />
            </div>
          </div>
        </Form>
      </ActionContent>
    </>
  );
}
