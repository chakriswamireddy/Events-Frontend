# Events Application Frontend

This repository contains the frontend codebase for the Events Application, designed to manage and interact with events efficiently. The application is built using modern React practices, leverages ShadCN UI components for consistent styling, and integrates state management using Zustand.

---

## Folder Structure

The project structure is organized as follows:

```
assets/           # Static files such as images and fonts
components/       # ShadCN UI components for the application
hooks/          # Custom hooks for logic abstraction
mycomponents/   # Specific components tailored for unique functionalities
shared/         # Shared components used across the app
zustand/          # State management setup using Zustand
```

---

## Features

### 1. **Modern Design with ShadCN UI**

- Components in the application are primarily based on [ShadCN UI](https://ui.shadcn.dev/), ensuring a sleek, accessible, and consistent user experience.

### 2. **Dynamic Event Management**

- Users can explore events, view details, and interact with notifications seamlessly.

### 3. **Global State Management with Zustand**

- Simplified and efficient state management using Zustand for managing global app state.

### 4. **Performance Optimization**

- Lazy loading, memoization, and optimized component rendering ensure high performance.

### 5. **Scalable Folder Structure**

- A modular and maintainable folder structure designed to accommodate future feature expansion.

---

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** (v16 or later)
- **npm** or **yarn**
- Backend API running (refer to [Events Application Backend](https://github.com/your-backend-repo-link))

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-frontend-repo-link.git
   cd your-frontend-repo
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```env
   REACT_APP_API_URL=<Backend API URL>
   REACT_APP_NOVU_API_KEY=<Novu API Key>
   ```

4. Start the development server:

   ```bash
   npm start
   # or
   yarn start
   ```

---

## Key Dependencies

- **React.js**: JavaScript library for building user interfaces
- **ShadCN UI**: For building accessible and visually appealing components
- **Zustand**: Lightweight state management solution
- **Axios**: Promise-based HTTP client for API calls

---

## Available Scripts

### `npm start`

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm test`

Launches the test runner in interactive watch mode.

---

## Contribution Guidelines

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature description"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Create a pull request.

---

## Acknowledgments

- **ShadCN UI**: For providing a rich set of reusable components.
- **Zustand**: For simplifying state management.
- Special thanks to all contributors who made this project possible.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

For any inquiries or support, please reach out to:

- **Name**: Chakradhar Swamireddy
- **Email**: [iamthechakri@gmail.com](mailto\:iamthechakri@gmail.com)

