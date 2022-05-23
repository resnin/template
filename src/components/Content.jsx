import { useEffect, useState } from 'react';
import { getNewReleases, getTracks } from '../api/api';
import play from '../img/play.svg'
import '../App.css';
import Popup from './Popup';

const Content = () => {
   let [albums, setAlbums] = useState([]);
   let [openPopup, setOpenPopup] = useState(false);
   let [tracklist, setTracklist] = useState([]);

   useEffect(async () => {
      let result = await getNewReleases();
      let data = result.albums.items;
      setAlbums(data);
   }, []);

   const setTracks = async (id) => {
      let result = await getTracks(id);
      setTracklist(result)
      setOpenPopup(true)
   }

   return (
      <main className="content">
         <div className="content__new">
            <h2 className="content__title">Новинки</h2>
            <div className="content__playlists">
               {albums.map(item => (
                  <div className="content__item" key={item.id}>
                     <img
                        src={item.images[1].url}
                        onClick={() => { setTracks(item.id) }}
                        className="playlist-image" />
                     <div className="playlist-play">
                        <img src={play} alt="" className="play" />
                     </div>
                     <h3 className="playlist-title">{item.name}</h3>
                     <p className="playlist-description">Дата релиза: {item.release_date}</p>
                  </div>
               ))}
            </div>
         </div>

         {openPopup && <Popup tracklist={tracklist} setOpenPopup={setOpenPopup} />}
      </main>
   )
}

export default Content;