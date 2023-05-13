import { Box, Heading, Link } from 'native-base';
import React from 'react';
import { useI18n } from '../../hooks/useI18n';

export const NotFoundScreen = () => {
  const i18n = useI18n();

  return (
    <Box w="full" h="full" alignItems="center" justifyContent="center">
      <Heading my={2}>{i18n.t('app.screens.not_found.title')}</Heading>
      <Link href="/">
        <Box
          px="3"
          py="2"
          bg="primary.400"
          rounded="sm"
          _text={{
            color: 'white',
            fontWeight: 'medium',
          }}>
          {i18n.t('app.screens.not_found.action')}
        </Box>
      </Link>
    </Box>
  );
};
