import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Html, useGLTF } from "@react-three/drei";
import gsap from "gsap";

// ---------------------- Loader ----------------------
function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="w-16 h-16 border-4 border-[#f97316] border-t-transparent rounded-full animate-spin" />
        <p className="text-white text-sm font-medium">Loading 3D Experience...</p>
      </div>
    </Html>
  );
}

// ---------------------- 3D Model ----------------------
function Model({ modelX, modelY, rotation }) {
  const groupRef = useRef();
  const { scene } = useGLTF("/table_bell/scene.gltf");

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.0005) * 0.1;
    }
  });

  useEffect(() => {
    if (!groupRef.current) return;
    gsap.to(groupRef.current.position, {
      x: modelX,
      y: modelY,
      duration: 1.5,
      ease: "power3.out",
    });
    gsap.to(groupRef.current.rotation, {
      z: rotation,
      duration: 1.5,
      ease: "power2.inOut",
    });
  }, [modelX, modelY, rotation]);

  return <primitive ref={groupRef} object={scene} scale={1.2} />;
}

// ---------------------- Camera Controller ----------------------
function CameraController({ targetPosition }) {
  const [currentTarget, setCurrentTarget] = useState([0, 0, 0]);

  useFrame((state) => {
    setCurrentTarget((prev) => [
      prev[0] + (targetPosition[0] - prev[0]) * 0.1,
      prev[1] + (targetPosition[1] - prev[1]) * 0.1,
      prev[2] + (targetPosition[2] - prev[2]) * 0.1,
    ]);

    state.camera.lookAt(...currentTarget);
  });

  return null;
}

// ---------------------- Animated Content Card ----------------------
function ContentCard({ children, delay = 0, align = "left" }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const animationClass = align === "left" 
    ? "translate-x-[-100px]" 
    : "translate-x-[100px]";

  return (
    <div
      ref={cardRef}
      className={`transform transition-all duration-1000 ease-out ${
        isVisible 
          ? "opacity-100 translate-x-0" 
          : `opacity-0 ${animationClass}`
      }`}
    >
      {children}
    </div>
  );
}

