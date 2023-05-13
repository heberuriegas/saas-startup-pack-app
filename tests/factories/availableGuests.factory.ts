import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';
import { FindAvailableGuestsQuery } from '../../src/generated/graphql';
import { AttachmentsFactory, attachmentsFactory } from './attachments.factory';

export const availableGuestsFactory = Factory.Sync.makeFactory<
  FindAvailableGuestsQuery['availableGuests'][0]
>({
  id: Factory.each((i) => i + 1),
  name: Factory.each(() => faker.name.fullName()),
  avatar: attachmentsFactory.build() as AttachmentsFactory,
  jobPosition: {
    name: faker.name.jobTitle(),
    jobDepartment: {
      name: faker.name.jobArea(),
    },
  },
  dateOfEntry: faker.date.recent().toISOString(),
});
