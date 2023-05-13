import { I18n } from 'i18n-js/typings';
import { IModalProps, Modal } from 'native-base';
import { InterfaceToastProps } from 'native-base/lib/typescript/components/composites/Toast';
import React, { PropsWithChildren, createContext, useContext } from 'react';
import { I18nContext } from '../features/i18n';
import { useThemedToast } from '../hooks/useThemedToast';

interface CustomModalContextProps {
  i18n?: I18n;
  toast?: {
    show: (props: InterfaceToastProps) => void;
    info: (props: InterfaceToastProps) => void;
    warning: (props: InterfaceToastProps) => void;
    error: (props: InterfaceToastProps) => void;
  };
}

export const CustomModalContext = createContext<CustomModalContextProps>({
  i18n: undefined,
  toast: undefined,
});

interface CustomModalProps extends IModalProps {
  showClose?: boolean;
}

export const CustomModal: React.FC<PropsWithChildren<CustomModalProps>> = ({
  children,
  showClose,
  ...props
}) => {
  const toast = useThemedToast();
  const { i18n } = useContext(I18nContext);

  return (
    <Modal {...props}>
      <CustomModalContext.Provider value={{ i18n, toast }}>
        {showClose && <Modal.CloseButton />}
        {children}
      </CustomModalContext.Provider>
    </Modal>
  );
};
