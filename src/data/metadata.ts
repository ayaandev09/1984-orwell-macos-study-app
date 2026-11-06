import {
  ThemeDefinition,
  SymbolItem,
  CharacterProfile,
  NewspeakTerm,
} from "./types";

export const THEMES_TAXONOMY: Record<string, ThemeDefinition> = {
  surveillance: {
    id: "surveillance",
    name: "Surveillance & Panopticism",
    shortName: "Surveillance",
    newspeakTerm: "TELESCREEN / THOUGHT POLICE",
    color: "#38bdf8",
    badgeBg: "rgba(56, 189, 248, 0.14)",
    badgeBorder: "rgba(56, 189, 248, 0.42)",
    badgeText: "#bae6fd",
    glowColor: "rgba(56, 189, 248, 0.25)",
    description:
      "The weaponization of two-way telescreens, hidden microphones, child informants (the Spies), and undercover Thought Police operatives to abolish private space and compel continuous self-policing.",
    coreMechanism:
      "Asymmetric visibility (Jeremy Bentham's Panopticon): because citizens never know when the Thought Police are watching, they must behave as though they are watched every second.",
  },
  newspeak: {
    id: "newspeak",
    name: "Newspeak & Linguistic Determinism",
    shortName: "Newspeak",
    newspeakTerm: "B-VOCABULARY / DUCKTHINK",
    color: "#a855f7",
    badgeBg: "rgba(168, 85, 247, 0.14)",
    badgeBorder: "rgba(168, 85, 247, 0.42)",
    badgeText: "#e9d5ff",
    glowColor: "rgba(168, 85, 247, 0.25)",
    description:
      "The systematic destruction of vocabulary, synonyms, and shades of meaning to narrow the range of human consciousness until heretical thought ('thoughtcrime') becomes literally unspeakable and unthinkable.",
    coreMechanism:
      "Linguistic Sapir-Whorf weaponization: if the words for 'freedom', 'justice', and 'rebellion' are collapsed into 'crimethink', conceptualizing resistance becomes neurologically impossible.",
  },
  totalitarianism: {
    id: "totalitarianism",
    name: "Totalitarianism & Pure Power",
    shortName: "Totalitarianism",
    newspeakTerm: "INGSOC / OLIGARCHICAL COLLECTIVISM",
    color: "#f43f5e",
    badgeBg: "rgba(244, 63, 94, 0.14)",
    badgeBorder: "rgba(244, 63, 94, 0.42)",
    badgeText: "#fecdd3",
    glowColor: "rgba(244, 63, 94, 0.25)",
    description:
      "Unlike historical tyrannies that claimed to rule for a higher good or temporary necessity, the Party seeks absolute power solely as an end in itself—manifested through perpetual war, artificial scarcity, and psychological domination.",
    coreMechanism:
      "O'Brien's doctrine: 'Power is not a means; it is an end... Power is in tearing human minds to pieces and putting them together again in new shapes of your own choosing.'",
  },
  doublethink: {
    id: "doublethink",
    name: "Doublethink & Historical Mutability",
    shortName: "Doublethink",
    newspeakTerm: "REALITY CONTROL / BLACKWHITE",
    color: "#f59e0b",
    badgeBg: "rgba(245, 158, 11, 0.14)",
    badgeBorder: "rgba(245, 158, 11, 0.42)",
    badgeText: "#fde68a",
    glowColor: "rgba(245, 158, 11, 0.25)",
    description:
      "The cognitive discipline of holding two contradictory beliefs simultaneously and accepting both as true, paired with the continuous erasure and fabrication of historical records down the memory holes of the Ministry of Truth.",
    coreMechanism:
      "Epistemological solipsism: reality exists only in the collective mind of the Party. By destroying external documentary evidence and autonomous memory, the Party makes its pronouncements infallible.",
  },
  rebellion: {
    id: "rebellion",
    name: "Individualism, Memory & Rebellion",
    shortName: "Rebellion & Memory",
    newspeakTerm: "OWNLIFE / ANCIENT PAST",
    color: "#10b981",
    badgeBg: "rgba(16, 185, 129, 0.14)",
    badgeBorder: "rgba(16, 185, 129, 0.42)",
    badgeText: "#a7f3d0",
    glowColor: "rgba(16, 185, 129, 0.25)",
    description:
      "Winston's fragile effort to preserve personal interiority, sensory beauty, and historical continuity through tactile relics—creamy diary paper, the glass coral paperweight, nursery rhymes, and involuntary dreams.",
    coreMechanism:
      "Axiomatic resistance: holding onto empirical perception ('two plus two make four') and emotional memory against state-enforced collective amnesia.",
  },
  loyalty: {
    id: "loyalty",
    name: "Love, Sexuality & Betrayal",
    shortName: "Love & Betrayal",
    newspeakTerm: "SEXCRIME / GOODSEX",
    color: "#ec4899",
    badgeBg: "rgba(236, 72, 153, 0.14)",
    badgeBorder: "rgba(236, 72, 153, 0.42)",
    badgeText: "#fbcfe8",
    glowColor: "rgba(236, 72, 153, 0.25)",
    description:
      "The struggle between private human attachment (Winston and Julia's illicit romance, maternal sacrifice) and the Party's demand for exclusive emotional fealty—culminating in coerced betrayal inside Room 101.",
    coreMechanism:
      "Libidinal sublimation: the Party represses erotic pleasure so sexual frustration can be transmuted into war hysteria, Two Minutes Hate frenzy, and worship of Big Brother.",
  },
  class: {
    id: "class",
    name: "Class Stratification & The Proles",
    shortName: "Class & Proles",
    newspeakTerm: "HIGH / MIDDLE / LOW (PROLEFEED)",
    color: "#6366f1",
    badgeBg: "rgba(99, 102, 241, 0.14)",
    badgeBorder: "rgba(99, 102, 241, 0.42)",
    badgeText: "#c7d2fe",
    glowColor: "rgba(99, 102, 241, 0.25)",
    description:
      "Oceania's rigid tripartite hierarchy: the ruling Inner Party (2%), the fiercely monitored Outer Party (13%), and the impoverished Proles (85%), who possess the physical power to revolt but lack political consciousness.",
    coreMechanism:
      "The paradox of proletarian liberation: 'Until they become conscious they will never rebel, and until after they have rebelled they cannot become conscious.'",
  },
  torture: {
    id: "torture",
    name: "Psychological Conditioning & Erasure",
    shortName: "Room 101 & Torture",
    newspeakTerm: "MINILUV / VAPORIZATION / UNPERSON",
    color: "#ef4444",
    badgeBg: "rgba(239, 68, 68, 0.16)",
    badgeBorder: "rgba(239, 68, 68, 0.48)",
    badgeText: "#fecaca",
    glowColor: "rgba(239, 68, 68, 0.28)",
    description:
      "The Ministry of Love's refusal to create martyrs: before executing a dissident, the state must hollow out their soul through Learning, Understanding, and Acceptance until they genuinely love Big Brother.",
    coreMechanism:
      "Weaponized primal phobia (Room 101): identifying the single unendurable terror unique to each psyche to shatter the final sanctuary of private integrity.",
  },
};

