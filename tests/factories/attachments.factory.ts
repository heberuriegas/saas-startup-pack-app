import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';

export interface AttachmentsFactory {
  url: string;
  thumbnailUrl: string;
  smallUrl: string;
  mediumUrl: string;
  __typename?: any;
}

export const attachmentsFactory = Factory.Sync.makeFactory({
  url: faker.internet.url(),
  thumbnailUrl: faker.internet.url(),
  smallUrl: faker.internet.url(),
  mediumUrl: faker.internet.url(),
  __typename: 'Attachment',
});

export interface UploadFilesFactory {
  url: string;
  thumbnailUrl: string;
  smallUrl: string;
  mediumUrl: string;
  __typename?: any;
}

export const uploadFilesFactory = attachmentsFactory.extend({
  __typename: 'UploadFile',
});
