import React from 'react';
import { Typography, Box, Divider, Button, Chip } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { ChordEntry } from '../types/music';

interface Props {
  scale: string[];
  scaleType: string;
  chordScale: ChordEntry[];
  onPlayProgression: (chords: string[][]) => void;
}

const ChordProgressions: React.FC<Props> = ({ scale, scaleType, chordScale, onPlayProgression }) => {
  // Common progressions for different scale types
  const getProgressions = () => {
    const isMinor = scaleType.toLowerCase().includes('minor');
    const isMajor = !isMinor;

    const commonProgressions = [
      {
        name: 'Basic I-IV-V',
        degrees: isMajor ? [0, 3, 4] : [0, 3, 4],
        description: 'The most fundamental progression in music'
      },
      {
        name: 'II-V-I',
        degrees: isMajor ? [1, 4, 0] : [1, 4, 0],
        description: 'Essential jazz progression'
      },
      {
        name: '50s Progression',
        degrees: isMajor ? [0, 5, 3, 4] : [0, 5, 3, 4],
        description: 'I-vi-IV-V progression, popular in doo-wop'
      },
      {
        name: 'Circle Progression',
        degrees: isMajor ? [0, 3, 4, 5] : [0, 3, 4, 5],
        description: 'I-IV-V-vi, widely used in pop music'
      }
    ];

    // Add scale-specific progressions
    if (isMinor) {
      commonProgressions.push(
        {
          name: 'Minor Line Cliché',
          degrees: [0, 0, 0, 0],  // Will need special handling for chromatic line
          description: 'Descending chromatic line in minor context'
        },
        {
          name: 'Andalusian Cadence',
          degrees: [3, 2, 1, 0],
          description: 'Common in Flamenco and rock music'
        }
      );
    }

    return commonProgressions;
  };

  const playProgression = (degrees: number[]) => {
    // Add safety check
    const validChords = degrees
      .map(degree => chordScale[degree])
      .filter(chord => chord && Array.isArray(chord.notes));
    
    if (validChords.length !== degrees.length) {
      console.warn('Some chords in progression are invalid');
      return;
    }
    
    onPlayProgression(validChords.map(chord => chord.notes));
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Common Progressions
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {getProgressions().map((prog, index) => {
          // Add validation check for the progression
          const isValidProgression = prog.degrees.every(
            degree => degree >= 0 && degree < chordScale.length && chordScale[degree]
          );

          if (!isValidProgression) return null;

          return (
            <Box 
              key={index}
              sx={{ 
                p: 2, 
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.02)'
                }
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle1" fontWeight="medium">
                  {prog.name}
                </Typography>
                <Button
                  size="small"
                  startIcon={<PlayArrowIcon />}
                  onClick={() => playProgression(prog.degrees)}
                  sx={{ minWidth: 100 }}
                >
                  Play
                </Button>
              </Box>

              <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                {prog.degrees.map((degree, i) => (
                  <Chip
                    key={i}
                    label={chordScale[degree]?.symbol || '?'}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>

              <Typography variant="body2" color="text.secondary">
                {prog.description}
              </Typography>
            </Box>
          );
        }).filter(Boolean)}
      </Box>
    </Box>
  );
};

export default ChordProgressions; 