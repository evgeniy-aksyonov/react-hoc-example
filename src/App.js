import { useState, useEffect } from 'react';
import './App.css';

const withMousePosition = (WrappedComponent) => {
  return (props) => {
    const [mousePosition, setMousePosition] = useState({
      x: 0,
      y: 0,
    });

    useEffect(() => {
      const handleMousePositionChange = (e) => {
        setMousePosition({
          x: e.clientX,
          y: e.clientY,
        });
      };

      window.addEventListener('mousemove', handleMousePositionChange);

      return () => {
        window.removeEventListener('mousemove', handleMousePositionChange);
      };
    }, []);

    return <WrappedComponent {...props} mousePosition={mousePosition} />;
  };
};

const PanelMouseLogger = ({mousePosition}) => {
  if (!mousePosition) {
    return null;
  }

  return (
    <div className='panel'>
      <h2>Comp 1</h2>
      <div className='row'>
        <span>x: {mousePosition.x} </span>
        <span>y: {mousePosition.y}</span>
      </div>
    </div>
  );
}

const PointMouseLogger = ({mousePosition}) => {
  if (!mousePosition) {
    return null;
  }

  return (
    <div className='point'>
      <h2>Comp 2</h2>
      <h4>({mousePosition.x}, {mousePosition.y})</h4>
    </div>
  )
}

const PanelMouseTracker = withMousePosition(PanelMouseLogger)
const PointMouseTracker = withMousePosition(PointMouseLogger)

function App() {
  return (
    <div className='container'>
      <h1>HOC usage example:</h1>
      <PanelMouseTracker />
      <PointMouseTracker />
    </div>
  );
}

export default App;
