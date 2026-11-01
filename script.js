const playerContainer = document.querySelector('.player-container');
const cover = document.getElementById('cover');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressContainer = document.querySelector('.progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume-slider');
const repeatBtn = document.getElementById('repeat');
const shuffleBtn = document.getElementById('shuffle');
const songNumberEl = document.getElementById('song-number');
const togglePlaylistBtn = document.getElementById('toggle-playlist-btn');
const playlistContainer = document.getElementById('playlist-container');
const playlistUl = document.getElementById('playlist');
const playlistBackdrop = document.getElementById('playlist-backdrop');
const closePlaylistBtn = document.getElementById('close-playlist-btn');
const playlistSearch = document.getElementById('playlist-search');
const playlistCount = document.getElementById('playlist-count');
const playlistEmpty = document.getElementById('playlist-empty');
const favoritesFilterBtn = document.getElementById('favorites-filter');
const themeToggle = document.getElementById('theme-toggle');
const skinToggle = document.getElementById('skin-toggle');

let favoriteSongs = new Set();
let showFavoritesOnly = false;
try {
    favoriteSongs = new Set(JSON.parse(localStorage.getItem('musicplayer-favorites') || '[]'));
} catch (error) {
    favoriteSongs = new Set();
}

// Zoznam skladieb – názvy súborov zodpovedajú obsahu priečinka hudba/.
const songs = [

    {
        title: 'Dont Let Me Drown',
        artist: 'Burna Boy',
        name: 'Burna Boy - Don t Let Me Drown', // Názov MP3 súboru bez prípony
        cover: 'f1 album.jpg' // Názov obrázku bez prípony
    },
    {
        title: 'Bam Bam',
        artist: 'Camila Cabello',
        name: 'Camila Cabello - Bam Bam',
        cover: 'camila cabello.jpg'
    },
    {
        title: 'Light Switch',
        artist: 'Charlie Puth',
        name: 'Charlie Puth - Light Switch',
        cover: 'light switch.jpg'
    },
    {
        title: 'Something Just Like This',
        artist: 'Coldplay',
        name: 'Coldplay - Something Just Like This',
        cover: 'coldplay.jpg'
    },
    {
        title: 'Lose My Mind',
        artist: 'Don Toliver',
        name: 'Don Toliver - Lose My Mind',
        cover: 'f1 album.jpg'
    },
    {
        title: 'Maria',
        artist: 'Dua Lipa',
        name: 'Dua Lipa - Maria',
        cover: 'dua lipa.jpg'
    },
    {
        title: 'Azizam',
        artist: 'Ed Sheeran',
        name: 'Ed Sheeran - Azizam',
        cover: 'azizam.jpg'
    },
    {
        title: 'End of the World',
        artist: 'Miley Cyrus',
        name: 'Miley Cyrus - End of the World',
        cover: 'end of the world.jpg'
    },
    {
        title: 'Invincible',
        artist: 'One Republic',
        name: 'OneRepublic - Invincible',
        cover: 'invincible.jpg'
    },
    {
        title: 'Drive',
        artist: 'Ed Sheeran',
        name: 'Ed Sheeran - Drive',
        cover: 'f1 album.jpg'
    },
    {
        title: 'Malibu',
        artist: 'Miley Cyrus',
        name: 'Miley Cyrus - Malibu',
        cover: 'malibu.jpg'
    },
    {
        title: 'Runaway',
        artist: 'One Republic',
        name: 'OneRepublic - RUNAWAY',
        cover: 'runaway.jpg'
    },
    {
        title: 'Sapphire',
        artist: 'Ed Sheeran',
        name: 'Ed Sheeran - Sapphire',
        cover: 'sapphire.jpg'
    },
    {
        title: 'Midnight Sky',
        artist: 'Miley Cyrus',
        name: 'Miley Cyrus - Midnight Sky',
        cover: 'midnight sky.jpg'
    },
    {
        title: 'Run',
        artist: 'One Republic',
        name: 'OneRepublic - Run',
        cover: 'run.jpg'
    },
    {
        title: 'Messy',
        artist: 'Rosé',
        name: 'Rosé - Messy',
        cover: 'f1 album.jpg'
    },
    {
        title: 'Prisoner',
        artist: 'Miley Cyrus',
        name: 'Miley Cyrus - Prisoner',
        cover: 'midnight sky.jpg'
    },
    {
        title: 'Just Keep Watching',
        artist: 'Tate McRae',
        name: 'Tate McRae - Just Keep Watching',
        cover: 'f1 album.jpg'
    },
    {
        title: 'Omg!',
        artist: 'Tiësto',
        name: 'Tiësto - OMG!',
        cover: 'f1 album.jpg'
    },
    {
        title: 'La Cintura',
        artist: 'Alvaro Soler',
        name: 'Alvaro Soler - La Cintura',
        cover: 'la cintura.jpg'
    },
    {
        title: 'El Mismo Sol',
        artist: 'Alvaro Soler',
        name: 'Alvero Soler - El Mismo Sol',
        cover: 'el mismo sol.jpg'
    },
    {
        title: 'A Tear in Space',
        artist: 'Glass Animals',
        name: 'Glass Animals - A Tear in Space',
        cover: 'a tear in space.jpg'
    },
    {
        title: 'Sofia',
        artist: 'Alvaro Soler',
        name: 'Alvaro Soler - Sofia',
        cover: 'sofia.jpg'
    },
    {
        title: 'Te Imaginaba',
        artist: 'Alvaro Soler',
        name: 'Alvaro Soler - Te Imaginaba',
        cover: 'te imaginaba.jpg'
    },
    {
        title: 'Manila',
        artist: 'Ray Dalton',
        name: 'Ray Dalton - Manila',
        cover: 'manila.jpg'
    },
    {
        title: 'Regalo',
        artist: 'Alvaro Soler',
        name: 'Alvaro Soler - Regalo',
        cover: 'regalo.jpg'
    },
    // Pridaj ďalšie skladby tu
    // {
    //     title: 'Názov Skladby 3',
    //     artist: 'Interpret 3',
    //     name: 'song3',
    //     cover: 'cover3.jpg'
    // },
    {
        title: 'Dracula (JENNIE Remix)',
        artist: 'Tame Impala',
        name: 'Tame Impala - Dracula (JENNIE Remix)',
        cover: 'f1 album.jpg'
    },
    {
        title: 'Get Back (ASAP)',
        artist: 'Alexandra Stan',
        name: 'Alexandra Stan - Get Back (ASAP)'
    },
    {
        title: 'Mr. Saxobeat',
        artist: 'Alexandra Stan',
        name: 'Alexandra Stan - Mr. Saxobeat'
    },
    {
        title: 'If We Ever Meet Again',
        artist: 'Timbaland',
        name: 'Timbaland - If We Ever Meet Again'
    },
    {
        title: 'Morning After Dark',
        artist: 'Timbaland',
        name: 'Timbaland - Morning After Dark'
    },
    {
        title: 'The Way I Are',
        artist: 'Timbaland',
        name: 'Timbaland - The Way I Are'
    }
];


