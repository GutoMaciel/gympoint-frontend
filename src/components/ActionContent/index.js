import React from 'react';
import PropTypes from 'prop-types';

import { Container, Content } from './styles';

export default function ActionContent({ children }) {
  return (
    <Container>
      <Content>{children}</Content>
    </Container>
  );
}

ActionContent.propTypes = {
  children: PropTypes.element.isRequired,
};
