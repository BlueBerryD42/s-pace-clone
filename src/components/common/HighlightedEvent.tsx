import React from 'react';

interface HighlightedEventData {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
  category: string;
}

interface HighlightedEventProps {
  event: HighlightedEventData;
  title?: string;
  onViewDetails?: () => void;
}

export function HighlightedEvent({ 
  event, 
  title = "Sự kiện nổi bật nhất",
  onViewDetails 
}: HighlightedEventProps) {
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

      {/* Highlighted Event Container */}
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="relative">
          {/* Main Image Container */}
          <div className="relative w-full h-[600px] rounded-xl overflow-hidden shadow-2xl">
            
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${event.image})` }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            </div>

            {/* Category Badge */}
            <div className="absolute top-6 right-6">
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-white">
                {event.category}
              </span>
            </div>

            {/* Event Details - Top Left */}
            <div className="absolute top-6 left-6 text-white max-w-md">
              <h3 className="text-3xl font-bold leading-tight mb-2">
                {event.title}
              </h3>
              <p className="text-gray-200 text-base mb-4">
                {event.description}
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-300">
                <span className="font-medium">{event.date}</span>
                <span>{event.location}</span>
              </div>
            </div>

            {/* View Details Button - Bottom Center */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
              <button
                onClick={onViewDetails}
                className="px-4 py-2 rounded-xl font-semibold text-black transition-opacity duration-200 hover:opacity-90"
                style={{
                  background: 'rgba(255, 255, 255, 1)',
                  border: '2px solid rgba(187, 185, 255, 1)',
                  boxShadow: '2px 2px 4px 0px rgba(0, 0, 0, 0.25) inset, 3px 3px 2.1px 0px rgba(0, 0, 0, 0.25)'
                }}
              >
                Xem chi tiết tại đây
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sample highlighted event data for demonstration
export const sampleHighlightedEvent: HighlightedEventData = {
  id: 1,
  title: "BeSpace Music Festival 2025",
  description: "Lễ hội âm nhạc lớn nhất năm với những nghệ sĩ hàng đầu thế giới và hơn 50.000 khán giả tham dự",
  date: "15-17.03.2025",
  location: "Công viên Tao Đàn, TP.HCM",
  image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=400&fit=crop",
  category: "Âm nhạc"
};
