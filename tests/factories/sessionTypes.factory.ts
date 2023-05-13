import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';
import { SessionType } from '../../src/features/sessions/sessions.types';

export const sessionTypesFactory = Factory.Sync.makeFactory<SessionType>({
  code: faker.datatype.uuid(),
  name: faker.company.name(),
  description: faker.random.words(),
  banner: {
    url: faker.image.abstract(1024, 1024, true),
    thumbnailUrl: faker.image.abstract(500, 300, true),
  },
  demo: faker.internet.url(),
});
