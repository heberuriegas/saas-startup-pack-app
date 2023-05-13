import { useContext } from 'react';
import { CustomModalContext } from '../components/CustomModal';
import { I18nContext } from '../features/i18n';

export const useI18n = () => {
  const { i18n: baseI18n } = useContext(I18nContext);
  const { i18n: modalI18n } = useContext(CustomModalContext);

  return modalI18n || baseI18n;
};
