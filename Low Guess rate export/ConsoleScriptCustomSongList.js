// Input data as an array of objects with song name and anime name
const songs = [
  { "id": 90, "song_name": "Sugao", "anime_name": "Is This a Zombie?", "guess_rate": 0.00 },
  { "id": 334, "song_name": "Accelerate", "anime_name": "Cardfight!! Vanguard will+Dress Season 2", "guess_rate": 0.00 },
  { "id": 87, "song_name": "Fortune Number 0405", "anime_name": "Strike the Blood Second", "guess_rate": 0.00 },
  { "id": 256, "song_name": "Konna Sekai, Shiritakunakatta.", "anime_name": "Akame ga Kill!", "guess_rate": 0.00 },
  { "id": 338, "song_name": "Stand By Me", "anime_name": "Ippon Again!", "guess_rate": 0.00 },
  { "id": 682, "song_name": "Nanatsu no Umi o Wataru Kaze no You ni", "anime_name": "Detective Conan: Jolly Roger in the Deep Azure", "guess_rate": 0.00 },
  { "id": 729, "song_name": "Shoujo no Koro ni Modotta Mitai ni", "anime_name": "Case Closed: The Fourteenth Target", "guess_rate": 0.00 },
  { "id": 57, "song_name": "Season", "anime_name": "JoJo's Bizarre Adventure", "guess_rate": 0.00 },
  { "id": 175, "song_name": "Collection", "anime_name": "Bikkuri-Men", "guess_rate": 0.00 },
  { "id": 229, "song_name": "My Dear SiSTARS!", "anime_name": "Oomuro-ke", "guess_rate": 0.00 },
  { "id": 454, "song_name": "Eiyuu no Uta", "anime_name": "Megaton-kyuu Musashi", "guess_rate": 0.00 },
  { "id": 709, "song_name": "Shampoo no Nioi ga Shita", "anime_name": "22/7 (Nanabun no Nijyuuni)", "guess_rate": 0.00 },
  { "id": 29, "song_name": "One More Time", "anime_name": "Detective Conan: Private Eye in the Distant Sea", "guess_rate": 0.00 },
  { "id": 62, "song_name": "rainy tone", "anime_name": "Grimgar, Ashes and Illusions", "guess_rate": 0.00 },
  { "id": 204, "song_name": "Touch", "anime_name": "More than a Married Couple, but Not Lovers.", "guess_rate": 0.00 },
  { "id": 378, "song_name": "Dash and Go!", "anime_name": "Alice Gear Aegis Expansion", "guess_rate": 0.00 },
  { "id": 463, "song_name": "Ano Hoshi no Mukou ni", "anime_name": "Asteroid in Love", "guess_rate": 0.00 },
  { "id": 602, "song_name": "Miles Away", "anime_name": "Sacrificial Princess and The King of Beasts", "guess_rate": 0.00 },
  { "id": 646, "song_name": "ReBorn", "anime_name": "Yashahime: Princess Half-Demon - The Second Act", "guess_rate": 0.00 },
  { "id": 673, "song_name": "Yuru Yurin Rin Rin Rin Rin", "anime_name": "YuruYuri Nachu Yachumi!", "guess_rate": 0.00 },
  { "id": 723, "song_name": "ONE", "anime_name": "Case Closed: The Last Magician of the Century", "guess_rate": 0.00 },
  { "id": 126, "song_name": "Hidamari Days", "anime_name": "Himouto! Umaru-chan", "guess_rate": 0.00 },
  { "id": 142, "song_name": "Twilight ni Kienaide", "anime_name": "Shomin Sample", "guess_rate": 0.00 },
  { "id": 432, "song_name": "Tomoshibi", "anime_name": "Shadowverse Flame: Seven Shadows Arc", "guess_rate": 0.00 },
  { "id": 465, "song_name": "Step Up", "anime_name": "Duel Masters Win", "guess_rate": 0.00 },
  { "id": 466, "song_name": "Limitless", "anime_name": "Duel Masters Win", "guess_rate": 0.00 },
  { "id": 468, "song_name": "TIME", "anime_name": "500000000 Years Button", "guess_rate": 0.00 },
  { "id": 536, "song_name": "MY FRIENDS", "anime_name": "Macross 7 the Movie: The Galaxy's Calling Me!", "guess_rate": 0.00 },
  { "id": 562, "song_name": "Kuchibiru no Toushou", "anime_name": "Macross Delta Movie: Zettai LIVE!!!!!!", "guess_rate": 0.00 },
  { "id": 590, "song_name": "Kawaru Mirai", "anime_name": "Heaven's Memo Pad", "guess_rate": 0.00 },
  { "id": 611, "song_name": "Kante", "anime_name": "Bungo Stray Dogs", "guess_rate": 0.00 },
  { "id": 655, "song_name": "Suikou Setten", "anime_name": "Rurouni Kenshin: Kyoto Disturbance", "guess_rate": 0.00 },
  { "id": 10, "song_name": "Minna mo Ii na", "anime_name": "Is This a Zombie? of the Dead", "guess_rate": 0.00 },
  { "id": 145, "song_name": "Good Luck Waker", "anime_name": "Pon no Michi", "guess_rate": 0.00 },
  { "id": 266, "song_name": "Endless Notes", "anime_name": "Grimms Notes the Animation", "guess_rate": 0.00 },
  { "id": 270, "song_name": "Setsugetsu Fuuka", "anime_name": "Dog Signal", "guess_rate": 0.00 },
  { "id": 274, "song_name": "CHE.R.RY", "anime_name": "ReLIFE", "guess_rate": 0.00 },
  { "id": 354, "song_name": "Let's ZING!", "anime_name": "Phantom of the Idol", "guess_rate": 0.00 },
  { "id": 453, "song_name": "Eclipse", "anime_name": "The Little Lies We All Tell", "guess_rate": 0.00 },
  { "id": 455, "song_name": "Fly High", "anime_name": "Vazzrock the Animation", "guess_rate": 0.00 },
  { "id": 459, "song_name": "Infinite", "anime_name": "Extreme Hearts", "guess_rate": 0.00 },
  { "id": 470, "song_name": "HOLY SHINE", "anime_name": "Fairy Tail", "guess_rate": 0.00 },
  { "id": 485, "song_name": "3", "anime_name": "Ultraman", "guess_rate": 0.00 },
  { "id": 601, "song_name": "Inori no Hane", "anime_name": "New Game!", "guess_rate": 0.00 },
  { "id": 715, "song_name": "Diamond", "anime_name": "InuYasha: The Final Act", "guess_rate": 0.00 },
  { "id": 718, "song_name": "Watashi no Shiawase ~Falling In Love With You~", "anime_name": "Eromanga Sensei", "guess_rate": 0.00 },
  { "id": 728, "song_name": "Future Parade", "anime_name": "Love Live! Nijigasaki High School Idol Club", "guess_rate": 0.00 },
  { "id": 739, "song_name": "Again", "anime_name": "Otoboku: Maidens Are Falling for Me!", "guess_rate": 0.00 },
  { "id": 42, "song_name": "Harmonia", "anime_name": "The Anthem of the Heart", "guess_rate": 0.00 },
  { "id": 44, "song_name": "CONTINUE...?", "anime_name": "New Game!", "guess_rate": 0.00 },
  { "id": 364, "song_name": "Oni no Dekugatana, Kaku Katariki", "anime_name": "The Ones Within", "guess_rate": 0.00 },
  { "id": 373, "song_name": "Senkin Dur da Blá", "anime_name": "Senki Zesshou Symphogear GX", "guess_rate": 0.00 },
  { "id": 412, "song_name": "Prayer", "anime_name": "Delico's Nursery", "guess_rate": 0.00 },
  { "id": 418, "song_name": "Historia", "anime_name": "Duel Masters King Max", "guess_rate": 0.00 },
  { "id": 478, "song_name": "Tonosaman no Uta", "anime_name": "Kotaro Lives Alone", "guess_rate": 0.00 },
  { "id": 501, "song_name": "Shiroi Kokoro", "anime_name": "Oreimo", "guess_rate": 0.00 },
  { "id": 510, "song_name": "Infection", "anime_name": "High School of the Dead", "guess_rate": 0.00 },
  { "id": 513, "song_name": "TIME-TO-MORE", "anime_name": "Chinzei Hachirou Tametomo", "guess_rate": 0.00 },
  { "id": 548, "song_name": "Invincible Fighter", "anime_name": "Cardfight!! Vanguard: High School Arc Cont.", "guess_rate": 0.00 },
  { "id": 563, "song_name": "Yasashii Sekai no Komoriuta", "anime_name": "'Tis Time for Torture, Princess", "guess_rate": 0.00 },
  { "id": 669, "song_name": "Wanna Fly?", "anime_name": "World Witches Take Off!", "guess_rate": 0.00 },
  { "id": 685, "song_name": "Baton Touch", "anime_name": "The iDOLM@STER Million Live!", "guess_rate": 0.00 },
  { "id": 692, "song_name": "Favorite Lover", "anime_name": "Rent-a-Girlfriend", "guess_rate": 0.00 },
  { "id": 694, "song_name": "Kimi ni Koi o Musunde", "anime_name": "Tying the Knot With an Amagami Sister", "guess_rate": 0.00 },
  { "id": 713, "song_name": "Mezameta Asa ni wa Kimi ga Tonari ni", "anime_name": "Little Busters! EX", "guess_rate": 0.00 },
  { "id": 721, "song_name": "Issho ni Kurasou", "anime_name": "Comic Party Revolution", "guess_rate": 0.00 },
  { "id": 748, "song_name": "Moon River", "anime_name": "The Eccentric Family 2", "guess_rate": 0.00 },
  { "id": 48, "song_name": "Ichibanboshi no Uta ~Mirai no Legend Densetsu~", "anime_name": "I★CHU: Halfway Through The Idol", "guess_rate": 0.00 },
  { "id": 49, "song_name": "Ho・N・To・U・So", "anime_name": "Tales of Symphonia the Animation: The United World Episode", "guess_rate": 0.00 },
  { "id": 78, "song_name": "call your name", "anime_name": "Sacrificial Princess and The King of Beasts", "guess_rate": 0.00 },
  { "id": 80, "song_name": "Azayaka na Tabiji", "anime_name": "Fairy Tail", "guess_rate": 0.00 },
  { "id": 119, "song_name": "INSIDE IDENTITY", "anime_name": "Love, Chunibyo & Other Delusions!", "guess_rate": 0.00 },
  { "id": 132, "song_name": "Returns", "anime_name": "BanG Dream! 2nd Season", "guess_rate": 0.00 },
  { "id": 143, "song_name": "Todokanai Koi '13", "anime_name": "White Album 2", "guess_rate": 0.00 },
  { "id": 242, "song_name": "Ima o Dakishimete", "anime_name": "Brighter than the Dawning Blue", "guess_rate": 0.00 },
  { "id": 289, "song_name": "Gensou Drive", "anime_name": "The Lost Village", "guess_rate": 0.00 },
  { "id": 295, "song_name": "Daitan", "anime_name": "Detective Conan vs. Kaito Kid", "guess_rate": 0.00 },
  { "id": 393, "song_name": "Lightship", "anime_name": "Sonny Boy", "guess_rate": 0.00 },
  { "id": 397, "song_name": "Tatakai ga Kieta Hi", "anime_name": "Duel Masters Win: Duel Wars", "guess_rate": 0.00 },
  { "id": 398, "song_name": "Sarracenia", "anime_name": "Hanma Baki: Son of Ogre", "guess_rate": 0.00 },
  { "id": 503, "song_name": "Hustle 2022", "anime_name": "Eiga Kaiketsu Zorori: Lalala♪ Star Tanjou", "guess_rate": 0.00 },
  { "id": 573, "song_name": "close to you", "anime_name": "Welcome to Pia Carrot!: Sayaka's Love Story", "guess_rate": 0.00 },
  { "id": 598, "song_name": "Kimi ga Iru kara", "anime_name": "Fairy Tail", "guess_rate": 0.00 },
  { "id": 610, "song_name": "Yozora no Stairs", "anime_name": "A Good Librarian Like a Good Shepherd", "guess_rate": 0.00 },
  { "id": 643, "song_name": "Dash&Daaash!!", "anime_name": "Ultramarine Magmell", "guess_rate": 0.00 },
  { "id": 651, "song_name": "Phoenix", "anime_name": "Haigakura", "guess_rate": 0.00 },
  { "id": 708, "song_name": "Yes! Idol♥Sengen", "anime_name": "Show By Rock!!", "guess_rate": 0.00 },
  { "id": 712, "song_name": "Yume-iro Compass", "anime_name": "New Game!!", "guess_rate": 0.00 },
  { "id": 742, "song_name": "Safe and Sound", "anime_name": "BanG Dream! 2nd Season", "guess_rate": 0.00 },
  { "id": 744, "song_name": "always", "anime_name": "Case Closed: Countdown to Heaven", "guess_rate": 0.00 },
  { "id": 15, "song_name": "Positive★Paradise", "anime_name": "Lapis Re:LiGHTs", "guess_rate": 0.00 },
  { "id": 141, "song_name": "L・O・V・E・Ly Loco♡", "anime_name": "Gushing Over Magical Girls", "guess_rate": 0.00 },
  { "id": 174, "song_name": "Prayer", "anime_name": "The Kingdoms of Ruin", "guess_rate": 0.00 },
  { "id": 248, "song_name": "Gakkyuu Nisshi", "anime_name": "Blue Exorcist: Shimane Illuminati Saga", "guess_rate": 0.00 },
  { "id": 253, "song_name": "Ponytail no Shijuu", "anime_name": "No-Rin", "guess_rate": 0.00 },
  { "id": 361, "song_name": "BRAVE THE OCEAN", "anime_name": "Re:Creators", "guess_rate": 0.00 },
  { "id": 366, "song_name": "Akihabara☆Dance☆Now!!", "anime_name": "Oreimo", "guess_rate": 0.00 },
  { "id": 374, "song_name": "Spinning World", "anime_name": "Naruto Shippuuden", "guess_rate": 0.00 },
  { "id": 399, "song_name": "Tsubomi", "anime_name": "Naruto the Movie: Guardians of the Crescent Moon Kingdom", "guess_rate": 0.00 },
  { "id": 407, "song_name": "Warabe Uta ~Kotonaru Katachi~", "anime_name": "Somali and the Forest Spirit", "guess_rate": 0.00 },
  { "id": 462, "song_name": "SWINGING", "anime_name": "The Tower of Druaga: The Aegis of Uruk", "guess_rate": 0.00 },
  { "id": 467, "song_name": "Gyoukou", "anime_name": "Lucifer and the Biscuit Hammer", "guess_rate": 0.00 },
  { "id": 477, "song_name": "Marukoppa", "anime_name": "Chimimo", "guess_rate": 0.00 },
  { "id": 480, "song_name": "Harutsubame", "anime_name": "Love All Play", "guess_rate": 0.00 },
  { "id": 487, "song_name": "Sandersonia", "anime_name": "Love All Play", "guess_rate": 0.00 },
  { "id": 506, "song_name": "The Beast", "anime_name": "Hanma Baki: Son of Ogre", "guess_rate": 0.00 },
  { "id": 516, "song_name": "Tokitoshite Violence", "anime_name": "Dropkick on My Devil!! Dash", "guess_rate": 0.00 },
  { "id": 526, "song_name": "Switch", "anime_name": "The Fable", "guess_rate": 0.00 },
  { "id": 538, "song_name": "Shining Future", "anime_name": "Princess Connect! Re:Dive Season 2", "guess_rate": 0.00 },
  { "id": 580, "song_name": "Brain Diver", "anime_name": "Phi Brain: Puzzle of God", "guess_rate": 0.00 },
  { "id": 588, "song_name": "16bit Girl", "anime_name": "Date A Live", "guess_rate": 0.00 },
  { "id": 624, "song_name": "Sayonara Kimi no Koe", "anime_name": "Mashiro-iro Symphony: The Color of Lovers", "guess_rate": 0.00 },
  { "id": 665, "song_name": "Hakuchuumu", "anime_name": "High Card", "guess_rate": 0.00 },
  { "id": 777, "song_name": "Rinne", "anime_name": "Muv-Luv Alternative", "guess_rate": 0.00 },
  { "id": 847, "song_name": "Tiny Tiny", "anime_name": "Frame Arms Girl: Kyakkya Ufufu na Wonderland", "guess_rate": 0.00 },
  { "id": 897, "song_name": "Itoshii Kakera", "anime_name": "UFO Princess Walküre", "guess_rate": 0.00 },
  { "id": 956, "song_name": "Ruri-iro no Chikyuu", "anime_name": "Fireworks", "guess_rate": 0.00 },
  { "id": 972, "song_name": "Romantic Manifesto", "anime_name": "Kaguya-sama: Love Is War - The First Kiss That Never Ends", "guess_rate": 0.00 },
  { "id": 1029, "song_name": "Kimi to Boku no 1-nichi", "anime_name": "Is It Wrong to Try to Pick Up Girls in a Dungeon?", "guess_rate": 0.00 },
  { "id": 24, "song_name": "Haru no Mukou", "anime_name": "Hanasaku Iroha: Blossoms for Tomorrow", "guess_rate": 0.00 },
  { "id": 30, "song_name": "Sweet Heart Restaurant", "anime_name": "Aikatsu!", "guess_rate": 0.00 },
  { "id": 31, "song_name": "Kami-kazari no Tenshi", "anime_name": "Ascendance of a Bookworm", "guess_rate": 0.00 },
  { "id": 135, "song_name": "Heart Voice", "anime_name": "The iDOLM@STER Cinderella Girls", "guess_rate": 0.00 },
  { "id": 140, "song_name": "Beautiful World", "anime_name": "Pretty Cure", "guess_rate": 0.00 },
  { "id": 161, "song_name": "Shinobiashi de Unzaunza o Odoru", "anime_name": "Ninja Collection", "guess_rate": 0.00 },
  { "id": 169, "song_name": "A.R.I.A", "anime_name": "Lapis Re:LiGHTs", "guess_rate": 0.00 },
  { "id": 222, "song_name": "Nitari", "anime_name": "Theatre of Darkness: Yamishibai", "guess_rate": 0.00 },
  { "id": 312, "song_name": "Manazashi", "anime_name": "When They Cry Rei", "guess_rate": 0.00 },
  { "id": 313, "song_name": "Kaisei Joushou Hallelujah", "anime_name": "Yu-Gi-Oh! GX", "guess_rate": 0.00 },
  { "id": 389, "song_name": "Angel Wink", "anime_name": "The Disastrous Life of Saiki K.", "guess_rate": 0.00 },
  { "id": 424, "song_name": "Special Force", "anime_name": "Miss Kuroitsu from the Monster Development Department", "guess_rate": 0.00 },
  { "id": 435, "song_name": "Sailor Star Song", "anime_name": "Pretty Guardian Sailor Moon Cosmos The Movie", "guess_rate": 0.00 },
  { "id": 471, "song_name": "Okaa-san no Uta", "anime_name": "Wolf Children", "guess_rate": 0.00 },
  { "id": 493, "song_name": "-Be As One-", "anime_name": "Fairy Tail", "guess_rate": 0.00 },
  { "id": 568, "song_name": "Maxwell's witch", "anime_name": "El Cazador de la Bruja", "guess_rate": 0.00 },
  { "id": 572, "song_name": "Kimi no Kakera", "anime_name": "Natsume's Book of Friends Season 3", "guess_rate": 0.00 },
  { "id": 585, "song_name": "Yumedayori", "anime_name": "Cue!", "guess_rate": 0.00 },
  { "id": 589, "song_name": "Madobe no Akari", "anime_name": "Yuki Yuna is a Hero: The Hero Chapter", "guess_rate": 0.00 },
  { "id": 617, "song_name": "Memories of days gone by", "anime_name": "High School of the Dead", "guess_rate": 0.00 },
  { "id": 711, "song_name": "Momo-iro Pixie", "anime_name": "Boku no Imouto wa Osaka Okan", "guess_rate": 0.00 },
  { "id": 724, "song_name": "Namida no Tiara", "anime_name": "Final Approach", "guess_rate": 0.00 },
  { "id": 774, "song_name": "Real World", "anime_name": "Humanity Has Declined", "guess_rate": 0.00 },
  { "id": 803, "song_name": "Mizukagami no Sekai", "anime_name": "The Devil is a Part-Timer! Season 2", "guess_rate": 0.00 },
  { "id": 810, "song_name": "Komari Warai", "anime_name": "Natsume's Book of Friends Season 7", "guess_rate": 0.00 },
  { "id": 877, "song_name": "I'm GAME!", "anime_name": "Gods' Games We Play", "guess_rate": 0.00 },
  { "id": 878, "song_name": "TORCH", "anime_name": "Clannad After Story", "guess_rate": 0.00 },
  { "id": 944, "song_name": "Kyuusei Mitama Kyouka", "anime_name": "KamiKatsu: Working for God in a Godless World", "guess_rate": 0.00 },
  { "id": 964, "song_name": "Don't be afraid", "anime_name": "BanG Dream!", "guess_rate": 0.00 },
  { "id": 969, "song_name": "It's my life", "anime_name": "ACCA: 13-Territory Inspection Dept.", "guess_rate": 0.00 },
  { "id": 975, "song_name": "Chime", "anime_name": "Fruits Basket", "guess_rate": 0.00 },
  { "id": 985, "song_name": "ALMATERIA", "anime_name": "Tales of Symphonia the Animation: Sylvarant Episode", "guess_rate": 0.00 },
  { "id": 1010, "song_name": "Kikaijikake no Sanka", "anime_name": "Prima Doll", "guess_rate": 0.00 },
  { "id": 1072, "song_name": "Ai no Melody", "anime_name": "Origin: Spirits of the Past", "guess_rate": 0.00 },
  { "id": 1164, "song_name": "Sekirei", "anime_name": "Sekirei", "guess_rate": 0.00 },
  { "id": 1169, "song_name": "Mirai Eigou", "anime_name": "World Trigger", "guess_rate": 0.00 },
  { "id": 1175, "song_name": "MOVE ON BABY", "anime_name": "A Nobody's Way Up to an Exploration Hero", "guess_rate": 0.00 },
  { "id": 1178, "song_name": "de messiah", "anime_name": "I'm Quitting Heroing", "guess_rate": 0.00 },
  { "id": 107, "song_name": "'Suki' o Oshitekudasai", "anime_name": "Love Tyrant", "guess_rate": 0.00 },
  { "id": 122, "song_name": "Gelida fenice", "anime_name": "Ben-To", "guess_rate": 0.00 },
  { "id": 172, "song_name": "Say My Name", "anime_name": "Tokyo Revengers: Tenjiku Arc", "guess_rate": 0.00 },
  { "id": 191, "song_name": "I want to know", "anime_name": "Kill la Kill", "guess_rate": 0.00 },
  { "id": 226, "song_name": "Wayawayawaa!", "anime_name": "Hokkaido Gals Are Super Adorable!", "guess_rate": 0.00 },
  { "id": 439, "song_name": "Kimi ga Kureta Mono", "anime_name": "Fairy Tail", "guess_rate": 0.00 },
  { "id": 505, "song_name": "Duel Shiyou ze!", "anime_name": "Yu-Gi-Oh! Go Rush!!", "guess_rate": 0.00 },
  { "id": 543, "song_name": "Ashita wa Ashita no Kaze ga Fuku", "anime_name": "'Tis Time for Torture, Princess", "guess_rate": 0.00 },
  { "id": 667, "song_name": "Aria", "anime_name": "Berserk: The Golden Age Arc I - The Egg of the King", "guess_rate": 0.00 },
  { "id": 755, "song_name": "Snow Magic Fantasy", "anime_name": "Teasing Master Takagi-san 3", "guess_rate": 0.00 },
  { "id": 780, "song_name": "Odoriko", "anime_name": "Heaven's Lost Property: Forte", "guess_rate": 0.00 },
  { "id": 790, "song_name": "Naisho no Uta", "anime_name": "Kurayukaba", "guess_rate": 0.00 },
  { "id": 794, "song_name": "Aozora no Mukou", "anime_name": "Bungaku Shoujo Memoir", "guess_rate": 0.00 },
  { "id": 800, "song_name": "Mr.Cool", "anime_name": "City Hunter: Shinjuku Private Eyes", "guess_rate": 0.00 },
  { "id": 801, "song_name": "WILD EYES", "anime_name": "Basilisk", "guess_rate": 0.00 },
  { "id": 805, "song_name": "antiphona", "anime_name": "C: Control", "guess_rate": 0.00 },
  { "id": 818, "song_name": "Yuuyami no Uta", "anime_name": "Sengoku Youko", "guess_rate": 0.00 },
  { "id": 853, "song_name": "Lovely&Lonely", "anime_name": "Tattoon Master", "guess_rate": 0.00 },
  { "id": 874, "song_name": "RPG", "anime_name": "C: Control", "guess_rate": 0.00 },
  { "id": 883, "song_name": "dolce", "anime_name": "The Garden of Sinners: Recalled Out Summer - Extra Chorus", "guess_rate": 0.00 },
  { "id": 886, "song_name": "Yakusoku no Sora", "anime_name": "Cardcaptor Sakura: Clear Card Prologue", "guess_rate": 0.00 },
  { "id": 890, "song_name": "Tonari Au", "anime_name": "Sagrada Reset", "guess_rate": 0.00 },
  { "id": 896, "song_name": "LUCID DREAM", "anime_name": "Lockdown Zone: Level X", "guess_rate": 0.00 },
  { "id": 905, "song_name": "Honto no Kimochi", "anime_name": "Engaged to the Unidentified", "guess_rate": 0.00 },
  { "id": 911, "song_name": "Mou Ichido Luminous", "anime_name": "BanG Dream! Film Live 2nd Stage", "guess_rate": 0.00 },
  { "id": 918, "song_name": "Between the Soil & Skyline", "anime_name": "Beastars", "guess_rate": 0.00 },
  { "id": 919, "song_name": "Go☆Summer Girl", "anime_name": "Date A Live The Movie: Mayuri Judgement", "guess_rate": 0.00 },
  { "id": 923, "song_name": "Namerou March", "anime_name": "Gekijouban Shirobako", "guess_rate": 0.00 },
  { "id": 929, "song_name": "Merchant Meets The Wise Wolf", "anime_name": "Spice and Wolf: Merchant Meets the Wise Wolf", "guess_rate": 0.00 },
  { "id": 934, "song_name": "cross the line", "anime_name": "Izetta: The Last Witch", "guess_rate": 0.00 },
  { "id": 962, "song_name": "Gingin Perfection", "anime_name": "Adam's Sweet Agony", "guess_rate": 0.00 },
  { "id": 992, "song_name": "Future Strike", "anime_name": "ViVid Strike!", "guess_rate": 0.00 },
  { "id": 1000, "song_name": "Tokohana", "anime_name": "Black Bullet", "guess_rate": 0.00 },
  { "id": 1006, "song_name": "Springles Sour Cream", "anime_name": "Osamake: Romcom Where The Childhood Friend Won't Lose", "guess_rate": 0.00 },
  { "id": 1011, "song_name": "Kimi no Tonari", "anime_name": "Wotakoi: Love is Hard for Otaku", "guess_rate": 0.00 },
  { "id": 1017, "song_name": "Owarinai Yume", "anime_name": "InuYasha", "guess_rate": 0.00 },
  { "id": 1020, "song_name": "my starry boy", "anime_name": "Ladies versus Butlers!", "guess_rate": 0.00 },
  { "id": 1024, "song_name": "Konchuu-tachi mo Shukufuku Suru Mori no Wedding", "anime_name": "The Kawai Complex Guide to Manors and Hostel Behavior", "guess_rate": 0.00 },
  { "id": 1030, "song_name": "Shukusaika", "anime_name": "Prima Doll", "guess_rate": 0.00 },
  { "id": 1032, "song_name": "Old Grey Pine", "anime_name": "Great Pretender Razbliuto", "guess_rate": 0.00 },
  { "id": 1038, "song_name": "AIAIAI", "anime_name": "Virtualsan: Looking", "guess_rate": 0.00 },
  { "id": 1055, "song_name": "Yume < Utsutsu → Happy Time", "anime_name": "Is the Order a Rabbit? BLOOM", "guess_rate": 0.00 },
  { "id": 1071, "song_name": "Get along", "anime_name": "The Slayers", "guess_rate": 0.00 },
  { "id": 1075, "song_name": "mnemonic", "anime_name": "A Lull in the Sea", "guess_rate": 0.00 },
  { "id": 1081, "song_name": "Gunjou", "anime_name": "Drifting Dragons", "guess_rate": 0.00 },
  { "id": 1112, "song_name": "Mayonaka no Himawari", "anime_name": "Hokkaido Gals Are Super Adorable!", "guess_rate": 0.00 },
  { "id": 1113, "song_name": "Étude", "anime_name": "Cinderella Nine", "guess_rate": 0.00 },
  { "id": 1136, "song_name": "Yasashisa ni Tsutsumareta Nara", "anime_name": "Kiki's Delivery Service", "guess_rate": 0.00 },
  { "id": 1137, "song_name": "Divinity", "anime_name": "Final Fantasy VII: Advent Children", "guess_rate": 0.00 },
  { "id": 1192, "song_name": "Sama Cani!!", "anime_name": "Eternity Memories", "guess_rate": 0.00 },
  { "id": 109, "song_name": "Tenchou no Confiance", "anime_name": "Waccha PriMagi!", "guess_rate": 0.00 },
  { "id": 157, "song_name": "ID", "anime_name": "Fire Force Season 2", "guess_rate": 0.00 },
  { "id": 163, "song_name": "Shiroi Doro", "anime_name": "Major 2nd", "guess_rate": 0.00 },
  { "id": 167, "song_name": "ad meliora", "anime_name": "Fruits Basket Season 2", "guess_rate": 0.00 },
  { "id": 197, "song_name": "Requiem of Red", "anime_name": "K", "guess_rate": 0.00 },
  { "id": 292, "song_name": "Kuchibiru Daydream", "anime_name": "Lucky Star", "guess_rate": 0.00 },
  { "id": 447, "song_name": "Tomodachi", "anime_name": "Yuki Yuna is a Hero: Washio Sumi Chapter", "guess_rate": 0.00 },
  { "id": 488, "song_name": "BE the HERO", "anime_name": "Lucifer and the Biscuit Hammer", "guess_rate": 0.00 },
  { "id": 511, "song_name": "Baby Sweet Berry Love", "anime_name": "HENNEKO: The Hentai Prince and the Stony Cat", "guess_rate": 0.00 },
  { "id": 686, "song_name": "Sugar Sugar Spice", "anime_name": "Immoral Guild", "guess_rate": 0.00 },
  { "id": 734, "song_name": "Nebaneba", "anime_name": "Kagaku×Bouken Survival!", "guess_rate": 0.00 },
  { "id": 760, "song_name": "SatisHakushon", "anime_name": "Genie Family 2020", "guess_rate": 0.00 },
  { "id": 762, "song_name": "ENDiNG MiRAGE", "anime_name": "World's End Harem", "guess_rate": 0.00 },
  { "id": 776, "song_name": "REASON TRIANGLE", "anime_name": "Joker Game", "guess_rate": 0.00 },
  { "id": 791, "song_name": "Sacrifice", "anime_name": "Berserk", "guess_rate": 0.00 },
  { "id": 798, "song_name": "Tomoshibi", "anime_name": "Tomodachi Game", "guess_rate": 0.00 },
  { "id": 824, "song_name": "Ana", "anime_name": "Clannad", "guess_rate": 0.00 },
  { "id": 842, "song_name": "Sakura Nagashi", "anime_name": "Evangelion: 3.33 You Can (Not) Redo", "guess_rate": 0.00 },
  { "id": 848, "song_name": "Freeze", "anime_name": "Seven Knights Revolution: Hero Successor", "guess_rate": 0.00 },
  { "id": 851, "song_name": "Wa -cycle-", "anime_name": "The Ancient Magus' Bride", "guess_rate": 0.00 },
  { "id": 852, "song_name": "Natsugare", "anime_name": "Drifting Home", "guess_rate": 0.00 },
  { "id": 854, "song_name": "Otome no Tawawa", "anime_name": "Tawawa on Monday", "guess_rate": 0.00 },
  { "id": 861, "song_name": "Hanarete Itemo", "anime_name": "Digimon Adventure: Last Evolution Kizuna", "guess_rate": 0.00 },
  { "id": 863, "song_name": "PUPPET'S", "anime_name": "Tesla Note", "guess_rate": 0.00 },
  { "id": 864, "song_name": "I Love Me no Theme", "anime_name": "I Love Me", "guess_rate": 0.00 },
  { "id": 870, "song_name": "Sore de Ii yo", "anime_name": "Someone's Gaze", "guess_rate": 0.00 },
  { "id": 871, "song_name": "Bokurashisa", "anime_name": "A Terrified Teacher at Ghoul School!", "guess_rate": 0.00 },
  { "id": 872, "song_name": "Kimi-iro Love Song", "anime_name": "Magical☆Star Kanon 100%", "guess_rate": 0.00 },
  { "id": 876, "song_name": "Muse ni Nacchau", "anime_name": "Rascal Does Not Dream of a Sister Venturing Out", "guess_rate": 0.00 },
  { "id": 888, "song_name": "Answer", "anime_name": "March comes in like a lion", "guess_rate": 0.00 },
  { "id": 894, "song_name": "Boku to Kimi no Lullaby", "anime_name": "Fairy Tail: Final Season", "guess_rate": 0.00 },
  { "id": 900, "song_name": "Taisetsu na Hito", "anime_name": "Hinamatsuri", "guess_rate": 0.00 },
  { "id": 913, "song_name": "Kimi no Senaka", "anime_name": "Gogoat ni Notte", "guess_rate": 0.00 },
  { "id": 914, "song_name": "Exotic Station", "anime_name": "The Ancient Magus' Bride Season 2", "guess_rate": 0.00 },
  { "id": 926, "song_name": "Paradise SOS", "anime_name": "Osamake: Romcom Where The Childhood Friend Won't Lose", "guess_rate": 0.00 },
  { "id": 927, "song_name": "Mannaka Sensitive", "anime_name": "To LOVE-Ru", "guess_rate": 0.00 },
  { "id": 938, "song_name": "Make You Smile!", "anime_name": "Suisei no Freyline: Prologue", "guess_rate": 0.00 },
  { "id": 941, "song_name": "Make Eve Jikkyou Play", "anime_name": "Battle Game in 5 Seconds", "guess_rate": 0.00 },
  { "id": 952, "song_name": "Mirai*Girl", "anime_name": "Black Bullet", "guess_rate": 0.00 },
  { "id": 955, "song_name": "Kimi to no Nakushi Mono", "anime_name": "Little Busters! Refrain", "guess_rate": 0.00 },
  { "id": 960, "song_name": "Open the GATE", "anime_name": "Battle Spirits: Mirage", "guess_rate": 0.00 },
  { "id": 977, "song_name": "Hikari Sasuhou (FK Metal ver.)", "anime_name": "Murder Princess", "guess_rate": 0.00 },
  { "id": 978, "song_name": "Ranran Boogie Woogie", "anime_name": "Rainbow", "guess_rate": 0.00 },
  { "id": 979, "song_name": "ØωØver!!", "anime_name": "The iDOLM@STER Cinderella Girls", "guess_rate": 0.00 },
  { "id": 989, "song_name": "Hitori ja Nai!", "anime_name": "Aikatsu Friends!: Kagayaki no Jewel", "guess_rate": 0.00 },
  { "id": 991, "song_name": "Boku no Te ni Fureru na", "anime_name": "Chiruran 1/2", "guess_rate": 0.00 },
  { "id": 993, "song_name": "Eyecatch! Too much!", "anime_name": "WWW.WAGNARIA!!", "guess_rate": 0.00 },
  { "id": 997, "song_name": "Kimi ga Iru", "anime_name": "Initial D: Second Stage", "guess_rate": 0.00 },
  { "id": 1003, "song_name": "Fight For the Freedom", "anime_name": "Re: Hamatora", "guess_rate": 0.00 },
  { "id": 1004, "song_name": "makemagic", "anime_name": "Yu-Gi-Oh! 3D: Bonds Beyond Time", "guess_rate": 0.00 },
  { "id": 1012, "song_name": "Mo・Gi・Ta・Te♡Fruit Girls", "anime_name": "No-Rin", "guess_rate": 0.00 },
  { "id": 1019, "song_name": "Kokoro no Kagi", "anime_name": "Fairy Tail", "guess_rate": 0.00 },
  { "id": 1022, "song_name": "Umi", "anime_name": "Girlfriend, Girlfriend Season 2", "guess_rate": 0.00 },
  { "id": 1027, "song_name": "PUZZLE", "anime_name": "Detective Conan: The Raven Chaser", "guess_rate": 0.00 },
  { "id": 1037, "song_name": "Pausing Shutter", "anime_name": "Spy Classroom", "guess_rate": 0.00 },
  { "id": 1047, "song_name": "FUSE", "anime_name": "Darling in the FranXX", "guess_rate": 0.00 },
  { "id": 1056, "song_name": "Dekitate Evo!Revo!Generation!", "anime_name": "The iDOLM@STER Cinderella Girls", "guess_rate": 0.00 },
  { "id": 1070, "song_name": "Suzukaze", "anime_name": "Riddle Story of Devil", "guess_rate": 0.00 },
  { "id": 1073, "song_name": "undelete", "anime_name": "Baldr Force EXE", "guess_rate": 0.00 },
  { "id": 1084, "song_name": "From The Seeds", "anime_name": "7SEEDS", "guess_rate": 0.00 },
  { "id": 1089, "song_name": "Shunkan Dramatic", "anime_name": "Over the Sky", "guess_rate": 0.00 },
  { "id": 1091, "song_name": "Sparkling Kiss", "anime_name": "A Dark Rabbit Has Seven Lives", "guess_rate": 0.00 },
  { "id": 1092, "song_name": "NIGHT RUNNING", "anime_name": "Brand New Animal", "guess_rate": 0.00 },
  { "id": 1093, "song_name": "Boku-tachi, Zetsumetsu Kigu-shun.", "anime_name": "Zetsumetsu Kigu-shun.", "guess_rate": 0.00 },
  { "id": 1096, "song_name": "Starting Song", "anime_name": "Tiny² Band Story", "guess_rate": 0.00 },
  { "id": 1099, "song_name": "Shiokaze no Harmony (5 Nin Ver.)", "anime_name": "Tari Tari", "guess_rate": 0.00 },
  { "id": 1100, "song_name": "sail away", "anime_name": "The Sky Crawlers", "guess_rate": 0.00 },
  { "id": 1102, "song_name": "Vitamin SUMMER!", "anime_name": "Love Live! Superstar!!", "guess_rate": 0.00 },
  { "id": 1105, "song_name": "Hide & Seek", "anime_name": "Release the Spyce", "guess_rate": 0.00 },
  { "id": 1111, "song_name": "Mekakushi Code", "anime_name": "Mekakucity Actors", "guess_rate": 0.00 },
  { "id": 1117, "song_name": "Sumikko Disco", "anime_name": "Eiga Sumikko Gurashi: Tsugihagi Koujo no Fushigi na Ko", "guess_rate": 0.00 },
  { "id": 1120, "song_name": "Barcarolle", "anime_name": "Aria the Animation", "guess_rate": 0.00 },
  { "id": 1122, "song_name": "Ao no Shoudou", "anime_name": "Lapis Re:LiGHTs", "guess_rate": 0.00 },
  { "id": 1127, "song_name": "Bull's Eye", "anime_name": "Aria the Scarlet Ammo AA", "guess_rate": 0.00 },
  { "id": 1134, "song_name": "Battle Cry", "anime_name": "Darling in the FranXX", "guess_rate": 0.00 },
  { "id": 1138, "song_name": "NEWLOOK", "anime_name": "Re:Creators", "guess_rate": 0.00 },
  { "id": 1139, "song_name": "I'mpossible?", "anime_name": "Suppose a Kid From the Last Dungeon Boonies Moved to a Starter Town", "guess_rate": 0.00 },
  { "id": 1141, "song_name": "THE LAST PARTY", "anime_name": "Riddle Story of Devil", "guess_rate": 0.00 },
  { "id": 1143, "song_name": "Ita Ningen Sanka", "anime_name": "Guardy Girls", "guess_rate": 0.00 },
  { "id": 1144, "song_name": "Zenryoku DAYS", "anime_name": "Zenryoku Usagi", "guess_rate": 0.00 },
  { "id": 1145, "song_name": "Never ending true stories", "anime_name": "Hyperdimension Neptunia: Hidamari no Little Purple", "guess_rate": 0.00 },
  { "id": 1146, "song_name": "Labyrinth", "anime_name": "Ron Kamonohashi's Forbidden Deductions", "guess_rate": 0.00 },
  { "id": 1148, "song_name": "Change", "anime_name": "Police in a Pod", "guess_rate": 0.00 },
  { "id": 1154, "song_name": "Kyori-kan", "anime_name": "Aharen-san wa Hakarenai", "guess_rate": 0.00 },
  { "id": 1156, "song_name": "Hanataba", "anime_name": "My New Boss Is Goofy", "guess_rate": 0.00 },
  { "id": 1157, "song_name": "Kinkira KING!", "anime_name": "Duel Masters King", "guess_rate": 0.00 },
  { "id": 1160, "song_name": "Midnight Flight -Hitoribocchi no Christmas Eve-", "anime_name": "Ping Pong The Animation", "guess_rate": 0.00 },
  { "id": 1162, "song_name": "Hiyaku no Recipe", "anime_name": "Eiga Precure All Stars: Minna de Utau♪ Kiseki no Mahou!", "guess_rate": 0.00 },
  { "id": 1165, "song_name": "Angel Lamp", "anime_name": "Re:Stage! Dream Days", "guess_rate": 0.00 },
  { "id": 1168, "song_name": "Aquatic Fantasy", "anime_name": "Josee, the Tiger and the Fish", "guess_rate": 0.00 },
  { "id": 1174, "song_name": "Colorful☆Wing", "anime_name": "Girly Air Force", "guess_rate": 0.00 },
  { "id": 1185, "song_name": "Crimson Lightning~Action", "anime_name": "Metallic Rouge", "guess_rate": 0.00 },
  { "id": 1186, "song_name": "Shingetsu", "anime_name": "The Misfit of Demon King Academy II", "guess_rate": 0.00 },
  { "id": 1193, "song_name": "All I See", "anime_name": "Carole & Tuesday", "guess_rate": 0.00 },
  { "id": 1200, "song_name": "Up Beat Communication", "anime_name": "Quiz Magic Academy: The Original Animation 2", "guess_rate": 0.00 },
  { "id": 1205, "song_name": "Haru Urara, Kimi to Saki Hokoru", "anime_name": "Konohana Kitan", "guess_rate": 0.00 },
  { "id": 1212, "song_name": "Kagayaku Sekai no Mahou", "anime_name": "The iDOLM@STER Cinderella Girls", "guess_rate": 0.00 },
  { "id": 188, "song_name": "Aurora Days", "anime_name": "Yuki Yuna is a Hero", "guess_rate": 0.00 },
  { "id": 113, "song_name": "EGOISTIC EMOTION", "anime_name": "Taboo Tattoo", "guess_rate": 0.00 },
  { "id": 146, "song_name": "Just My Chance Call", "anime_name": "PriPara", "guess_rate": 0.00 }
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
  