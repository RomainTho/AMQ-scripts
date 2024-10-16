// Input data as an array of objects with song name and anime name
const songs = [
    { "id": 1001, "song_name": "YES!!", "anime_name": "Survival Game Club!" },
    { "id": 1002, "song_name": "Twin memories", "anime_name": "Twin Bee Paradise" },
    { "id": 1003, "song_name": "Chuubyou Gekihatsu Boy", "anime_name": "Outburst Dreamer Boys" },
    { "id": 1004, "song_name": "No Frontier", "anime_name": "The Gene of AI" },
    { "id": 1005, "song_name": "Shinsekai", "anime_name": "Shadowverse" },
    { "id": 1006, "song_name": "Soul Flag", "anime_name": "African Salaryman" },
    { "id": 1007, "song_name": "Sign", "anime_name": "Spice and Wolf: Merchant Meets the Wise Wolf" },
    { "id": 1008, "song_name": "Do Re Mi Fa STARS!!", "anime_name": "Show By Rock!! Stars!!" },
    { "id": 1009, "song_name": "Destiny", "anime_name": "Z/X Code Reunion" },
    { "id": 1010, "song_name": "Dash&Daaash!!", "anime_name": "Ultramarine Magmell" },
    { "id": 1011, "song_name": "Endeavour", "anime_name": "Cestvs: The Roman Fighter" },
    { "id": 1012, "song_name": "Kin-iro Rhodanthe", "anime_name": "KINMOZA! The Movie: Thank You!!" },
    { "id": 1013, "song_name": "ReBorn", "anime_name": "Yashahime: Princess Half-Demon - The Second Act" },
    { "id": 1014, "song_name": "Senryaku-teki de Yosoku Funou na Love Comedy no Ending Kyoku", "anime_name": "Osamake: Romcom Where The Childhood Friend Won't Lose" },
    { "id": 1015, "song_name": "Tsuri no Sekai e", "anime_name": "Diary of Our Days at the Breakwater" },
    { "id": 1016, "song_name": "Lyra", "anime_name": "Steins;Gate 0" },
    { "id": 1017, "song_name": "BLAZE", "anime_name": "Shakugan no Shana II (Second)" },
    { "id": 1018, "song_name": "Ebizori Turn!", "anime_name": "A Terrified Teacher at Ghoul School!" },
    { "id": 1019, "song_name": "Little Dancer", "anime_name": "Sword Art Online Alternative: Gun Gale Online II" },
    { "id": 1020, "song_name": "Together Forever", "anime_name": "Good Bye, Dragon Life" },
    { "id": 1021, "song_name": "Phoenix", "anime_name": "Haigakura" },
    { "id": 1022, "song_name": "Collage", "anime_name": "The Stories of Girls Who Couldn't Be Magicians" },
    { "id": 1023, "song_name": "UNDER and OVER", "anime_name": "Yakuza Fiancé: Raise wa Tanin ga Ii" },
    { "id": 1024, "song_name": "Let's be ONE", "anime_name": "Love Live! Superstar!!" },
    { "id": 1025, "song_name": "Anta Nante.", "anime_name": "Ranma 1/2" },
    { "id": 1026, "song_name": "RE RESCUE", "anime_name": "Blue Exorcist: Beyond the Snow Saga" },
    { "id": 1027, "song_name": "Hoshi no Dengon", "anime_name": "Nina the Starry Bride" },
    { "id": 1028, "song_name": "Hoshi ni demo Negattero", "anime_name": "Pochars" },
    { "id": 1029, "song_name": "Suikou Setten", "anime_name": "Rurouni Kenshin: Kyoto Disturbance" },
    { "id": 1030, "song_name": "Kachitaku Nacchatta ne", "anime_name": "Tonbo" },
    { "id": 1031, "song_name": "Atashi♡Kawaii♡Sengen!!!", "anime_name": "Wataten!: An Angel Flew Down to Me" },
    { "id": 1032, "song_name": "Utsukushiki Kemono-tachi no Tame no", "anime_name": "Code Geass: Lelouch of the Re;surrection" },
    { "id": 1033, "song_name": "Re-sublimity", "anime_name": "Destiny of the Shrine Maiden" },
    { "id": 1034, "song_name": "Yuki no Hate ni Kimi no Na o", "anime_name": "Re:Zero: Starting Life in Another World - The Frozen Bond" },
    { "id": 1035, "song_name": "Sakura Emi Kimi Omou", "anime_name": "D.C.II: Da Capo II" },
    { "id": 1036, "song_name": "Kimi no Uta", "anime_name": "Tokyo Magnitude 8.0" },
    { "id": 1037, "song_name": "Battle Scars", "anime_name": "Blue Exorcist: The Movie" },
    { "id": 1038, "song_name": "Kotoba ni Sezutomo", "anime_name": "Bleach: Thousand-Year Blood War Part 3 - The Conflict" },
    { "id": 1039, "song_name": "Kinoko Inu", "anime_name": "Kinokoinu Mushroom Pup" },
    { "id": 1040, "song_name": "Yawaku Koishite ~Zutto Bokura de Iraremasu You ni~", "anime_name": "Tying the Knot With an Amagami Sister" },
    { "id": 1041, "song_name": "Feedback o Narashite", "anime_name": "Ron Kamonohashi's Forbidden Deductions" },
    { "id": 1042, "song_name": "Hakuchuumu", "anime_name": "High Card" },
    { "id": 1043, "song_name": "SWITCH!", "anime_name": "Gunma-chan" },
    { "id": 1044, "song_name": "Butsukare! Dynamite Battle", "anime_name": "Beyblade Burst Dynamite Battle" },
    { "id": 1045, "song_name": "Aria", "anime_name": "Berserk: The Golden Age Arc - Memorial Edition" },
    { "id": 1046, "song_name": "Setsuna no Kodou", "anime_name": "Hakuoki: Demon of the Fleeting Blossom" },
    { "id": 1047, "song_name": "Wanna Fly?", "anime_name": "World Witches Take Off!" },
    { "id": 1048, "song_name": "Koushousareshi Africa-jin no Uta", "anime_name": "Gosick" },
    { "id": 1049, "song_name": "You", "anime_name": "The Ancient Magus' Bride" },
    { "id": 1050, "song_name": "Feel the Moonlight ~Ai no Utagoe o Kikasete~", "anime_name": "Sing a Bit of Harmony" },
    { "id": 1051, "song_name": "Hiromenes", "anime_name": "Show By Rock!! Mashumairesh!!" },
    { "id": 1052, "song_name": "Kirakira", "anime_name": "365 Days to the Wedding" },
    { "id": 1053, "song_name": "Chaser", "anime_name": "Haigakura" },
    { "id": 1054, "song_name": "Kattou Tomorrow", "anime_name": "Let This Grieving Soul Retire" },
    { "id": 1055, "song_name": "JESUS KNOWS", "anime_name": "Tasuuketsu: Judgement Assizes" },
    { "id": 1056, "song_name": "Yuru Yurin Rin Rin Rin Rin", "anime_name": "YuruYuri Nachu Yachumi!" },
    { "id": 1057, "song_name": "Shooting Star", "anime_name": "Please Teacher!" },
    { "id": 1058, "song_name": "Senpai.", "anime_name": "The Moment You Fall in Love" },
    { "id": 1059, "song_name": "Tokonatsu✩Sunshine", "anime_name": "Love Live! Superstar!!" },
    { "id": 1060, "song_name": "to you for me", "anime_name": "The iDOLM@STER Cinderella Girls U149" },
    { "id": 1061, "song_name": "Orange-iro no Kaze", "anime_name": "Higurashi: When They Cry - Gou" },
    { "id": 1062, "song_name": "Coloring", "anime_name": "Listen to Me, Girls, I Am Your Father!" },
    { "id": 1063, "song_name": "Yume ga Koko kara Hajimaru yo", "anime_name": "Love Live! Nijigasaki High School Idol Club" },
    { "id": 1064, "song_name": "a part of you", "anime_name": "My Mental Choices Are Completely Interfering With My School Romantic Comedy" },
    { "id": 1065, "song_name": "Nanatsu no Umi o Wataru Kaze no You ni", "anime_name": "Detective Conan: Jolly Roger in the Deep Azure" },
    { "id": 1066, "song_name": "Yume de Yozora o Terashitai", "anime_name": "Love Live! Sunshine!!" },
    { "id": 1067, "song_name": "Mayoi Neko Doukoukai no Uta", "anime_name": "Stray Cats Overrun!" },
    { "id": 1068, "song_name": "With The Will", "anime_name": "Digimon Frontier" },
    { "id": 1069, "song_name": "Baton Touch", "anime_name": "The iDOLM@STER Million Live!" },
    { "id": 1070, "song_name": "Sugar Sugar Spice", "anime_name": "Immoral Guild" },
    { "id": 1071, "song_name": "Sakura Message", "anime_name": "IDOLiSH7 Third Beat!" },
    { "id": 1072, "song_name": "SELF CONTROL!!", "anime_name": "Love Live! Sunshine!!" },
    { "id": 1073, "song_name": "Audrey", "anime_name": "Love Live! Nijigasaki High School Idol Club" },
    { "id": 1074, "song_name": "Yume ga Bokura no Taiyou sa", "anime_name": "Love Live! Nijigasaki High School Idol Club" },
    { "id": 1075, "song_name": "Hello, Hoshi o Kazoete", "anime_name": "Love Live! The School Idol Movie" },
    { "id": 1076, "song_name": "Brightest Melody", "anime_name": "Love Live! Sunshine!! The School Idol Movie Over the Rainbow" },
    { "id": 1077, "song_name": "Boku-tachi wa Hitotsu no Hikari", "anime_name": "Love Live! The School Idol Movie" },
    { "id": 1078, "song_name": "Favorite Lover", "anime_name": "Rent-a-Girlfriend" },
    { "id": 1079, "song_name": "Rainy veil", "anime_name": "The Fruit of Grisaia" },
    { "id": 1080, "song_name": "Kimi ni Koi o Musunde", "anime_name": "Tying the Knot With an Amagami Sister" },
    { "id": 1081, "song_name": "Otozure", "anime_name": "You are Ms. Servant" },
    { "id": 1082, "song_name": "Koufuku no Susume", "anime_name": "KamiErabi GOD.app" },
    { "id": 1083, "song_name": "GLANZ", "anime_name": "The Prince of Tennis II U-17 World Cup Semifinal" },
    { "id": 1084, "song_name": "TAIDADA", "anime_name": "Dandadan" },
    { "id": 1085, "song_name": "Ai no Reunion", "anime_name": "TsumaSho" },
    { "id": 1086, "song_name": "Hayo, New World.", "anime_name": "Hamidashi Creative" },
    { "id": 1087, "song_name": "I can't find U", "anime_name": "Qualidea Code" },
    { "id": 1088, "song_name": "POWDER SNOW", "anime_name": "White Album 2" },
    { "id": 1089, "song_name": "Kannou no Eden", "anime_name": "R-15" },
    { "id": 1090, "song_name": "kiss no Yukue", "anime_name": "To LOVE-Ru" },
    { "id": 1091, "song_name": "Lost Game (Movie ver.)", "anime_name": "Hello World" },
    { "id": 1092, "song_name": "New Challenger", "anime_name": "Shinkansen Henkei Robo Shinkalion Z The Animation" },
    { "id": 1093, "song_name": "Bokura no Hashittekita Michi wa...", "anime_name": "Love Live! Sunshine!! The School Idol Movie Over the Rainbow" },
    { "id": 1094, "song_name": "Houkago no Liberty", "anime_name": "We Never Learn!: BOKUBEN Season 2" }
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
  