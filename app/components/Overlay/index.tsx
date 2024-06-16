import { PropsWithChildren } from "react";
import styles from "./overlay.module.css";

export const Overlay = ({ children }: PropsWithChildren) => {
  return <div className={styles.overlay}>{children}</div>;
};