// Application Routes
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  
  // Authentication
  LOGIN: '/login',
  REGISTER: '/register',
  LOGOUT: '/logout',
  
  // Dashboard/Protected Routes
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  
  // Users
  USERS: '/users',
  USER_DETAIL: (id: string) => `/users/${id}`,
  
  // Example: Posts
  POSTS: '/posts',
  POST_DETAIL: (id: string) => `/posts/${id}`,
  POST_CREATE: '/posts/create',
  POST_EDIT: (id: string) => `/posts/${id}/edit`,
  
  // Error pages
  NOT_FOUND: '/404',
  SERVER_ERROR: '/500',
} as const;

// Navigation items for menus
export const NAVIGATION_ITEMS = [
  { path: ROUTES.HOME, label: 'Home', icon: 'home' },
  { path: ROUTES.ABOUT, label: 'About', icon: 'info' },
  { path: ROUTES.CONTACT, label: 'Contact', icon: 'mail' },
] as const;

export const PROTECTED_NAVIGATION_ITEMS = [
  { path: ROUTES.DASHBOARD, label: 'Dashboard', icon: 'dashboard' },
  { path: ROUTES.USERS, label: 'Users', icon: 'users' },
  { path: ROUTES.POSTS, label: 'Posts', icon: 'document' },
  { path: ROUTES.PROFILE, label: 'Profile', icon: 'user' },
  { path: ROUTES.SETTINGS, label: 'Settings', icon: 'settings' },
] as const;
