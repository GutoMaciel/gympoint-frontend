import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import StudentList from '../pages/Students/StudentList';
import StudentNew from '../pages/Students/StudentNew';
import StudentEdit from '../pages/Students/StudentEdit';

import PlanList from '../pages/Plans/PlanList';
import PlanNew from '../pages/Plans/PlanNew';
import PlanEdit from '../pages/Plans/PlanEdit';

import EnrollmentList from '../pages/Enrollments/EnrollmentList';
import EnrollmentNew from '../pages/Enrollments/EnrollmentNew';
import EnrollmentEdit from '../pages/Enrollments/EnrollmentEdit';

import HelpOrderList from '../pages/HelpOrders/HelpOrderList';
import HelpOrderAnswer from '../pages/HelpOrders/HelpOrderAnswer';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students/list" component={StudentList} isPrivate />
      <Route path="/students/new" component={StudentNew} isPrivate />
      <Route path="/students/:id" component={StudentEdit} isPrivate />

      <Route path="/plans/list" component={PlanList} isPrivate />
      <Route path="/plans/new" component={PlanNew} isPrivate />
      <Route path="/plans/edit/:id" component={PlanEdit} isPrivate />

      <Route path="/enrollments/list" component={EnrollmentList} isPrivate />
      <Route path="/enrollments/new" component={EnrollmentNew} isPrivate />
      <Route
        path="/enrollments/edit/:id"
        component={EnrollmentEdit}
        isPrivate
      />

      <Route path="/helporders/list" component={HelpOrderList} isPrivate />
      <Route
        path="/helporders/answer/:id"
        component={HelpOrderAnswer}
        isPrivate
      />
    </Switch>
  );
}
