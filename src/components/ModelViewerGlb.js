import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import LayerControl from './LayerControl';

function Model({ layers, setLayers }) {
    const { scene, animations } = useGLTF('/models/mosque_low_2.glb');
    const mixer = useRef(null);

    useEffect(() => {
        if (animations.length > 0) {
            mixer.current = new THREE.AnimationMixer(scene);
            const action = mixer.current.clipAction(animations[0]);
            action.play();
        }

        // Инициализация слоев
        const initialLayers = scene.children.map((child, index) => {
            // Сохранение оригинальных материалов
            const originalMaterials = [];
            child.traverse((node) => {
                if (node.isMesh) {
                    originalMaterials.push(node.material);
                    node.material = node.material.clone();
                    node.material.transparent = true;
                }
            });

            return {
                name: `${index + 1}`,
                visible: true,
                object: child,
                originalIndex: index,
                targetY: 0, // начальное положение по Y
                moving: false, // флаг движения
                opacity: 1, // начальная прозрачность
                originalMaterials: originalMaterials // сохраненные оригинальные материалы
            };
        });

        setLayers(initialLayers);
    }, [scene, setLayers, animations]);

    useFrame((state, delta) => {
        if (mixer.current) mixer.current.update(delta);

        layers.forEach((layer) => {
            if (layer.object) {
                const targetY = layer.visible ? 0 : 5; // Целевая позиция
                const targetOpacity = layer.visible ? 1 : 0; // Целевая прозрачность

                // Плавное перемещение
                if (Math.abs(targetY - layer.object.position.y) > 0.01) {
                    layer.object.position.y += (targetY - layer.object.position.y) * 0.12;
                    layer.moving = true;
                } else {
                    layer.object.position.y = targetY;
                    layer.moving = false;
                }

                // Плавное изменение прозрачности
                if (Math.abs(targetOpacity - layer.opacity) > 0.01) {
                    layer.opacity += (targetOpacity - layer.opacity) * 0.12;
                    layer.object.traverse((node) => {
                        if (node.isMesh) {
                            node.material.opacity = layer.opacity;
                        }
                    });
                } else {
                    layer.opacity = targetOpacity;
                    layer.object.traverse((node) => {
                        if (node.isMesh) {
                            node.material.opacity = layer.opacity;
                        }
                    });
                }

                if (!layer.visible && !layer.moving) {
                    layer.object.visible = false; // Скрыть слой, если он не видим
                } else if (layer.visible && !layer.moving) {
                    layer.object.visible = true; // Показать слой, если он видим
                }
            }
        });
    });

    useEffect(() => {
        layers.forEach((layer) => {
            if (layer.object && layer.visible) {
                layer.object.visible = true; // Показать слой, если он видим
            }
        });
    }, [layers]);

    return <primitive object={scene} scale={[0.01, 0.01, 0.01]} position={[0, -0.05, 0]} />;
}

export default function ModelViewer() {
    const [layers, setLayers] = useState([]);

    const toggleLayerVisibility = (layerToToggle) => {
        console.log('Переключение слоя:', layerToToggle.name);

        // Если нажата нижняя кнопка, ничего не делать
        if (layerToToggle.originalIndex === 0) return;

        // Если нажата средняя кнопка, переключить верхний и средний слои
        if (layerToToggle.originalIndex === 1) {
            setLayers((prevLayers) =>
                prevLayers.map((layer) =>
                    layer.originalIndex >= 1 ? { ...layer, visible: !layer.visible, moving: true } : layer
                )
            );
        } else {
            // Переключить только верхний слой
            setLayers((prevLayers) =>
                prevLayers.map((layer) =>
                    layer === layerToToggle ? { ...layer, visible: !layer.visible, moving: true } : layer
                )
            );
        }
    };

    return (
        <div className="ddd" id='#ddd'>
            <h2 className="ddd__title">3D</h2>
            <div className="ddd__line"></div>
            <div className="model-viewer">
                <div className="model-viewer-frame model-viewer-frame_tr"></div>
                <div className="model-viewer-frame model-viewer-frame_tl"></div>
                <div className="model-viewer-frame model-viewer-frame_br"></div>
                <div className="model-viewer-frame model-viewer-frame_bl"></div>
                <LayerControl layers={layers} toggleLayerVisibility={toggleLayerVisibility} />
                <Canvas>
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[0, 1, 0]} intensity={1} />
                    <Model layers={layers} setLayers={setLayers} />
                    <OrbitControls
                        minDistance={0.3}
                        maxDistance={0.4}
                        minPolarAngle={0} // Ограничение вверх
                        maxPolarAngle={Math.PI / 2.9} // Ограничение вниз (до горизонта)
                        rotateSpeed={0.1}
                    />
                </Canvas>
            </div>
        </div>
    );
}
