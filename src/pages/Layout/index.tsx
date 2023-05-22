import { FC } from 'react';
import * as SC from './styles';
import { Outlet } from 'react-router-dom';
import { shell } from 'electron';

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
        <SC.Author>
          Author:
          <SC.AuthorLink
            onClick={(event) => {
              event.preventDefault();
              shell.openExternal('https://github.com/Siykt');
            }}
            href="https://github.com/Siykt"
          >
            Siykt
          </SC.AuthorLink>
        </SC.Author>
      </SC.LayoutContentWrapper>
    </SC.LayoutContainer>
  );
};

export default Layout;
