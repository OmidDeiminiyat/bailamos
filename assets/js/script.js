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

        let  imageUrl = '';
        let imageU2 ='';
        if (data.artist.name == 'Cher') {
         imageUrl = '../../assets/images/cher.png';
         imageU2 = '../../assets/images/cher2.jpg';
        } else if (data.artist.name == 'Adele') {
            imageUrl = '../../assets/images/adele-illness.jpg';
            imageU2 = '../../assets/images/75.jpeg';
        } else if (data.artist.name == 'Bruno Mars') {
            imageUrl = '../../assets/images/bruno.jpg';
            imageU2 = '../../assets/images/Bruno-Mars.jpg';
        } else {
            imageUrl = '../../assets/images/sunset.jpg';
            imageU2 = '../../assets/images/Disc.png';
        }
        console.log(imageUrl);
        const imgU = data.artist.image[0].text;
        console.log(data.artist.similar.artist[0]);


        artistDiv.innerHTML = `

        <img src="${imageUrl}" alt="Cher">
            <section class="Bios">
                <h2>${data.artist.name}</h2>
                <div class="bioGroup">
                    <span class="smalImg">
                    <img src="${imageU2}" alt="Cher">
                    </span>
                    <span>
                    <p><strong>Listeners:</strong> ${data.artist.stats.listeners}</p>
                    <p><strong>Playcount:</strong> ${data.artist.stats.playcount}</p>
                    </span>
                </div>
            </section>
            <h5>Published on: ${data.artist.bio.published} </h5>
            <audio controls autoplay muted>
            <source src="../../assets/media/Cher - Believe (Official Music Video) [4K Remaster].mp3" type="audio/ogg">
                Your browser does not support the audio element.
            </audio>
            <p>${data.artist.bio.summary}</p>
            <hr class="gradient-line">
            <span class='tags'>
            <a href=${data.artist.tags.tag[0].url}">${data.artist.tags.tag[0].name} </a>
            <a href=${data.artist.tags.tag[1].url}">${data.artist.tags.tag[1].name} </a>
            <a href=${data.artist.tags.tag[2].url}">${data.artist.tags.tag[2].name} </a>
            <a href=${data.artist.tags.tag[3].url}">${data.artist.tags.tag[3].name} </a>
            </tags>
        `;
        contentDiv.appendChild(artistDiv);
    }
}

// Example usage

// script.js
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const singerList = document.getElementById('singer-list');
    const singers = singerList.getElementsByTagName('li');

    // Live search functionality
    searchInput.addEventListener('input', () => {
        const filter = searchInput.value.toLowerCase();

        for (let i = 0; i < singers.length; i++) {
            let singer = singers[i].textContent.toLowerCase();
            if (singer.indexOf(filter) > -1) {
                singers[i].style.display = "";
            } else {
                singers[i].style.display = "none";
            }
        }
    });

    for (let i = 0; i < singers.length; i++) {
        singers[i].addEventListener('click', function() {
            const singerName = this.textContent;
            handleSingerClick(singerName);
            searchInput.value = singerName; 
            singerList.style.display = 'none';
        });
    }

    // Hide the list when clicking outside of the input or list
    document.addEventListener('click', (event) => {
        if (!searchInput.contains(event.target) && !singerList.contains(event.target)) {
            singerList.style.display = 'none';
        }
    });

    // Show the list when the input is focused
    searchInput.addEventListener('focus', () => {
        singerList.style.display = 'block';
    });// script.js
    document.addEventListener('DOMContentLoaded', () => {
        const searchInput = document.getElementById('search-input');
        const singerList = document.getElementById('singer-list');
        const singers = singerList.getElementsByTagName('li');
    
        // Live search functionality
        searchInput.addEventListener('input', () => {
            const filter = searchInput.value.toLowerCase();
    
            for (let i = 0; i < singers.length; i++) {
                let singer = singers[i].textContent.toLowerCase();
                if (singer.indexOf(filter) > -1) {
                    singers[i].style.display = "";
                } else {
                    singers[i].style.display = "none";
                }
            }
        });
    
        // Adding click event listeners to each singer
        for (let i = 0; i < singers.length; i++) {
            singers[i].addEventListener('click', function() {
                const singerName = this.textContent;
                handleSingerClick(singerName);
                searchInput.value = singerName; // Optionally, set the input value to the clicked singer's name
                singerList.style.display = 'none'; // Hide the list after selection
            });
        }
    
        // Hide the list when clicking outside of the input or list
        document.addEventListener('click', (event) => {
            if (!searchInput.contains(event.target) && !singerList.contains(event.target)) {
                singerList.style.display = 'none';
            }
        });
    
        // Show the list when the input is focused
        searchInput.addEventListener('focus', () => {
            singerList.style.display = 'block';
        });
    });
    
    // Function to handle singer click
    function handleSingerClick(singerName) {
        const firstPage = document.getElementById('searchpage');
        const secondPage = document.getElementById('content')
        const WelcomeSection = document.getElementById('welcome');
        const SsecBody = document.getElementById('BodyId');
    
        firstPage.style.display = 'none';
        secondPage.style.display = 'block';
        WelcomeSection.style.display = 'none';
        SsecBody.style.backgroundImage = 'url("../../assets/images/Sky.png")';

        displayArtistInfo(singerName);

        }
    
});


