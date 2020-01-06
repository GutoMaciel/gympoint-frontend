import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo-header.svg';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Content, Profile } from './styles';

export default function Header() {
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Gympoint" />
          <strong>GYMPOINT</strong>

          <Link to="/students/list">STUDENTS</Link>
          <Link to="/plans/list">PLANS</Link>
          <Link to="/enrollments/list">ENROLLMENTS</Link>
          <Link to="/helporders/list">HELP ORDERS</Link>
        </nav>
        <aside>
          <Profile>
            <div>
              <span>Gustavo Maciel</span>
              <button type="button" onClick={handleSignOut}>
                Logout
              </button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
