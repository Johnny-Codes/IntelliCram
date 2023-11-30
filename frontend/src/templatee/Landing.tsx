import LandingNavbar from "@/organisms/landing-navbar";
import Home from "@/pages/home";
import AboutUs from "@/pages/decks";
import OurReviews from "@/pages/reviews";
import Footer from "@/pages/footer";
import { useState, useEffect } from "react";
import { SelectedPage } from "@/atoms/types";


function Landing() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(SelectedPage.Home);
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true)
        setSelectedPage(SelectedPage.Home)
      }
      if (window.scrollY !== 0) setIsTopOfPage(false);
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)

  }, []);

  return (
    <div className="app bg-gray-20">
      <LandingNavbar
        isTopOfPage={isTopOfPage}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
      />
      <Home setSelectedPage={setSelectedPage} />
      <AboutUs setSelectedPage={setSelectedPage} />
      <Footer />
    </div>
  )
}

export default Landing
