import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;

  header {
    height: 200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  strong {
    color: #333;
    font-size: 25px;
  }

  button {
    height: 40px;
    width: 170px;
    background: #ee4d64;
    font-weight: bold;
    color: #fff;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.2s;
    padding: 0 18px 0 18px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    &:hover {
      background: ${darken(0.05, '#EE4D64')};
    }
  }

  ul {
    margin-top: 30px;
    grid-template-columns: repeat(1, 1fr);
  }
`;
