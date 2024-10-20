// Input data as an array of objects with song name and anime name
const songs = [
  { "id": 1095, "song_name": "Ashita mo Mata", "anime_name": "Wotakoi: Love is Hard for Otaku" },
  { "id": 1096, "song_name": "Sleeping Butterfly", "anime_name": "Heaven's Memo Pad" },
  { "id": 1097, "song_name": "Vespertine Bloom", "anime_name": "The Irregular at Magic High School" },
  { "id": 1098, "song_name": "Yes! Idol♥Sengen", "anime_name": "Show By Rock!!" },
  { "id": 1099, "song_name": "Shampoo no Nioi ga Shita", "anime_name": "22/7 (Nanabun no Nijyuuni)" },
  { "id": 1100, "song_name": "Actress", "anime_name": "K-On! Season 2" },
  { "id": 1101, "song_name": "Momo-iro Pixie", "anime_name": "Boku no Imouto wa Osaka Okan" },
  { "id": 1102, "song_name": "Yume-iro Compass", "anime_name": "New Game!!" },
  { "id": 1103, "song_name": "Mezameta Asa ni wa Kimi ga Tonari ni", "anime_name": "Little Busters! EX" },
  { "id": 1104, "song_name": "Wishing diary", "anime_name": "Fate/kaleid liner Prisma☆Illya 2wei Herz!" },
  { "id": 1105, "song_name": "Serious Steel", "anime_name": "Mashle: Magic and Muscles" },
  { "id": 1106, "song_name": "Kare no Shift wa Bunbunbun", "anime_name": "Redline" },
  { "id": 1107, "song_name": "ikiru", "anime_name": "Blue: Line Step Brush" },
  { "id": 1108, "song_name": "Diamond", "anime_name": "InuYasha: The Final Act" },
  { "id": 1109, "song_name": "Bokura no Natsu no Yume", "anime_name": "Summer Wars" },
  { "id": 1110, "song_name": "Quiet sea", "anime_name": "Island" },
  { "id": 1111, "song_name": "Watashi no Shiawase ~Falling In Love With You~", "anime_name": "Eromanga Sensei" },
  { "id": 1112, "song_name": "Niji no Kakera", "anime_name": "One Week Friends" },
  { "id": 1113, "song_name": "Tears Infection", "anime_name": "Myself; Yourself" },
  { "id": 1114, "song_name": "Issho ni Kurasou", "anime_name": "Comic Party Revolution" },
  { "id": 1115, "song_name": "Mitore Ja-no!", "anime_name": "Aikatsu!" },
  { "id": 1116, "song_name": "ONE", "anime_name": "Case Closed: The Last Magician of the Century" },
  { "id": 1117, "song_name": "Namida no Tiara", "anime_name": "Final Approach" },
  { "id": 1118, "song_name": "Koi to Bikini to Ame Yohou", "anime_name": "To LOVE-Ru" },
  { "id": 1119, "song_name": "North method", "anime_name": "Celestial Method" },
  { "id": 1120, "song_name": "Omoi yo Hitotsu ni Nare", "anime_name": "Love Live! Sunshine!!" },
  { "id": 1121, "song_name": "Kiseki Hikaru", "anime_name": "Love Live! Sunshine!! The School Idol Movie Over the Rainbow" },
  { "id": 1122, "song_name": "Future Parade", "anime_name": "Love Live! Nijigasaki High School Idol Club" },
  { "id": 1123, "song_name": "Yume no Tobira", "anime_name": "Love Live! Sunshine!!" },
  { "id": 1124, "song_name": "Shoujo no Koro ni Modotta Mitai ni", "anime_name": "Case Closed: The Fourteenth Target" },
  { "id": 1125, "song_name": "Everlasting", "anime_name": "Case Closed: The Phantom of Baker Street" },
  { "id": 1126, "song_name": "Togetsukyou ~Kimi Omou~", "anime_name": "Detective Conan: The Crimson Love Letter" },
  { "id": 1127, "song_name": "Nani Warotonnen", "anime_name": "Yakuza Fiancé: Raise wa Tanin ga Ii" },
  { "id": 1128, "song_name": "Ito", "anime_name": "Negative Positive Angler" },
  { "id": 1129, "song_name": "Beat the odds", "anime_name": "Trillion Game" },
  { "id": 1130, "song_name": "ODD NUMBER", "anime_name": "Loner Life in Another World" },
  { "id": 1131, "song_name": "Alca", "anime_name": "Natsume's Book of Friends Season 7" },
  { "id": 1132, "song_name": "Nebaneba", "anime_name": "Kagaku×Bouken Survival!" },
  { "id": 1133, "song_name": "Hatsukoi Sengen", "anime_name": "If Her Flag Breaks" },
  { "id": 1134, "song_name": "Kimi-iro ni Somaru ~Earth Star Dream ver.~", "anime_name": "I've Had Enough of Being a Magical Girl. Second Season" },
  { "id": 1135, "song_name": "ANGELUS", "anime_name": "InuYasha" },
  { "id": 1136, "song_name": "Fure Fure Ponpon!", "anime_name": "Good Luck! Ninomiya-kun" },
  { "id": 1137, "song_name": "Again", "anime_name": "Otoboku: Maidens Are Falling for Me!" },
  { "id": 1138, "song_name": "Yume de Ippai", "anime_name": "Power of Hope: Precure Full Bloom" },
  { "id": 1139, "song_name": "All for one Forever", "anime_name": "Eiga Precure All Stars F" },
  { "id": 1140, "song_name": "Safe and Sound", "anime_name": "BanG Dream! 2nd Season" },
  { "id": 1141, "song_name": "Teardrops", "anime_name": "BanG Dream!" },
  { "id": 1142, "song_name": "always", "anime_name": "Case Closed: Countdown to Heaven" },
  { "id": 1143, "song_name": "Lucent Eyes", "anime_name": "Glasslip" },
  { "id": 1144, "song_name": "Saga Jihen", "anime_name": "Zombie Land Saga Revenge" },
  { "id": 1145, "song_name": "Glossy World", "anime_name": "Wake Up, Girls! New Chapter" },
  { "id": 1146, "song_name": "nameless story", "anime_name": "A Certain Scientific Railgun T" },
  { "id": 1147, "song_name": "Moon River", "anime_name": "The Eccentric Family 2" },
  { "id": 1148, "song_name": "Miracle soup", "anime_name": "That Time I Got Reincarnated as a Slime" }
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
  