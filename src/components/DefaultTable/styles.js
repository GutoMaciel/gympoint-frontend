import styled from 'styled-components';

// export const Container = styled.div`
//   height: 630px;
//   overflow: scroll;
//   overflow-x: hidden;
//   overflow-y: visible;
// `;

export const Table = styled.table`
  border-collapse: collapse;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
  text-align: left;
  thead {
    tr {
      font-size: 18px;
    }
  }
  tbody {
    overflow: scroll;
  }
  tbody td {
    border-bottom: 1px solid #eee;
  }
  tr:last-child td {
    border-bottom: none;
  }
  tbody tr {
    height: 40px;
    color: #777;
  }

  tbody tr {
    button {
      border: none;
      background: none;
      color: #ee4d64;
      font-weight: bold;
    }
  }
  tbody tr a {
    color: #4d85ee;
  }
`;
