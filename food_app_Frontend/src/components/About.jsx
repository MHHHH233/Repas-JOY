import React, { useEffect, useRef, useState } from "react";

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
    : align === "right"
    ? "translate-x-[100px]"
    : "translate-y-[50px]";

  return (
    <div
      ref={cardRef}
      className={`transform transition-all duration-1000 ease-out ${
        isVisible 
          ? "opacity-100 translate-x-0 translate-y-0" 
          : `opacity-0 ${animationClass}`
      }`}
    >
      {children}
    </div>
  );
}

// ---------------------- Floating Animation Component ----------------------
function FloatingElement({ children, className = "", delay = 0 }) {
  return (
    <div 
      className={`animate-bounce ${className}`}
      style={{ 
        animationDelay: `${delay}ms`,
        animationDuration: '3s'
      }}
    >
      {children}
    </div>
  );
}

// ---------------------- MAIN COMPONENT ----------------------
export function About() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full bg-gradient-to-b from-orange-50 via-white to-orange-50 overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div 
          className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        />
        <div 
          className="absolute top-40 right-10 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        />
        <div 
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          style={{ transform: `translateY(${-scrollY * 0.1}px)` }}
        />
      </div>

      {/* Floating Food Emojis */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <FloatingElement className="absolute top-32 left-[10%] text-6xl opacity-20" delay={0}>🍔</FloatingElement>
        <FloatingElement className="absolute top-48 right-[15%] text-5xl opacity-20" delay={500}>🍕</FloatingElement>
        <FloatingElement className="absolute top-[60%] left-[5%] text-4xl opacity-20" delay={1000}>🍜</FloatingElement>
        <FloatingElement className="absolute top-[40%] right-[8%] text-5xl opacity-20" delay={1500}>🥗</FloatingElement>
        <FloatingElement className="absolute top-[80%] right-[20%] text-6xl opacity-20" delay={2000}>🍰</FloatingElement>
      </div>

      {/* Content */}
      <div className="relative z-10">

        {/* HERO SECTION */}
        <div className="min-h-screen flex items-center justify-center p-8 pt-24">
          <ContentCard align="center">
            <div className="max-w-4xl text-center">
              <div className="inline-block mb-6 px-6 py-2 bg-[#f97316]/10 rounded-full">
                <span className="text-[#f97316] font-semibold text-sm tracking-wider uppercase">
                  Bienvenue dans le futur de la livraison
                </span>
              </div>
              
              <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-[#f97316] via-[#ea580c] to-[#fb923c] bg-clip-text text-transparent">
                Repas Joy
              </h1>
              
              <div className="h-2 w-32 mx-auto bg-gradient-to-r from-[#f97316] to-[#fb923c] rounded-full mb-8" />
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                Découvrez l'excellence culinaire livrée à votre porte avec rapidité, 
                soin et un engagement qualité qui nous distingue.
              </p>

              <div className="flex gap-4 justify-center flex-wrap">
                <button className="px-8 py-4 bg-[#f97316] text-white font-bold rounded-xl hover:bg-[#ea580c] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Commander Maintenant
                </button>
                <button className="px-8 py-4 bg-white text-[#f97316] font-bold rounded-xl border-2 border-[#f97316] hover:bg-[#f97316] hover:text-white transition-all duration-300 transform hover:scale-105">
                  En Savoir Plus
                </button>
              </div>

              {/* Scroll indicator */}
              <div className="mt-16 animate-bounce">
                <svg className="w-8 h-8 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </ContentCard>
        </div>

        {/* SECTION 1 - Livraison Rapide */}
        <div className="min-h-screen flex items-center justify-start p-8">
          <ContentCard align="left">
            <div className="max-w-2xl bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-[#f97316]/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#f97316] to-[#fb923c] rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl">🚀</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                  Livraison Ultra-Rapide
                </h2>
              </div>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Commandez parmi des centaines de restaurants et recevez votre repas 
                en un temps record. Notre système logistique avancé garantit que 
                votre nourriture arrive chaude, fraîche et parfaitement emballée.
              </p>

              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="text-center p-4 bg-[#f97316]/5 rounded-xl">
                  <div className="text-3xl font-bold text-[#f97316]">15min</div>
                  <div className="text-sm text-gray-600 mt-1">Livraison Moy.</div>
                </div>
                <div className="text-center p-4 bg-[#f97316]/5 rounded-xl">
                  <div className="text-3xl font-bold text-[#f97316]">500+</div>
                  <div className="text-sm text-gray-600 mt-1">Restaurants</div>
                </div>
                <div className="text-center p-4 bg-[#f97316]/5 rounded-xl">
                  <div className="text-3xl font-bold text-[#f97316]">24/7</div>
                  <div className="text-sm text-gray-600 mt-1">Disponible</div>
                </div>
              </div>
            </div>
          </ContentCard>
        </div>

        {/* SECTION 2 - Qualité */}
        <div className="min-h-screen flex items-center justify-end p-8">
          <ContentCard align="right" delay={200}>
            <div className="max-w-2xl bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-[#f97316]/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#f97316] to-[#fb923c] rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl">🥗</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                  Ingrédients Frais & Qualité
                </h2>
              </div>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Nous collaborons uniquement avec des restaurants qui partagent notre 
                engagement envers l'excellence. Chaque ingrédient est sourcé avec soin, 
                chaque plat préparé avec passion.
              </p>

              <div className="space-y-3 mt-8">
                {[
                  "Fraîcheur de la ferme à la table garantie",
                  "Contrôles qualité stricts",
                  "Ingrédients locaux privilégiés",
                  "Emballages éco-responsables"
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

        {/* SECTION 3 - Expérience */}
        <div className="min-h-screen flex items-center justify-start p-8">
          <ContentCard align="left" delay={100}>
            <div className="max-w-2xl bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-[#f97316]/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#f97316] to-[#fb923c] rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl">📱</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                  Commande Simple & Intuitive
                </h2>
              </div>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Notre application intuitive rend la commande facile. Parcourez les menus, 
                personnalisez votre commande, suivez la livraison en temps réel et profitez 
                de récompenses exclusives.
              </p>

              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="p-6 bg-gradient-to-br from-[#f97316]/10 to-[#fb923c]/10 rounded-2xl">
                  <div className="text-4xl mb-3">💳</div>
                  <h3 className="font-bold text-lg mb-2">Paiement Sécurisé</h3>
                  <p className="text-sm text-gray-600">Options multiples avec sécurité bancaire</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-[#f97316]/10 to-[#fb923c]/10 rounded-2xl">
                  <div className="text-4xl mb-3">🎁</div>
                  <h3 className="font-bold text-lg mb-2">Programme Fidélité</h3>
                  <p className="text-sm text-gray-600">Gagnez des points à chaque commande</p>
                </div>
              </div>
            </div>
          </ContentCard>
        </div>

        {/* SECTION 4 - Satisfaction */}
        <div className="min-h-screen flex items-center justify-end p-8">
          <ContentCard align="right" delay={150}>
            <div className="max-w-2xl bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-[#f97316]/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#f97316] to-[#fb923c] rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl">⭐</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                  Satisfaction Client Garantie
                </h2>
              </div>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Votre bonheur est notre priorité. Avec un support client 24/7, des 
                remboursements faciles et un engagement envers l'excellence, nous 
                garantissons que chaque commande dépasse vos attentes.
              </p>

              <div className="bg-gradient-to-r from-[#f97316]/10 to-[#fb923c]/10 p-8 rounded-2xl mt-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-5xl font-black text-[#f97316]">4.9/5</span>
                  <div className="text-right">
                    <div className="text-yellow-400 text-2xl">★★★★★</div>
                    <p className="text-sm text-gray-600 mt-1">50,000+ Avis</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Repas Joy a transformé ma façon de profiter de la nourriture. Rapide, frais et toujours délicieux!"
                </p>
                <p className="text-sm text-gray-500 mt-2">- Sarah M., Cliente Vérifiée</p>
              </div>
            </div>
          </ContentCard>
        </div>

        {/* FINAL CTA SECTION */}
        <div className="min-h-screen flex items-center justify-center p-8">
          <ContentCard align="center" delay={100}>
            <div className="max-w-4xl text-center bg-gradient-to-br from-[#f97316] to-[#ea580c] rounded-3xl shadow-2xl p-12 md:p-16 text-white">
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Prêt à Découvrir la Joie?
              </h2>
              
              <p className="text-xl md:text-2xl mb-10 opacity-90">
                Rejoignez des milliers de clients satisfaits et découvrez pourquoi 
                Repas Joy est le choix #1 pour la livraison de repas.
              </p>

              <button className="px-12 py-5 bg-white text-[#f97316] font-bold text-xl rounded-2xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 shadow-2xl">
                Commencer Votre Première Commande
              </button>

              <div className="mt-12 flex gap-6 md:gap-8 justify-center text-sm opacity-75 flex-wrap">
                <div>✓ Pas de minimum de commande</div>
                <div>✓ Livraison gratuite (1ère commande)</div>
                <div>✓ Annulez quand vous voulez</div>
              </div>
            </div>
          </ContentCard>
        </div>

      </div>
    </div>
  );
}
