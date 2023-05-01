import PopOverMenu from "@/components/header/PopOverMenu";
import SearchBar from "@/components/header/SearchBar";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
  const isAdmin = session?.user.role == "admin";

  // prettier-ignore
  let mainMenuDropDownItems = [
    { link: "/", label: "Home", faClass: "fa-home" },
    { link: "/bookmarks", label: "Bookmarks", faClass: "fa-bookmark" },
    { link: "/reservations", label: "Reservations", faClass: "fa-basket-shopping", },
    { link: "/notifications", label: "Notifications", faClass: "fa-bell" },
    // { link: "/help", label: "Help", faClass: "fa-question" },
    // { link: "/settings", label: "Settings", faClass: "fa-cog" },
  ];

  const adminMenuDropDownItems = [
    {
      link: "/admin/reservations",
      label: "(Admin) Reservations",
      faClass: "fa-basket-shopping",
    },
  ];

  // admin panels:

  if (isAdmin) {
    mainMenuDropDownItems = [
      ...mainMenuDropDownItems,
      ...adminMenuDropDownItems,
    ];
  }

  // prettier-ignore
  const userPanelDropDownItems = [
    { link: "/profile", label: "Profile" },
    { onClickHandler: signOut, label: "Logout" },
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
            <SearchBar />
            <PopOverMenu
              label={
                session?.user
                  ? `${session.user.firstName} ${session.user.lastName}`
                  : "User Panel"
              }
              subLabel={session?.user && `${session.user.role}`}
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
