import json

annotations = {
    # PART 1
    "p1-c1": [
        {
            "id": "ann-p1-c1-1",
            "chapterCode": "I.1",
            "category": "language",
            "quoteToUnderline": "It was a bright cold day in April, and the clocks were striking thirteen.",
            "locationInChapter": "Opening sentence (Page 1)",
            "literaryTechnique": "Temporal discordance & Defamiliarization",
            "marginaliaText": "13 = 24-hr military time / ill omen. Natural order perverted from sentence 1. State regulates human perception of time itself.",
            "essayApplication": "Orwell immediately signals Oceania's alienation from traditional human rhythms through temporal subversion, establishing that the state regulates the very perception of reality."
        },
        {
            "id": "ann-p1-c1-2",
            "chapterCode": "I.1",
            "category": "surveillance",
            "quoteToUnderline": "BIG BROTHER IS WATCHING YOU, the caption said, while the dark eyes looked deep into his own.",
            "locationInChapter": "Hallway poster description",
            "literaryTechnique": "Panoptic personification & Hypnotic ocular gaze",
            "marginaliaText": "Direct eye gaze creates constant paranoia. Poster simulates active omnipresence; surveillance is internalized as permanent moral scrutiny.",
            "essayApplication": "Deploy to analyze Bentham's Panopticon in Ingsoc: Big Brother functions as an internalized psychological watcher that pre-empts divergence before action can occur."
        },
        {
            "id": "ann-p1-c1-3",
            "chapterCode": "I.1",
            "category": "rebellion",
            "quoteToUnderline": "His pen had slid voluptuously over the smooth paper, printing in large neat capitals—DOWN WITH BIG BROTHER",
            "locationInChapter": "The Alcove automatic writing climax",
            "literaryTechnique": "Sensory eroticism & Somatic rebellion",
            "marginaliaText": "Sensory luxury of creamy paper vs Oceania's grit. Subconscious explodes into physical revolt through the forbidden somatic pleasure of penmanship.",
            "essayApplication": "Winston's physical act of writing serves as sensory resistance: Orwell demonstrates that genuine rebellion begins in physical reclamation of the senses before it can articulate policy."
        }
    ],
    "p1-c2": [
        {
            "id": "ann-p1-c2-1",
            "chapterCode": "I.2",
            "category": "surveillance",
            "quoteToUnderline": "Almost all children nowadays were horrible... They were systematically turned into ungovernable little savages.",
            "locationInChapter": "The Parsons flat child encounter",
            "literaryTechnique": "Zoomorphic characterization & Familial subversion",
            "marginaliaText": "State usurps parental loyalty; children weaponized as extensions of the Thought Police (Hitler Youth / Pavlik Morozov historical parallel).",
            "essayApplication": "Orwell critiques totalitarian familial disruption: by reprogramming children into state spies, the Party dismantles the home as a private sanctuary."
        },
        {
            "id": "ann-p1-c2-2",
            "chapterCode": "I.2",
            "category": "psychological",
            "quoteToUnderline": "We shall meet in the place where there is no darkness.",
            "locationInChapter": "Memory of O'Brien's nocturnal voice",
            "literaryTechnique": "Prophetic dramatic irony & Chiaroscuro motif",
            "marginaliaText": "Winston interprets 'light' as spiritual freedom and truth; ironically foreshadows the unblinking white neon torture cells of Miniluv.",
            "essayApplication": "Orwell constructs chilling double-edged dramatic irony: Winston romanticizes an ambiguous promise of enlightenment, blind to the fact that the Party's 'light' is inescapable panoptic interrogation."
        }
    ],
    "p1-c3": [
        {
            "id": "ann-p1-c3-1",
            "chapterCode": "I.3",
            "category": "language",
            "quoteToUnderline": "Who controls the past controls the future: who controls the present controls the past.",
            "locationInChapter": "Reflection on Party historiography",
            "literaryTechnique": "Epigrammatic chiasmus & Sloganistic paradox",
            "marginaliaText": "Chiasmic syntax reinforces closed ideological loop. Solipsism: past has no objective existence outside state records and conditioned memory.",
            "essayApplication": "Essential for essays on historical revisionism: Orwell illustrates that absolute tyranny requires the annihilation of historical benchmarks against which current misery could be measured."
        },
        {
            "id": "ann-p1-c3-2",
            "chapterCode": "I.3",
            "category": "rebellion",
            "quoteToUnderline": "Tragedy, he perceived, belonged to the ancient time... when there was still privacy, love, and friendship.",
            "locationInChapter": "Dream of the drowning mother on the sinking ship",
            "literaryTechnique": "Elegiac tone & Philosophical binary",
            "marginaliaText": "Tragedy requires individual dignity and personal sacrifice. In Oceania, death is an administrative deletion ('vaporization'), preventing tragic catharsis.",
            "essayApplication": "Use to analyze 1984 as an anti-tragedy: Orwell argues that without autonomous personal emotion and moral agency, classical tragedy becomes impossible under modern tyranny."
        }
    ],
    "p1-c4": [
        {
            "id": "ann-p1-c4-1",
            "chapterCode": "I.4",
            "category": "language",
            "quoteToUnderline": "Day by day and almost minute by minute the past was brought up to date.",
            "locationInChapter": "Records Department (Minitrue) overview",
            "literaryTechnique": "Temporal compression & Bureaucratic irony",
            "marginaliaText": "History is not preserved; it is a malleable palimpsest continuously scraped and reinscribed to prove Party infallibility.",
            "essayApplication": "Explicate Minitrue's Records Department: historical documentation functions not as truth preservation but as an ideological technology to retroactively engineer reality."
        },
        {
            "id": "ann-p1-c4-2",
            "chapterCode": "I.4",
            "category": "language",
            "quoteToUnderline": "Comrade Ogilvy, who had never existed in the present, now existed in the past... Once produce evidence, and the past existed.",
            "locationInChapter": "Creation of the fictitious soldier Ogilvy",
            "literaryTechnique": "Satirical fabulation & Ontological absurdity",
            "marginaliaText": "Winston manufactures an ideal martyr from thin air. Ink and paper hold more ontological authority than living human beings.",
            "essayApplication": "Illustrates the frightening ease of state myth-making: Winston becomes an accomplice to the very illusion he despises, demonstrating the seductive power of creative complicity."
        }
    ],
    "p1-c5": [
        {
            "id": "ann-p1-c5-1",
            "chapterCode": "I.5",
            "category": "language",
            "quoteToUnderline": "Don't you see that the whole aim of Newspeak is to narrow the range of thought? In the end we shall make thoughtcrime literally impossible.",
            "locationInChapter": "Syme's lunch monologue in the canteen",
            "literaryTechnique": "Linguistic determinism (Sapir-Whorf Hypothesis)",
            "marginaliaText": "Linguistic surgery: vocabulary reduction eliminates cognitive capacity for heresy. If the word vanishes, the concept vanishes with it.",
            "essayApplication": "Essential for language & power prompts: Syme articulates the Sapir-Whorf hypothesis weaponized as state policy—destroying words shrinks consciousness until orthodoxy is involuntary."
        },
        {
            "id": "ann-p1-c5-2",
            "chapterCode": "I.5",
            "category": "surveillance",
            "quoteToUnderline": "Syme will be vaporized. He is too intelligent. He sees too clearly and speaks too plainly.",
            "locationInChapter": "Winston's silent diagnostic observation",
            "literaryTechnique": "Prophetic character diagnosis & Dark irony",
            "marginaliaText": "Intellectual acuity is as fatal as active rebellion. The Party demands uncritical conformity, not intellectual brilliance; orthodoxy requires blindness.",
            "essayApplication": "Demonstrates that loyalty alone cannot save Party members; intellectual acuity itself is deemed subversive because it implies independent cognition."
        }
    ],
    "p1-c6": [
        {
            "id": "ann-p1-c6-1",
            "chapterCode": "I.6",
            "category": "rebellion",
            "quoteToUnderline": "The sexual act, successfully performed, was rebellion. Desire was thoughtcrime.",
            "locationInChapter": "Diary entry on Katherine and Party celibacy",
            "literaryTechnique": "Axiomatic declaration & Political conflation",
            "marginaliaText": "Party puritanism is political, not moral. Erotic intimacy dissipates nervous energy that must be redirected into collective Hate and Big Brother worship.",
            "essayApplication": "Key thesis for sexual politics essays: Orwell argues that the totalitarian state represses libido to channel unspent sexual frustration into state-sanctioned aggressive nationalism."
        },
        {
            "id": "ann-p1-c6-2",
            "chapterCode": "I.6",
            "category": "psychological",
            "quoteToUnderline": "She had not a thought in her head that was not a slogan... he used to call her the human soundtrack.",
            "locationInChapter": "Characterization of Winston's wife Katherine",
            "literaryTechnique": "Auditory metaphor & Dehumanizing mechanical imagery",
            "marginaliaText": "Katherine as unthinking vessel of Party doctrine. The Party colonizes the mind so thoroughly that speech becomes an automated recording ('duckspeak').",
            "essayApplication": "Katherine represents the absolute victory of Party conditioning: by stripping away interiority, the state converts the citizen into a mechanical parrot incapable of authentic intimacy."
        }
    ],
    "p1-c7": [
        {
            "id": "ann-p1-c7-1",
            "category": "proles",
            "chapterCode": "I.7",
            "quoteToUnderline": "If there is hope, wrote Winston, it lies in the proles.",
            "locationInChapter": "Diary meditation on the 85% majority",
            "literaryTechnique": "Messianic political paradox",
            "marginaliaText": "85% majority unmonitored by telescreens. Physical vitality intact, but politically dormant ('like cattle'). Hope remains purely theoretical.",
            "essayApplication": "Crucial quote for class and revolution: Winston recognizes the democratic potential of the working masses, while highlighting their tragic lack of political consciousness."
        },
        {
            "id": "ann-p1-c7-2",
            "category": "psychological",
            "chapterCode": "I.7",
            "quoteToUnderline": "The party told you to reject the evidence of your eyes and ears. It was their final, most essential command.",
            "locationInChapter": "Reflection on the photograph of Jones, Aaronson, and Rutherford",
            "literaryTechnique": "Epistemological ultimatum & Sensory invalidation",
            "marginaliaText": "Solipsism enacted: empirical reality subordinated to Party dogma. Faith in one's own sensory perceptions is the ultimate rebellious act.",
            "essayApplication": "Analyze the destruction of objective truth: Orwell warns that totalitarian regimes culminate in demanding the total surrender of empirical sensory verification."
        },
        {
            "id": "ann-p1-c7-3",
            "category": "psychological",
            "chapterCode": "I.7",
            "quoteToUnderline": "Freedom is the freedom to say that two plus two make four. If that is granted, all else follows.",
            "locationInChapter": "Climax of Chapter 7 diary entry",
            "literaryTechnique": "Fundamental epistemic axiom & Minimalist rhetoric",
            "marginaliaText": "Baseline empirical anchor. Basic mathematical truth represents the irreducible foundation of human liberty against totalitarian subjectivity.",
            "essayApplication": "The central philosophical thesis of 1984: Winston equates human freedom with the existence of objective mathematical facts independent of state consensus."
        }
    ],
    "p1-c8": [
        {
            "id": "ann-p1-c8-1",
            "category": "rebellion",
            "chapterCode": "I.8",
            "quoteToUnderline": "What appealed to him about it was not so much its beauty as the air it seemed to possess of belonging to an age quite different from the present one.",
            "locationInChapter": "Mr. Charrington's antique shop / Coral Paperweight",
            "literaryTechnique": "Anachronistic object symbolism",
            "marginaliaText": "Paperweight = tangible remnant of pre-revolutionary history. Uselessness is its value—it serves no utilitarian Party purpose.",
            "essayApplication": "Explicate the coral paperweight as a symbolic sanctuary: the fragile glass bubble encapsulates an uncorrupted past, mirroring Winston's desperate search for historical roots."
        },
        {
            "id": "ann-p1-c8-2",
            "category": "language",
            "chapterCode": "I.8",
            "quoteToUnderline": "'Oranges and lemons, say the bells of St Clement's!'... It was curious that the rhyme had a kind of nostalgia about it.",
            "locationInChapter": "Charrington recites the antique nursery rhyme",
            "literaryTechnique": "Nursery rhyme motif & Auditory nostalgia",
            "marginaliaText": "Fragmented rhyme traces erased London topography. Nursery rhymes survive as verbal fossils of banned religion and community.",
            "essayApplication": "Analyze the recurring St. Clement's rhyme as auditory marginalia: the progressive piecing together of the rhyme tracks Winston's entrapment by Charrington and the Thought Police."
        }
    ],

    # PART 2
    "p2-c1": [
        {
            "id": "ann-p2-c1-1",
            "category": "rebellion",
            "chapterCode": "II.1",
            "quoteToUnderline": "At the sight of the words I love you the desire to stay alive had welled up in him.",
            "locationInChapter": "Winston unrolls Julia's scrap of paper in his cubicle",
            "literaryTechnique": "Visceral affective juxtaposition",
            "marginaliaText": "Three monosyllables shatter Winston's fatalistic death-wish. Love instantly restores biological self-preservation against Party nihilism.",
            "essayApplication": "Demonstrates the subversive force of authentic personal affection: Julia's confession re-anchors Winston to physical life, transforming academic heresy into active resistance."
        },
        {
            "id": "ann-p2-c1-2",
            "category": "surveillance",
            "chapterCode": "II.1",
            "quoteToUnderline": "To keep your face expressionless was not difficult... but you could not control the beating of your heart, and the telescreen was quite delicate enough to pick it up.",
            "locationInChapter": "Winston concealing his shock at his desk",
            "literaryTechnique": "Somatic vulnerability & Hyperbolic surveillance",
            "marginaliaText": "Telescreen monitors biological rhythms. The body itself threatens betrayal (facecrime / biometrics).",
            "essayApplication": "Orwell exposes the terrifying reach of panoptic surveillance: even involuntary autonomic reflexes (heart rate, breathing) become potential evidence of political treason."
        }
    ],
    "p2-c2": [
        {
            "id": "ann-p2-c2-1",
            "category": "rebellion",
            "chapterCode": "II.2",
            "quoteToUnderline": "Their embrace had been a battle, the climax a victory. It was a blow struck against the Party. It was a political act.",
            "locationInChapter": "The wooded glade in the Golden Country",
            "literaryTechnique": "Militarized erotic metaphor",
            "marginaliaText": "Sex inverted into warfare. Physical pleasure weaponized as direct counter-attack against Ingsoc's emotional monopoly.",
            "essayApplication": "Crucial for essays on sexuality as resistance: Orwell explicitly politicizes the orgasm, defining sexual desire as an insurrectionary strike against totalitarian emotional control."
        },
        {
            "id": "ann-p2-c2-2",
            "category": "rebellion",
            "chapterCode": "II.2",
            "quoteToUnderline": "With its graceful curve, the song seemed to have no audience except the woodland itself... A thrush had alighted on a bough not five yards away.",
            "locationInChapter": "The thrush singing in the woods",
            "literaryTechnique": "Pastoral symbolism & Lyric counterpoint",
            "marginaliaText": "The bird sings with no utilitarian motive and no audience. Pure gratuitous beauty—the absolute antithesis of Party utilitarian propaganda.",
            "essayApplication": "Contrast the thrush's spontaneous lyricism with Minitrue's synthetic 'Hate songs': nature retains an authentic aesthetic freedom that Oceania cannot mechanize."
        }
    ],
    "p2-c3": [
        {
            "id": "ann-p2-c3-1",
            "category": "rebellion",
            "chapterCode": "II.3",
            "quoteToUnderline": "She had become a physical necessity... She spent an astonishing amount of time in attending lectures and demonstrations, distributing literature for the Junior Anti-Sex League.",
            "locationInChapter": "Julia's strategy of outward orthodoxy",
            "literaryTechnique": "Pragmatic irony & Camouflage motif",
            "marginaliaText": "Julia's survival tactic: display extreme outward orthodoxy to carve out private spaces of hedonism. Contrast Winston's philosophical angst.",
            "essayApplication": "Compare Winston and Julia's rebellion: where Winston seeks intellectual and historical vindication, Julia wages an immediate, practical insurrection of the senses."
        },
        {
            "id": "ann-p2-c3-2",
            "category": "psychological",
            "chapterCode": "II.3",
            "quoteToUnderline": "When you make love you're using up energy; and afterwards you feel happy and don't give a damn for anything. They can't bear you to feel like that.",
            "locationInChapter": "Julia's explanation of Party sexual repression",
            "literaryTechnique": "Psychological diagnostic clarity",
            "marginaliaText": "Julia intuitively grasps the hydraulic theory of fascism: sexual deprivation fuels hysteria, military parades, and Big Brother idolatry.",
            "essayApplication": "Julia provides the definitive political diagnosis of Oceania's puritanism: sublimated sexual energy is converted into military frenzy and mass hysteria during Hate Week."
        }
    ],
    "p2-c4": [
        {
            "id": "ann-p2-c4-1",
            "category": "rebellion",
            "chapterCode": "II.4",
            "quoteToUnderline": "The paperweight was the room he was in, and the coral was Julia's life and his own, fixed in a sort of eternity at the heart of the crystal.",
            "locationInChapter": "Looking into the glass paperweight in the rented room",
            "literaryTechnique": "Microcosmic metaphor & Spatial romanticism",
            "marginaliaText": "Paperweight encapsulates their temporary haven. Fragility of glass mirrors fragility of their sanctuary above the junk shop.",
            "essayApplication": "Analyze spatial symbolism: Winston imagines the rented room as an impenetrable glass sphere, tragically misjudging the transparent and vulnerable nature of their sanctuary."
        },
        {
            "id": "ann-p2-c4-2",
            "category": "rebellion",
            "chapterCode": "II.4",
            "quoteToUnderline": "She had painted her face... With just a few dabs of colour in the right places she had become not only very much prettier, but, above all, far more feminine.",
            "locationInChapter": "Julia applies contraband makeup in the bedroom",
            "literaryTechnique": "Sensory visual reclamation & Gender defiance",
            "marginaliaText": "Makeup defies the Party's androgynous uniform. Cosmetic adornment reclaims individual female beauty and erotic identity from the Junior Anti-Sex League.",
            "essayApplication": "Julia's application of makeup constitutes an act of aesthetic mutiny: she repudiates the asexual uniformity imposed by the state to celebrate embodied femininity."
        }
    ],
    "p2-c5": [
        {
            "id": "ann-p2-c5-1",
            "category": "language",
            "chapterCode": "II.5",
            "quoteToUnderline": "Syme had ceased to exist: he had never existed.",
            "locationInChapter": "Opening sentence of Chapter 5",
            "literaryTechnique": "Chilling syntactic brevity & Unperson reality",
            "marginaliaText": "Fulfillment of prophecy from I.5. Erasure from records followed by erasure from speech. Ultimate realization of 'unperson'.",
            "essayApplication": "Orwell's abrupt, matter-of-fact syntax demonstrates the chilling normalization of state murder: Syme is erased without ceremony, illustrating the absolute mutability of human existence."
        },
        {
            "id": "ann-p2-c5-2",
            "category": "psychological",
            "chapterCode": "II.5",
            "quoteToUnderline": "The preparations for Hate Week... The town had a curiously sour, ferocious look.",
            "locationInChapter": "Atmospheric buildup to Hate Week in London",
            "literaryTechnique": "Synaesthetic atmosphere & Mass hysteria imagery",
            "marginaliaText": "Manufactured collective frenzy. The entire urban space is re-engineered into an amphitheater of rage against Eurasian / Eastasian effigies.",
            "essayApplication": "Examine Hate Week as totalitarian ritual: Orwell shows how the state engineers synthetic collective frenzy to subsume individual alienation into aggressive militarism."
        }
    ],
    "p2-c6": [
        {
            "id": "ann-p2-c6-1",
            "category": "surveillance",
            "chapterCode": "II.6",
            "quoteToUnderline": "The conspiracy that he had dreamed of did exist, and he had reached the outer edges of it.",
            "locationInChapter": "Winston's reaction to O'Brien's invitation in the hallway",
            "literaryTechnique": "Tragic hubris & Dramatic irony",
            "marginaliaText": "Winston mistakes an elaborate surveillance sting for brotherhood. His desperation to believe blinds him to obvious Thought Police entrapment.",
            "essayApplication": "Illustrates the psychological vulnerability of dissidents: Winston's intense craving for solidarity blinds him to O'Brien's Machiavellian orchestration of his downfall."
        },
        {
            "id": "ann-p2-c6-2",
            "category": "language",
            "chapterCode": "II.6",
            "quoteToUnderline": "He had the sensation of stepping into the dampness of a grave... but he had always known that the grave was there and waiting for him.",
            "locationInChapter": "Winston accepting O'Brien's home address",
            "literaryTechnique": "Thanatotic imagery & Fatalistic motif",
            "marginaliaText": "'We are the dead' realized. Winston views his rebellion as a delayed execution; fatalism accelerates his walking into O'Brien's trap.",
            "essayApplication": "Winston's pervasive fatalism undermines his survival: Orwell reveals that accepting one's inevitable doom paralyzes defensive instincts, leading Winston willingly into the spider's web."
        }
    ],
    "p2-c7": [
        {
            "id": "ann-p2-c7-1",
            "category": "rebellion",
            "chapterCode": "II.7",
            "quoteToUnderline": "The proles had stayed human. They had not become hardened inside. They had held on to the primitive emotions.",
            "locationInChapter": "Winston recalling his mother sharing the chocolate ration",
            "literaryTechnique": "Moral binary & Humanist affirmation",
            "marginaliaText": "'Primitive emotions' = authentic loyalty, grief, familial love. Party members are emotional cripples; proles retain genuine humanity.",
            "essayApplication": "Orwell's humanist thesis: true humanity resides not in intellectual doctrine but in uncalculated loyalty, spontaneous empathy, and the endurance of basic familial love."
        },
        {
            "id": "ann-p2-c7-2",
            "category": "rebellion",
            "chapterCode": "II.7",
            "quoteToUnderline": "They can make you say anything—anything—but they can't make you believe it. They can't get inside you.",
            "locationInChapter": "Julia and Winston's vow before visiting O'Brien",
            "literaryTechnique": "Cruel dramatic irony & Epistemological hubris",
            "marginaliaText": "Winston and Julia's tragic miscalculation. They believe the inner heart is impregnable; Part 3 will prove the Party can rewrite love itself.",
            "essayApplication": "Essential tragic climax for Part 2: their defiant assumption that the inner sanctuary of the mind cannot be conquered sets up the horrifying psychological deconstruction in Miniluv."
        }
    ],
    "p2-c8": [
        {
            "id": "ann-p2-c8-1",
            "category": "power_torture",
            "chapterCode": "II.8",
            "quoteToUnderline": "You are prepared to throw sulphuric acid in a child's face? 'Yes.'",
            "locationInChapter": "The Brotherhood induction catechism at O'Brien's flat",
            "literaryTechnique": "Moral corruption & Catechistic ritual",
            "marginaliaText": "Winston readily agrees to commit atrocities in the name of the Brotherhood. Shows how rebellion can mirror the moral barbarism of the regime it opposes.",
            "essayApplication": "Orwell's warning regarding ideological fanatacism: in agreeing to murder children for the Brotherhood, Winston adopts the Party's own doctrine that ends justify monstrous means."
        },
        {
            "id": "ann-p2-c8-2",
            "category": "surveillance",
            "chapterCode": "II.8",
            "quoteToUnderline": "Yes, said O'Brien, we can turn it off. We have that privilege.",
            "locationInChapter": "O'Brien switching off the telescreen in his luxurious flat",
            "literaryTechnique": "Class privilege symbol & Panoptic hierarchy",
            "marginaliaText": "The ultimate luxury in Oceania is privacy. Inner Party members possess the power to blind the panopticon at will.",
            "essayApplication": "Highlights the stark class hypocrisy of Ingsoc: privacy is revealed as the ultimate oligarchic luxury, reserved exclusively for the elite rulers who enforce universal exposure."
        }
    ],
    "p2-c9": [
        {
            "id": "ann-p2-c9-1",
            "category": "psychological",
            "chapterCode": "II.9",
            "quoteToUnderline": "The primary aim of modern warfare... is to use up the products of the machine without raising the general standard of living.",
            "locationInChapter": "Goldstein's Book: Chapter 3 (War is Peace)",
            "literaryTechnique": "Marxist political economic critique",
            "marginaliaText": "War economy preserves hierarchy. Surplus goods destroyed in perpetual stalemate so the lower classes never become educated or comfortable.",
            "essayApplication": "The core socio-economic thesis of 1984: Orwell demonstrates that permanent war is not waged to conquer foreign territory, but to consume industrial surplus and preserve domestic hierarchy."
        },
        {
            "id": "ann-p2-c9-2",
            "category": "psychological",
            "chapterCode": "II.9",
            "quoteToUnderline": "Doublethink means the power of holding two contradictory beliefs in one's mind simultaneously, and accepting both of them.",
            "locationInChapter": "Goldstein's Book: Chapter 1 (Ignorance is Strength)",
            "literaryTechnique": "Definitional paradox & Epistemological deconstruction",
            "marginaliaText": "Conscious deception while retaining firmness of purpose. Totalitarian mind control requires active, deliberate cognitive dissonance.",
            "essayApplication": "The central ideological mechanism of Ingsoc: doublethink enables the ruling elite to maintain absolute ideological fanaticism while executing cynical, calculated policy reversals."
        }
    ],
    "p2-c10": [
        {
            "id": "ann-p2-c10-1",
            "category": "surveillance",
            "chapterCode": "II.10",
            "quoteToUnderline": "'You are the dead,' said an iron voice behind them.",
            "locationInChapter": "The voice from behind the engraving of St Clement's Dane",
            "literaryTechnique": "Chilling peripeteia & Auditory shock",
            "marginaliaText": "The haven was a panoptic stage the whole time. Charrington's telescreen unmasks their domestic illusion; the trap snaps shut.",
            "essayApplication": "The devastating turning point of the novel: the iron voice shatters their romantic pastoral retreat, proving that every moment of their freedom was monitored, curated, and permitted by the state."
        },
        {
            "id": "ann-p2-c10-2",
            "category": "rebellion",
            "chapterCode": "II.10",
            "quoteToUnderline": "Someone had picked up the glass paperweight from the table and smashed it to pieces on the hearth-stone. The fragment of coral... rolled across the mat. How small, thought Winston, how small it always was!",
            "locationInChapter": "Thought Police officer smashing the paperweight",
            "literaryTechnique": "Shattered symbol & Anti-romantic disenchantment",
            "marginaliaText": "Paperweight shattered = private world obliterated. Reality violently intrudes on Winston's romantic historical illusion.",
            "essayApplication": "Explicate the shattering of the paperweight: Orwell brutally deconstructs Winston's aestheticized illusion of resistance, demonstrating the defenselessness of individual memory against state violence."
        }
    ],

    # PART 3
    "p3-c1": [
        {
            "id": "ann-p3-c1-1",
            "category": "power_torture",
            "chapterCode": "III.1",
            "quoteToUnderline": "In the Ministry of Love there were no windows. His cell might be at the heart of the building or against its outer wall... In any case it was a place where there was no darkness.",
            "locationInChapter": "Winston's windowless, high-ceilinged white cell",
            "literaryTechnique": "Spatial claustrophobia & Fulfilled prophecy",
            "marginaliaText": "Fulfillment of O'Brien's dream from I.2. 'No darkness' = eternal, blinding fluorescent white glare designed to disorient circadian rhythms.",
            "essayApplication": "Orwell fulfills Winston's prophetic dream with horrifying irony: the 'place where there is no darkness' is revealed as an artificial, sensory-depriving torture chamber where the concept of time is erased."
        },
        {
            "id": "ann-p3-c1-2",
            "category": "surveillance",
            "chapterCode": "III.1",
            "quoteToUnderline": "'It was my little girl,' said Parsons with a sort of doleful pride. 'She listened at the keyhole... said Thoughtcrime! in my sleep.'",
            "locationInChapter": "Parsons in the cell after being denounced",
            "literaryTechnique": "Grotesque tragicomedy & Fanatical pathos",
            "marginaliaText": "Parsons is proud of his child denouncing him to death. The ultimate triumph of state conditioning: the victim praises the mechanism of his own annihilation.",
            "essayApplication": "Parsons represents the grotesque zenith of totalitarian indoctrination: Orwell demonstrates that orthodoxy can lead a father to take filial pride in his daughter sentencing him to the gallows."
        }
    ],
    "p3-c2": [
        {
            "id": "ann-p3-c2-1",
            "category": "psychological",
            "chapterCode": "III.2",
            "quoteToUnderline": "How can I help it? How can I help seeing what is in front of my eyes? Two and two are four. 'Sometimes, Winston. Sometimes they are five. Sometimes they are three.'",
            "locationInChapter": "O'Brien adjusting the dial on the torture dial",
            "literaryTechnique": "Dialectical torture & Philosophical coercion",
            "marginaliaText": "Physical pain breaks down empirical cognition. O'Brien does not want outward conformity; he demands genuine, internal surrender of mathematical truth.",
            "essayApplication": "Crucial quote for the breakdown of empiricism: O'Brien demonstrates that under excruciating physical torture, the human mind will surrender the most fundamental objective truths to stop pain."
        },
        {
            "id": "ann-p3-c2-2",
            "category": "power_torture",
            "chapterCode": "III.2",
            "quoteToUnderline": "We do not destroy the heretic because he resists us... We convert him, we capture his inner mind, we reshape him.",
            "locationInChapter": "O'Brien contrasting Ingsoc with the Spanish Inquisition",
            "literaryTechnique": "Theological perversion & Totalitarian teleology",
            "marginaliaText": "The Party creates no martyrs. Unlike the Inquisition or Nazi Germany, Ingsoc demands the heretic's genuine intellectual and emotional love before execution.",
            "essayApplication": "Contrast Ingsoc with historical dictatorships: Orwell argues that modern totalitarianism is uniquely insidious because it refuses to allow martyrs, demanding total internal spiritual conversion before liquidation."
        }
    ],
    "p3-c3": [
        {
            "id": "ann-p3-c3-1",
            "category": "power_torture",
            "chapterCode": "III.3",
            "quoteToUnderline": "The Party seeks power entirely for its own sake. We are not interested in the good of others; we are interested solely in power.",
            "locationInChapter": "O'Brien answering the fundamental question 'WHY'",
            "literaryTechnique": "Naked political nihilism & Rhetorical candour",
            "marginaliaText": "Rejection of all ideological pretense. Power is not a means to an end; power IS the end. Pure, unadorned domination.",
            "essayApplication": "The ultimate thematic revelation of the novel: O'Brien strips away all utopian rationalizations, exposing that the Party's sole, unadulterated objective is the perpetual exercise of absolute power."
        },
        {
            "id": "ann-p3-c3-2",
            "category": "power_torture",
            "chapterCode": "III.3",
            "quoteToUnderline": "If you want a picture of the future, imagine a boot stamping on a human face—forever.",
            "locationInChapter": "O'Brien's vision of Oceania's eternal trajectory",
            "literaryTechnique": "Visceral zoomorphic emblem & Dystopian apotheosis",
            "marginaliaText": "The defining emblem of totalitarianism. Power defined strictly as inflicting pain and degradation on the vulnerable.",
            "essayApplication": "The central metaphor of 1984: Orwell crystallizes his political warning into a single terrifying image, defining totalitarianism as the institutionalized, perpetual infliction of suffering for its own sake."
        },
        {
            "id": "ann-p3-c3-3",
            "category": "power_torture",
            "chapterCode": "III.3",
            "quoteToUnderline": "A bowed, grey-coloured, skeleton-like thing was coming towards him... 'You are the last man,' said O'Brien.",
            "locationInChapter": "Winston looking into the three-sided mirror",
            "literaryTechnique": "Grotesque somatic decay & Humanist funeral",
            "marginaliaText": "Winston physically confronted with his own ruin: rotting teeth, baldness, wasted limbs. The physical degradation mirrors the extinction of humanistic individualism.",
            "essayApplication": "Explicate the mirror scene as a symbolic autopsy of the humanist subject: Winston's physical decomposition symbolizes the irreversible destruction of individual autonomy in the panoptic state."
        }
    ],
    "p3-c4": [
        {
            "id": "ann-p3-c4-1",
            "category": "psychological",
            "chapterCode": "III.4",
            "quoteToUnderline": "He wrote on the slate: FREEDOM IS SLAVERY... TWO AND TWO MAKE FIVE. God is Power.",
            "locationInChapter": "Winston practicing crimestop on the white slate",
            "literaryTechnique": "Auto-indoctrination & Intellectual capitulation",
            "marginaliaText": "Winston embraces 'crimestop'—the protective stupidity that instinctively stops short of dangerous thoughts. Intellectual surrender complete.",
            "essayApplication": "Demonstrates the mechanism of self-administered doublethink: Winston actively cultivates voluntary intellectual blindness ('crimestop') to insulate himself from further pain."
        },
        {
            "id": "ann-p3-c4-2",
            "category": "rebellion",
            "chapterCode": "III.4",
            "quoteToUnderline": "Julia! Julia! Julia, my love! Julia!... In an intellectual sense he had surrendered, but his heart had stayed intact.",
            "locationInChapter": "Winston's involuntary night-cry in his sleep",
            "literaryTechnique": "Subconscious revolt & Emotional relapse",
            "marginaliaText": "The last bastion of human rebellion: emotional attachment. His intellectual mind has yielded, but his subconscious still loves Julia. Prompts Room 101.",
            "essayApplication": "Illustrates the hierarchy of human loyalty: Orwell shows that emotional devotion outlasts intellectual conviction, forcing the Party to deploy the ultimate terror of Room 101 to eradicate it."
        }
    ],
    "p3-c5": [
        {
            "id": "ann-p3-c5-1",
            "category": "power_torture",
            "chapterCode": "III.5",
            "quoteToUnderline": "You asked me once, said O'Brien, what was in Room 101. I told you that you knew the answer already. Everyone knows it. The thing that is in Room 101 is the worst thing in the world.",
            "locationInChapter": "O'Brien explaining the subjective nature of Room 101",
            "literaryTechnique": "Psychological tailoring & Absolute phobia",
            "marginaliaText": "Room 101 is subjective: tailored to each victim's deepest unendurable terror. Fear weaponized to snap the final thread of moral integrity.",
            "essayApplication": "Analyze the subjective horror of Room 101: the Party does not rely on generic pain, but weaponizes each individual's most primal, unendurable phobia to shatter moral resistance."
        },
        {
            "id": "ann-p3-c5-2",
            "category": "power_torture",
            "chapterCode": "III.5",
            "quoteToUnderline": "Do it to Julia! Do it to Julia! Not me! Julia! I don't care what you do to her. Tear her face off, strip her to the bones. Not me! Julia! Not me!",
            "locationInChapter": "The cage of carnivorous rats positioned against Winston's face",
            "literaryTechnique": "Somatic horror & Moral self-annihilation",
            "marginaliaText": "The ultimate betrayal. Winston interposes Julia's body between himself and the rats. Love is broken; the core self is extinguished.",
            "essayApplication": "The spiritual climax of 1984: under the terror of visceral mutilation, Winston voluntarily transfers the torture to the person he loved, extinguishing the last spark of human nobility within himself."
        }
    ],
    "p3-c6": [
        {
            "id": "ann-p3-c6-1",
            "category": "rebellion",
            "chapterCode": "III.6",
            "quoteToUnderline": "I betrayed you, she said baldly. 'I betrayed you,' he said... 'All you care about is yourself,' he echoed. 'All you care about is yourself.'",
            "locationInChapter": "The frosty park encounter with Julia",
            "literaryTechnique": "Emotional deadness & Laconic dialogue",
            "marginaliaText": "Physical reunion stripped of all eroticism or warmth. Julia's body feels stiff, like a corpse. Betrayal has permanently severed human connection.",
            "essayApplication": "Examine the tragic park encounter: Orwell shows that betrayal in Room 101 is not merely verbal but existential—it poisons the capacity for human affection forever."
        },
        {
            "id": "ann-p3-c6-2",
            "category": "psychological",
            "chapterCode": "III.6",
            "quoteToUnderline": "He gazed up at the enormous face. Forty years it had taken him to learn what kind of smile was hidden beneath the dark moustache... He loved Big Brother.",
            "locationInChapter": "Final paragraph at the Chestnut Tree Café",
            "literaryTechnique": "Devastating anticlimax & Emotional assimilation",
            "marginaliaText": "The final surrender. Not sullen obedience, but genuine, weeping adore of his destroyer. Totalitarianism achieves complete spiritual victory.",
            "essayApplication": "The devastating conclusion of 1984: Orwell refuses a romantic martyrdom, showing that the Party's ultimate triumph is not executing dissidents, but breaking them until they sincerely adore their oppressor."
        }
    ],

    # APPENDIX
    "app": [
        {
            "id": "ann-app-1",
            "category": "language",
            "chapterCode": "APP",
            "quoteToUnderline": "Newspeak was the official language of Oceania and had been devised to meet the ideological needs of Ingsoc.",
            "locationInChapter": "Opening sentence of the Appendix",
            "literaryTechnique": "Past-tense retrospective & Academic meta-narrative",
            "marginaliaText": "Notice 'WAS' in past tense! Written from an era AFTER Oceania's fall. The Appendix is Orwell's coded testament of hope.",
            "essayApplication": "Essential for high-scoring essays on Orwell's ending: the past-tense narration of the Appendix provides scholarly proof that Oceania was ultimately ephemeral and historical sanity was restored."
        },
        {
            "id": "ann-app-2",
            "category": "language",
            "chapterCode": "APP",
            "quoteToUnderline": "The B vocabulary consisted of words which had been deliberately constructed for political purposes... None of them was ideologically neutral.",
            "locationInChapter": "Section on the B-Vocabulary (Compound Words)",
            "literaryTechnique": "Linguistic weaponization & Semantic packaging",
            "marginaliaText": "Compound words ('goodthink', 'crimethink') bypass critical evaluation, packaging entire political orthodoxies into punchy, unreflective sounds.",
            "essayApplication": "Analyze Newspeak's B-Vocabulary as thought-suppressing technology: Orwell demonstrates how totalitarian regimes compound slogans into blunt verbal weapons to prevent nuanced political analysis."
        }
    ]
}

