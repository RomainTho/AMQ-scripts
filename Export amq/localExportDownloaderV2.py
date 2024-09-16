import os
import sys
import json
import subprocess
from typing import List
from pathlib import Path
import requests
from mutagen.mp3 import MP3
from mutagen.id3 import ID3, ID3NoHeaderError

# Ensure stdout uses UTF-8 encoding (for Python >= 3.7)
if sys.version_info >= (3, 7):
    sys.stdout.reconfigure(encoding='utf-8')

# Hacky workaround to fetch an external dependency
try:
    import requests
except ModuleNotFoundError:
    subprocess.Popen(["python", "-m", "pip", "install", "-U", 'requests']).wait()
    import requests

def url_check(url: str) -> str:
    """
    Checks if the formed URL with 'files.catbox.moe' works.
    If not, switches to 'vhdist1.catbox.video'.
    """
    try:
        response = requests.head(url, allow_redirects=True)
        if response.status_code == 200:
            return url  # URL is valid, return it
        else:
            # If the first URL doesn't work, switch to the vhdist URL
            return url.replace('files.catbox.moe', 'vhdist1.catbox.video')
    except requests.RequestException:
        # In case of a connection error or any exception, switch to the vhdist URL
        return url.replace('files.catbox.moe', 'vhdist1.catbox.video')

def extract_info(filepath: str, lang: str='english') -> List[dict]:
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
        
        # Ensure the URL starts with a valid schema
        if not url.startswith(('http://', 'https://')):
            url = f"https://files.catbox.moe/{url}"
        
        # Check if the Catbox URL is reachable, otherwise switch to vhdist1
        url = url_check(url)
        
        max_length = 100  # Limit for each field
        
        name = song['songName'].replace('/', '_').replace('\\', '_').replace('-', '_')
        artist = song['songArtist'].replace('/', '_').replace('\\', '_').replace('-', '_')[:max_length]
        anime = song['animeEnglishName'].replace('/', '_').replace('\\', '_').replace('-', '_')
        stype = song['songType']
        
        s = {'title': name, 'artist': artist, 'anime': anime, 'type': stype, 'url': url}
        songs.append(s)
    return songs

def download(url: str, filename: str, force_replace: bool=False, extract_audio: bool=False) -> bool:
    if not url:
        return False
    
    if Path(filename).exists() and not force_replace:
        print(f"File '{filename}' already exists. Skipping download.")
        return False
    
    

    try:
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
            if stream.status_code == 200:
                with open(filename, "wb") as file:
                    for chunk in stream.iter_content(chunk_size=320):
                        file.write(chunk)
            else:
                print(f"Failed to download {url}. HTTP Status Code: {stream.status_code}")
                return False
    except Exception as e:
        print(f"Error occurred during download: {e}")
        return False
    
    return True

illegals = ['<', '>', ':', '"', '|', '?', '*']
# Set some sane default values
replace = False
lang = 'english'
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
        
          # Skip if a file containing the song name already exists in the directory
        if any(song['title'] in f.name for f in Path(path).glob('*.mp3')): 
            print(f"File with song name '{song['title']}' already exists. Skipping download.")
            continue    

        # Determine if we need to extract audio from a video file
        extract_audio = song['url'].endswith('.webm')
        if download(url=song['url'], filename=outfile, force_replace=replace, extract_audio=extract_audio):
            remaining_songs = total_songs - (idx + 1)
            print(f"Successfully downloaded '{os.path.basename(outfile)}'. Remaining songs to download: {remaining_songs}")
except FileNotFoundError as e:
    print(f"Error: {e}")


# Directory containing your MP3 files
directory = r"./Exported Songs/"

print("That should be all of the songs. Cya!")
