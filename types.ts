// types.ts
export interface Movie {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  imageUrl?: string | null;
  videoUrl?: string | null;
  genre: string[]; // stored as CSV in DB, mapped to array in API
  duration: number;
  createdAt?: string | null;
}
