import LogoBox from "./LogoBox";
import MaximizeScreen from "./MaximizeScreen";
import React from "react";
const Header = () => {
    return (
        <React.Fragment>
			<header className="h-[70px] bg-white flex justify-between items-center px-4 gap-3.5">
				<LogoBox />
				<div className="">
					<MaximizeScreen />
				</div>

				{/* <div className="relative">
					<ProfileDropDown />
				</div> */}
			</header>
		</React.Fragment>
    );
};

export default Header