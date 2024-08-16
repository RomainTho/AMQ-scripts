# AMQ-scripts

## Song History with local storage

Script to store in your browser's local storage, the number of succesful guess, total guess and guessrate of each song you have played.

This script was made by Minigamer42 and is necessary for my other scripts.


## LowGuessrateSongManager
Script to manage low guess rate songs in a window. 

- Only works with LowGuessRateSongTracker and Song History script by Minigamer42 (available here because i can't find the link to his repository)
- You can list all the added songs and delete the ones you don't want to keep

## LowGuessrateSongTracker

Script to automatically add the low guess rate songs in the local storage

Once a song is played and has a guess rate of 33.33% or less with a minimum of 3 times played, it will be added to the local storage.

If the song has a higher guess rate than 33.33% and was in local storage, it will be removed from it.

## Special character shortcut

Script mainly used for no dropdown game mod that allows you to write special characters quickly using "alt + <number>".

Does not work in Song/artist room for now.

## Export AMQ folder

Contains a Local Export Download script to run on your prefered IDE to download songs from a Json made by kempanator's script : https://github.com/kempanator/amq-scripts/blob/main/amqCustomSongListGame.user.js

Run the code with a "merge.json" in the same folder to download your songs.

Json made by AMQ do not have the same format and cannot be used for now.

## Emoji Mod

A poor attempt to bypass emoji only chat on AMQ. Use alt+c to transform every letter you type to the corresponding letter in emoji.

These emojis were disabled in emoji chat only so it does not work.


## Future scripts and ideas 
- Local Storage Json generator : A script to generate a Json file using local storage. Could be useful to make Json files based on low guess rate songs

- Automatic download songs script : A script to download all songs in a JSON to your computer and rename 
