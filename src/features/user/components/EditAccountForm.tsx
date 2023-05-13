import { Entypo } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Icon, IconButton, Spinner, Stack, VStack } from 'native-base';
import { IVStackProps } from 'native-base/lib/typescript/components/primitives/Stack/VStack';
import React, { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { FormInput } from '../../../components';
import { setErrors } from '../../../helpers/forms';
import { Sentry } from '../../../helpers/sentry';
import { useThemedToast } from '../../../hooks/useThemedToast';
import { ProfileAvatar } from '../../auth/components';
import { AuthContext } from '../../auth/context/AuthContext';
import { UpdateUserParams } from '../user.api';

interface EditAccountFormProps extends IVStackProps {
  compact?: boolean;
  actionButtonName?: string;
  afterSubmit?: () => void;
}

export const EditAccountForm: React.FC<EditAccountFormProps> = ({
  compact,
  actionButtonName,
  afterSubmit,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showCurrentPass, setShowCurrentPass] = useState<boolean>(false);
  const { currentUser, updateUser } = useContext(AuthContext);
  const toast = useThemedToast();

  const validationSchema = Yup.object(
    Object.assign(
      {
        name: Yup.string().min(3).max(50),
        email: Yup.string().email(),
      },
      !currentUser?.phoneNumber
        ? {
            phone_number: Yup.string().phone().required('Required'),
          }
        : null
    )
  );

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<UpdateUserParams>({
    defaultValues: {
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phone_number: currentUser?.phoneNumber || '',
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (values: UpdateUserParams) => {
    setIsLoading(true);
    try {
      await updateUser(values);
      toast.show({ description: 'Your information has been sucessfully updated' });
      if (afterSubmit) afterSubmit();
    } catch (err: any) {
      Sentry.captureMessage(err);
      const dataErrors = err?.response?.data?.errors;
      if (dataErrors) {
        setErrors<UpdateUserParams>(setError, dataErrors);
      } else {
        console.error(err.message);
        toast.warning({ description: 'Something went wrong uploading the attachment' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return currentUser ? (
    <VStack {...props}>
      <ProfileAvatar
        containerProps={{
          mb: 4,
        }}
        size="xl"
        allowEdit
        user={currentUser}
      />
      <Controller
        name="name"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInput
            label="Name"
            errorMessage={errors.name?.message}
            mb={4}
            inputProps={{
              onChangeText: onChange,
              onBlur,
              defaultValue: value ?? undefined,
            }}
          />
        )}
      />
      <Controller
        name="phone_number"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInput
            label="Phone Number"
            editable={!(!!currentUser.phoneNumber && !currentUser.email)}
            errorMessage={errors.phone_number?.message}
            mb={4}
            inputProps={{
              onChangeText: onChange,
              onBlur,
              defaultValue: value,
            }}
          />
        )}
      />
      {!compact && (
        <Stack
          direction={{
            base: 'column',
            sm: 'row',
          }}
          space={{
            base: 0,
            sm: 4,
          }}
          key="hstack"
          w="full"
          flexWrap="wrap">
          <Controller
            key="email"
            name="email"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                label="Email"
                errorMessage={errors.email?.message}
                mb={4}
                flexGrow={1}
                w={{ base: 'full', md: 'auto' }}
                inputProps={{
                  onChangeText: onChange,
                  onBlur,
                  defaultValue: value ?? undefined,
                }}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                label="Password"
                key="password"
                errorMessage={errors.password?.message}
                mb={4}
                flexGrow={1}
                w={{ base: 'full', md: 'auto' }}
                inputProps={{
                  onChangeText: onChange,
                  onBlur,
                  defaultValue: value,
                  type: showPass ? undefined : 'password',
                  InputRightElement: (
                    <IconButton
                      variant="unstyled"
                      py={0}
                      my={0}
                      icon={
                        <Icon
                          size="4"
                          color="coolGray.400"
                          as={Entypo}
                          name={showPass ? 'eye-with-line' : 'eye'}
                        />
                      }
                      onPress={() => {
                        setShowPass((s) => !s);
                      }}
                    />
                  ),
                }}
              />
            )}
          />
        </Stack>
      )}
      {currentUser.currentPasswordRequired && (
        <Controller
          name="current_password"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              label="Current password"
              key="current_password"
              errorMessage={errors.current_password?.message}
              mb={4}
              flexGrow={1}
              inputProps={{
                onChangeText: onChange,
                onBlur,
                defaultValue: value,
                type: showCurrentPass ? undefined : 'password',
                InputRightElement: (
                  <IconButton
                    variant="unstyled"
                    py={0}
                    my={0}
                    icon={
                      <Icon
                        size="4"
                        color="coolGray.400"
                        as={Entypo}
                        name={showCurrentPass ? 'eye-with-line' : 'eye'}
                      />
                    }
                    onPress={() => {
                      setShowCurrentPass((s) => !s);
                    }}
                  />
                ),
              }}
            />
          )}
        />
      )}
      <Button
        marginY={4}
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
        leftIcon={isLoading ? <Spinner /> : undefined}>
        {actionButtonName ? actionButtonName : 'Update'}
      </Button>
    </VStack>
  ) : (
    <></>
  );
};
