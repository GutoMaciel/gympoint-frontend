import React from 'react';
import PropTypes from 'prop-types';

import { Table } from './styles';

export default function DefaultTable({ children }) {
  return <Table>{children}</Table>;
}

DefaultTable.propTypes = {
  children: PropTypes.element.isRequired,
};
