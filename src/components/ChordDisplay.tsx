import React from 'react';
import { 
  Paper, 
  Typography, 
  Accordion, 
  AccordionSummary,
  AccordionDetails,
  Box,
  IconButton
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { ChordEntry } from '../types/music';

interface Props {
  chordScale: ChordEntry[];
  onPlayChord: (notes: string[]) => void;
}

const getChordColor = (quality: string) => {
  // Color scheme for different chord qualities
  switch(quality) {
    case 'Maj7':
      return '#4CAF50'; // Green for major 7
    case 'm7':
      return '#7B1FA2'; // Purple for minor 7
    case '7':
      return '#1976D2'; // Blue for dominant 7
    case 'm7b5':
      return '#D32F2F'; // Red for half-diminished
    case 'dim7':
      return '#FF5722'; // Orange for diminished
    default:
      return '#757575'; // Grey for others
  }
};

const ChordDisplay: React.FC<Props> = ({ chordScale, onPlayChord }) => {
  return (
    <Paper elevation={2} sx={{ p: 3, my: 2 }}>
      <Typography variant="h6" gutterBottom>
        Chord Scale
      </Typography>
      {chordScale.map((chord, index) => {
        const chordQuality = chord.symbol.replace(/[A-G]#?/, ''); // Extract quality by removing root note
        const backgroundColor = getChordColor(chordQuality);
        
        return (
          <Accordion key={index}>
            <AccordionSummary 
              expandIcon={<ExpandMoreIcon />}
              sx={{
                backgroundColor: `${backgroundColor}15`, // Using alpha for lighter background
                '&:hover': {
                  backgroundColor: `${backgroundColor}25`,
                },
                borderLeft: `4px solid ${backgroundColor}`
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                width: '100%',
                pr: 2
              }}>
                <Typography sx={{ color: backgroundColor, fontWeight: 'bold' }}>
                  {chord.name}
                </Typography>
                <IconButton 
                  size="small" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlayChord(chord.notes);
                  }}
                  sx={{ color: backgroundColor }}
                >
                  <PlayArrowIcon />
                </IconButton>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="body2">
                  Root Position: {chord.rootPosition}
                </Typography>
                {chord.inversions.map((inv, i) => (
                  <Typography key={i} variant="body2">
                    {inv}
                  </Typography>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Paper>
  );
};

export default ChordDisplay; 