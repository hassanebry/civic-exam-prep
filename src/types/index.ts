export type Theme =
    | "valeurs_republicaines"
    | "symboles"
    | "institutions"
    | "droits_devoirs"
    | "vie_en_france";

export interface Question {
    id: string;
    theme: Theme;
    question: string;
    options: string[];
    correct_index: number;
    explanation?: string;
    difficulty: "easy" | "medium" | "hard";
}

export interface ExamSession {
    id: string;
    user_id?: string;
    questions: Question[];
    answers: (number | null)[];
    started_at: Date;
    finished_at?: Date;
    score?: number;
    mode: "thematic" | "blanc" | "review";
    theme?: Theme;
}

export interface UserProgress {
    user_id: string;
    theme: Theme;
    total_attempts: number;
    correct_answers: number;
    last_attempt: Date;
}