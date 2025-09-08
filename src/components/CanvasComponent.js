import React, { useEffect } from 'react';
import './CanvasComponent.css';

const CanvasComponent = ({ canvasRef, canvas }) => {
  
  useEffect(() => {
    // Handle canvas resize on window resize with error protection
    const handleResize = () => {
      if (!canvas || !canvasRef.current) return;
      
      try {
        const container = canvasRef.current?.parentElement;
        if (container) {
          const containerWidth = container.clientWidth - 40; // Account for padding
          const containerHeight = container.clientHeight - 40;
          
          // Maintain aspect ratio while fitting within container
          let newWidth = Math.min(containerWidth, 800);
          let newHeight = Math.min(containerHeight, 600);
          
          if (containerWidth / containerHeight < 800 / 600) {
            newHeight = (containerWidth * 600) / 800;
          } else {
            newWidth = (containerHeight * 800) / 600;
          }
          
          // Use Fabric.js setDimensions for proper coordinate system alignment
          try {
            canvas.setDimensions({
              width: newWidth,
              height: newHeight
            });
            canvas.renderAll();
          } catch (error) {
            console.warn('Canvas setDimensions failed:', error);
          }
        }
      } catch (error) {
        console.warn('Canvas resize failed, skipping:', error);
        // Don't propagate the error, just log it
      }
    };

    // Debounce resize events to prevent excessive calls
    let resizeTimeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 150);
    };

    window.addEventListener('resize', debouncedResize);
    
    // Initial resize with delay to ensure canvas is ready
    setTimeout(() => {
      if (canvas && canvasRef.current) {
        handleResize();
      }
    }, 300);

    return () => {
      window.removeEventListener('resize', debouncedResize);
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
    };
  }, [canvas, canvasRef]);

  useEffect(() => {
    // Handle keyboard shortcuts
    const handleKeyDown = (e) => {
      if (!canvas) return;

      // Delete selected object with Delete key
      if (e.key === 'Delete' || e.key === 'Backspace') {
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
          canvas.remove(activeObject);
          canvas.renderAll();
        }
      }

      // Copy with Ctrl+C
      if (e.ctrlKey && e.key === 'c') {
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
          try {
            activeObject.clone((cloned) => {
              canvas._clipboard = cloned;
            });
          } catch (error) {
            console.warn('Copy failed:', error);
          }
        }
      }

      // Paste with Ctrl+V
      if (e.ctrlKey && e.key === 'v') {
        if (canvas._clipboard) {
          try {
            canvas._clipboard.clone((clonedObj) => {
              canvas.discardActiveObject();
              clonedObj.set({
                left: (clonedObj.left || 0) + 10,
                top: (clonedObj.top || 0) + 10,
                evented: true,
              });
              
              // Simplified paste - just add the object without complex group handling
              canvas.add(clonedObj);
              canvas.setActiveObject(clonedObj);
              canvas.renderAll();
              
              // Update clipboard position
              if (canvas._clipboard) {
                canvas._clipboard.set({
                  top: (canvas._clipboard.top || 0) + 10,
                  left: (canvas._clipboard.left || 0) + 10
                });
              }
            });
          } catch (error) {
            console.warn('Paste failed:', error);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [canvas]);

  return (
    <div className="canvas-container">
      <div className="canvas-wrapper">
        <canvas ref={canvasRef} id="canvas" />
      </div>
      
      <div className="canvas-info">
        <div className="info-item">
          <strong>Tips:</strong>
        </div>
        <div className="info-item">
          • Click and drag objects to move them
        </div>
        <div className="info-item">
          • Use corner handles to resize objects
        </div>
        <div className="info-item">
          • Press Delete to remove selected objects
        </div>
        <div className="info-item">
          • Double-click text to edit it
        </div>
        <div className="info-item">
          • Use Ctrl+C/Ctrl+V to copy and paste
        </div>
      </div>
    </div>
  );
};

export default CanvasComponent;
