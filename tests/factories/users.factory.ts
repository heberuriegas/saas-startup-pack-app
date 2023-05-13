import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';
import { Guest } from '../../src/features/sessions/screens/RoomScreen/RoomScreen.types';
import { User } from '../../src/features/user';
import {
  AttachmentsFactory,
  UploadFilesFactory,
  attachmentsFactory,
  uploadFilesFactory,
} from './attachments.factory';

export const usersFactory = Factory.Sync.makeFactory<User>({
  __typename: 'User',
  id: Factory.each((i) => i + 1),
  username: null,
  name: faker.name.fullName(),
  email: faker.internet.email(),
  currentPasswordRequired: true,
  phoneNumber: faker.phone.number('##########'),
  avatar: uploadFilesFactory.build() as UploadFilesFactory,
  role: 'customer',
  business: {
    id: 1,
    name: faker.company.name(),
    industry: 'Commercial & Professional Services',
    numberOfEmployees: '> 300',
    usersCount: 1,
    logo: uploadFilesFactory.build() as UploadFilesFactory,
  },
  // TODO: Why offices isn't count
  // offices: [
  //   {
  //     id: 1,
  //     country: 'México',
  //     state: 'Nuevo León',
  //     city: 'Monterrey',
  //     address: 'Unknown',
  //     zipCode: '14141',
  //     coordinates: '-100,25',
  //   },
  // ],
});

export const guestFactory = Factory.Sync.makeFactory<Guest>({
  id: Factory.each((i) => i + 1),
  name: faker.name.fullName(),
  email: faker.internet.email(),
  avatar: attachmentsFactory.build() as AttachmentsFactory,
  dateOfEntry: faker.date.recent().toISOString(),
  jobPosition: {
    name: faker.name.jobType(),
    jobDepartment: {
      name: faker.name.jobArea(),
    },
  },
  __typename: 'users',
});
