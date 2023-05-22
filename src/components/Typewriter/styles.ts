import styled, { keyframes } from 'styled-components';

export const TypewriterContainer = styled.div`
  display: flex;
  align-items: center;
`;

const blink = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const TypewriterLine = styled.div`
  margin-left: 1px;
  animation: ${blink} 1s infinite;
`;

export const TypewriterText = styled.div`
  display: inline-block;
`;
