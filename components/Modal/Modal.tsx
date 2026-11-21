"use client";
import css from "./Modal.module.css";
import { createPortal } from "react-dom";
import { useEffect } from "react";
//
interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}
//
export default function Modal({ children, onClose }: ModalProps) {
  // ефекти для закриття по кліку на бекдроп чи ескейп
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  //
  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>{children}</div>
    </div>,
    document.body,
  );
}
