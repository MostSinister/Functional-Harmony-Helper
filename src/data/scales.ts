import { ScaleData } from '../types/music';

export const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export const SCALES: ScaleData = {
    "Ionian (Major)": {
        intervals: [2, 2, 1, 2, 2, 2, 1],
        description: `Bright, stable, and resolute. The Ionian mode features a major third and natural seventh that create a strong sense of resolution and completion.

The foundation of Western music theory, this scale emerged during the medieval period and became the basis for common practice harmony. Its natural tendency toward resolution makes it ubiquitous in classical, pop, and folk music, particularly for expressing joy, triumph, and straightforward emotional statements.`
    },
    "Dorian": {
        intervals: [2, 1, 2, 2, 2, 1, 2],
        description: `Minor and contemplative, yet uplifting. The Dorian mode's raised sixth degree gives it a distinctive floating quality that sets it apart from the natural minor scale.

Historically significant in medieval church music and Celtic folk traditions, this scale gained renewed prominence in modern music through modal jazz and rock. Notable examples include Miles Davis's "So What" and "Scarborough Fair". Its unique blend of minor tonality with a major sixth makes it particularly effective for both melancholic and hopeful expressions.`
    },
    "Phrygian": {
        intervals: [1, 2, 2, 2, 1, 2, 2],
        description: `Dark and exotic, with a distinctive flat second degree that creates immediate tension. The Phrygian mode evokes Mediterranean and Middle Eastern flavors.

Deeply rooted in Spanish Flamenco music and metal genres, this scale creates a sense of dramatic tension through its lowered second degree. Its sound can range from mysterious and ethereal to intensely dramatic, making it particularly effective in film scores and contemporary metal music.`
    },
    "Lydian": {
        intervals: [2, 2, 2, 1, 2, 2, 1],
        description: `Bright, ethereal, and slightly floating. The raised fourth degree creates a distinctive otherworldly quality that sets it apart from the major scale.

Popular in film scores and modern jazz, the Lydian mode gained prominence through composers like Debussy and jazz theorist George Russell. Its dreamy, floating quality makes it particularly effective for creating atmospheric and fantastical moods, often associated with wonder and discovery.`
    },
    "Mixolydian": {
        intervals: [2, 2, 1, 2, 2, 1, 2],
        description: `Warm and relaxed, with a bluesy edge. The Mixolydian mode's flatted seventh creates a dominant quality while maintaining a major tonality.

Fundamental to blues, rock, and Celtic music, this scale forms the basis of many guitar-driven genres. Its natural dominant quality makes it particularly suited for creating tension that doesn't demand resolution, heard in countless rock riffs and folk melodies.`
    },
    "Aeolian (Natural Minor)": {
        intervals: [2, 1, 2, 2, 1, 2, 2],
        description: `Dark and emotive, with a natural melancholic quality. The Aeolian mode provides the foundation for minor-key music with its characteristic minor third and sixth.

The most common minor scale in Western music, it emerged as a prominent mode during the Baroque period. Its versatility in expressing sadness, introspection, and drama makes it essential in classical, rock, and pop music, particularly for ballads and emotional pieces.`
    },
    "Locrian": {
        intervals: [1, 2, 2, 1, 2, 2, 2],
        description: `Intensely unstable and mysterious, with both a diminished fifth and a flat second. The Locrian mode is the most dissonant of the traditional modes.

Rarely used as a primary tonality due to its inherent instability, this scale finds its place in contemporary classical music and metal. Its unique combination of intervals makes it effective for creating extreme tension and otherworldly atmospheres.`
    },
    "Harmonic Minor": {
        intervals: [2, 1, 2, 2, 1, 3, 1],
        description: `Dramatic and exotic, with a characteristic augmented second interval. The raised seventh creates a strong pull toward the tonic while maintaining a minor quality.

Developed during the Baroque period to provide stronger cadences in minor keys, this scale is essential in classical and Middle Eastern music. Its distinctive sound combines Western functional harmony with an exotic flair, making it popular in metal, neoclassical, and fusion genres.`
    },
    "Melodic Minor (Ascending)": {
        intervals: [2, 1, 2, 2, 2, 2, 1],
        description: `Smooth and sophisticated, combining minor and major qualities. The raised sixth and seventh degrees create a more fluid melodic line while ascending.

Originally developed to smooth out melodic lines in Baroque music, this scale became a cornerstone of jazz harmony in the 20th century. Its unique combination of minor and major elements makes it particularly useful for creating complex harmonic progressions and melodic lines.`
    },
    "Pentatonic Major": {
        intervals: [2, 2, 3, 2, 3],
        description: `Open, stable, and naturally consonant. The five-note structure eliminates all semitone intervals, creating a pure, harmonious sound.

Found in traditional music worldwide, from Celtic to East Asian cultures. Its absence of semitones makes it particularly accessible and naturally pleasing, explaining its prevalence in folk music and modern pop melodies.`
    },
    "Pentatonic Minor": {
        intervals: [3, 2, 2, 3, 2],
        description: `Soulful and bluesy, with a natural flow that avoids semitone tensions. The minor pentatonic forms the backbone of blues and rock soloing.

Universal across cultures and particularly prominent in African-American music traditions, this scale is essential to blues, rock, and jazz. Its versatility and emotional directness make it the go-to choice for improvisation in many genres.`
    },
    "Blues Scale": {
        intervals: [3, 2, 1, 1, 3, 2],
        description: `Raw and expressive, adding a flat fifth "blue note" to the minor pentatonic. This scale captures the essence of blues tonality.

Emerging from African-American musical traditions, the blues scale embodies the expressive microtonal inflections of early blues singers. Its addition of the flat fifth creates the characteristic tension that defines blues and rock music.`
    },
    "Locrian ♮6": {
        intervals: [1, 2, 2, 1, 3, 1, 2],
        description: `Dark and enigmatic, featuring a natural sixth that provides a subtle contrast to its otherwise diminished character. This mode of the harmonic minor scale creates a unique tension.

A theoretical scale until the 20th century, it found its voice in contemporary classical and avant-garde jazz. Its combination of Locrian darkness with a natural sixth makes it useful for creating complex harmonic textures and modern jazz improvisation.`
    },
    "Ionian #5": {
        intervals: [2, 2, 1, 3, 1, 2, 1],
        description: `Bright and unexpected, combining major scale stability with an augmented fifth that creates a surprising lift. This mode of the harmonic minor adds intrigue to familiar territory.

Popular in modern jazz and fusion, this scale offers a fresh perspective on major tonality. Its augmented fifth creates interesting harmonic possibilities while maintaining the familiar Ionian framework, making it effective for contemporary composition and improvisation.`
    },
    "Dorian #4": {
        intervals: [2, 1, 3, 1, 2, 2, 1],
        description: `Mysterious and exotic, combining the soulful Dorian sound with a raised fourth that adds an unexpected Oriental flavor. The augmented fourth creates a distinctive tension point.

Emerging in 20th-century jazz and fusion, this scale bridges Western modal jazz with Eastern influences. Its unique interval structure makes it particularly effective for creating modal harmony with an exotic edge, often used in contemporary jazz and world fusion.`
    },
    "Phrygian Dominant": {
        intervals: [1, 3, 1, 2, 1, 2, 2],
        description: `Intense and exotic, combining the characteristic flat second of Phrygian with a major third. This scale creates an immediately recognizable Spanish/Middle Eastern sound.

A cornerstone of Flamenco music and Middle Eastern traditions, this scale is also prominent in metal and fusion genres. Its unique combination of Western dominant function with Eastern melodic character makes it a powerful tool for cross-cultural musical expression.`
    },
    "Lydian #2": {
        intervals: [3, 1, 2, 1, 2, 2, 1],
        description: `Bright and otherworldly, featuring both a raised second and fourth degree. This unusual combination creates a distinctly ethereal quality.

A modern scale that gained popularity through contemporary classical and jazz fusion. Its wide initial interval and multiple raised degrees make it particularly effective for creating dreamlike, floating harmonies and modern jazz compositions.`
    },
    "UltraLocrian": {
        intervals: [1, 2, 1, 2, 2, 1, 3],
        description: `Extremely unstable and tense, featuring both diminished and double diminished intervals. The most altered and dissonant of the harmonic minor modes.

Primarily used in contemporary jazz and avant-garde music, this scale pushes harmonic boundaries to their limit. Its highly unstable nature makes it perfect for creating maximum tension and expressing extreme emotional states in modern composition.`
    },
    "Dorian ♭2": {
        intervals: [1, 2, 2, 2, 2, 1, 2],
        description: `Moody and sophisticated, combining the familiar Dorian sound with a flat second degree. This creates a unique blend of minor mode stability with Phrygian-like tension.

A key scale in modern jazz, particularly in the works of Miles Davis and other modal jazz pioneers. Its combination of familiar and exotic elements makes it particularly effective for contemporary jazz composition and improvisation.`
    },
    "Lydian Augmented": {
        intervals: [2, 2, 2, 2, 1, 2, 1],
        description: `Bright and expansive, featuring both a raised fourth and fifth. This creates an exceptionally open and spacious sound quality.

Popularized by modern jazz composers like Oliver Nelson and Wayne Shorter, this scale offers a more complex alternative to the standard Lydian mode. Its multiple raised degrees make it particularly effective for creating modern jazz harmonies and impressionistic colors.`
    },
    "Lydian Dominant": {
        intervals: [2, 2, 2, 1, 2, 1, 2],
        description: `Bright yet unresolved, combining the raised fourth of Lydian with a flatted seventh. Creates a sophisticated jazz-fusion sound.

Essential in modern jazz harmony, this scale is often used over dominant seventh chords with raised eleventh tensions. Its unique combination of Lydian brightness and dominant function makes it a favorite among jazz improvisers and composers.`
    },
    "Mixolydian ♭6": {
        intervals: [2, 2, 1, 2, 1, 2, 2],
        description: `Warm and bittersweet, combining the dominant seventh quality with a minor sixth. Creates a more melancholic version of the Mixolydian sound.

Found in both jazz and film music, this scale offers a more complex emotional palette than standard Mixolydian. Its minor sixth adds a touch of darkness to the otherwise bright dominant sound, making it effective for creating nuanced emotional expressions.`
    },
    "Aeolian ♭5": {
        intervals: [2, 1, 2, 1, 2, 2, 2],
        description: `Dark and haunting, combining natural minor tonality with a diminished fifth. Creates an especially somber and unsettling mood.

Popular in contemporary classical and dark ambient music, this scale intensifies the minor tonality with its diminished fifth. Its unique interval structure makes it particularly effective for creating atmospheric and gothic moods.`
    },
    "Altered Scale (Super Locrian)": {
        intervals: [1, 2, 1, 2, 2, 2, 2],
        description: `Highly unstable and altered, containing all the possible alterations of a dominant chord. Every scale degree except the root is flattened or sharpened.

Essential in modern jazz for playing over altered dominant chords, this scale emerged from the bebop era and became central to contemporary jazz harmony. Its highly altered nature makes it perfect for creating maximum harmonic tension before resolution.`
    },
    "Hungarian Minor": {
        intervals: [2, 1, 3, 1, 1, 3, 1],
        description: `Exotic and dramatic, featuring two augmented seconds that create a distinctly Eastern European character. Combines minor tonality with intense melodic tension.

Derived from Eastern European folk music, this scale became popular in classical music through composers like Liszt and Bartók. Its distinctive interval pattern makes it particularly effective for creating dramatic, ethnically-flavored melodies.`
    },
    "Hungarian Major": {
        intervals: [3, 1, 2, 1, 2, 1, 2],
        description: `Bright yet exotic, featuring an augmented second and several other unusual intervals. Creates a unique blend of major tonality with Eastern European character.

Popularized by Béla Bartók and other nationalist composers, this scale combines Western major tonality with Eastern European folk elements. Its unique interval structure makes it particularly effective for creating music that bridges classical and folk traditions.`
    },
    "Neapolitan Major": {
        intervals: [1, 2, 2, 2, 2, 2, 1],
        description: `Bright and mysterious, featuring a flat second degree that creates an immediate exotic color while maintaining a major tonality.

Originating in Italian Baroque music, this scale found new life in 20th-century classical music. Its combination of major scale stability with a Phrygian-like beginning makes it effective for creating both historical and contemporary musical expressions.`
    },
    "Neapolitan Minor": {
        intervals: [1, 2, 2, 2, 1, 3, 1],
        description: `Dark and dramatic, combining a flat second degree with harmonic minor characteristics. Creates a uniquely intense minor sound.

Developed during the Romantic era, this scale combines Baroque-era Neapolitan harmony with dramatic minor tonality. Its unique interval structure makes it particularly effective for creating intense emotional expressions in classical and contemporary contexts.`
    },
    "Gypsy Scale": {
        intervals: [1, 3, 1, 2, 1, 3, 1],
        description: `Dark and passionate, featuring two augmented seconds that create an unmistakable Eastern European character. The Gypsy scale combines Hungarian minor elements with Phrygian inflections.

Originating in Roma musical traditions, this scale became influential in classical music through composers like Liszt and Brahms. Its dramatic intervals make it particularly effective for creating intense, passionate melodies and exotic harmonies in both traditional and contemporary contexts.`
    },
    "Flamenco Scale": {
        intervals: [1, 3, 1, 2, 1, 2, 2],
        description: `Fiery and dramatic, identical to the Phrygian Dominant scale. Its flat second and major third create the characteristic Spanish sound.

Fundamental to Flamenco music and Spanish folk traditions, this scale embodies the passionate character of Andalusian music. Its unique interval structure makes it particularly effective for creating authentic Spanish musical expressions and modern fusion compositions.`
    }
}; 