/* Live album artwork: iTunes Search API with browser-side cache. */
const artworkCacheKey = 'musicplayer-artwork-cache-v1';
const artworkFallback = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
 '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><defs><radialGradient id="paper" cx="48%" cy="38%" r="78%"><stop offset="0" stop-color="#f5f5f5"/><stop offset=".72" stop-color="#d5d5d7"/><stop offset="1" stop-color="#bcbcc0"/></radialGradient><linearGradient id="ink" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#29292b"/><stop offset="1" stop-color="#111113"/></linearGradient></defs><rect width="600" height="600" fill="url(#paper)"/><g fill="url(#ink)"><path d="M224 205 242 199 242 425 224 431Z"/><path d="M394 150 412 144 412 374 394 380Z"/><path d="M224 205 412 144 412 202 224 263Z"/><ellipse cx="185" cy="440" rx="62" ry="43" transform="rotate(-22 185 440)"/><ellipse cx="355" cy="389" rx="62" ry="43" transform="rotate(-22 355 389)"/></g></svg>'
);
// Ak sa nájdený vzdialený obrázok nedá načítať, zobrazí sa univerzálny NOTU symbol.
cover.addEventListener('error', () => {
 if (cover.src !== artworkFallback) cover.src = artworkFallback;
});

let artworkRequestId = 0;
let artworkCache = {};
try { artworkCache = JSON.parse(localStorage.getItem(artworkCacheKey) || '{}') || {}; }
catch (error) { artworkCache = {}; }

