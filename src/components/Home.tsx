import { Grid2, Typography } from "@mui/material";

function Home() {
	return (
		<Grid2
			container
			direction="row"
			justifyContent="center"
			alignItems="center"
			sx={{ marginTop: "15vh", fontSize: "1.2rem" }}
			spacing={4}
		>
			<Grid2 size={{ xs: 10, md: 8 }}>
				<Typography variant="h1">hello!!</Typography>
				<Typography variant="h1">i'm ashwin.</Typography>
			</Grid2>

			<Grid2 size={{ xs: 10, md: 8 }}>
				<Typography variant="p">
					I'm currently a Master's in Computer Science student at
					UMass Amherst. Software Engineer by Passion. And I love
					writing code, quality code.
				</Typography>
			</Grid2>

			<Grid2 size={{ xs: 10, md: 8 }}>
				<Typography variant="p">
					Welcome to THE STORY OF MY LIFE!!
				</Typography>
			</Grid2>
		</Grid2>
	);
}

export default Home;
