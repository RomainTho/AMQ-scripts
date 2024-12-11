import json
import re
import logging


def extract_anime_name(song_line):
    """
    Extract only the anime name from a song line.
    Expected format: "71- Song Name - Anime Name (X/Y)"
    """
    match = re.search(r'-\s([^()-]+)\s\(\d+/\d+\)$', song_line)
    if match:
        return match.group(1).strip()  # Extract just the anime name
    return None


def parse_guess_rate(song_line):
    """
    Extract the guess rate (X/Y) from a song line.
    Expected format: "71- Song Name - Anime Name (X/Y)"
    """
    match = re.search(r'\((\d+)/(\d+)\)$', song_line)
    if match:
        try:
            guess_rate = int(match.group(1))  # Numerator
            denominator = int(match.group(2))  # Denominator
            return guess_rate, denominator
        except ValueError:
            logging.warning(f"Invalid numbers in guess rate: {match.groups()}")
    return None, None


if __name__ == "__main__":
    # Setup logging
    logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

    # Load JSON data
    try:
        with open('Swap1n myanimelist 2024-12-10 song list.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
        logging.info(f"Loaded JSON data with {len(data)} entries.")
    except Exception as e:
        logging.error(f"Failed to load JSON: {e}")
        exit(1)

    # Extract valid anime names
    valid_anime_names = set()
    for entry in data:
        valid_anime_names.add(entry['animeJPName'])  # Add Japanese name
        if entry['animeENName']:
            valid_anime_names.add(entry['animeENName'])  # Add English name if available
    logging.info(f"Extracted {len(valid_anime_names)} valid anime names.")

    # Read text file
    try:
        with open('Low_Guess_Rate_Songs.txt', 'r', encoding='utf-8') as f:
            lines = f.readlines()
        logging.info(f"Read {len(lines)} lines from the text file.")
    except Exception as e:
        logging.error(f"Failed to read text file: {e}")
        exit(1)

    # Filter songs based on valid anime names
    filtered_songs = []
    for line in lines:
        if line.strip() and ':' not in line:  # Exclude headers and blank lines
            anime_name = extract_anime_name(line)
            if anime_name:
                logging.debug(f"Extracted anime name: {anime_name}")
                if anime_name in valid_anime_names:
                    guess_rate, denominator = parse_guess_rate(line)
                    if guess_rate is not None:
                        filtered_songs.append((line.strip(), guess_rate, denominator))
                        logging.debug(f"Accepted: {line.strip()}")
                else:
                    logging.warning(f"Anime name '{anime_name}' not found in valid list from JSON.")
            else:
                logging.warning(f"Could not extract anime name from line: {line.strip()}")

    logging.info(f"Filtered down to {len(filtered_songs)} songs.")

    # Sort and write filtered songs to a new file
    filtered_songs.sort(key=lambda x: x[1], reverse=True)  # Sort by guess rate descending
    try:
        with open('Filtered_Sorted_Songs.txt', 'w', encoding='utf-8') as f:
            for song, _, _ in filtered_songs:
                f.write(song + '\n')
        logging.info(f"Successfully wrote {len(filtered_songs)} songs to 'Filtered_Sorted_Songs.txt'.")
    except Exception as e:
        logging.error(f"Failed to write output file: {e}")
        exit(1)