# Generate TypeScript file
ts_code = '''// =====================================================================
// 1984 COMPREHENSIVE BOOK MARGINALIA & COLOR-CODED EXAM ANNOTATIONS
// Systematic quotes, literary techniques, exact book margin notes & essay links
// =====================================================================

export type AnnotationCategory =
  | "surveillance"   // 🔴 Red: Surveillance, Telescreens, Panopticon, Thought Police
  | "psychological"  // 🟣 Purple: Doublethink, 2+2=5, Reality Control, Hate Week
  | "language"       // 🔵 Cyan: Newspeak, Syme, Historical Revisionism, Memory Holes
  | "rebellion"      // 🟡 Gold/Amber: The Diary, Julia, Golden Country, Paperweight
  | "proles"         // 🟢 Emerald: The Proles, Class Division, Washerwoman, Hope
  | "power_torture"; // 🩸 Rose/Crimson: Ministry of Love, O'Brien, Room 101, Power

export interface AnnotationThemeConfig {
  id: AnnotationCategory;
  name: string;
  badgeLabel: string;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  dotColor: string;
  description: string;
}

export const ANNOTATION_THEMES: Record<AnnotationCategory, AnnotationThemeConfig> = {
  surveillance: {
    id: "surveillance",
    name: "Surveillance & Panopticon",
    badgeLabel: "🔴 SURVEILLANCE & PANOPTICON",
    color: "#EF4444",
    badgeBg: "rgba(239, 68, 68, 0.15)",
    badgeBorder: "rgba(239, 68, 68, 0.4)",
    badgeText: "#FCA5A5",
    dotColor: "#EF4444",
    description: "Telescreens, Big Brother posters, Thought Police, lack of privacy & internalized observation",
  },
  psychological: {
    id: "psychological",
    name: "Doublethink & Mind Control",
    badgeLabel: "🟣 DOUBLETHINK & MIND CONTROL",
    color: "#A855F7",
    badgeBg: "rgba(168, 85, 247, 0.15)",
    badgeBorder: "rgba(168, 85, 247, 0.4)",
    badgeText: "#D8B4FE",
    dotColor: "#A855F7",
    description: "Cognitive dissonance, 2+2=5, reality control, collective hysteria & manufactured loyalty",
  },
  language: {
    id: "language",
    name: "Newspeak & Historical Erasure",
    badgeLabel: "🔵 NEWSPEAK & HISTORICAL ERASURE",
    color: "#06B6D4",
    badgeBg: "rgba(6, 182, 212, 0.15)",
    badgeBorder: "rgba(6, 182, 212, 0.4)",
    badgeText: "#67E8F9",
    dotColor: "#06B6D4",
    description: "Destruction of vocabulary, Minitrue records rectification, memory holes & mutability of the past",
  },
  rebellion: {
    id: "rebellion",
    name: "Rebellion & Sensory Defiance",
    badgeLabel: "🟡 REBELLION & SENSORY DEFIANCE",
    color: "#F59E0B",
    badgeBg: "rgba(245, 158, 11, 0.15)",
    badgeBorder: "rgba(245, 158, 11, 0.4)",
    badgeText: "#FDE68A",
    dotColor: "#F59E0B",
    description: "The diary, sexual intimacy, the antique paperweight, sensory memory & Golden Country",
  },
  proles: {
    id: "proles",
    name: "The Proles & Class Oppression",
    badgeLabel: "🟢 THE PROLES & CLASS OPPRESSION",
    color: "#10B981",
    badgeBg: "rgba(16, 185, 129, 0.15)",
    badgeBorder: "rgba(16, 185, 129, 0.4)",
    badgeText: "#6EE7B7",
    dotColor: "#10B981",
    description: "85% majority, physical vitality, washerwoman singing, lottery distraction & unawakened hope",
  },
  power_torture: {
    id: "power_torture",
    name: "Absolute Power & Dehumanization",
    badgeLabel: "🩸 ABSOLUTE POWER & DEHUMANIZATION",
    color: "#F43F5E",
    badgeBg: "rgba(244, 63, 94, 0.15)",
    badgeBorder: "rgba(244, 63, 94, 0.4)",
    badgeText: "#FDA4AF",
    dotColor: "#F43F5E",
    description: "Miniluv brutality, Room 101 phobias, O'Brien's boot on a human face & psychological annihilation",
  },
};

export interface ChapterAnnotation {
  id: string;
  chapterCode: string;
  category: AnnotationCategory;
  quoteToUnderline: string;
  locationInChapter: string;
  literaryTechnique: string;
  marginaliaText: string;
  essayApplication: string;
}

export const CHAPTER_ANNOTATIONS: Record<string, ChapterAnnotation[]> = ''' + json.dumps(annotations, indent=2) + ''';

export function getAnnotationsForChapter(chapterId: string): ChapterAnnotation[] {
  return CHAPTER_ANNOTATIONS[chapterId] || [];
}

export function getAllAnnotations(): ChapterAnnotation[] {
  return Object.values(CHAPTER_ANNOTATIONS).flat();
}
'''

with open("/Users/ayaanatif/.gemini/antigravity/scratch/orwell-1984-liquid-shell/src/data/chapterAnnotations.ts", "w") as f:
    f.write(ts_code)

print("Successfully generated src/data/chapterAnnotations.ts with all 24 chapters + appendix!")
