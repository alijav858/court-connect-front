# SportBook - Setup Instructions

## Complete Frontend Setup for Local Development

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation Steps

1. **Download/Clone the Project**
   - Download all project files to your local machine
   - Ensure the folder structure is maintained

2. **Install Dependencies**
   ```bash
   cd sportbook-frontend
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   - Navigate to `http://localhost:5173`
   - The application should load with the landing page

### Project Features

#### Customer Features (Dashboard)
- **Book Now Button**: Click to open comprehensive booking form
- **Venue Selection**: Choose from available venues and courts
- **Date/Time Selection**: Pick preferred slots
- **Player Information**: Add player details and special requirements
- **Payment**: Enter payment information for 20% advance booking
- **Booking Management**: View upcoming and past bookings
- **Favorites**: Save preferred venues

#### Venue Owner Features (VenueOwner Dashboard)
- **Add New Venue**: Click to open venue registration form
- **Venue Details**: Complete business and venue information
- **Court Management**: Add multiple courts with pricing
- **Sports Configuration**: Select sports offered
- **Amenities**: Configure available facilities
- **Document Upload**: Business license and certificates
- **Booking Management**: View and manage customer reservations

#### Additional Pages
- **Landing Page**: Hero section with search and featured venues
- **Browse Venues**: Filter and search all available venues
- **Authentication**: Login/register for different user types
- **Admin Dashboard**: Platform management (users, venues, bookings)
- **About Us**: Company information
- **Contact**: Contact form and details

### Form Functionality

Both main forms include:
- **Real-time Validation**: Immediate feedback on form fields
- **Required Field Checking**: Ensures all necessary information is provided
- **Toast Notifications**: Success/error messages for user actions
- **Responsive Design**: Works on all device sizes

### Design System

The application uses a cohesive design with:
- **Primary Color**: Emerald Green (#10B981)
- **Secondary Color**: Professional Blue (#3B82F6)  
- **Accent Color**: Orange (#F97316)
- **Typography**: Clean, readable fonts
- **Components**: shadcn/ui component library
- **Icons**: Lucide React icons

### File Structure

```
sportbook-frontend/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── common/        # VenueCard, SportFilter
│   │   ├── forms/         # BookingForm, VenueRegistrationForm
│   │   ├── layout/        # Header, Footer
│   │   └── ui/           # shadcn/ui components
│   ├── pages/            # All page components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   └── assets/           # Images and media
├── package.json          # Dependencies and scripts
├── tailwind.config.ts    # Tailwind configuration
├── vite.config.ts        # Vite configuration
└── tsconfig.json         # TypeScript configuration
```

### Testing the Application

1. **Customer Flow**:
   - Visit the Dashboard page
   - Click "Book Now"
   - Fill in the booking form
   - Test form validation and submission

2. **Venue Owner Flow**:
   - Visit the VenueOwner page
   - Click "Add New Venue"
   - Complete the venue registration form
   - Test all form sections and validation

3. **Navigation**:
   - Test all navigation links
   - Verify responsive design on different screen sizes
   - Check that all pages load correctly

### Build for Production

```bash
npm run build
```

This creates a `dist` folder with production-ready files.

### Preview Production Build

```bash
npm run preview
```

### Troubleshooting

1. **Dependencies Issues**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Port Already in Use**:
   - Check if port 5173 is available
   - Kill any processes using the port
   - Or specify a different port: `npm run dev -- --port 3000`

3. **TypeScript Errors**:
   - Ensure all imports are correct
   - Check that all components are properly exported

### Next Steps

This is a complete frontend application that demonstrates:
- Modern React development practices
- Comprehensive form handling
- Responsive design implementation
- Component-based architecture
- TypeScript usage
- Tailwind CSS styling

For production deployment, you would need to:
- Connect to a real backend API
- Implement actual payment processing
- Add user authentication
- Set up database integration
- Configure hosting and deployment

The current implementation provides a fully functional frontend that can be extended with backend services as needed.