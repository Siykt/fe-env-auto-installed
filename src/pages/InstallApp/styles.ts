import styled from 'styled-components';

export const InstallAppContainer = styled.div``;

export const Message = styled.div`
  font-size: 16px;
  color: #666;
  transition: all 0.3s;
  cursor: default;
  a {
    color: #333;
    text-decoration: none;
    &:hover {
      color: #000;
    }
  }
  &:hover {
    color: #333;
  }
`;
