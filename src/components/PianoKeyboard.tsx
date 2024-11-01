import React from 'react';
import { Box, Paper } from '@mui/material';
import { convertNoteNotation } from '../utils/musicTheory';

interface Props {
  highlightedNotes: string[];
  onKeyPress: (note: string) => void;
  useFlats?: boolean;
}

const PianoKeyboard: React.FC<Props> = ({ highlightedNotes = [], onKeyPress, useFlats = true }) => {
  const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const blackKeys = useFlats 
    ? ['Db', 'Eb', 'Gb', 'Ab', 'Bb']
    : ['C#', 'D#', 'F#', 'G#', 'A#'];
  const octaves = [3, 4, 5];

  const isNoteHighlighted = (note: string) => {
    if (!highlightedNotes || !note) return false;
    const noteWithoutOctave = note.replace(/\d+$/, '');
    const normalizedNote = convertNoteNotation(noteWithoutOctave, useFlats);
    const normalizedHighlightedNotes = highlightedNotes.map(n => convertNoteNotation(n, useFlats));
    return normalizedHighlightedNotes.includes(normalizedNote);
  };

  const isRootNote = (note: string) => {
    if (!highlightedNotes || !highlightedNotes.length || !note) return false;
    const noteWithoutOctave = note.replace(/\d+$/, '');
    const normalizedNote = convertNoteNotation(noteWithoutOctave, useFlats);
    return convertNoteNotation(highlightedNotes[0], useFlats) === normalizedNote;
  };

  const getNoteColor = (note: string, isBlackKey: boolean = false) => {
    if (isRootNote(note)) {
      return {
        bg: isBlackKey ? '#c62828' : '#f44336',
        hover: isBlackKey ? '#b71c1c' : '#d32f2f',
        text: 'white'
      };
    }
    if (isNoteHighlighted(note)) {
      return {
        bg: isBlackKey ? '#1565c0' : '#2196f3',
        hover: isBlackKey ? '#0d47a1' : '#1976d2',
        text: 'white'
      };
    }
    return {
      bg: isBlackKey ? 'black' : 'white',
      hover: isBlackKey ? '#333' : '#f5f5f5',
      text: isBlackKey ? 'white' : 'black'
    };
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', my: 2, overflow: 'auto' }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 2, 
          position: 'relative',
          display: 'flex',
          minWidth: 'fit-content'
        }}
      >
        {octaves.map((octave) => (
          <Box 
            key={octave}
            sx={{ 
              display: 'flex', 
              position: 'relative',
              height: '200px'
            }}
          >
            {/* White keys */}
            {whiteKeys.map((note) => {
              const fullNote = `${note}${octave}`;
              const colors = getNoteColor(fullNote);
              return (
                <Box
                  key={note}
                  onClick={() => onKeyPress(fullNote)}
                  sx={{
                    width: '40px',
                    height: '100%',
                    border: '1px solid #ccc',
                    borderRadius: '0 0 4px 4px',
                    backgroundColor: colors.bg,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    pb: 1,
                    color: colors.text,
                    transition: 'background-color 0.2s',
                    '&:hover': {
                      backgroundColor: colors.hover,
                    },
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  {note}
                </Box>
              );
            })}

            {/* Updated Black keys positioning */}
            <Box sx={{ position: 'absolute', display: 'flex', height: '60%' }}>
              {blackKeys.map((note, index) => {
                const fullNote = `${note}${octave}`;
                const colors = getNoteColor(fullNote, true);
                
                // Calculate the left margin based on the key position
                const getKeyPosition = (index: number) => {
                  const positions = {
                    0: '28px',  // C#/Db
                    1: '68px',  // D#/Eb
                    2: '148px', // F#/Gb
                    3: '188px', // G#/Ab
                    4: '228px'  // A#/Bb
                  };
                  return positions[index as keyof typeof positions];
                };

                return (
                  <Box
                    key={note}
                    onClick={() => onKeyPress(fullNote)}
                    sx={{
                      position: 'absolute',
                      left: getKeyPosition(index),
                      width: '24px',
                      height: '100%',
                      backgroundColor: colors.bg,
                      cursor: 'pointer',
                      zIndex: 2,
                      borderRadius: '0 0 4px 4px',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      pb: 1,
                      color: colors.text,
                      fontSize: '0.75rem',
                      transition: 'background-color 0.2s',
                      '&:hover': {
                        backgroundColor: colors.hover,
                      }
                    }}
                  >
                    {note}
                  </Box>
                );
              })}
            </Box>
          </Box>
        ))}
      </Paper>
    </Box>
  );
};

export default PianoKeyboard;