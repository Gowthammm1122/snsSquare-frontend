import React from 'react';

const testimonials = [
  {
    quote: "There's this strong culture of collaboration and transparency that I've never seen before.",
    author: "- Leon, Software Associate",
    image: "/images/About_us/6.png"
  },
  {
    quote: "The innovation here is fearless, limitless, and unbounded. Every idea explodes into new.",
    author: "- Gwen, Tech Lead",
    image: "/images/About_us/7.png"
  },
  {
    quote: "This ecosystem gives us connection, community, and unbounded creativity that brings out our best.",
    author: "- Sam, Product Manager",
    image: "/images/About_us/8.png"
  }
];

const TestimonialCards = () => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-16 text-left">
          <h3 className=" text-gray-900 mb-2">In Their Own Words</h3>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-md shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-96">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 p-2 bg-white/35">
                  <div className="text-black">
                    <div className="text-4xl font-bold mb-2 text-black ">“</div>
                    <p className="text-base md:text-lg leading-relaxed drop-shadow-sm">
                      {testimonial.quote}
                    </p>
                    <div className="mt-4 text-sm text-black">
                      <p>{testimonial.author}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCards;