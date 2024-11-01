import { NOTES } from '../data/scales';
import { ChordEntry } from '../types/music';

type ScaleDegrees = {
  [key: string]: string[];
};

export const generateScale = (root: string, intervals: number[]): string[] => {
  const scale: string[] = [];
  let noteIndex = NOTES.indexOf(root);
  
  for (const interval of intervals) {
    scale.push(NOTES[noteIndex % 12]);
    noteIndex += interval;
  }
  
  return scale;
};

export const getScaleDegrees = (scaleType: string): string[] => {
  const degrees: ScaleDegrees = {
    "Ionian (Major)": ["1", "2", "3", "4", "5", "6", "7"],
    "Dorian": ["1", "2", "♭3", "4", "5", "6", "♭7"],
    "Phrygian": ["1", "♭2", "♭3", "4", "5", "♭6", "♭7"],
    "Lydian": ["1", "2", "3", "♯4", "5", "6", "7"],
    "Mixolydian": ["1", "2", "3", "4", "5", "6", "♭7"],
    "Aeolian (Natural Minor)": ["1", "2", "♭3", "4", "5", "♭6", "♭7"],
    "Locrian": ["1", "♭2", "♭3", "4", "♭5", "♭6", "♭7"],
    // Harmonic Minor and its modes
    "Harmonic Minor": ["1", "2", "♭3", "4", "5", "♭6", "7"],
    "Locrian ♮6": ["1", "♭2", "♭3", "4", "♭5", "6", "♭7"],
    "Ionian #5": ["1", "2", "3", "4", "♯5", "6", "7"],
    "Dorian #4": ["1", "2", "♭3", "♯4", "5", "6", "♭7"],
    "Phrygian Dominant": ["1", "♭2", "3", "4", "5", "♭6", "♭7"],
    "Lydian #2": ["1", "♯2", "3", "♯4", "5", "6", "7"],
    "UltraLocrian": ["1", "♭2", "♭3", "♭4", "♭5", "♭6", "♭7"],
    // Melodic Minor and its modes
    "Melodic Minor (Ascending)": ["1", "2", "♭3", "4", "5", "6", "7"],
    "Dorian ♭2": ["1", "♭2", "♭3", "4", "5", "6", "♭7"],
    "Lydian Augmented": ["1", "2", "3", "♯4", "♯5", "6", "7"],
    "Lydian Dominant": ["1", "2", "3", "♯4", "5", "6", "♭7"],
    "Mixolydian ♭6": ["1", "2", "3", "4", "5", "♭6", "♭7"],
    "Aeolian ♭5": ["1", "2", "♭3", "4", "♭5", "♭6", "♭7"],
    "Altered Scale (Super Locrian)": ["1", "♭2", "♭3", "♭4", "♭5", "♭6", "♭7"],
    // Other Exotic Scales
    "Hungarian Minor": ["1", "2", "♭3", "♯4", "5", "♭6", "7"],
    "Hungarian Major": ["1", "♯2", "3", "♯4", "5", "6", "♭7"],
    "Neapolitan Major": ["1", "♭2", "♭3", "4", "5", "6", "7"],
    "Neapolitan Minor": ["1", "♭2", "♭3", "4", "5", "♭6", "7"],
    "Pentatonic Major": ["1", "2", "3", "5", "6"],
    "Pentatonic Minor": ["1", "♭3", "4", "5", "♭7"],
    "Blues Scale": ["1", "♭3", "4", "♭5", "5", "♭7"]
  };

  return degrees[scaleType] || ["1", "2", "3", "4", "5", "6", "7"];
};

export const generateChordScale = (scale: string[]): ChordEntry[] => {
  const romanNumerals = ["I", "ii", "iii", "IV", "V", "vi", "vii°"];
  const qualities = ["Maj7", "m7", "m7", "Maj7", "7", "m7", "m7b5"];
  
  return scale.map((root, i) => {
    const third = scale[(i + 2) % scale.length];
    const fifth = scale[(i + 4) % scale.length];
    const seventh = scale[(i + 6) % scale.length];
    const notes = [root, third, fifth, seventh];
    
    return {
      name: `${root}${qualities[i]} / ${romanNumerals[i]}${qualities[i]}`,
      symbol: `${root}${qualities[i]}`,
      rootPosition: `${root}-${third}-${fifth}-${seventh}`,
      inversions: [
        `${third}-${fifth}-${seventh}-${root} (1st Inv)`,
        `${fifth}-${seventh}-${root}-${third} (2nd Inv)`,
        `${seventh}-${root}-${third}-${fifth} (3rd Inv)`
      ],
      notes: notes
    };
  });
};

