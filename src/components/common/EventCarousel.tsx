import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

interface EventData {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
  category: string;
}

interface EventCarouselProps {
  events: EventData[];
  title?: string;
}

export function EventCarousel({ events, title = "Sự kiện xu hướng" }: EventCarouselProps) {
  return (
    <div className="relative py-12" style={{ background: 'transparent' }}>

      {/* Title */}
      <div className="flex items-center justify-start mb-8 relative z-10 max-w-7xl mx-auto px-4">
        <div 
          className="px-6 py-2 rounded-full relative"
          style={{ 
            background: 'conic-gradient(from 179.42deg at 47.87% -110.87%, #1ADBE3 -25.84deg, #7001D3 0.27deg, #FE6272 22.53deg, #BD38FF 127.5deg, #1752CA 196.87deg, #1ADBE3 334.16deg, #7001D3 360.27deg)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <h2 className="text-white font-semibold text-lg">{title}</h2>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative max-w-7xl mx-auto px-4">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full relative"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {events.map((event, index) => (
              <CarouselItem key={event.id} className="pl-2 md:pl-4 basis-1/3 lg:basis-1/4">
                <div className="group cursor-pointer">
                  {/* Event Card Container */}
                  <div className="w-full h-40 rounded-2xl overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex">
                    
                    {/* Number Section - 10% width, 65% height */}
                    <div className="w-[10%] h-full flex items-end justify-center pb-3 bg-black/20 rounded-l-2xl">
                      <div className="w-full h-[65%] flex items-end justify-center pb-2 bg-transparent">
                        <span 
                          className="font-bold text-4xl"
                          style={{
                            background: 'linear-gradient(180deg, #7001D3 0%, #FE6272 6%, #BD38FF 35%, #1752CA 55%, #1ADBE3 93%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                          }}
                        >
                          {index + 1}
                        </span>
                      </div>
                    </div>

                    {/* Image Section - 90% width, 100% height */}
                    <div className="w-[90%] h-full relative rounded-r-md overflow-hidden">
                      {/* Background Image */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center rounded-r-md"
                        style={{ backgroundImage: `url(${event.image})` }}
                      >
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-r-md"></div>
                      </div>

                      {/* Content */}
                      <div className="relative h-full flex flex-col justify-end p-3 text-white">
                        {/* Category Badge */}
                        <div className="absolute top-3 right-3">
                          <span className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
                            {event.category}
                          </span>
                        </div>

                        {/* Event Details */}
                        <div className="space-y-1">
                          <h3 className="text-base font-bold leading-tight line-clamp-2">
                            {event.title}
                          </h3>
                          <p className="text-gray-200 text-xs line-clamp-2">
                            {event.description}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-300 mt-2">
                            <span className="font-medium">{event.date}</span>
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Custom Navigation Arrows */}
          <button
            className="absolute -left-10 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
            style={{
              background: 'rgba(255, 255, 255, 1)',
              border: '1px solid rgba(187, 185, 255, 1)',
              boxShadow: '1px 5px 4px 0px rgba(21, 20, 63, 0.25) inset, 0px 4px 2.1px 0px rgba(187, 185, 255, 0.25)'
            }}
            onClick={() => {
              const prevButton = document.querySelector('[data-carousel="prev"]') as HTMLButtonElement;
              prevButton?.click();
            }}
          >
            <ChevronLeftIcon className="h-4 w-4 text-black" />
          </button>
          <button
            className="absolute -right-10 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
            style={{
              background: 'rgba(255, 255, 255, 1)',
              border: '1px solid rgba(187, 185, 255, 1)',
              boxShadow: '1px 5px 4px 0px rgba(21, 20, 63, 0.25) inset, 0px 4px 2.1px 0px rgba(187, 185, 255, 0.25)'
            }}
            onClick={() => {
              const nextButton = document.querySelector('[data-carousel="next"]') as HTMLButtonElement;
              nextButton?.click();
            }}
          >
            <ChevronRightIcon className="h-4 w-4 text-black" />
          </button>
          
          {/* Hidden default buttons for functionality */}
          <CarouselPrevious className="hidden" data-carousel="prev" />
          <CarouselNext className="hidden" data-carousel="next" />
        </Carousel>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

// Sample data for demonstration
export const sampleEvents: EventData[] = [
  {
    id: 1,
    title: "BeSpace Music Festival 2025",
    description: "Lễ hội âm nhạc lớn nhất năm với những nghệ sĩ hàng đầu",
    date: "15.03.2025",
    location: "TP.HCM",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500&h=300&fit=crop",
    category: "Âm nhạc"
  },
  {
    id: 2,
    title: "Charity Drag Show",
    description: "Chương trình từ thiện với màn trình diễn drag show đầy màu sắc",
    date: "20.03.2025",
    location: "Hà Nội",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&h=300&fit=crop",
    category: "Giải trí"
  },
  {
    id: 3,
    title: "Musicaland Festival",
    description: "Lễ hội nhạc kịch quốc tế tại Capital Theatre",
    date: "25.07.2025",
    location: "TPHCM",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop",
    category: "Âm nhạc"
  },
  {
    id: 4,
    title: "Art & Tech Summit",
    description: "Hội thảo nghệ thuật và công nghệ hiện đại",
    date: "10.04.2025",
    location: "Đà Nẵng",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
    category: "Nghệ thuật"
  },
  {
    id: 5,
    title: "Sports Gala Night",
    description: "Đêm gala thể thao với các vận động viên nổi tiếng",
    date: "05.05.2025",
    location: "TP.HCM",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=300&fit=crop",
    category: "Thể thao"
  }
];