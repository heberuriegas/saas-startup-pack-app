import { MeQuery } from '../../../generated/graphql';

export interface User extends NonNullable<MeQuery['me']> {
  __typename?: any;
}
