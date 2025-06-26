import { useAuthUserStore } from "../../store/authUser";

const HomeScreen = () => {
  const { logout } = useAuthUserStore();
  return (
    <div>
      HomeScreen
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default HomeScreen;
