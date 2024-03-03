import { useState } from "react";
import TicTacToePositiveSvg from "../../assets/svg/tic-tac-toe/tic-tac-toe-logo-positive.svg"
import { IRoom, IUser } from "../../types/game.types";
import { useNavigate } from 'react-router-dom';
import { getLocalStorage, setLocalStorage } from "../../services/local-storage.service";
import { getRandomText } from "../../services/text.service";
import { FaPencilAlt } from "react-icons/fa";
import './home.css';

enum MENU_ITEMS {
  MULTIPLAYER = 'multiplayer',
  ONLINE = 'online',
  HOME = 'home'
}

export const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | undefined>(() => {
    const userLocalStorage = getLocalStorage<IUser>('user1')
    return userLocalStorage;
  })
  const [nameValue, setNameValue] = useState<string>();
  const [errorMsg, setErrorMsg] = useState<string>();
  const [menuItem, setMenuItem] = useState<MENU_ITEMS>(MENU_ITEMS.HOME);

  /* useEffect(() => {
    console.log('ESTOY EN EL EFFECT', user)
    if (user) {
      navigate('/tic-tac-toe-React/game');
    }
  }, [user]); */

  const saveUserForm = () => {
    if (nameValue?.length && nameValue?.length > 4) {
      const user: IUser = {
        id: getRandomText(15),
        userName: nameValue
      }
      console.log('user1', user)
      setLocalStorage('user1', user)
      setUser(user);
    }
    else if (nameValue?.length && nameValue?.length <= 4) {
      setErrorMsg('Username must contain at least 5 characters')
    }
    else if (!nameValue?.length) {
      setErrorMsg('Username is required')
    }
  }

  const startGame = () => {
    if (!user) saveUserForm();
    if (user) navigate('/tic-tac-toe-React/game');
  }

  const startMultiplayerGame = () => {
    //TODO: let storage 2 players
    setMenuItem(MENU_ITEMS.MULTIPLAYER);
  }

  const startOnlineGame = () => {
    if (!user) saveUserForm();
    if (user) {
      setMenuItem(MENU_ITEMS.ONLINE);
      const room: IRoom = {
        createdBy: user.id as string,
        status: 'WAITING_ROOM',
        createdDate: new Date(),
        players: {}
      }
      room.players[user.id] = true
    }
  }

  return (
    <main className="board">
      <div className="logo-container">
        <img className="logo" src={TicTacToePositiveSvg} alt="Tic Tac Toe Logo" />
        <h1 className="title">Tic Tac <br/> Toe</h1>
      </div>
      {
        user ? 
          (
          <div className="lobby">
            <div className="lobby-header">
              <h2 className="greeting">Welcome back, {user.userName} </h2>
              <button className="edit-btn">
                <FaPencilAlt />
              </button>
            </div>
          </div>
          )
             : 
          (
          <div className="login-form">
            <label htmlFor="userNameInput">Username</label>
            <input id='userNameInput' type="text" maxLength={10} minLength={5} onChange={e => setNameValue(e.target.value.trim())}/>
            { errorMsg && <p className="error-msg">{errorMsg}</p> }
           </div>
          )
      }
     
     <div className="menu-btns">
      <button onClick={()=>startGame()} className="btn-custom size-small mb-small">Start Game</button>
      <button onClick={()=>startOnlineGame()} className="btn-custom size-small mb-small">Multiplayer</button>
     </div>

    </main>
  )
}

export default Home;
