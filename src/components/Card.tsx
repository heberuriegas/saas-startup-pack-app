import { Box, IBoxProps } from 'native-base';
import React, { ReactElement } from 'react';

interface ICardProps extends IBoxProps {
  title?: ReactElement;
  footer?: ReactElement;
}

export const Card: React.FC<ICardProps> = ({ children, title, footer, ...props }) => {
  return (
    <Box p={5} borderWidth={0.5} borderColor="gray.300" borderRadius="sm" {...props}>
      {title}
      {children}
      {footer}
    </Box>
  );
};
