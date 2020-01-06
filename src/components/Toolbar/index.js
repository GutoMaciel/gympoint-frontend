import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Toolbar({ children }) {
  return <Container>{children}</Container>;
}

Toolbar.propTypes = {
  children: PropTypes.element.isRequired,
};
