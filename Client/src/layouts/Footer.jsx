import { Box, Container, Grid, Typography, Link as MUILink } from "@mui/material";
import { NavLink } from "react-router-dom";

const Footer = () => {
	const exploreLinks = [
		{ title: "Home", link: "/" },
		{ title: "Donate Blood", link: "/bloodrequestlist" },
		{ title: "Request Blood", link: "/bloodrequest" },
		{ title: "Donate Money", link: "https://donorbox.org/donate-money-11" },
		{ title: "Blood Drive Camp", link: "/bloodcamp" },
		{ title: "Contact", link: "/contact" },
		{ title: "Admin Dashboard", link: "/admin" },
	];

	const contactLinks = [
		{ title: "(+92)-304-050-9060", link: "tel:+923040509060" },
		{ title: "help@hemocell.com", link: "mailto:help@hemocell.com" },
		{ title: "Kolkata, India", link: "https://goo.gl/maps/QCLpYP3yyUqdT8HA7" },
		{ title: "Open 24/7", link: "/contact" },
	];

	return (
		<Box
			component="footer"
			sx={{
				backgroundColor: "#111",
				px: 2.5,
				pt: "70px",
				pb: "40px",
				color: "#D9D9D9",
				fontFamily: "'Montserrat', sans-serif",
			}}
		>
			<Container maxWidth="lg">
				<Grid container spacing={4}>
					{/* Logo and Tagline */}
					<Grid item xs={12} sm={6}>
						<Typography variant="h4" fontWeight="bold" color="#fff">
							Hemo<span style={{ color: "red" }}>Cell</span>
						</Typography>
						<Typography variant="h6" mt={1} fontWeight="normal">
							You don't have to be a doctor to save a life: Just donate blood.
						</Typography>
					</Grid>

					{/* Explore Links */}
					<Grid item xs={12} sm={3}>
						<Typography
							variant="subtitle1"
							fontWeight={500}
							textTransform="uppercase"
							color="red"
							mb={1}
						>
							Explore
						</Typography>
						<Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
							{exploreLinks.map((item, idx) => (
								<Box component="li" key={idx} mb={1}>
									<MUILink
										component={item.link.startsWith("http") ? "a" : NavLink}
										href={item.link.startsWith("http") ? item.link : undefined}
										to={!item.link.startsWith("http") ? item.link : undefined}
										target={item.link.startsWith("http") ? "_blank" : undefined}
										rel="noopener"
										sx={{
											textDecoration: "none",
											color: "#D9D9D9",
											fontSize: "18px",
											lineHeight: "34px",
											fontWeight: 500,
											"&:hover": { color: "#fff" },
										}}
									>
										{item.title}
									</MUILink>
								</Box>
							))}
						</Box>
					</Grid>

					{/* Contact Links */}
					<Grid item xs={12} sm={3}>
						<Typography
							variant="subtitle1"
							fontWeight={500}
							textTransform="uppercase"
							color="red"
							mb={1}
						>
							Contact
						</Typography>
						<Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
							{contactLinks.map((item, idx) => (
								<Box component="li" key={idx} mb={1}>
									<MUILink
										component="a"
										href={item.link}
										target={item.link.startsWith("http") ? "_blank" : undefined}
										rel="noopener"
										sx={{
											textDecoration: "none",
											color: "#D9D9D9",
											fontSize: "18px",
											lineHeight: "34px",
											fontWeight: 500,
											"&:hover": { color: "#fff" },
										}}
									>
										{item.title}
									</MUILink>
								</Box>
							))}
						</Box>
					</Grid>
				</Grid>

				{/* Footer Bottom Text */}
				<Box
					sx={{
						mt: 6,
						borderTop: "1px solid rgba(255, 255, 255, 0.2)",
						pt: 3,
						textAlign: "center",
					}}
				>
					<Typography variant="body2">
						© 2025 HemoCell – Website designed by{" "}
						<MUILink
							href="https://linkedin.com/in/aditya-lakandri"
							target="_blank"
							rel="noopener"
							underline="hover"
							sx={{ color: "#D9D9D9" }}
						>
							Aditya Lakandri
						</MUILink>
						{", "}
						<MUILink
							href="https://linkedin.com/in/soubhik-mahato"
							target="_blank"
							rel="noopener"
							underline="hover"
							sx={{ color: "#D9D9D9" }}
						>
							Soubhik Mahato
						</MUILink>
						{", and "}
						<MUILink
							href="https://linkedin.com/in/rahul-kumar-baitha"
							target="_blank"
							rel="noopener"
							underline="hover"
							sx={{ color: "#D9D9D9" }}
						>
							Rahul Kumar Baitha
						</MUILink>
					</Typography>
				</Box>
			</Container>
		</Box>
	);
};

export default Footer;
