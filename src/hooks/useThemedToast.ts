import { useContrastText, useToast } from 'native-base';
import { InterfaceToastProps } from 'native-base/lib/typescript/components/composites/Toast';
import { useContext } from 'react';
import { CustomModalContext } from '../components/CustomModal';

export interface UseThemedToastResult {
  show: (props: InterfaceToastProps) => void;
  info: (props: InterfaceToastProps) => void;
  warning: (props: InterfaceToastProps) => void;
  error: (props: InterfaceToastProps) => void;
}

export const useThemedToast = () => {
  const baseToast = useToast();
  const { toast: modalToast } = useContext(CustomModalContext);
  const toast = modalToast || baseToast;

  const warningColor = 'yellow.500';
  const warningTextColor = useContrastText(warningColor);

  const dangerColor = 'red.500';
  const dangerTextColor = useContrastText(dangerColor);

  const show = (props: InterfaceToastProps) => {
    toast.show({ ...props });
  };

  const info = (props: InterfaceToastProps) => {
    toast.show({ ...props });
  };

  const warning = (props: InterfaceToastProps) => {
    toast.show({ ...props, color: warningTextColor, bgColor: warningColor });
  };

  const error = (props: InterfaceToastProps) => {
    toast.show({ ...props, color: dangerTextColor, bgColor: dangerColor });
  };

  return { show, info, warning, error };
};
