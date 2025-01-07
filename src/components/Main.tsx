import { Container, createTheme, ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import Home from "./Home";
import Blog from "./sections/Blog";

declare module "@mui/material/styles" {
	interface TypographyVariants {
		h1: React.CSSProperties;
		p: React.CSSProperties;
	}

	// allow configuration using `createTheme()`
	interface TypographyVariantsOptions {
		h1: React.CSSProperties;
		p: React.CSSProperties;
	}
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
	interface TypographyPropsVariantOverrides {
		h1: true;
		p: true;
	}
}

const theme = createTheme({
	palette: {
		primary: {
			main: "#fff",
		},
	},
	typography: {
		fontFamily: "IBM Plex Mono",
		h1: {
			fontSize: "2em",
			fontWeight: 500,
			lineHeight: "1.15em",
		},
		p: {
			fontSize: "1em",
			fontWeight: 500,
			lineHeight: 1.2,
		},
	},
});

function Main() {
	return (
		<ThemeProvider theme={theme}>
			<Box sx={{ backgroundColor: "#000000", height: "100vh" }}>
				<Container maxWidth="lg">
					<Home />
          <Blog />
				</Container>
			</Box>
		</ThemeProvider>
	);
}

export default Main;
