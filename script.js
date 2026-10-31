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
        title: 'Dracula',
        artist: 'Tame Impala',
        name: 'Tame Impala - Dracula',
        cover: 'f1 album.jpg'
    }
];

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

function updateSongNumber() {
    const position = isShuffling ? shuffledIndices.indexOf(songIndex) + 1 : songIndex + 1;
    songNumberEl.textContent = `${position}/${songs.length}`;
}

function updateActiveSongInPlaylist() {
    playlistUl.querySelectorAll('.playlist-item').forEach((item) => {
        const active = Number(item.dataset.index) === songIndex;
        item.classList.toggle('active-song', active);
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

    cover.onerror = () => {
        cover.onerror = null;
        cover.src = 'obrazky/f1 album.jpg';
    };
    cover.src = `obrazky/${song.cover}`;

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
    document.querySelector('.song-image').classList.toggle('pulsing', playing);
    playBtn.title = playing ? 'Pozastaviť' : 'Prehrať';
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

function displayPlaylist() {
    playlistUl.replaceChildren();

    songs.forEach((song, index) => {
        const item = document.createElement('li');
        item.className = 'playlist-item';
        item.dataset.index = String(index);

        const details = document.createElement('div');
        details.className = 'song-item-title';

        const title = document.createElement('strong');
        title.textContent = song.title;
        const artist = document.createElement('span');
        artist.textContent = song.artist;
        artist.style.display = 'block';

        details.append(title, artist);
        item.append(details);
        item.addEventListener('click', () => {
            songIndex = index;
            loadSong(songs[songIndex]);
            playSong();
        });
        playlistUl.append(item);
    });

    updateActiveSongInPlaylist();
}

function togglePlaylist() {
    const isVisible = playlistContainer.classList.toggle('show');
    togglePlaylistBtn.classList.toggle('active', isVisible);
    if (isVisible) updateActiveSongInPlaylist();
}

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
loadSong(songs[songIndex]);
displayPlaylist();
