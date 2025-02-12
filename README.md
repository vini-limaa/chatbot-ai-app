# Chat App

This is a chat application built with Next.js. The project includes a database system, unit tests, and a dashboard to view all messages. The chatbot is integrated with Google Gemini AI and responds to messages like a real AI chatbot. This chat only loads the last 50 messages logged in the system.

## Prerequisites

- [Node.js](https://nodejs.org/) (we recommend the LTS version)
- [Yarn](https://yarnpkg.com/) as package manager

## Installation

1. **Install as dependencies:**

```bash
yarn installation
```

## Database

2. **Database Configuration:**

Run the command below to install and configure the prisma database system:

```bash
yarn configuration
```

## How to run the application

1. **Starting the application:**

To run the application in development mode, run:

```bash
yarn developer
```

## Tests

1. **Running unit tests:**

To run the project's unit tests, use:

```bash
yarn test
```

## Dashboard

1. **Starting Dashboard**

The dashboard was not built, but a studio resource from the Prisma database system was reused.

To open the panel that lists all messages, run:

```bash
yarn open panel
```

## Notes

1. **Execution Order:**

Be sure to run the command to check the yarn to install all dependencies before running any other command.

2. **Database:**

The wire setup command is responsible for installing and configuring the database system used by the project.

3. **Development:**

Use 'yarn dev' to start the Next.js development server, but if you want to simulate a production environment, run the 'yarn build' command and 'yarn start'

## Possible improvements

1. Add option to have more than one chat
2. Add 'load more' functionality to load more old messages
3. Login to choose the name of the user who will send the message
4. Filter only messages from the logged in user
5. Fallback while the chatbot is generating a response
