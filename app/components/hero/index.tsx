import bgImage from "~/assets/bg-app.png";
import hero_1 from "../../assets/hero_1.png";
import hero_2 from "../../assets/hero_2.png";
import hero_3 from "../../assets/hero_3.png";
import abstract_1 from "../../assets/abstract_1.png";
import abstract_2 from "../../assets/abstract_2.png";
import abstract_3 from "../../assets/abstract_3.png";

const index = () => {
  return (
    <section className="w-full h-[85dvh] flex items-center justify-center overflow-hidden bg-gray-50">
      <div className="w-10/12 h-full relative flex items-center z-50">
      <div className={`lg:w-1/2 w-full flex items-start justify-center flex-col gap-10 relative`}>
               <h1 className="text-2xl">Professional & Lifelong Learning</h1>
               <div className="text-[4rem] font-bold flex items-start justify-center flex-col"><span>Online Courses With</span><span>Certificates & Diplomas</span></div>
              <div className="flex gap-3 relative items-center justify-center">
                <button className="bg-slate-900 p-3 text-white flex justify-center items-center gap-4 overflow-hidden rounded-md text-2xl animate-bounce px-10 py-4 capitalize">Start Now</button>
              </div> 
        </div>
              <img src={bgImage} className="w-full lg:w-[70%] absolute top-0 left-0 z-0"/>
        <img
          src={abstract_1}
          className="hidden lg:block absolute bottom-[-100%] w-[350px] md:w-[400px] lg:w-auto right-14 animate-abstract-1 z-40"
        ></img>
        <img
          src={abstract_2}
          className="hidden lg:block absolute bottom-[-100%] w-[350px] md:w-[400px] lg:w-auto right-14 animate-abstract-2 z-40"
        ></img>
        <img
          src={abstract_3}
          className="hidden lg:block absolute bottom-[-100%] w-[350px] md:w-[400px] lg:w-auto right-14 animate-abstract-3 z-40"
        ></img>
        <img
          src={hero_1}
          className="hidden lg:block md:w-[550px] lg:w-[600px] absolute right-[-100%] bottom-0 z-50 animate-hero-1"
        />
        <img
          src={hero_2}
          className="hidden lg:block md:w-[450px] lg:w-[500px] absolute right-[-100%] bottom-0 z-50 animate-hero-2"
        ></img>
        <img
          src={hero_3}
          className="hidden lg:block md:h-[600px] lg:h-[650px] absolute -right-[200%] bottom-0 z-50 animate-hero-3"
        ></img>
      </div>
    </section>
    // <div className="bg-[url('/home-hero-section.png')] w-full h-dvh bg-no-repeat">
    //     <div className="flex flex-col gap-10">
    //         <h1 className="pl-40 pt-72 text-lg">Professional & Lifelong Learning</h1>
    //         <h2 className="pl-40 text-5xl">Online Courses With<br/> Certificates & Diplomas</h2>
    //         <div className="flex gap-3 relative items-center">
    //             <button className="bg-slate-900 p-3 text-white ml-40 flex justify-center items-center gap-2"><RxHamburgerMenu size={35} />Categories</button>
    //             <IoIosSearch size={30} className="absolute left-80"/>
    //             <input className="py-4 pl-10 pr-3 text-white" placeholder="Search..."/>
    //         </div>
    //     </div>
    //     {/* <div className="absolute top-72 left-40">Professional & Lifelong Learning</div> */}
    // </div>
  );
};

export default index;
