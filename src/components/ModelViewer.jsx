import React, { useRef, useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import { gsap } from 'gsap';
import Model from '../../public/models/ocean/Scene';
import NavBar from './NavBar';
import Card from './Cards';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);


import image1 from '../../public/images/1.webp';
import image2 from '../../public/images/2.webp';
import image3 from '../../public/images/3.webp';
import image4 from '../../public/images/4.webp';
import Arrow from '../../public/models/arrow/Scene';

const ModelViewer = () => {
  const cardRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const canvasRef = useRef(null);

  const cardData = [
    {
      title: 'Anime 1',
      description:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime harum fugit, explicabo eveniet enim doloribus tempora architecto reiciendis vel, necessitatibus quis nihil ad dolorum. Hic, explicabo? Numquam nulla obcaecati praesentium',
      image: image1,
    },
    {
      title: 'Anime 2',
      description:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime harum fugit, explicabo eveniet enim doloribus tempora architecto reiciendis vel, necessitatibus quis nihil ad dolorum. Hic, explicabo? Numquam nulla obcaecati praesentium',
      image: image2,
    },
    {
      title: 'Anime 3',
      description:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime harum fugit, explicabo eveniet enim doloribus tempora architecto reiciendis vel, necessitatibus quis nihil ad dolorum. Hic, explicabo? Numquam nulla obcaecati praesentium',
      image: image3,
    },
    {
      title: 'Anime 4',
      description:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime harum fugit, explicabo eveniet enim doloribus tempora architecto reiciendis vel, necessitatibus quis nihil ad dolorum. Hic, explicabo? Numquam nulla obcaecati praesentium',
      image: image4,
    },
  ];

  useEffect(() => {
    gsap.to(cardRefs.current[0], { opacity: 1, zIndex: 2, x: 0, duration: 1.5 });
  }, []);

  const handleCardClick = (index) => {
    if (showDetails) {
      handleNextCard();
    } else {
      setShowDetails(true);
    }
  };

  const handleNextCard = () => {
    setShowDetails(false);
    const nextIndex = (currentIndex + 1) % cardData.length;

    gsap.to(cardRefs.current[currentIndex], { zIndex: 1, x: -200, opacity: 0, duration: 1 });
    gsap.fromTo(
      cardRefs.current[nextIndex],
      { zIndex: 0, x: 200, opacity: 0 },
      { zIndex: 2, x: 0, opacity: 1, duration: 1 }
    );

    setCurrentIndex(nextIndex);
  };

  const handlePreviousCard = () => {
    setShowDetails(false);
    const prevIndex = (currentIndex - 1 + cardData.length) % cardData.length;

    gsap.to(cardRefs.current[currentIndex], { zIndex: 1, x: 200, opacity: 0, duration: 1 });
    gsap.fromTo(
      cardRefs.current[prevIndex],
      { zIndex: 0, x: -200, opacity: 0 },
      { zIndex: 2, x: 0, opacity: 1, duration: 1 }
    );

    setCurrentIndex(prevIndex);
  };

  const handlePointerOver = () => {
    if (canvasRef.current) {
      canvasRef.current.classList.add('pointer-cursor');
    }
  };

  const handlePointerOut = () => {
    if (canvasRef.current) {
      canvasRef.current.classList.remove('pointer-cursor');
    }
  };

  const cards = cardData.map((data, index) => (
    <Card
      key={index}
      title={data.title}
      description={data.description}
      image={data.image}
      onClick={() => handleCardClick(index)}
      ref={(el) => (cardRefs.current[index] = el)}
      className={currentIndex === index ? 'card card-active' : 'card'}
      showDetails={currentIndex === index && showDetails}
    />
  ));

  return (
    <div className="canvas-container" ref={canvasRef}>
      <NavBar />

      <div className="card-container">{cards}</div>

      <Canvas style={{ width: '100%', height: '100%' }}>
        <ambientLight intensity={0.5} />
        <directionalLight intensity={0.8} position={[5, 5, 5]} />
        <directionalLight intensity={0.3} position={[-5, -5, -5]} />

        <Suspense fallback={null}>
          <Arrow
            scale={[3, 3, 3]}
            position={[1, 1, -5]}
            rotation={[0, 2, 0]}
            onClick={handlePreviousCard}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
          />
          <Arrow
            scale={[3, 3, 3]}
            position={[1, 1, 5]}
            rotation={[0, -2, 0]}
            onClick={handleNextCard}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
          />
          <Model />
          <Environment preset="sunset" background />
        </Suspense>

        <PerspectiveCamera
          makeDefault
          position={[-10, 1.975, 2]}
          fov={100}
          far={1000}
          rotation={[0, -Math.PI / 2, 0]}
        />
      </Canvas>
    </div>
  );
};

export default ModelViewer;
