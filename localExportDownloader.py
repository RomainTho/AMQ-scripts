import os
import sys
import json
import subprocess
from typing import List
from pathlib import Path
import requests

if sys.version_info >= (3, 7):
    sys.stdout.reconfigure(encoding='utf-8')

try:
    import requests
except ModuleNotFoundError:
    subprocess.Popen(["python", "-m", "pip", "install", "-U", 'requests']).wait()
    import requests

def extract_info(filepath: str, lang: str='romaji') -> List:
    songs = []
    with open(filepath, mode='r', encoding='utf_8') as export:
        songlist = json.load(export)
    for song in songlist:
        if 'animeRomajiName' not in song or 'songName' not in song or 'songType' not in song or 'audio' not in song or 'songArtist' not in song:
            print(f"Song data missing keys: {song}")
            continue
        
        name = song['songName'].replace('/', '_').replace('\\', '_')
        artist = song['songArtist'].replace('/', '_').replace('\\', '_')
        anime = song['animeRomajiName'].replace('/', '_').replace('\\', '_')
        stype = song['songType']
        mp3 = song['audio']
        
        s = {'title': name, 'artist': artist, 'anime': anime, 'type': stype, 'url': mp3}
        songs.append(s)
    return songs


def download(url: str, filename: str, force_replace: bool=False) -> bool:
    if Path(filename).exists() and not force_replace:
        if verbose:
            print(f"The song at '{url}' was already downloaded!")
        return
    stream = requests.get(url, stream=True)
    with open(filename, "wb") as file:
        for chunk in stream.iter_content(chunk_size=320):
            file.write(chunk)
    return True

illegals = ['<', '>', ':', '"', '|', '?', '*']
replace = False
lang = 'romaji'
path = './'
infile = "merged.json"
verbose = False

args = sys.argv[1:]
if 'help' in args:
    print("Please tell me you didn't name a file or folder 'help', or you'd be a big baka!")
    exit(0)
for arg in args:
    kw, a = arg.split('=')
    kw = kw.replace('"', '').replace("'", "")
    a = a.replace('"', '').replace("'", "")
    path = a if kw == 'path' else path
    lang = a.lower() if kw == 'lang' else lang
    replace = True if kw == 'replace' and a.lower() == "true" else replace
    infile = a if kw == 'infile' else infile
    verbose = True if kw == "verbose" and a.lower() == "true" else False
if not path.endswith('/'):
    path += "/"

script_dir = os.path.dirname(os.path.abspath(__file__))
print(f"Script directory: {script_dir}")

infile_path = os.path.join(script_dir, infile)
print(f"Looking for infile at: {infile_path}")


if not Path(infile_path).exists():
    print(f"Error: The file '{infile_path}' does not exist.")
    sys.exit(1)


Path(path).mkdir(parents=True, exist_ok=True)

try:
    for song in extract_info(filepath=infile_path, lang=lang):
        outfile = f"{song['anime']}-{song['type']}-{song['title']}-{song['artist']}.mp3"
        for i in illegals:
            outfile = outfile.replace(i, "_")
        outfile = f"{path}{outfile}"
        print(f"Output file: {outfile}")
        download(url=song['url'], filename=outfile, force_replace=replace)
        if verbose:
            print(f"\t- Downloaded {song['anime']} {song['type']} and saved to {outfile}")
except FileNotFoundError as e:
    print(f"Error: {e}")

print("That should be all of the songs unless some weren't uploaded as mp3. Cya!")