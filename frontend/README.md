## Frontend Development Process

To configure correctly the frontend, first of all, you have to move to "frontend" directory and the install all dependecies in package.json:

```bash
cd frontend/
npm install
```

Then you have to remove the ".example" in the ".env.example"; here is a single environment variable, the backend api url, you must change it for the correct url backend.

Once all of this has been set up correctly, you can run this command on the terminal:

```bash
npm run dev
```

### Project Structure

The project will be organized as follows:

```
/src
│
├── /assets
├── /context
├── /hooks
├── /interfaces
├── /services
├── /views
│   ├── ModuleName/
├────── /components
├────── Index.tsx
```