import React from 'react';

export default function LayerControl({ layers, toggleLayerVisibility }) {
    const isMiddleLayerActive = layers.find(layer => layer.originalIndex === 1 && layer.visible);

    return (
        <div className="layer-control">
            <div className="layer-control-frame layer-control-frame_tr"></div>
            <div className="layer-control-frame layer-control-frame_tl"></div>
            <div className="layer-control-frame layer-control-frame_br"></div>
            <div className="layer-control-frame layer-control-frame_bl"></div>

            {layers.slice().reverse().map((layer, index) => (
                <button
                    className={`${layer.visible ? '' : 'btn-active'} ${index === layers.length - 1 ? 'btn-bottom' : ''}`}
                    key={layer.originalIndex}
                    onClick={() => toggleLayerVisibility(layer)}
                    disabled={index === layers.length - 1 || (index === layers.length - 3 && !isMiddleLayerActive)} // Disable button for the bottom layer and upper layer when middle is active
                >
                    {layers.length - index} {/* Number buttons in reverse order */}
                </button>
            ))}
        </div>
    );
}
