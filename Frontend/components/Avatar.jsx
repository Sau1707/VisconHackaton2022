import style from "./Avatar.module.css"
import { useState } from "react";
import MuiAvatar from '@mui/material/Avatar';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/router'


const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function Avatar() {
    const router = useRouter()
    const { data: session, status } = useSession();
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const openPreferences = (e) => {
        e.preventDefault()
        router.push("/preferences")
    }

    return (
        <div className={style.mainBox}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <MuiAvatar sx={{ width: 48, height: 48 }} />
            </IconButton>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={openPreferences}>
                    <Typography textAlign="center"> My preferences </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={() => signOut("vseth-keycloak")}> Logout </Typography>
                </MenuItem>
            </Menu>
        </div>

    )
}