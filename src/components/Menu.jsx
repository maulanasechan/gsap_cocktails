import { useRef, useState } from "react";
import { sliderLists } from "../../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { asset } from "../utils/assets";

const Menu = () => {
  const contentRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalCocktails = sliderLists.length;
  const getCocktailAt = (indexOffset) => {
    return sliderLists[
      (currentIndex + indexOffset + totalCocktails) % totalCocktails
    ];
  };

  const prevCocktail = getCocktailAt(-1);
  const nextCocktail = getCocktailAt(1);
  const currentCocktail = getCocktailAt(0);

  const goToSlide = (index) => {
    const newIndex = (index + totalCocktails) % totalCocktails;
    setCurrentIndex(newIndex);
  };

  useGSAP(() => {
    gsap.fromTo("#title", { opacity: 0 }, { opacity: 1, duration: 1 });
    gsap.fromTo(
      ".cocktail img",
      { opacity: 0, xPercent: -100 },
      { opacity: 1, xPercent: 0, duration: 1, ease: "power1.inOut" },
    );
    gsap.fromTo(
      ".details h2",
      { opacity: 0, yPercent: 100 },
      { opacity: 1, yPercent: 0, duration: 1, ease: "power1.inOut" },
    );
    gsap.fromTo(
      ".details p",
      { opacity: 0, yPercent: 100 },
      { opacity: 1, yPercent: 0, duration: 1, ease: "power1.inOut" },
    );
  }, [currentIndex]);

  return (
    <section
      id="menu"
      aria-labelledby="menu-heading"
      className="menu-radial-gradient"
    >
      <img
        src={asset("images/slider-left-leaf.png")}
        alt="left-leaf"
        id="m-left-leaf"
      />
      <img
        src={asset("images/slider-right-leaf.png")}
        alt="right-leaf"
        id="m-right-leaf"
      />

      <h2 id="menu-heading" className="sr-only">
        Cocktail Menu
      </h2>
      <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
        {sliderLists.map((cocktail, index) => {
          const isActive = index == currentIndex;
          return (
            <button
              key={cocktail.id}
              onClick={() => goToSlide(index)}
              className={`${isActive ? "text-white border-white" : "text-white/50 border-white/50 hover:text-yellow hover:border-yellow"}`}
            >
              {cocktail.name}
            </button>
          );
        })}
      </nav>
      <div className="content">
        <div className="arrows">
          <button
            className="text-left"
            onClick={() => goToSlide(currentIndex - 1)}
          >
            <span>{prevCocktail.name}</span>
            <img
              src={asset("images/left-arrow.png")}
              alt="left-arrow"
              aria-hidden="true"
            />
          </button>
          <button
            className="text-left"
            onClick={() => goToSlide(currentIndex + 1)}
          >
            <span>{nextCocktail.name}</span>
            <img
              src={asset("images/right-arrow.png")}
              alt="right-arrow"
              aria-hidden="true"
            />
          </button>
        </div>
        <div className="cocktail">
          <img src={currentCocktail.image} alt="" />
        </div>
        <div className="recipe">
          <div ref={contentRef} className="info">
            <p>Recipe for:</p>
            <p id="title">{currentCocktail.name}</p>
          </div>
          <div className="details">
            <h2>{currentCocktail.title}</h2>
            <p>{currentCocktail.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
