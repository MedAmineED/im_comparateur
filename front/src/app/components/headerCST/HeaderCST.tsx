import React from 'react';
import { Button, Typography } from 'antd';
import { Space } from 'antd';

interface HeaderCSTProps {
  title: string;
  buttonText: string;
  onButtonClick?: () => void; // Optional prop for button click handler
}

const HeaderCST: React.FC<HeaderCSTProps> = ({ title, buttonText, onButtonClick }) => {
  return (
    <Space style={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography.Title level={4} style={{ margin: 0 }}>
        {title}
      </Typography.Title>
      <Button type="primary" onClick={onButtonClick}>
        {buttonText}
      </Button>
    </Space>
  );
};

export default HeaderCST;
