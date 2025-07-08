# 🛁 Bathroom Planner 3D

[![React](https://img.shields.io/badge/React-18.0+-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-r128-000000?style=flat-square&logo=three.js)](https://threejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

A modern, interactive 3D bathroom planning application built with React and Three.js. Design and visualize your bathroom layout with realistic fixtures, customizable textures, and intuitive controls.

![Bathroom Planner Demo](https://via.placeholder.com/800x400/f0f0f0/333333?text=Bathroom+Planner+3D+Demo)

## ✨ Features

### 🚿 Bathroom Fixtures
- **Toilet** - Realistic toilet with base, tank, and seat
- **Sink** - Pedestal sink with faucet
- **Bath** - Bathtub with inner cavity
- **Shower** - Corner shower with transparent walls and showerhead
- **Radiator** - Wall-mounted radiator with fins
- **Mirror** - Framed mirror for walls

### 🏠 Room Environment
- Complete bathroom room with 4 walls (10x10 units)
- 3-unit high walls for realistic proportions
- Textured floor with multiple material options
- Customizable wall textures and colors
- Proper lighting with ambient and directional lights

### 🎨 Texture & Material System

**Floor Options:**
- White Tile
- Gray Tile
- Marble
- Dark Tile
- Wood

**Wall Options:**
- White Paint
- Light Blue Paint
- Beige Paint
- White Tile
- Blue Tile
- Green Tile

All textures include procedural patterns (tile grids, etc.) for realistic appearance.

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
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production
```bash
npm run build
# or
yarn build
```

## 🎮 Usage Guide

### Basic Controls

| Action | Control | Description |
|--------|---------|-------------|
| Add Item | Toolbar Buttons | Click any fixture button to add to scene |
| Move Object | Left Click + Drag | Move objects horizontally around the room |
| Rotate Object | Right Click + Drag | Rotate objects around their center point |
| Adjust Height | Ctrl + Click + Drag | Move objects up/down (mirrors, wall items) |
| Camera Rotate | Left Click + Drag (empty) | Rotate camera view around the scene |
| Zoom | Mouse Wheel | Zoom in/out of the scene |
| Change Textures | Texture Panel | Click color swatches to change materials |

### 📖 Step-by-Step Instructions

#### 1. Adding Items
- Click any button in the top toolbar to add bathroom fixtures
- Items are placed randomly in the room center
- Each item type has realistic proportions and styling

#### 2. Positioning Objects
- **Left-click and drag** objects to move them around
- Objects automatically **snap to walls** when dragged nearby
- **Boundary constraints** prevent objects from leaving the room

#### 3. Rotating Objects
- **Right-click and drag** to rotate objects for proper wall alignment
- Essential for orienting toilets, sinks, and baths correctly
- Smooth rotation based on mouse movement

#### 4. Height Adjustment
- **Hold Ctrl and drag** to move items up/down
- Perfect for wall-mounted items like mirrors above sinks
- Different height limits for different object types

### 🏆 Pro Tips

#### Creating a Perfect Sink & Mirror Setup
1. Add a **Sink** and drag it close to a wall - it will snap automatically
2. Add a **Mirror** - it starts at wall height (1.2 units)
3. Position the mirror above the sink by dragging
4. Use **Ctrl + drag** to fine-tune the mirror height

#### Realistic Bathroom Layouts
- **Radiators**: Mount on walls at proper height
- **Mirrors**: Perfect for above sinks or feature walls
- **Showers**: Position in corners for realistic layouts
- **Toilets**: Place with proper clearance from walls

#### Customizing Appearance
1. Click **"Show Textures"** to open the texture panel
2. Select **floor textures** by clicking color swatches
3. Choose **wall textures** to match your design vision
4. Mix and match different combinations for unique looks

## 🔧 Technical Details

### Built With
- **React 18+** - UI framework
- **Three.js r128** - 3D graphics library
- **Canvas API** - Procedural texture generation
- **Modern JavaScript** - ES6+ features

### Browser Support
- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Any modern browser with WebGL support

### Performance
- Optimized for smooth 60fps interaction
- Efficient 3D rendering with proper lighting
- Responsive design that adapts to window size

## 📐 Object Specifications

### Dimensions (approximate)
- **Toilet**: 0.6 × 0.8 × 1.0 units
- **Sink**: 0.6 × 0.6 × 1.0 units (with pedestal)
- **Bath**: 1.7 × 0.8 × 0.6 units
- **Shower**: 0.8 × 0.8 × 2.0 units
- **Radiator**: 0.8 × 0.6 × 0.1 units
- **Mirror**: 0.8 × 1.0 × 0.05 units

### Height Constraints
- **Floor Items**: 0 to 1.5 units
- **Wall Items (Mirrors)**: 0 to 2.5 units
- **Default Mirror Height**: 1.2 units (perfect for above sinks)

### Smart Features
- **Wall Snapping**: Objects automatically snap when within 0.3 units of walls
- **Boundary Constraints**: Objects cannot be moved outside the room
- **Visual Feedback**: Selected objects glow with highlight effect

## 🗂️ Project Structure

```
bathroom-planner-3d/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Application styles
│   ├── main.jsx         # React entry point
│   └── ...
├── package.json
├── README.md
└── ...
```

## 🚧 Roadmap

### 🎯 Next Features
- [ ] Door and window openings
- [ ] Bathroom accessories (towel racks, toilet paper holders)
- [ ] Save/load bathroom layouts
- [ ] Export to common 3D formats
- [ ] Measurement tools and dimensions
- [ ] Snap to grid functionality
- [ ] Undo/redo operations

### 🔮 Advanced Features
- [ ] Real-time lighting simulation
- [ ] Shadow casting and receiving
- [ ] Material reflections and refractions
- [ ] Animated water effects
- [ ] Virtual reality support
- [ ] Mobile touch controls

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
- Follow React best practices
- Write descriptive commit messages
- Add comments for complex 3D calculations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Three.js](https://threejs.org/) for the amazing 3D graphics library
- [React](https://reactjs.org/) for the robust UI framework
- The open-source community for inspiration and tools

## 📞 Support

If you have any questions or need help with the bathroom planner:

- 🐛 **Bug Reports**: [Open an issue](https://github.com/yourusername/bathroom-planner-3d/issues)
- 💡 **Feature Requests**: [Request a feature](https://github.com/yourusername/bathroom-planner-3d/issues)
- 📧 **General Questions**: [Discussions](https://github.com/yourusername/bathroom-planner-3d/discussions)

---

**Happy Bathroom Planning!** 🛁✨

Create your perfect bathroom layout with realistic 3D visualization and professional-grade planning tools.
