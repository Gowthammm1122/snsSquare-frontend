import React, { useState } from 'react';
import Button from './Button2.jsx';
import { submitContactEmail } from '../../api/Service/contact.js';

const CTASection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async () => {
    if (!email || !email.includes('@')) {
      setFeedback('Please enter a valid email.');
      return;
    }
    setFeedback('');
    setIsSubmitting(true);
    try {
      await submitContactEmail(email);
      setFeedback('Thank you! We will get in touch soon.');
      setEmail('');
    } catch (error) {
      setFeedback(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section id="cta-section" className="w-full mt-[50px] sm:mt-[70px] md:mt-[80px] mb-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[1200px] mx-auto">
        <div
          className="border border-[#e3e0e0] rounded-[32px] p-6 sm:p-8 md:p-12 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `
      url('/images/img_67c0570ea854203522bca87aherobgpatternavif_414x1224.png'),
      linear-gradient(to top, #dfe9fb 0%, #ffffff 100%)
    `,
          }}
        >

          <div className="flex flex-col justify-center items-center w-full">
            <div className="flex flex-col justify-start items-center w-full lg:w-[74%] mt-8">
              {/* Main Heading */}
              <h2 className="text-[32px] sm:text-[42px] md:text-[54px] font-sora font-semibold leading-[40px] sm:leading-[56px] md:leading-[69px] text-center text-global-7">
                Let's Build Your Agentic Future
              </h2>

              {/* Subtitle */}
              <p className="text-[16px] sm:text-[18px] md:text-[20px] font-inter font-normal leading-[20px] sm:leading-[22px] md:leading-[24px] text-center text-global-7 w-full mt-6 sm:mt-8">
                Ready to transform your business with Agentic AI, autonomous solutions? Partner with us and take the first step into the Agentic era.
              </p>

              {/* Email Input and CTA */}
              <div className="w-full bg-global-7 rounded-[32px] p-2 sm:p-4 mt-8 sm:mt-12">
                <div className="w-full max-w-3xl mx-auto">
                  <div className="flex flex-col [@media(min-width:530px)]:relative [@media(min-width:530px)]:block w-full">
                    {/* Input */}
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full h-16 [@media(min-width:530px)]:h-20 rounded-full pl-6 [@media(min-width:530px)]:pr-40 text-sm sm:text-base font-inter font-light text-global-3 bg-white border-none outline-none mb-3 [@media(min-width:530px)]:mb-0"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    {/* Button */}
                    <Button
                      variant="primary"
                      size="medium"
                      className="w-full text-white [@media(min-width:530px)]:w-auto [@media(min-width:530px)]:absolute [@media(min-width:530px)]:top-1/2 [@media(min-width:530px)]:right-2 [@media(min-width:530px)]:-translate-y-1/2 rounded-[26px] px-6 py-[14px] text-base font-semibold"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Talk to an Expert'}
                    </Button>
                  </div>
                </div>

                {feedback && (
                  <p className="text-center text-sm sm:text-base mt-3 text-global-7">
                    {feedback}
                  </p>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default CTASection;