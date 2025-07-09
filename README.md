# NeighborFit+ 🏘️

A full-stack web application that helps users find the best neighborhoods in India based on their lifestyle preferences, powered by Google's Gemini AI.

## 🚀 Features

- **Gemini AI Integration**: Advanced AI analysis for personalized neighborhood recommendations
- **Comprehensive Form**: Age, gender, lifestyle, budget, family size, work location, and priorities
- **Punjab Focus**: Special coverage of Punjab localities including Chandigarh, Ludhiana, Amritsar
- **Smart Matching**: Considers personal demographics and lifestyle preferences
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Fallback System**: Rule-based matching when AI is unavailable

## 🛠️ Tech Stack

- **Frontend**: React.js with React Router
- **Backend**: Node.js + Express.js
- **AI**: Google Gemini AI
- **Styling**: Modular CSS with single-class methodology
- **Security**: Helmet, CORS, Rate limiting

## 📁 Project Structure

\`\`\`
neighborfit/
├── frontend/                      # React Frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/            # Reusable Components
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/                 # Route Pages
│   │   │   ├── Home.jsx
│   │   │   ├── Form.jsx
│   │   │   ├── Results.jsx
│   │   │   ├── About.jsx
│   │   │   └── Contact.jsx
│   │   ├── styles/                # CSS files (single-class methodology)
│   │   │   ├── navbar.css
│   │   │   ├── footer.css
│   │   │   ├── home.css
│   │   │   ├── form.css
│   │   │   ├── results.css
│   │   │   ├── about.css
│   │   │   └── contact.css
│   │   ├── App.jsx                # Main app with routing
│   │   └── index.js               # React DOM render
│   ├── .env                       # Frontend env variables
│   └── package.json               # React dependencies
├── backend/                       # Node.js Express Backend
│   ├── routes/
│   │   └── recommend.js           # POST /api/recommend
│   ├── controllers/
│   │   └── recommendController.js # Logic for generating recommendations
│   ├── utils/
│   │   └── aiPromptBuilder.js     # Builds AI prompt dynamically
│   ├── index.js                   # Server entry point
│   ├── .env                       # Backend environment (PORT, API_KEY)
│   └── package.json               # Backend dependencies
├── .gitignore
├── README.md
└── package.json                   # Root package with scripts
\`\`\`

## 🏙️ Covered Neighborhoods

### Delhi & NCR
- **Connaught Place** - Commercial heart with metro connectivity
- **Hauz Khas** - Trendy area with nightlife and culture
- **Lajpat Nagar** - Budget-friendly with great markets
- **Gurgaon Sector 29** - Corporate hub with entertainment

### Mumbai
- **Bandra West** - Entertainment capital with upscale dining
- **Andheri West** - Well-connected with airport proximity
- **Powai** - Planned township with tech companies

### Bengaluru
- **Koramangala** - Startup ecosystem hub
- **Indiranagar** - Vibrant nightlife and cafes
- **Whitefield** - Major IT corridor

### Punjab 🏛️
- **Sector 17, Chandigarh** - Commercial heart of the planned city
- **Model Town, Ludhiana** - Family-friendly residential area
- **Lawrence Road, Amritsar** - Near Golden Temple, cultural significance
- **Civil Lines, Jalandhar** - Upscale residential with good infrastructure
- **Urban Estate, Patiala** - Modern amenities and peaceful environment

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Gemini AI API key

### Installation

1. **Clone the repository**
\`\`\`bash
git clone <repository-url>
cd neighborfit
\`\`\`

2. **Install all dependencies**
\`\`\`bash
npm run install:all
\`\`\`

3. **Set up environment variables**

Frontend (\`frontend/.env\`):
\`\`\`env
REACT_APP_API_URL=http://localhost:5000
\`\`\`

Backend (\`backend/.env\`):
\`\`\`env
PORT=5000
FRONTEND_URL=http://localhost:3000
GEMINI_API_KEY=your_gemini_api_key_here
\`\`\`

4. **Run the development servers**
\`\`\`bash
npm run dev
\`\`\`

5. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🎯 How It Works

### 1. User Input
Users provide comprehensive information:
- **Personal Details**: Age, gender, family size
- **Lifestyle Preferences**: 12 different lifestyle categories
- **Location Preferences**: Preferred cities and work location
- **Budget**: Monthly rent budget range
- **Priorities**: What matters most (safety, schools, transport, etc.)

### 2. AI Analysis
- **Gemini AI** analyzes user preferences against neighborhood data
- **Smart Scoring** considers demographics, lifestyle, and priorities
- **Personalized Reasoning** explains why each neighborhood matches

### 3. Results
- **Top 3 Recommendations** with match percentages
- **Detailed Insights** about each neighborhood
- **AI-Generated Reasoning** for each recommendation
- **Comprehensive Data** including rent, safety, connectivity scores

## 🎨 CSS Architecture

- **Single-Class Methodology**: Each CSS rule uses only one class selector
- **Modular Structure**: Separate CSS file for each component/page
- **Responsive Design**: Mobile-first approach with breakpoints
- **Consistent Naming**: Clear, descriptive class names


## 🤖 AI Integration

### Gemini AI Features
- **Natural Language Processing** for user preference analysis
- **Contextual Understanding** of Indian neighborhoods and culture
- **Personalized Recommendations** based on comprehensive user profiles
- **Fallback System** with rule-based matching

### API Usage
\`\`\`javascript
const model = genAI.getGenerativeModel({ model: "gemini-pro" })
const result = await model.generateContent(prompt)
\`\`\`

## 🔒 Security Features

- **Helmet.js** for security headers
- **CORS** protection with specific origins
- **Rate Limiting** to prevent API abuse
- **Input Validation** for all user data
- **Environment Variables** for sensitive data

## 📱 Responsive Design

- **Mobile-First** CSS approach
- **Flexible Grid** layouts that adapt to screen size
- **Touch-Friendly** interfaces for mobile users
- **Optimized Performance** across all devices

## 🚀 Deployment

### Frontend (Vercel/Netlify)
\`\`\`bash
cd frontend
npm run build
\`\`\`

### Backend (Railway/Heroku)
\`\`\`bash
cd backend
npm start
\`\`\`

### Environment Variables for Production
- Set \`GEMINI_API_KEY\` in your hosting platform
- Update \`FRONTEND_URL\` and \`REACT_APP_API_URL\` accordingly

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Follow the single-class CSS methodology
4. Test with different user profiles
5. Commit changes (\`git commit -m 'Add amazing feature'\`)
6. Push to branch (\`git push origin feature/amazing-feature\`)
7. Open a Pull Request

## 📈 Future Enhancements

- [ ] **MongoDB Integration** for scalable data storage
- [ ] **User Authentication** to save preferences and history
- [ ] **Real Estate API** integration for live rent data
- [ ] **Google Maps** integration for location visualization
- [ ] **More Punjab Cities** (Mohali, Bathinda, Pathankot)
- [ ] **Commute Calculator** based on work location
- [ ] **Neighborhood Photos** and virtual tours
- [ ] **User Reviews** and ratings system

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for intelligent recommendations
- **Punjab Tourism** for locality information
- **Indian Real Estate** data sources
- **React Community** for excellent documentation

---

**Made with ❤️ for finding your perfect neighborhood in India**

*Powered by Gemini AI | Focused on Punjab & Major Indian Cities*

Perfect! I've created the complete NeighborFit+ project with all the features you requested:

## ✅ **What's Included**

### **🎨 Complete CSS Files** (Single-Class Methodology)
- `navbar.css` - Navigation with mobile menu
- `footer.css` - Comprehensive footer with links
- `home.css` - Hero section with animations
- `form.css` - Enhanced form with validation styles
- `results.css` - Beautiful results cards with AI insights
- `about.css` - Professional about page
- `contact.css` - Contact form with FAQ section

### **🤖 Gemini AI Integration Only**
- Removed all OpenAI references
- Pure Gemini AI implementation
- Intelligent fallback system
- Enhanced prompt engineering

### **🏛️ Punjab Localities Added**
- **Chandigarh** (Sector 17)
- **Ludhiana** (Model Town)
- **Amritsar** (Lawrence Road)
- **Jalandhar** (Civil Lines)
- **Patiala** (Urban Estate)

### **📱 Enhanced Features**
- Comprehensive form with age, gender, lifestyle
- Smart AI analysis with personalized reasoning
- Responsive design with mobile-first approach
- Security features (Helmet, CORS, Rate limiting)
- Error handling and loading states

The project is now complete with proper directory structure, single-class CSS methodology, and Gemini AI integration. Ready to run with `npm run dev`!

## Backend Setup

1. Install dependencies:
   ```sh
   npm install
   npm install nodemailer
   npm install mongoose
   ```

2. (Optional) Seed the database:
   ```sh
   npm run seed
   ```

## Frontend Setup (if using TypeScript)

If you are using TypeScript in the frontend, install React types:
```sh
npm install --save-dev @types/react @types/react-dom --legacy-peer-deps
```
