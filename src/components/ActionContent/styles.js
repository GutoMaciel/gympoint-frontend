import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 10px auto 0 auto;
  background: #fff;
  padding: 20px 40px;
  border-radius: 6px;
`;

export const Content = styled.div`
  /* height: 600px; */
  form {
    width: 100%;
    /* max-width: 1000px; */
    display: flex;
    flex-direction: column;
    margin: 0 auto 0px auto;
    span {
      color: #ee4d64;
      align-self: flex-start;
      /* margin: 4px 0 0 1px; */
      font-weight: bold;
    }
    label {
      font-size: 15px;
      font-weight: bold;
      margin: 10px 0 10px 0;
      color: #333;
    }
    input {
      width: 100%;
      border: 1px solid rgba(0, 0, 0, 0.2);
      padding: 10px;
      border-radius: 4px;
      padding: 10px 15px;
    }
    select {
      border: 1px solid rgba(0, 0, 0, 0.2);
      background: #fff;
      padding: 10px;
      border-radius: 4px;
      padding: 10px 15px;
      /* margin-right: 10px; */
    }
    div.wrapper {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    div.organize {
      width: 100%;
      display: flex;
      flex-direction: column;
      /* align-items: center; */
      label {
        align-self: flex-start;
      }
    }
  }
`;
