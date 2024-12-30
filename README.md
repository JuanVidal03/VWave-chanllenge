# VWave Challenge
The goal of this challenge is to create a simple proof-of-concept full-stack application that enables users to generate shipping labels within Germany. To achieve this, we will interact with the DHL Parcel DE Shipping API, which allows shipping label creation in Germany.

Here is a short video showing app functionality: [See video](https://vento.so/view/5874dc2b-f5c9-4cca-bf5f-ce28962c7e21?utm_medium=share)

## Instalation guide
To ensure that everythong works good, you must already have installed nodejs (v.20), then in your terminal clone this repo:

```bash
git clone https://github.com/JuanVidal03/VWave-chanllenge.git
```

To follow the next indication, you can see the readme-files in the frontend and backend directories. The installation guide for each one is in each directory.

## Development Process

### 1. Main Branches:
- **`main`**: This branch contains production-ready code. Direct merges to `main` are **not allowed** without prior code review and approval.
- **`develop`**: This is the continuous integration branch where all feature branches are merged. All new features should branch off from `develop`.

### 2. Feature Branches:
- **Feature branches** should be created from `develop` and follow the naming convention `feature/<description>`. Example:
  
``` bash
git checkout develop
git checkout -b feature/add-user-auth
```

Once the feature is complete, create a pull request (PR) to merge the feature branch back into develop. The code will be reviewed before merging.