// Input data as an array of objects with song name and anime name
const songs = [
  { "id": 898, "song_name": "Eden's Song", "anime_name": "The Fruit of Grisaia" },
  { "id": 899, "song_name": "RPG", "anime_name": "C: Control" },
  { "id": 900, "song_name": "Risk my Life -theme of SPELUNKER is a teacher-", "anime_name": "Spelunker Sensei" },
  { "id": 901, "song_name": "Muse ni Nacchau", "anime_name": "Rascal Does Not Dream of a Sister Venturing Out" },
  { "id": 902, "song_name": "I'm GAME!", "anime_name": "Gods' Games We Play" },
  { "id": 903, "song_name": "TORCH", "anime_name": "Clannad After Story" },
  { "id": 904, "song_name": "MONOCHROME", "anime_name": "Bleach: Thousand-Year Blood War" },
  { "id": 905, "song_name": "Familiar", "anime_name": "As a Reincarnated Aristocrat, I'll Use My Appraisal Skill to Rise in the World Season 2" },
  { "id": 906, "song_name": "Eternity Blue", "anime_name": "Fate/Grand Order Final Singularity Grand Temple of Time: Solomon" },
  { "id": 907, "song_name": "triangle", "anime_name": "Shakugan no Shana II (Second)" },
  { "id": 908, "song_name": "dolce", "anime_name": "The Garden of Sinners: Recalled Out Summer - Extra Chorus" },
  { "id": 909, "song_name": "Himitsu no Kotoba", "anime_name": "Alya Sometimes Hides Her Feelings in Russian" },
  { "id": 910, "song_name": "Jaketsu no Shoujo Main Theme", "anime_name": "The Promised Neverland" },
  { "id": 911, "song_name": "Yakusoku no Sora", "anime_name": "Cardcaptor Sakura: Clear Card Prologue" },
  { "id": 912, "song_name": "Sora no Hate", "anime_name": "Unlimited Psychic Squad" },
  { "id": 913, "song_name": "Answer", "anime_name": "March comes in like a lion" },
  { "id": 914, "song_name": "Reunion", "anime_name": "25-Year-Old High School Girl, I Wouldn’t Do This with a Kid" },
  { "id": 915, "song_name": "Tonari Au", "anime_name": "Sagrada Reset" },
  { "id": 916, "song_name": "Alicemagic -Rockstar Ver.-", "anime_name": "Little Busters! EX" },
  { "id": 917, "song_name": "Se-no!", "anime_name": "Yuyushiki" },
  { "id": 918, "song_name": "Yuzurenai Negai", "anime_name": "Magic Knight Rayearth" },
  { "id": 919, "song_name": "Boku to Kimi no Lullaby", "anime_name": "Fairy Tail: Final Season" },
  { "id": 920, "song_name": "Yume ga Samete mo", "anime_name": "Yuri Is My Job!" },
  { "id": 921, "song_name": "LUCID DREAM", "anime_name": "Lockdown Zone: Level X" },
  { "id": 922, "song_name": "Itoshii Kakera", "anime_name": "UFO Princess Walküre" },
  { "id": 923, "song_name": "Sora no Hohoemikata", "anime_name": "Uma Musume: Pretty Derby Season 3" },
  { "id": 924, "song_name": "Nohara", "anime_name": "I've Been Killing Slimes For 300 Years And Maxed Out My Level" },
  { "id": 925, "song_name": "Taisetsu na Hito", "anime_name": "Hinamatsuri" },
  { "id": 926, "song_name": "Sora", "anime_name": "Pokémon the Movie: White - Victini and Zekrom" },
  { "id": 927, "song_name": "Dare ka ga", "anime_name": "Naruto Shippuuden the Movie: The Will of Fire" },
  { "id": 928, "song_name": "action!", "anime_name": "CLAMP in Wonderland 2" },
  { "id": 929, "song_name": "Hashiri Hajimeta Bakari no Kimi ni ~Popipa Acoustic Ver.~", "anime_name": "BanG Dream! Poppin'Dream!" },
  { "id": 930, "song_name": "Honto no Kimochi", "anime_name": "Engaged to the Unidentified" },
  { "id": 931, "song_name": "Yuutousei ja Tsumaranai", "anime_name": "22/7 (Nanabun no Nijyuuni)" },
  { "id": 932, "song_name": "Kagefumi", "anime_name": "Hanasaku Iroha: Home Sweet Home" },
  { "id": 933, "song_name": "telepath ~Hikari no Tou~", "anime_name": "A Certain Magical Index the Movie: The Miracle of Endymion" },
  { "id": 934, "song_name": "Happy Days Creation!", "anime_name": "IDOLiSH7 Third Beat!" },
  { "id": 935, "song_name": "Aporia", "anime_name": "Orb: On the Movements of the Earth" },
  { "id": 936, "song_name": "Mou Ichido Luminous", "anime_name": "BanG Dream! Film Live 2nd Stage" },
  { "id": 937, "song_name": "Dance with Bullets", "anime_name": "Date A Bullet" },
  { "id": 938, "song_name": "Kimi no Senaka", "anime_name": "Gogoat ni Notte" },
  { "id": 939, "song_name": "Exotic Station", "anime_name": "The Ancient Magus' Bride Season 2" },
  { "id": 940, "song_name": "Everlasting Story", "anime_name": "Eternity: Shinya no Nurekoi Channel♡" },
  { "id": 941, "song_name": "HOME", "anime_name": "Fruits Basket Season 2" },
  { "id": 942, "song_name": "Remembrance", "anime_name": "Saga of Tanya the Evil: The Movie" },
  { "id": 943, "song_name": "Between the Soil & Skyline", "anime_name": "Beastars" },
  { "id": 944, "song_name": "Go☆Summer Girl", "anime_name": "Date A Live The Movie: Mayuri Judgement" },
  { "id": 945, "song_name": "DEEP BLUE TOWN e Oide yo", "anime_name": "Deep Blue Town e Oide yo" },
  { "id": 946, "song_name": "7 Girls War", "anime_name": "Wake Up, Girls!" },
  { "id": 947, "song_name": "ULTIMATE♭", "anime_name": "Saekano the Movie: Finale" },
  { "id": 948, "song_name": "Namerou March", "anime_name": "Gekijouban Shirobako" },
  { "id": 949, "song_name": "Showdown", "anime_name": "Cannon Busters" },
  { "id": 950, "song_name": "Dormito Bene", "anime_name": "Bungo Stray Dogs" },
  { "id": 951, "song_name": "Paradise SOS", "anime_name": "Osamake: Romcom Where The Childhood Friend Won't Lose" },
  { "id": 952, "song_name": "Mannaka Sensitive", "anime_name": "To LOVE-Ru" },
  { "id": 953, "song_name": "I miss you misuzu solo", "anime_name": "Fortune Arterial: Akai Yakusoku" },
  { "id": 954, "song_name": "Merchant Meets The Wise Wolf", "anime_name": "Spice and Wolf: Merchant Meets the Wise Wolf" },
  { "id": 955, "song_name": "Invisible Date", "anime_name": "Date A Live The Movie: Mayuri Judgement" },
  { "id": 956, "song_name": "Lucky Tune", "anime_name": "To LOVE-Ru" },
  { "id": 957, "song_name": "Kaze ga Shitteru", "anime_name": "The Pilot's Love Song" },
  { "id": 958, "song_name": "Last Proof", "anime_name": "Trinity Seven: Eternal Library & Alchemic Girl" },
  { "id": 959, "song_name": "cross the line", "anime_name": "Izetta: The Last Witch" },
  { "id": 960, "song_name": "Return to Destiny", "anime_name": "High School of the Dead" },
  { "id": 961, "song_name": "TOKYO WATASHI COLLECTION", "anime_name": "Shine Post" },
  { "id": 962, "song_name": "FOREVER HERE", "anime_name": "Fairy Tail" },
  { "id": 963, "song_name": "Make You Smile!", "anime_name": "Suisei no Freyline: Prologue" },
  { "id": 964, "song_name": "Izayoi Namida", "anime_name": "Hakuoki: Demon of the Fleeting Blossom" },
  { "id": 965, "song_name": "Prism Sympathy", "anime_name": "Fate/kaleid liner Prisma☆Illya 2wei Herz!" },
  { "id": 966, "song_name": "Make Eve Jikkyou Play", "anime_name": "Battle Game in 5 Seconds" },
  { "id": 967, "song_name": "anamnesis", "anime_name": "Another" },
  { "id": 968, "song_name": "LINE", "anime_name": "Naruto Shippuuden" },
  { "id": 969, "song_name": "Hikari no Senritsu", "anime_name": "Sound of the Sky" },
  { "id": 970, "song_name": "Kyuusei Mitama Kyouka", "anime_name": "KamiKatsu: Working for God in a Godless World" },
  { "id": 971, "song_name": "Hai-iro no Saga", "anime_name": "Wandering Witch: The Journey of Elaina" },
  { "id": 972, "song_name": "Landscape", "anime_name": "Fairy Tail" },
  { "id": 973, "song_name": "Gekkouyoku", "anime_name": "Kaina of the Great Snow Sea: Star Sage" },
  { "id": 974, "song_name": "Rana", "anime_name": "Estab-Life: Great Escape" },
  { "id": 975, "song_name": "AHIH", "anime_name": "Date A Live III" },
  { "id": 976, "song_name": "Calling", "anime_name": "Baccano!" },
  { "id": 977, "song_name": "Friends", "anime_name": "Dance in the Vampire Bund" },
  { "id": 978, "song_name": "REVERSI", "anime_name": "Blue Exorcist: The Movie" },
  { "id": 979, "song_name": "Sotsugyou Shousho", "anime_name": "Assassination Classroom Second Season" },
  { "id": 980, "song_name": "Mirai*Girl", "anime_name": "Black Bullet" },
  { "id": 981, "song_name": "Instant Mermaid", "anime_name": "Blend-S" },
  { "id": 982, "song_name": "The last resort", "anime_name": "Cardfight!! Vanguard will+Dress Season 3" },
  { "id": 983, "song_name": "Kimi to no Nakushi Mono", "anime_name": "Little Busters! Refrain" },
  { "id": 984, "song_name": "Ruri-iro no Chikyuu", "anime_name": "Fireworks" },
  { "id": 985, "song_name": "Yasashii Boukyaku", "anime_name": "The Disappearance of Haruhi Suzumiya" },
  { "id": 986, "song_name": "Foul Play ni Kurari", "anime_name": "To LOVE-Ru Darkness" },
  { "id": 987, "song_name": "Break a spell", "anime_name": "Tokyo Ravens" },
  { "id": 988, "song_name": "Open the GATE", "anime_name": "Battle Spirits: Mirage" },
  { "id": 989, "song_name": "Your Lights", "anime_name": "Lapis Re:LiGHTs" },
  { "id": 990, "song_name": "Gingin Perfection", "anime_name": "Adam's Sweet Agony" },
  { "id": 991, "song_name": "Kimi to Ita Sora", "anime_name": "AOKANA: Four Rhythm Across the Blue" },
  { "id": 992, "song_name": "Don't be afraid", "anime_name": "BanG Dream!" },
  { "id": 993, "song_name": "kagami", "anime_name": "Fate/kaleid liner Prisma☆Illya" },
  { "id": 994, "song_name": "Eien no Aria", "anime_name": "The Seven Deadly Sins: Dragon's Judgement" },
  { "id": 995, "song_name": "Lotte's Song Of The Spirits", "anime_name": "Little Witch Academia: The Enchanted Parade" },
  { "id": 996, "song_name": "Cross Road", "anime_name": "Cross Road" },
  { "id": 997, "song_name": "It's my life", "anime_name": "ACCA: 13-Territory Inspection Dept." },
  { "id": 998, "song_name": "Kimi+Nazo+Watashi de JUMP!!", "anime_name": "Baka & Test: Summon the Beasts 2" }
];
  // Function to automate the process
