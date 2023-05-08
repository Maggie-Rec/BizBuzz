import NavBar from "@/components/NavBar"
import SideBar from "@/components/SideBar";
import Dashboard from "@/components/Dashboard";

const MainPage = () => {
  return (
    <>
      <NavBar />
      <div className="container">
        <SideBar />
        <Dashboard />
      </div>
    </>
  );
}

export default MainPage