## Backend Development Process

To configure correctly the backend, first of all, you have to move to "backend" directory and the install all dependecies in package.json:

```bash
cd backend/
npm install
```

Then you have to remove the ".example" in the ".env.example"; here are all the environment variables to configure the project. You must put your correct data, such as API keys, API secrets, etc.

Once all of this has been set up correctly, you can run this command on the terminal:

```bash
npm run dev
```

### Screaming Architecture Overview

This project follows the **Screaming Architecture** pattern, an approach where the structure and design of the application make it immediately clear what the system is about. The goal is for the architecture to reflect the core business or domain, rather than focusing on technical aspects like frameworks, databases, or infrastructure.

### Key Concepts

- **Domain-Centric**: The project structure will be organized around the core business domains (e.g., Orders, Products, Customers, Payments) rather than technical components (e.g., Controllers, Services, Repositories). Each domain should have its own folder containing all relevant components such as use cases, services, entities, and repositories.
  
- **Use Cases Drive the Architecture**: Each domain will include clearly defined use cases (also known as "application services" or "interactors") which reflect specific actions the system must perform. These use cases should be the driving force behind the architecture and should contain the core business logic.

- **Separation of Concerns**: Every domain encapsulates its own logic, including data handling (repositories) and business rules (use cases). This ensures a high level of modularity and separation of concerns.

### Project Structure

The project will be organized as follows:

```
/src
│
├── /Name
│   ├── application/
│   │   ├── module.service.ts
│   ├── domain/
│   │   ├── dto/
│   │   ├── interfaces/
│   ├── infrastructure/
│   │   ├── name.controller.ts
```