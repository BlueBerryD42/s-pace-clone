import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MobileIcon, 
  EnvelopeClosedIcon, 
  InfoCircledIcon,
  PersonIcon,
  Share1Icon 
} from '@radix-ui/react-icons';
import { ROUTES } from '../../constants/routes';

export function Footer() {
  return (
    <footer 
      className="text-white py-12"
      style={{
        background: 'linear-gradient(90deg, rgba(5, 4, 30, 0.6) 0%, rgba(177, 174, 255, 0.33) 100%)'
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-5 gap-8 items-start justify-center">
          {/* Column 1: Logo and Description */}
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="/Logo_White.svg" 
                alt="S-PACE Logo" 
                className="h-8 w-auto mr-3"
              />
            </div>
            <p className="text-gray-200 max-w-sm text-sm leading-relaxed mb-6">
              Trang web giúp tuyển dụng công tác viên cho 
              các sự kiện lớn & quản lý nhân sự hiệu quả
            </p>
            <p className="text-gray-300 text-xs">
              © 2025 - Bản quyền thuộc về Công ty TNHH S-PACE
            </p>
          </div>
          
          {/* Column 2: Contact Information */}
          <div>
            <div className="flex items-center mb-4">
              <MobileIcon className="w-4 h-4 mr-2 text-white" />
              <h3 className="font-semibold text-white">Hotline</h3>
            </div>
            <p className="text-white font-bold text-lg mb-4">1900 9999</p>
            
            <div className="flex items-center mb-2">
              <EnvelopeClosedIcon className="w-4 h-4 mr-2 text-white" />
              <h3 className="font-semibold text-white">Email</h3>
            </div>
            <p className="text-gray-200 text-sm">s-pace@gmail.com</p>
          </div>
          
          {/* Column 3: About Us */}
          <div>
            <div className="flex items-center mb-4">
              <InfoCircledIcon className="w-4 h-4 mr-2 text-white" />
              <h3 className="font-semibold text-white">Về chúng tôi</h3>
            </div>
            <ul className="space-y-2 text-gray-200 text-sm">
              <li>
                <Link to={ROUTES.ABOUT} className="hover:text-white transition-colors">
                  Quy chế hoạt động
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Chính sách bảo mật thông tin
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 4: User Categories */}
          <div>
            <div className="flex items-center mb-4">
              <PersonIcon className="w-4 h-4 mr-2 text-white" />
              <h3 className="font-semibold text-white">Dành cho Cộng tác viên</h3>
            </div>
            <p className="text-gray-200 text-sm mb-4">
              Điều khoản sử dụng cho Cộng tác viên
            </p>
            
            <h3 className="font-semibold mb-2 text-white">Dành cho Ban tổ chức</h3>
            <p className="text-gray-200 text-sm">
              Điều khoản sử dụng cho Ban tổ chức
            </p>
          </div>
          
          {/* Column 5: Social Media */}
          <div>
            <div className="flex items-center mb-4">
              <Share1Icon className="w-4 h-4 mr-2 text-white" />
              <h3 className="font-semibold text-white">Follow us</h3>
            </div>
            <div className="space-y-3">
              <a 
                href="#" 
                className="flex items-center text-gray-200 hover:text-white transition-colors text-sm"
              >
                <div className="w-5 h-5 bg-blue-600 rounded mr-3 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">f</span>
                </div>
                Facebook
              </a>
              <a 
                href="#" 
                className="flex items-center text-gray-200 hover:text-white transition-colors text-sm"
              >
                <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded mr-3 flex items-center justify-center">
                  <span className="text-white text-xs">📷</span>
                </div>
                Instagram
              </a>
              <a 
                href="#" 
                className="flex items-center text-gray-200 hover:text-white transition-colors text-sm"
              >
                <div className="w-5 h-5 bg-black rounded mr-3 flex items-center justify-center">
                  <span className="text-white text-xs">♪</span>
                </div>
                Tiktok
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
