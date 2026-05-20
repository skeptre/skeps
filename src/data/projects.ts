export type Project = {
  title: string;
  type: string;
  paragraphs: string[];
  bullets?: string[];
  stack: string[];
  github?: string;
  demo?: string;
};

export const PROJECTS: Project[] = [
  {
    title: "Activity Tracker — Mobile",
    type: "mobile / frontend",
    paragraphs: [
      "Built a cross-platform mobile fitness tracking application using React Native and Expo focused on step monitoring, activity management, and real-time fitness analytics. The application integrates device pedometer sensors to track daily steps, estimate calories burned, distance travelled, and activity duration, while persisting user data locally using AsyncStorage.",
      "Implemented authentication flows with login, registration, and session handling connected to a backend API. Designed a modular frontend architecture using feature-based structure, reusable form components, context providers, MobX state management, and service-layer abstractions for API communication and activity tracking.",
      "Developed real-time step tracking with background-aware lifecycle handling, weekly activity summaries, average step calculations, and historical progress visualisation. The project also includes activity CRUD functionality, responsive mobile navigation, form validation, and TypeScript-based type safety throughout the application.",
    ],
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "MobX",
      "React Navigation",
      "Axios",
      "AsyncStorage",
      "Expo Sensors",
      "React Hook Form",
    ],
    github: "https://github.com/skeptre/activity-tracker-frontend",
  },
  {
    title: "Activity Tracker — API",
    type: "backend / api",
    paragraphs: [
      "Built a RESTful fitness and activity tracking backend API using Express.js and SQLite, focused on managing workouts, weight tracking, daily goals, and user profile data.",
      "The project implements a structured backend architecture with separated routes, controllers, models, authentication middleware, and API documentation. Features include secure user authentication, workout and weight CRUD operations, daily goal and progress tracking, request validation using Joi, and interactive API documentation via Swagger UI.",
    ],
    bullets: [
      "Designed and implemented REST API endpoints for workouts, weight history, profiles, and user management",
      "Built server-side validation and error handling for incoming requests",
      "Integrated authentication middleware for protected routes and user-specific data access",
      "Structured the backend using MVC-style separation of concerns",
      "Implemented persistent data storage with SQLite",
      "Added API logging, CORS support, and JSON request handling",
      "Created interactive API documentation accessible through /docs",
      "Added database reset/wipe utilities and development tooling with Nodemon and Mocha",
    ],
    stack: [
      "Node.js",
      "Express.js",
      "SQLite3",
      "Joi",
      "Swagger/OpenAPI",
      "Mocha",
      "Morgan",
      "CORS",
    ],
    github: "https://github.com/skeptre/activity-tracker-backend",
  },
];
