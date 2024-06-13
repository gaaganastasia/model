import React from 'react';

export default function LayerControl({ layers, toggleLayerVisibility }) {
    return (
        <div className="layer-control">
            <div className="layer-control-frame layer-control-frame_tr"></div>
            <div className="layer-control-frame layer-control-frame_tl"></div>
            <div className="layer-control-frame layer-control-frame_br"></div>
            <div className="layer-control-frame layer-control-frame_bl"></div>

            {layers.slice().reverse().map((layer, index) => (
                <button
                    className={layer.visible ? '' : 'btn-active'}
                    key={layer.originalIndex}
                    onClick={() => toggleLayerVisibility(layer)}
                    disabled={index === layers.length - 1} // Disable button for the bottom layer
                >
                    {layers.length - index} {/* Number buttons in reverse order */}
                </button>
            ))}
        </div>
    );
}
