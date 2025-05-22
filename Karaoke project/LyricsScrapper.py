import os
import re
import sqlite3
import urllib.parse
import requests
from bs4 import BeautifulSoup
import sys
from googlesearch import search
from difflib import SequenceMatcher
import time

sys.stdout.reconfigure(encoding='utf-8')

DB_PATH = "lyrics.db"

# ---------- UTILS ----------

def normalize_text(text):
    return text.lower().strip().replace("’", "'").replace("!", "").replace("☆", "").replace("★", "").replace("♪", "").replace("　", " ")

def slugify(text):
    text = text.lower()
    text = re.sub(r"[’'`]", "", text)
    text = re.sub(r"[^a-z0-9\s-]", "", text)
    text = re.sub(r"\s+", "-", text.strip())
    return urllib.parse.quote(text)

def check_url_exists(url):
    try:
        response = requests.get(url)
        return response.status_code == 200
    except Exception:
        return False

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

# ---------- URL BUILDING ----------

def construct_direct_url(anime, title):
    anime_slug = slugify(anime)
    title_slug = slugify(title)
    return f"https://www.animesonglyrics.com/{anime_slug}/{title_slug}"

# ---------- FALLBACK METHODS ----------

def fallback_by_anime_page(anime, title):
    anime_url = f"https://www.animesonglyrics.com/{slugify(anime)}"
    try:
        res = requests.get(anime_url)
        if res.status_code != 200:
            return None

        soup = BeautifulSoup(res.text, "html.parser")
        links = soup.find_all("a", href=True)
        best_match = None
        best_score = 0.0
        target = normalize_text(title)

        for link in links:
            text = normalize_text(link.text)
            ratio = SequenceMatcher(None, text, target).ratio()
            if ratio > best_score:
                best_score = ratio
                best_match = link['href']

        if best_score >= 0.6:
            return f"https://www.animesonglyrics.com{best_match}"
    except Exception:
        return None
    return None

def fallback_google_search(anime, title):
    query = f"{anime} {title} site:animesonglyrics.com"
    print(f"Recherche Google: {query}")
    try:
        results = list(search(query, num_results=5))
        for url in results:
            if "animesonglyrics.com" in url:
                return url
    except Exception as e:
        print(f"Erreur pendant la recherche Google : {e}")
    return None

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
            print("Div .romajilyrics non trouvée.")
            return None

        lyrics = div.get_text(separator="\n").strip()
        return lyrics

    except Exception as e:
        print(f"Erreur lors du scraping : {e}")
        return None

# ---------- MAIN LOGIC ----------

def get_lyrics(anime, title):
    cached = load_lyrics(anime, title)
    if cached:
        print("Paroles trouvées dans la base de données.")
        return cached

    print("Tentative d'URL directe...")
    url = construct_direct_url(anime, title)
    if check_url_exists(url):
        print(f"Paroles trouvées directement : {url}")
        lyrics = scrape_romaji_lyrics(url)
        if lyrics:
            save_lyrics(anime, title, lyrics)
            return lyrics

    print("Échec. Recherche dans la page de l'anime...")
    url = fallback_by_anime_page(anime, title)
    if url:
        print(f"Paroles trouvées via page de l'anime : {url}")
        lyrics = scrape_romaji_lyrics(url)
        if lyrics:
            save_lyrics(anime, title, lyrics)
            return lyrics

    print("Échec. Lancement recherche Google...")
    url = fallback_google_search(anime, title)
    if url:
        print(f"Paroles trouvées via Google : {url}")
        lyrics = scrape_romaji_lyrics(url)
        if lyrics:
            save_lyrics(anime, title, lyrics)
            return lyrics

    print("Paroles introuvables.")
    return None

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
