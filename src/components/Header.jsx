import '../App.css';
import leftButton from '../img/leftButton.svg';
import rightButton from '../img/rightButton.svg';
import menu from '../img/menuButton.svg'

const Header = () => {
   return (
      <header className="header">
         <div className="header__back-forward">
            <div className="header__back-button">
               <button className="button-back"><img src={leftButton} alt="button-back" /></button>
            </div>
            <div className="header__forward-button">
               <button className="button-forward"><img src={rightButton} alt="button-forward" /></button>
            </div>
         </div>

         <div className="header__user-menu">
            <button className="header__pay">Сменить тариф</button>
            <div className="header__user">
               <span className="username">Username</span>
               <img src={menu} alt="" />
            </div>
         </div>
      </header>
   )
}

export default Header;