import React, { Suspense, useRef } from "react";

//import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
    Canvas,
    useLoader,
    useFrame,
    extend,
    useThree
} from "@react-three/fiber";
//import { shaderMaterial } from "@react-three/drei";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { VALID_LOADERS } from "next/dist/shared/lib/image-config";
//import "./styles.css";

// Calling extend with the native OrbitControls class from Three.js
// will make orbitControls available as a native JSX element.
// Notice how the OrbitControls classname becomes lowercase orbitControls when used as JSX element.
extend({ OrbitControls });

function Loading() {
    return (
        <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
            <sphereGeometry attach="geometry" args={[1, 16, 16]} />
            <meshStandardMaterial
                attach="material"
                color="white"
                transparent
                opacity={0.6}
                roughness={1}
                metalness={0}
            />
        </mesh>
    );
}

function ArWing() {
    const group = useRef();
    const { nodes, materials } = useLoader(GLTFLoader, "/models/trophy.glb");
    console.log(materials);
    return (
        <group ref={group}>
            <mesh visible geometry={nodes.cup001.geometry} material={materials['palette.001']}>
                <meshPhysicalMaterial attach="material" color="#FFFF00" roughness="0.7"
                    transmission="0.4"
                    thickness="1" />
            </mesh>
        </group>
    );
}

const CameraControls = () => {
    // Get a reference to the Three.js Camera, and the canvas html element.
    // We need these to setup the OrbitControls class.
    // https://threejs.org/docs/#examples/en/controls/OrbitControls

    const {
        camera,
        gl: { domElement }
    } = useThree();
    camera.position.x = 20;
    camera.position.y = 20;
    camera.position.z = 0;

    // Ref to the controls, so that we can update them on every frame using useFrame
    const controls = useRef();
    useFrame(state => controls.current.update());
    return (
        <orbitControls
            ref={controls}
            args={[camera, domElement]}
            enableZoom={false}
            maxAzimuthAngle={Math.PI / 4}
            maxPolarAngle={Math.PI}
            minAzimuthAngle={-Math.PI / 4}
            minPolarAngle={0}
        />
    );
};

function animate() {

    requestAnimationFrame(animate);

    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();

    renderer.render(scene, camera);

}

export default function App() {
    return (
        <>
            <Canvas style={{
                position: "absolute", background: "white", width: "100%",
                height: "100%"
            }}>
                <CameraControls />
                <pointLight position={[-20, 15, -20]} intensity={0.15} />
                <pointLight position={[-15, 10, -20]} intensity={0.65} />
                <Suspense fallback={<Loading />}>
                    <ArWing />
                </Suspense>
            </Canvas>
        </>
    );
}
