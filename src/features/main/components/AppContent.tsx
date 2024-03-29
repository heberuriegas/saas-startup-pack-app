import React, { useContext, useMemo } from 'react';
import { Config } from '../../../config';
import { ActiveStorageProvider } from '../../../context/ActiveStorage';
import { Headers } from '../../../context/ActiveStorage/ActiveStorateProvider.types';
import { AuthContext } from '../../auth/context';
import { HomeNavigator } from '../../home/navigation/HomeNavigator';

export const AppContent = () => {
  const { credentials } = useContext(AuthContext);

  const activeStorageHeaders = useMemo(() => {
    const headers: Headers = {};
    if (credentials) headers['Authorization'] = `Bearer ${credentials?.accessToken}`;
    return headers;
  }, [credentials]);

  return (
    <ActiveStorageProvider host={Config.AUTH_URL} mountPath="/api" headers={activeStorageHeaders}>
      <HomeNavigator />
    </ActiveStorageProvider>
  );
};