async function automateSongSelection() {
    const notAddedSongs = []; // Array to keep track of songs that weren't added
  
    for (const song of songs) {
      // Step 1: Input the song name into the search box
      const inputField = document.querySelector('#cslgAnisongdbQueryInput');
      inputField.value = song.song_name;
  
      // Simulate a 'change' event to trigger any input-related functionality
      const inputEvent = new Event('input', { bubbles: true });
      inputField.dispatchEvent(inputEvent);
  
      // Step 2: Click the search button to initiate the search
      const searchButton = document.querySelector('#cslgAnisongdbSearchButtonGo');
      if (searchButton) {
        searchButton.click();
      } else {
        console.log('Search button not found!');
        return; // Exit if the button is not found
      }
  
      // Step 3: Wait for the table to update with search results
      await new Promise(resolve => setTimeout(resolve, 1500));  // Wait 1.5 seconds for search results
  
      // Step 4: Find the first matching anime name in the list
      let songFound = false;
      const animeCells = document.querySelectorAll('td.anime');
  
      for (const animeCell of animeCells) {
        if (animeCell.innerText.includes(song.anime_name)) {
          // Step 5: Find the corresponding "plus" button in the same row and click it
          const addButton = animeCell.closest('tr').querySelector('i.fa.fa-plus.clickAble');
          if (addButton) {
            addButton.click();
            console.log(`Added song: ${song.song_name} from ${song.anime_name}`);
            songFound = true;
          }
          break;  // Stop after the first match
        }
      }
  
      if (!songFound) {
        console.log(`Song not found: ${song.song_name} from ${song.anime_name}`);
        notAddedSongs.push(song); // Add to not added songs list
      }
  
      // Optional: Add a delay between each song processing to avoid overwhelming the system
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  
    // Completion message
    console.log('Automation process completed.');
  
    // List songs that weren't added
    if (notAddedSongs.length > 0) {
      console.log('The following songs were not added:');
      notAddedSongs.forEach(song => {
        console.log(`- ${song.song_name} from ${song.anime_name}`);
      });
    } else {
      console.log('All songs were successfully added.');
    }
  }
  
  // Run the automation
  automateSongSelection();
  

  // Function to automate the process
async function automateSongSelection() {
    const notAddedSongs = []; // Array to keep track of songs that weren't added
  
    for (const song of songs) {
      // Step 1: Input the song name into the search box
      const inputField = document.querySelector('#cslgAnisongdbQueryInput');
      inputField.value = song.song_name;
  
      // Simulate a 'change' event to trigger any input-related functionality
      const inputEvent = new Event('input', { bubbles: true });
      inputField.dispatchEvent(inputEvent);
  
      // Step 2: Click the search button to initiate the search
      const searchButton = document.querySelector('#cslgAnisongdbSearchButtonGo');
      if (searchButton) {
        searchButton.click();
      } else {
        console.log('Search button not found!');
        return; // Exit if the button is not found
      }
  
      // Step 3: Wait for the table to update with search results
      await new Promise(resolve => setTimeout(resolve, 1500));  // Wait 1.5 seconds for search results
  
      // Step 4: Find the first matching anime name in the list
      let songFound = false;
      const animeCells = document.querySelectorAll('td.anime');
  
      for (const animeCell of animeCells) {
        if (animeCell.innerText.includes(song.anime_name)) {
          // Step 5: Find the corresponding "plus" button in the same row and click it
          const addButton = animeCell.closest('tr').querySelector('i.fa.fa-plus.clickAble');
          if (addButton) {
            addButton.click();
            console.log(`Added song: ${song.song_name} from ${song.anime_name}`);
            songFound = true;
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
          break;  // Stop after the first match
        }
      }
  
      if (!songFound) {
        console.log(`Song not found: ${song.song_name} from ${song.anime_name}`);
        notAddedSongs.push(song); // Add to not added songs list
      }
  
      // Optional: Add a delay between each song processing to avoid overwhelming the system
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  
    // Completion message
    console.log('Automation process completed.');
  
    // List songs that weren't added
    if (notAddedSongs.length > 0) {
      console.log('The following songs were not added:');
      notAddedSongs.forEach(song => {
        console.log(`- ${song.song_name} from ${song.anime_name}`);
      });
    } else {
      console.log('All songs were successfully added.');
    }
  }
  
  // Run the automation
  automateSongSelection();
  