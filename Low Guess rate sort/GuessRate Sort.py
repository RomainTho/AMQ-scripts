import re
import os

def extract_song_data(line):
    """Extract correctCount, playCount, and calculate Guess Rate from a line."""
    match = re.search(r"\((\d+)/(\d+)\)", line)
    if match:
        correct_count, play_count = map(int, match.groups())
        guess_rate = (correct_count / play_count) * 100 if play_count > 0 else 0.0
        return guess_rate, play_count
    return 0.0, 0  # Return 0% Guess Rate and 0 playCount if match fails

def sort_songs_by_guess_rate(file_name):
    """Read a song file, sort by Guess Rate (and playCount as tiebreaker), and write the sorted list back."""
    if not os.path.exists(file_name):
        print(f"File '{file_name}' not found in the current directory.")
        return

    with open(file_name, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    header = lines[0] if lines and lines[0].startswith("Low Guess Rate Songs") else ""
    songs = lines[1:]

    # Parse and sort songs by Guess Rate ascending, then by playCount descending
    sorted_songs = sorted(
        songs,
        key=lambda line: (extract_song_data(line)[0], -extract_song_data(line)[1])
    )

    # Add Guess Rate percentages
    sorted_songs_with_percentages = []
    for line in sorted_songs:
        guess_rate, play_count = extract_song_data(line)
        sorted_songs_with_percentages.append(
            f"{line.strip()} - {guess_rate:.2f}%\n"
        )

    # Write sorted songs back to a new file
    output_file_name = "Sorted_Low_Guess_Rate_Songs.txt"
    with open(output_file_name, 'w', encoding='utf-8') as output_file:
        output_file.write(header)
        output_file.writelines(sorted_songs_with_percentages)

    print(f"Sorting complete. Saved to '{output_file_name}'.")

# Example usage:
file_name = input("Enter the name of your song file in the current directory: ")
sort_songs_by_guess_rate(file_name)