// ---------------------- MAIN COMPONENT ----------------------
export  function About() {
  const [modelX, setModelX] = useState(0);
  const [modelY, setModelY] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [cameraTarget, setCameraTarget] = useState([0, 44, 44]);

  const contentSections = [
    { 
      modelX: 0, 
      modelY: 0, 
      rotation: 0, 
      camera: [0, 44, 44] 
    },
    { 
      modelX: 180, 
      modelY: 20, 
      rotation: 0.3, 
      camera: [-15, 50, 44] 
    },
    { 
      modelX: -180, 
      modelY: -20, 
      rotation: -0.3, 
      camera: [15, 40, 44] 
    },
    { 
      modelX: 160, 
      modelY: 30, 
      rotation: 0.4, 
      camera: [-12, 55, 44] 
    },
    { 
      modelX: -160, 
      modelY: -25, 
      rotation: -0.4, 
      camera: [12, 38, 44] 
    },
    { 
      modelX: 0, 
      modelY: 0, 
      rotation: 0, 
      camera: [0, 44, 44] 
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1);

      const sectionIndex = Math.floor(progress * (contentSections.length - 1));
      const sectionProgress = (progress * (contentSections.length - 1)) % 1;
      
      const current = contentSections[sectionIndex];
      const next = contentSections[Math.min(sectionIndex + 1, contentSections.length - 1)];

      // Smooth interpolation
      setModelX(current.modelX + (next.modelX - current.modelX) * sectionProgress);
      setModelY(current.modelY + (next.modelY - current.modelY) * sectionProgress);
      setRotation(current.rotation + (next.rotation - current.rotation) * sectionProgress);
      
      setCameraTarget([
        current.camera[0] + (next.camera[0] - current.camera[0]) * sectionProgress,
        current.camera[1] + (next.camera[1] - current.camera[1]) * sectionProgress,
        current.camera[2] + (next.camera[2] - current.camera[2]) * sectionProgress,
      ]);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full bg-gradient-to-b from-slate-50 to-white ">
      {/* Sticky Canvas */}
      <div className="sticky top-0 left-0 w-full h-screen pointer-events-none z-0">
        <Canvas camera={{ position: [10, 50, 130], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight intensity={1.6} position={[5, 10, 7]} color="#f97316" />
          <pointLight intensity={0.8} position={[-5, 5, 5]} color="#fb923c" />

          <Suspense fallback={<Loader />}>
            <Model modelX={modelX} modelY={modelY} rotation={rotation} />
            <Environment preset="lobby" />
          </Suspense>

          <CameraController targetPosition={cameraTarget} />

          <OrbitControls
            enablePan={false}
            enableZoom={false}
            minDistance={180}
            maxDistance={180}
            target={cameraTarget}
          />
        </Canvas>
      </div>

      {/* Scrollable Content */}
      <div className="relative z-10 pointer-events-auto -mt-[100vh]">

        {/* HERO SECTION */}
        <div className="min-h-screen flex items-center justify-center p-8">
          <ContentCard align="center">
            <div className="max-w-4xl text-center">
              <div className="inline-block mb-6 px-6 py-2 bg-[#f97316]/10 rounded-full">
                <span className="text-[#f97316] font-semibold text-sm tracking-wider">
                  WELCOME TO THE FUTURE OF FOOD DELIVERY
                </span>
              </div>
              
              <h1 className="text-7xl font-black mb-6 bg-gradient-to-r from-[#f97316] to-[#fb923c] bg-clip-text text-transparent">
                Repas Joy
              </h1>
              
              <div className="h-2 w-32 mx-auto bg-gradient-to-r from-[#f97316] to-[#fb923c] rounded-full mb-8" />
              
              <p className="text-2xl text-gray-600 mb-8 leading-relaxed">
                Experience culinary excellence delivered to your doorstep with speed, 
                care, and a commitment to quality that sets us apart.
              </p>

              <div className="flex gap-4 justify-center">
                <button className="px-8 py-4 bg-[#f97316] text-white font-bold rounded-xl hover:bg-[#ea580c] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Order Now
                </button>
                <button className="px-8 py-4 bg-white text-[#f97316] font-bold rounded-xl border-2 border-[#f97316] hover:bg-[#f97316] hover:text-white transition-all duration-300 transform hover:scale-105">
                  Learn More
                </button>
              </div>
            </div>
          </ContentCard>
        </div>

        {/* SECTION 1 */}
        <div className="min-h-screen flex items-center justify-start p-8">
          <ContentCard align="left">
            <div className="max-w-3xl bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-[#f97316]/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#f97316] to-[#fb923c] rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl">🍔</span>
                </div>
                <h2 className="text-4xl font-bold text-gray-800">
                  Lightning-Fast Delivery
                </h2>
              </div>
              
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                Order from hundreds of your favorite restaurants and get your meal delivered 
                in record time. Our advanced logistics system ensures your food arrives hot, 
                fresh, and perfectly packaged every single time.
              </p>

              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="text-center p-4 bg-[#f97316]/5 rounded-xl">
                  <div className="text-3xl font-bold text-[#f97316]">15min</div>
                  <div className="text-sm text-gray-600 mt-1">Avg Delivery</div>
                </div>
                <div className="text-center p-4 bg-[#f97316]/5 rounded-xl">
                  <div className="text-3xl font-bold text-[#f97316]">500+</div>
                  <div className="text-sm text-gray-600 mt-1">Restaurants</div>
                </div>
                <div className="text-center p-4 bg-[#f97316]/5 rounded-xl">
                  <div className="text-3xl font-bold text-[#f97316]">24/7</div>
                  <div className="text-sm text-gray-600 mt-1">Available</div>
                </div>
              </div>
            </div>
          </ContentCard>
        </div>

        {/* SECTION 2 */}
        <div className="min-h-screen flex items-center justify-end p-8">
          <ContentCard align="right" delay={200}>
            <div className="max-w-3xl bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-[#f97316]/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#f97316] to-[#fb923c] rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl">🥗</span>
                </div>
                <h2 className="text-4xl font-bold text-gray-800">
                  Fresh & Quality Ingredients
                </h2>
              </div>
              
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                We partner only with restaurants that share our commitment to excellence. 
                Every ingredient is sourced with care, every dish prepared with passion, 
                and every meal delivered with pride. Taste the difference quality makes.
              </p>

              <div className="space-y-3 mt-8">
                {[
                  "Farm-to-table freshness guaranteed",
                  "Strict quality control measures",
                  "Locally sourced ingredients",
                  "Eco-friendly packaging"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-[#f97316]/5 rounded-xl">
                    <div className="w-6 h-6 bg-[#f97316] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </ContentCard>
        </div>

        {/* SECTION 3 */}
        <div className="min-h-screen flex items-center justify-start p-8">
          <ContentCard align="left" delay={100}>
            <div className="max-w-3xl bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-[#f97316]/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#f97316] to-[#fb923c] rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl">📱</span>
                </div>
                <h2 className="text-4xl font-bold text-gray-800">
                  Seamless Ordering Experience
                </h2>
              </div>
              
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                Our intuitive app and website make ordering a breeze. Browse menus, 
                customize your order, track delivery in real-time, and enjoy exclusive 
                rewards. Food delivery has never been this easy or rewarding.
              </p>

              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="p-6 bg-gradient-to-br from-[#f97316]/10 to-[#fb923c]/10 rounded-2xl">
                  <div className="text-4xl mb-3">💳</div>
                  <h3 className="font-bold text-lg mb-2">Secure Payment</h3>
                  <p className="text-sm text-gray-600">Multiple payment options with bank-level security</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-[#f97316]/10 to-[#fb923c]/10 rounded-2xl">
                  <div className="text-4xl mb-3">🎁</div>
                  <h3 className="font-bold text-lg mb-2">Loyalty Rewards</h3>
                  <p className="text-sm text-gray-600">Earn points with every order and get exclusive deals</p>
                </div>
              </div>
            </div>
          </ContentCard>
        </div>

        {/* SECTION 4 */}
        <div className="min-h-screen flex items-center justify-end p-8">
          <ContentCard align="right" delay={150}>
            <div className="max-w-3xl bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-[#f97316]/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#f97316] to-[#fb923c] rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl">⭐</span>
                </div>
                <h2 className="text-4xl font-bold text-gray-800">
                  Customer Satisfaction First
                </h2>
              </div>
              
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                Your happiness is our priority. With 24/7 customer support, easy refunds, 
                and a commitment to excellence, we're here to ensure every order exceeds 
                your expectations. Join thousands of satisfied customers today.
              </p>

              <div className="bg-gradient-to-r from-[#f97316]/10 to-[#fb923c]/10 p-8 rounded-2xl mt-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-5xl font-black text-[#f97316]">4.9/5</span>
                  <div className="text-right">
                    <div className="text-yellow-400 text-2xl">★★★★★</div>
                    <p className="text-sm text-gray-600 mt-1">50,000+ Reviews</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Repas Joy has transformed the way I enjoy food. Fast, fresh, and always delicious!"
                </p>
                <p className="text-sm text-gray-500 mt-2">- Sarah M., Verified Customer</p>
              </div>
            </div>
          </ContentCard>
        </div>

        {/* FINAL CTA SECTION */}
        <div className="min-h-screen flex items-center justify-center p-8">
          <ContentCard align="center" delay={100}>
            <div className="max-w-4xl text-center bg-gradient-to-br from-[#f97316] to-[#fb923c] rounded-3xl shadow-2xl p-16 text-white">
              <h2 className="text-5xl font-black mb-6">
                Ready to Experience the Joy?
              </h2>
              
              <p className="text-2xl mb-10 opacity-90">
                Join thousands of happy customers and discover why Repas Joy 
                is the #1 choice for food delivery.
              </p>

              <button className="px-12 py-5 bg-white text-[#f97316] font-bold text-xl rounded-2xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 shadow-2xl">
                Start Your First Order
              </button>

              <div className="mt-12 flex gap-8 justify-center text-sm opacity-75">
                <div>✓ No minimum order</div>
                <div>✓ Free delivery on first order</div>
                <div>✓ Cancel anytime</div>
              </div>
            </div>
          </ContentCard>
        </div>

      </div>
    </div>
  );
}