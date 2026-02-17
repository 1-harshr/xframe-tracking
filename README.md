# Embedded Website Viewer

A modern web application that embeds websites with geolocation tracking and IP logging capabilities.

## Features

- 🌐 **Website Embedding**: Embed any website via query parameters
- ⚡ **Instant Load**: Website loads immediately, no loading screens
- 📍 **Geolocation Tracking**: Automatically requests and logs user location (browser native prompt)
- 🔍 **IP Address Logging**: Fetches and logs user IP address with additional information
- 🎨 **Clean Interface**: No custom UI, just the embedded website fullscreen
- 📱 **Responsive**: Works on all devices
- 🔒 **Secure**: Sandboxed iframe for security

## Usage

### Basic Usage

Open the application with a URL query parameter:

```
index.html?url=https://example.com
```

### Query Parameters

The application accepts the following query parameters for the website URL:
- `url` - Primary parameter (recommended)
- `website` - Alternative parameter
- `site` - Alternative parameter

**Examples:**
```
index.html?url=https://google.com
index.html?website=https://github.com
index.html?site=https://stackoverflow.com
```

## Logging

The application logs the following information to the browser console:

### 1. IP Address (Logged First)
```javascript
✅ IP Address: 123.456.789.012
📍 IP Information: {
  ip: "123.456.789.012",
  city: "San Francisco",
  region: "California",
  country: "United States",
  countryCode: "US",
  timezone: "America/Los_Angeles",
  org: "Example ISP"
}
```

### 2. Geolocation (Logged After Permission)
```javascript
✅ Geolocation permission granted
📍 Location Data: {
  latitude: 37.7749,
  longitude: -122.4194,
  accuracy: "20 meters",
  altitude: null,
  altitudeAccuracy: null,
  heading: null,
  speed: null,
  timestamp: "2026-02-17T04:26:16.000Z"
}
🗺️ View on Google Maps: https://www.google.com/maps?q=37.7749,-122.4194
```

## Local Development

### Running Locally

1. **Using Python 3:**
   ```bash
   python3 -m http.server 8000
   ```

2. **Using Node.js (http-server):**
   ```bash
   npx http-server -p 8000
   ```

3. **Using PHP:**
   ```bash
   php -S localhost:8000
   ```

Then open: `http://localhost:8000?url=https://example.com`

### Testing

Test with different websites:
```bash
# Google
http://localhost:8000?url=https://google.com

# GitHub
http://localhost:8000?url=https://github.com

# Stack Overflow
http://localhost:8000?url=https://stackoverflow.com
```

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Security Features

- **Sandboxed iframe**: Prevents malicious scripts from accessing parent page
- **HTTPS recommended**: For geolocation to work properly
- **No data storage**: All logging is console-only, no data is stored

## Privacy Notes

- Geolocation permission is requested automatically on page load
- Users can deny geolocation permission - the app will still work
- IP address is fetched from public APIs
- All data is logged to console only - nothing is sent to external servers
- No cookies or local storage used

## Troubleshooting

### Geolocation not working
- Ensure you're using HTTPS (required by most browsers)
- Check browser permissions for location access
- Some browsers block geolocation in iframes

### Website not loading
- Check if the target website allows iframe embedding (X-Frame-Options)
- Some websites block embedding for security reasons
- Try a different website to test

### Console logs not appearing
- Open browser developer tools (F12)
- Check the Console tab
- Ensure JavaScript is enabled

## API Services Used

- **IP Address**: [ipify.org](https://www.ipify.org/) - Free IP address API
- **IP Information**: [ipapi.co](https://ipapi.co/) - Free IP geolocation API
- **Geolocation**: Browser's native Geolocation API

## License

MIT License - Feel free to use and modify as needed.
# xframe-tracking
