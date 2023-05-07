import { Box } from "@react-three/drei";

const Foam = (props) => {
  return (
    <Box args={props.args} material-color={props.color} />
  );
};

export default Foam;
