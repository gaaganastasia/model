import React from 'react';

export default function LayerControl({ layers, toggleLayerVisibility }) {
    return (
        <div className="layer-control">
            {layers.map((layer, index) => (
                <button key={index} onClick={() => toggleLayerVisibility(layer)}>
                    {layer.name} {layer.visible ? 'Hide' : 'Show'}
                </button>
            ))}
        </div>
    );
}
