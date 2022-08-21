import FamilyList from "./MainPage/FamilyList";
import Profile from "./MainPage/Profile";
import ShoppingLists from "./MainPage/ShoppingLists";

export default function MainScreen({screen}) {
  return(
    <div>
      {screen == 0 ? <ShoppingLists /> : (screen == 1 ? <FamilyList /> : <Profile />)}
    </div>
  )
}