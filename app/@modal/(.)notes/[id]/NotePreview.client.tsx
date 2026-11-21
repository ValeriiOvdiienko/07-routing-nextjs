"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import css from "@/app/@modal/(.)notes/[id]/NotePreview.module.css";
import Modal from "@/components/Modal/Modal";

export default function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const closePrevievNote = () => {
    router.back();
  };
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !note) return <p>Something went wrong.</p>;

  return (
    <Modal onClose={closePrevievNote}>
      <main className={css.main}>
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.tag}>{note.tag}</p>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>{note.createdAt}</p>
          </div>
        </div>
      </main>
    </Modal>
  );
}
