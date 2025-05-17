import re
import sys
sys.stdout.reconfigure(encoding='utf-8')

# Lire le texte brut depuis le fichier spécifié
def read_raw_text_from_file(filename):
    with open(filename, 'r', encoding='utf-8') as file:
        return file.read()

# Fonction pour formater toutes les chansons du fichier
def format_all_songs(raw_text):
    lines = raw_text.strip().split('\n')
    formatted_songs = []

    # Parcourir les lignes et extraire les informations des chansons avec regex
    for line in lines:
        match = re.match(r"(\d+)- (.+?) - (.+?) \(\d+\/\d+\)", line)
        if match:
            song_id = int(match.group(1))
            song_name = match.group(2).strip()

            # Supprimer les guillemets dans le nom des chansons
            song_name = song_name.replace('"', '')  # Retirer tous les guillemets
            song_name = re.sub(r'\s+', ' ', song_name)  # Normaliser les espaces

            anime_name = match.group(3).strip()

            # Ajouter la chanson formatée à la liste
            formatted_songs.append({
                'id': song_id,
                'song_name': song_name,
                'anime_name': anime_name
            })

    return formatted_songs

# Lire le texte brut du fichier
filename = "Filtered_Songs.txt"
raw_text = read_raw_text_from_file(filename)

# Compter le nombre total de chansons dans le fichier brut
total_songs_in_raw_text = len(raw_text.strip().split('\n'))

# Afficher le nombre total de chansons
print(f"Nombre total de chansons dans le fichier brut : {total_songs_in_raw_text}")

# Appeler la fonction pour formater toutes les chansons
formatted_songs = format_all_songs(raw_text)

# Créer la sortie pour le tableau de chansons au format const
songs_output = "const songs = [\n"

# Ajouter chaque chanson à la sortie
for song in formatted_songs:
    songs_output += f'    {{ "id": {song["id"]}, "song_name": "{song["song_name"]}", "anime_name": "{song["anime_name"]}" }},\n'

# Supprimer la dernière virgule et ajouter le crochet fermant
if formatted_songs:
    songs_output = songs_output.rstrip(',\n') + "\n"  # Retirer la dernière virgule
songs_output += "];"

# Nom du fichier de sortie
output_file_name = "formatted_all_songs.txt"

# Écrire les chansons formatées dans le fichier de sortie
with open(output_file_name, "w", encoding='utf-8') as output_file:
    output_file.write(songs_output)

print(f"Toutes les chansons formatées ont été écrites dans '{output_file_name}'.")
