import { AspectRatio, Image } from 'native-base';
import React from 'react';

interface LogoProps {}

export const Logo: React.FC<LogoProps> = () => {
  return (
    <>
      {
        <AspectRatio ratio={150 / 60} height={16}>
          <Image
            resizeMode="contain"
            source={require('../../../../../../assets/logo.png')}
            alt={'Saas startup pack'}
          />
        </AspectRatio>

        /* <Image
        key={useColorModeValue('logo_light', 'logo_dark')}
        h="10"
        w="56"
        alt="NativeBase Startup+"
        resizeMode="contain"
        source={useColorModeValue(logo_light, logo_dark)}
      /> */
      }
    </>
  );
};
