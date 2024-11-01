import React, { useState, useEffect, useCallback } from 'react';
import { start } from 'tone';
import * as Tone from 'tone';
import { 
  Box, 
  Container, 
  Typography, 
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Grid,
  Divider,
  Link,
  FormControlLabel,
  Switch,
  Slider
} from '@mui/material';
import { NOTES, SCALES } from '../data/scales';
import { generateScale, generateChordScale, getScaleDegrees, convertNoteNotation } from '../utils/musicTheory';
import ScaleVisualizer from './ScaleVisualizer';
import ChordDisplay from './ChordDisplay';
import PianoKeyboard from './PianoKeyboard';
import ExtendedHarmony from './ExtendedHarmony';
import GuitarNeck from './GuitarNeck';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ChordProgressions from './ChordProgressions';
import backgroundImage from '../assets/images/Leonardo_Phoenix_A_warm_and_intimate_bokeh_effect_photography_2.jpg';

// Update the interface to match ChordEntry exactly
interface ChordType {
  symbol: string;
  notes: string[];
  name: string;
  rootPosition: string;
  inversions: string[];
}

// Add this helper component for consistent select styling
const StyledSelect: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; }[];
  fullWidth?: boolean;
}> = ({ label, value, onChange, options, fullWidth }) => (
  <FormControl 
    fullWidth={fullWidth}
    sx={{ 
      minWidth: 200,
      '& .MuiOutlinedInput-root': {
        backgroundColor: 'rgba(255,255,255,0.1)',
        '&:hover': {
          backgroundColor: 'rgba(255,255,255,0.15)',
        },
      },
      '& .MuiInputLabel-root': {
        color: 'rgba(255,255,255,0.9)',
      },
      '& .MuiSelect-icon': {
        color: 'rgba(255,255,255,0.7)',
      }
    }}
  >
    <InputLabel sx={{ color: 'white' }}>{label}</InputLabel>
    <Select
      value={value}
      label={label}
      onChange={(e) => onChange(e.target.value)}
      sx={{
        color: 'white',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(255,255,255,0.3)',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(255,255,255,0.5)',
        },
      }}
    >
      {options.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

// Add this validation function at the top level
const validateChordScale = (chordScale: ChordType[]): ChordType[] => {
  if (!Array.isArray(chordScale)) return [];
  
  return chordScale.map(chord => {
    if (!chord) {
      return {
        symbol: '',
        notes: [],
        name: '',
        rootPosition: '',
        inversions: []
      };
    }
    return {
      symbol: chord.symbol || '',
      notes: Array.isArray(chord.notes) ? chord.notes : [],
      name: chord.name || '',
      rootPosition: chord.rootPosition || '',
      inversions: Array.isArray(chord.inversions) ? chord.inversions : []
    };
  }).filter(chord => chord.symbol !== ''); // Remove invalid chords
};

// Add these new types at the top
type VoicingStyle = 'block' | 'arpeggio' | 'broken' | 'ascending' | 'descending';
type VoicingRange = 'close' | 'spread' | 'drop2' | 'drop3' | 'quartal';
type VoicingDensity = 'triad' | 'seventh' | 'extended' | 'shell';

const ScaleExplorer: React.FC = () => {
  const [rootNote, setRootNote] = useState<string>("C");
  const [scaleType, setScaleType] = useState<string>("Ionian (Major)");
  const [currentScale, setCurrentScale] = useState<string[]>([]);
  const [chordScale, setChordScale] = useState<ChordType[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [voicingStyle, setVoicingStyle] = useState<VoicingStyle>('block');
  const [voicingRange, setVoicingRange] = useState<VoicingRange>('close');
  const [voicingDensity, setVoicingDensity] = useState<VoicingDensity>('seventh');
  const [voicingTempo, setVoicingTempo] = useState<number>(120);
  const [polySynth, setPolySynth] = useState<any>(null);
  const [useFlats, setUseFlats] = useState<boolean>(true);

  useEffect(() => {
    // Create a polyphonic synth with Synth as the voice
    const newSynth = new (Tone as any).PolySynth(Tone.Synth).toDestination();
    setPolySynth(newSynth);
    return () => {
      if (newSynth) {
        newSynth.dispose();
      }
    };
  }, []);

  // Update playNote to use polySynth instead of synth
  const playNote = async (note: string) => {
    if (!polySynth) return;
    await start();
    polySynth.triggerAttackRelease(note, "8n");
  };

  // Update playScale to use polySynth instead of synth
  const playScale = async () => {
    if (!polySynth || isPlaying) return;
    setIsPlaying(true);
    
    for (const note of currentScale) {
      await polySynth.triggerAttackRelease(note + '4', '8n');
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    await polySynth.triggerAttackRelease(currentScale[0] + '5', '4n');
    
    setIsPlaying(false);
  };

  // Convert notes based on flat/sharp preference
  const convertNotes = useCallback((notes: string[]): string[] => {
    return notes.map(note => convertNoteNotation(note, useFlats));
  }, [useFlats]);

  // Type guard to filter out null values
  const isChordType = (chord: ChordType | null): chord is ChordType => chord !== null;

  useEffect(() => {
    // Generate new scale when root note or scale type changes
    const scale = generateScale(rootNote, SCALES[scaleType].intervals);
    setCurrentScale(convertNotes(scale));
    
    try {
      const chords = generateChordScale(scale) || [];
      const validatedChords = chords
        .filter((chord): chord is ChordType => 
          Boolean(chord) && 
          typeof chord === 'object' &&
          typeof chord.symbol === 'string' &&
          Array.isArray(chord.notes)
        )
        .map(chord => ({
          symbol: convertNoteNotation(chord.symbol.charAt(0), useFlats) + chord.symbol.slice(1),
          notes: chord.notes,
          name: chord.name || '',
          rootPosition: chord.rootPosition || '',
          inversions: chord.inversions || []
        }));
      
      setChordScale(validatedChords);
    } catch (error) {
      console.error('Error generating chord scale:', error);
      setChordScale([]);
    }
  }, [rootNote, scaleType, useFlats, convertNotes]);

  // Update the getVoicing function to handle edge cases better
  const getVoicing = (notes: string[]): string[] => {
    if (!Array.isArray(notes) || notes.length === 0) return [];
    
    const baseOctave = 3;
    const notePositions = notes.map(note => NOTES.indexOf(note));
    
    // Filter notes based on density
    let selectedNotes = [...notes];
    switch (voicingDensity) {
      case 'triad':
        selectedNotes = notes.slice(0, 3);
        break;
      case 'seventh':
        selectedNotes = notes.slice(0, 4);
        break;
      case 'shell':
        if (notes.length >= 3) {
          selectedNotes = [notes[0], notes[2], notes[notes.length - 1]]; // Root, fifth, highest available note
        }
        break;
      case 'extended':
        selectedNotes = notes.slice(0, 7); // Limit to 7 notes max
        break;
    }

    // Ensure we have valid notes
    selectedNotes = selectedNotes.filter(note => note && NOTES.includes(note));
    if (selectedNotes.length === 0) return [];

    // Apply voicing range
    try {
      switch (voicingRange) {
        case 'close':
          return selectedNotes.map((note, i) => {
            const pos = NOTES.indexOf(note);
            const prevPos = i > 0 ? NOTES.indexOf(selectedNotes[i - 1]) : pos;
            const octave = pos <= prevPos ? baseOctave + 1 : baseOctave;
            return `${note}${octave}`;
          });
        
        case 'spread':
          return selectedNotes.map((note, i) => 
            `${note}${baseOctave + Math.floor(i / 2)}`
          );
        
        case 'drop2':
          if (selectedNotes.length >= 4) {
            const voicing = [...selectedNotes];
            const secondNote = voicing[1];
            voicing[1] = `${secondNote}${baseOctave - 1}`;
            return voicing.map((note, i) => 
              i === 1 ? note : `${note}${baseOctave}`
            );
          }
          return selectedNotes.map(note => `${note}${baseOctave}`);
        
        case 'drop3':
          if (selectedNotes.length >= 4) {
            const voicing = [...selectedNotes];
            const thirdNote = voicing[2];
            voicing[2] = `${thirdNote}${baseOctave - 1}`;
            return voicing.map((note, i) => 
              i === 2 ? note : `${note}${baseOctave}`
            );
          }
          return selectedNotes.map(note => `${note}${baseOctave}`);
        
        case 'quartal':
          return selectedNotes.map((note, i) => 
            `${note}${baseOctave + Math.floor(i / 4)}`
          );
        
        default:
          return selectedNotes.map(note => `${note}${baseOctave}`);
      }
    } catch (error) {
      console.error('Error in voicing generation:', error);
      return selectedNotes.map(note => `${note}${baseOctave}`);
    }
  };

  // Update the playChord function to handle errors better
  const playChord = async (notes: string[]) => {
    if (!polySynth || !Array.isArray(notes) || notes.length === 0) return;
    
    try {
      await start();
      polySynth.releaseAll();
      setIsPlaying(true);

      const voicedNotes = getVoicing(notes).filter(note => note && note.length > 0);
      if (voicedNotes.length === 0) return;

      const noteDuration = 60 / voicingTempo; // Duration in seconds

      switch (voicingStyle) {
        case 'block':
          polySynth.triggerAttackRelease(voicedNotes, `${noteDuration}n`);
          break;
        
        case 'arpeggio':
        case 'ascending':
          voicedNotes.forEach((note, index) => {
            setTimeout(() => {
              polySynth.triggerAttackRelease(note, `${noteDuration * 2}n`);
            }, index * (noteDuration * 1000) / 2);
          });
          break;
        
        case 'descending':
          [...voicedNotes].reverse().forEach((note, index) => {
            setTimeout(() => {
              polySynth.triggerAttackRelease(note, `${noteDuration * 2}n`);
            }, index * (noteDuration * 1000) / 2);
          });
          break;
        
        case 'broken':
          for (let i = 0; i < voicedNotes.length; i += 2) {
            const pair = voicedNotes.slice(i, i + 2);
            if (pair.length > 0) {
              setTimeout(() => {
                polySynth.triggerAttackRelease(pair, `${noteDuration * 2}n`);
              }, i * (noteDuration * 1000) / 2);
            }
          }
          break;
      }

      const totalDuration = voicedNotes.length * (noteDuration * 1000) / 2;
      setTimeout(() => setIsPlaying(false), totalDuration + 500);
    } catch (error) {
      console.error('Error playing chord:', error);
      setIsPlaying(false);
    }
  };

  const playProgression = async (chords: string[][]) => {
    if (!polySynth || isPlaying) return;
    await start();
    setIsPlaying(true);

    polySynth.releaseAll();

    // Play each chord in sequence
    for (const chord of chords) {
      const voicedChord = getVoicing(chord);
      polySynth.triggerAttackRelease(voicedChord, '2n');
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setIsPlaying(false);
  };

  return (
    <>
      {/* Add fixed background */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: -1,
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)', // Slightly darker overlay
          }
        }}
      />

      <Container maxWidth="xl">
        <Box sx={{ py: 4, position: 'relative', zIndex: 1, color: 'white' }}>
          {/* Enhanced Header Section */}
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4,
              mb: 3, 
              background: 'linear-gradient(135deg, rgba(26, 35, 126, 0.9), rgba(13, 71, 161, 0.9))', // Made translucent
              borderRadius: 2,
              backdropFilter: 'blur(10px)', // Add blur effect
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, transparent 70%)',
                pointerEvents: 'none',
              }
            }}
          >
            <Typography 
              variant="h3" 
              component="h1" 
              gutterBottom 
              align="center" 
              sx={{ 
                fontWeight: 800,
                color: 'white',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                mb: 4
              }}
            >
              Scale Explorer
            </Typography>

            <Grid container spacing={3} alignItems="flex-start">
              {/* Main Controls */}
              <Grid item xs={12} md={8}>
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  <StyledSelect
                    label="Root Note"
                    value={rootNote}
                    onChange={setRootNote}
                    options={convertNotes(NOTES).map(note => ({ value: note, label: note }))}
                  />
                  <StyledSelect
                    label="Scale Type"
                    value={scaleType}
                    onChange={setScaleType}
                    options={Object.keys(SCALES).map(scale => ({ value: scale, label: scale }))}
                    fullWidth
                  />
                </Box>

                {/* Add Notation Toggle */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={useFlats}
                        onChange={(e) => setUseFlats(e.target.checked)}
                        sx={{
                          '& .MuiSwitch-track': {
                            backgroundColor: 'rgba(255,255,255,0.3)',
                          },
                          '& .MuiSwitch-thumb': {
                            backgroundColor: 'white',
                          },
                          '& .Mui-checked + .MuiSwitch-track': {
                            backgroundColor: 'rgba(255,255,255,0.7) !important',
                          },
                        }}
                      />
                    }
                    label={
                      <Typography sx={{ color: 'white' }}>
                        Use {useFlats ? 'Flats (♭)' : 'Sharps (♯)'}
                      </Typography>
                    }
                  />
                </Box>

                {/* Playback Controls */}
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  <Button 
                    variant="contained" 
                    onClick={playScale}
                    disabled={isPlaying}
                    startIcon={<PlayArrowIcon />}
                    sx={{ 
                      backgroundColor: 'white',
                      color: 'primary.dark',
                      fontWeight: 'bold',
                      px: 4,
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.9)',
                      }
                    }}
                  >
                    Play Scale
                  </Button>
                  <Button 
                    variant="outlined" 
                    onClick={() => playNote(rootNote + '4')}
                    sx={{ 
                      color: 'white',
                      borderColor: 'rgba(255,255,255,0.5)',
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                      }
                    }}
                  >
                    Play Root Note
                  </Button>
                </Box>
              </Grid>

              {/* Voicing Controls */}
              <Grid item xs={12} md={4}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 2, 
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: 2
                  }}
                >
                  <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.9)', mb: 2 }}>
                    Voicing Settings
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <StyledSelect
                      label="Style"
                      value={voicingStyle}
                      onChange={(value) => setVoicingStyle(value as VoicingStyle)}
                      options={[
                        { value: 'block', label: 'Block Chord' },
                        { value: 'arpeggio', label: 'Arpeggio' },
                        { value: 'broken', label: 'Broken Chord' },
                        { value: 'ascending', label: 'Ascending' },
                        { value: 'descending', label: 'Descending' }
                      ]}
                    />
                    <StyledSelect
                      label="Range"
                      value={voicingRange}
                      onChange={(value) => setVoicingRange(value as VoicingRange)}
                      options={[
                        { value: 'close', label: 'Close Position' },
                        { value: 'spread', label: 'Spread Voicing' },
                        { value: 'drop2', label: 'Drop 2' },
                        { value: 'drop3', label: 'Drop 3' },
                        { value: 'quartal', label: 'Quartal' }
                      ]}
                    />
                    <StyledSelect
                      label="Density"
                      value={voicingDensity}
                      onChange={(value) => setVoicingDensity(value as VoicingDensity)}
                      options={[
                        { value: 'triad', label: 'Triad' },
                        { value: 'seventh', label: '7th Chord' },
                        { value: 'extended', label: 'Extended' },
                        { value: 'shell', label: 'Shell Voicing' }
                      ]}
                    />
                    <Box sx={{ px: 1 }}>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        Tempo: {voicingTempo} BPM
                      </Typography>
                      <Slider
                        value={voicingTempo}
                        onChange={(_, value) => setVoicingTempo(value as number)}
                        min={60}
                        max={240}
                        step={10}
                        sx={{
                          color: 'white',
                          '& .MuiSlider-thumb': {
                            backgroundColor: 'white',
                          },
                          '& .MuiSlider-track': {
                            backgroundColor: 'white',
                          },
                          '& .MuiSlider-rail': {
                            backgroundColor: 'rgba(255,255,255,0.3)',
                          }
                        }}
                      />
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Paper>

          {/* Main Content Grid */}
          <Grid container spacing={3}>
            {/* Full Width - Scale Structure */}
            <Grid item xs={12}>
              <Paper elevation={2} sx={{ 
                p: 3, 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)'
              }}>
                <ScaleVisualizer 
                  scale={currentScale}
                  description={SCALES[scaleType].description}
                  degrees={getScaleDegrees(scaleType)}
                  rootNote={rootNote}
                  chordScale={chordScale}
                  onPlayNote={playNote}
                />
              </Paper>
            </Grid>

            {/* Full Width - Scale Layout */}
            <Grid item xs={12}>
              <Paper elevation={2} sx={{ 
                p: 3, 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)'
              }}>
                <Typography variant="h6" gutterBottom>
                  Scale Layout
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Box sx={{ mb: 4 }}>
                  <PianoKeyboard 
                    highlightedNotes={currentScale}
                    onKeyPress={playNote}
                    useFlats={useFlats}
                  />
                </Box>
                <GuitarNeck 
                  highlightedNotes={currentScale}
                  rootNote={rootNote}
                  onNoteClick={playNote}
                  useFlats={useFlats}
                />
              </Paper>
            </Grid>

            {/* Three Columns Row */}
            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ 
                p: 3, 
                height: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)'
              }}>
                <ChordDisplay 
                  chordScale={chordScale}
                  onPlayChord={(notes) => playChord(notes)}
                />
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ 
                p: 3, 
                height: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)'
              }}>
                <ExtendedHarmony
                  scale={currentScale}
                  scaleType={scaleType}
                  onPlayChord={(notes) => playChord(notes)}
                />
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ 
                p: 3, 
                height: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)'
              }}>
                <ChordProgressions 
                  scale={currentScale}
                  scaleType={scaleType}
                  chordScale={chordScale.filter(Boolean)}
                  onPlayProgression={(chords) => playProgression(chords)}
                />
              </Paper>
            </Grid>

            {/* Copyright Footer */}
            <Box 
              sx={{ 
                mt: 4, 
                pt: 2, 
                borderTop: '1px solid',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                textAlign: 'center',
                width: '100%'
              }}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.7)'
                }}
              >
                © {new Date().getFullYear()} Ghislain Fontaine Bujold • 
                <Link 
                  href="mailto:Gfbujold@sinisterarts.io"
                  sx={{ 
                    color: 'inherit',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Gfbujold@sinisterarts.io
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default ScaleExplorer;