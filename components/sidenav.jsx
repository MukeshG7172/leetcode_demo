"use client";

import Link from 'next/link'
function Sidenav(){
    const closeNav = () => {
        document.getElementById("mySidenav").style.display = "none";
    }
    const openNav = ()=>{
        document.getElementById("mySidenav").style.display = "block";
      }
    
    return (
        <div>
            <div id="mySidenav" className="none h-[100%] w-[250px] fixed top-0 left-0 bg-black overflow-x-hidden pt-[60px] sm:pt-[15px]">
                <div className="pt-[8px] pl-[8px] pb-[8px] pr-[32px] decoration-none size-25px text-[#818181] hover:text-[#f1f1f1] sm:font-[18px] flex flex-col">
                    <button className="closebtn absolute top-0 right-[25px] font-[36px] ml-[50px]" onClick={closeNav}>&times;</button>
                    {/* <a href="#">weekly contest 410</a> */}
                    <Link href="#">weekly contest 410</Link>
                    {/* <a href="#">Services</a>
                    <a href="#">Clients</a>
                    <a href="#">Contact</a> */}
                </div>
            </div>
            <button className="font-[30px] cursor-pointer" onClick={openNav}>&#9776; open</button>
        </div>
    );
}

export default Sidenav;
