import styled from 'styled-components';
import { Message as MSG } from '../styles';
import { motion, MotionProps } from 'framer-motion';
import { forwardRef } from 'react';

const MotionDiv = forwardRef<HTMLDivElement, MotionProps>((props, ref) => (
  <motion.div
    ref={ref}
    transition={{ duration: 0.2 }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0.7 }}
    {...props}
  />
));

export const StepsContainer = styled(MotionDiv)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 1px;
  overflow-y: auto;
  flex: 1 0;

  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #777;
  }
`;

export const Message = styled(MSG)`
  flex-shrink: 0;
  color: #999;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  &:hover {
    color: #fff;
  }
`;
