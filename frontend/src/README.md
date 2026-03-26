# Frontend Project Structure

This project follows industry-standard best practices for React applications.

## 📁 Folder Structure

```
src/
├── components/              # Reusable components
│   ├── common/            # Shared business logic components
│   │   ├── ErrorBoundary.js
│   │   ├── ProtectedRoute.js
│   │   └── DebugInfo.js
│   ├── layout/            # Layout-specific components
│   │   ├── Sidebar.js
│   │   └── Topbar.js
│   ├── ui/               # Pure UI components
│   │   ├── Button.js
│   │   └── Loading.js
│   └── index.js          # Component exports
├── features/             # Feature-based modules
│   ├── auth/            # Authentication
│   │   └── components/
│   │       ├── Login.js
│   │       └── Register.js
│   ├── dashboard/        # Dashboard features
│   │   ├── Dashboard.js
│   │   ├── CareerGuidance.js
│   │   └── PerformanceAnalytics.js
│   ├── interview/       # Interview functionality
│   │   ├── InterviewHome.js
│   │   ├── MockInterview.js
│   │   ├── InterviewHistory.js
│   │   ├── InterviewResult.js
│   │   ├── InterviewReport.js
│   │   └── ResultFeedback.js
│   ├── job-match/       # Job matching
│   │   ├── JobMatch.js
│   │   ├── JobMatchHistory.js
│   │   ├── JobMatchAnalytics.js
│   │   ├── JobMatchReport.js
│   │   └── JobMatchResult.js
│   ├── landing/         # Landing page
│   │   ├── LandingPage.js
│   │   └── components/
│   │       ├── Hero.js
│   │       ├── Footer.js
│   │       ├── PublicNavbar.js
│   │       ├── Feature.js
│   │       ├── HowItWorks.js
│   │       ├── Stats.js
│   │       ├── Testimonials.js
│   │       └── CTA.js
│   └── resume/          # Resume management
│       ├── UploadResume.js
│       ├── MyResumes.js
│       └── ResumeAnalysis.js
├── hooks/               # Custom React hooks
│   ├── useAuth.js
│   └── useLocalStorage.js
├── services/            # API services
│   ├── authService.js
│   └── resumeService.js
├── constants/           # App constants
│   └── index.js
├── utils/               # Utility functions
│   └── api.js
├── types/               # Type definitions
│   └── index.js
├── assets/              # Static assets
├── styles/              # Global styles
│   ├── index.css
│   └── landingPage.css
├── App.test.js          # App tests
├── index.js             # App entry point
└── setupTests.js        # Test setup
```

## 🎯 Key Principles

1. **Feature-Based Architecture**: Related components, pages, and logic are grouped by feature
2. **Separation of Concerns**: UI, business logic, and data management are separated
3. **Reusability**: Common components are abstracted and reusable
4. **Scalability**: Easy to add new features without affecting existing code
5. **Maintainability**: Clear structure makes it easy to find and modify code

## 🔧 How to Use

### Importing Components
```javascript
// From components
import { Button, Loading } from '../components';

// From features
import Login from '../features/auth/components/Login';

// From hooks
import { useAuth } from '../hooks';

// From services
import { authService } from '../services';

// From constants
import { API_ENDPOINTS } from '../constants';
```

### Adding New Features
1. Create a new folder in `features/`
2. Add components, pages, and related logic
3. Export from feature index if needed
4. Update routing in main App component

### Adding New Components
- **Common**: Business logic components used across features
- **UI**: Pure presentational components
- **Layout**: Layout-specific components

## 📦 Dependencies

- **React**: UI library
- **React Router**: Client-side routing
- **Bootstrap**: CSS framework
- **Axios**: HTTP client
- **Chart.js**: Data visualization

## 🚀 Getting Started

1. Install dependencies: `npm install`
2. Start development server: `npm start`
3. Build for production: `npm run build`
4. Run tests: `npm test`

## 🧪 Testing

Tests are located alongside components using the `.test.js` suffix.
Run tests with `npm test` and maintain good test coverage.
