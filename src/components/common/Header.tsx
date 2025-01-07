import { Box, Typography } from "@mui/material";
import { useRef } from "react";

interface HeaderProps {
	heading: string;
}
const Header = ({ heading }: HeaderProps) => {
	const headeRef = useRef(null);

	return (
		<>
			<Box ref={headeRef} sx={{ backgroundColor: "#000" }}>
				<Typography variant="h1">{heading}</Typography>
			</Box>
		</>
	);
};

export default Header;
