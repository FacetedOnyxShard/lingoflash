export interface Card {
  id: string;
  word: string;
  translation: string;
  transcription: string | undefined;
  createdAt: Date;
  example?: string;
  learned: boolean;
  lastReviewed?: Date;
  quality?: 0 | 1 | 2;
}
