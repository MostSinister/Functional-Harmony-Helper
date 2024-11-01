export interface Scale {
  intervals: number[];
  description: string;
  commonProgressions?: string[][];
  relativeScales?: {
    major?: string;
    minor?: string;
  };
  modes?: string[];
}

export interface ScaleNote {
  note: string;
  degree: string;
  chordQuality: string;
}

export interface ChordEntry {
  name: string;
  symbol: string;
  rootPosition: string;
  inversions: string[];
  notes: string[];
  function?: string;
}

export type Note = "C" | "C#" | "D" | "D#" | "E" | "F" | "F#" | "G" | "G#" | "A" | "A#" | "B";

export interface ScaleData {
  [key: string]: {
    intervals: number[];
    description: string;
  };
}