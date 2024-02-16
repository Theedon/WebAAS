import React from "react";
import styles from "@/styles/Loader.module.css";

function LoadingPage() {
  return (
    <div className="flex h-[60vh] w-full items-center justify-center">
      <div className={styles.Spinner}></div>
    </div>
  );
}

export default LoadingPage;
