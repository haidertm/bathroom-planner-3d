# 🛁 Bathroom Planner 3D

[![React](https://img.shields.io/badge/React-18.0+-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-r128-000000?style=flat-square&logo=three.js)](https://threejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

A modern, interactive 3D bathroom planning application built with React and Three.js. Design and visualize your bathroom layout with realistic fixtures, customizable textures, dynamic room sizing, and intuitive controls for both desktop and mobile devices.

![Bathroom Planner Demo](https://via.placeholder.com/800x400/f0f0f0/333333?text=Bathroom+Planner+3D+Demo)

## ✨ Features

### 🚿 Bathroom Fixtures
- **Toilet** - Realistic toilet with base, tank, and seat
- **Sink** - Pedestal sink with faucet
- **Bath** - Bathtub with inner cavity
- **Shower** - Corner shower with transparent walls and showerhead
- **Radiator** - Wall-mounted radiator with fins
- **Mirror** - Framed mirror for walls

### 🏠 Dynamic Room Environment
- **Variable Room Sizes** - Adjustable from 6m×6m to 20m×20m
- **3-meter High Walls** - Realistic proportions with proper lighting
- **Real-time Room Updates** - Walls and floor update instantly with size changes
- **Smart Object Constraints** - Objects automatically stay within room boundaries
- **Optional Grid System** - Toggle grid overlay for precise placement

### 🎨 Advanced Texture & Material System

**Floor Options:**
- White Tile
- Gray Tile (with texture file support)
- Marble
- Dark Tile
- Wood
- Red Terracotta (with texture file support)
- Stone

**Wall Options:**
- Metro White Tile (with texture file support)
- White Paint
- Light Blue Paint
- Beige Paint
- White Tile
- Blue Tile
- Green Tile
- Brick (with texture file support)
- Subway Tile

All textures support both file-based textures and procedural colors with intelligent fallback systems.

### 🎮 Advanced Interaction System
- **Multi-Modal Controls** - Mouse, keyboard, and touch support
- **Object Manipulation** - Drag, rotate, scale, and height adjustment
- **Wall Snapping** - Automatic positioning near walls
- **Visual Feedback** - Object highlighting and cursor changes
- **Camera Controls** - Orbit, zoom, and pan around the scene

### 📱 Mobile & Desktop Support
- **Responsive Design** - Adapts to all screen sizes
- **Touch Controls** - Full mobile touch interaction
- **Gesture Support** - Pinch-to-zoom and two-finger rotation
- **Mobile-Optimized UI** - Collapsible panels and touch-friendly buttons

### 🔄 Professional Features
- **Undo/Redo System** - 50-state history with full scene restoration
- **Save States** - Complete room configurations preserved
- **Object Constraints** - Professional placement boundaries
- **Performance Optimized** - Smooth 60fps rendering

## 🚀 Getting Started

### Prerequisites
- Node.js 16.0 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/bathroom-planner-3d.git
   cd bathroom-planner-3d
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
# or
yarn build
```

## 🎮 Usage Guide

### Desktop Controls

| Action | Control | Description |
|--------|---------|-------------|
| Add Item | Toolbar Buttons | Click any fixture button to add to scene |
| Move Object | Left Click + Drag | Move objects horizontally around the room |
| Rotate Object | Right Click + Drag | Rotate objects around their center point |
| Adjust Height | Ctrl + Click + Drag | Move objects up/down (mirrors, wall items) |
| Scale Object | Alt + Click + Drag | Resize objects (0.2x to 3.0x) |
| Camera Rotate | Left Click + Drag (empty) | Rotate camera view around the scene |
| Zoom | Mouse Wheel | Zoom in/out of the scene |
| Change Textures | Texture Panel | Click color swatches to change materials |
| Room Size | Right Panel | Adjust room dimensions with sliders |
| Undo/Redo | Right Panel | Navigate through action history |

### Mobile Controls

| Action | Control | Description |
|--------|---------|-------------|
| Add Item | Hamburger Menu | Tap menu button, then fixture buttons |
| Move Object | Touch + Drag | Move objects around the room |
| Camera Rotate | Touch + Drag (empty) | Rotate camera view |
| Zoom | Pinch Gesture | Two-finger pinch to zoom |
| Access Panels | Tap Panel Headers | Expandable panels for all controls |

### 📖 Step-by-Step Instructions

#### 1. Setting Up Your Room
- Use the **Room Size Panel** (top right) to set your bathroom dimensions
- Toggle the **grid overlay** for precise placement
- Select **floor and wall textures** from the texture panel (top left)

#### 2. Adding and Positioning Items
- **Desktop**: Click toolbar buttons to add fixtures
- **Mobile**: Tap the hamburger menu (☰) and select fixtures
- **Drag objects** to position them in your room
- Objects **automatically snap to walls** when dragged nearby
- Use **boundary constraints** to keep objects within the room

#### 3. Advanced Object Manipulation
- **Rotate**: Right-click and drag (desktop) for perfect wall alignment
- **Height**: Hold Ctrl and drag to move items up/down
- **Scale**: Hold Alt and drag to resize objects (0.2x to 3.0x)
- **Precision**: Use the grid overlay for exact placement

#### 4. Professional Features
- **Undo/Redo**: Use the buttons (bottom right) to navigate through changes
- **Fix Objects**: Click "Fix Objects in Room" to constrain all items to current room size
- **Save States**: Your entire room configuration is preserved in history

### 🏆 Pro Tips

#### Creating a Perfect Sink & Mirror Setup
1. Add a **Sink** and drag it close to a wall - it will snap automatically
2. Add a **Mirror** - it starts at wall height (1.2 units)
3. Position the mirror above the sink by dragging
4. Use **Ctrl + drag** to fine-tune the mirror height
5. Use **Alt + drag** to resize the mirror to your preference

#### Realistic Bathroom Layouts
- **Radiators**: Mount on walls at proper height using Ctrl+drag
- **Mirrors**: Perfect for above sinks or feature walls
- **Showers**: Position in corners for realistic layouts
- **Toilets**: Place with proper clearance from walls

#### Room Design Workflow
1. **Plan your space**: Set room dimensions first
2. **Choose materials**: Select floor and wall textures
3. **Add major fixtures**: Start with bath/shower, then toilet and sink
4. **Add accessories**: Radiators, mirrors, and other items
5. **Fine-tune**: Use undo/redo to perfect your design

## 🔧 Technical Details

### Built With
- **React 18+** - Modern UI framework with hooks
- **Three.js r128** - Advanced 3D graphics library
- **Modular Architecture** - Clean, maintainable code structure
- **ES6+ JavaScript** - Modern language features

### Browser Support
- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Any modern browser with WebGL support
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Performance
- Optimized for smooth 60fps interaction
- Efficient 3D rendering with proper lighting
- Responsive design that adapts to any screen size
- Intelligent texture caching and management

## 📐 Object Specifications

### Dimensions (approximate meters)
- **Toilet**: 0.6 × 0.8 × 1.0m
- **Sink**: 0.6 × 0.6 × 1.0m (with pedestal)
- **Bath**: 1.7 × 0.8 × 0.6m
- **Shower**: 0.8 × 0.8 × 2.0m
- **Radiator**: 0.8 × 0.6 × 0.1m
- **Mirror**: 0.8 × 1.0 × 0.05m

### Height Constraints
- **Floor Items**: 0 to 1.5m
- **Wall Items (Mirrors)**: 0 to 2.5m
- **Default Mirror Height**: 1.2m (perfect for above sinks)

### Scale Limits
- **Minimum Scale**: 0.2x (20% of original size)
- **Maximum Scale**: 3.0x (300% of original size)
- **Default Scale**: 1.0x (original size)

### Smart Features
- **Wall Snapping**: Objects snap when within 0.3m of walls
- **Boundary Constraints**: Objects cannot leave the room
- **Visual Feedback**: Selected objects glow with highlight effect
- **Intelligent Constraints**: Objects stay within room bounds during size changes

## 🗂️ Project Structure

```
bathroom-planner-3d/
├── public/
│   ├── textures/                    # Texture image files
│   │   ├── floor_grey_tile.avif
│   │   ├── floor_red_terracotta.jpg
│   │   ├── wall_metro_white_tile.png
│   │   └── wall_brick.jpg
│   └── index.html
├── src/
│   ├── components/
│   │   └── ui/                      # UI Components
│   │       ├── Toolbar.jsx          # Add items toolbar
│   │       ├── TexturePanel.jsx     # Texture selection
│   │       ├── RoomSizePanel.jsx    # Room size controls
│   │       └── UndoRedoPanel.jsx    # Undo/redo buttons
│   ├── constants/                   # Configuration Files
│   │   ├── components.js            # Component definitions
│   │   ├── textures.js              # Texture configurations
│   │   └── dimensions.js            # Room and object limits
│   ├── hooks/                       # Custom React Hooks
│   │   └── useUndoRedo.js          # Undo/redo functionality
│   ├── models/                      # 3D Models
│   │   ├── bathroomFixtures.js      # Bathroom item models
│   │   └── roomGeometry.js          # Room geometry creation
│   ├── services/                    # Business Logic
│   │   ├── sceneManager.js          # Three.js scene management
│   │   ├── eventHandlers.js         # Mouse/touch event handling
│   │   └── textureManager.js        # Texture loading/caching
│   ├── utils/                       # Utility Functions
│   │   ├── constraints.js           # Object positioning logic
│   │   └── helpers.js               # Common utility functions
│   ├── App.jsx                      # Main application
│   ├── App.css                      # Application styles
│   └── main.jsx                     # React entry point
├── package.json
├── README.md
└── vite.config.js
```

## 🚧 Roadmap

### 🎯 Next Features
- [ ] Door and window openings
- [ ] More bathroom accessories (towel racks, toilet paper holders)
- [ ] Export to common 3D formats (OBJ, STL)
- [ ] Measurement tools and dimensions display
- [ ] Custom texture upload
- [ ] Room templates and presets

### 🔮 Advanced Features
- [ ] Real-time lighting simulation
- [ ] Shadow casting and receiving
- [ ] Material reflections and refractions
- [ ] Animated water effects
- [ ] Virtual reality support
- [ ] Collaborative editing

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style
- Use ESLint and Prettier for consistent formatting
- Follow React best practices and hooks patterns
- Maintain modular architecture principles
- Write descriptive commit messages
- Add comments for complex 3D calculations
- Keep components focused and reusable

### Adding New Features
- **New Fixtures**: Add models to `models/bathroomFixtures.js`
- **UI Components**: Create in `components/ui/`
- **Configuration**: Update relevant files in `constants/`
- **Business Logic**: Add services to `services/`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Three.js](https://threejs.org/) for the amazing 3D graphics library
- [React](https://reactjs.org/) for the robust UI framework
- [Vite](https://vitejs.dev/) for fast development and building
- The open-source community for inspiration and tools

## 📞 Support

If you have any questions or need help with the bathroom planner:

- 🐛 **Bug Reports**: [Open an issue](https://github.com/yourusername/bathroom-planner-3d/issues)
- 💡 **Feature Requests**: [Request a feature](https://github.com/yourusername/bathroom-planner-3d/issues)
- 📧 **General Questions**: [Discussions](https://github.com/yourusername/bathroom-planner-3d/discussions)

## 🔍 Troubleshooting

### Common Issues
- **Objects not moving**: Make sure to click and drag from the object itself, not empty space
- **Textures not loading**: Check that texture files are in the `public/textures/` directory
- **Mobile controls not working**: Try refreshing the page or checking for JavaScript errors
- **Performance issues**: Reduce room size or limit the number of objects in the scene

### System Requirements
- **RAM**: 4GB minimum, 8GB recommended
- **GPU**: Any modern GPU with WebGL support
- **Browser**: Latest version of Chrome, Firefox, Safari, or Edge

---

**Happy Bathroom Planning!** 🛁✨✨✨✨✨✨

Create your perfect bathroom layout with realistic 3D visualization, professional-grade planning tools, and modern responsive design for any device.
