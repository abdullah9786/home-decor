import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Canvas, Rect, Circle, Line, Triangle, Ellipse, PencilBrush, Polygon, IText } from 'fabric';
import Sidebar from '../components/Sidebar';
import CanvasComponent from '../components/CanvasComponent';
import './EditorPage.css';

const EditorPage = () => {
  const { roomType } = useParams();
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [activeTab, setActiveTab] = useState('generic');
  const [selectedTool, setSelectedTool] = useState(null);

  const roomNames = useMemo(() => ({
    hall: 'Hall',
    kitchen: 'Kitchen',
    dining: 'Dining Area',
    bedroom: 'Bedroom'
  }), []);

  const addTextAtPosition = useCallback((x, y) => {
    console.log('📝 addTextAtPosition called with:', x, y);
    
    if (!canvas) {
      console.warn('❌ Canvas not available for text');
      return;
    }

    try {
      const text = new IText('Type your text here', {
        left: x,
        top: y,
        fontSize: 20,
        fill: '#333333',
        fontFamily: 'Arial',
        originX: 'center',
        originY: 'center',
        selectable: true,
        editable: true
      });

      console.log('📝 Created interactive text object:', text);
      
      canvas.add(text);
      canvas.setActiveObject(text);
      canvas.renderAll();
      
      console.log('✅ Interactive text added to canvas successfully');
      
      // Immediately enter editing mode for new text
      setTimeout(() => {
        console.log('📝 Automatically entering edit mode for new text');
        try {
          text.enterEditing();
          text.selectAll();
        } catch (editError) {
          console.warn('Auto-edit failed, double-click to edit:', editError);
        }
      }, 150);
      
    } catch (error) {
      console.error('❌ Failed to add text:', error);
    }
  }, [canvas]);

  useEffect(() => {
    if (!roomType || !roomNames[roomType]) {
      navigate('/');
      return;
    }

    // Initialize fabric canvas with proper settings
    const fabricCanvas = new Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#ffffff',
      selection: true,
      preserveObjectStacking: true
    });

    // Configure canvas settings
    fabricCanvas.isDrawingMode = false;
    
    // Initialize drawing brush explicitly with error protection
    try {
      fabricCanvas.freeDrawingBrush = new PencilBrush(fabricCanvas);
      fabricCanvas.freeDrawingBrush.color = '#000000';
      fabricCanvas.freeDrawingBrush.width = 2;
    } catch (error) {
      console.warn('Failed to initialize brush:', error);
    }

    // Basic click handler - text tool will be handled separately
    fabricCanvas.on('mouse:down', (e) => {
      // Basic interaction handling - specific tool logic handled elsewhere
    });
    
    // Add double-click handler for text editing
    fabricCanvas.on('mouse:dblclick', (e) => {
      if (e.target && (e.target.type === 'text' || e.target.type === 'textbox' || e.target.type === 'i-text')) {
        console.log('📝 Double click on text - entering edit mode');
        try {
          e.target.enterEditing();
          e.target.selectAll();
        } catch (error) {
          console.warn('Failed to enter text editing mode:', error);
        }
      }
    });

    // Remove problematic automatic state saving
    setCanvas(fabricCanvas);
    console.log('🎯 Canvas initialized successfully');

    // Cleanup on unmount
    return () => {
      fabricCanvas.dispose();
    };
  }, [roomType, navigate, roomNames]);

  // Separate useEffect to handle text tool clicks without recreating canvas
  useEffect(() => {
    if (!canvas) return;

    const handleTextToolClick = (e) => {
      if (!e.target && !canvas.isDrawingMode && selectedTool === 'text') {
        console.log('✅ Adding text at click position');
        const pointer = canvas.getPointer(e.e);
        addTextAtPosition(pointer.x, pointer.y);
        setSelectedTool(null);
      }
    };

    // Add text tool handler
    canvas.on('mouse:down', handleTextToolClick);

    // Cleanup
    return () => {
      canvas.off('mouse:down', handleTextToolClick);
    };
  }, [canvas, selectedTool, addTextAtPosition]);

  const undo = () => {
    // Simplified undo - for now just show an alert
    // This prevents the JSON serialization issues
    alert('Undo functionality temporarily disabled to prevent errors. Use Ctrl+Z if your browser supports it.');
  };

  const redo = () => {
    // Simplified redo - for now just show an alert
    // This prevents the JSON serialization issues  
    alert('Redo functionality temporarily disabled to prevent errors. Use Ctrl+Y if your browser supports it.');
  };

  const clearCanvas = () => {
    if (canvas) {
      canvas.clear();
      canvas.setBackgroundColor('#ffffff', canvas.renderAll.bind(canvas));
      // The canvas events will automatically save the state
    }
  };

  const downloadCanvas = () => {
    if (!canvas) return;

    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1.0,
      multiplier: 2
    });

    const link = document.createElement('a');
    link.download = `home-decor-${roomType}-design.png`;
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleToolSelect = (tool) => {
    console.log('🎨 Tool selected:', tool);
    
    if (!canvas) {
      console.warn('❌ Canvas not available');
      return;
    }

    setSelectedTool(tool);

    // Handle different tools
    switch (tool) {
      case 'pencil':
        canvas.isDrawingMode = true;
        if (canvas.freeDrawingBrush) {
          canvas.freeDrawingBrush.color = '#000000';
          canvas.freeDrawingBrush.width = 2;
        }
        break;
      
      case 'eraser':
        canvas.isDrawingMode = true;
        if (canvas.freeDrawingBrush) {
          // For now, we'll use a white brush as eraser
          canvas.freeDrawingBrush.color = '#ffffff';
          canvas.freeDrawingBrush.width = 10;
        }
        break;

      case 'brush':
        canvas.isDrawingMode = true;
        if (canvas.freeDrawingBrush) {
          canvas.freeDrawingBrush.color = '#2E86AB';
          canvas.freeDrawingBrush.width = 8;
        }
        break;

      case 'marker':
        canvas.isDrawingMode = true;
        if (canvas.freeDrawingBrush) {
          canvas.freeDrawingBrush.color = '#F24236';
          canvas.freeDrawingBrush.width = 12;
        }
        break;

      case 'text':
        canvas.isDrawingMode = false;
        // Text tool will be handled separately when user clicks on canvas
        console.log('🎨 Text tool activated - click on canvas to add text');
        break;
      
      default:
        canvas.isDrawingMode = false;
        break;
    }
  };

  const addShape = (shapeType) => {
    console.log('🔧 Adding shape:', shapeType);
    
    if (!canvas) {
      console.warn('❌ Canvas not available');
      return;
    }

    // Turn off drawing mode when adding shapes
    canvas.isDrawingMode = false;
    setSelectedTool(null);

    let shape;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    console.log(`🎯 Canvas size: ${canvas.width}x${canvas.height}, Center: (${centerX}, ${centerY})`);

    switch (shapeType) {
      case 'rectangle':
        shape = new Rect({
          left: centerX,
          top: centerY,
          width: 100,
          height: 60,
          fill: 'rgba(0, 123, 255, 0.3)',
          stroke: '#007bff',
          strokeWidth: 2,
          originX: 'center',
          originY: 'center'
        });
        break;
      
      case 'circle':
        shape = new Circle({
          left: centerX,
          top: centerY,
          radius: 40,
          fill: 'rgba(40, 167, 69, 0.3)',
          stroke: '#28a745',
          strokeWidth: 2,
          originX: 'center',
          originY: 'center'
        });
        break;
      
      case 'line':
        shape = new Line([centerX - 50, centerY, centerX + 50, centerY], {
          stroke: '#dc3545',
          strokeWidth: 3,
          originX: 'center',
          originY: 'center'
        });
        break;

      case 'triangle':
        shape = new Triangle({
          left: centerX,
          top: centerY,
          width: 80,
          height: 60,
          fill: 'rgba(255, 193, 7, 0.3)',
          stroke: '#ffc107',
          strokeWidth: 2,
          originX: 'center',
          originY: 'center'
        });
        break;

      case 'ellipse':
        shape = new Ellipse({
          left: centerX,
          top: centerY,
          rx: 60,
          ry: 30,
          fill: 'rgba(111, 66, 193, 0.3)',
          stroke: '#6f42c1',
          strokeWidth: 2,
          originX: 'center',
          originY: 'center'
        });
        break;

      case 'arrow':
        // Create arrow using a line with arrow styling
        shape = new Line([centerX - 50, centerY, centerX + 30, centerY], {
          stroke: '#fd7e14',
          strokeWidth: 4
        });
        break;

      case 'star':
        // Create a proper 5-pointed star
        const starRadius = 30;
        const starPoints = [];
        for (let i = 0; i < 10; i++) {
          const angle = (i * Math.PI) / 5;
          const radius = i % 2 === 0 ? starRadius : starRadius * 0.5;
          starPoints.push({
            x: centerX + radius * Math.cos(angle - Math.PI / 2),
            y: centerY + radius * Math.sin(angle - Math.PI / 2)
          });
        }
        
        shape = new Polygon(starPoints, {
          fill: 'rgba(220, 53, 69, 0.3)',
          stroke: '#dc3545',
          strokeWidth: 2,
          originX: 'center',
          originY: 'center'
        });
        break;

      case 'polygon':
        // Create a proper hexagon (6-sided polygon)
        const hexRadius = 40;
        const hexPoints = [];
        for (let i = 0; i < 6; i++) {
          const angle = (i * 2 * Math.PI) / 6;
          hexPoints.push({
            x: centerX + hexRadius * Math.cos(angle),
            y: centerY + hexRadius * Math.sin(angle)
          });
        }
        
        shape = new Polygon(hexPoints, {
          fill: 'rgba(23, 162, 184, 0.3)',
          stroke: '#17a2b8',
          strokeWidth: 2,
          originX: 'center',
          originY: 'center'
        });
        break;

      case 'dimension':
        // Create a dimension line
        shape = new Line([centerX - 60, centerY, centerX + 60, centerY], {
          stroke: '#6c757d',
          strokeWidth: 1,
          strokeDashArray: [5, 5]
        });
        break;
      
      default:
        return;
    }

    if (shape) {
      try {
        canvas.add(shape);
        canvas.setActiveObject(shape);
        canvas.renderAll();
        console.log('✅ Shape added successfully');
      } catch (error) {
        console.warn('❌ Failed to add shape:', error);
        // Still try to render the canvas in case partial state was changed
        if (canvas.renderAll) {
          canvas.renderAll();
        }
      }
    }
  };



  const clearSelectedTool = () => {
    setSelectedTool(null);
  };

  const goBack = () => {
    navigate('/');
  };

  if (!roomType || !roomNames[roomType]) {
    return null;
  }

  return (
    <div className="editor-page">
      <header className="editor-header">
        <button className="back-button" onClick={goBack}>
          ← Back to Home
        </button>
        <h1 className="editor-title">
          {roomNames[roomType]} Designer
        </h1>
        <div className="editor-actions">
          <button 
            className="action-button"
            onClick={undo}
            disabled={false}
          >
            ↶ Undo
          </button>
          <button 
            className="action-button"
            onClick={redo}
            disabled={false}
          >
            ↷ Redo
          </button>
          <button className="action-button" onClick={clearCanvas}>
            🗑️ Clear
          </button>
          <button className="action-button primary" onClick={downloadCanvas}>
            💾 Save Design
          </button>
        </div>
      </header>

      <div className="editor-content">
        <Sidebar
          roomType={roomType}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedTool={selectedTool}
          onToolSelect={handleToolSelect}
          onShapeAdd={addShape}
          canvas={canvas}
          onClearTool={clearSelectedTool}
        />
        
        <main className="canvas-area">
          <CanvasComponent
            canvasRef={canvasRef}
            canvas={canvas}
          />
        </main>
      </div>
    </div>
  );
};

export default EditorPage;
