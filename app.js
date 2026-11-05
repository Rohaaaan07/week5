// Define route content with modern layouts
const routes = {
    '/': {
        title: 'Overview',
        content: `
            <div class="content-header">
                <h1>Welcome to Nexus</h1>
                <p>A next-generation platform built for modern teams.</p>
            </div>
            <p>Experience a lightning-fast Single Page Application. By utilizing the browser's native History API, we eliminate clunky page reloads, ensuring your workflow remains smooth and uninterrupted.</p>
            <p>This architecture results in lower server load and a significantly improved user experience.</p>
            <br>
            <a href="/features" data-link class="btn">Explore Features →</a>
        `
    },
    '/features': {
        title: 'Features',
        content: `
            <div class="content-header">
                <h1>Platform Features</h1>
                <p>Everything you need to scale your application seamlessly.</p>
            </div>
            <div class="feature-grid">
                <div class="feature-card">
                    <h3>⚡ Client-Side Routing</h3>
                    <p>Instantaneous page transitions without server round-trips.</p>
                </div>
                <div class="feature-card">
                    <h3>🎨 Modern UI</h3>
                    <p>Beautiful, responsive design system using modern CSS variables.</p>
                </div>
                <div class="feature-card">
                    <h3>🔄 State Preservation</h3>
                    <p>Maintain application state seamlessly across different views.</p>
                </div>
                <div class="feature-card">
                    <h3>📱 Fully Responsive</h3>
                    <p>Optimized layouts that adapt perfectly to any screen size.</p>
                </div>
            </div>
        `
    },
    '/pricing': {
        title: 'Pricing',
        content: `
            <div class="content-header">
                <h1>Simple Pricing</h1>
                <p>Transparent plans for teams of all sizes.</p>
            </div>
            <div style="text-align: center; padding: 3rem 2rem; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; max-width: 400px; margin: 0 auto;">
                <h2 style="margin-top: 0; color: #0f172a;">Pro Plan</h2>
                <div style="font-size: 3.5rem; font-weight: 700; color: #4f46e5; margin: 1rem 0; letter-spacing: -1px;">
                    ₹1,999<span style="font-size: 1rem; color: #64748b; font-weight: 400; letter-spacing: 0;">/mo</span>
                </div>
                <p style="margin-bottom: 2rem;">Full access to all routing features, UI components, and premium support.</p>
                <button class="btn" style="width: 100%;">Get Started</button>
            </div>
        `
    },
    '/contact': {
        title: 'Contact',
        content: `
            <div class="content-header">
                <h1>Get in Touch</h1>
                <p>Our support team is available 24/7 to assist you.</p>
            </div>
            <form onsubmit="event.preventDefault(); alert('Your message has been successfully sent!');">
                <div class="form-group">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" class="form-control" placeholder="Arjun Patel" required>
                </div>
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" class="form-control" placeholder="arjun@example.com" required>
                </div>
                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea id="message" class="form-control" rows="5" placeholder="How can we help you today?" required></textarea>
                </div>
                <button type="submit" class="btn">Send Message</button>
            </form>
        `
    },
    '404': {
        title: 'Page Not Found',
        content: `
            <div style="text-align: center; padding: 4rem 0;">
                <h1 style="font-size: 5rem; color: #4f46e5; margin-bottom: 0;">404</h1>
                <h2>Page Not Found</h2>
                <p>The page you are looking for has been moved or doesn't exist.</p>
                <br>
                <a href="/" data-link class="btn">Return Home</a>
            </div>
        `
    }
};

// Router function
const router = async () => {
    let path = window.location.pathname;
    
    if (path.endsWith('index.html')) {
        path = '/';
    }

    const route = routes[path] || routes['404'];
    document.title = route.title + " | Nexus SPA";

    const appContainer = document.getElementById('app');
    
    // Re-trigger the slideUpFade animation by resetting the node
    appContainer.style.animation = 'none';
    appContainer.offsetHeight; // Trigger reflow
    appContainer.style.animation = null;
    
    appContainer.innerHTML = route.content;

    // Update active state in navigation menu
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === path) {
            link.classList.add('active');
            link.style.color = 'var(--primary)';
        } else {
            link.classList.remove('active');
            link.style.color = 'var(--text-muted)';
        }
    });
};

// Handle navigation
const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

// Listen for link clicks
document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', e => {
        // Find closest element with data-link (handles clicks on elements inside <a>)
        const target = e.target.closest('[data-link]');
        if (target) {
            e.preventDefault();
            navigateTo(target.href);
        }
    });

    router();
});

// Listen for back/forward browser navigation
window.addEventListener('popstate', router);
