import React, { FC, ReactNode } from 'react';

interface MainViewProps {
  children: ReactNode;
}

const MainView: FC<MainViewProps> = ({ children }) => {
  return (
    <div className="main-view">
      {children}
    </div>
  );
};

export default MainView;
