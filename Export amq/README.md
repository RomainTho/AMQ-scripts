# LocalExportDownloader.py

This script is designed to download anime songs from a JSON file made with Kempanator's script Custom game :
https://github.com/kempanator/amq-scripts/blob/main/amqCustomSongListGame.user.js

Run the code with a "merge.json" in the same folder to download your songs.

Json made by AMQ do not have the same format and cannot be used for now.

## Requirements

### Python Dependencies

- **Python 3.7+**: This script uses features available in Python 3.7 and later versions.
- **`requests` library**: Used to handle HTTP requests for downloading files.

### External Dependencies

- **FFmpeg**: Required for extracting audio from video files. The script uses FFmpeg to convert `.webm` video files into `.mp3` audio files.

### Installation Instructions

1. **Install Python**: Ensure you have Python 3.7 or later installed on your system.
2. **Install Required Python Packages**: The script will automatically install the `requests` library if it's not already installed. You can also install it manually by running:

   ```bash
   pip install requests

3. **Install FFmpeg**: FFmpeg must be installed and accessible via your system's PATH. 


# Exemple of JSON working with LocalExportDownloader

You can find a merged.json in the folder containing all Macross Delta songs as an example

# Rename.py

This is a simple script to rename the metadata of the downloaded audio files to match their filenames. Normally, this step is unnecessary, as the LocalExportDownloader script should handle this automatically.