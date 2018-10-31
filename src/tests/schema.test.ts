import {
    makeExecutableSchema,
    addMockFunctionsToSchema,
    mockServer
  } from 'graphql-tools';
import { graphql } from 'graphql';
import { taskTypeDefs } from '../common/tasks/tasks.schema';

const queryTest = {
    id: 'Query Test',
    query: `
    query {
        tasks {
            taskName
        }
    }
    `,
    variables: { },
    context: { },
    expected: { data: { tasks: [{ taskName: 'This is a test case'}]}}
};

describe('Schema', () => {
    const cases = [ queryTest ];

    const mockSchema = makeExecutableSchema({ typeDefs: taskTypeDefs });

    addMockFunctionsToSchema({
        schema: mockSchema,
        mocks : {
            taskID: () => '1234',
            task: () => 'This is a test case',
            completed: () => false,
            timestamp: () => '10-10-10:10:10'
        }
    });

    test('has valid type definitions', async () => {
    expect(async () => {
        const MockServer = mockServer(typeDefs: taskTypeDefs);

        await MockServer.query(`{ __schema { types { name } } }`);
    }).not.toThrow();
    });

    cases.forEach(obj => {
    const { id, query, variables, context: ctx, expected } = obj;

    test(`query: ${id}`, async () => {
        return await expect(
        graphql(mockSchema, query, null, { ctx }, variables)
        ).resolves.toEqual(expected);
    });
    });

});