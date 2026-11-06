export type ThemeId =
  | "surveillance"
  | "newspeak"
  | "totalitarianism"
  | "doublethink"
  | "rebellion"
  | "loyalty"
  | "class"
  | "torture";

export interface ThemeDefinition {
  id: ThemeId;
  name: string;
  shortName: string;
  newspeakTerm: string;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  glowColor: string;
  description: string;
  coreMechanism: string;
}

export interface ChapterSubSection {
  id: string;
  title: string;
  sceneMarker: string;
  content: string;
  analyticalTakeaway: string;
}

export interface QuoteItem {
  id: string;
  quote: string;
  speaker: string;
  context: string;
  analysis: string;
  themes: ThemeId[];
}

export interface ThemeTrackItem {
  themeId: ThemeId;
  intensity: 1 | 2 | 3 | 4 | 5;
  manifestation: string;
}

export interface ChapterAnalysis {
  thesis: string;
  sparkNotesSynthesis: string;
  litChartsSynthesis: string;
  americanLitContext: string;
  psychologicalArc: string;
  motifsAndSymbols: string[];
}

export interface ChapterData {
  id: string;
  partId: "part-1" | "part-2" | "part-3";
  partNumber: 1 | 2 | 3;
  chapterNumber: number;
  displayCode: string;
  title: string;
  subtitle: string;
  readingTimeMinutes: number;
  setting: string;
  surveillanceLevel: "LOW" | "MODERATE" | "HIGH" | "COVERT TRAP" | "ABSOLUTE PANOPTICON";
  telescreenStatus: string;
  summary: string;
  speedReadBullets: string[];
  subSections: ChapterSubSection[];
  analysis: ChapterAnalysis;
  quotes: QuoteItem[];
  themeTracking: ThemeTrackItem[];
  examPromptTakeaway: string;
}

export interface BookPart {
  id: "part-1" | "part-2" | "part-3";
  partNumber: 1 | 2 | 3;
  romanNumeral: "I" | "II" | "III";
  title: string;
  subtitle: string;
  epigraph: string;
  overview: string;
  narrativeArc: string;
  dominantThemes: ThemeId[];
  chapters: ChapterData[];
}

export interface SymbolItem {
  id: string;
  name: string;
  category: "Object" | "Place" | "Ideology" | "Text" | "Figure";
  firstAppearance: string;
  meaning: string;
  evolution: string;
}

export interface CharacterProfile {
  id: string;
  name: string;
  role: string;
  partyStatus: "Outer Party" | "Inner Party" | "Thought Police" | "Prole" | "Figurehead / Myth";
  fate: string;
  psychologicalProfile: string;
  symbolicFunction: string;
}

export interface NewspeakTerm {
  term: string;
  vocabularyClass: "A-Vocabulary" | "B-Vocabulary (Compound Political)" | "C-Vocabulary";
  literalMeaning: string;
  ideologicalFunction: string;
}

// ==================== REVISION & EXAM PREP TYPES ====================

export interface FlashcardItem {
  id: string;
  category: "Quote Recall" | "Plot & Event" | "Theme & Concept" | "Character & Motivation" | "Symbolism";
  part: "Part 1" | "Part 2" | "Part 3" | "General";
  question: string;
  clue?: string;
  answer: string;
  examContext: string;
  relatedThemes: ThemeId[];
}

export interface QuizQuestion {
  id: string;
  part: "Part 1" | "Part 2" | "Part 3" | "Comprehensive";
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  examTip: string;
}

export interface PreLessonCramItem {
  id: string;
  chapterCode: string;
  title: string;
  part: "Part 1" | "Part 2" | "Part 3";
  sixtySecondSummary: string;
  teacherDiscussionQuestions: string[];
  commonMisconceptions: string;
  mustCiteQuotes: { quote: string; analysis: string }[];
}

export interface EssayParagraphBlueprint {
  topicSentence: string;
  primaryEvidence: string;
  literaryAnalysis: string;
  counterPerspective: string;
}

export interface EssayBlueprint {
  id: string;
  prompt: string;
  rubricFocus: "A-Level / AP Lit / IB Literature";
  thesisStatement: string;
  coreArgumentSummary: string;
  paragraphs: EssayParagraphBlueprint[];
  concludingSynthesis: string;
}

export interface QuoteClozeItem {
  id: string;
  chapterCode: string;
  speaker: string;
  fullQuote: string;
  quoteWithBlank: string;
  correctWord: string;
  hint: string;
  analyticalSignificance: string;
}
