import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import LayerControl from './LayerControl';

function Model({ layers }) {
  const { scene, animations } = useGLTF('/models/mosque_high.glb');
  const mixer = useRef(null);

    useEffect(() => {
        if (animations.length > 0) {
            mixer.current = new THREE.AnimationMixer(scene);
            const action = mixer.current.clipAction(animations[0]);
            action.play();
        }

        // Initialize layers
        layers.forEach((layer, index) => {
            layer.object = scene.children[index];
        });
    }, [scene, animations, layers]);

    useEffect(() => {
        layers.forEach(layer => {
            if (layer.object) {
                layer.object.visible = layer.visible;
            }
        });
    }, [layers]);

    useFrame((state, delta) => {
        if (mixer.current) mixer.current.update(delta);
    });

    return <primitive object={scene} scale={[0.01, 0.01, 0.01]} />;
}

export default function ModelViewer() {
    const [layers, setLayers] = useState([]);

    const toggleLayerVisibility = (layerToToggle) => {
        console.log('Toggling layer:', layerToToggle.name); // Лог для проверки кликов
        setLayers(layers.map(layer =>
            layer === layerToToggle ? { ...layer, visible: !layer.visible } : layer
        ));
    };

    useEffect(() => {
        // Initial state setup
        const initialLayers = [
            { name: 'Layer 1', visible: true, object: null },
            { name: 'Layer 2', visible: true, object: null },
            { name: 'Layer 3', visible: true, object: null },
            // Add more layers if needed
        ];
        setLayers(initialLayers);
    }, []);

    return (
        <div className="model-viewer">
            <LayerControl layers={layers} toggleLayerVisibility={toggleLayerVisibility} />
            <Canvas>
                <ambientLight intensity={0.5} />
                <directionalLight position={[0, 1, 0]} intensity={1} />
                <Model layers={layers} setLayers={setLayers} />
                <OrbitControls
                    minDistance={0.3} 
                    maxDistance={0.4} 
                    minPolarAngle={0} // Ограничение вверх
                    maxPolarAngle={Math.PI / 2.5} // Ограничение вниз (до горизонта)
                    rotateSpeed={0.1}
                />
            </Canvas>
        </div>
    );
}
