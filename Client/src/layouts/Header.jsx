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
import logo from "../assets/logo.png.svg"; // <-- update path if needed

const navigation = [
	{ name: "Home", href: "/" },
	{ name: "Host Blood Drive", href: "/host-blood-drive" },
	{ name: "Donate Money", href: "https://donorbox.org/donate-money-11" },
	{ name: "Help Needed", href: "/contact" },
	{ name: "Need Blood", href: "/bloodrequest", secondLast: true },
	{ name: "Donate Blood", href: "/bloodrequestlist", last: true },
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
	const toggleDrawer = (open) => () => setMobileOpen(open);

	return (
		<>
			<HideOnScroll>
				<AppBar
					position="fixed"
					sx={{
						backgroundColor: "transparent",
						backdropFilter: "blur(10px)",
						boxShadow: "none",
						borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
						color: "#fff",
					}}
				>
					<Toolbar
						sx={{
							maxWidth: 1250,
							mx: "auto",
							width: "100%",
							minHeight: { xs: 72, md: 88 }, // Increased height
							px: { xs: 2, sm: 3 },
						}}
					>
						{/* Logo */}
						<RouterLink to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
							<img src={logo} alt="HemoCell Logo" style={{ height: 42, marginRight: 12 }} /> {/* Bigger logo */}
							<Typography
								variant="h5" // Larger heading
								sx={{ fontWeight: "bold", color: "white" }}
							>
								Hemo
								<Box component="span" sx={{ color: "red" }}>Cell</Box>
							</Typography>
						</RouterLink>

						{/* Desktop Menu */}
						<Box sx={{ flexGrow: 1 }} />
						<Box sx={{ display: { xs: "none", lg: "flex" }, gap: 2 }}>
							{navigation.map((item) => (
								<Button
									key={item.name}
									component={NavLink}
									to={item.href}
									sx={{
										color: "white",
										textTransform: "none",
										fontSize: "1rem",
										px: 2,
										py: 1.2,
										borderRadius: "8px",
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

						{/* Mobile Menu Icon */}
						<IconButton
							color="inherit"
							edge="end"
							onClick={toggleDrawer(true)}
							sx={{ display: { lg: "none" } }}
						>
							<MenuIcon sx={{ fontSize: 30 }} />
						</IconButton>
					</Toolbar>
				</AppBar>
			</HideOnScroll>

			{/* Mobile Drawer */}
			<Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer(false)}>
				<Box sx={{ p: 2, width: "80vw" }}>
					<Box display="flex" justifyContent="space-between" alignItems="center">
						<RouterLink to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
							<img src={logo} alt="HemoCell Logo" style={{ height: 36, marginRight: 8 }} />
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
									fontSize: "1.1rem",
									py: 1.4,
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
