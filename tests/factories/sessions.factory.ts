import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';
import { SessionGuest } from '../../src/features/sessions/screens/RoomScreen/RoomScreen.types';
import { Session } from '../../src/features/sessions/sessions.types';
import { sessionTypesFactory } from './sessionTypes.factory';
import { guestFactory } from './users.factory';

export const sessionsGuestsFactory = Factory.Sync.makeFactory<SessionGuest>({
  isManager: faker.datatype.boolean(),
  meetingToken: faker.random.alphaNumeric(),
  guest: guestFactory.build(),
  __typename: 'sessions_guests',
});

export const sessionsFactoryBase = Factory.Sync.makeFactory<Session>({
  uuid: faker.datatype.uuid(),
  name: faker.company.name(),
  description: faker.random.words(),
  startAt: faker.date.recent().toISOString(),
  endAt: faker.date.recent().toISOString(),
  sessionType: sessionTypesFactory.build(),
  isPrivate: faker.datatype.boolean(),
  showGuestList: faker.datatype.boolean(),
  allowGuestInvite: faker.datatype.boolean(),
  state: faker.helpers.arrayElement(['waiting', 'started', 'canceled']),
  stateDetails: null,
  externalId: faker.datatype.uuid(),
  owner: {
    id: faker.datatype.number(),
    name: faker.name.fullName(),
    email: faker.internet.email(),
  },
  sessionsGuests: sessionsGuestsFactory.buildList(5),
  userInvitations: [],
  __typename: 'sessions',
});

export const sessionsFactory = sessionsFactoryBase.withDerivation1(
  ['state'],
  'stateDetails',
  (state) => {
    switch (state) {
      case 'waiting':
        return {
          id: 1,
          name: 'waiting',
          humanName: 'Waiting',
          possibleEvents: [
            {
              type: 'primary',
              name: 'accept',
              label: 'Accept',
              __typename: 'AasmPossibleEvents',
            },
            {
              type: 'primary',
              name: 'cancel',
              label: 'Cancel',
              __typename: 'AasmPossibleEvents',
            },
          ],
          __typename: 'AasmField',
        };
      case 'canceled':
        return {
          id: 1,
          name: 'canceled',
          humanName: 'Canceled',
          possibleEvents: [],
          __typename: 'AasmField',
        };
      case 'started':
        return {
          id: 1,
          name: 'started',
          humanName: 'Started',
          possibleEvents: [],
          __typename: 'AasmField',
        };
      case 'finished':
        return {
          id: 1,
          name: 'finished',
          humanName: 'Finished',
          possibleEvents: [],
          __typename: 'AasmField',
        };
    }
  }
);
