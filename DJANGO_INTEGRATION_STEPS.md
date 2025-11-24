# Django Integration Steps for Venue Details Page

## Step 1: Build the React Frontend

```bash
npm run build
```

This creates a `dist/` folder with all compiled files.

## Step 2: Copy Files to Django

### A. Copy the new index.html
```bash
cp dist/index.html your_django_project/frontend/templates/index.html
```

### B. Copy updated assets
```bash
# Remove old assets
rm -rf your_django_project/frontend/static/assets/

# Copy new assets
cp -r dist/assets/ your_django_project/frontend/static/assets/
```

## Step 3: Update Django URLs (if not already done)

Your `urls.py` should have a catch-all route at the END:

```python
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),  # Your API endpoints
    
    # Catch-all for React Router - MUST BE LAST
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

## Step 4: Update frontend/templates/index.html

Open `your_django_project/frontend/templates/index.html` and replace all asset paths:

**Before:**
```html
<link rel="stylesheet" crossorigin href="/assets/index-abc123.css">
<script type="module" crossorigin src="/assets/index-xyz789.js"></script>
```

**After:**
```html
{% load static %}
<link rel="stylesheet" crossorigin href="{% static 'assets/index-abc123.css' %}">
<script type="module" crossorigin src="{% static 'assets/index-xyz789.js' %}"></script>
```

**Important:** Update ALL paths in the file (CSS, JS, preload links, modulepreload).

## Step 5: Create Django API Endpoints

Create `your_django_project/api/views.py`:

```python
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Venue, Court
from .serializers import VenueSerializer, VenueDetailSerializer

@api_view(['GET'])
def venue_list(request):
    """List all venues with filters"""
    venues = Venue.objects.all()
    
    # Apply filters
    sport = request.GET.get('sport')
    if sport:
        venues = venues.filter(sports__contains=sport)
    
    location = request.GET.get('location')
    if location:
        venues = venues.filter(location__icontains=location)
    
    serializer = VenueSerializer(venues, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def venue_detail(request, venue_id):
    """Get detailed venue information"""
    try:
        venue = Venue.objects.get(id=venue_id)
        serializer = VenueDetailSerializer(venue)
        return Response(serializer.data)
    except Venue.DoesNotExist:
        return Response({'error': 'Venue not found'}, status=404)

@api_view(['POST'])
def create_booking(request):
    """Create a new booking"""
    # Add booking logic here
    return Response({'message': 'Booking created successfully'})
```

## Step 6: Create Django Models

Create `your_django_project/api/models.py`:

```python
from django.db import models
from django.contrib.postgres.fields import ArrayField

class Venue(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=200)
    full_address = models.TextField()
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    rating = models.DecimalField(max_digits=2, decimal_places=1, default=0.0)
    review_count = models.IntegerField(default=0)
    price_range = models.CharField(max_length=50)
    sports = ArrayField(models.CharField(max_length=50), default=list)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class VenueImage(models.Model):
    venue = models.ForeignKey(Venue, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='venues/')
    is_primary = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

class Court(models.Model):
    venue = models.ForeignKey(Venue, related_name='courts', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    sport = models.CharField(max_length=50)
    price = models.CharField(max_length=50)
    capacity = models.CharField(max_length=50)
    features = ArrayField(models.CharField(max_length=100), default=list)
    
    def __str__(self):
        return f"{self.venue.name} - {self.name}"

class Amenity(models.Model):
    venue = models.ForeignKey(Venue, related_name='amenities', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=50)  # Store icon name from lucide-react

class Review(models.Model):
    venue = models.ForeignKey(Venue, related_name='reviews', on_delete=models.CASCADE)
    author = models.CharField(max_length=200)
    rating = models.IntegerField()
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
```

## Step 7: Create Serializers

Create `your_django_project/api/serializers.py`:

```python
from rest_framework import serializers
from .models import Venue, Court, VenueImage, Amenity, Review

class VenueImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = VenueImage
        fields = ['id', 'image', 'is_primary']

class CourtSerializer(serializers.ModelSerializer):
    class Meta:
        model = Court
        fields = ['id', 'name', 'sport', 'price', 'capacity', 'features']

class AmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Amenity
        fields = ['id', 'name', 'icon']

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'author', 'rating', 'comment', 'created_at']

class VenueSerializer(serializers.ModelSerializer):
    """Basic venue info for list view"""
    primary_image = serializers.SerializerMethodField()
    
    class Meta:
        model = Venue
        fields = ['id', 'name', 'location', 'rating', 'review_count', 
                  'price_range', 'sports', 'primary_image']
    
    def get_primary_image(self, obj):
        primary = obj.images.filter(is_primary=True).first()
        if primary:
            return primary.image.url
        first_image = obj.images.first()
        return first_image.image.url if first_image else None

class VenueDetailSerializer(serializers.ModelSerializer):
    """Detailed venue info for detail view"""
    images = VenueImageSerializer(many=True, read_only=True)
    courts = CourtSerializer(many=True, read_only=True)
    amenities = AmenitySerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    
    class Meta:
        model = Venue
        fields = '__all__'
```

## Step 8: Configure API URLs

Create/Update `your_django_project/api/urls.py`:

```python
from django.urls import path
from . import views

urlpatterns = [
    path('venues/', views.venue_list, name='venue-list'),
    path('venues/<int:venue_id>/', views.venue_detail, name='venue-detail'),
    path('bookings/', views.create_booking, name='create-booking'),
]
```

## Step 9: Update React to Use Django API

Create/Update `src/config/api.ts`:

```typescript
const API_BASE_URL = import.meta.env.PROD 
  ? '/api'  // Production: same domain
  : 'http://localhost:8000/api';  // Development: Django server

export const api = {
  getVenues: async (filters?: { sport?: string; location?: string }) => {
    const params = new URLSearchParams(filters as any);
    const response = await fetch(`${API_BASE_URL}/venues/?${params}`);
    return response.json();
  },
  
  getVenueDetails: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/venues/${id}/`);
    return response.json();
  },
  
  createBooking: async (bookingData: any) => {
    const response = await fetch(`${API_BASE_URL}/bookings/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });
    return response.json();
  }
};
```

## Step 10: Run Migrations

```bash
cd your_django_project
python manage.py makemigrations
python manage.py migrate
```

## Step 11: Collect Static Files

```bash
python manage.py collectstatic --noinput
```

## Step 12: Test the Integration

```bash
python manage.py runserver
```

Visit: `http://localhost:8000/venues` to see the venues list.
Click "View Details" to navigate to `http://localhost:8000/venues/1` (or any venue ID).

