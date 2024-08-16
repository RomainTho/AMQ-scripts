from mutagen.id3 import ID3, TIT2
from pathlib import Path

def rename_mp3_metadata(directory: str):
    # Vérifie que le répertoire existe
    if not Path(directory).is_dir():
        print(f"Le répertoire spécifié n'existe pas : {directory}")
        return

    # Liste tous les fichiers .mp3 dans le répertoire spécifié
    mp3_files = list(Path(directory).glob("*.mp3"))
    if not mp3_files:
        print("Aucun fichier MP3 trouvé dans le répertoire.")
        return

    for filepath in mp3_files:
        print(f"Traitement du fichier : {filepath}")  # Affiche le fichier en cours de traitement

        # Récupère le nom du fichier sans l'extension
        new_title = filepath.stem

        # Charge le fichier MP3 avec mutagen
        try:
            audio = ID3(filepath)
        except ID3.NoHeaderError:
            audio = ID3()

        # Met à jour le titre de la chanson avec le nom du fichier
        audio[TIT2] = TIT2(encoding=3, text=new_title)
        audio.save()
        print(f"Metadonnées mises à jour pour : {filepath}")

# Spécifie le répertoire où se trouvent les fichiers MP3
directory = r"C:\Users\scorv\OneDrive\Bureau\Anime songs\Uta no prince 1000%"
rename_mp3_metadata(directory)
