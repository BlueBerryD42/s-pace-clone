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

interface ForYouProps {
  events: EventData[];
  title?: string;
  onEventClick?: (event: EventData) => void;
}

export function ForYou({ 
  events, 
  title = "Dành cho bạn",
  onEventClick 
}: ForYouProps) {
  // Display maximum 8 events (4 columns x 2 rows)
  const displayEvents = events.slice(0, 8);

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

      {/* Events Grid */}
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

// Sample data for ForYou section
export const sampleForYouEvents: EventData[] = [
  {
    id: 1,
    title: "SAIGON TALK 9 | PERSONA.LIZE: BE REAL TRƯỚC, BE TECH SAU",
    description: "Sự kiện công nghệ về AI và personalization",
    date: "02 tháng 07, 2025",
    location: "TP.HCM",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
    category: "Công nghệ"
  },
  {
    id: 2,
    title: "BÁNH BÈO BABEL | A ONE - WOMAN VARIETY SHOW",
    description: "Show giải trí đa dạng với nghệ sĩ nữ",
    date: "28 tháng 06, 2025",
    location: "Hà Nội",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop",
    category: "Giải trí"
  },
  {
    id: 3,
    title: "MUSICALAND FESTIVAL 2025",
    description: "Lễ hội nhạc kịch quốc tế",
    date: "12 tháng 07, 2025",
    location: "Capital Theatre, TP.HCM",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
    category: "Âm nhạc"
  },
  {
    id: 4,
    title: "SUMMER TOUR | NHỮNG THÀNH PHỐ MƠ MÀNG",
    description: "Tour âm nhạc mùa hè",
    date: "28 tháng 06, 2025",
    location: "TP.HCM",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop",
    category: "Âm nhạc"
  },
  {
    id: 5,
    title: "7UP WONDER SPLASH CONCERT",
    description: "Concert âm nhạc mùa hè",
    date: "28 tháng 06, 2025",
    location: "Công viên Grand Park",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&h=300&fit=crop",
    category: "Âm nhạc"
  },
  {
    id: 6,
    title: "TẾU MẶT NGU | SHOW HÀI ĐỘC THOẠI",
    description: "Show hài độc thoại",
    date: "12 tháng 07, 2025",
    location: "TP.HCM",
    image: "https://images.unsplash.com/photo-1516307365426-bea591f05011?w=400&h=300&fit=crop",
    category: "Giải trí"
  },
  {
    id: 7,
    title: "HOME IN HARMONY",
    description: "Sự kiện âm nhạc hòa hợp",
    date: "28 tháng 07, 2025",
    location: "Showroom Everichen",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop",
    category: "Âm nhạc"
  },
  {
    id: 8,
    title: "AQUAFINA | ART OF PURITY - TRIỂN LÃM & TƯƠNG TÁC NGHỆ THUẬT",
    description: "Triển lãm nghệ thuật tương tác",
    date: "28 tháng 06, 2025",
    location: "Galerie Quynh",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    category: "Nghệ thuật"
  }
];