export const SYMBOLS_LEXICON: SymbolItem[] = [
  {
    id: "glass-paperweight",
    name: "The Glass Paperweight & Pink Coral",
    category: "Object",
    firstAppearance: "Part I, Chapter 8 (Mr. Charrington's Antique Shop)",
    meaning:
      "Represents the fragility and beauty of the pre-Party past, aesthetic uselessness ('something that had no utilitarian function'), and the private sanctuary Winston and Julia construct above the shop.",
    evolution:
      "In Part II, Winston gazes into the dome as a microcosm of their sealed bedroom ('the glass was the sky; the crystal was the room they were in'). In Part II, Chapter 10, the Thought Police smash it on the hearthstone, sending the tiny pink coral rolling across the floor—exposing how small and defenseless their private rebellion always was.",
  },
  {
    id: "big-brother",
    name: "Big Brother & The Mustachioed Poster",
    category: "Figure",
    firstAppearance: "Part I, Chapter 1 (Victory Mansions Lobby)",
    meaning:
      "The immortal, infallible personification of the Party (modeled visually on Joseph Stalin and Lord Kitchener). Because it is impossible to feel visceral fear or adoration toward a bureaucratic committee, Big Brother acts as an emotional focal point.",
    evolution:
      "Begins as an oppressive tyrant ('BIG BROTHER IS WATCHING YOU') that inspires Winston's hatred ('DOWN WITH BIG BROTHER'), and concludes in Part III, Chapter 6 as the object of Winston's tearful, broken devotion ('He loved Big Brother').",
  },
  {
    id: "st-clements-picture",
    name: "St. Clement's Dane Engraving & Nursery Rhyme",
    category: "Object",
    firstAppearance: "Part I, Chapter 8 / Part II, Chapter 4",
    meaning:
      "Fragments of lost cultural memory from pre-revolutionary London ('Oranges and lemons, say the bells of St. Clement's'). Winston tries to reconstruct the forgotten rhyme to reconnect with objective history.",
    evolution:
      "Cruelly subverted in Part II, Chapter 10: the framing of St. Clement's literally conceals the hidden telescreen, and Mr. Charrington completes the rhyme with its executioner's couplet: 'Here comes a candle to light you to bed, here comes a chopper to chop off your head!'",
  },
  {
    id: "the-diary",
    name: "Winston's Cream-Laid Diary",
    category: "Text",
    firstAppearance: "Part I, Chapter 1",
    meaning:
      "The physical vessel of autonomous memory, linear time, and individual subjectivity. Writing by hand with a steel nib pen resists the mechanized 'speakwrite' and pneumatic memory holes of Minitrue.",
    evolution:
      "Addressed 'To the future or to the past, to a time when thought is free,' only for O'Brien to reveal in Part III that the Thought Police monitored and studied every page inside the flat for seven years.",
  },
  {
    id: "golden-country",
    name: "The Golden Country",
    category: "Place",
    firstAppearance: "Part I, Chapter 3 (Dream) / Part II, Chapter 2 (Reality)",
    meaning:
      "A sunlit pastoral landscape with rabbit-cropped pasture, elms, and a clear stream—representing untouched nature, erotic freedom, and instinctive life outside urban totalitarian decay.",
    evolution:
      "Manifests in reality when Winston and Julia meet in the forest clearing in Part II, Chapter 2 and hear the thrush sing, before being psychologically polluted during Winston's conditioning in the Ministry of Love.",
  },
  {
    id: "red-armed-prole",
    name: "The Red-Armed Prole Woman",
    category: "Figure",
    firstAppearance: "Part II, Chapter 4 (Courtyard below Charrington's Shop)",
    meaning:
      "With her solid, weathered body, endless diaper-hanging, and sentimental telescreen ballad, she embodies elemental human endurance, vitality, and the latent revolutionary potential of the Proles.",
    evolution:
      "Right before the Thought Police storm the room in Part II, Chapter 10, Winston compares her monumental vitality to rosehip blossoms—recognizing that future beauty belongs to her descendants, if they ever awaken.",
  },
  {
    id: "room-101",
    name: "Room 101 & The Wire Cage of Rats",
    category: "Place",
    firstAppearance: "Part III, Chapter 1 (Rumored) / Part III, Chapter 5 (Entered)",
    meaning:
      "The subterranean torture chamber containing 'the worst thing in the world'—tailored to each prisoner's deepest primal terror to force total psychological surrender.",
    evolution:
      "Winston withstood beatings and electroshock without betraying Julia's heart, but the dual-chamber wire mask of starving sewer rats triggers an evolutionary panic that shatters his humanity ('Do it to Julia!').",
  },
  {
    id: "chestnut-tree-cafe",
    name: "The Chestnut Tree Café & Victory Gin",
    category: "Place",
    firstAppearance: "Part I, Chapter 7 (Rutherford) / Part III, Chapter 6 (Winston)",
    meaning:
      "The haunting purgatory of broken former dissidents awaiting inevitable execution after their minds have been hollowed out by the Ministry of Love.",
    evolution:
      "Its signature song—'Under the spreading chestnut tree, I sold you and you sold me'—foreshadows Winston and Julia's mutual betrayal and his spiritual death while sipping clove-scented Victory Gin.",
  },
];

