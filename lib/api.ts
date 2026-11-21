import axios from "axios";
import type { Note, NoteFormValues } from "@/types/note";

// функція get-запиту
// інтерфейс відповіді get-запиту, який включає описаний інтерфейс Note
interface FetchNotehubResponse {
  notes: Note[];
  totalPages: number;
}
//
export async function fetchNotes(
  query: string,
  page: number,
  tag?: string,
): Promise<FetchNotehubResponse> {
  const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  const options = {
    method: "GET",
    url: `https://notehub-public.goit.study/api/notes`,
    params: {
      search: query || undefined,
      tag: tag || undefined,
      page,
      perPage: 12,
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${myKey}`,
    },
  };
  const { data } = await axios.request<FetchNotehubResponse>(options);
  return data;
}
// функція post-запиту
export async function createNote(value: NoteFormValues): Promise<Note> {
  const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  const options = {
    method: "POST",
    url: `https://notehub-public.goit.study/api/notes`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${myKey}`,
    },
    data: value,
  };
  const { data } = await axios.request<Note>(options);
  return data;
}
// функція видалення
export async function deleteNote(id: string): Promise<Note> {
  const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  const options = {
    method: "DELETE",
    url: `https://notehub-public.goit.study/api/notes/${id}`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${myKey}`,
    },
  };
  const { data } = await axios.request<Note>(options);
  return data;
}
// функція запиту на одну нотатку
export async function fetchNoteById(id: string): Promise<Note> {
  const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  const options = {
    method: "GET",
    url: `https://notehub-public.goit.study/api/notes/${id}`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${myKey}`,
    },
  };
  const response = await axios.request<Note>(options);
  return response.data;
}
