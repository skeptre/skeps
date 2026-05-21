export type ProjectMediaCategory =
  | "Architecture"
  | "Orchestration"
  | "API Layer"
  | "Validation"
  | "Database"
  | "Infrastructure"
  | "Evaluation"
  | "Performance";

export type ProjectMediaItem = {
  title: string;
  description: string;
  image: string;
  featured?: boolean;
  /** Primary artifacts use a larger two-column layout below the hero. */
  primary?: boolean;
  category?: ProjectMediaCategory;
};