export const CHARACTERS_DOSSIER: CharacterProfile[] = [
  {
    id: "winston-smith",
    name: "Winston Smith",
    role: "Protagonist; Records Department Clerk at the Ministry of Truth",
    partyStatus: "Outer Party",
    fate: "Tortured in the Ministry of Love, broken in Room 101, spiritually annihilated at the Chestnut Tree Café awaiting execution.",
    psychologicalProfile:
      "39 years old, frail, afflicted with a varicose ulcer above his right ankle. Haunted by guilt over his mother and sister's starvation, deeply fatalistic ('We are the dead'), yet fiercely committed to empirical truth ('two plus two make four') and historical preservation.",
    symbolicFunction:
      "Named after Winston Churchill (heroic resistance) paired with 'Smith' (the common everyman), representing the last humanist individual crushed by modern totalitarian machinery.",
  },
  {
    id: "julia",
    name: "Julia",
    role: "Mechanic on Novel-Writing Machines in the Fiction Department",
    partyStatus: "Outer Party",
    fate: "Arrested with Winston, tortured (scarred across her forehead and thickened at the waist), emotionally deadened after mutual betrayal.",
    psychologicalProfile:
      "26 years old, bold, sensual, and intensely pragmatic. Unlike Winston, she has no interest in organized ideology, historical truth, or future generations—she rebels from the waist downwards, using her Junior Anti-Sex League sash as camouflage for illicit affairs and black-market luxuries.",
    symbolicFunction:
      "Embodies instinctual life-force, sensory pleasure, and youthful hedonism—demonstrating both the potency and the structural limits of purely personal, apolitical rebellion.",
  },
  {
    id: "obrien",
    name: "O'Brien",
    role: "Inner Party Official & Chief Inquisitor of the Ministry of Love",
    partyStatus: "Inner Party",
    fate: "Remains at the pinnacle of Inner Party power, orchestrating entrapment and reintegration.",
    psychologicalProfile:
      "Large, burly, refined in manner (adjusting his spectacles like an eighteenth-century nobleman), yet capable of fanatical sadism and philosophical sophistication. Simultaneously plays the role of Winston's conspiratorial mentor and torturer-priest.",
    symbolicFunction:
      "The Grand Inquisitor of Ingsoc: proves that totalitarianism is not driven by ignorance, but by hyper-intelligent, self-aware fanaticism devoted to collective immortality through pure power.",
  },
  {
    id: "syme",
    name: "Syme",
    role: "Philologist in the Research Department (11th Newspeak Dictionary)",
    partyStatus: "Outer Party",
    fate: "Vaporized in Part II, Chapter 5; erased from chess committee lists and turned into an unperson.",
    psychologicalProfile:
      "Brilliant, venomous, and fanatically orthodox about destroying words, yet fatally lacking the dull discretion required of Party survivors.",
    symbolicFunction:
      "Demonstrates that in a totalitarian regime, excessive intelligence and clear-sighted understanding of the Party's methods are just as dangerous as heresy.",
  },
  {
    id: "charrington",
    name: "Mr. Charrington",
    role: "Proprietor of the Junk Shop / Undercover Thought Police Officer",
    partyStatus: "Thought Police",
    fate: "Reveals his true 35-year-old ruthless identity during the Part II, Chapter 10 raid.",
    psychologicalProfile:
      "Disguised with white hair, spectacles, and benevolent nostalgia, luring Winston with pre-revolutionary artifacts and a 'telescreen-free' sanctuary.",
    symbolicFunction:
      "Represents the Party's weaponization of nostalgia and honey-trap surveillance: even the refuge of the past is curated and policed by the state.",
  },
  {
    id: "goldstein",
    name: "Emmanuel Goldstein",
    role: "Arch-Traitor of Oceania & Alleged Commander of the Brotherhood",
    partyStatus: "Figurehead / Myth",
    fate: "Perpetual scapegoat of the Two Minutes Hate; his book was co-authored by O'Brien and the Inner Party.",
    psychologicalProfile:
      "Modeled on Leon Trotsky (goatee, Jewish features, former revolutionary peer of Big Brother turned heretic). Channels collective rage and flushes out subterranean dissidents.",
    symbolicFunction:
      "The manufactured enemy: proves that totalitarian stability requires a permanent internal traitor against whom citizens can discharge fear and hatred.",
  },
];

