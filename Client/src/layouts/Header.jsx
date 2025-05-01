import { useState } from "react";
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Button,
	Drawer,
	List,
	ListItem,
	ListItemText,
	Box,
	useScrollTrigger,
	Slide,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink, Link as RouterLink } from "react-router-dom";
import logo from "../assets/logo.png.svg"; // <-- replace with your path

const navigation = [
	{ name: "Home", href: "/" },
	{ name: "Host Blood Drive", href: "/host-blood-drive" },
	{ name: "Donate Money", href: "https://donorbox.org/donate-money-11" },
	{ name: "Help Needed", href: "/contact" },
	{ name: "Need Blood", href: "/need-blood", secondLast: true },
	{ name: "Donate Blood", href: "/donate-blood", last: true },
];

const HideOnScroll = ({ children }) => {
	const trigger = useScrollTrigger();
	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	);
};

const Header = () => {
	const [mobileOpen, setMobileOpen] = useState(false);

	const toggleDrawer = (open) => () => {
		setMobileOpen(open);
	};

	return (
		<>
			<HideOnScroll>
				<AppBar
					position="fixed"
					sx={{
						backgroundColor: "rgba(0, 0, 0, 0.6)",
						backdropFilter: "blur(10px)",
						borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
						boxShadow: "none",
					}}
				>
					<Toolbar sx={{ maxWidth: 1250, mx: "auto", width: "100%" }}>
						{/* Logo + Text */}
						<RouterLink to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
							<img src={logo} alt="HemoCell Logo" style={{ height: 30, marginRight: 8 }} />
							<Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
								Hemo
								<Box component="span" sx={{ color: "red" }}>Cell</Box>
							</Typography>
						</RouterLink>

						{/* Desktop Nav */}
						<Box sx={{ flexGrow: 1 }} />
						<Box sx={{ display: { xs: "none", lg: "flex" }, gap: 1 }}>
							{navigation.map((item) => (
								<Button
									key={item.name}
									component={NavLink}
									to={item.href}
									sx={{
										color: "white",
										textTransform: "none",
										border: item.secondLast ? "1px solid rgba(255,255,255,0.6)" : "none",
										backgroundColor: item.last ? "#4a0000" : "transparent",
										"&:hover": {
											backgroundColor: item.last ? "white" : "rgba(255,255,255,0.2)",
											color: item.last ? "black" : "white",
										},
									}}
								>
									{item.name}
								</Button>
							))}
						</Box>

						{/* Mobile Menu */}
						<IconButton
							color="inherit"
							edge="end"
							onClick={toggleDrawer(true)}
							sx={{ display: { lg: "none" } }}
						>
							<MenuIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
			</HideOnScroll>

			{/* Mobile Drawer */}
			<Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer(false)}>
				<Box sx={{ p: 2, width: "80vw" }}>
					<Box display="flex" justifyContent="space-between" alignItems="center">
						<RouterLink to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
							<img src={logo} alt="HemoCell Logo" style={{ height: 30, marginRight: 8 }} />
							<Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
								Hemo
								<Box component="span" sx={{ color: "red" }}>Cell</Box>
							</Typography>
						</RouterLink>
						<IconButton onClick={toggleDrawer(false)}>
							<CloseIcon />
						</IconButton>
					</Box>

					<List sx={{ mt: 4 }}>
						{navigation.map((item) => (
							<ListItem
								button
								key={item.name}
								component={NavLink}
								to={item.href}
								onClick={toggleDrawer(false)}
								sx={{
									mb: 1,
									borderRadius: 1,
									color: item.last ? "white" : "black",
									bgcolor: item.last ? "#4a0000" : "transparent",
									border: item.secondLast ? "1px solid rgba(0,0,0,0.5)" : "none",
									"&:hover": {
										backgroundColor: item.last ? "white" : "black",
										color: item.last ? "black" : "white",
									},
								}}
							>
								<ListItemText primary={item.name} />
							</ListItem>
						))}
					</List>
				</Box>
			</Drawer>
		</>
	);
};

export default Header;
