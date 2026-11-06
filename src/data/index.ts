import { BookPart, ChapterData } from "./types";
import { PART_1_CHAPTERS } from "./part1Chapters";
import { PART_2_CHAPTERS } from "./part2Chapters";
import { PART_3_CHAPTERS } from "./part3Chapters";
export * from "./types";
export * from "./metadata";
export * from "./revisionData";
export * from "./chapterAnnotations";

export const BOOK_PARTS: BookPart[] = [
  {
    id: "part-1",
    partNumber: 1,
    romanNumeral: "I",
    title: "Part One: The Panoptic State & The Solitary Heretic",
    subtitle: "Chapters I–VIII • Airstrip One, the Ministry of Truth & the Prole Quarters",
    epigraph:
      "Freedom is the freedom to say that two plus two make four. If that is granted, all else follows.",
    overview:
      "Introduces thirty-nine-year-old Winston Smith in Airstrip One (London, 1984), tracing his secret alienation from the Party, his work falsifying history in the Records Department of the Ministry of Truth, his inaugural act of thoughtcrime in an antique cream-laid diary ('DOWN WITH BIG BROTHER'), his linguistic conversations with Syme on Newspeak, and his solitary expedition into the prole slums where he purchases the glass coral paperweight from Mr. Charrington.",
    narrativeArc:
      "Solitary Awakening ➔ Epistemological Defiance ('2 + 2 = 4') ➔ Search for the Past & Proletarian Hope",
    dominantThemes: ["surveillance", "doublethink", "newspeak", "rebellion", "class"],
    chapters: PART_1_CHAPTERS,
  },
  {
    id: "part-2",
    partNumber: 2,
    romanNumeral: "II",
    title: "Part Two: Erotic Insurrection, The Coral Sanctuary & The Honey-Trap",
    subtitle: "Chapters I–X • The Golden Country, Charrington's Room & O'Brien's Conspiracy",
    epigraph:
      "Their embrace had been a battle, the climax a victory. It was a blow struck against the Party. It was a political act.",
    overview:
      "Chronicles Winston's transformative love affair with twenty-six-year-old Julia after she slips him a note reading 'I love you.' From their pastoral tryst in the Golden Country to their rented domestic sanctuary above Mr. Charrington's shop, their rebellion escalates until they visit Inner Party official O'Brien to join Emmanuel Goldstein's underground Brotherhood, read 'The Theory and Practice of Oligarchical Collectivism,' and are violently ambushed when the hidden telescreen behind St. Clement's picture reveals Mr. Charrington as an operative of the Thought Police.",
    narrativeArc:
      "Erotic Liberation ➔ Domestic Sanctuary in the Glass Paperweight ➔ Entrapment by O'Brien & The Thought Police Raid",
    dominantThemes: ["loyalty", "rebellion", "totalitarianism", "doublethink", "surveillance"],
    chapters: PART_2_CHAPTERS,
  },
  {
    id: "part-3",
    partNumber: 3,
    romanNumeral: "III",
    title: "Part Three: The Ministry of Love, Room 101 & Total Reintegration",
    subtitle: "Chapters I–VI + Appendix • The Dial of Pain, Pure Power, the Wire Rat-Cage & Newspeak",
    epigraph:
      "If you want a picture of the future, imagine a boot stamping on a human face—forever.",
    overview:
      "Set deep inside the windowless, perpetually lit cells of the Ministry of Love ('the place where there is no darkness'), Part Three details O'Brien's systematic destruction and reconstruction of Winston's mind across three stages: Learning, Understanding, and Acceptance. Tortured on the electroshock rack until he sees five fingers (`2 + 2 = 5`), lectured on the Party's pursuit of pure sadistic power, and confronted with his deepest phobia—starving sewer rats in Room 101—Winston betrays Julia ('Do it to Julia!') and ends his days as a broken ghost at the Chestnut Tree Café who genuinely 'loved Big Brother'—followed by the past-tense scholarly Appendix on Newspeak.",
    narrativeArc:
      "Epistemological Torture ('2 + 2 = 5') ➔ Philosophy of Pure Power ➔ Room 101 Betrayal ➔ 'He Loved Big Brother' (& Post-Totalitarian Appendix)",
    dominantThemes: ["torture", "totalitarianism", "doublethink", "loyalty", "newspeak"],
    chapters: PART_3_CHAPTERS,
  },
];

export const ALL_CHAPTERS: ChapterData[] = BOOK_PARTS.flatMap((part) => part.chapters);

export const TOTAL_CHAPTERS_COUNT = ALL_CHAPTERS.length; // 25 units (24 chapters + Appendix)

export const TOTAL_SUBSECTIONS_COUNT = ALL_CHAPTERS.reduce(
  (sum, ch) => sum + ch.subSections.length,
  0
);

export const TOTAL_QUOTES_COUNT = ALL_CHAPTERS.reduce(
  (sum, ch) => sum + ch.quotes.length,
  0
);

export const TOTAL_READING_MINUTES = ALL_CHAPTERS.reduce(
  (sum, ch) => sum + ch.readingTimeMinutes,
  0
);
