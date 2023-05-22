import { FC } from 'react';
import * as SC from './styles';
import { Outlet } from 'react-router-dom';

interface LayoutProps {}

const Layout: FC<LayoutProps> = () => {
  return (
    <SC.LayoutContainer>
      <SC.LayoutBG />
      <SC.LayoutBGC />
      <SC.LayoutContentWrapper>
        <SC.LayoutContent>
          <Outlet />
        </SC.LayoutContent>
        <SC.Author>Author: Siykt</SC.Author>
      </SC.LayoutContentWrapper>
    </SC.LayoutContainer>
  );
};

export default Layout;
