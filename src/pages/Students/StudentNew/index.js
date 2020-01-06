import React from 'react';
import { Input, Form } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';

import Toolbar from '~/components/Toolbar';
import ActionContent from '~/components/ActionContent';

export default function StudentList() {
  async function handleSubmit({ name, email, age, weight, height }) {
    try {
      await api.post('students', {
        name,
        email,
        age,
        weight,
        height,
      });

      toast.success('Success.');
      history.push('/students/list');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <>
      <Toolbar>
        <div>
          <span>Student Subscription</span>
          <aside>
            <Link className="prevPage" to="/students/list">
              VOLTAR
            </Link>
            <button type="submit" form="students-form">
              SALVAR
            </button>
          </aside>
        </div>
      </Toolbar>
      <ActionContent>
        <Form onSubmit={handleSubmit} id="students-form">
          {/* <label htmlFor="name">FULL NAME</label> */}
          <Input
            label="FULL NAME"
            name="name"
            type="text"
            placeholder="John Doe"
          />
          {/* <label htmlFor="name">EMAIL</label> */}
          <Input
            label="EMAIL"
            name="email"
            type="email"
            placeholder="example@email.com"
          />
          <div className="wrapper">
            <div className="organize">
              {/* <label htmlFor="name">AGE</label> */}
              <Input
                label="age"
                name="age"
                type="number"
                placeholder="Example: 35"
              />
            </div>
            <div className="organize">
              {/* <label htmlFor="name">WEIGHT(kg)</label> */}
              <Input
                label="WEIGHT(kg)"
                name="weight"
                type="number"
                // step="0.1"
                placeholder="Example: 89"
              />
            </div>
            <div className="organize">
              {/* <label htmlFor="name">HEIGHT</label> */}
              <Input
                label="HEIGHT"
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
