# Home Decor Customizer

A comprehensive React.js application for designing and customizing home interior spaces. This project allows users to create beautiful room layouts using an intuitive drag-and-drop canvas interface.

![Home Decor Customizer](https://img.shields.io/badge/React-18.x-blue) ![License](https://img.shields.io/badge/License-MIT-green)

## 🏠 Features

### Landing Page
- **Room Selection**: Choose from Hall, Kitchen, Dining Area, or Bedroom
- **Beautiful UI**: Modern, responsive design with smooth animations
- **Easy Navigation**: One-click access to the design editor

### Design Editor
- **Canvas-Based Interface**: Powered by Fabric.js for smooth interactions
- **Dual Sidebar System**:
  - **Generic Tools Tab**: Pencil, Eraser, Basic Shapes (Rectangle, Circle, Line)
  - **Room-Specific Elements Tab**: Contextual furniture and appliances
- **Interactive Elements**: Drag, resize, rotate, and delete objects
- **Advanced Features**:
  - Undo/Redo functionality
  - Copy/Paste with keyboard shortcuts (Ctrl+C/Ctrl+V)
  - Clear canvas option
  - Save designs as PNG images

### Room-Specific Elements

#### 🛋️ Hall
- Sofa, TV, Coffee Table, Curtains, Floor Lamp, Plants

#### 🍳 Kitchen
- Stove, Refrigerator, Sink, Counter, Cabinet, Microwave

#### 🍽️ Dining Area
- Dining Table, Chairs, Chandelier, Buffet, Wine Rack, Dining Rug

#### 🛏️ Bedroom
- Bed, Nightstand, Dresser, Wardrobe, Ceiling Fan, Mirror

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/home-decor-customizer.git
   cd home-decor-customizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

## 🛠️ Tech Stack

- **Frontend Framework**: React.js 18.x
- **Canvas Library**: Fabric.js
- **Routing**: React Router DOM
- **Styling**: Custom CSS with responsive design
- **Icons**: Unicode emojis and Lucide React
- **Build Tool**: Create React App

## 📁 Project Structure

```
src/
├── components/
│   ├── CanvasComponent.js    # Main canvas wrapper with keyboard shortcuts
│   ├── Sidebar.js            # Tool sidebar with tabs
│   └── Toolbar.js            # Action toolbar (optional component)
├── pages/
│   ├── LandingPage.js        # Room selection page
│   └── EditorPage.js         # Main design editor
├── utils/                    # Utility functions (future use)
├── assets/                   # Static assets and icons
└── App.js                    # Main app with routing
```

## 🎨 Usage Guide

### Basic Navigation
1. **Start**: Select a room type from the landing page
2. **Design**: Use the sidebar tools to add elements to your canvas
3. **Customize**: Move, resize, and arrange elements as desired
4. **Save**: Export your design as a PNG image

### Canvas Controls
- **Move Objects**: Click and drag any element
- **Resize Objects**: Use corner handles when object is selected
- **Delete Objects**: Select object and press Delete/Backspace
- **Copy/Paste**: Ctrl+C to copy, Ctrl+V to paste
- **Undo/Redo**: Use toolbar buttons or keyboard shortcuts

### Drawing Tools
- **Pencil**: Free drawing with customizable brush
- **Eraser**: Remove drawn lines and paths
- **Shapes**: Add basic geometric shapes

## 🔧 Customization

### Adding New Room Types
1. Update `roomElements` in `Sidebar.js`
2. Add room name mapping in `EditorPage.js`
3. Create room card in `LandingPage.js`

### Adding New Elements
1. Define element properties in the room's array in `Sidebar.js`
2. Add shape creation logic in the `addRoomElement` function
3. Customize colors, sizes, and shapes as needed

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop**: Full feature set with optimized layout
- **Tablet**: Adapted sidebar and canvas sizing
- **Mobile**: Stacked layout with touch-friendly controls

## 🐛 Troubleshooting

### Common Issues

1. **Canvas not loading**
   - Check browser console for errors
   - Ensure Fabric.js is properly imported

2. **Elements not draggable**
   - Verify canvas is properly initialized
   - Check for JavaScript errors

3. **Save function not working**
   - Ensure canvas has content
   - Check browser download permissions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Fabric.js** for the powerful canvas library
- **React Team** for the amazing framework
- **Create React App** for the build configuration
- **Unicode Consortium** for emoji icons

## 🚀 Future Enhancements

- [ ] Color picker for elements
- [ ] Layer management system
- [ ] Template library
- [ ] Real-time collaboration
- [ ] 3D preview mode
- [ ] Material and texture options
- [ ] Measurement tools
- [ ] Print layout support

## 📞 Support

For support, email your-email@example.com or create an issue on GitHub.

---

**Made with ❤️ for interior design enthusiasts**