import React from 'react';
import { Rect, FabricImage } from 'fabric';
import './Sidebar.css';

const Sidebar = ({ roomType, activeTab, setActiveTab, selectedTool, onToolSelect, onShapeAdd, canvas, onClearTool }) => {
  
  const genericTools = [
    { id: 'pencil', name: 'Pencil', icon: 'icon-pencil', type: 'tool' },
    { id: 'eraser', name: 'Eraser', icon: 'icon-eraser', type: 'tool' },
    { id: 'brush', name: 'Brush', icon: 'icon-brush', type: 'tool' },
    { id: 'marker', name: 'Marker', icon: 'icon-marker', type: 'tool' },
    { id: 'rectangle', name: 'Rectangle', icon: 'icon-rectangle', type: 'shape' },
    { id: 'circle', name: 'Circle', icon: 'icon-circle', type: 'shape' },
    { id: 'line', name: 'Line', icon: 'icon-line', type: 'shape' },
    { id: 'triangle', name: 'Triangle', icon: 'icon-triangle', type: 'shape' },
    { id: 'ellipse', name: 'Ellipse', icon: 'icon-ellipse', type: 'shape' },
    { id: 'arrow', name: 'Arrow', icon: 'icon-arrow', type: 'shape' },
    { id: 'star', name: 'Star', icon: 'icon-star', type: 'shape' },
    { id: 'polygon', name: 'Polygon', icon: 'icon-polygon', type: 'shape' },
    { id: 'text', name: 'Text', icon: 'icon-text', type: 'tool' },
    { id: 'dimension', name: 'Dimension Line', icon: 'icon-dimension', type: 'shape' }
  ];

  const roomElements = {
    hall: [
      { id: 'sofa', name: 'Sofa', icon: 'icon-sofa', color: '#8B4513' },
      { id: 'tv', name: 'TV', icon: 'icon-tv', color: '#2F4F4F' },
      { id: 'table', name: 'Coffee Table', icon: 'icon-table', color: '#DEB887' },
      { id: 'curtain', name: 'Curtains', icon: 'icon-curtain', color: '#FF6B6B' },
      { id: 'lamp', name: 'Floor Lamp', icon: 'icon-lamp', color: '#FFD700' },
      { id: 'plant', name: 'Plant', icon: 'icon-plant', color: '#228B22' },
      { id: 'bookshelf', name: 'Bookshelf', icon: 'icon-bookshelf', color: '#8B4513' },
      { id: 'armchair', name: 'Armchair', icon: 'icon-armchair', color: '#A0522D' },
      { id: 'wall_art', name: 'Wall Art', icon: 'icon-wall-art', color: '#FFD700' },
      { id: 'carpet', name: 'Area Carpet', icon: 'icon-carpet', color: '#8B0000' },
      { id: 'console_table', name: 'Console Table', icon: 'icon-console', color: '#DEB887' },
      { id: 'wall_clock', name: 'Wall Clock', icon: 'icon-clock', color: '#333333' },
      { id: 'vase', name: 'Decorative Vase', icon: 'icon-vase', color: '#4682B4' },
      { id: 'throw_pillows', name: 'Throw Pillows', icon: 'icon-pillows', color: '#FF6B6B' },
      { id: 'floor_cushions', name: 'Floor Cushions', icon: 'icon-cushions', color: '#32CD32' },
      { id: 'coat_rack', name: 'Coat Rack', icon: 'icon-coat-rack', color: '#654321' },
      { id: 'wall_mirror', name: 'Wall Mirror', icon: 'icon-wall-mirror', color: '#C0C0C0' },
      { id: 'tv_stand', name: 'TV Stand', icon: 'icon-tv-stand', color: '#8B4513' },
      { id: 'reading_chair', name: 'Reading Chair', icon: 'icon-reading-chair', color: '#4682B4' },
      { id: 'side_table', name: 'Side Table', icon: 'icon-side-table', color: '#DEB887' }
    ],
    kitchen: [
      { id: 'stove', name: 'Stove', icon: 'icon-stove', color: '#FF4500' },
      { id: 'fridge', name: 'Refrigerator', icon: 'icon-fridge', color: '#E6E6FA' },
      { id: 'sink', name: 'Sink', icon: 'icon-sink', color: '#4682B4' },
      { id: 'counter', name: 'Counter', icon: 'icon-counter', color: '#D2691E' },
      { id: 'cabinet', name: 'Cabinet', icon: 'icon-cabinet', color: '#8B4513' },
      { id: 'microwave', name: 'Microwave', icon: 'icon-microwave', color: '#2F4F4F' },
      { id: 'dishwasher', name: 'Dishwasher', icon: 'icon-dishwasher', color: '#E6E6FA' },
      { id: 'oven', name: 'Wall Oven', icon: 'icon-oven', color: '#333333' },
      { id: 'kitchen_island', name: 'Kitchen Island', icon: 'icon-island', color: '#8B4513' },
      { id: 'bar_stools', name: 'Bar Stools', icon: 'icon-bar-stools', color: '#654321' },
      { id: 'pantry', name: 'Pantry Cabinet', icon: 'icon-pantry', color: '#A0522D' },
      { id: 'coffee_maker', name: 'Coffee Maker', icon: 'icon-coffee-maker', color: '#333333' },
      { id: 'toaster', name: 'Toaster', icon: 'icon-toaster', color: '#C0C0C0' },
      { id: 'blender', name: 'Blender', icon: 'icon-blender', color: '#FF4500' },
      { id: 'cutting_board', name: 'Cutting Board', icon: 'icon-cutting-board', color: '#DEB887' },
      { id: 'knife_block', name: 'Knife Block', icon: 'icon-knife-block', color: '#654321' },
      { id: 'spice_rack', name: 'Spice Rack', icon: 'icon-spice-rack', color: '#8B4513' },
      { id: 'trash_can', name: 'Trash Can', icon: 'icon-trash-can', color: '#666666' },
      { id: 'kitchen_cart', name: 'Kitchen Cart', icon: 'icon-kitchen-cart', color: '#A0522D' },
      { id: 'backsplash', name: 'Backsplash', icon: 'icon-backsplash', color: '#4682B4' }
    ],
    dining: [
      { id: 'dining_table', name: 'Dining Table', icon: 'icon-dining-table', color: '#8B4513' },
      { id: 'chairs', name: 'Dining Chairs', icon: 'icon-chairs', color: '#654321' },
      { id: 'chandelier', name: 'Chandelier', icon: 'icon-chandelier', color: '#FFD700' },
      { id: 'buffet', name: 'Buffet', icon: 'icon-buffet', color: '#A0522D' },
      { id: 'wine_rack', name: 'Wine Rack', icon: 'icon-wine-rack', color: '#722F37' },
      { id: 'rug', name: 'Dining Rug', icon: 'icon-rug', color: '#8B0000' },
      { id: 'bar_cart', name: 'Bar Cart', icon: 'icon-bar-cart', color: '#FFD700' },
      { id: 'china_cabinet', name: 'China Cabinet', icon: 'icon-china-cabinet', color: '#8B4513' },
      { id: 'dining_wall_art', name: 'Wall Art', icon: 'icon-dining-art', color: '#4682B4' },
      { id: 'table_runner', name: 'Table Runner', icon: 'icon-table-runner', color: '#FF6B6B' },
      { id: 'centerpiece', name: 'Centerpiece', icon: 'icon-centerpiece', color: '#32CD32' },
      { id: 'candles', name: 'Candles', icon: 'icon-candles', color: '#FFD700' },
      { id: 'serving_cart', name: 'Serving Cart', icon: 'icon-serving-cart', color: '#C0C0C0' },
      { id: 'dining_mirror', name: 'Wall Mirror', icon: 'icon-dining-mirror', color: '#C0C0C0' },
      { id: 'floor_lamp_dining', name: 'Floor Lamp', icon: 'icon-floor-lamp', color: '#333333' },
      { id: 'dining_side_table', name: 'Side Table', icon: 'icon-dining-side', color: '#A0522D' },
      { id: 'wall_sconces', name: 'Wall Sconces', icon: 'icon-sconces', color: '#FFD700' },
      { id: 'picture_frames', name: 'Picture Frames', icon: 'icon-frames', color: '#654321' },
      { id: 'decorative_bowl', name: 'Decorative Bowl', icon: 'icon-bowl', color: '#4682B4' },
      { id: 'dining_plant', name: 'Plant', icon: 'icon-dining-plant', color: '#228B22' }
    ],
    bedroom: [
      { id: 'bed', name: 'Bed', icon: 'icon-bed', color: '#4682B4' },
      { id: 'nightstand', name: 'Nightstand', icon: 'icon-nightstand', color: '#8B4513' },
      { id: 'dresser', name: 'Dresser', icon: 'icon-dresser', color: '#A0522D' },
      { id: 'wardrobe', name: 'Wardrobe', icon: 'icon-wardrobe', color: '#654321' },
      { id: 'fan', name: 'Ceiling Fan', icon: 'icon-fan', color: '#2F4F4F' },
      { id: 'mirror', name: 'Mirror', icon: 'icon-mirror', color: '#C0C0C0' },
      { id: 'study_desk', name: 'Study Desk', icon: 'icon-study-desk', color: '#8B4513' },
      { id: 'desk_chair', name: 'Desk Chair', icon: 'icon-desk-chair', color: '#333333' },
      { id: 'bedroom_bookshelf', name: 'Bookshelf', icon: 'icon-bedroom-bookshelf', color: '#A0522D' },
      { id: 'reading_lamp', name: 'Reading Lamp', icon: 'icon-reading-lamp', color: '#FFD700' },
      { id: 'alarm_clock', name: 'Alarm Clock', icon: 'icon-alarm-clock', color: '#FF4500' },
      { id: 'bedroom_frames', name: 'Picture Frames', icon: 'icon-bedroom-frames', color: '#654321' },
      { id: 'laundry_basket', name: 'Laundry Basket', icon: 'icon-laundry-basket', color: '#8B4513' },
      { id: 'bedroom_bench', name: 'Bedroom Bench', icon: 'icon-bedroom-bench', color: '#4682B4' },
      { id: 'bedroom_wall_art', name: 'Wall Art', icon: 'icon-bedroom-art', color: '#FF6B6B' },
      { id: 'bedroom_rug', name: 'Area Rug', icon: 'icon-bedroom-rug', color: '#8B0000' },
      { id: 'bedroom_curtains', name: 'Curtains', icon: 'icon-bedroom-curtains', color: '#32CD32' },
      { id: 'decorative_pillows', name: 'Decorative Pillows', icon: 'icon-dec-pillows', color: '#FFB6C1' },
      { id: 'throw_blanket', name: 'Throw Blanket', icon: 'icon-blanket', color: '#87CEEB' },
      { id: 'wall_hooks', name: 'Wall Hooks', icon: 'icon-wall-hooks', color: '#666666' }
    ]
  };

  const handleToolClick = (tool) => {
    console.log('⚡ Tool clicked:', tool.name);
    
    if (tool.type === 'tool') {
      onToolSelect(tool.id);
    } else if (tool.type === 'shape') {
      onShapeAdd(tool.id);
    }
  };

  // SVG data for better furniture representations
  const getSVGData = (elementId) => {
    const svgData = {
      sofa: `data:image/svg+xml;base64,${btoa(`
        <svg width="120" height="60" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="25" width="110" height="30" fill="#8B4513" stroke="#333" stroke-width="1" rx="8"/>
          <rect x="5" y="15" width="110" height="15" fill="#A0522D" stroke="#333" stroke-width="1" rx="5"/>
          <rect x="0" y="20" width="15" height="25" fill="#8B4513" stroke="#333" stroke-width="1" rx="5"/>
          <rect x="105" y="20" width="15" height="25" fill="#8B4513" stroke="#333" stroke-width="1" rx="5"/>
          <circle cx="25" cy="35" r="4" fill="#654321"/>
          <circle cx="45" cy="35" r="4" fill="#654321"/>
          <circle cx="75" cy="35" r="4" fill="#654321"/>
          <circle cx="95" cy="35" r="4" fill="#654321"/>
        </svg>
      `)}`,
      
      bed: `data:image/svg+xml;base64,${btoa(`
        <svg width="160" height="100" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="30" width="150" height="60" fill="#4682B4" stroke="#333" stroke-width="2" rx="5"/>
          <rect x="5" y="15" width="150" height="20" fill="#8B4513" stroke="#333" stroke-width="2" rx="3"/>
          <ellipse cx="40" cy="40" rx="15" ry="8" fill="#F5F5DC" stroke="#DDD" stroke-width="1"/>
          <ellipse cx="120" cy="40" rx="15" ry="8" fill="#F5F5DC" stroke="#DDD" stroke-width="1"/>
          <rect x="20" y="55" width="120" height="25" fill="#87CEEB" stroke="#333" stroke-width="1"/>
        </svg>
      `)}`,
      
      tv: `data:image/svg+xml;base64,${btoa(`
        <svg width="100" height="70" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="5" width="90" height="50" fill="#000" stroke="#333" stroke-width="3" rx="3"/>
          <rect x="10" y="10" width="80" height="40" fill="#1a1a1a" stroke="#444" stroke-width="1"/>
          <rect x="40" y="55" width="20" height="10" fill="#666" stroke="#333" stroke-width="1"/>
          <ellipse cx="50" cy="70" rx="25" ry="3" fill="#888" opacity="0.5"/>
          <circle cx="85" cy="15" r="2" fill="#333"/>
        </svg>
      `)}`,
      
      dining_table: `data:image/svg+xml;base64,${btoa(`
        <svg width="100" height="60" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="25" rx="45" ry="25" fill="#8B4513" stroke="#333" stroke-width="2"/>
          <ellipse cx="50" cy="23" rx="42" ry="22" fill="#A0522D"/>
          <rect x="15" y="50" width="4" height="8" fill="#654321"/>
          <rect x="81" y="50" width="4" height="8" fill="#654321"/>
          <rect x="15" y="2" width="4" height="8" fill="#654321"/>
          <rect x="81" y="2" width="4" height="8" fill="#654321"/>
        </svg>
      `)}`,
      
      stove: `data:image/svg+xml;base64,${btoa(`
        <svg width="80" height="60" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="5" width="70" height="50" fill="#E8E8E8" stroke="#333" stroke-width="2" rx="3"/>
          <circle cx="22" cy="22" r="8" fill="#333" stroke="#666" stroke-width="1"/>
          <circle cx="58" cy="22" r="8" fill="#333" stroke="#666" stroke-width="1"/>
          <circle cx="22" cy="38" r="8" fill="#333" stroke="#666" stroke-width="1"/>
          <circle cx="58" cy="38" r="8" fill="#333" stroke="#666" stroke-width="1"/>
          <rect x="8" y="45" width="64" height="8" fill="#C0C0C0" stroke="#333" stroke-width="1"/>
        </svg>
      `)}`,
      
      fridge: `data:image/svg+xml;base64,${btoa(`
        <svg width="60" height="120" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="5" width="50" height="110" fill="#F0F8FF" stroke="#333" stroke-width="2" rx="5"/>
          <rect x="50" y="20" width="6" height="15" fill="#C0C0C0" stroke="#333" stroke-width="1" rx="2"/>
          <line x1="10" y1="40" x2="50" y2="40" stroke="#333" stroke-width="1"/>
          <rect x="50" y="65" width="6" height="25" fill="#C0C0C0" stroke="#333" stroke-width="1" rx="2"/>
          <rect x="10" y="100" width="40" height="5" fill="#C0C0C0"/>
        </svg>
      `)}`,
      
      sink: `data:image/svg+xml;base64,${btoa(`
        <svg width="60" height="40" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="30" cy="25" rx="25" ry="15" fill="#E6E6FA" stroke="#333" stroke-width="2"/>
          <ellipse cx="30" cy="23" rx="20" ry="12" fill="#F0F8FF"/>
          <rect x="28" y="5" width="4" height="15" fill="#C0C0C0" stroke="#333" stroke-width="1"/>
          <ellipse cx="30" cy="8" rx="3" ry="2" fill="#C0C0C0"/>
          <path d="M 30 8 Q 35 12 30 18" stroke="#87CEEB" stroke-width="2" fill="none" opacity="0.7"/>
        </svg>
      `)}`,
      
      chandelier: `data:image/svg+xml;base64,${btoa(`
        <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
          <circle cx="25" cy="15" r="6" fill="#FFD700" stroke="#333" stroke-width="2"/>
          <line x1="25" y1="9" x2="25" y2="3" stroke="#333" stroke-width="2"/>
          <line x1="15" y1="15" x2="5" y2="25" stroke="#DAA520" stroke-width="2"/>
          <line x1="35" y1="15" x2="45" y2="25" stroke="#DAA520" stroke-width="2"/>
          <line x1="19" y1="9" x2="9" y2="5" stroke="#DAA520" stroke-width="2"/>
          <line x1="31" y1="9" x2="41" y2="5" stroke="#DAA520" stroke-width="2"/>
          <circle cx="5" cy="25" r="3" fill="#FFFFE0" stroke="#333" stroke-width="1"/>
          <circle cx="45" cy="25" r="3" fill="#FFFFE0" stroke="#333" stroke-width="1"/>
          <circle cx="9" cy="5" r="3" fill="#FFFFE0" stroke="#333" stroke-width="1"/>
          <circle cx="41" cy="5" r="3" fill="#FFFFE0" stroke="#333" stroke-width="1"/>
        </svg>
      `)}`,
      
      plant: `data:image/svg+xml;base64,${btoa(`
        <svg width="40" height="50" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="20" cy="45" rx="15" ry="5" fill="#8B4513" stroke="#333" stroke-width="2"/>
          <rect x="18" y="30" width="4" height="15" fill="#228B22"/>
          <ellipse cx="20" cy="25" rx="8" ry="12" fill="#32CD32" stroke="#228B22" stroke-width="1"/>
          <ellipse cx="12" cy="20" rx="6" ry="8" fill="#32CD32" stroke="#228B22" stroke-width="1"/>
          <ellipse cx="28" cy="22" rx="6" ry="9" fill="#32CD32" stroke="#228B22" stroke-width="1"/>
          <ellipse cx="20" cy="15" rx="5" ry="7" fill="#228B22" stroke="#1F5F1F" stroke-width="1"/>
          <ellipse cx="15" cy="18" rx="4" ry="6" fill="#228B22" stroke="#1F5F1F" stroke-width="1"/>
          <ellipse cx="25" cy="18" rx="4" ry="6" fill="#228B22" stroke="#1F5F1F" stroke-width="1"/>
        </svg>
      `)}`,
      
      table: `data:image/svg+xml;base64,${btoa(`
        <svg width="60" height="50" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="15" width="50" height="8" fill="#DEB887" stroke="#333" stroke-width="2" rx="2"/>
          <rect x="15" y="10" width="30" height="4" fill="#8B7355" stroke="#333" stroke-width="1"/>
          <rect x="8" y="23" width="4" height="22" fill="#654321"/>
          <rect x="48" y="23" width="4" height="22" fill="#654321"/>
          <circle cx="25" cy="19" r="2" fill="#666"/>
          <rect x="22" y="45" width="6" height="3" fill="#333" rx="1"/>
          <rect x="38" y="45" width="6" height="3" fill="#333" rx="1"/>
        </svg>
      `)}`,
      
      curtain: `data:image/svg+xml;base64,${btoa(`
        <svg width="80" height="65" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="80" height="4" fill="#666" stroke="#333" stroke-width="1"/>
          <rect x="2" y="4" width="35" height="55" fill="#FF6B6B" stroke="#333" stroke-width="1" opacity="0.8"/>
          <rect x="43" y="4" width="35" height="55" fill="#FF6B6B" stroke="#333" stroke-width="1" opacity="0.8"/>
          <path d="M 2 59 Q 10 55 18 59 Q 26 63 34 59" stroke="#FF4040" stroke-width="2" fill="none"/>
          <path d="M 43 59 Q 51 55 59 59 Q 67 63 75 59" stroke="#FF4040" stroke-width="2" fill="none"/>
        </svg>
      `)}`,
      
      lamp: `data:image/svg+xml;base64,${btoa(`
        <svg width="40" height="70" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="20" cy="65" rx="12" ry="4" fill="#333" stroke="#000" stroke-width="2"/>
          <rect x="18" y="20" width="4" height="45" fill="#666" stroke="#333" stroke-width="1"/>
          <ellipse cx="20" cy="15" rx="18" ry="12" fill="#FFD700" stroke="#333" stroke-width="2" opacity="0.9"/>
          <ellipse cx="20" cy="13" rx="15" ry="9" fill="#FFFF99" opacity="0.7"/>
          <rect x="19" y="8" width="2" height="7" fill="#333"/>
        </svg>
      `)}`,
      
      counter: `data:image/svg+xml;base64,${btoa(`
        <svg width="120" height="50" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="120" height="15" fill="#D2691E" stroke="#333" stroke-width="2" rx="2"/>
          <rect x="0" y="15" width="120" height="35" fill="#8B4513" stroke="#333" stroke-width="1"/>
          <rect x="10" y="25" width="25" height="8" fill="#DDD" stroke="#333" stroke-width="1"/>
          <rect x="45" y="25" width="25" height="8" fill="#DDD" stroke="#333" stroke-width="1"/>
          <rect x="80" y="25" width="25" height="8" fill="#DDD" stroke="#333" stroke-width="1"/>
          <circle cx="30" cy="29" r="1" fill="#666"/>
          <circle cx="65" cy="29" r="1" fill="#666"/>
          <circle cx="100" cy="29" r="1" fill="#666"/>
        </svg>
      `)}`,
      
      cabinet: `data:image/svg+xml;base64,${btoa(`
        <svg width="80" height="60" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="5" width="70" height="50" fill="#8B4513" stroke="#333" stroke-width="2" rx="3"/>
          <rect x="10" y="10" width="28" height="40" fill="#DDD" stroke="#333" stroke-width="1"/>
          <rect x="42" y="10" width="28" height="40" fill="#DDD" stroke="#333" stroke-width="1"/>
          <circle cx="34" cy="30" r="2" fill="#666"/>
          <circle cx="46" cy="30" r="2" fill="#666"/>
          <line x1="40" y1="10" x2="40" y2="50" stroke="#333" stroke-width="1"/>
        </svg>
      `)}`,
      
      microwave: `data:image/svg+xml;base64,${btoa(`
        <svg width="60" height="40" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="56" height="36" fill="#E0E0E0" stroke="#333" stroke-width="2" rx="3"/>
          <rect x="6" y="6" width="35" height="28" fill="#222" stroke="#333" stroke-width="1"/>
          <rect x="45" y="8" width="8" height="24" fill="#666" stroke="#333" stroke-width="1" rx="1"/>
          <circle cx="47" cy="12" r="1" fill="#333"/>
          <circle cx="51" cy="12" r="1" fill="#333"/>
          <circle cx="47" cy="16" r="1" fill="#333"/>
          <circle cx="51" cy="16" r="1" fill="#333"/>
          <rect x="46" y="20" width="6" height="2" fill="#333" rx="1"/>
        </svg>
      `)}`,
      
      chairs: `data:image/svg+xml;base64,${btoa(`
        <svg width="50" height="40" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="5" width="12" height="20" fill="#654321" stroke="#333" stroke-width="1" rx="1"/>
          <rect x="5" y="20" width="12" height="12" fill="#654321" stroke="#333" stroke-width="1"/>
          <rect x="33" y="5" width="12" height="20" fill="#654321" stroke="#333" stroke-width="1" rx="1"/>
          <rect x="33" y="20" width="12" height="12" fill="#654321" stroke="#333" stroke-width="1"/>
          <rect x="6" y="32" width="10" height="3" fill="#333"/>
          <rect x="34" y="32" width="10" height="3" fill="#333"/>
        </svg>
      `)}`,
      
      buffet: `data:image/svg+xml;base64,${btoa(`
        <svg width="120" height="50" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="10" width="110" height="35" fill="#A0522D" stroke="#333" stroke-width="2" rx="3"/>
          <rect x="10" y="18" width="20" height="20" fill="#DDD" stroke="#333" stroke-width="1"/>
          <rect x="35" y="18" width="20" height="20" fill="#DDD" stroke="#333" stroke-width="1"/>
          <rect x="60" y="18" width="20" height="20" fill="#DDD" stroke="#333" stroke-width="1"/>
          <rect x="85" y="18" width="20" height="20" fill="#DDD" stroke="#333" stroke-width="1"/>
          <circle cx="27" cy="28" r="1" fill="#666"/>
          <circle cx="52" cy="28" r="1" fill="#666"/>
          <circle cx="77" cy="28" r="1" fill="#666"/>
          <circle cx="102" cy="28" r="1" fill="#666"/>
        </svg>
      `)}`,
      
      wine_rack: `data:image/svg+xml;base64,${btoa(`
        <svg width="40" height="60" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="5" width="30" height="50" fill="#722F37" stroke="#333" stroke-width="2" rx="2"/>
          <ellipse cx="12" cy="15" rx="2" ry="4" fill="#800000"/>
          <ellipse cx="20" cy="15" rx="2" ry="4" fill="#006400"/>
          <ellipse cx="28" cy="15" rx="2" ry="4" fill="#800000"/>
          <ellipse cx="12" cy="30" rx="2" ry="4" fill="#006400"/>
          <ellipse cx="20" cy="30" rx="2" ry="4" fill="#800000"/>
          <ellipse cx="28" cy="30" rx="2" ry="4" fill="#006400"/>
          <ellipse cx="12" cy="45" rx="2" ry="4" fill="#800000"/>
          <ellipse cx="20" cy="45" rx="2" ry="4" fill="#800000"/>
          <ellipse cx="28" cy="45" rx="2" ry="4" fill="#006400"/>
        </svg>
      `)}`,
      
      rug: `data:image/svg+xml;base64,${btoa(`
        <svg width="100" height="70" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="35" rx="45" ry="30" fill="#8B0000" stroke="#333" stroke-width="2"/>
          <ellipse cx="50" cy="35" rx="35" ry="22" fill="#A52A2A" opacity="0.8"/>
          <ellipse cx="50" cy="35" rx="25" ry="15" fill="#B22222" opacity="0.6"/>
          <path d="M 15 35 Q 30 25 45 35 Q 60 45 75 35" stroke="#660000" stroke-width="2" fill="none" opacity="0.7"/>
          <path d="M 25 20 Q 35 15 45 20 Q 55 25 65 20" stroke="#660000" stroke-width="1" fill="none" opacity="0.5"/>
        </svg>
      `)}`,
      
      nightstand: `data:image/svg+xml;base64,${btoa(`
        <svg width="50" height="55" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="10" width="40" height="35" fill="#8B4513" stroke="#333" stroke-width="1" rx="2"/>
          <rect x="8" y="20" width="34" height="8" fill="#DDD" stroke="#333" stroke-width="1"/>
          <circle cx="37" cy="24" r="2" fill="#666"/>
          <rect x="8" y="45" width="3" height="8" fill="#654321"/>
          <rect x="39" y="45" width="3" height="8" fill="#654321"/>
          <rect x="5" y="5" width="40" height="8" fill="#A0522D" stroke="#333" stroke-width="1" rx="2"/>
        </svg>
      `)}`,
      
      dresser: `data:image/svg+xml;base64,${btoa(`
        <svg width="100" height="60" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="5" width="90" height="50" fill="#A0522D" stroke="#333" stroke-width="2" rx="3"/>
          <rect x="10" y="12" width="80" height="8" fill="#DDD" stroke="#333" stroke-width="1"/>
          <rect x="10" y="25" width="80" height="8" fill="#DDD" stroke="#333" stroke-width="1"/>
          <rect x="10" y="38" width="80" height="8" fill="#DDD" stroke="#333" stroke-width="1"/>
          <circle cx="85" cy="16" r="2" fill="#666"/>
          <circle cx="85" cy="29" r="2" fill="#666"/>
          <circle cx="85" cy="42" r="2" fill="#666"/>
        </svg>
      `)}`,
      
      wardrobe: `data:image/svg+xml;base64,${btoa(`
        <svg width="80" height="120" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="5" width="70" height="110" fill="#654321" stroke="#333" stroke-width="2" rx="4"/>
          <rect x="10" y="10" width="28" height="100" fill="#DDD" stroke="#333" stroke-width="1"/>
          <rect x="42" y="10" width="28" height="100" fill="#DDD" stroke="#333" stroke-width="1"/>
          <circle cx="34" cy="60" r="3" fill="#666"/>
          <circle cx="46" cy="60" r="3" fill="#666"/>
          <line x1="40" y1="10" x2="40" y2="110" stroke="#333" stroke-width="1"/>
          <rect x="15" y="20" width="8" height="2" fill="#666" opacity="0.6"/>
          <rect x="57" y="20" width="8" height="2" fill="#666" opacity="0.6"/>
        </svg>
      `)}`,
      
      fan: `data:image/svg+xml;base64,${btoa(`
        <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
          <circle cx="25" cy="25" r="6" fill="#2F4F4F" stroke="#333" stroke-width="2"/>
          <ellipse cx="25" cy="10" rx="20" ry="5" fill="#2F4F4F" stroke="#333" stroke-width="1" transform="rotate(0 25 25)"/>
          <ellipse cx="40" cy="25" rx="20" ry="5" fill="#2F4F4F" stroke="#333" stroke-width="1" transform="rotate(90 25 25)"/>
          <ellipse cx="25" cy="40" rx="20" ry="5" fill="#2F4F4F" stroke="#333" stroke-width="1" transform="rotate(180 25 25)"/>
          <ellipse cx="10" cy="25" rx="20" ry="5" fill="#2F4F4F" stroke="#333" stroke-width="1" transform="rotate(270 25 25)"/>
          <circle cx="25" cy="25" r="4" fill="#666"/>
        </svg>
      `)}`,
      
      mirror: `data:image/svg+xml;base64,${btoa(`
        <svg width="50" height="60" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="25" cy="30" rx="20" ry="25" fill="#C0C0C0" stroke="#333" stroke-width="3"/>
          <ellipse cx="25" cy="30" rx="16" ry="21" fill="#E6E6FA"/>
          <ellipse cx="25" cy="30" rx="12" ry="17" fill="url(#mirror-gradient)"/>
          <defs>
            <linearGradient id="mirror-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:white;stop-opacity:0.8"/>
              <stop offset="100%" style="stop-color:white;stop-opacity:0.2"/>
            </linearGradient>
          </defs>
          <ellipse cx="20" cy="25" rx="3" ry="4" fill="white" opacity="0.6"/>
        </svg>
      `)}`,

      // Hall Elements
      bookshelf: `data:image/svg+xml;base64,${btoa(`
        <svg width="60" height="120" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="5" width="50" height="110" fill="#8B4513" stroke="#333" stroke-width="2" rx="3"/>
          <rect x="8" y="15" width="44" height="15" fill="#DDD" stroke="#333" stroke-width="1"/>
          <rect x="8" y="35" width="44" height="15" fill="#DDD" stroke="#333" stroke-width="1"/>
          <rect x="8" y="55" width="44" height="15" fill="#DDD" stroke="#333" stroke-width="1"/>
          <rect x="8" y="75" width="44" height="15" fill="#DDD" stroke="#333" stroke-width="1"/>
          <rect x="8" y="95" width="44" height="15" fill="#DDD" stroke="#333" stroke-width="1"/>
          <rect x="12" y="18" width="8" height="10" fill="#FF6B6B"/>
          <rect x="25" y="18" width="6" height="10" fill="#4682B4"/>
          <rect x="35" y="18" width="10" height="10" fill="#32CD32"/>
        </svg>
      `)}`,

      armchair: `data:image/svg+xml;base64,${btoa(`
        <svg width="80" height="70" xmlns="http://www.w3.org/2000/svg">
          <rect x="15" y="35" width="50" height="30" fill="#A0522D" stroke="#333" stroke-width="2" rx="5"/>
          <rect x="15" y="20" width="50" height="20" fill="#8B4513" stroke="#333" stroke-width="2" rx="8"/>
          <rect x="10" y="25" width="10" height="30" fill="#A0522D" stroke="#333" stroke-width="1" rx="5"/>
          <rect x="60" y="25" width="10" height="30" fill="#A0522D" stroke="#333" stroke-width="1" rx="5"/>
          <circle cx="35" cy="45" r="3" fill="#654321"/>
          <circle cx="55" cy="45" r="3" fill="#654321"/>
        </svg>
      `)}`,

      wall_art: `data:image/svg+xml;base64,${btoa(`
        <svg width="60" height="40" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="5" width="50" height="30" fill="#FFD700" stroke="#333" stroke-width="3" rx="2"/>
          <rect x="8" y="8" width="44" height="24" fill="#FFF8DC"/>
          <circle cx="20" cy="15" r="3" fill="#FF6B6B"/>
          <path d="M 15 25 Q 25 15 35 25 Q 45 35 55 25" stroke="#32CD32" stroke-width="2" fill="none"/>
          <rect x="25" y="18" width="10" height="8" fill="#4682B4"/>
        </svg>
      `)}`,

      carpet: `data:image/svg+xml;base64,${btoa(`
        <svg width="120" height="80" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="60" cy="40" rx="55" ry="35" fill="#8B0000" stroke="#333" stroke-width="2"/>
          <ellipse cx="60" cy="40" rx="45" ry="28" fill="#A52A2A" opacity="0.8"/>
          <ellipse cx="60" cy="40" rx="35" ry="20" fill="#B22222" opacity="0.6"/>
          <path d="M 20 40 Q 40 25 60 40 Q 80 55 100 40" stroke="#660000" stroke-width="2" fill="none"/>
          <circle cx="40" cy="30" r="2" fill="#FFD700" opacity="0.8"/>
          <circle cx="80" cy="50" r="2" fill="#FFD700" opacity="0.8"/>
        </svg>
      `)}`,

      console_table: `data:image/svg+xml;base64,${btoa(`
        <svg width="100" height="40" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="15" width="90" height="8" fill="#DEB887" stroke="#333" stroke-width="2" rx="2"/>
          <rect x="8" y="23" width="4" height="15" fill="#654321"/>
          <rect x="88" y="23" width="4" height="15" fill="#654321"/>
          <rect x="15" y="10" width="70" height="3" fill="#8B7355" stroke="#333" stroke-width="1"/>
          <circle cx="30" cy="19" r="1" fill="#666"/>
          <rect x="25" y="38" width="10" height="2" fill="#333" rx="1"/>
        </svg>
      `)}`,

      wall_clock: `data:image/svg+xml;base64,${btoa(`
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="18" fill="#333" stroke="#666" stroke-width="2"/>
          <circle cx="20" cy="20" r="15" fill="#FFF"/>
          <circle cx="20" cy="20" r="1" fill="#333"/>
          <line x1="20" y1="20" x2="20" y2="10" stroke="#333" stroke-width="2"/>
          <line x1="20" y1="20" x2="28" y2="20" stroke="#333" stroke-width="1"/>
          <text x="20" y="8" font-size="4" text-anchor="middle" fill="#333">12</text>
          <text x="32" y="22" font-size="4" text-anchor="middle" fill="#333">3</text>
        </svg>
      `)}`,

      vase: `data:image/svg+xml;base64,${btoa(`
        <svg width="30" height="50" xmlns="http://www.w3.org/2000/svg">
          <path d="M 8 45 L 8 35 Q 8 25 15 15 L 15 5 L 15 5 L 15 15 Q 22 25 22 35 L 22 45 Z" fill="#4682B4" stroke="#333" stroke-width="2"/>
          <ellipse cx="15" cy="45" rx="8" ry="3" fill="#4682B4"/>
          <rect x="12" y="5" width="6" height="5" fill="#4682B4" stroke="#333" stroke-width="1"/>
          <ellipse cx="15" cy="15" rx="2" ry="8" fill="#32CD32"/>
          <ellipse cx="12" cy="12" rx="1" ry="6" fill="#228B22"/>
          <ellipse cx="18" cy="10" rx="1" ry="5" fill="#228B22"/>
        </svg>
      `)}`,

      // Kitchen Elements
      dishwasher: `data:image/svg+xml;base64,${btoa(`
        <svg width="60" height="80" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="5" width="50" height="70" fill="#E6E6FA" stroke="#333" stroke-width="2" rx="3"/>
          <rect x="8" y="15" width="44" height="50" fill="#DDD" stroke="#333" stroke-width="1"/>
          <rect x="45" y="8" width="8" height="4" fill="#666" stroke="#333" stroke-width="1" rx="1"/>
          <circle cx="15" cy="12" r="2" fill="#333"/>
          <circle cx="25" cy="12" r="2" fill="#32CD32"/>
          <rect x="10" y="20" width="40" height="40" fill="#F0F8FF" opacity="0.8"/>
          <circle cx="30" cy="40" r="8" fill="#87CEEB" opacity="0.6"/>
        </svg>
      `)}`,

      oven: `data:image/svg+xml;base64,${btoa(`
        <svg width="60" height="60" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="5" width="50" height="50" fill="#333" stroke="#666" stroke-width="2" rx="3"/>
          <rect x="10" y="10" width="40" height="35" fill="#222" stroke="#444" stroke-width="1"/>
          <rect x="15" y="15" width="30" height="25" fill="#111"/>
          <circle cx="50" cy="12" r="2" fill="#666"/>
          <rect x="8" y="48" width="44" height="5" fill="#666" stroke="#333" stroke-width="1"/>
          <rect x="20" y="20" width="20" height="15" fill="#FFD700" opacity="0.3"/>
        </svg>
      `)}`,

      kitchen_island: `data:image/svg+xml;base64,${btoa(`
        <svg width="120" height="60" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="10" width="100" height="40" fill="#8B4513" stroke="#333" stroke-width="2" rx="5"/>
          <rect x="5" y="5" width="110" height="15" fill="#D2691E" stroke="#333" stroke-width="2" rx="3"/>
          <rect x="20" y="25" width="20" height="8" fill="#DDD" stroke="#333" stroke-width="1"/>
          <rect x="50" y="25" width="20" height="8" fill="#DDD" stroke="#333" stroke-width="1"/>
          <rect x="80" y="25" width="20" height="8" fill="#DDD" stroke="#333" stroke-width="1"/>
          <circle cx="28" cy="29" r="1" fill="#666"/>
          <circle cx="88" cy="29" r="1" fill="#666"/>
        </svg>
      `)}`,

      bar_stools: `data:image/svg+xml;base64,${btoa(`
        <svg width="80" height="70" xmlns="http://www.w3.org/2000/svg">
          <circle cx="25" cy="20" r="12" fill="#654321" stroke="#333" stroke-width="2"/>
          <rect x="23" y="32" width="4" height="30" fill="#333"/>
          <circle cx="25" cy="68" r="8" fill="#333"/>
          <circle cx="55" cy="25" r="12" fill="#654321" stroke="#333" stroke-width="2"/>
          <rect x="53" y="37" width="4" height="25" fill="#333"/>
          <circle cx="55" cy="68" r="8" fill="#333"/>
        </svg>
      `)}`,

      coffee_maker: `data:image/svg+xml;base64,${btoa(`
        <svg width="40" height="50" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="15" width="24" height="30" fill="#333" stroke="#666" stroke-width="2" rx="3"/>
          <rect x="10" y="18" width="20" height="20" fill="#222"/>
          <rect x="5" y="10" width="30" height="8" fill="#666" stroke="#333" stroke-width="1" rx="2"/>
          <circle cx="28" cy="14" r="2" fill="#FF4500"/>
          <rect x="15" y="45" width="10" height="3" fill="#8B4513" rx="1"/>
          <ellipse cx="20" cy="25" rx="6" ry="8" fill="#8B4513" opacity="0.8"/>
        </svg>
      `)}`,

      toaster: `data:image/svg+xml;base64,${btoa(`
        <svg width="50" height="30" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="8" width="40" height="18" fill="#C0C0C0" stroke="#333" stroke-width="2" rx="3"/>
          <rect x="10" y="12" width="12" height="10" fill="#222" stroke="#333" stroke-width="1"/>
          <rect x="28" y="12" width="12" height="10" fill="#222" stroke="#333" stroke-width="1"/>
          <circle cx="42" cy="15" r="2" fill="#666"/>
          <rect x="8" y="26" width="34" height="2" fill="#999"/>
          <rect x="15" y="6" width="20" height="2" fill="#FFD700"/>
        </svg>
      `)}`,

      // Dining Room Elements  
      bar_cart: `data:image/svg+xml;base64,${btoa(`
        <svg width="60" height="70" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="15" width="40" height="4" fill="#FFD700" stroke="#333" stroke-width="2"/>
          <rect x="10" y="35" width="40" height="4" fill="#FFD700" stroke="#333" stroke-width="2"/>
          <rect x="8" y="13" width="4" height="26" fill="#C0C0C0"/>
          <rect x="48" y="13" width="4" height="26" fill="#C0C0C0"/>
          <circle cx="15" cy="60" r="5" fill="#333"/>
          <circle cx="45" cy="60" r="5" fill="#333"/>
          <ellipse cx="20" cy="25" rx="3" ry="5" fill="#800000"/>
          <ellipse cx="35" cy="25" rx="3" ry="5" fill="#006400"/>
        </svg>
      `)}`,

      china_cabinet: `data:image/svg+xml;base64,${btoa(`
        <svg width="80" height="120" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="5" width="70" height="110" fill="#8B4513" stroke="#333" stroke-width="2" rx="4"/>
          <rect x="10" y="10" width="60" height="45" fill="transparent" stroke="#333" stroke-width="1"/>
          <rect x="10" y="60" width="60" height="50" fill="#DDD" stroke="#333" stroke-width="1"/>
          <circle cx="65" cy="85" r="2" fill="#666"/>
          <circle cx="15" cy="25" r="2" fill="#4682B4"/>
          <circle cx="25" cy="35" r="2" fill="#FF6B6B"/>
          <ellipse cx="45" cy="30" rx="5" ry="3" fill="#FFD700"/>
        </svg>
      `)}`,

      centerpiece: `data:image/svg+xml;base64,${btoa(`
        <svg width="60" height="30" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="30" cy="25" rx="25" ry="4" fill="#8B4513" stroke="#333" stroke-width="2"/>
          <ellipse cx="20" cy="15" rx="6" ry="8" fill="#32CD32"/>
          <ellipse cx="30" cy="10" rx="8" ry="10" fill="#FFD700"/>
          <ellipse cx="40" cy="15" rx="6" ry="8" fill="#FF6B6B"/>
          <circle cx="15" cy="20" r="2" fill="#4682B4"/>
          <circle cx="45" cy="20" r="2" fill="#FF4500"/>
        </svg>
      `)}`,

      candles: `data:image/svg+xml;base64,${btoa(`
        <svg width="50" height="40" xmlns="http://www.w3.org/2000/svg">
          <rect x="15" y="20" width="4" height="15" fill="#FFD700" stroke="#333" stroke-width="1"/>
          <rect x="31" y="25" width="4" height="10" fill="#FFD700" stroke="#333" stroke-width="1"/>
          <ellipse cx="17" cy="18" rx="2" ry="3" fill="#FF4500"/>
          <ellipse cx="33" cy="23" rx="2" ry="3" fill="#FF4500"/>
          <ellipse cx="25" cy="38" rx="15" ry="2" fill="#8B4513"/>
          <rect x="23" y="15" width="4" height="20" fill="#FFD700" stroke="#333" stroke-width="1"/>
          <ellipse cx="25" cy="13" rx="2" ry="3" fill="#FF4500"/>
        </svg>
      `)}`,

      // Bedroom Elements
      study_desk: `data:image/svg+xml;base64,${btoa(`
        <svg width="100" height="60" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="15" width="80" height="8" fill="#8B4513" stroke="#333" stroke-width="2" rx="2"/>
          <rect x="15" y="23" width="25" height="20" fill="#A0522D" stroke="#333" stroke-width="1"/>
          <rect x="18" y="28" width="19" height="6" fill="#DDD" stroke="#333" stroke-width="1"/>
          <circle cx="35" cy="31" r="1" fill="#666"/>
          <rect x="13" y="43" width="4" height="15" fill="#654321"/>
          <rect x="83" y="43" width="4" height="15" fill="#654321"/>
        </svg>
      `)}`,

      desk_chair: `data:image/svg+xml;base64,${btoa(`
        <svg width="50" height="70" xmlns="http://www.w3.org/2000/svg">
          <rect x="15" y="10" width="20" height="25" fill="#333" stroke="#666" stroke-width="2" rx="3"/>
          <rect x="18" y="35" width="14" height="3" fill="#333"/>
          <rect x="23" y="38" width="4" height="20" fill="#666"/>
          <circle cx="25" cy="65" r="8" fill="#333"/>
          <circle cx="20" cy="62" r="2" fill="#666"/>
          <circle cx="30" cy="62" r="2" fill="#666"/>
          <circle cx="25" cy="58" r="2" fill="#666"/>
        </svg>
      `)}`,

      reading_lamp: `data:image/svg+xml;base64,${btoa(`
        <svg width="40" height="60" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="20" cy="55" rx="10" ry="3" fill="#333"/>
          <rect x="18" y="35" width="4" height="20" fill="#666"/>
          <path d="M 20 35 Q 15 25 25 15" stroke="#666" stroke-width="3" fill="none"/>
          <ellipse cx="25" cy="15" rx="12" ry="8" fill="#FFD700" stroke="#333" stroke-width="2"/>
          <ellipse cx="25" cy="13" rx="10" ry="6" fill="#FFFF99" opacity="0.8"/>
        </svg>
      `)}`,

      alarm_clock: `data:image/svg+xml;base64,${btoa(`
        <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="15" fill="#FF4500" stroke="#333" stroke-width="2"/>
          <circle cx="20" cy="20" r="12" fill="#FFF"/>
          <circle cx="20" cy="20" r="1" fill="#333"/>
          <line x1="20" y1="20" x2="20" y2="12" stroke="#333" stroke-width="2"/>
          <line x1="20" y1="20" x2="26" y2="20" stroke="#333" stroke-width="1"/>
          <circle cx="10" cy="12" r="3" fill="#333"/>
          <circle cx="30" cy="12" r="3" fill="#333"/>
          <rect x="8" y="5" width="4" height="8" fill="#333" rx="2"/>
          <rect x="28" y="5" width="4" height="8" fill="#333" rx="2"/>
        </svg>
      `)}`,

      laundry_basket: `data:image/svg+xml;base64,${btoa(`
        <svg width="50" height="40" xmlns="http://www.w3.org/2000/svg">
          <path d="M 8 35 L 10 15 L 40 15 L 42 35 Z" fill="#8B4513" stroke="#333" stroke-width="2"/>
          <rect x="12" y="18" width="26" height="2" fill="#654321"/>
          <rect x="12" y="25" width="26" height="2" fill="#654321"/>
          <rect x="12" y="32" width="26" height="2" fill="#654321"/>
          <rect x="20" y="12" width="10" height="6" fill="#87CEEB" opacity="0.8"/>
          <rect x="18" y="20" width="6" height="8" fill="#FFB6C1" opacity="0.8"/>
        </svg>
      `)}`,

      throw_blanket: `data:image/svg+xml;base64,${btoa(`
        <svg width="60" height="40" xmlns="http://www.w3.org/2000/svg">
          <path d="M 5 35 Q 15 25 30 30 Q 45 35 55 25 L 55 35 Q 45 45 30 40 Q 15 35 5 45 Z" fill="#87CEEB" stroke="#333" stroke-width="2"/>
          <path d="M 10 30 Q 20 20 35 25 Q 50 30 50 20" stroke="#4682B4" stroke-width="2" fill="none"/>
          <circle cx="20" cy="28" r="2" fill="#FFB6C1" opacity="0.8"/>
          <circle cx="40" cy="32" r="2" fill="#FFB6C1" opacity="0.8"/>
        </svg>
      `)}`
    };
    
    return svgData[elementId] || null;
  };

  const addRoomElement = (element) => {
    console.log('🏠 Adding element:', element.name);
    
    if (!canvas) {
      console.warn('❌ Canvas not available');
      return;
    }

    // Turn off drawing mode when adding room elements
    canvas.isDrawingMode = false;
    
    // Clear the selected tool to indicate we're in selection mode
    if (onClearTool) {
      onClearTool();
    }

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    console.log(`🏠 Canvas size: ${canvas.width}x${canvas.height}, Center: (${centerX}, ${centerY})`);

    // Try to use SVG image first, fallback to shapes if not available
    const svgData = getSVGData(element.id);
    
    if (svgData) {
      // Create image element from SVG data
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        FabricImage.fromURL(svgData).then((fabricImg) => {
          fabricImg.set({
            left: centerX,
            top: centerY,
            originX: 'center',
            originY: 'center',
            scaleX: 1,
            scaleY: 1
          });
          
          console.log(`🏠 Creating SVG at center position: (${centerX}, ${centerY})`);
          
          canvas.add(fabricImg);
          canvas.setActiveObject(fabricImg);
          canvas.renderAll();
          console.log('✅ SVG element added successfully');
        }).catch(error => {
          console.warn('Failed to load SVG image, using fallback:', error);
          createFallbackShape(element, centerX, centerY);
        });
      };
      
      img.onerror = () => {
        console.warn('SVG image failed to load, using fallback');
        createFallbackShape(element, centerX, centerY);
      };
      
      img.src = svgData;
    } else {
      // Use fallback shape creation
      createFallbackShape(element, centerX, centerY);
    }
  };

  const createFallbackShape = (element, centerX, centerY) => {
    // Create simplified fallback shapes when SVG fails
    let fabricObject = new Rect({
        left: centerX,
        top: centerY,
      width: 60,
      height: 40,
      fill: element.color,
      stroke: '#333',
      strokeWidth: 2,
      rx: 5,
      ry: 5,
      originX: 'center',
      originY: 'center'
    });

    console.log(`🏠 Creating fallback at center position: (${centerX}, ${centerY})`);
    
    canvas.add(fabricObject);
    canvas.setActiveObject(fabricObject);
    canvas.renderAll();
    console.log('✅ Fallback element added successfully');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Design Tools</h3>
      </div>
      
      <div className="sidebar-tabs">
        <button 
          className={`tab-button ${activeTab === 'generic' ? 'active' : ''}`}
          onClick={() => setActiveTab('generic')}
        >
          Generic Tools
        </button>
        <button 
          className={`tab-button ${activeTab === 'room' ? 'active' : ''}`}
          onClick={() => setActiveTab('room')}
        >
          Room Elements
        </button>
      </div>

      <div className="sidebar-content">
        {activeTab === 'generic' && (
          <div className="tools-grid">
            {genericTools.map((tool) => (
              <button
                key={tool.id}
                className={`tool-button ${selectedTool === tool.id ? 'active' : ''}`}
                onClick={() => handleToolClick(tool)}
              >
                <div className={`tool-icon ${tool.icon}`}></div>
                <span className="tool-name">{tool.name}</span>
              </button>
            ))}
          </div>
        )}

        {activeTab === 'room' && roomElements[roomType] && (
          <div className="tools-grid">
            {roomElements[roomType].map((element) => (
              <button
                key={element.id}
                className="tool-button"
                onClick={() => addRoomElement(element)}
              >
                <div className={`tool-icon ${element.icon}`}></div>
                <span className="tool-name">{element.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
