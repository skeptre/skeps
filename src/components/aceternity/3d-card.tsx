"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const MouseEnterContext = createContext<[boolean, Dispatch<SetStateAction<boolean>>] | undefined>(undefined);

const NO_HOVER_QUERY = "(hover: none)";

function subscribeNoHover(callback: () => void) {
  const mq = window.matchMedia(NO_HOVER_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function useNoHover() {
  return useSyncExternalStore(
    subscribeNoHover,
    () => window.matchMedia(NO_HOVER_QUERY).matches,
    () => true,
  );
}

type CardContainerProps = {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  restingTransform?: string;
};

export function CardContainer({ children, className, containerClassName, restingTransform }: CardContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);
  const reduce = useReducedMotion();
  const noHover = useNoHover();
  const tiltEnabled = !reduce && !noHover;
  const rest = restingTransform ?? "rotateY(0deg) rotateX(0deg)";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltEnabled || !containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
  };

  const handleMouseEnter = () => {
    if (tiltEnabled) setIsMouseEntered(true);
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    setIsMouseEntered(false);
    containerRef.current.style.transform = rest;
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn("flex items-center justify-center", containerClassName)}
        style={{ perspective: "1000px" }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn("relative flex items-center justify-center transition-all duration-200 ease-linear", className)}
          style={{ transformStyle: "preserve-3d", transform: tiltEnabled ? rest : undefined }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
}

export function CardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("[transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]", className)}>
      {children}
    </div>
  );
}

type CardItemProps = {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
} & Omit<React.ComponentPropsWithoutRef<"div">, "className" | "children">;

export function CardItem({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: CardItemProps) {
  const ref = useRef<HTMLElement>(null);
  const [isMouseEntered] = useMouseEnter();

  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.transform = isMouseEntered
      ? `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
      : "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)";
  }, [isMouseEntered, translateX, translateY, translateZ, rotateX, rotateY, rotateZ]);

  return (
    <Tag ref={ref} className={cn("w-fit transition duration-200 ease-linear", className)} {...rest}>
      {children}
    </Tag>
  );
}

export function useMouseEnter() {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a CardContainer");
  }
  return context;
}
