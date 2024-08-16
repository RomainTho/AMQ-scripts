import os
from mutagen.id3 import ID3, ID3NoHeaderError, TIT2, TPE1

def rename_mp3_metadata(directory):
    for filename in os.listdir(directory):
        if filename.endswith('.mp3'):
            filepath = os.path.join(directory, filename)
            try:
                # Load the ID3 tag
                audio = ID3(filepath)
            except ID3NoHeaderError:
                # If no ID3 header is found, create a new ID3 tag
                audio = ID3()

            # Split the filename to extract the metadata
            parts = filename.rsplit('-', 3)
            if len(parts) == 4:
                anime, track_number, song_name, artist = parts
                artist = artist.replace('.mp3', '')  # Remove the file extension

                # Format the title as "Anime-Number-Song Name"
                title = f"{anime}-{track_number}-{song_name}"

                # Set the ID3 metadata
                audio['TIT2'] = TIT2(encoding=3, text=title)
                audio['TPE1'] = TPE1(encoding=3, text=artist)

                # Save the updated metadata back to the file
                audio.save(filepath)
                print(f"Updated metadata for: {filename}")
            else:
                print(f"Skipping file with unexpected format: {filename}")

# Directory containing your MP3 files
directory = r"C:\Users\scorv\OneDrive\Bureau\AMQ-scripts\Export amq\Exported Songs"
rename_mp3_metadata(directory)
