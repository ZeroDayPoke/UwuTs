import React from 'react';
import { ListGroup } from 'react-bootstrap';

interface SidePaneProps {
  items: string[];
  onItemSelect: (item: string, index: number) => void;
  selectedItem?: string;
}

const SidePane: React.FC<SidePaneProps> = ({ items, onItemSelect, selectedItem }) => {
  const handleClick = (item: string, index: number) => {
    onItemSelect(item, index);
  };

  return (
    <div className="sidepane">
      <ListGroup>
        {items.map((item, index) => (
          <ListGroup.Item 
            action 
            key={index} 
            active={selectedItem === item} 
            onClick={() => handleClick(item, index)}
          >
            {item}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default SidePane;
