import { Box, Container, Grid, Typography, Link as MUILink } from "@mui/material";
import { NavLink } from "react-router-dom";

const Footer = () => {
	const exploreLinks = [
		{ title: "Home", link: "/" },
		{ title: "Donate Blood", link: "/donate-blood" },
		{ title: "Request Blood", link: "/need-blood" },
		{ title: "Donate Money", link: "https://donorbox.org/donate-money-11" },
		{ title: "Host Blood Drive", link: "/host-blood-drive" },
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
			}}
		>
			<Container maxWidth="lg">
				<Grid container spacing={4}>
					{/* First Column */}
					<Grid item xs={12} sm={6} md={6}>
						<Typography variant="h4" sx={{ fontWeight: "bold", color: "#fff" }}>
							Hemo<span style={{ color: "red" }}>Cell</span>
						</Typography>
						<Typography variant="h6" sx={{ mt: 1, fontWeight: "normal" }}>
							You don't have to be a doctor to save a life: Just donate blood
						</Typography>
					</Grid>

					{/* Explore Links */}
					<Grid item xs={12} sm={3} md={3}>
						<Typography
							variant="subtitle1"
							sx={{ fontWeight: 500, textTransform: "uppercase", color: "red", mb: 1 }}
						>
							Explore
						</Typography>
						<Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
							{exploreLinks.map((link, index) => (
								<Box component="li" key={index} sx={{ mb: 1 }}>
									<MUILink
										component={NavLink}
										to={link.link}
										sx={{
											textDecoration: "none",
											color: "#D9D9D9",
											fontSize: "18px",
											lineHeight: "34px",
											fontWeight: 500,
											"&:hover": { color: "#fff" },
										}}
									>
										{link.title}
									</MUILink>
								</Box>
							))}
						</Box>
					</Grid>

					{/* Contact Links */}
					<Grid item xs={12} sm={3} md={3}>
						<Typography
							variant="subtitle1"
							sx={{ fontWeight: 500, textTransform: "uppercase", color: "red", mb: 1 }}
						>
							Contact
						</Typography>
						<Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
							{contactLinks.map((link, index) => (
								<Box component="li" key={index} sx={{ mb: 1 }}>
									<MUILink
										component="a"
										href={link.link}
										target={link.link.startsWith("http") ? "_blank" : undefined}
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
										{link.title}
									</MUILink>
								</Box>
							))}
						</Box>
					</Grid>
				</Grid>

				{/* Footer Bottom */}
				<Box
					sx={{
						mt: 6,
						borderTop: "1px solid rgba(255, 255, 255, 0.2)",
						pt: 3,
						textAlign: "center",
					}}
				>
					<Typography variant="body2">
						©️ 2025 HemoCell - Website design by{" "}
						<MUILink
							href="https://linkedin.com/in/aditya-lakandri"
							target="_blank"
							underline="hover"
							rel="noopener"
							sx={{ color: "#D9D9D9" }}
						>
							Aditya Lakandri
						</MUILink>
						{", "}
						<MUILink
							href="https://linkedin.com/in/soubhik-mahato"
							target="_blank"
							underline="hover"
							rel="noopener"
							sx={{ color: "#D9D9D9" }}
						>
							Soubhik Mahato
						</MUILink>
						{", and "}
						<MUILink
							href="https://linkedin.com/in/rahul-kumar-baitha"
							target="_blank"
							underline="hover"
							rel="noopener"
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
