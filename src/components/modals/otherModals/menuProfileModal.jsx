import { Avatar, Menu, MenuItem, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MenuProfileModal = ({ open, anchor, handleClose }) => {

    const navigate = useNavigate();

    const logOut = () => {
        localStorage.removeItem("TokenId");
        navigate("/");
    }


    return (
        <Menu
            anchorEl={anchor}
            open={open}
            onClose={handleClose}
            PaperProps={{
                className: "w-64 p-4",
                elevation: 4,
            }}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
        >
            <Paper className="p-2">
                <div className="flex items-start space-x-3">
                    <Avatar className="bg-purple-700">A</Avatar>
                    <div>
                        <Typography className="font-medium text-gray-900">
                            Aditya Jain
                        </Typography>
                        <Typography className="text-sm text-gray-500">
                            9540441958
                        </Typography>
                    </div>
                </div>
                <div className="mt-4 border-t border-gray-200 pt-2">
                    <MenuItem onClick={() => {
                        handleClose()
                        navigate("/employerHome/profile")
                    }}>
                        <span className="text-sm text-gray-700">View profile</span>
                    </MenuItem>
                    <MenuItem onClick={() => {
                        handleClose()
                        navigate("/employerHome/company")
                    }}>
                        <span className="text-sm text-gray-700">Company Detail</span>
                    </MenuItem>
                    <MenuItem onClick={logOut}>
                        <span className="text-sm text-red-600">Sign out</span>
                    </MenuItem>
                </div>
            </Paper>
        </Menu>
    );
};

export default MenuProfileModal;
