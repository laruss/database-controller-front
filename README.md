# React Database Management Frontend

This project is a React-based frontend for managing objects in any database using a backend that follows RESTful API conventions. 
The repository contains purely frontend code, designed to provide a user-friendly interface for interacting with your database. 
You can easily adapt this project to work with your preferred backend and database technologies.

## Version

Current version: 0.2.0

## Features

- Create, read, update, and delete (CRUD) operations for objects in the database
- Responsive and user-friendly interface
- Easily customizable to work with your preferred backend and database technologies

## TODO

- [ ] Search and filter functionality
- [ ] Change logo and favicon
- [ ] Dropdown search for foreign key fields
- [ ] Nested objects view in modal (e.g. for one-to-many relationships)
- [ ] Dictionary view for many-to-many relationships
- [ ] Possibility to delete nested objects
- [ ] Migrations support

## Getting Started

To get started with this project, follow the steps below:

### Prerequisites

- Node.js (>= 14.x.x) and npm (>= 6.x.x)
- MongoDB (>= 4.x.x)
- Backend from [main controller repo](https://github.com/laruss/database-controller-main)

### Installation

0. Make sure you have the prerequisites installed and running.

1. Clone the repository:

```bash
git clone https://github.com/laruss/database-controller-front.git frontend-controller
````

2. Install the required dependencies:

```bash
npm i
```

### Usage

1. Start the development server:

```bash
npm start
```

This will open the application in your default web browser.

2. To build the application for production, run:

```bash
npm run build
```

This will create an optimized build in the `build` folder.

## Customization

To customize this project for your specific needs, you will need to update the following files and components:

- `src/app/api`: Update the API calls in this file to match your backend API structure and endpoints.
- `src/components`: Modify the components in this folder to reflect the data model of your database objects and the desired user interface.
