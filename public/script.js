const client_id = '0d68e0e9caa94367889fb30a00759866';
const client_secret = '37c1d3d5e5e749b1ad3a7d32ce31822a';

const getToken = async () => {

   try {
      const result = await fetch('https://accounts.spotify.com/api/token', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
         },
         body: 'grant_type=client_credentials'
      });

      const data = await result.json();
      return data.access_token;
   }

   catch (e) {
      alert('Ошибка! Перезагрузите страницу')
   }
}

const getNewReleases = async () => {

   try {
      let token = await getToken();
      const limit = 6;

      const result = await fetch(`https://api.spotify.com/v1/browse/new-releases?limit=${limit}`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
         }
      })
      const data = await result.json();
      return data
   }

   catch (e) {
      alert('Ошибка! Перезагрузите страницу')
   }
}

const getTracks = async (id) => {

   try {
      let token = await getToken();

      const result = await fetch(`https://api.spotify.com/v1/albums/${id}/tracks`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
         }
      })
      const data = await result.json();
      return data.items
   }

   catch (e) {
      alert('Ошибка! Перезагрузите страницу')
   }
}



const createNewReleases = async () => {

   let data = await getNewReleases();
   let playlists = document.querySelector('.content__new > .content__playlists');
   console.log(data)

   for (i = 0; i < data.albums.items.length; i++) {
      playlists.insertAdjacentHTML('beforeend', `
         <div class="content__item">
            <img src='${data.albums.items[i].images[1].url}' id='${data.albums.items[i].id}' class="playlist-image">
            <div class="playlist-play">
               <img src="./img/play.svg" alt="" class="play">
            </div>     
            <h3 class="playlist-title">${data.albums.items[i].name}</h3>
            <p class="playlist-description">Дата релиза: ${data.albums.items[i].release_date}</p>
         </div>`
      )
   }
}

const createTracks = document.querySelector('.content__playlists').addEventListener('click', async (event) => {
   if (event.target.className === 'playlist-image') {
      let id = event.target.id
      let tracktlist = await getTracks(id)
      document.querySelector('.popup').classList.add('open')
      for (i = 0; i < tracktlist.length; i++) {
         document.querySelector('.popup__list').insertAdjacentHTML('beforeend', `<li class='popup__item'>${tracktlist[i].name}</li>`)
      }
      console.log(tracktlist)
   }
})

const closePopup = document.querySelector('.popup__close').addEventListener('click', (e) => {
   e.preventDefault()
   document.querySelector('.popup').classList.remove('open')
   document.querySelectorAll('.popup__item').forEach(e => e.remove())

})

createNewReleases()