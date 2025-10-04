import NewMarqueeGlobe from "@/components/NewMarqueeglobe";
import Image from "next/image";
// import "./style.css";
import StartVideo from "@/components/StartVideo";

export default function Home() {
  return (
    // <>
    //      <header className="head flex justify-between pt-8 px-7">
    //     <div className="header-content">
    //       <a href="#">
    //         <img src="/images/janprologo.svg" alt="logo" width={240} className="logo" />
    //       </a>
    //     </div>
    //     <div className="hamburger">
    //       <img src="/images/hamburger.svg" alt="logo" width={50} className="logo" />
    //     </div>
    //   </header>
    //   <section className="cards-section justify-center flex container ">
    //     <div className="cards-container flex flex-col gap-3 justify-center ">
    //       {/* Card 1 */}
    //       <div className="mb-14 px-8 py-4 w-1/2 rounded-[20px] bg-white/30 backdrop-blur-[10px] border border-white/30 text-center shadow-[0_8px_20px_rgba(161,161,161,0.2)] relative transition-transform duration-300 ease-in-out">Card 1 Content</div>

    //       {/* Card 2 */}
    //       <div className="mb-14 px-8 py-4 w-1/2 rounded-[20px] bg-white/30 backdrop-blur-[10px] border border-white/30 text-center shadow-[0_8px_20px_rgba(161,161,161,0.2)] relative transition-transform duration-300 ease-in-out">Card 2 Content</div>

    //         <div className="glass-card mb-14 px-8 py-4 w-1/2 rounded-[20px] bg-white/30 backdrop-blur-[10px] border border-white/30 text-center shadow-[0_8px_20px_rgba(161,161,161,0.2)] relative transition-transform duration-300 ease-in-out">
    //           Card 3 Content
    //         </div>
    //       {/* Card 3: Card + Globe */}
    //     </div>
    //       <div className="card-globe-container">
    //         <div className="globe-container">
    //           <NewMarqueeGlobe/>
    //         </div>
    //       </div>
    //   </section>
    // </>
    <>
    <StartVideo/>
    </>
  );
}
