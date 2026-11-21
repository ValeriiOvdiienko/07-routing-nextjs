"use client";
import css from "./notes.module.css";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
// імпорти складових для запитів
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
// імпорти хуків
import { useState } from "react";
// імпорт дебаунсу
import { useDebouncedCallback } from "use-debounce";

interface NotesClientProps {
  tag?: string;
}
export function NotesClient({ tag }: NotesClientProps) {
  // useState для запита по пошуку
  const [searchQuery, setSearchQuery] = useState<string>("");

  // useState для реалізації пагінації
  const [currentPage, setCurrentPage] = useState<number>(1);
  const handlePageChange = (nextPage: number) => {
    setCurrentPage(nextPage);
  };
  // useState-прапорець для модалки
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  //
  // запити на бекенд
  const { data, isError } = useQuery({
    queryKey: ["notes", currentPage, searchQuery, tag],
    queryFn: async () => {
      const response = await fetchNotes(searchQuery, currentPage, tag);
      if (!response) throw new Error("some error");
      return response;
    },
    placeholderData: keepPreviousData,
    retry: false,
  });
  // обробка data в необхідних змінних
  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 0;
  // створення дебаунсу
  const handleSearchChange = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 1000);

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox onChange={handleSearchChange} />
          {totalPages > 1 && !isError && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
          <button
            className={css.button}
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Create note +
          </button>
          {isModalOpen && (
            <Modal onClose={closeModal}>
              <NoteForm onCancel={closeModal} />
            </Modal>
          )}
        </header>
        {notes.length > 0 && <NoteList notes={notes} />}
      </div>
    </>
  );
}
