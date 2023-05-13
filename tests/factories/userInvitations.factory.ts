import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';
import { UserInvitation } from '../../src/features/users/invite/invite.types';

export const userInvitationFactory = Factory.Sync.makeFactory<UserInvitation>({
  __typename: 'User',
  id: Factory.each((i) => i + 1),
  email: faker.internet.email(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  dateOfEntry: faker.date.recent().toISOString(),
  phoneNumber: faker.phone.number('##########'),
  user: null,
  // state
});
