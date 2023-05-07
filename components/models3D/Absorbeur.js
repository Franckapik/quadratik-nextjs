import Foam from "./parts3D/Foam";
import Part from "./parts3D/Part";

const Absorbeur = ({ dimensions }) => {
  const { E, W, L, P, F} = dimensions;
  const e = E / 10; //epaisseur
  const w = parseInt(W); //largeur
  const l = w * L; //longueur
  const d = P; //profondeur
  const start = [-w / 2, -l / 2, d / 2];
console.log(F);
//useperformance to do

  return (
    <>
      {
        //Peignes longs + courts
        <group>
          <Part args={[e, l - e, d]} position={[start[0], 0, start[2]]} rotation={[0, 0, 0]} />
          <Part args={[e, l - e, d]} position={[start[0] + w, 0, start[2]]} rotation={[0, 0, 0]} />
          <Part args={[w + e, e, d]} position={[0, start[1], start[2]]} rotation={[0, 0, 0]} />
          <Part args={[w + e, e, d]} position={[0, start[1] + l, start[2]]} rotation={[0, 0, 0]} />
        </group>
      }
      {<Foam args={[w, l, 1]} position={[0, 0, 0]} color={F}/>}
    </>
  );
};

export default Absorbeur;
