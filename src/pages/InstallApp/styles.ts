import styled from 'styled-components';
import { motion } from 'framer-motion';

export const InstallAppContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
`;

export const Message = styled(motion.div)`
  position: relative;
  width: 100%;
  font-size: 16px;
  color: #666;
  transition: all 0.3s;
  cursor: default;
  a {
    color: inherit;
    text-decoration: none;
    &:hover {
      color: #333;
    }
  }
  &:hover {
    color: #333;
  }
`;

export const Button = styled(motion.button)`
  position: absolute;
  right: 0;
  top: 50%;
  margin-left: auto;
  padding: 8px 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #fff;
  color: #333;
  font-size: 16px;
  cursor: pointer;
`;
