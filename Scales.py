import inquirer

# Define notes, intervals, and descriptions for a wide range of scales
NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
SCALES = {
    "Ionian (Major)": ([2, 2, 1, 2, 2, 2, 1], "Bright, happy, and consonant; the basis of the major scale."),
    "Dorian": ([2, 1, 2, 2, 1, 2, 2], "Minor sound with a raised 6th, often used in jazz and folk."),
    "Phrygian": ([1, 2, 2, 1, 2, 2, 2], "Dark, minor sound with a lowered 2nd, common in Spanish and Middle Eastern music."),
    "Lydian": ([2, 2, 2, 1, 2, 2, 1], "Bright and dreamy, with a raised 4th giving a sense of openness."),
    "Mixolydian": ([2, 2, 1, 2, 2, 1, 2], "Major sound with a lowered 7th, often used in rock and blues."),
    "Aeolian (Natural Minor)": ([2, 1, 2, 2, 1, 2, 2], "Sad and dark; the natural minor scale."),
    "Locrian": ([1, 2, 2, 1, 2, 2, 2], "Unstable with a diminished 5th; rarely used as a tonal center."),
    
    # Harmonic Minor and its Modes
    "Harmonic Minor": ([2, 1, 2, 2, 1, 3, 1], "Dramatic and exotic with a raised 7th; common in classical music."),
    "Locrian ♮6": ([1, 2, 2, 1, 3, 1, 2], "Dark and tense with a minor 2nd and raised 6th."),
    "Ionian #5": ([2, 2, 1, 3, 1, 2, 1], "Bright with a unique raised 5th."),
    "Dorian #4": ([2, 1, 3, 1, 2, 2, 1], "Minor sound with an exotic raised 4th."),
    "Phrygian Dominant": ([1, 3, 1, 2, 1, 2, 2], "Flamenco-like with a major 3rd and minor 2nd."),
    "Lydian #2": ([3, 1, 2, 1, 2, 2, 1], "Bright and exotic with a raised 2nd."),
    "UltraLocrian": ([1, 2, 1, 2, 2, 1, 3], "Dissonant with a diminished 4th and diminished 5th."),
    
    # Melodic Minor and its Modes
    "Melodic Minor (Ascending)": ([2, 1, 2, 2, 2, 2, 1], "Hybrid of minor and major; raises the 6th and 7th in minor."),
    "Dorian ♭2": ([1, 2, 2, 2, 2, 1, 2], "Minor feel with a lowered 2nd."),
    "Lydian Augmented": ([2, 2, 2, 2, 1, 2, 1], "Bright and powerful with raised 4th and 5th."),
    "Lydian Dominant": ([2, 2, 2, 1, 2, 1, 2], "A dominant feel with a raised 4th, often used in jazz."),
    "Mixolydian ♭6": ([2, 2, 1, 2, 1, 2, 2], "Major but with a lowered 6th."),
    "Aeolian ♭5": ([2, 1, 2, 1, 2, 2, 2], "Diminished feel with a flat 5th."),
    "Altered Scale (Super Locrian)": ([1, 2, 1, 2, 2, 2, 2], "Complex with lots of tension; often used over altered chords."),
    
    # Other Exotic Scales
    "Hungarian Minor": ([2, 1, 3, 1, 1, 3, 1], "Exotic with an augmented second; common in Eastern European music."),
    "Hungarian Major": ([3, 1, 2, 1, 2, 1, 2], "Bright yet exotic, with an augmented 2nd and flat 6th."),
    "Gypsy Scale": ([1, 3, 1, 2, 1, 3, 1], "Exotic minor sound with a minor 2nd and raised 4th."),
    "Flamenco Scale": ([1, 3, 1, 2, 1, 2, 2], "Used in flamenco, with a Spanish flavor."),
    "Neapolitan Major": ([1, 2, 2, 2, 2, 2, 1], "Bright and unique, often used in classical music."),
    "Neapolitan Minor": ([1, 2, 2, 2, 1, 3, 1], "Dramatic minor sound with a flat 2nd and raised 7th."),
    "Pentatonic Major": ([2, 2, 3, 2, 3], "Simple and open; used in folk and rock music."),
    "Pentatonic Minor": ([3, 2, 2, 3, 2], "Minor version of the pentatonic; widely used across genres."),
    "Blues Scale": ([3, 2, 1, 1, 3, 2], "Minor sound with a flat 5th, essential in blues music.")
}

# Helper Functions
def generate_scale(root, intervals):
    scale = []
    note_index = NOTES.index(root)
    for interval in intervals:
        scale.append(NOTES[note_index % 12])
        note_index += interval
    return scale

def get_whole_half_pattern(intervals):
    return ['W' if i == 2 else 'H' for i in intervals]

def generate_chord_scale_with_inversions(scale, show_inversions=False):
    chord_scale = []
    roman_numerals = ["I", "ii", "iii", "IV", "V", "vi", "vii°"]
    qualities = ["Maj7", "m7", "m7", "Maj7", "7", "m7", "m7b5"]
    
    for i in range(len(scale)):
        root = scale[i]
        third = scale[(i + 2) % len(scale)]
        fifth = scale[(i + 4) % len(scale)]
        seventh = scale[(i + 6) % len(scale)]
        
        chord_entry = {
            "name": f"{root}{qualities[i]} / {roman_numerals[i]}{qualities[i]}",
            "root_position": f"{root}-{third}-{fifth}-{seventh}",
            "inversions": [] if not show_inversions else [
                f"{third}-{fifth}-{seventh}-{root} (1st Inv)",
                f"{fifth}-{seventh}-{root}-{third} (2nd Inv)",
                f"{seventh}-{root}-{third}-{fifth} (3rd Inv)"
            ]
        }
        chord_scale.append(chord_entry)
    return chord_scale

# Main program function
def main():
    root_note_question = [
        inquirer.List("root_note", message="Select the Root Note:", choices=NOTES)
    ]
    root_note = inquirer.prompt(root_note_question)["root_note"]

    scale_type_question = [
        inquirer.List("scale_type", message="Select the Scale Type:", choices=list(SCALES.keys()))
    ]
    scale_type = inquirer.prompt(scale_type_question)["scale_type"]

    intervals, description = SCALES[scale_type]
    scale = generate_scale(root_note, intervals)

    # Print all information by default
    print(f"\nScale Notes for {root_note} {scale_type}: {', '.join(scale)}")
    print(f"Description: {description}")

    # Show Whole/Half Tone Pattern
    whole_half_pattern = get_whole_half_pattern(intervals)
    print(f"\nWhole/Half Tone Pattern: {'-'.join(whole_half_pattern)}")

    # Show Chord Scale with inversions
    chord_scale = generate_chord_scale_with_inversions(scale, show_inversions=True)
    print("\nChord Scale:")
    for chord in chord_scale:
        print(f"{chord['name']}:")
        print(f"  {chord['root_position']} (Root)")
        for inversion in chord['inversions']:
            print(f"  {inversion}")

if __name__ == "__main__":
    main()
