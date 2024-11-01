import React from 'react';
import { Box, Paper } from '@mui/material';
import { convertNoteNotation } from '../utils/musicTheory';

interface GuitarNeckProps {
  highlightedNotes: string[];
  rootNote: string;
  onNoteClick?: (note: string) => void;
  useFlats?: boolean;
}

const GuitarNeck: React.FC<GuitarNeckProps> = ({ 
  highlightedNotes, 
  rootNote, 
  onNoteClick,
  useFlats = true
}) => {
  const strings = ['E', 'B', 'G', 'D', 'A', 'E'];
  const frets = Array.from({ length: 25 }, (_, i) => i);

  const notes = useFlats 
    ? ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
    : ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  const getNoteAtFret = (string: string, fret: number): string => {
    const startIndex = notes.indexOf(string);
    return notes[(startIndex + fret) % 12];
  };

  const isNoteHighlighted = (note: string) => {
    const normalizedNote = convertNoteNotation(note, useFlats);
    const normalizedHighlightedNotes = highlightedNotes.map(n => convertNoteNotation(n, useFlats));
    return normalizedHighlightedNotes.includes(normalizedNote);
  };

  const isRoot = (note: string) => {
    return convertNoteNotation(note, useFlats) === convertNoteNotation(rootNote, useFlats);
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 4, overflow: 'auto' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {strings.map((string, stringIndex) => (
          <Box
            key={stringIndex}
            sx={{
              display: 'flex',
              height: '24px',
              borderBottom: '1px solid #ccc',
              position: 'relative'
            }}
          >
            {/* String label */}
            <Box
              sx={{
                width: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRight: '2px solid #666',
                position: 'sticky',
                left: 0,
                backgroundColor: 'white',
                zIndex: 2,
                fontSize: '0.8rem'
              }}
            >
              {string}
            </Box>

            {/* Frets */}
            {frets.map((fret, fretIndex) => {
              const note = getNoteAtFret(string, fret);
              const highlighted = isNoteHighlighted(note);
              const isRootNote = isRoot(note);

              return (
                <Box
                  key={fretIndex}
                  sx={{
                    flex: 1,
                    borderRight: '1px solid #999',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    minWidth: '32px'
                  }}
                  onClick={() => onNoteClick?.(convertNoteNotation(note, useFlats) + '3')}
                  style={{ cursor: 'pointer' }}
                >
                  {highlighted && (
                    <Box
                      sx={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: isRootNote ? '#f44336' : '#2196f3',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '0.7rem'
                      }}
                    >
                      {convertNoteNotation(note, useFlats)}
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>
        ))}

        {/* Fret numbers */}
        <Box sx={{ display: 'flex', pl: '24px' }}>
          {frets.map((fret) => (
            <Box
              key={fret}
              sx={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                color: '#666',
                minWidth: '32px',
                fontSize: '0.7rem'
              }}
            >
              {fret}
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default GuitarNeck;