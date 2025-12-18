import DeskTwoToneIcon from '@mui/icons-material/DeskTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import { Link, NavLink } from 'react-router-dom';
import { PATHS } from '../../pages/routes/paths';

export default function TopNavBar() {
  return (
    <nav className="bg-main-purple py-4 px-6 text-white flex justify-between items-center gap-6 sticky top-0 z-10">
      <Link to={PATHS.HOME} className="flex items-center gap-3">
        <DeskTwoToneIcon sx={{fontSize: 55}} className="text-main-orange" />
        <span className="font-bold">BookMyDesk</span>
      </Link>

      <div className="flex items-center gap-5">
        <NavLink to={PATHS.PROFILE} className={({isActive}) => `hover:text-main-orange ${isActive ? "text-main-orange" : ""}`}>
            <AccountCircleTwoToneIcon sx={{fontSize: 'var(--medium-icon)'}} />
        </NavLink>

        <NavLink to={PATHS.LOGIN} className=" hover:text-main-orange">
            <LogoutTwoToneIcon sx={{fontSize: 'var(--small-icon)'}} />
        </NavLink>
      </div>
    </nav>
  );
}