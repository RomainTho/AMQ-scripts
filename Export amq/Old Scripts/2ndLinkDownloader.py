import os
import json
import requests
from mutagen.id3 import ID3, ID3NoHeaderError
from pathlib import Path
import sys

# Ensure stdout uses UTF-8 encoding (for Python >= 3.7)
if sys.version_info >= (3, 7):
    sys.stdout.reconfigure(encoding='utf-8')

def extract_info(filepath: str) -> list[dict]:
    """
    Extract song information from a JSON file.
    """
    songs = []
    with open(filepath, mode='r', encoding='utf_8') as export:
        songlist = json.load(export)
    for song in songlist:
        required_keys = ['animeEnglishName', 'songName', 'songType', 'songArtist']
        if not all(key in song for key in required_keys):
            print(f"Song data missing keys: {song}")
            continue
        
        # Choose the best available source: audio, video720, video480
        url = song.get('audio') or song.get('video720') or song.get('video480')
        if url is None:
            print(f"Warning: Skipping song '{song['songName']}' by '{song['songArtist']}' due to missing URLs.")
            continue
        
        # Handle missing schema in URLs by appending Catbox URL
        if not url.startswith(('http://', 'https://')):
            url = f"https://files.catbox.moe/{url}"
        
        max_length = 100  # Limit for each field
        
        name = song['songName'].replace('/', '_').replace('\\', '_').replace('-', '_')
        artist = song['songArtist'].replace('/', '_').replace('\\', '_').replace('-', '_')[:max_length]
        anime = song['animeEnglishName'].replace('/', '_').replace('\\', '_').replace('-', '_')
        stype = song['songType']
        
        s = {'title': name, 'artist': artist, 'anime': anime, 'type': stype, 'url': url}
        songs.append(s)
    return songs

def is_corrupted(filepath: str) -> bool:
    """
    Check if the MP3 file's metadata is not updated correctly,
    indicating that the file may be corrupted.
    """
    try:
        audio = ID3(filepath)
        if 'TIT2' in audio and 'TPE1' in audio:
            # Check if metadata fields are non-empty
            title = audio.get('TIT2')
            artist = audio.get('TPE1')
            if title and artist and title.text and artist.text:
                return False  # Metadata is updated correctly
    except ID3NoHeaderError:
        pass  # No ID3 header means metadata was not written

    return True  # File is considered corrupted if metadata is not updated

def extract_filenames_from_json(json_filepath: str) -> set:
    """
    Extract the filenames from the merged.json file.
    """
    filenames = set()
    with open(json_filepath, mode='r', encoding='utf-8') as file:
        data = json.load(file)
        for song in data:
            # Extract filenames from URLs (if available)
            url = song.get('audio') or song.get('video720') or song.get('video480')
            if url:
                filenames.add(url.split('/')[-1])  # Add the filename part
    return filenames

def download_file(url: str, filepath: str) -> None:
    """
    Download a file from the specified URL and save it to the given filepath.
    """
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()  # Raise an exception for HTTP errors

        with open(filepath, "wb") as file:
            for chunk in response.iter_content(chunk_size=8192):
                file.write(chunk)
        print(f"Successfully downloaded '{os.path.basename(filepath)}' from '{url}'.")
    except requests.RequestException as e:
        print(f"Failed to download {url}: {e}")

def re_download_corrupted_files(directory: str, json_filepath: str, base_url: str) -> None:
    """
    Re-download corrupted MP3 files from the specified base URL.
    """
    filenames_from_json = extract_filenames_from_json(json_filepath)
    
    for filename in os.listdir(directory):
        if filename.endswith('.mp3'):
            filepath = os.path.join(directory, filename)
            
            if is_corrupted(filepath) and filename in filenames_from_json:
                # Delete the corrupted file
                os.remove(filepath)
                print(f"Deleted corrupted file: {filename}")
                
                # Construct the secondary URL for re-download
                secondary_url = f"{base_url}/{filename}"
                
                # Download the file again from the secondary URL
                download_file(secondary_url, filepath)

# Directory containing your MP3 files
directory = r"C:\Users\scorv\OneDrive\Bureau\AMQ-scripts\Export amq\Exported Songs"

# Path to the merged.json file
json_filepath = r"C:\Users\scorv\OneDrive\Bureau\AMQ-scripts\Export amq\merged.json"

# Base URL for re-downloading corrupted files
base_url = "https://vhdist1.catbox.video"

# Re-download corrupted files
re_download_corrupted_files(directory, json_filepath, base_url)

print("Re-download process completed.")
