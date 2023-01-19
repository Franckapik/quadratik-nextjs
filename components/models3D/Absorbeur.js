import Foam from "./parts3D/Foam";
import Part from "./parts3D/Part";

const Absorbeur = ({ p3d }) => {
  const e = p3d.E / 10; //epaisseur
  const w = p3d.W; //largeur
  const l = w * p3d.L ; //longueur
  const d = p3d.P; //profondeur
  const start = [-w / 2, -l / 2, d / 2];


  return (
    
    <> 
      {
        
  //Peignes longs + courts
      <group><Part args={[e, l - e, d]} position={[start[0], 0, start[2]]} rotation={[0, 0, 0]} /> 
      <Part args={[e, l - e, d]} position={[start[0] + w, 0, start[2]]} rotation={[0, 0, 0]} />
      <Part args={[w +e , e, d]} position={[0, start[1] , start[2]]} rotation={[0, 0, 0]} />
      <Part args={[w +e, e, d]} position={[0, start[1] + l, start[2]]} rotation={[0, 0, 0]} />
      </group>
}
     {<Foam
              args={[w, l, 0]}
              position={[0,0,0]}
            />}
    </>
  );
};

export default Absorbeur;
