import { Navbar } from './Navbar'
import { HeaderContent } from './HeaderContent'
import { useLocation } from 'react-router-dom';
import CardForm from '../private/CardForm';


export const Header = () => {
  const location = useLocation();
  return (
    <header className={`header ${location.pathname == "/"? "header--viewport" : ""}`}>
        <div className='header__nav'>
          <Navbar />
        </div>
        {location.pathname == "/" ? <HeaderContent />: ""}
    </header>
  )
}
