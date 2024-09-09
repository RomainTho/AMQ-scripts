import os
import sys
import json
import subprocess
from typing import List
from pathlib import Path
import requests

# Ensure stdout uses UTF-8 encoding (for Python >= 3.7)
if sys.version_info >= (3, 7):
    sys.stdout.reconfigure(encoding='utf-8')

# Hacky workaround to fetch an external dependency
try:
    import requests
except ModuleNotFoundError:
    subprocess.Popen(["python", "-m", "pip", "install", "-U", 'requests']).wait()
    import requests

def extract_info(filepath: str, lang: str='romaji') -> List[dict]:
    songs = []
    with open(filepath, mode='r', encoding='utf_8') as export:
        songlist = json.load(export)
    for song in songlist:
        required_keys = ['animeRomajiName', 'songName', 'songType', 'songArtist']
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
        
        name = song['songName'].replace('/', '_').replace('\\', '_').replace('-', '_')
        artist = song['songArtist'].replace('/', '_').replace('\\', '_').replace('-', '_')
        anime = song['animeRomajiName'].replace('/', '_').replace('\\', '_').replace('-', '_')
        stype = song['songType']
        
        s = {'title': name, 'artist': artist, 'anime': anime, 'type': stype, 'url': url}
        songs.append(s)
    return songs

def download(url: str, filename: str, force_replace: bool=False, extract_audio: bool=False) -> bool:
    if not url:
        return False
    
    if Path(filename).exists() and not force_replace:
        return False
    
    if extract_audio:
        # Download the video first if extracting audio is needed
        video_filename = filename.replace('.mp3', '.webm')
        stream = requests.get(url, stream=True)
        with open(video_filename, "wb") as file:
            for chunk in stream.iter_content(chunk_size=320):
                file.write(chunk)
        
        # Extract the audio using ffmpeg
        ffmpeg_command = [
            'ffmpeg', '-i', video_filename, '-vn', '-acodec', 'mp3', filename
        ]
        subprocess.run(ffmpeg_command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        
        # Remove the video file after extracting the audio
        os.remove(video_filename)
    else:
        # Directly download the audio
        stream = requests.get(url, stream=True)
        with open(filename, "wb") as file:
            for chunk in stream.iter_content(chunk_size=320):
                file.write(chunk)
    
    return True

illegals = ['<', '>', ':', '"', '|', '?', '*', '-']  # Include '-' in the illegal characters list
# Set some sane default values
replace = False
lang = 'romaji'
path = './Exported Songs/'
infile = "merged.json"

# Use some butcher-style argument parsing. sys.argv[0] is this script, ignore that
args = sys.argv[1:]
if 'help' in args:
    print("Please tell me you didn't name a file or folder 'help")
    exit(0)
for arg in args:
    kw, a = arg.split('=')
    kw = kw.replace('"', '').replace("'", "")
    a = a.replace('"', '').replace("'", "")
    path = a if kw == 'path' else path
    lang = a.lower() if kw == 'lang' else lang
    replace = True if kw == 'replace' and a.lower() == "true" else replace
    infile = a if kw == 'infile' else infile
if not path.endswith('/'):
    path += "/"

# Get the directory of the current script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Construct the full path to the infile
infile_path = os.path.join(script_dir, infile)

# Ensure the path exists
if not Path(infile_path).exists():
    print(f"Error: The file '{infile_path}' does not exist.")
    sys.exit(1)

# Create the path if it's not there yet
Path(path).mkdir(parents=True, exist_ok=True)

songs_to_download = extract_info(filepath=infile_path, lang=lang)
total_songs = len(songs_to_download)

if not isinstance(total_songs, int):
    print(f"Error: total_songs should be an integer, but got {type(total_songs).__name__}.")
    sys.exit(1)

try:
    for idx, song in enumerate(songs_to_download):
        outfile = f"{song['anime']}-{song['type']}-{song['title']}-{song['artist']}.mp3"
        for illegal_char in illegals:
            outfile = outfile.replace(illegal_char, "_")
        outfile = f"{path}{outfile}"
        
        # Determine if we need to extract audio from a video file
        extract_audio = song['url'].endswith('.webm')
        if download(url=song['url'], filename=outfile, force_replace=replace, extract_audio=extract_audio):
            remaining_songs = total_songs - (idx + 1)
            print(f"Successfully downloaded '{os.path.basename(outfile)}'. Remaining songs to download: {remaining_songs}")
except FileNotFoundError as e:
    print(f"Error: {e}")

print("That should be all of the songs unless some weren't uploaded as mp3. Cya!")
