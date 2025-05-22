import tkinter as tk
from tkinter import scrolledtext, messagebox
from LyricsScrapper import get_lyrics

def search_lyrics():
    anime = anime_entry.get().strip()
    title = title_entry.get().strip()
    if not anime or not title:
        messagebox.showwarning("Champs requis", "Anime et titre doivent être remplis.")
        return

    try:
        lyrics = get_lyrics(anime, title)
        lyrics_display.delete(1.0, tk.END)
        lyrics_display.insert(tk.END, lyrics)
        clear_highlight()
        search_term.set("")  # reset search
    except Exception as e:
        messagebox.showerror("Erreur", f"Erreur : {e}")

def clear_highlight():
    lyrics_display.tag_remove("highlight", "1.0", tk.END)

def highlight_all(pattern):
    clear_highlight()
    if not pattern:
        return
    start_pos = "1.0"
    while True:
        start_pos = lyrics_display.search(pattern, start_pos, nocase=1, stopindex=tk.END)
        if not start_pos:
            break
        end_pos = f"{start_pos}+{len(pattern)}c"
        lyrics_display.tag_add("highlight", start_pos, end_pos)
        start_pos = end_pos
    lyrics_display.tag_config("highlight", background="#ffff00", foreground="black")

def on_search_key(event=None):
    term = search_term.get().strip()
    highlight_all(term)

def focus_search(event=None):
    search_entry.focus_set()

# === FENÊTRE ===
root = tk.Tk()
root.title("🎶 Lyrics Viewer (mode sombre)")
root.geometry("900x600")
root.configure(bg="#1e1e1e")

# === STYLES MODE SOMBRE ===
ENTRY_STYLE = {
    "bg": "#2d2d2d", "fg": "#dddddd", "insertbackground": "#dddddd",
    "font": ("Segoe UI", 11), "relief": tk.FLAT
}
LABEL_STYLE = {"bg": "#1e1e1e", "fg": "#cccccc", "font": ("Segoe UI", 10, "bold")}
BUTTON_STYLE = {
    "bg": "#3c9d4f", "fg": "white", "activebackground": "#2e7d3e",
    "font": ("Segoe UI", 10, "bold"), "relief": tk.FLAT, "bd": 1
}

# === HAUT : Anime & Titre ===
top_frame = tk.Frame(root, bg="#1e1e1e")
top_frame.pack(pady=10)

tk.Label(top_frame, text="Anime :", **LABEL_STYLE).grid(row=0, column=0, sticky="e", padx=5)
anime_entry = tk.Entry(top_frame, width=40, **ENTRY_STYLE)
anime_entry.grid(row=0, column=1, padx=5)

tk.Label(top_frame, text="Titre (romaji) :", **LABEL_STYLE).grid(row=0, column=2, sticky="e", padx=5)
title_entry = tk.Entry(top_frame, width=40, **ENTRY_STYLE)
title_entry.grid(row=0, column=3, padx=5)

search_button = tk.Button(root, text="🎵 Chercher les paroles", command=search_lyrics, **BUTTON_STYLE)
search_button.pack(pady=5)

# === BARRE DE RECHERCHE INLINE ===
search_term = tk.StringVar()
search_frame = tk.Frame(root, bg="#1e1e1e")
search_frame.pack()

tk.Label(search_frame, text="🔍 Rechercher :", **LABEL_STYLE).pack(side="left", padx=5)
search_entry = tk.Entry(search_frame, textvariable=search_term, width=30, **ENTRY_STYLE)
search_entry.pack(side="left", padx=5)
search_entry.bind("<KeyRelease>", on_search_key)

# === ZONE DE TEXTE ===
lyrics_display = scrolledtext.ScrolledText(
    root, wrap=tk.WORD, width=100, height=25,
    bg="#2d2d2d", fg="#dddddd", insertbackground="#dddddd",
    font=("Segoe UI", 11), relief=tk.FLAT
)
lyrics_display.pack(padx=15, pady=10, fill="both", expand=True)

# === RACCOURCI CTRL+F ===
root.bind("<Control-f>", focus_search)

root.mainloop()
