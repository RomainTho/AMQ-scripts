import re
import os
import json

# Read raw text from the specified file
def read_raw_text_from_file(filename):
    with open(filename, 'r', encoding='utf-8') as file:
        return file.read()

# Read JSON file to get the list of anime names
def read_anime_names_from_json(json_filename):
    with open(json_filename, 'r', encoding='utf-8') as file:
        data = json.load(file)
        return set(anime['anime_name'].strip() for anime in data)  # Extract anime names and return as a set

# Function to format songs within a specific range, filtered by anime names from the JSON file
def format_songs_in_range_and_filter(raw_text, start, end, anime_name_filter):
    lines = raw_text.strip().split('\n')
    formatted_songs = []

    # Loop through the lines and extract song information using regex
    for line in lines:
        match = re.match(r"(\d+)- (.+?) - (.+?) \(\d+\/\d+\)", line)
        if match:
            song_id = int(match.group(1))
            song_name = match.group(2).strip()
            anime_name = match.group(3).strip()

            # If the song_id is in the specified range and anime_name is in the filter
            if start <= song_id <= end and anime_name in anime_name_filter:
                # Remove quotes and normalize spaces in song name
                song_name = song_name.replace('"', '')  
                song_name = re.sub(r'\s+', ' ', song_name)

                formatted_songs.append({
                    'id': song_id,
                    'song_name': song_name,
                    'anime_name': anime_name
                })

    return formatted_songs

# Read the raw text from the file
filename = "Low_Guess_Rate_Songs.txt"
raw_text = read_raw_text_from_file(filename)

# Ask the user to input the path to the JSON file
json_filename = input("Enter the path to the JSON file containing anime names: ")

# Read the anime names from the JSON file
anime_name_filter = read_anime_names_from_json(json_filename)

# Count total songs in raw text
total_songs_in_raw_text = len(raw_text.strip().split('\n'))

# Display the total number of songs before formatting
print(f"Total number of songs in the raw text: {total_songs_in_raw_text}")

# Ask the user for the range of song numbers to format
start = int(input("Enter the starting song number: "))
end = int(input("Enter the ending song number: "))

# Call the function and get the results, filtering by anime names
formatted_songs = format_songs_in_range_and_filter(raw_text, start, end, anime_name_filter)

# Create the output string for the const songs array
songs_output = "const songs = [\n"

# Append each song to the songs_output
for song in formatted_songs:
    songs_output += f'    {{ "id": {song["id"]}, "song_name": "{song["song_name"]}", "anime_name": "{song["anime_name"]}" }},\n'

# Remove the last comma and add the closing bracket
if formatted_songs:
    songs_output = songs_output.rstrip(',\n') + "\n"  # Remove the last comma
songs_output += "];"

# Create the output file name based on user input
output_file_name = f"formatted_songs_{start}_{end}.txt"

# Write the formatted songs to the specified output file
with open(output_file_name, "w", encoding='utf-8') as output_file:
    output_file.write(songs_output)

print(f"Formatted songs have been written to '{output_file_name}'.")
