# Angular Budget Expense Application

## Description
Angular Budget Expense Application is a personal project designed to help users manage budgets, track finances, 
and improve financial organization.
The project is built using **Angular, NgRx, TypeScript, and Tailwind CSS**.

The frontend interacts with a custom-built backend to make API calls. You can find the backend repository here: [BudgetExpenseApplication Backend](https://github.com/SofijaVvv/BudgetExpenseApplication).

## Technologies

- Angular
- NgRx
- TypeScript
- Tailwind CSS

## Setup

### Docker Build
To run the application using Docker, navigate to the project folder and execute the following commands:
- Build the Docker image
```sh
docker build -t angular-budget-app .
```
- Run the container
```sh
docker run -p 4200:4200 angular-budget-app
```
> **Note:** Ensure that the backend is running separately before starting the frontend.

### Native Build
For a local development setup, install dependencies and build the project:

```sh
npm install
npm run build
```
