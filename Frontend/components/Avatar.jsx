import style from "./Avatar.module.css"
import { useState } from "react";
import MuiAvatar from '@mui/material/Avatar';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/router'

/* Util functions */
function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

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

    console.log(stringAvatar(session.user.name))
    return (
        <div className={style.mainBox}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <MuiAvatar sx={{ width: 48, height: 48 }} {...stringAvatar(session.user.name)} />
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