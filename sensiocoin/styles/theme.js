import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: (props) => ({
      "*": {
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
      },
      body: {
        color: props.colorMode === "light" ? "black" : "white",
        bg: props.colorMode === "light" ? "white" : "black",
      },
      html: {
        minWidth: "360px",
        scrollBehavior: "smooth",
      },
      "#__next": {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      },
      blockquote: {
        w: "full",
        bg: "green.200",
        color: "black",
        borderRadius: "3px",
        padding: "8px",
      },
      code: {
        bg: "gray.300",
        color: "black",
        px: "3px",
      },
      "#post div, #cookies": {
        width: "100%",
      },
      table: {
        maxWidth: "100%",
        margin: "0 auto",
        display: "inline-block",
        overflow: "auto",
        borderCollapse: "collapse",
        border: "none",
        position: "relative",
        left: "50%",
        transform: "translateX(-50%)",
      },
      "th, td": {
        padding: "5px",
        textAlign: "left",
        border: "1px solid gray",
      },
    }),
  },
  fonts: {
    body: `Montserrat,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
  },
  colors: {
    blue: {
      900: "#0E173E",
    },
    green: {
      200: "#00FF85",
    },
    gray: {
      100: "#fafafa",
    },
    purple: {
      200: "violet",
    },
  },
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
  },
  components: {
    Link: {
      variants: {
        purple: {
          bg: "purple.200",
          _hover: {
            bg: "purple.200",
            textDecoration: "none",
          },
          borderRadius: "8px",
          p: 3,
          textAlign: "center",
          color: "black",
          fontWeight: "bold",
        },
      },
    },
    Button: {
      variants: {
        black: {
          bg: "black",
          color: "white",
          _hover: {
            bg: "black",
          },
        },
        white: {
          bg: "#fafafa",
          color: "black",
          _hover: {
            bg: "#fafafa",
          },
        },
      },
    },
  },
});

export default theme;
