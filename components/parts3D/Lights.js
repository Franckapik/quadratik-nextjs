import React from "react";

export const Lights = () => {

  return (
    <>
      <pointLight intensity={0.5} position={[-2, 1, -2]} />
      {/*      <Box args={[0.5,0.5,0.5]} position={[-2,1,-2]}/>
             */}{/*      <Plane   args={[5,5]} position={[0,5,5]} rotation ={[-Math.PI/4,0,0]} />
                <Plane   args={[5,5]} position={[5,5,0]} rotation ={[-Math.PI/2,Math.PI/4,0]} />
               <Plane   args={[5,5]} position={[0,5,-5]} rotation ={[Math.PI/4,0,0]} />
            */}    <rectAreaLight width={5} height={5} position={[0, 5, 5]} rotation={[-Math.PI / 4, 0, 0]} intensity={6} color="white" />
      <rectAreaLight width={5} height={5} position={[0, 5, 5]} rotation={[Math.PI / 4, 0, 0]} intensity={4} color="white" />
      <rectAreaLight width={5} height={5} position={[5, 3, 0]} rotation={[-Math.PI / 2, Math.PI / 4, 0]} intensity={2} color="white" />
    </>

  );
};