function normalizeArtworkText(value) {
 return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, ' ').trim();
}
function artworkMatchScore(track, result) {
 const wantedTitle = normalizeArtworkText(track.title);
 const foundTitle = normalizeArtworkText(result.trackName || result.collectionName);
 const wantedArtist = normalizeArtworkText(track.artist);
 const foundArtist = normalizeArtworkText(result.artistName);
 const titleMatch = foundTitle === wantedTitle || foundTitle.includes(wantedTitle) || wantedTitle.includes(foundTitle);
 const artistMatch = foundArtist === wantedArtist || foundArtist.includes(wantedArtist) || wantedArtist.includes(foundArtist);
 if (!titleMatch || !artistMatch) return 0;
 return (foundTitle === wantedTitle ? 0.6 : 0.42) + (foundArtist === wantedArtist ? 0.4 : 0.28);
}
function saveArtworkCache() {
 try { localStorage.setItem(artworkCacheKey, JSON.stringify(artworkCache)); }
 catch (error) { /* Pri nedostupnom úložisku sa obrázky načítajú pri ďalšom otvorení znova. */ }
}
async function loadLiveArtwork(track) {
 const requestId = ++artworkRequestId;
 const cacheKey = normalizeArtworkText(track.artist + '|' + track.title);
 const cached = artworkCache[cacheKey];
 if (cached && cached.expires > Date.now()) { cover.src = cached.url || artworkFallback; return; }
 cover.src = artworkFallback;
 try {
  const url = 'https://itunes.apple.com/search?term=' + encodeURIComponent(track.artist + ' ' + track.title) + '&entity=song&limit=15&media=music';
  const response = await fetch(url);
  if (!response.ok) throw new Error('iTunes API HTTP ' + response.status);
  const data = await response.json();
  const matches = (data.results || []).map(item => ({ item, score: artworkMatchScore(track, item) })).sort((a,b) => b.score-a.score);
  const best = matches[0];
  const artwork = best && best.score >= 0.7 ? (best.item.artworkUrl600 || best.item.artworkUrl100 || '') : '';
  const imageUrl = artwork.replace(/\d+x\d+bb/, '600x600bb');
  if (requestId !== artworkRequestId) return;
  artworkCache[cacheKey] = { url: imageUrl, expires: Date.now() + (imageUrl ? 30 : 1) * 24 * 60 * 60 * 1000 };
  saveArtworkCache();
  cover.src = imageUrl || artworkFallback;
 } catch (error) {
  if (requestId !== artworkRequestId) return;
  artworkCache[cacheKey] = { url: '', expires: Date.now() + 60 * 60 * 1000 };
  saveArtworkCache();
  cover.src = artworkFallback;
  console.warn('Obal albumu sa nepodarilo načítať:', error);
 }
}

let songIndex = 0;
let isPlaying = false;
let isRepeating = false;
let isShuffling = false;
let shuffledIndices = [];

function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
}

// Súčet dĺžok všetkých skladieb sa načíta z metadát lokálnych MP3 súborov.
const playlistDurationEl = document.getElementById('playlist-duration');
const songDurations = new Array(songs.length).fill(null);
let resolvedDurationCount = 0;
let failedDurationCount = 0;

