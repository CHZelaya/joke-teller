const button = document.getElementById('button');
const audioElement = document.getElementById('audio')

//* API Url: https://v2.jokeapi.dev/joke/Any


function toggleJokeButton() {
  try {
    button.disabled = !button.disabled;
  } catch (e) {
    console.log('whoops', e)
  }
}

function passJokeToSpeech(joke) {
  console.log("Tell me the joke:", joke)
  VoiceRSS.speech({
    key: '',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
  });
};

async function fetchJokesFromApi(url) {
  let joke = '';
  const apiUrl = 'https://v2.jokeapi.dev/joke/Any'
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ...${data.delivery}`;
    } else {
      joke = data.joke;
    }
    passJokeToSpeech(joke);
    toggleJokeButton();
  } catch (e) {
    console.log(`We're out of punch lines!`, e)
  }
}

//* Event Listeners

button.addEventListener('click', fetchJokesFromApi);
audioElement.addEventListener('ended', toggleJokeButton);



