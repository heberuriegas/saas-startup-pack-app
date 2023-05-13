import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';

export const businessesFactory = Factory.Sync.makeFactory({
  id: Factory.each((i) => i + 1),
  name: faker.company.name(),
  industry: faker.company.bsNoun(),
  numberOfEmployees: '> 300',
  usersCount: faker.datatype.number(),
  logo: null,
  /*
  logo: {
    url: 'http://192.168.1.195:3001/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBUUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2eb0bb9a7c47aa54db53d3f27b538c63c4d55e79/attachment.jpg',
    mediumUrl:
      'http://192.168.1.195:3001/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBUUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2eb0bb9a7c47aa54db53d3f27b538c63c4d55e79/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVFMMEFXa0M5QUU9IiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--f48542e2d8a6c398e4b318a3335898cec162fa2c/attachment.jpg',
    thumbnailUrl:
      'http://192.168.1.195:3001/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBUUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2eb0bb9a7c47aa54db53d3f27b538c63c4d55e79/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJY0c1bkJqb0dSVlE2RkhKbGMybDZaVjkwYjE5c2FXMXBkRnNIYVFHV2FVRT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--c17d900b966124f372c935b34f03639fb907127a/attachment.jpg',
  },
  */
});
