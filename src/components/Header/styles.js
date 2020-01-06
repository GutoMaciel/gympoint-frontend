import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;
  }

  img {
    margin-right: 5px;
    padding-right: 5px;
  }

  strong {
    margin-right: 20px;
    padding-right: 20px;
    border-right: 1px solid #eee;
    color: #ee4d64;
    font-size: 13px;
  }

  a {
    font-weight: bold;
    color: #999;
    margin-left: 10px;
    /* padding: 7px; */
    font-size: 13px;

    &.selected {
      color: #444;
    }

    &:hover {
      color: #444;
    }
  }

  aside {
    display: flex;
    align-items: right;
    align-content: right;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;

  div {
    text-align: right;
    margin-right: 10px;

    span {
      display: block;
      color: #444;
      font-size: 11px;
      text-align: right;
      font-weight: bold;
    }

    button {
      line-height: 16px;
      margin-top: 4px;
      font-size: 10px;
      color: #ee4d64;
      background: none;
      border: 0;
    }
  }
`;
