

const Popup = (props) => {
   const closePopup = (e) => {
      e.preventDefault();
      props.setOpenPopup(false)
   }

   return (
      <div className="popup">
         <div className="popup__body">
            <div className="popup__content">
               <ul className="popup__list">
                  {props.tracklist.map(item => (
                     <li key={item.id} className='popup__item'>{item.name}</li>
                  ))}
               </ul>
               <a href="" className="popup__close"
                  onClick={(e) => { closePopup(e) }}>Закрыть</a>
            </div>
         </div>
      </div>
   )
}

export default Popup