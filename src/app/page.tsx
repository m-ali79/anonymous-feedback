"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Nav } from "@/components/nav";

const carouselData = [
  {
    messageTitle: "Message from User123",
    messageContent: "Hey, how are you doing today?",
    messageSentTime: "10 minutes ago",
  },
  {
    messageTitle: "Message from SecretAdmirer",
    messageContent: "I really liked your recent post!",
    messageSentTime: "2 hours ago",
  },
  {
    messageTitle: "Message from MysteryGuest",
    messageContent: "Do you have any book recommendations?",
    messageSentTime: "1 day ago",
  },
];

export default function Home() {
  const autoPlay = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <>
      <Nav />

      <main className="bg-[#1F2937] text-white px-4 md:px-24 py-12 flex-grow flex flex-col items-center justify-center h-full w-full">
        <h1 className="text-center text-3xl md:text-5xl font-bold mb-4">
          Dive into the World of Anonymous Feedback
        </h1>
        <p className="text-center mb-16 md:text-lg">
          True Feedback - Where your identity remains a secret.
        </p>

        {/* moving carousel */}
        <Carousel
          plugins={[autoPlay.current]}
          onMouseEnter={autoPlay.current.stop}
          onMouseLeave={autoPlay.current.reset}
          className="w-full max-w-lg"
        >
          <CarouselContent className="">
            {carouselData.map((c, i) => (
              <CarouselItem key={i}>
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl">
                        {c.messageTitle}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <MessageSquare width={20} />
                        <div>
                          <p>{c.messageContent}</p>
                          <p className="text-gray-500 text-xs">
                            {c.messageSentTime}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <footer className="bg-[#111827] w-full">
          <p className="text-center text-white py-8 px-4">
            © 2023 True Feedback. All rights reserved.
          </p>
        </footer>
      </main>
    </>
  );
}
