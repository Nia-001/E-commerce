import React from "react";
 const BottomBanner =()=>{
    

  const features = [
    {
      title: "Fastest Delivery",
      desc: "Groceries delivered in under 30 minutes.",
      icon: "🚚",
    },
    {
      title: "Freshness Guaranteed",
      desc: "Fresh produce straight from the source.",
      icon: "🥬",
    },
    {
      title: "Affordable Prices",
      desc: "Quality groceries at unbeatable prices.",
      icon: "💰",
    },
    {
      title: "Trusted by Thousands",
      desc: "Loved by 10,000+ happy customers.",
      icon: "❤️",
    },
  ];

  return (
    <div className="mt-16 px-6 md:px-16 lg:px-24 py-16 bg-blue-50 rounded-2xl shadow-lg p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">
      

        {/* LEFT SIDE IMAGE */}
        <div className="relative flex-1 flex justify-center">
          <img
            src="https://images.pexels.com/photos/5709269/pexels-photo-5709269.jpeg"
            alt="Grocery"
            className="w-64 md:w-80 object-contain"
          />

        </div>

        {/* RIGHT SIDE CONTENT */}
        <div className="flex-1">

          <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
            Why We Are the Best?
          </h2>

          <div className="mt-8 space-y-6">
            {features.map((item, index) => (
              <div key={index} className="flex items-start gap-4">

                <div className="w-12 h-12 bg- blue-900 text-white flex items-center justify-center rounded-lg text-xl">
                  {item.icon}
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800">
                    {item.title}
                  </h4>
                  <p className="text-gray-500 text-sm">
                    {item.desc}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    
  );
};


 export default BottomBanner
