import Task from './tasks.model';

//GraphQL type definitions.

export const taskTypeDefs = `

  type Task { 
    taskID: String! 
    taskName: String!
    completed: Boolean
    timestamp: String
  }

  input TaskFilterInput {
    limit: Int
  }

  extend type Query {
    tasks(filter: TaskFilterInput): [Task]
    task(id: String!): Task
  }

  input TaskInput {
    taskID: String
    taskName: String
    completed: Boolean
    timestamp: String
  }

  extend type Mutation {
    addTask(input: TaskInput!): Task
    editTask(id: String!, input: TaskInput!): Task
    deleteTask(id: String!): Task
  }
`;

export const taskResolvers = {
  Query: {
    tasks: async (_, { filter = {} }) => {
      const tasks: any[] = await Task.find({}, null, filter);
      return tasks.map(task => task.toGraph());
    },
    task: async (_, { id }) => {
      const task: any = await Task.findById(id);
      return task.toGraph();
    },
  },
  Mutation: {
    addTask: async (_, { input }) => {
      const task: any = await Task.create(input);
      return task.toGraph();
    },
    editTask: async (_, { id, input }) => {
      const task: any = await Task.findByIdAndUpdate(id, input);
      return task.toGraph();
    },
    deleteTask: async (_, { id }) => {
      const task: any = await Task.findByIdAndRemove(id);
      return task ? task.toGraph() : null;
    },
  },
};