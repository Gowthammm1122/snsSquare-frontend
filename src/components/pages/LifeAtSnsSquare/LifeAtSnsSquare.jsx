import React from "react";
import SEO from "../../common/SEO";
import Hero from "./hero";
import { Card, CardContent } from "../../common/card";
import CoreValueSection from "./CoreValueSection";
import InTheirOwnWords from "./InTheirOwn";
import ScenarioSection from "./scenarioSection";
import { InfiniteMovingCards } from "../../ui/infinite-moving-cards";
import "../../ui/infinite-moving-cards.css";
const contentSections = [
    {
        id: 1,
        title: "Culture, Crafted\nwith Purpose",
        imageSrc: "/images/IMG_6488.png",
        imagePosition: "right",
        cardPosition: "left",
        cardStyle: "rounded-md-none",
        textPosition: "top"
    },
    {
        id: 2,
        title: "Innovation Without Boundaries",
        imageSrc: "/images/IMG_6533.png",
        imagePosition: "left",
        cardPosition: "right",
        cardStyle: "rounded-md-none",
        textPosition: "bottom"
    },
    {
        id: 3,
        title: "The Untiring Force",
        imageSrc: "/images/IMG_7778.png",
        imagePosition: "right",
        cardPosition: "left",
        cardStyle: "rounded-md-none",
        textPosition: "top"
    },
    {
        id: 4,
        title: "Community That Lifts Together",
        imageSrc: "/images/IMG_6534.png",
        imagePosition: "left",
        cardPosition: "right",
        cardStyle: "rounded-md-none",
        textPosition: "bottom"
    },
    {
        id: 5,
        title: "Wellness at the Core, SNS Square",
        imageSrc: "/images/IMG_6535.png",
        imagePosition: "right",
        cardPosition: "left",
        cardStyle: "rounded-md-none",
        textPosition: "top",
        hasOverlay: true
    },
    {
        id: 6,
        title: "An Ecosystem for Growth",
        imageSrc: "/images/IMG_6676.png",
        imagePosition: "left",
        cardPosition: "right",
        cardStyle: "rounded-md-none",
        textPosition: "bottom"
    },
];

export default function Page() {
    return (
        <div className="bg-white">
            <SEO 
                title="Life at SNS Square | Culture & Values"
                description="Discover life at SNS Square. Our culture fosters bold thinking, fearless execution, and innovation, guided by integrity, collaboration, and purpose-driven impact."
                keywords="SNS Square, Company Culture, Work Culture, Innovation, Integrity, Collaboration, Purpose-Driven, Employee Experience, Agentic AI Workplace"
                image="https://www.snssquare.com/images/og/life-at-sns-og.jpg"
                url="https://www.snssquare.com/life-at-sns"
            />
            <Hero />
            <div className="pt-8 sm:pt-10 md:pt-12 lg:pt-14 mb-6 sm:mb-8 md:mb-10 lg:mb-12 flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
                <div className="">
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl">What defines us</h3>
                    {/* <p className="mt-3 sm:mt-4 md:mt-5 lg:mt-6 mb-3 sm:mb-4 md:mb-5 lg:mb-6 text-sm sm:text-base md:text-lg">What defines us</p> */}
                </div>
            </div>
            <div className="px-4 sm:px-6 lg:px-8">
                <InfiniteMovingCards
                    items={contentSections}
                    direction="left"
                    speed="normal"
                    pauseOnHover={true}
                />
            </div>
            <CoreValueSection />
            <ScenarioSection />
            <InTheirOwnWords />
        </div>
    );
}