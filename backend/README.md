## Development Process

### 1. Main Branches:
- **`main`**: This branch contains production-ready code. Direct merges to `main` are **not allowed** without prior code review and approval.
- **`develop`**: This is the continuous integration branch where all feature branches are merged. All new features should branch off from `develop`.

### 2. Feature Branches:
- **Feature branches** should be created from `develop` and follow the naming convention `feature/<description>`. Example:
  
```
bash
git checkout develop
git checkout -b feature/add-user-auth
```

Once the feature is complete, create a pull request (PR) to merge the feature branch back into develop. The code will be reviewed before merging.

### 3. Merge process:
Merging to `main` must go through a pull request process from `develop`. No direct merges to main are allowed. Only after code review and approval can the code be merged into main.

Example steps:

```
git checkout develop
git merge feature/add-user-auth
git push origin develop
```

## Screaming Architecture Overview

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
│   │   ├── name.entity.ts
│   ├── infrastructure/
│   │   ├── name.controller.ts
```