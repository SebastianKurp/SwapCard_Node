# **SwapCard Challenge Part 1 - Node**

## NPM Modules and Technologies Used
- mongoose (For schema validation)
- apollo-server (For setting up the graphql server)
- dotenv (For saving the mlab uri without hardcoding it)
- graphql 
- lodash(For merging the taskResolvers and removing that type error)
- typescript (For type checking)
- mlab (For providing/hosting a noSQL DB)

## Install and Build For Production

Clone repo to your local machine

```git clone https://github.com/SebastianKurp/SwapCard_Node.git```

Get the .env file and place it in the root of the project

```SwapCard_Node\```

Install the dependencies
```npm install```

Run the server in dev mode

```npm run dev```

To build for production, you will need to compile the project first since it's typescript

```npm run compile && npm run start ```                                          

## Complete List of Queries and Mutations to use with GraphQL Playground

```graphql
query getAllTasks{ ##Query Tasks
  tasks {
    taskID
    taskName
    completed
    timestamp
  }
}

query GetTaskFromID{ ##returns specific task that matches the ID
  task(id: "5bd760e9e7179a1b53ff5504" ){ ##enter id here
    taskID
    taskName
    completed
    timestamp
  }
}

mutation AddTask( ##Add a task
  $taskID: String,
  $taskname: String,
  $completed: Boolean,
  $timestamp: String
) {
  addTask(input: {
    taskID: $taskID,
    taskName: $taskname,
    completed: $completed,
    timestamp: $timestamp
  }) {
    taskID
    taskName
    completed
    timestamp
  }
}

mutation EditTask( ##Uncheck and check the task
  $completed: Boolean,
  $timestamp: String
) {
  editTask(
    id: "5bd760e9e7179a1b53ff5504", ##enter id here
    input: {
    	completed: $completed,
    	timestamp: $timestamp
    }) {
    completed
  }
}

mutation DeleteTask ##Deletes Task
{
  deleteTask(id: "5bd760e9e7179a1b53ff5504") { ##enter id here
    taskName
  }
}
```

## List of Tests

- 

## References and Guides Used

- https://medium.freecodecamp.org/graphql-zero-to-production-a7c4f786a57b (Used for setting up the environment)

- https://hackernoon.com/extensive-graphql-testing-57e8760f1c25 (Used for setting up the tests)