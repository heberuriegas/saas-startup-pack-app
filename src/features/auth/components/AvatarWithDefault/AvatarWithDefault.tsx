import { Avatar, IAvatarProps, IImageProps, Image } from 'native-base';
import React from 'react';
import { getSizes } from '../Avatar.helpers';

interface IAvatarWithDefaultProps extends IAvatarProps {
  defaultImageProps?: IImageProps;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const AvatarWithDefault = ({
  source,
  defaultImageProps,
  size = 'sm',
  ...props
}: IAvatarWithDefaultProps) => (
  <Avatar size={getSizes(size).avatar} source={source} {...props}>
    <Image
      size={getSizes(size).image}
      source={require('./assets/image-person.png')}
      alt="profile"
      {...defaultImageProps}
    />
  </Avatar>
);
