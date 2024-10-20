import os
import json
from pathlib import Path
import sys

# Ensure stdout uses UTF-8 encoding
sys.stdout.reconfigure(encoding='utf-8')


def load_anime_names(json_file):
    """
    Load anime names (Romaji and English) from the merged.json file.
    """
    with open(json_file, 'r', encoding='utf-8') as f:
        anime_data = json.load(f)
    
    anime_names = {}
    for song in anime_data:
        anime_english = song.get('animeEnglishName')
        anime_romaji = song.get('animeRomajiName')
        if anime_english and anime_romaji:
            # Replace illegal characters in both names
            anime_romaji_clean = replace_illegal_characters(anime_romaji)
            anime_english_clean = replace_illegal_characters(anime_english)
            anime_names[anime_romaji_clean] = anime_english_clean  # Map Romaji to English
    
    return anime_names

def replace_illegal_characters(name):
    """
    Replace illegal characters in filenames with underscores.
    """
    illegals = ['<', '>', ':', '"', '|', '?', '*']
    for char in illegals:
        name = name.replace(char, '_')
    return name

def is_romaji(filename, anime_names):
    """
    Check if the filename is in Romaji format.
    """
    parts = filename.rsplit('-', 3)
    if len(parts) == 4:
        anime = replace_illegal_characters(parts[0])
        return anime in anime_names
    return False

def rename_mp3_metadata(directory, anime_names):
    """
    Rename MP3 files from Romaji to English based on the anime names from merged.json and update ID3 metadata.
    """
    for filename in os.listdir(directory):
        if filename.endswith('.mp3'):
            filepath = os.path.join(directory, filename)

            if is_romaji(filename, anime_names):
                # Extract current anime name from the filename
                parts = filename.rsplit('-', 3)
                if len(parts) == 4:
                    anime, track_number, song_name, artist = parts
                    artist = artist.replace('.mp3', '')  # Remove file extension

                    anime_clean = replace_illegal_characters(anime)
                    new_anime_name = anime_names[anime_clean]  # Get the English name

                    # Create the new filename with the English name
                    new_filename = f"{new_anime_name}-{track_number}-{song_name}-{artist}.mp3"
                    new_filepath = os.path.join(directory, new_filename)

                    # Rename the file
                    if new_filepath != filepath:
                        os.rename(filepath, new_filepath)
                        print(f"Renamed: '{filename}' -> '{new_filename}'")
                    else:
                        print(f"File '{filename}' is already in English format.")
                else:
                    print(f"Skipping file with unexpected format: {filename}")
            else:
                print(f"File '{filename}' is not in Romaji format. Skipping.")

# Directory containing your MP3 files
directory = r"./Exported Songs/"
# Load anime names from the merged.json file
json_file = r"./merged.json"
anime_names = load_anime_names(json_file)
# Rename MP3 files based on the anime names from the JSON (Romaji to English)
rename_mp3_metadata(directory, anime_names)
