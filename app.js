/**
 * Embedded Website Viewer with Geolocation Tracking
 * Logs IP address and geolocation data to console
 */

// Configuration
const CONFIG = {
    ipApiUrl: 'https://api.ipify.org?format=json',
    ipInfoUrl: 'https://ipapi.co/json/',
    minLoadingTime: 1000 // Minimum loading screen display time
};

// State
let startTime = Date.now();

/**
 * Get URL parameter from query string
 * @param {string} param - Parameter name
 * @returns {string|null} Parameter value or null
 */
function getUrlParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

/**
 * Fetch and log IP address
 * @returns {Promise<string|null>} IP address or null
 */
async function fetchAndLogIP() {
    try {
        console.log('🌐 Fetching IP address...');

        // Try primary IP service
        const response = await fetch(CONFIG.ipApiUrl);
        const data = await response.json();
        const ipAddress = data.ip;

        console.log('✅ IP Address:', ipAddress);

        // Try to get additional IP information
        try {
            const ipInfoResponse = await fetch(CONFIG.ipInfoUrl);
            const ipInfo = await ipInfoResponse.json();

            console.log('📍 IP Information:', {
                ip: ipInfo.ip,
                city: ipInfo.city,
                region: ipInfo.region,
                country: ipInfo.country_name,
                countryCode: ipInfo.country_code,
                timezone: ipInfo.timezone,
                org: ipInfo.org
            });
        } catch (error) {
            console.log('ℹ️ Additional IP info not available');
        }

        return ipAddress;
    } catch (error) {
        console.error('❌ Error fetching IP address:', error);
        return null;
    }
}

/**
 * Request and log geolocation
 * @returns {Promise<GeolocationPosition|null>} Position or null
 */
function requestGeolocation() {
    return new Promise((resolve) => {
        if (!navigator.geolocation) {
            console.log('❌ Geolocation is not supported by this browser');
            resolve(null);
            return;
        }

        console.log('📍 Requesting geolocation permission...');

        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log('✅ Geolocation permission granted');
                console.log('📍 Location Data:', {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy + ' meters',
                    altitude: position.coords.altitude,
                    altitudeAccuracy: position.coords.altitudeAccuracy,
                    heading: position.coords.heading,
                    speed: position.coords.speed,
                    timestamp: new Date(position.timestamp).toISOString()
                });

                // Log Google Maps link for convenience
                const mapsUrl = `https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`;
                console.log('🗺️ View on Google Maps:', mapsUrl);

                resolve(position);
            },
            (error) => {
                console.log('❌ Geolocation permission denied or error occurred');
                console.log('Error details:', {
                    code: error.code,
                    message: error.message
                });
                resolve(null);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    });
}

/**
 * Load embedded website
 * @param {string} url - Website URL to embed
 */
function loadEmbeddedSite(url) {
    const iframe = document.getElementById('embedded-site');

    console.log('🌐 Loading embedded website:', url);

    // Set iframe source - loads immediately
    iframe.src = url;

    // Handle iframe load
    iframe.addEventListener('load', () => {
        console.log('✅ Embedded website loaded successfully');
    });

    // Handle iframe errors
    iframe.addEventListener('error', () => {
        console.error('❌ Error loading embedded website');
    });
}

/**
 * Initialize application
 */
async function init() {
    console.log('🚀 Application started');
    console.log('⏰ Timestamp:', new Date().toISOString());

    // Get website URL from query parameter
    const websiteUrl = getUrlParameter('url') || getUrlParameter('website') || getUrlParameter('site');

    if (!websiteUrl) {
        console.error('❌ No website URL provided in query parameters');
        console.error('Usage: ?url=https://example.com');
        return;
    }

    console.log('🎯 Target URL:', websiteUrl);

    // Load embedded website immediately
    loadEmbeddedSite(websiteUrl);

    // Run IP and geolocation logging in background (non-blocking)
    fetchAndLogIP();
    requestGeolocation();
}

// Start application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Log when user leaves the page
window.addEventListener('beforeunload', () => {
    console.log('👋 User leaving page');
    console.log('⏰ Session end:', new Date().toISOString());
});

// Log visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('👁️ Page hidden');
    } else {
        console.log('👁️ Page visible');
    }
});
