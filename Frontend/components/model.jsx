import {OBJLoader2} from 'three/examples/jsm/loaders/OBJLoader2.js';
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader.js';
import {MtlObjBridge} from 'three/examples/jsm/loaders/obj2/bridge/MtlObjBridge.js';

/* create a Three.js scene here */

const mtlLoader = new MTLLoader();
mtlLoader.load("model.mtl", mtlParseResult => {
    const materials = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
    const objLoader = new OBJLoader2();
    objLoader.addMaterials(materials);
    objLoader.load("model.obj", obj => scene.add(obj));
});