import React from 'react';

interface EventData {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
  category: string;
}

interface MaybeYouLikeProps {
  events: EventData[];
  title?: string;
  onEventClick?: (event: EventData) => void;
}

export function MaybeYouLike({ 
  events, 
  title = "Có thể bạn thích",
  onEventClick 
}: MaybeYouLikeProps) {
  // Display maximum 4 events (1 row x 4 columns)
  const displayEvents = events.slice(0, 4);

  return (
    <div className="relative py-2" style={{ background: 'transparent' }}>
      
      {/* Title */}
      <div className="flex items-center justify-start mb-8 relative z-10 max-w-8xl mx-auto px-4">
        <div 
          className="px-4 py-2 rounded-full font-semibold"
          style={{
            background: 'rgba(255, 255, 255, 1)',
            border: '2px solid rgba(187, 185, 255, 1)',
            boxShadow: '2px 2px 4px 0px rgba(0, 0, 0, 0.25) inset, 3px 3px 2.1px 0px rgba(0, 0, 0, 0.25)'
          }}
        >
          <h2 className="text-black font-semibold text-lg">{title}</h2>
        </div>
      </div>

      {/* Events Grid - Single Row */}
      <div className="relative max-w-full mx-auto px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayEvents.map((event) => (
            <div 
              key={event.id} 
              className="group cursor-pointer"
              onClick={() => onEventClick?.(event)}
            >
              {/* Event Card */}
              <div className="h-80 bg-transparent rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden">
                
                {/* Image Section */}
                <div 
                  className="h-48 bg-cover bg-center rounded-xl m-2"
                  style={{ backgroundImage: `url(${event.image})` }}
                />

                {/* Content Section */}
                <div className="flex flex-col justify-between h-28 px-4 pb-4 bg-transparent">
                  {/* Event Title */}
                  <h3 className="text-lg font-bold leading-tight line-clamp-2 text-white">
                    {event.title}
                  </h3>
                  
                  {/* Event Date - Always at bottom */}
                  <div className="flex items-center gap-2 text-sm text-gray-300 mt-auto">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium">{event.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Sample data for MaybeYouLike section
export const sampleMaybeYouLikeEvents: EventData[] = [
  {
    id: 9,
    title: "INDIE MUSIC SHOWCASE",
    description: "Showcase âm nhạc indie với các nghệ sĩ trẻ",
    date: "15 tháng 08, 2025",
    location: "TP.HCM",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
    category: "Âm nhạc"
  },
  {
    id: 10,
    title: "PHOTOGRAPHY WORKSHOP",
    description: "Workshop chụp ảnh chuyên nghiệp",
    date: "20 tháng 08, 2025",
    location: "Hà Nội",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=300&fit=crop",
    category: "Nghệ thuật"
  },
  {
    id: 11,
    title: "FOOD FESTIVAL 2025",
    description: "Lễ hội ẩm thực đa văn hóa",
    date: "25 tháng 08, 2025",
    location: "Đà Nẵng",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
    category: "Ẩm thực"
  },
  {
    id: 12,
    title: "STARTUP PITCH NIGHT",
    description: "Đêm thuyết trình startup",
    date: "30 tháng 08, 2025",
    location: "TP.HCM",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
    category: "Kinh doanh"
  }
];
