import json
import sys
sys.stdout.reconfigure(encoding='utf-8')

# Chemins des fichiers
json_file_path = r'C:\Users\scorv\OneDrive\Bureau\AMQ-scripts\Low Guess rate sort\My data\Swap1n myanimelist 2025-01-22 song list.json'
txt_file_path = r'C:\Users\scorv\OneDrive\Bureau\AMQ-scripts\Low Guess rate sort\My data\Sorted_Low_Guess_Rate_Songs.txt'
output_file_path = r'C:\Users\scorv\OneDrive\Bureau\AMQ-scripts\Low Guess rate sort\My data\Filtered_Songs.txt'

# Chargement des données JSON
with open(json_file_path, 'r', encoding='utf-8') as json_file:
    json_data = json.load(json_file)

# Chargement des données TXT
with open(txt_file_path, 'r', encoding='utf-8') as txt_file:
    txt_data = txt_file.readlines()

# Extraction des chansons du JSON
json_songs = set()
for entry in json_data:
    anime_name = entry.get('animeENName') or entry.get('animeJPName')  # Utilise le nom anglais ou japonais
    song_name = entry.get('songName')
    if anime_name and song_name:
        json_songs.add(f"{song_name} - {anime_name}")

# Filtrage des chansons dans le fichier TXT
filtered_songs = []
for line in txt_data:
    for json_song in json_songs:
        if json_song in line:
            filtered_songs.append(line.strip())
            break

# Écriture des chansons filtrées dans un nouveau fichier
with open(output_file_path, 'w', encoding='utf-8') as output_file:
    output_file.write("\n".join(filtered_songs))

print(f"Les chansons filtrées ont été écrites dans le fichier : {output_file_path}")
