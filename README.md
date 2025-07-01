# 🌟 Modern Portfolio Website

A responsive, feature-rich portfolio website built with React and modern web technologies. This project showcases my development skills through a clean, professional interface with real-time GitHub integration and advanced mobile optimization.

## 🚀 Live Demo

**[Visit Portfolio →](https://hhijazi.vercel.app)**

## 📋 Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Screenshots](#screenshots)
- [Project Structure](#project-structure)
- [Key Features Breakdown](#key-features-breakdown)
- [Installation & Setup](#installation--setup)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### 🎨 **Modern Design**
- Clean, professional UI with dark theme and gradient effects
- Smooth animations using AOS (Animate On Scroll)
- Mobile-first responsive design with breakpoint optimization
- Interactive components with hover effects and micro-interactions

### 📱 **Mobile Optimization**
- Touch-friendly interface with 44px minimum touch targets
- Optimized layouts for all screen sizes (xs, sm, md, lg, xl)
- Progressive typography scaling
- Enhanced mobile navigation and interactions

### 🔗 **GitHub API Integration**
- Real-time fetching of repositories from GitHub profile
- Automatic project updates when repositories are made public
- Smart filtering (public, non-forked, non-archived repos only)
- Caching system for improved performance

### 💬 **Interactive Features**
- Real-time comment system with Firebase integration
- Image upload support in comments
- Contact form with email integration
- Loading states and error handling

### 🏆 **Professional Sections**
- **Projects**: Dynamically loaded from GitHub repositories
- **Certificates**: Showcase of professional certifications
- **Tech Stack**: Visual representation of technical skills
- **About**: Personal introduction and background
- **Contact**: Professional contact form

## 🛠️ Technologies Used

### **Frontend Framework**
- **React 18** - Modern component-based UI library
- **Vite** - Fast build tool and development server
- **JavaScript ES6+** - Modern JavaScript features

### **Styling & UI**
- **Tailwind CSS** - Utility-first CSS framework
- **Material-UI (MUI)** - React component library
- **AOS** - Animate On Scroll library
- **Lucide React** - Beautiful SVG icons

### **Backend & Database**
- **Firebase** - Real-time database and authentication
- **Firestore** - NoSQL document database
- **Firebase Storage** - File upload and storage

### **APIs & Integration**
- **GitHub API** - Repository data fetching
- **EmailJS** - Contact form email service
- **SweetAlert2** - Beautiful alert messages

### **Development & Deployment**
- **Vercel** - Deployment and hosting platform
- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing

## 📸 Screenshots

> **Note**: Add screenshots of your website here to showcase the design

```
[Homepage Screenshot]
[Projects Section Screenshot]
[Mobile View Screenshot]
[Contact Form Screenshot]
```

## 📁 Project Structure

```
portfolio-website/
├── public/                 # Static assets
│   ├── icons/             # Technology icons
│   │   ├── certificates/      # Certificate images
│   │   └── images/           # General images
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   │   ├── CardProject.jsx
│   │   │   ├── Certificate.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ...
│   │   ├── Pages/            # Main page components
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Portofolio.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── ...
│   │   ├── services/         # API services
│   │   │   └── github.js     # GitHub API integration
│   │   ├── firebase.js      # Firebase configuration
│   │   ├── App.jsx          # Main application component
│   │   └── main.jsx         # Application entry point
│   ├── PROJECT_GUIDE.md     # GitHub integration guide
│   └── README.md           # Project documentation
```

## 🎯 Key Features Breakdown

### 🔄 **GitHub Integration**
- Automatically fetches public repositories
- Displays repository metadata (stars, forks, languages)
- Real-time updates when repositories change
- Caching for improved performance

### 📱 **Responsive Design**
- Mobile-first approach with progressive enhancement
- Custom breakpoints: xs (475px), sm, md, lg, xl
- Touch-optimized interactions
- Adaptive layouts for all screen sizes

### 🎨 **Animation System**
- Smooth page transitions
- Scroll-triggered animations
- Hover effects and micro-interactions
- Loading states and skeleton screens

### 💾 **Data Management**
- Firebase real-time database integration
- Local storage caching
- Error handling and fallback states
- Optimistic UI updates

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Git

### Clone the Repository
   ```bash  
git clone https://github.com/HH2631/portfolio-website.git
cd portfolio-website
   ```  

### Install Dependencies
   ```bash  
   npm install  
# or
yarn install
```

### Environment Setup
Create a `.env` file in the root directory:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Start Development Server
   ```bash  
   npm run dev  
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
# or
yarn build
```

## 🚀 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style
- ESLint configuration for code quality
- Prettier for code formatting
- Consistent component structure
- Modern React patterns (hooks, functional components)

## 🌐 Deployment

This project is deployed on **Vercel** with automatic deployments from the main branch.

### Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

### Manual Deployment
   ```bash  
   npm run build  
# Upload dist/ folder to your hosting provider
```

## 🎨 Customization

### Adding New Sections
1. Create new component in `src/Pages/`
2. Add routing in `App.jsx`
3. Update navigation in `Navbar.jsx`

### Styling Modifications
- Edit Tailwind configuration in `tailwind.config.js`
- Customize colors, fonts, and breakpoints
- Add new utility classes as needed

### GitHub Integration
- Update username in `src/services/github.js`
- Modify repository filtering logic
- Customize project display format

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### How to Contribute
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Hamzeh Hijazi**
- Portfolio: [hhijazi.vercel.app](https://hhijazi.vercel.app)
- GitHub: [@HH2631](https://github.com/HH2631)
- Email: [Contact through portfolio](https://hhijazi.vercel.app/#Contact)

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first approach
- Firebase for real-time capabilities
- Vercel for seamless deployment
- All open-source contributors

---

⭐ **If you found this project helpful, please give it a star!** ⭐

