// @vitest-environment node
import { describe, it, expect } from "vitest";
import type { Question } from "@/types";
import {
  shuffleArray,
  calculateScore,
  buildExamSession,
  applyFreeLimit,
  FREE_QUESTIONS_LIMIT,
} from "@/lib/utils/questions";

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

function makeQuestion(id: string, correctIndex = 0): Question {
  return {
    id,
    theme: "valeurs_republicaines",
    question: `Question ${id}`,
    options: ["A", "B", "C", "D"],
    correct_index: correctIndex,
    difficulty: "easy",
  };
}

function makeQuestions(count: number): Question[] {
  return Array.from({ length: count }, (_, i) => makeQuestion(`q_${i + 1}`));
}

// ---------------------------------------------------------------------------
// shuffleArray
// ---------------------------------------------------------------------------

describe("shuffleArray", () => {
  it("returns array of same length", () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffleArray(input);
    expect(result).toHaveLength(input.length);
  });

  it("contains same elements as input", () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffleArray(input);
    expect(result.sort()).toEqual(input.sort());
  });

  it("does not mutate original array", () => {
    const input = [1, 2, 3, 4, 5];
    const copy = [...input];
    shuffleArray(input);
    expect(input).toEqual(copy);
  });

  it("returns different order on average", () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const original = JSON.stringify(input);
    let hasDifferentOrder = false;

    for (let i = 0; i < 5; i++) {
      const result = shuffleArray(input);
      if (JSON.stringify(result) !== original) {
        hasDifferentOrder = true;
        break;
      }
    }

    expect(hasDifferentOrder).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// calculateScore
// ---------------------------------------------------------------------------

describe("calculateScore", () => {
  it("returns 100 when all answers correct", () => {
    const questions = makeQuestions(4); // all correct_index = 0
    const answers = [0, 0, 0, 0];
    expect(calculateScore(questions, answers)).toBe(100);
  });

  it("returns 0 when all answers wrong", () => {
    const questions = makeQuestions(4);
    const answers = [1, 1, 1, 1];
    expect(calculateScore(questions, answers)).toBe(0);
  });

  it("returns 50 when half correct", () => {
    const questions = makeQuestions(4);
    const answers = [0, 0, 1, 1];
    expect(calculateScore(questions, answers)).toBe(50);
  });

  it("returns 0 when answers array is empty", () => {
    const questions = makeQuestions(4);
    const answers: (number | null)[] = [];
    expect(calculateScore(questions, answers)).toBe(0);
  });

  it("handles null answers as wrong", () => {
    const questions = makeQuestions(4);
    const answers: (number | null)[] = [0, null, null, 0];
    expect(calculateScore(questions, answers)).toBe(50);
  });
});

// ---------------------------------------------------------------------------
// buildExamSession
// ---------------------------------------------------------------------------

describe("buildExamSession", () => {
  it("returns exactly count questions when pool is large enough", () => {
    const questions = makeQuestions(50);
    const result = buildExamSession(questions, 40);
    expect(result).toHaveLength(40);
  });

  it("returns all questions when pool is smaller than count", () => {
    const questions = makeQuestions(5);
    const result = buildExamSession(questions, 40);
    expect(result).toHaveLength(5);
  });

  it("returns shuffled subset", () => {
    const questions = makeQuestions(50);
    const original = questions.slice(0, 10).map((q) => q.id);
    let hasDifferentOrder = false;

    for (let i = 0; i < 5; i++) {
      const result = buildExamSession(questions, 10);
      const ids = result.map((q) => q.id);
      if (JSON.stringify(ids) !== JSON.stringify(original)) {
        hasDifferentOrder = true;
        break;
      }
    }

    expect(hasDifferentOrder).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// applyFreeLimit
// ---------------------------------------------------------------------------

describe("applyFreeLimit", () => {
  it("returns full array when isPremium is true", () => {
    const questions = makeQuestions(20);
    const result = applyFreeLimit(questions, true);
    expect(result).toHaveLength(20);
    expect(result).toBe(questions); // same reference
  });

  it("returns first FREE_QUESTIONS_LIMIT items when isPremium is false", () => {
    const questions = makeQuestions(20);
    const result = applyFreeLimit(questions, false);
    expect(result).toHaveLength(FREE_QUESTIONS_LIMIT);
    expect(result).toEqual(questions.slice(0, FREE_QUESTIONS_LIMIT));
  });

  it("does not mutate original array", () => {
    const questions = makeQuestions(20);
    const copy = [...questions];
    applyFreeLimit(questions, false);
    expect(questions).toEqual(copy);
  });
});
