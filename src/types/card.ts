export interface Card {
  id: string;
  word: string;
  translation: string;
  example?: string;
  transcription?: string;
  createdAt: Date;
  learned: boolean;
}
