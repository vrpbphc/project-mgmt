# Project Management App

## About

This is a web application for personal project and task management loosely inspired by Jira.

Users can create tasks under different projects, mark status, make comments, and keep track of work by logging time.

## Tools used

1. Backend: Node, Express, Sequelize
2. Database: PostgreSQL
3. Frontend: React

## Directory structure

    .
    ├── client
    |   ├── src
    |   |   ├── components
    |   |   ├── fonts
    |   |   ├── scenes
    |   |   ├── styles
    |   |   ├── App.js
    |   |   ├── index.js
    |   |   └── ...
    |   └── ...
    ├── server
    |   ├── config
    |   |   └── database.js
    |   ├── controllers
    |   ├── middleware
    |   |   └── auth.js
    |   ├── models
    |   ├── routes
    |   ├── .env
    |   ├── index.js
    |   └── ...
    └── README.js