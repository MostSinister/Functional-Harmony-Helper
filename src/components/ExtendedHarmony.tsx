import React from 'react';
import { 
  Paper, 
  Typography, 
  Grid,
  Box,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { generateExtendedChords } from '../utils/musicTheory';

interface Props {
  scale: string[];
  scaleType: string;
  onPlayChord: (notes: string[]) => void;
}

const ExtendedHarmony: React.FC<Props> = ({ scale, scaleType, onPlayChord }) => {
  const extendedChords = generateExtendedChords(scale, scaleType);

  return (
    <Paper elevation={2} sx={{ p: 3, my: 2 }}>
      <Typography variant="h6" gutterBottom>
        Extended Harmony
      </Typography>
      
      <Grid container spacing={2}>
        {Object.entries(extendedChords).map(([category, chords]) => (
          <Grid item xs={12} key={category}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">{category}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  {chords.map((chord, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Box
                        sx={{
                          p: 2,
                          border: 1,
                          borderColor: 'divider',
                          borderRadius: 1,
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <Typography>{chord.name}</Typography>
                        <IconButton
                          size="small"
                          onClick={() => onPlayChord(chord.notes)}
                        >
                          <PlayArrowIcon />
                        </IconButton>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default ExtendedHarmony; 