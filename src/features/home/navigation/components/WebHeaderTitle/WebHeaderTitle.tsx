import { HeaderTitleProps } from '@react-navigation/elements';
import { HStack, Image, Pressable, useColorModeValue } from 'native-base';
import React, { useContext } from 'react';
import { SideMenuContext } from '../../context/SidemenuContext';
import { Logo } from '../Logo';
import menu_dark from './assets/menu_dark.png';
import menu_light from './assets/menu_light.png';

interface WebHeaderTitleProps extends HeaderTitleProps {
  hideMenuIcon?: boolean;
}

export const WebHeaderTitle: React.FC<WebHeaderTitleProps> = ({ hideMenuIcon }) => {
  const { toggleSideMenu } = useContext(SideMenuContext);
  const menuIconValue = useColorModeValue('assets/menu_light.png', 'assets/menu_dark.png');
  const menuIcon = useColorModeValue(menu_light, menu_dark);

  return (
    <HStack space="3" alignItems="center">
      {/* Menu icon */}
      {!hideMenuIcon && (
        <Pressable onPress={toggleSideMenu}>
          <Image
            key={menuIconValue}
            h="3"
            w="18"
            alt="Menu"
            resizeMode="contain"
            source={menuIcon}
          />
        </Pressable>
      )}
      {/* Logo image */}
      <Logo />
    </HStack>
  );
};
