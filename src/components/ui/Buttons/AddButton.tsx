import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";

const ButtonStyle = {
  display: 'block',
  color: "white",
  backgroundColor: "#E66200",
  position: "relative",
  overflow: "hidden",
  borderRadius: "10%",
  width: "100px",
  height: "90px",
  padding: "0",
  border: "2px solid #E66200",
  transition: "background-color 0.3s",
  "&:hover": {
    color: "#E66200",
    backgroundColor: "white",
  },
};

const iconStyle = {
  display: 'block',
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  transition: "color 0.3s",
  marginLeft: '47px',
  marginTop: '10px'
};

interface AddButtonProps {
  onClick: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
  return (
    <Button sx={ButtonStyle} onClick={onClick}>
      Agregar empresa
      <Add sx={iconStyle} />
    </Button>
  );
};

export default AddButton;
