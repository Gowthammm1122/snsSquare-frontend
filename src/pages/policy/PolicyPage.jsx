import React, { useState } from 'react';
import SEO from "../../components/common/SEO";

const PolicyPage = () => {
  const [activeSection, setActiveSection] = useState('Privacy Policy');


  const menuItems = [
    'Privacy Policy',
    'Terms of Service', 
    'Acceptable use policy',
    'Cookie Policy'
  ];

  // Custom styles for mobile scrollbar hiding
  const scrollbarHideStyle = {
    scrollbarWidth: 'none', /* Firefox */
    msOverflowStyle: 'none',  /* Internet Explorer 10+ */
    WebkitScrollbar: 'none' /* WebKit */
  };


  const renderContent = () => {
    switch(activeSection) {
      case 'Privacy Policy':
        return (
          <div className="flex flex-col gap-6 sm:gap-8">
            <div className="flex flex-col gap-4 sm:gap-5">
              <h2 className="text-neutral-800  leading-tight">
                Privacy Policy
              </h2>
              <p className="text-zinc-600  leading-relaxed">
                Unlock the full potential of your logistics operations by integrating Square's advanced generative AI capabilities. From optimizing supply chain management to enhancing risk assessment and improving customer interactions, Square transforms the internal operations of logistics businesses.
              </p>
            </div>


            <div className="flex flex-col gap-3">
              <h5 className="text-black  leading-tight">
                Information Collection
              </h5>
              <p className="text-black/60  leading-relaxed">
                As part of our Services, Account holders may communicate with other Account holders with whom they are connected through the Services through the use of our direct messaging functionality. In addition to sending and receiving text messages, Account holders will be able to send and receive User Content (defined below), including content and multimedia files such as documents, photos and videos, as well as URLs, via our Services' functionality. Account holders have the right(s) to control the messages they send through the Services.
              </p>
              <div className="w-full h-px bg-zinc-300"></div>
            </div>


            <div className="flex flex-col gap-3">
              <h5 className="text-black  leading-tight">
                Data Usage and Protection
              </h5>
              <p className="text-black/60  leading-relaxed">
                We implement industry-standard security measures to protect your personal information. Your data is encrypted both in transit and at rest, and we regularly audit our security protocols to ensure the highest level of protection for your sensitive information.
              </p>
            </div>
          </div>
        );


      case 'Terms of Service':
        return (
          <div className="flex flex-col gap-6 sm:gap-8">
            <div className="flex flex-col gap-4 sm:gap-5">
              <h2 className="text-neutral-800  leading-tight">
                Terms of Service
              </h2>
              <p className="text-zinc-600  leading-relaxed">
                Unlock the full potential of your logistics operations by integrating Square's advanced generative AI capabilities. From optimizing supply chain management to enhancing risk assessment and improving customer interactions, Square transforms the internal operations of logistics businesses.
              </p>
            </div>


            <div className="flex flex-col gap-3">
              <h5 className="text-black  leading-tight">
                Agreement to Terms
              </h5>
              <p className="text-black/60  leading-relaxed">
                As part of our Services, Account holders may communicate with other Account holders with whom they are connected through the Services through the use of our direct messaging functionality. In addition to sending and receiving text messages, Account holders will be able to send and receive User Content (defined below), including content and multimedia files such as documents, photos and videos, as well as URLs, via our Services' functionality. Account holders have the right(s) to control the messages they send through the Services. For example, Account holders can: (i) delay delivery of messages under certain circumstances for a specified time period, (ii) control who can see certain messages, (iii) impose forwarding, copying, saving, and screenshot restrictions (and trigger alerts when such events occur), (iv) control how long messages persist on the Services, and (v) recall messages so that the messages are no longer accessible through the Services. Additionally, Account holders can configure the Services in order to receive alerts or other notifications through the Services when certain events occur, and trigger certain actions in other systems in response. Kore.ai offers three distinct versions of the Services depending on whether you plan to use the Services for Individual Use, Team Use, or Enterprise Use, and each version is available on both a free and a paid basis. For the Individual Consumer Use and Team Use versions of the Services, you can create your Account using either your personal email account or an email account associated with your employer. Additionally, as part of our Services, Account holders may have the ability to access and utilize certain bots to the extent made available to such Account holders in Kore.ai's sole discretion. Bots are pieces of software that connect directly to enterprise and consumer apps, systems, websites, and more through APIs.
              </p>
              <div className="w-full h-px bg-zinc-300"></div>
            </div>


            <div className="flex flex-col gap-3">
              <h5 className="text-black  leading-tight">
                Changes to Terms or Services
              </h5>
              <p className="text-black/60  leading-relaxed">
                As part of our Services, Account holders may communicate with other Account holders with whom they are connected through the Services through the use of our direct messaging functionality. In addition to sending and receiving text messages, Account holders will be able to send and receive User Content (defined below), including content and multimedia files such as documents, photos and videos, as well as URLs, via our Services' functionality. Account holders have the right(s) to control the messages they send through the Services. For example, Account holders can: (i) delay delivery of messages under certain circumstances for a specified time period, (ii) control who can see certain messages, (iii) impose forwarding, copying, saving, and screenshot restrictions (and trigger alerts when such events occur), (iv) control how long messages persist on the Services, and (v) recall messages so that the messages are no longer accessible through the Services. Additionally, Account holders can configure the Services in order to receive alerts or other notifications through the Services when certain events occur, and trigger certain actions in other systems in response. Kore.ai offers three distinct versions of the Services depending on whether you plan to use the Services for Individual Use, Team Use, or Enterprise Use, and each version is available on both a free and a paid basis. For the Individual Consumer Use and Team Use versions of the Services, you can create your Account using either your personal email account or an email account associated with your employer. Additionally, as part of our Services, Account holders may have the ability to access and utilize certain bots to the extent made available to such Account holders in Kore.ai's sole discretion. Bots are pieces of software that connect directly to enterprise and consumer apps, systems, websites, and more through APIs.
              </p>
            </div>


            <div className="flex flex-col gap-3">
              <h5 className="text-black  leading-tight">
                Who may use the Services
              </h5>
              <p className="text-black/60  leading-relaxed pb-30">
                As part of our Services, Account holders may communicate with other Account holders with whom they are connected through the Services through the use of our direct messaging functionality. In addition to sending and receiving text messages, Account holders will be able to send and receive User Content (defined below), including content and multimedia files such as documents, photos and videos, as well as URLs, via our Services' functionality. Account holders have the right(s) to control the messages they send through the Services. For example, Account holders can: (i) delay delivery of messages under certain circumstances for a specified time period, (ii) control who can see certain messages, (iii) impose forwarding, copying, saving, and screenshot restrictions (and trigger alerts when such events occur), (iv) control how long messages persist on the Services, and (v) recall messages so that the messages are no longer accessible through the Services. Additionally, Account holders can configure the Services in order to receive alerts or other notifications through the Services when certain events occur, and trigger certain actions in other systems in response. Kore.ai offers three distinct versions of the Services depending on whether you plan to use the Services for Individual Use, Team Use, or Enterprise Use, and each version is available on both a free and a paid basis. For the Individual Consumer Use and Team Use versions of the Services, you can create your Account using either your personal email account or an email account associated with your employer. Additionally, as part of our Services, Account holders may have the ability to access and utilize certain bots to the extent made available to such Account holders in Kore.ai's sole discretion. Bots are pieces of software that connect directly to enterprise and consumer apps, systems, websites, and more through APIs.
              </p>
            </div>
          </div>
        );


      case 'Acceptable use policy':
        return (
          <div className="flex flex-col gap-6 sm:gap-8">
            <div className="flex flex-col gap-4 sm:gap-5">
              <h2 className="text-neutral-800  leading-tight">
                Acceptable Use Policy
              </h2>
              <p className="text-zinc-600  leading-relaxed">
                This Acceptable Use Policy outlines the proper use of our services and the activities that are prohibited when using our platform.
              </p>
            </div>


            <div className="flex flex-col gap-3">
              <h5 className="text-black  leading-tight">
                Permitted Uses
              </h5>
              <p className="text-black/60  leading-relaxed">
                You may use our services for lawful business purposes, personal communication, and activities that comply with all applicable laws and regulations. Our platform is designed to facilitate legitimate business operations and personal productivity.
              </p>
              <div className="w-full h-px bg-zinc-300"></div>
            </div>


            <div className="flex flex-col gap-3">
              <h5 className="text-black  leading-tight">
                Prohibited Activities
              </h5>
              <p className="text-black/60  leading-relaxed">
                Users are prohibited from engaging in activities that violate laws, infringe on intellectual property rights, distribute malicious software, or interfere with the security and integrity of our services.
              </p>
            </div>
          </div>
        );


      case 'Cookie Policy':
        return (
          <div className="flex flex-col gap-6 sm:gap-8">
            <div className="flex flex-col gap-4 sm:gap-5">
              <h2 className="text-neutral-800  leading-tight">
                Cookie Policy
              </h2>
              <p className="text-zinc-600  leading-relaxed">
                This Cookie Policy explains how we use cookies and similar tracking technologies on our website and services.
              </p>
            </div>


            <div className="flex flex-col gap-3">
              <h5 className="text-black  leading-tight">
                What are Cookies
              </h5>
              <p className="text-black/60  leading-relaxed">
                Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better user experience by remembering your preferences and improving our services.
              </p>
              <div className="w-full h-px bg-zinc-300"></div>
            </div>


            <div className="flex flex-col gap-3">
              <h5 className="text-black  leading-tight">
                Types of Cookies We Use
              </h5>
              <p className="text-black/60  leading-relaxed">
                We use essential cookies for website functionality, performance cookies to analyze usage, and targeting cookies to provide personalized content and advertisements based on your interests.
              </p>
            </div>
          </div>
        );


      default:
        return null;
    }
  };


  return (
    <div className="w-full min-h-screen pt-6 sm:pt-8 lg:pt-10 bg-white relative overflow-hidden">
      <SEO 
        title="Policy | SNS Square"
        description="This Privacy Policy outlines the information we collect from you, how we use it, and your rights regarding your personal data. It also explains how we protect your information and share it with third parties."
        keywords="SNS Square, Policy, Privacy Policy, Terms of Service, Acceptable Use Policy, Cookie Policy"
        image="https://www.snssquare.com/images/og/policy-og.jpg"
        url="https://www.snssquare.com/policy"
      />
      {/* Background Elements */}
      <div className="w-full h-60 sm:h-80 lg:h-96 absolute top-[60px] sm:top-[75px] lg:top-[93px] opacity-40">
        <div className="w-[400px] h-[300px] sm:w-[600px] sm:h-[450px] lg:w-[803px] lg:h-[619px] absolute right-[-50px] sm:right-[-75px] lg:right-[-97px] top-[-120px] sm:top-[-160px] lg:top-[-212px] opacity-25 bg-sky-400 rounded-full blur-[150px] sm:blur-[200px] lg:blur-[250px]" />
        <div className="w-[400px] h-[300px] sm:w-[600px] sm:h-[450px] lg:w-[803px] lg:h-[619px] absolute left-[-60px] sm:left-[-90px] lg:left-[-117px] top-[-140px] sm:top-[-200px] lg:top-[-277px] opacity-25 bg-blue-700 rounded-full blur-[150px] sm:blur-[200px] lg:blur-[250px]" />
      </div>


      {/* Main Content Container */}
      <div className="max-w-[1440px] mx-auto relative">
        <div className="flex flex-col lg:flex-row pt-[80px] sm:pt-[100px] lg:pt-[125px] px-4 lg:px-0">
          
          {/* Left Sidebar - Navigation Menu */}
          <div className="flex-shrink-0 relative mb-6 lg:mb-0">
            {/* Navigation Menu Container */}
            <div className="w-full lg:w-80 lg:pr-8">
              <div 
                className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0"
                style={scrollbarHideStyle}
              >
                {menuItems.map((item) => (
                  <div key={item} className="relative flex-shrink-0 lg:flex-shrink">
                    <button
                      onClick={() => setActiveSection(item)}
                      className={`
                        w-auto lg:w-full px-4 py-3 lg:p-4 text-left inline-flex justify-start items-center gap-2.5 transition-all duration-300 whitespace-nowrap lg:whitespace-normal mr-2 lg:mr-0 rounded-lg lg:rounded-none
                        ${activeSection === item 
                          ? 'bg-blue-50 lg:bg-transparent shadow-sm lg:shadow-none' 
                          : 'hover:bg-gray-50 lg:hover:bg-transparent'
                        }
                      `}
                    >
                      <div className="text-black text-sm sm:text-base md:text-lg lg:text-lg font-medium font-manrope">
                        {item}
                      </div>
                    </button>
                    
                    {/* Active indicator - blue gradient line */}
                    {activeSection === item && (
                      <div className="absolute bottom-0 lg:static w-full lg:w-64 h-[3px] bg-gradient-to-r from-blue-700 to-blue-500 lg:ml-4 rounded-full lg:rounded-none" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Vertical Line - positioned to only cover menu height */}
            <div className="hidden lg:block absolute right-0 top-0 w-px bg-stone-300 h-auto" style={{ height: `${menuItems.length * 64}px` }} />
          </div>


          {/* Right Content Area */}
          <div className="flex-1 lg:pl-8 pr-0 lg:pr-4">
            <div className="max-w-full lg:max-w-[912px]">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default PolicyPage;