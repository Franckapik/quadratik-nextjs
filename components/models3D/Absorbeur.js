import Foam from "./parts3D/Foam";
import Part from "./parts3D/Part";

const Absorbeur = ({ dimensions }) => {
  const {P, e, w, l, start, F } = dimensions;

  //useperformance to do

  return (
    <>
      {
        //Peignes longs + courts
        <group>
          <Part args={[e, l - e, P]} position={[start[0], 0, start[2]]} rotation={[0, 0, 0]} />
          <Part args={[e, l - e, P]} position={[start[0] + w, 0, start[2]]} rotation={[0, 0, 0]} />
          <Part args={[w + e, e, P]} position={[0, start[1], start[2]]} rotation={[0, 0, 0]} />
          <Part args={[w + e, e, P]} position={[0, start[1] + l, start[2]]} rotation={[0, 0, 0]} />
        </group>
      }
      {<Foam args={[w, l, 1]} position={[0, 0, 0]} color={F} />}
    </>
  );
};

export default Absorbeur;
