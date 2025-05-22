import os
import re
import sqlite3
import urllib.parse
import requests
from bs4 import BeautifulSoup
import sys
sys.stdout.reconfigure(encoding='utf-8')


DB_PATH = "lyrics.db"

# ---------- DATABASE ----------

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS lyrics (
            anime TEXT,
            title TEXT,
            romaji TEXT,
            PRIMARY KEY(anime, title)
        )
    ''')
    conn.commit()
    conn.close()

def save_lyrics(anime, title, romaji_lyrics):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        INSERT OR REPLACE INTO lyrics (anime, title, romaji)
        VALUES (?, ?, ?)
    ''', (anime, title, romaji_lyrics))
    conn.commit()
    conn.close()

def load_lyrics(anime, title):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('SELECT romaji FROM lyrics WHERE anime = ? AND title = ?', (anime, title))
    result = cursor.fetchone()
    conn.close()
    return result[0] if result else None

# ---------- UTILS ----------

def slugify(text):
    text = text.lower()
    text = re.sub(r"[’'`]", "", text)
    text = re.sub(r"[^a-z0-9\s-]", "", text)
    text = re.sub(r"\s+", "-", text.strip())
    return urllib.parse.quote(text)

def generate_url(anime, title):
    anime_slug = slugify(anime)
    title_slug = slugify(title)
    return f"https://www.animesonglyrics.com/{anime_slug}/{title_slug}"

# ---------- SCRAPING ----------

def scrape_romaji_lyrics(url):
    try:
        response = requests.get(url)
        if response.status_code != 200:
            print(f"Echec de requête URL ({response.status_code}) : {url}")
            return None

        soup = BeautifulSoup(response.text, "html.parser")
        div = soup.find("div", class_="romajilyrics")

        if not div:
            print("Div .romajilyrics non trouvee.")
            return None

        # Nettoyer le HTML
        lyrics = div.get_text(separator="\n").strip()
        return lyrics

    except Exception as e:
        print(f"Erreur lors du scraping : {e}")
        return None

# ---------- LOGIQUE PRINCIPALE ----------

def get_lyrics(anime, title):
    # Vérifie si déjà en base
    cached = load_lyrics(anime, title)
    if cached:
        print("Paroles trouvees en cache.")
        return cached

    url = generate_url(anime, title)
    print(f"Tentative depuis : {url}")
    lyrics = scrape_romaji_lyrics(url)

    if lyrics:
        print("Paroles recuperees. Enregistrement en base...")
        save_lyrics(anime, title, lyrics)
    else:
        print("Paroles non trouvees.")

    return lyrics

# ---------- ENTRY POINT ----------

if __name__ == "__main__":
    init_db()

    # Exemple de test
    anime = "Naruto Shippuden"
    title = "Blue Bird"

    lyrics = get_lyrics(anime, title)

    if lyrics:
        print("\n===== LYRICS (EXTRAIT) =====\n")
        print(lyrics[:500] + "\n...")
    else:
        print("Aucun résultat.")
