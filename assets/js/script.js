// main.js
const apiKey = 'a313ac121b8bd41322f3b0fd3bca29c7'; // Replace with your actual API key
const apiUrl = 'http://ws.audioscrobbler.com/2.0/';

async function fetchArtistInfo(artist) {
    const url = `${apiUrl}?method=artist.getinfo&artist=${artist}&api_key=${apiKey}&format=json`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error: ', error);
    }
}

async function displayArtistInfo(artist) {
    const data = await fetchArtistInfo(artist);
    if (data && data.artist) {
        console.log(data);
        const contentDiv = document.getElementById('content');
        const artistDiv = document.createElement('div');
        artistDiv.classList.add('artist');
        artistDiv.innerHTML = `
            <h2>${data.artist.name}</h2>
            <p><strong>Listeners:</strong> ${data.artist.stats.listeners}</p>
            <p><strong>Playcount:</strong> ${data.artist.stats.playcount}</p>
            <p>${data.artist.bio.summary}</p>
        `;
        contentDiv.appendChild(artistDiv);
    }
}

// Example usage
displayArtistInfo('Cher');
