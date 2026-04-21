import React from "react";
import MainBanner from "../Components/MainBanner"
import Categeries from "../Components/Categeries"
import BestSeller from "../Components/BestSeller";
import BottomBanner from "../Components/BottomBanner"
import Newsletter from "../Components/Newsletter";
const Home =()=>{
    return(
        <div className="mt-10">
<MainBanner/>
<Categeries/>
<BestSeller/>
<BottomBanner/>
<Newsletter/>
        </div>
    )
}
export default Home