import Authscreen from "./Authscreen";
import HomeScreen from "./HomeScreen";

const HomePage = () => {
  const user =false;
  return (
    <div>
      {user ? <HomeScreen /> : <Authscreen />}
    </div>
  );
}

export default HomePage