## Quick Reference: File Structure

```
your_django_project/
├── frontend/
│   ├── templates/
│   │   └── index.html          # React SPA entry ({% static %} tags)
│   └── static/
│       ├── assets/              # Compiled JS/CSS from dist/assets/
│       ├── favicon.ico
│       ├── placeholder.svg
│       └── robots.txt
├── api/
│   ├── models.py               # Venue, Court, Review, etc.
│   ├── serializers.py          # DRF serializers
│   ├── views.py                # API endpoints
│   └── urls.py                 # API routes
├── media/                      # User uploads (venue images)
└── manage.py
```

## Development Workflow

### Option 1: Separate Development (Recommended)
- Run React dev server: `npm run dev` (port 5173)
- Run Django server: `python manage.py runserver` (port 8000)
- React calls Django API at `http://localhost:8000/api`

### Option 2: Integrated Development
1. Make changes in React
2. Build: `npm run build`
3. Copy files to Django
4. Test: `python manage.py runserver`

## Production Checklist

- [ ] Set `DEBUG = False` in Django settings
- [ ] Configure `ALLOWED_HOSTS`
- [ ] Set up proper database (PostgreSQL)
- [ ] Configure CORS properly
- [ ] Set up static file serving (Nginx/Apache)
- [ ] Set up media file storage (S3/Cloud Storage)
- [ ] Enable HTTPS
- [ ] Set secure cookies and CSRF settings
- [ ] Run `collectstatic` before deployment

## Important Notes

1. **Route Order Matters**: The catch-all route (`re_path(r'^.*$', ...)`) MUST be the last URL pattern.
2. **Static Files**: Always update `{% static %}` tags after rebuilding React.
3. **API Prefix**: All Django API routes should start with `/api/` to avoid conflicts with React routes.
4. **CORS**: In development, use `django-cors-headers` to allow React dev server to call Django API.
5. **Media Files**: Venue images uploaded by users go to `MEDIA_ROOT`, not `static/`.