export const NEWSPEAK_LEXICON: NewspeakTerm[] = [
  {
    term: "Crimethink (Thoughtcrime)",
    vocabularyClass: "B-Vocabulary (Compound Political)",
    literalMeaning: "Holding any unorthodox thought, memory, doubt, or facial expression ('facecrime') contrary to Ingsoc.",
    ideologicalFunction: "Criminalizes interior consciousness itself; the only crime in Oceania that contains all others.",
  },
  {
    term: "Doublethink",
    vocabularyClass: "B-Vocabulary (Compound Political)",
    literalMeaning: "Simultaneously knowing and not-knowing; holding two contradictory beliefs and accepting both.",
    ideologicalFunction: "Allows Party members to rewrite history deliberately and immediately forget they have done so.",
  },
  {
    term: "Blackwhite",
    vocabularyClass: "B-Vocabulary (Compound Political)",
    literalMeaning: "Applied to an opponent: impudently claiming black is white. Applied to a Party member: loyal willingness to say black is white when Party discipline demands it—and to believe it.",
    ideologicalFunction: "Subordinates empirical sensory perception to ideological loyalty.",
  },
  {
    term: "Crimestop",
    vocabularyClass: "B-Vocabulary (Compound Political)",
    literalMeaning: "'Protective stupidity'—the faculty of stopping short, as if by instinct, at the threshold of any dangerous thought.",
    ideologicalFunction: "Automatizes self-censorship before heretical logic or analogies can form.",
  },
  {
    term: "Duckspeak",
    vocabularyClass: "B-Vocabulary (Compound Political)",
    literalMeaning: "To quack like a duck—speaking rapid, orthodox Party slogans directly from the larynx without engaging the higher brain centers.",
    ideologicalFunction: "Applied to an ally, it is highest praise; reduces human speech to conditioned reflex.",
  },
  {
    term: "Ownlife",
    vocabularyClass: "B-Vocabulary (Compound Political)",
    literalMeaning: "Individualism and eccentricity; any preference for solitude, walks alone, or non-collective hobbies.",
    ideologicalFunction: "Pathologizes privacy so that simply desiring to be alone is evidence of treason.",
  },
  {
    term: "Goodsex / Sexcrime",
    vocabularyClass: "B-Vocabulary (Compound Political)",
    literalMeaning: "Goodsex: joyless marital intercourse strictly for producing Party children. Sexcrime: any sexual act for pleasure, romance, or deviance.",
    ideologicalFunction: "Destroys private erotic bonds and channels repressed libido into collective political fanaticism.",
  },
  {
    term: "Unperson",
    vocabularyClass: "B-Vocabulary (Compound Political)",
    literalMeaning: "An individual who has been 'vaporized' by the Thought Police and erased from all birth, work, and historical records.",
    ideologicalFunction: "Ensures dissidents never existed in the past, present, or future—eliminating martyrdom.",
  },
];
