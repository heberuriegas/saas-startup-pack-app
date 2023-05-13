import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { decamelizeKeys } from 'humps';
import { UpsertDeviceMutationVariables } from '../../../generated/graphql';
import { upsertDevice } from '../../user/user.api';

interface DeviceInfo {
  brand: string | null;
  manufacturer: string | null;
  deviceModelName: string | null;
  deviceModelId: string | null;
  deviceYearClass: number | null;
  totalMemory: number | null;
  osName: string | null;
  osVersion: string | null;
  platformApiLevel: number | null;
  deviceName: string | null;
  exponentPushToken: string | null;
}

type GetDeviceInfo = () => Promise<DeviceInfo | null>;

const getDeviceInfo: GetDeviceInfo = async () => {
  if (Device.isDevice) {
    const exponentPushToken = (
      await Notifications.getExpoPushTokenAsync({
        experienceId: 'push-token',
      })
    ).data;

    const deviceInfo = {
      brand: Device.brand,
      manufacturer: Device.manufacturer,
      deviceModelName: Device.modelName,
      deviceModelId: Device.modelId,
      deviceYearClass: Device.deviceYearClass,
      totalMemory: (Device.totalMemory || 0) / Math.pow(1024, 3),
      osName: Device.osName,
      osVersion: Device.osVersion,
      platformApiLevel: Device.platformApiLevel,
      deviceName: Device.deviceName,
      exponentPushToken,
    };

    return deviceInfo;
  }

  return null;
};

const getDevice = async (userId: number) => {
  const deviceInfo = decamelizeKeys(await getDeviceInfo());
  const device: UpsertDeviceMutationVariables['device'] = {
    ...deviceInfo,
    user_id: userId,
    created_at: new Date().toString(),
    updated_at: new Date().toString(),
  };
  return device;
};

export const setDevice = async (userId: number) => {
  upsertDevice({ device: { ...(await getDevice(userId)), deleted_at: null } });
};

export const unsetDevice = async (userId: number) => {
  upsertDevice({ device: { ...(await getDevice(userId)), deleted_at: new Date().toString() } });
};
