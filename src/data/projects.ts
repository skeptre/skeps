import type { ProjectMediaItem } from "@/types/project-media";

export type Project = {
  title: string;
  description: string;
  type: string;
  paragraphs: string[];
  bullets?: string[];
  stack: string[];
  github?: string;
  demo?: string;
  media?: ProjectMediaItem[];
};

const RETAIL_OPS_MEDIA_BASE = "/projects/retail-ops-platform";

export const PROJECTS: Project[] = [
  {
    title: "Retail & Operations Intelligence Platform",
    description: "Python ELT platform with PostgreSQL, Prefect orchestration, medallion architecture, and a FastAPI analytics REST API. Containerised with Docker Compose.",
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
    media: [
      {
        title: "End-to-End Medallion Pipeline Architecture",
        description:
          "End-to-end Retail Ops platform architecture showing CSV ingestion, Prefect orchestration, Bronze/Silver/Gold transformations, validation and quarantine handling, analytics generation, and FastAPI serving endpoints.",
        image: `${RETAIL_OPS_MEDIA_BASE}/retail-ops-architecture.png`,
        featured: true,
        category: "Architecture",
      },
      {
        title: "Successful Prefect-Orchestrated Pipeline Run",
        description:
          "Successful Prefect-orchestrated pipeline execution generating 10 stores, 2,000 inventory rows, and 50,000 transactions before completing ingestion, transformation, gold analytics generation, and validation stages.",
        image: `${RETAIL_OPS_MEDIA_BASE}/prefect-pipeline-run.png`,
        primary: true,
        category: "Orchestration",
      },
      {
        title: "FastAPI Analytics Layer",
        description:
          "FastAPI analytics layer exposing sales, inventory, health, and pipeline monitoring endpoints through OpenAPI/Swagger documentation.",
        image: `${RETAIL_OPS_MEDIA_BASE}/swagger-api-docs.png`,
        primary: true,
        category: "API Layer",
      },
      {
        title: "Bronze Table With Ingestion Metadata",
        description:
          "Bronze-layer inventory table containing ingestion metadata, source lineage, quarantine tracking fields, and raw operational inventory records.",
        image: `${RETAIL_OPS_MEDIA_BASE}/bronze-inventory-table.png`,
        category: "Validation",
      },
      {
        title: "PostgreSQL Bronze/Silver/Gold Schemas",
        description:
          "PostgreSQL database organized using Bronze, Silver, and Gold schemas to separate raw ingestion data, cleaned relational models, and analytics-ready datasets.",
        image: `${RETAIL_OPS_MEDIA_BASE}/postgres-medallion-schemas.png`,
        category: "Database",
      },
      {
        title: "Dockerized Local Infrastructure",
        description:
          "Dockerized local infrastructure running PostgreSQL and pgAdmin services for pipeline execution, database management, and analytics development.",
        image: `${RETAIL_OPS_MEDIA_BASE}/docker-infrastructure.png`,
        category: "Infrastructure",
      },
    ],
  },
  {
    title: "Support Ticket Management API",
    description: "FastAPI backend with JWT auth, SQLAlchemy ORM, Alembic migrations, Pydantic validation, pytest coverage, and Docker deployment.",
    type: "backend / api",
    paragraphs: [
      "Developed a backend support ticket management API using Python and FastAPI with JWT authentication, user registration/login flows, and per-user ticket CRUD operations. Implemented SQLAlchemy models, Alembic database migrations, Pydantic validation schemas, and protected API routes with ownership-based access control. Added Docker support, automated pytest test coverage, and environment-based configuration management for local development and deployment workflows.",
    ],
    stack: [
      "Python",
      "FastAPI",
      "SQLAlchemy",
      "Pydantic",
      "JWT",
      "pytest",
      "Docker",
    ],
    github: "https://github.com/skeptre/ticket-api",
  },
  {
    title: "Activity Tracker — Mobile",
    description: "Cross-platform React Native fitness app with pedometer sensors, MobX state management, real-time step tracking, and Expo integration.",
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
    description: "Node.js REST API for fitness and activity tracking with SQLite, Joi validation, Swagger UI documentation, and MVC-style architecture.",
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
    description: "Final year project benchmarking GPT-4o vs Gemini 2.5 Flash on financial sentiment datasets with F1, latency, and McNemar significance testing.",
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
