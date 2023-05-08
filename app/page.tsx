
/* COMPONENTS */
import NavBar from "@/components/NavBar"
import SideBar from "@/components/SideBar";
import Dashboard from "@/components/Dashboard";
import ReportsView from "@/components/ReportsView";

const MainPage = () => {
  return (
    <>
      <NavBar />
      <div className="outer-container">
        <SideBar />
        {/* <Dashboard /> */}
        <ReportsView></ReportsView>
      </div>
    </>
  );
}

export default MainPage