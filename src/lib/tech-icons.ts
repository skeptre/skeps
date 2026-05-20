import type { IconType } from "react-icons";
import {
  SiAxios,
  SiExpo,
  SiExpress,
  SiMobx,
  SiMocha,
  SiNodedotjs,
  SiReact,
  SiSqlite,
  SiSwagger,
  SiTypescript,
} from "react-icons/si";

export const TECH_ICON_MAP: Record<string, IconType> = {
  "React Native": SiReact,
  "React Navigation": SiReact,
  "React Hook Form": SiReact,
  "Expo": SiExpo,
  "Expo Sensors": SiExpo,
  "TypeScript": SiTypescript,
  "MobX": SiMobx,
  "Axios": SiAxios,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  "SQLite3": SiSqlite,
  "Swagger/OpenAPI": SiSwagger,
  "Mocha": SiMocha,
};
