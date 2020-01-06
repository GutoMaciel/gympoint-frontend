import styled from 'styled-components';
import { lighten } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  max-width: 360px;
  width: 100%;
  text-align: center;
  padding: 30px 30px;

  background: #fff;
  border-radius: 4px;

  img {
    width: 130px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
  }

  strong {
    font-size: 14px;
    color: #555;
    font-weight: bold;
    text-align: left;
    padding: 5px;
  }

  span {
    color: #f64c75;
    align-self: flex-start;
    margin: 5 0 10px;
    font-weight: bold;
    padding: 0px 0px 0px 5px;
  }

  input {
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    height: 44px;
    padding: 0 15px;
    color: #444;
    margin: 0 0 10px;

    &::placeholder {
      color: #999;
    }
  }

  button {
    width: 100%;
    margin-top: 15px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    background: #ee4d64;
    border: none;
    border-radius: 4px;
    padding: 13px;

    &:hover {
      background: ${lighten(0.03, '#ee4d64')};
    }
  }
`;
