import re
import os
import pandas as pd

def extract_song_data(line):
    """Extract song information, including Guess Rate and playCount, from a line."""
    match = re.search(r"(\d+)- ([^-\n]+) - ([^(\n]+) \((\d+)/(\d+)\)", line)
    if match:
        song_number, song_name, anime_name, correct_count, play_count = match.groups()
        correct_count, play_count = int(correct_count), int(play_count)
        guess_rate = (correct_count / play_count) * 100 if play_count > 0 else 0.0
        return song_number, song_name.strip(), anime_name.strip(), correct_count, play_count, guess_rate
    return None  # Return None if the line does not match the expected format

def sort_and_export_to_excel(file_name):
    """Sort songs by Guess Rate, then by playCount, and export to Excel."""
    if not os.path.exists(file_name):
        print(f"File '{file_name}' not found in the current directory.")
        return

    with open(file_name, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    header = lines[0] if lines and lines[0].startswith("Low Guess Rate Songs") else ""
    songs = lines[1:]

    # Extract data from each song and store it in a list
    song_data = []
    for line in songs:
        song_info = extract_song_data(line)
        if song_info:
            song_data.append(song_info)

    # Sort songs by Guess Rate (ascending), then by playCount (descending)
    sorted_songs = sorted(
        song_data,
        key=lambda song: (song[5], -song[4])  # Sort by Guess Rate, then by playCount
    )

    # Create a pandas DataFrame to structure the data
    df = pd.DataFrame(
        sorted_songs,
        columns=['Song Number', 'Song Name', 'Anime Name', 'Correct Count', 'Play Count', 'Guess Rate (%)']
    )

    # Save to an Excel file
    output_file_name = "Low_Guess_Rate_Songs_Sorted_My_List.xlsx"
    df.to_excel(output_file_name, index=False, engine='openpyxl')

    print(f"Sorting complete. Saved to '{output_file_name}'.")

# Example usage:
file_name = input("Enter the name of your song file in the current directory: ")
sort_and_export_to_excel(file_name)
