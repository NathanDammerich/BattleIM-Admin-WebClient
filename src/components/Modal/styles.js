import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  overlay: {
    zIndex: "1000",
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  child: {
    zIndex: "1001",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "80%",
    overflow: "scroll",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
}));
