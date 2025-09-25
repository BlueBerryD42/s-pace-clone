import { Link } from 'react-router-dom';
import { Button, EventCarousel, sampleEvents, HighlightedEvent, sampleHighlightedEvent, ForYou, sampleForYouEvents, MaybeYouLike, sampleMaybeYouLikeEvents } from '../components/common';
import { ROUTES } from '../constants/routes';
import { useAuthContext } from '../contexts/AuthContext';

export function HomePage() {
  const { isAuthenticated } = useAuthContext();

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundColor: 'rgba(10, 9, 38, 1)',
        backgroundImage: 'url(/background.png)',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover'
      }}
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden py-10">
        <div className="background-transparent"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white sm:text-5xl md:text-6xl mb-8 drop-shadow-lg">
              Sự kiện thì bạn cứ bay,<br />
              Việc còn lại để{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                S-PACE
              </span>{' '}
              lo ngay !
            </h1>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-gray-200 mb-4 drop-shadow-md font-semibold">
                S-PACE – Kết nối cộng tác viên & nhà tổ chức sự kiện thông minh.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed drop-shadow-md">
                Nền tảng không chỉ giúp người dùng tìm sự kiện dễ dàng, nhận chứng nhận uy tín mà còn giúp cộng tác viên và ban tổ chức quản lý nhân sự sự kiện hiệu quả hơn, chuyên nghiệp hơn – tất cả trên một nền tảng duy nhất.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Highlighted Event Section */}
      <div>
        <HighlightedEvent 
          event={sampleHighlightedEvent}
          onViewDetails={() => console.log('View details clicked')}
        />
      </div>

      {/* Event Carousel Section */}
      <div>
        <EventCarousel events={sampleEvents} title="Sự kiện xu hướng" />
      </div>

      {/* ForYou Section */}
      <div>
        <ForYou 
          events={sampleForYouEvents}
          onEventClick={(event) => console.log('Event clicked:', event)}
        />
      </div>

      {/* MaybeYouLike Section */}
      <div>
        <MaybeYouLike 
          events={sampleMaybeYouLikeEvents}
          onEventClick={(event) => console.log('Maybe you like event clicked:', event)}
        />
      </div>

      {/* CTA Section */}
      {isAuthenticated && (
        <div className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Chào mừng trở lại!</h2>
            <p className="text-xl text-purple-100 mb-8">Khám phá những nội dung mới nhất dành riêng cho bạn</p>
            <div className="space-x-4">
              <Link to={ROUTES.DASHBOARD}>
                <Button variant="secondary" size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                  Đi tới Dashboard
                </Button>
              </Link>
              <Link to={ROUTES.USERS}>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-purple-600">
                  Xem người dùng
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
