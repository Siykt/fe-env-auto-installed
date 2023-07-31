import styled from 'styled-components';
import { Message as MSG } from '../styles';

export const StepsContainer = styled.div`
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Message = styled(MSG)`
  color: #999;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  &:hover {
    color: #fff;
  }
`;
