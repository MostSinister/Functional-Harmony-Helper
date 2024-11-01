import React from 'react';
import { Paper, Typography, Box, Chip, Grid } from '@mui/material';
import { ChordEntry } from '../types/music';

interface Props {
  scale: string[];
  description: string;
  degrees: string[];
  rootNote: string;
  chordScale: ChordEntry[];
  onPlayNote?: (note: string) => void;
}

const ScaleVisualizer: React.FC<Props> = ({ scale, description, degrees, rootNote, chordScale, onPlayNote }) => {
  const getChordColor = (quality: string) => {
    switch(quality) {
      case 'Maj7':
        return '#4CAF50';  // Green
      case 'm7':
        return '#7B1FA2';  // Purple
      case '7':
        return '#1976D2';  // Blue
      case 'm7b5':
        return '#D32F2F';  // Red
      case 'dim7':
        return '#FF5722';  // Orange
      default:
        return '#757575';  // Grey
    }
  };

  // Create extended scale array with octave note
  const scaleWithOctave = [...scale, scale[0]];
  const degreesWithOctave = [...degrees, '8'];
  const chordScaleWithOctave = [...chordScale, chordScale[0]];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Scale Structure
      </Typography>
      
      {/* Scale Notes with Chord Qualities */}
      <Grid container spacing={1} sx={{ mb: 3 }}>
        {scaleWithOctave.map((note, index) => {
          const chordQuality = chordScaleWithOctave[index]?.symbol.replace(/[A-G]#?/, '');
          const backgroundColor = getChordColor(chordQuality);
          const isOctave = index === scaleWithOctave.length - 1;
          
          return (
            <Grid item key={index}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                <Chip
                  label={note}
                  onClick={() => onPlayNote?.(note + (isOctave ? '5' : '4'))}
                  sx={{
                    backgroundColor: backgroundColor,
                    color: 'white',
                    fontWeight: (note === rootNote || isOctave) ? 'bold' : 'normal',
                    transform: (note === rootNote || isOctave) ? 'scale(1.1)' : 'scale(1)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      backgroundColor: backgroundColor,
                      filter: 'brightness(1.1)',
                    }
                  }}
                />
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: 'text.secondary',
                    fontWeight: (index === 0 || isOctave) ? 'bold' : 'normal'
                  }}
                >
                  {degreesWithOctave[index]}
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: backgroundColor,
                    fontWeight: 'medium',
                    fontSize: '0.7rem'
                  }}
                >
                  {chordQuality}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>

      {/* Scale Description */}
      <Paper 
        elevation={1} 
        sx={{ 
          p: 2, 
          backgroundColor: 'rgba(0,0,0,0.02)',
          borderLeft: '4px solid',
          borderColor: 'primary.main'
        }}
      >
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ lineHeight: 1.6 }}
        >
          {description}
        </Typography>
      </Paper>

      {/* Legend */}
      <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
          Chord Quality Colors:
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {['Maj7', 'm7', '7', 'm7b5', 'dim7'].map(quality => (
            <Chip
              key={quality}
              label={quality}
              size="small"
              sx={{
                backgroundColor: getChordColor(quality),
                color: 'white',
                fontSize: '0.7rem'
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ScaleVisualizer;