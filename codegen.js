module.exports = {
  schema: [
    {
      'http://localhost:8085/v1/graphql': {
        headers: {
          'X-Hasura-Admin-Secret': 'hasura',
        },
      },
    },
  ],
  documents: ['./src/**/*.graphql'],
  overwrite: true,
  generates: {
    './src/generated/graphql.tsx': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        skipTypename: true,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        enumsAsConst: true,
        scalars: {
          numeric: 'number',
          smallint: 'number',
          ISO8601DateTime: 'string',
          bigint: 'number',
          date: 'string',
          float8: 'number',
          geography: 'string',
          geometry: 'string',
          time: 'string',
          timestamp: 'string',
          timestamptz: 'string',
          jsonb: 'any',
        },
      },
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};
