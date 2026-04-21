import React, { useState } from "react";

const Contact = () => {

  const [formData,setFormData] = useState({
    name:"",
    email:"",
    subject:"",
    message:""
  });

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    });
    
  };

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(formData);
    alert("Message Sent Successfully!");
     setFormData({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  };

  return (
    <div className="px-6 md:px-16 lg:px-24 py-16">

      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
        <p className="text-gray-500 mt-3">
          We'd love to hear from you. Send us a message!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              name="message"
              rows="5"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>

          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
            Send Message
          </button>

        </form>


        {/* Contact Info */}
        <div className="space-y-6">

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Store Information
            </h2>
            <p className="text-gray-600">
              123 Market Street <br/>
              New Delhi, India
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Phone
            </h2>
            <p className="text-gray-600">+91 9876543210</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Email
            </h2>
            <p className="text-gray-600">support@yourstore.com</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Business Hours
            </h2>
            <p className="text-gray-600">
              Mon - Sat : 9AM - 8PM <br/>
              Sunday : Closed
            </p>
          </div>

        </div>

      </div>


      {/* Map Section */}
      <div className="mt-16">

        <iframe
          title="map"
          className="w-full h-[400px] rounded-xl"
          src="https://maps.google.com/maps?q=delhi&t=&z=13&ie=UTF8&iwloc=&output=embed"
        ></iframe>

      </div>

    </div>
  );
};

export default Contact;