import { Grid2, Typography } from "@mui/material";
import Header from "../common/Header";

function Blog() {
	return (
		<Grid2
			container
			direction="row"
			justifyContent="center"
			alignItems="center"
			sx={{ marginTop: "5vh", fontSize: "1.2rem" }}
			spacing={4}
		>
			<Grid2 size={{ xs: 10, md: 8 }}>
				<Header heading="Blog" />
			</Grid2>
			<Grid2 size={{ xs: 10, md: 8 }}>
				<Typography variant="p">
					Blog description
				</Typography>
			</Grid2>
		</Grid2>
	);
}

export default Blog;
