import PopOverMenu from "@/components/header/PopOverMenu";

const Header = (props) => {
  const mainMenuDropDownItems = [
    { link: "/", label: "Home", faClass: "fa-home" },
    { link: "/categories", label: "Equipments", faClass: "fa-volleyball" },
    { link: "/bookmarks", label: "Bookmarks", faClass: "fa-bookmark" },
    {
      link: "/reservations",
      label: "Reservations",
      faClass: "fa-basket-shopping",
    },
    { link: "/notification", label: "Notifications", faClass: "fa-bell" },
    { link: "/help", label: "Help", faClass: "fa-question" },
    { link: "/settings", label: "Settings", faClass: "fa-cog" },
  ];
  const userPanelDropDownItems = [
    { link: "/profile", label: "Profile", faClass: "fa-pen-to-square" },
    { link: "/logout", label: "Logout", faClass: "fa-left-from-line" },
  ];
  return (
    <>
      <nav className="bg-blueGray-600 top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full flex justify-between items-center">
            <PopOverMenu
              label="Main Menu"
              faIconClass={"fa-bars"}
              dropDownItems={mainMenuDropDownItems}
              position="left"
            />
            <PopOverMenu
              label="User Panel"
              faIconClass={"fa-user"}
              dropDownItems={userPanelDropDownItems}
              position="right"
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
