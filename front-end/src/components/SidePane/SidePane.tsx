// ./src/components/SidePane/SidePane.tsx

import React from 'react';
import { StyledSidePane } from './SidePaneStyles';

const SidePane: React.FC = () => {
  return (
    <StyledSidePane>
      <h3>Additional Information</h3>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </StyledSidePane>
  );
};

export default SidePane;
