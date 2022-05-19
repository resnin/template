const client_id = '0d68e0e9caa94367889fb30a00759866';
const client_secret = '37c1d3d5e5e749b1ad3a7d32ce31822a';

const errorMessage = (error) => {
   document.querySelector('.popup').classList.add('open');
   document.querySelector('.popup__list').insertAdjacentHTML('beforeend', `<li class='popup__item'>${error.message}</li>`)

}

const fetchTemplate = async (url) => {
   let token = await getToken();
   const result = await fetch(`https://api.spotify.com/v1/` + url, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + token
      }
   })
   if (result.ok) {
      const data = await result.json();
      return data
   } else {

      if (result.status === 404) {
         throw new Error("There's no data. Try to reload page.")
      } else
         if (result.status === 401) {
            throw new Error
               ("Bad or expired token. This can happen if the user revoked a token or the access token has expired. You should re-authenticate the user.")
         } else
            if (result.status === 403) {
               throw new Error
                  ("Bad OAuth request (wrong consumer key, bad nonce, expired timestamp...). Unfortunately, re-authenticating the user won't help here.")
            } else throw new Error("Something went wrong")

   }
}

const getToken = async () => {
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

const getNewReleases = async () => {

   try {
      const limit = 6;
      const url = `browse/new-releases?limit=${limit}`;

      return await fetchTemplate(url);
   }

   catch (e) {
      errorMessage(e);
   }
}

const getTracks = async (id) => {

   try {
      const url = `albums/${id}/tracks`;

      let data = await fetchTemplate(url);
      return data.items;
   }

   catch (e) {
      errorMessage(e);
   }
}



const createNewReleases = async () => {

   let data = await getNewReleases();
   let playlists = document.querySelector('.content__new > .content__playlists');
   console.log(data)

   for (i = 0; i < data.albums.items.length; i++) {
      playlists.insertAdjacentHTML('beforeend', `
         <div class="content__item">
            <img src='${data.albums.items[i].images[1].url}' data-id='${data.albums.items[i].id}' class="playlist-image">
            <div class="playlist-play">
               <img src="./img/play.svg" alt="" class="play">
            </div>     
            <h3 class="playlist-title">${data.albums.items[i].name}</h3>
            <p class="playlist-description">Дата релиза: ${data.albums.items[i].release_date}</p>
         </div>`
      )
   }
}

document.querySelector('.content__playlists').addEventListener('click', async (event) => {
   if (event.target.className === 'playlist-image') {
      let id = event.target.dataset.id
      let tracktlist = await getTracks(id)
      document.querySelector('.popup').classList.add('open')
      for (i = 0; i < tracktlist.length; i++) {
         document.querySelector('.popup__list').insertAdjacentHTML('beforeend', `<li class='popup__item'>${tracktlist[i].name}</li>`)
      }
   }
})

document.querySelector('.popup__close').addEventListener('click', (e) => {
   e.preventDefault()
   document.querySelector('.popup').classList.remove('open')
   document.querySelectorAll('.popup__item').forEach(e => e.remove())

})

createNewReleases()