import { I18n } from 'i18n-js/typings';
import { Path, UseFormSetError } from 'react-hook-form';
import { UseThemedToastResult } from '../hooks/useThemedToast';

interface IFormData {
  [key: string]: any;
}

interface IDataError {
  [key: string]: string | string[];
}

interface HandleDataErrorsProps {
  i18n: I18n;
  toast: UseThemedToastResult;
  callback: (dataErrors: any) => void;
  err: any;
}

type HandleDataErrors = (props: HandleDataErrorsProps) => void;

export const handleDataErrors: HandleDataErrors = ({ i18n, toast, err, callback }) => {
  let dataErrors;
  try {
    dataErrors = JSON.parse(err.message);
  } catch {
    dataErrors = { error: i18n.t('app.actions.error') };
  }
  if (!dataErrors.error) {
    callback(dataErrors);
  } else {
    console.error(dataErrors.error);
    toast.error({ description: dataErrors.error });
  }
};

export const setErrors = <T extends IFormData>(
  setError: UseFormSetError<T>,
  dataErrors: IDataError
): void => {
  for (const error in dataErrors) {
    let message: string;
    if (Array.isArray(dataErrors[error])) {
      message = (dataErrors[error] as string[]).join(', ');
    } else {
      message = dataErrors[error] as string;
    }
    setError(error as Path<T>, { type: 'custom', message });
  }
};
