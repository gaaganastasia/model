import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import LayerControl from './LayerControl';

function Model({ layers, setLayers }) {
    const { scene, animations } = useGLTF('/models/mosque_low.glb');
    const mixer = useRef(null);

    useEffect(() => {
        if (animations.length > 0) {
            mixer.current = new THREE.AnimationMixer(scene);
            const action = mixer.current.clipAction(animations[0]);
            action.play();
        }

        // Initialize layers
        const initialLayers = scene.children.map((child, index) => ({
            name: `Layer ${index + 1}`,
            visible: true,
            object: child,
            targetY: 0, // начальное положение по Y
            moving: false // флаг движения
        }));

        setLayers(initialLayers);
    }, [scene, setLayers, animations]);

    useFrame((state, delta) => {
        if (mixer.current) mixer.current.update(delta);

        layers.forEach(layer => {
            if (layer.object) {
                const targetY = layer.visible ? 0 : 10; // Целевая позиция
                if (Math.abs(targetY - layer.object.position.y) > 0.01) {
                    layer.object.position.y += (targetY - layer.object.position.y) * 0.1; // Плавное перемещение
                    layer.moving = true; // Установить флаг движения
                } else {
                    layer.object.position.y = targetY;
                    layer.moving = false; // Сбросить флаг движения
                    if (!layer.visible) {
                        layer.object.visible = false; // Скрыть слой, если он не видим
                    }
                }
            }
        });
    });

    useEffect(() => {
        layers.forEach(layer => {
            if (layer.object) {
                if (layer.visible) {
                    layer.object.visible = true; // Показать слой, если он видим
                }
            }
        });
    }, [layers]);

    return <primitive object={scene} scale={[0.01, 0.01, 0.01]} />;
}

export default function ModelViewer() {
    const [layers, setLayers] = useState([]);

    const toggleLayerVisibility = (layerToToggle) => {
        console.log('Toggling layer:', layerToToggle.name);
        setLayers(layers.map(layer =>
            layer === layerToToggle ? { ...layer, visible: !layer.visible, moving: true } : layer
        ));
    };

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