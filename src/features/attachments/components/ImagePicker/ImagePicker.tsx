import { Entypo } from '@expo/vector-icons';
import * as ExpoImagePicker from 'expo-image-picker';
import {
  Box,
  Button,
  FormControl,
  IAvatarProps,
  IBoxProps,
  Icon,
  IconButton,
  IImageProps,
  Image,
  Spinner,
  VStack,
} from 'native-base';
import { IVStackProps } from 'native-base/lib/typescript/components/primitives/Stack/VStack';
import React, { useState } from 'react';
import { ImageSourcePropType, Pressable, ViewProps } from 'react-native';
import { Sentry } from '../../../../helpers/sentry';
import { useI18n } from '../../../../hooks/useI18n';
import { useThemedToast } from '../../../../hooks/useThemedToast';

export interface ImagePickerProps extends IAvatarProps {
  containerProps?: IVStackProps;
  imageWrapperProps?: IBoxProps;
  label?: string;
  hideLabel?: boolean;
  defaultImageProps?: IImageProps;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  defaultSource?: ImageSourcePropType;
  loading?: boolean;
  onImageSelect: (props: ExpoImagePicker.ImageInfo[]) => void;
  onClearImage?: (props: boolean) => void;
}

export const ImagePicker = ({
  containerProps,
  imageWrapperProps,
  label,
  hideLabel,
  defaultImageProps,
  size = 'sm',
  defaultSource: _defaultSource,
  loading,
  onImageSelect,
  onClearImage,
}: ImagePickerProps): React.ReactElement<ViewProps> => {
  const toast = useThemedToast();
  const i18n = useI18n();
  const [defaultSource, setDefaultSource] = useState<ImageSourcePropType | undefined>(
    _defaultSource
  );
  const [images, setImages] = useState<ExpoImagePicker.ImageInfo[]>([]);

  const onUploadButtonClick = async () => {
    try {
      const permissionResult = await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        toast.warning({ description: 'Please enable access to your photos.' });
        return;
      }
      const image = await ExpoImagePicker.launchImageLibraryAsync({
        mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
      });
      if (!image.cancelled) {
        setImages([image]);
        onImageSelect([image]);
        if (onClearImage) onClearImage(false);
      }
    } catch (err: any) {
      Sentry.captureMessage(err);
      toast.error({ description: 'Something went wrong uploading the attachment' });
    }
  };

  return (
    <VStack w={150} {...containerProps} flexShrink={1}>
      {!hideLabel && (
        <FormControl.Label>{label || i18n.t('app.actions.upload.label')}</FormControl.Label>
      )}
      <Box w={150} h={150} borderWidth={1} borderColor="gray.100" {...imageWrapperProps}>
        {loading ? (
          <Box w="full" h="full" alignSelf="center" justifyContent="center">
            <Spinner />
          </Box>
        ) : (
          <>
            {images.length === 0 ? (
              <Pressable
                style={({ pressed }) => [
                  { opacity: pressed ? 0.5 : 1.0, width: '100%', height: '100%' },
                ]}
                onPress={onUploadButtonClick}>
                <Image
                  key="placeholder"
                  flex={1}
                  resizeMode="contain"
                  source={defaultSource || require('./assets/placeholder-image-square.jpg')}
                  alt="image"
                  {...defaultImageProps}
                />
              </Pressable>
            ) : (
              images.map((image, i) => (
                <Image
                  key={i}
                  flex={1}
                  resizeMode="contain"
                  source={image}
                  alt="image"
                  {...defaultImageProps}
                />
              ))
            )}
            {((images && images.length > 0) || defaultSource) && (
              <IconButton
                onPress={() => {
                  setImages([]);
                  onImageSelect([]);
                  setDefaultSource(undefined);
                  if (onClearImage) onClearImage(true);
                }}
                position="absolute"
                top={1}
                right={1}
                size="xs"
                variant="solid"
                icon={<Icon as={Entypo} name="trash" />}
              />
            )}
          </>
        )}
      </Box>
      <Button
        leftIcon={<Icon as={Entypo} name="upload" />}
        size="sm"
        my={1}
        key="loadImage"
        onPress={onUploadButtonClick}>
        {i18n.t('app.actions.upload.action')}
      </Button>
    </VStack>
  );
};