interface ExtendedChord {
  name: string;
  notes: string[];
}

interface ExtendedHarmonyMap {
  [key: string]: ExtendedChord[];
}

export const generateExtendedChords = (scale: string[], scaleType: string): ExtendedHarmonyMap => {
  const extendedChords: ExtendedHarmonyMap = {
    "Secondary Dominants": [],
    "Extended Triads": [],
    "Suspended Chords": [],
    "Added Tone Chords": [],
    "Extended 7th Chords": [],
    "Altered Dominants": [],
    "Upper Structure Triads": []
  };

  // Generate secondary dominants (V7 of each diatonic chord except the diminished)
  scale.forEach((targetRoot, i) => {
    if (i === 6) return; // Skip diminished chord
    
    // Find the note a perfect fifth below the target
    const dominantRoot = scale[(i + 3) % 7];
    const third = scale[(i + 5) % 7];
    const fifth = scale[i];
    const seventh = scale[(i + 2) % 7];

    extendedChords["Secondary Dominants"].push({
      name: `${dominantRoot}7 → ${targetRoot}`,
      notes: [dominantRoot, third, fifth, seventh]
    });
  });

  scale.forEach((root, i) => {
    const third = scale[(i + 2) % scale.length];
    const fifth = scale[(i + 4) % scale.length];
    const sixth = scale[(i + 5) % scale.length];
    const seventh = scale[(i + 6) % scale.length];
    const ninth = scale[(i + 1) % scale.length];
    const eleventh = scale[(i + 3) % scale.length];
    const thirteenth = scale[(i + 5) % scale.length];

    // Extended Triads
    extendedChords["Extended Triads"].push({
      name: `${root}add9`,
      notes: [root, third, fifth, ninth]
    });

    // Suspended Chords
    extendedChords["Suspended Chords"].push(
      {
        name: `${root}sus4`,
        notes: [root, eleventh, fifth]
      },
      {
        name: `${root}sus2`,
        notes: [root, ninth, fifth]
      }
    );

    // Added Tone Chords
    extendedChords["Added Tone Chords"].push(
      {
        name: `${root}6`,
        notes: [root, third, fifth, sixth]
      },
      {
        name: `${root}add11`,
        notes: [root, third, fifth, eleventh]
      }
    );

    // Extended 7th Chords
    extendedChords["Extended 7th Chords"].push(
      {
        name: `${root}9`,
        notes: [root, third, fifth, seventh, ninth]
      },
      {
        name: `${root}11`,
        notes: [root, third, fifth, seventh, ninth, eleventh]
      },
      {
        name: `${root}13`,
        notes: [root, third, fifth, seventh, ninth, eleventh, thirteenth]
      }
    );

    // Altered Dominants
    if (i === 4) { // Only for the V chord
      extendedChords["Altered Dominants"].push(
        {
          name: `${root}7♭9`,
          notes: [root, third, fifth, seventh, scale[(i + 1) % scale.length]]
        },
        {
          name: `${root}7♯9`,
          notes: [root, third, fifth, seventh, scale[(i + 2) % scale.length]]
        },
        {
          name: `${root}7♭5`,
          notes: [root, third, scale[(i + 6) % scale.length], seventh]
        }
      );
    }

    // Upper Structure Triads
    extendedChords["Upper Structure Triads"].push(
      {
        name: `${root}7/9`,
        notes: [root, third, fifth, seventh, ninth, scale[(i + 3) % scale.length]]
      }
    );
  });

  return extendedChords;
};

// Add these utility functions to your musicTheory.ts file
const sharpToFlatMap: { [key: string]: string } = {
  'C#': 'Db',
  'D#': 'Eb',
  'F#': 'Gb',
  'G#': 'Ab',
  'A#': 'Bb'
};

const flatToSharpMap: { [key: string]: string } = {
  'Db': 'C#',
  'Eb': 'D#',
  'Gb': 'F#',
  'Ab': 'G#',
  'Bb': 'A#'
};

export const convertNoteNotation = (note: string, useFlats: boolean): string => {
  if (useFlats && note in flatToSharpMap) {
    return note; // Already flat
  } else if (useFlats && note in sharpToFlatMap) {
    return sharpToFlatMap[note];
  } else if (!useFlats && note in flatToSharpMap) {
    return flatToSharpMap[note];
  } else if (!useFlats && note in sharpToFlatMap) {
    return note; // Already sharp
  }
  return note; // Natural notes remain unchanged
}; 