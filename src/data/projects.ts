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
    title: "Retail & Operations Intelligence Platform",
    type: "data engineering / backend",
    paragraphs: [
      "A Python-based ELT data engineering platform simulating a multi-location retail business pipeline. The project processes raw transactional, inventory, and store data through a full medallion-style architecture (Bronze, Silver, Gold) using PostgreSQL.",
      "Built ingestion pipelines to load raw CSV datasets into PostgreSQL, followed by in-database SQL transformations for cleaning, validation, deduplication, and aggregation. Implemented retry handling, quarantine logic for failed records, idempotent upserts, and pipeline run tracking to improve reliability and observability.",
      "Developed orchestration workflows using Prefect to automate ingestion, transformation, and validation stages. Created data quality checks to detect invalid or inconsistent records before promoting datasets through the pipeline.",
      "Exposed analytics through a FastAPI REST API with endpoints for daily sales metrics, inventory health alerts, and pipeline monitoring. Containerised the stack with Docker Compose, including PostgreSQL and pgAdmin for local development and testing.",
    ],
    bullets: [
      "End-to-end data engineering workflows",
      "ELT pipeline design",
      "Medallion architecture patterns (Bronze, Silver, Gold)",
      "SQL-based data transformation and deduplication",
      "Data quality validation and quarantine logic",
      "API-driven analytics serving",
      "Workflow orchestration with Prefect",
      "Docker-based infrastructure with Docker Compose",
      "Automated testing and CI-oriented development practices",
    ],
    stack: [
      "Python",
      "PostgreSQL",
      "Prefect",
      "FastAPI",
      "Docker",
      "Docker Compose",
    ],
    github: "https://github.com/skeptre/retail-ops-platform",
  },
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
  {
    title: "LLM Benchmarking Framework for Financial Sentiment Analysis",
    type: "final year project / data analysis",
    paragraphs: [
      "Built a financial sentiment analysis benchmarking framework comparing OpenAI GPT-4o and Google Gemini 2.5 Flash on real-world finance datasets. The project automates dataset processing, prompt standardisation, prediction validation, evaluation metrics, and result visualisation to analyse how different LLMs perform on sentiment classification tasks.",
      "Implemented a full evaluation pipeline using Python and Jupyter across the Financial PhraseBank and FiQA datasets, covering standardised 3-class sentiment prediction (positive, negative, neutral), automated response validation, and label normalisation. Evaluation included accuracy, macro F1, per-class F1, latency, and hallucination analysis, with statistical significance testing via McNemar's Test and comparative confusion matrix visualisations.",
      "The project demonstrated strong differences in model behaviour: GPT-4o achieved significantly higher classification performance while Gemini 2.5 Flash delivered lower latency. Focus was placed on reproducible benchmarking, clean evaluation methodology, and structured LLM comparison workflows.",
    ],
    bullets: [
      "Financial PhraseBank and FiQA dataset handling",
      "Standardised 3-class sentiment prediction across both models",
      "Accuracy, macro F1, per-class F1, latency, and hallucination analysis",
      "Automated response validation and label normalisation",
      "Statistical significance testing using McNemar's Test",
      "Confusion matrices and comparative visualisations",
      "Optimised API usage to reduce failed calls and improve cost efficiency",
    ],
    stack: [
      "Python",
      "OpenAI API",
      "Gemini API",
      "Pandas",
      "Jupyter",
    ],
  },
];
