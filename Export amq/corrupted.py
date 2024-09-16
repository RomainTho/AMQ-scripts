import os
from mutagen.mp3 import MP3
from mutagen.id3 import ID3, ID3NoHeaderError

def is_corrupted(file_path):
    """
    Check if an MP3 file is corrupted by attempting to read its metadata.
    """
    try:
        # Try to load the MP3 file
        audio = MP3(file_path, ID3=ID3)
        return False  # If no exception was raised, the file is not corrupted
    except (ID3NoHeaderError, IOError, Exception):
        # Catch general exceptions for corrupted or unreadable files
        return True  # File is corrupted or cannot be read

def check_directory_for_corrupted_files(directory):
    """
    Check all MP3 files in the given directory for corruption.
    """
    corrupted_files = []
    for filename in os.listdir(directory):
        if filename.endswith('.mp3'):
            file_path = os.path.join(directory, filename)
            if is_corrupted(file_path):
                corrupted_files.append(filename)
    
    if corrupted_files:
        print("Corrupted files detected:")
        for file in corrupted_files:
            print(f" - {file}")
    else:
        print("No corrupted files found.")

# Directory containing your MP3 files
directory = r"./Exported Songs/"

# Check the directory for corrupted MP3 files
check_directory_for_corrupted_files(directory)
