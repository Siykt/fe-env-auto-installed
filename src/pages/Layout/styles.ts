import styled from 'styled-components';
import BG from '@/assets/images/bg.jpg';

export const LayoutContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

export const LayoutBG = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-image: url(${BG});
  background-repeat: no-repeat;
  background-size: cover;
  /* filter: blur(1px); */
  z-index: 1;
`;

export const LayoutBGC = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(31, 41, 55, 0.75);
  z-index: 1;
`;

export const LayoutContentWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 2;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LayoutContent = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  width: 68vw;
  box-sizing: border-box;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`;

export const Author = styled.div`
  position: absolute;
  left: 50%;
  bottom: 20vh;
  font-size: 16px;
  color: #ffffff80;
  transform: translateX(-50%);
`;

export const AuthorLink = styled.a`
  margin-left: 5px;
  font-size: 16px;
  color: #ffffff80;
  text-decoration: none;
  transition: all 0.3s;
  &:hover {
    color: #ffffff;
  }
`;