function formatPlaylistDuration(totalSeconds) {
    const totalMinutes = Math.floor(totalSeconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (hours > 0) return `${hours} h ${minutes} min`;
    return `${totalMinutes} min`;
}

function updatePlaylistDuration() {
    if (resolvedDurationCount < songs.length) {
        playlistDurationEl.textContent = `Celková dĺžka: načítavam… (${resolvedDurationCount}/${songs.length})`;
        return;
    }
    if (failedDurationCount > 0) {
        playlistDurationEl.textContent = 'Celková dĺžka: nepodarilo sa načítať všetky skladby';
        return;
    }
    const totalSeconds = songDurations.reduce((sum, duration) => sum + duration, 0);
    playlistDurationEl.textContent = `Celková dĺžka: ${formatPlaylistDuration(totalSeconds)}`;
}

function loadPlaylistDurations() {
    songs.forEach((song, index) => {
        const metadataAudio = new Audio();
        metadataAudio.preload = 'metadata';
        const finish = (duration) => {
            if (songDurations[index] !== null || (resolvedDurationCount > index && false)) return;
            songDurations[index] = Number.isFinite(duration) && duration > 0 ? duration : -1;
            resolvedDurationCount++;
            if (songDurations[index] < 0) failedDurationCount++;
            metadataAudio.removeAttribute('src');
            metadataAudio.load();
            updatePlaylistDuration();
        };
        metadataAudio.addEventListener('loadedmetadata', () => finish(metadataAudio.duration), { once: true });
        metadataAudio.addEventListener('error', () => finish(-1), { once: true });
        metadataAudio.src = `hudba/${song.name}.mp3`;
        metadataAudio.load();
    });
}


function updateSongNumber() {
    const position = isShuffling ? shuffledIndices.indexOf(songIndex) + 1 : songIndex + 1;
    songNumberEl.textContent = `${position}/${songs.length}`;
}

function updateActiveSongInPlaylist() {
    playlistUl.querySelectorAll('.playlist-item').forEach((item) => {
        const active = Number(item.dataset.index) === songIndex;
        item.classList.toggle('active-song', active);
        const number = item.querySelector('.playlist-track-number');
        if (number) number.textContent = active && isPlaying ? '♫' : String(Number(item.dataset.index) + 1);
        if (active && playlistContainer.classList.contains('show')) {
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
}

function loadSong(song) {
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    audio.src = `hudba/${song.name}.mp3`;
    audio.load();

    loadLiveArtwork(song);

    progress.style.width = '0%';
    currentTimeEl.textContent = '0:00';
    durationEl.textContent = '0:00';
    updateSongNumber();
    updateActiveSongInPlaylist();
}

function setPlayingState(playing) {
    isPlaying = playing;
    playBtn.classList.toggle('fa-play', !playing);
    playBtn.classList.toggle('fa-pause', playing);
    playerContainer.classList.toggle('playing', playing);
    document.querySelector('.song-image').classList.toggle('pulsing', playing && activeSkinId === 'neon-cyber');
    playBtn.title = playing ? 'Pozastaviť' : 'Prehrať';
    if (playlistContainer.classList.contains('show')) updateActiveSongInPlaylist();
}

async function playSong() {
    try {
        await audio.play();
        setPlayingState(true);
    } catch (error) {
        setPlayingState(false);
        console.warn('Prehrávanie sa nepodarilo spustiť:', error);
    }
}

function pauseSong() {
    audio.pause();
    setPlayingState(false);
}

function buildShuffleOrder() {
    shuffledIndices = Array.from({ length: songs.length }, (_, index) => index);
    for (let i = shuffledIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledIndices[i], shuffledIndices[j]] = [shuffledIndices[j], shuffledIndices[i]];
    }
    const currentPosition = shuffledIndices.indexOf(songIndex);
    [shuffledIndices[0], shuffledIndices[currentPosition]] =
        [shuffledIndices[currentPosition], shuffledIndices[0]];
}

function nextSong() {
    if (isShuffling) {
        const position = shuffledIndices.indexOf(songIndex);
        songIndex = shuffledIndices[(position + 1) % shuffledIndices.length];
    } else {
        songIndex = (songIndex + 1) % songs.length;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function prevSong() {
    // Ak skladba hrá dlhšie ako 3 sekundy, tlačidlo späť ju začne od začiatku.
    if (audio.currentTime > 3) {
        audio.currentTime = 0;
        return;
    }

    if (isShuffling) {
        const position = shuffledIndices.indexOf(songIndex);
        songIndex = shuffledIndices[(position - 1 + shuffledIndices.length) % shuffledIndices.length];
    } else {
        songIndex = (songIndex - 1 + songs.length) % songs.length;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress() {
    const duration = audio.duration;
    const currentTime = audio.currentTime;

    if (Number.isFinite(duration) && duration > 0) {
        progress.style.width = `${(currentTime / duration) * 100}%`;
        durationEl.textContent = formatTime(duration);
    } else {
        progress.style.width = '0%';
    }
    currentTimeEl.textContent = formatTime(currentTime);
}

function setProgress(event) {
    if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;
    const bounds = progressContainer.getBoundingClientRect();
    const fraction = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
    audio.currentTime = fraction * audio.duration;
}

function setVolume(event) {
    audio.volume = Number(event.target.value);
    try {
        localStorage.setItem('musicplayer-volume', String(audio.volume));
    } catch (error) {
        // Prehliadač môže blokovať localStorage; prehrávač funguje aj bez neho.
    }
}

function toggleRepeat() {
    isRepeating = !isRepeating;
    audio.loop = isRepeating;
    repeatBtn.classList.toggle('active', isRepeating);
    repeatBtn.setAttribute('aria-pressed', String(isRepeating));
}

function toggleShuffle() {
    isShuffling = !isShuffling;
    shuffleBtn.classList.toggle('active', isShuffling);
    shuffleBtn.setAttribute('aria-pressed', String(isShuffling));

    if (isShuffling) {
        buildShuffleOrder();
    } else {
        shuffledIndices = [];
    }
    updateSongNumber();
}

function saveFavorites() {
    try { localStorage.setItem('musicplayer-favorites', JSON.stringify([...favoriteSongs])); }
    catch (error) { /* Obľúbené zostanú dostupné počas aktuálnej relácie. */ }
}

function normalizeSearchText(value) {
    return String(value)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLocaleLowerCase();
}

function renderPlaylist() {
    const query = normalizeSearchText(playlistSearch.value.trim());
    const searchTerms = query.split(/\s+/).filter(Boolean);
    const visibleSongs = songs.map((song, index) => ({ song, index })).filter(({ song, index }) => {
        const searchableText = normalizeSearchText(`${song.title} ${song.artist} ${song.name}`);
        const matchesQuery = searchTerms.every(term => searchableText.includes(term));
        return matchesQuery && (!showFavoritesOnly || favoriteSongs.has(index));
    });

    playlistUl.replaceChildren();
    visibleSongs.forEach(({ song, index }) => {
        const item = document.createElement('li');
        item.className = 'playlist-item';
        item.dataset.index = String(index);
        item.classList.toggle('active-song', index === songIndex);

        const number = document.createElement('span');
        number.className = 'playlist-track-number';
        number.textContent = index === songIndex && isPlaying ? '♫' : String(index + 1);

        const details = document.createElement('div');
        details.className = 'song-item-title';
        const title = document.createElement('strong');
        title.textContent = song.title;
        const artist = document.createElement('span');
        artist.textContent = song.artist;
        details.append(title, artist);

        const favoriteBtn = document.createElement('button');
        favoriteBtn.type = 'button';
        favoriteBtn.className = `favorite-btn${favoriteSongs.has(index) ? ' is-favorite' : ''}`;
        favoriteBtn.setAttribute('aria-label', favoriteSongs.has(index) ? 'Odobrať z obľúbených' : 'Pridať medzi obľúbené');
        favoriteBtn.setAttribute('aria-pressed', String(favoriteSongs.has(index)));
        const heart = document.createElement('i');
        heart.className = `${favoriteSongs.has(index) ? 'fas' : 'far'} fa-heart`;
        heart.setAttribute('aria-hidden', 'true');
        favoriteBtn.append(heart);
        favoriteBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            if (favoriteSongs.has(index)) favoriteSongs.delete(index);
            else favoriteSongs.add(index);
            saveFavorites();
            renderPlaylist();
        });

        item.append(number, details, favoriteBtn);
        item.addEventListener('click', () => {
            songIndex = index;
            loadSong(songs[songIndex]);
            playSong();
            renderPlaylist();
        });
        playlistUl.append(item);
    });

    playlistCount.textContent = `${visibleSongs.length} z ${songs.length} skladieb`;
    playlistEmpty.hidden = visibleSongs.length > 0;
    updateActiveSongInPlaylist();
}
function displayPlaylist() { renderPlaylist(); }

function openPlaylist() {
    playlistContainer.classList.add('show');
    playlistBackdrop.classList.add('show');
    togglePlaylistBtn.classList.add('active');
    playlistContainer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('playlist-open');
    renderPlaylist();
    closePlaylistBtn.focus();
}

function closePlaylist() {
    playlistContainer.classList.remove('show');
    playlistBackdrop.classList.remove('show');
    togglePlaylistBtn.classList.remove('active');
    playlistContainer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('playlist-open');
    togglePlaylistBtn.focus();
}

function togglePlaylist() {
    if (playlistContainer.classList.contains('show')) closePlaylist();
    else openPlaylist();
}


/* Prepínanie dizajnových tém prehrávača. */
const playerThemes = [
    { id: 'midnight', label: 'Midnight' },
    { id: 'ocean', label: 'Ocean' },
    { id: 'emerald', label: 'Emerald' },
    { id: 'sunset', label: 'Sunset' },
    { id: 'arctic', label: 'Arctic' },
    { id: 'rose', label: 'Rose' },
    { id: 'solar', label: 'Solar' },
    { id: 'graphite', label: 'Graphite' }
];
let activeThemeIndex = 0;

function applyPlayerTheme(index, persist = true) {
    activeThemeIndex = (index + playerThemes.length) % playerThemes.length;
    const theme = playerThemes[activeThemeIndex];
    document.documentElement.dataset.theme = theme.id;
    themeToggle.title = `Téma: ${theme.label} – kliknutím zmeniť`;
    themeToggle.setAttribute('aria-label', `Aktuálna téma: ${theme.label}. Zmeniť tému`);
    if (persist) {
        try { localStorage.setItem('musicplayer-theme', theme.id); }
        catch (error) { /* Téma zostane aktívna do obnovenia stránky. */ }
    }
}

function cyclePlayerTheme() {
    applyPlayerTheme(activeThemeIndex + 1);
}

try {
    const savedTheme = localStorage.getItem('musicplayer-theme');
    const savedIndex = playerThemes.findIndex(theme => theme.id === savedTheme);
    if (savedIndex >= 0) activeThemeIndex = savedIndex;
} catch (error) {
    // Použije sa predvolená téma.
}
applyPlayerTheme(activeThemeIndex, false);


/* Výber celkového dizajnu prehrávača. */
const playerSkins = [
    { id: 'midnight-glass', label: 'Midnight Glass' },
    { id: 'neon-cyber', label: 'Neon Cyber' },
    { id: 'vinyl-retro', label: 'Vinyl Retro' },
    { id: 'minimal-studio', label: 'Prism Atelier' },
    { id: 'liquid-glass', label: 'Liquid Glass' },
    { id: 'modern-dashboard', label: 'Modern Dashboard' }
];
const skinPickerBackdrop = document.getElementById('skin-picker-backdrop');
const skinPickerClose = document.getElementById('skin-picker-close');
const skinOptions = document.getElementById('skin-options');
let activeSkinId = 'midnight-glass';
let skinPickerReturnFocus = null;

function updateSkinPickerSelection() {
    skinOptions.querySelectorAll('[data-skin-choice]').forEach((option) => {
        const selected = option.dataset.skinChoice === activeSkinId;
        option.classList.toggle('selected', selected);
        option.setAttribute('aria-pressed', String(selected));
    });
}

function applyPlayerSkin(skinId, persist = true) {
    const skin = playerSkins.find(item => item.id === skinId) || playerSkins[0];
    activeSkinId = skin.id;
    document.documentElement.dataset.skin = skin.id;
    skinToggle.title = `Dizajn: ${skin.label}`;
    skinToggle.setAttribute('aria-label', `Vybraný dizajn: ${skin.label}. Otvoriť výber dizajnu`);
    updateSkinPickerSelection();
    if (persist) {
        try { localStorage.setItem('musicplayer-skin', skin.id); }
        catch (error) { /* Dizajn zostane aktívny do obnovenia stránky. */ }
    }
}

function openSkinPicker() {
    skinPickerReturnFocus = document.activeElement;
    skinPickerBackdrop.hidden = false;
    skinPickerClose.focus();
}

function closeSkinPicker() {
    if (skinPickerBackdrop.hidden) return;
    skinPickerBackdrop.hidden = true;
    if (skinPickerReturnFocus instanceof HTMLElement) skinPickerReturnFocus.focus();
}

try {
    const savedSkin = localStorage.getItem('musicplayer-skin');
    if (playerSkins.some(skin => skin.id === savedSkin)) activeSkinId = savedSkin;
} catch (error) { /* Použije sa predvolený dizajn. */ }
applyPlayerSkin(activeSkinId, false);

// Ovládacie prvky a udalosti prehrávača.
playBtn.addEventListener('click', () => {
    if (isPlaying) pauseSong();
    else playSong();
});
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
progressContainer.addEventListener('click', setProgress);
volumeSlider.addEventListener('input', setVolume);
repeatBtn.addEventListener('click', toggleRepeat);
shuffleBtn.addEventListener('click', toggleShuffle);
togglePlaylistBtn.addEventListener('click', togglePlaylist);
themeToggle.addEventListener('click', cyclePlayerTheme);
skinToggle.addEventListener('click', openSkinPicker);
skinPickerClose.addEventListener('click', closeSkinPicker);
skinPickerBackdrop.addEventListener('click', (event) => {
    if (event.target === skinPickerBackdrop) closeSkinPicker();
});
skinOptions.addEventListener('click', (event) => {
    const option = event.target.closest('[data-skin-choice]');
    if (option) applyPlayerSkin(option.dataset.skinChoice);
});
closePlaylistBtn.addEventListener('click', closePlaylist);
playlistBackdrop.addEventListener('click', closePlaylist);
playlistSearch.addEventListener('input', renderPlaylist);
favoritesFilterBtn.addEventListener('click', () => {
    showFavoritesOnly = !showFavoritesOnly;
    favoritesFilterBtn.classList.toggle('active', showFavoritesOnly);
    favoritesFilterBtn.setAttribute('aria-pressed', String(showFavoritesOnly));
    renderPlaylist();
});

document.addEventListener('keydown', (event) => {
    const target = event.target;
    const typing = target instanceof HTMLElement &&
        (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));
    if (event.key === 'Escape' && !skinPickerBackdrop.hidden) {
        closeSkinPicker();
        return;
    }
    if (event.key === 'Escape' && playlistContainer.classList.contains('show')) {
        closePlaylist();
        return;
    }
    if (typing || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.code === 'Space') {
        event.preventDefault();
        if (isPlaying) pauseSong(); else playSong();
    } else if (event.code === 'ArrowRight') {
        if (Number.isFinite(audio.duration)) audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
    } else if (event.code === 'ArrowLeft') {
        audio.currentTime = Math.max(0, audio.currentTime - 5);
    }
});

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('loadedmetadata', updateProgress);
audio.addEventListener('ended', () => {
    if (!isRepeating) nextSong();
});
audio.addEventListener('play', () => setPlayingState(true));
audio.addEventListener('pause', () => setPlayingState(false));
audio.addEventListener('error', () => {
    setPlayingState(false);
    console.warn('Skladbu sa nepodarilo načítať:', audio.currentSrc);
});

// Obnovenie poslednej nastavenej hlasitosti, ak ju prehliadač umožňuje uložiť.
try {
    const savedVolume = localStorage.getItem('musicplayer-volume');
    if (savedVolume !== null) {
        const volume = Math.min(1, Math.max(0, Number(savedVolume)));
        audio.volume = volume;
        volumeSlider.value = String(volume);
    }
} catch (error) {
    // localStorage nie je dostupné – použije sa predvolená hlasitosť.
}

audio.volume = Number.isFinite(audio.volume) ? audio.volume : 1;
loadPlaylistDurations();
loadSong(songs[songIndex]);
displayPlaylist();
