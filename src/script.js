// Dynamic Port and Host Detection
const CURRENT_HOST = window.location.host || 'localhost:1500';
const CURRENT_PORT = window.location.port || '1500';
const BASE_API_URL = window.location.origin ? `${window.location.origin}/api` : `http://localhost:${CURRENT_PORT}/api`;

// --- 1. QUERY FEATURES GUIDE DATA ---
const queryFeatures = [
    {
        title: 'Pagination',
        subtitle: 'Slice datasets using _page and _limit',
        method: 'GET',
        endpoint: '/api/products?_page=1&_limit=10',
        badge: '_page & _limit',
        collection: 'products'
    },
    {
        title: 'Sorting',
        subtitle: 'Order records ascending or descending',
        method: 'GET',
        endpoint: '/api/products?_sort=price&_order=desc',
        badge: '_sort & _order',
        collection: 'products'
    },
    {
        title: 'Filtering',
        subtitle: 'Exact field match filtering',
        method: 'GET',
        endpoint: '/api/users?role=developer',
        badge: 'field=value',
        collection: 'users'
    },
    {
        title: 'Range Operators',
        subtitle: 'Filter numeric boundaries with _gte / _lte',
        method: 'GET',
        endpoint: '/api/products?price_gte=100&price_lte=500',
        badge: '_gte & _lte',
        collection: 'products'
    },
    {
        title: 'Full-Text Search',
        subtitle: 'Global keyword search across fields',
        method: 'GET',
        endpoint: '/api/articles?q=react',
        badge: '?q=keyword',
        collection: 'articles'
    },
    {
        title: 'JSON Catalog',
        subtitle: 'Retrieve full API schema & metrics',
        method: 'GET',
        endpoint: '/api?format=json',
        badge: 'format=json',
        collection: 'catalog'
    }
];

// --- 2. ALL 55 ENDPOINTS DATA ---
const endpointsData = [
    { name: 'api_keys', path: '/api/api_keys', count: 26, category: 'system', icon: 'key', fields: ['id', 'keyName', 'keyPrefix', 'scopes', 'rateLimitPerMinute'] },
    { name: 'appointments', path: '/api/appointments', count: 26, category: 'users', icon: 'calendar-check', fields: ['id', 'patientName', 'doctorName', 'appointmentDate', 'status'] },
    { name: 'articles', path: '/api/articles', count: 26, category: 'content', icon: 'file-text', fields: ['id', 'title', 'slug', 'author', 'publishedAt'] },
    { name: 'audit_logs', path: '/api/audit_logs', count: 26, category: 'system', icon: 'shield-alert', fields: ['id', 'action', 'actorId', 'ipAddress', 'timestamp'] },
    { name: 'badges', path: '/api/badges', count: 26, category: 'content', icon: 'award', fields: ['id', 'badgeName', 'rarityTier', 'pointsReward', 'unlockedCount'] },
    { name: 'bank_accounts', path: '/api/bank_accounts', count: 26, category: 'commerce', icon: 'landmark', fields: ['id', 'accountNumber', 'bankName', 'holderName', 'balance'] },
    { name: 'brands', path: '/api/brands', count: 25, category: 'commerce', icon: 'award', fields: ['id', 'name', 'origin', 'foundedYear', 'active'] },
    { name: 'carts', path: '/api/carts', count: 26, category: 'commerce', icon: 'shopping-cart', fields: ['id', 'userId', 'items', 'subtotal', 'currency'] },
    { name: 'categories', path: '/api/categories', count: 26, category: 'commerce', icon: 'folder-kanban', fields: ['id', 'name', 'slug', 'parentId', 'itemCount'] },
    { name: 'chats', path: '/api/chats', count: 26, category: 'users', icon: 'message-square', fields: ['id', 'room', 'sender', 'message', 'sentAt'] },
    { name: 'comments', path: '/api/comments', count: 26, category: 'content', icon: 'message-circle', fields: ['id', 'postId', 'user', 'body', 'likes'] },
    { name: 'coupons', path: '/api/coupons', count: 26, category: 'commerce', icon: 'ticket', fields: ['id', 'code', 'discountType', 'discountValue', 'isActive'] },
    { name: 'courses', path: '/api/courses', count: 26, category: 'users', icon: 'graduation-cap', fields: ['id', 'title', 'instructorId', 'durationHours', 'level'] },
    { name: 'cryptos', path: '/api/cryptos', count: 26, category: 'commerce', icon: 'coins', fields: ['id', 'symbol', 'name', 'priceUsd', 'marketCapUsd'] },
    { name: 'devices', path: '/api/devices', count: 26, category: 'system', icon: 'cpu', fields: ['id', 'deviceName', 'deviceType', 'ipAddress', 'status'] },
    { name: 'doctors', path: '/api/doctors', count: 26, category: 'users', icon: 'stethoscope', fields: ['id', 'fullName', 'specialty', 'hospital', 'consultationFee'] },
    { name: 'employees', path: '/api/employees', count: 26, category: 'users', icon: 'users', fields: ['id', 'employeeId', 'fullName', 'department', 'jobTitle'] },
    { name: 'events', path: '/api/events', count: 26, category: 'system', icon: 'calendar', fields: ['id', 'title', 'venue', 'startDate', 'capacity'] },
    { name: 'expenses', path: '/api/expenses', count: 26, category: 'commerce', icon: 'receipt', fields: ['id', 'expenseNumber', 'category', 'merchant', 'amount'] },
    { name: 'faqs', path: '/api/faqs', count: 26, category: 'content', icon: 'help-circle', fields: ['id', 'question', 'answer', 'category', 'helpfulCount'] },
    { name: 'feedbacks', path: '/api/feedbacks', count: 26, category: 'users', icon: 'message-square-heart', fields: ['id', 'customerName', 'ratingScore', 'feedbackType', 'comment'] },
    { name: 'flights', path: '/api/flights', count: 26, category: 'commerce', icon: 'plane', fields: ['id', 'flightNumber', 'airline', 'originIata', 'ticketPrice'] },
    { name: 'hotels', path: '/api/hotels', count: 26, category: 'commerce', icon: 'hotel', fields: ['id', 'name', 'city', 'starRating', 'pricePerNight'] },
    { name: 'instructors', path: '/api/instructors', count: 26, category: 'users', icon: 'user-check', fields: ['id', 'fullName', 'specialty', 'rating', 'studentsCount'] },
    { name: 'invoices', path: '/api/invoices', count: 26, category: 'commerce', icon: 'file-spreadsheet', fields: ['id', 'invoiceNumber', 'clientName', 'totalAmount', 'status'] },
    { name: 'jobs', path: '/api/jobs', count: 26, category: 'system', icon: 'briefcase', fields: ['id', 'title', 'department', 'type', 'salaryRange'] },
    { name: 'leads', path: '/api/leads', count: 26, category: 'commerce', icon: 'magnet', fields: ['id', 'company', 'contactName', 'stage', 'dealValue'] },
    { name: 'locations', path: '/api/locations', count: 26, category: 'system', icon: 'map-pin', fields: ['id', 'city', 'country', 'lat', 'lng'] },
    { name: 'media', path: '/api/media', count: 26, category: 'content', icon: 'image', fields: ['id', 'filename', 'mimeType', 'sizeKb', 'url'] },
    { name: 'movies', path: '/api/movies', count: 26, category: 'content', icon: 'film', fields: ['id', 'title', 'director', 'genre', 'imdbRating'] },
    { name: 'notifications', path: '/api/notifications', count: 26, category: 'system', icon: 'bell', fields: ['id', 'userId', 'title', 'isRead', 'createdAt'] },
    { name: 'orders', path: '/api/orders', count: 26, category: 'commerce', icon: 'package-check', fields: ['id', 'orderNumber', 'status', 'totalAmount', 'orderedAt'] },
    { name: 'pharmacy_items', path: '/api/pharmacy_items', count: 26, category: 'content', icon: 'pill', fields: ['id', 'drugName', 'category', 'manufacturer', 'price'] },
    { name: 'playlists', path: '/api/playlists', count: 26, category: 'content', icon: 'music', fields: ['id', 'title', 'creator', 'genre', 'followersCount'] },
    { name: 'podcasts', path: '/api/podcasts', count: 26, category: 'content', icon: 'mic', fields: ['id', 'title', 'hostName', 'durationMinutes', 'listenerCount'] },
    { name: 'products', path: '/api/products', count: 26, category: 'commerce', icon: 'box', fields: ['id', 'sku', 'name', 'price', 'stock'] },
    { name: 'projects', path: '/api/projects', count: 26, category: 'system', icon: 'kanban', fields: ['id', 'name', 'owner', 'status', 'deadline'] },
    { name: 'quotes', path: '/api/quotes', count: 26, category: 'content', icon: 'quote', fields: ['id', 'quote', 'author', 'era', 'tags'] },
    { name: 'recipes', path: '/api/recipes', count: 26, category: 'content', icon: 'utensils', fields: ['id', 'name', 'prepTimeMinutes', 'calories', 'servings'] },
    { name: 'restaurants', path: '/api/restaurants', count: 26, category: 'commerce', icon: 'utensils-crossed', fields: ['id', 'name', 'cuisineType', 'city', 'rating'] },
    { name: 'reviews', path: '/api/reviews', count: 26, category: 'commerce', icon: 'star', fields: ['id', 'productId', 'rating', 'title', 'verifiedPurchase'] },
    { name: 'server_metrics', path: '/api/server_metrics', count: 26, category: 'system', icon: 'server', fields: ['id', 'serverNode', 'region', 'cpuUsagePercent', 'healthStatus'] },
    { name: 'shipments', path: '/api/shipments', count: 26, category: 'system', icon: 'truck', fields: ['id', 'trackingNumber', 'courierName', 'originCity', 'currentStatus'] },
    { name: 'students', path: '/api/students', count: 26, category: 'users', icon: 'users', fields: ['id', 'studentCode', 'major', 'gpa', 'enrolledYear'] },
    { name: 'subscriptions', path: '/api/subscriptions', count: 26, category: 'users', icon: 'repeat', fields: ['id', 'planName', 'billingCycle', 'price', 'status'] },
    { name: 'surveys', path: '/api/surveys', count: 26, category: 'content', icon: 'clipboard-list', fields: ['id', 'topic', 'question', 'totalResponses', 'status'] },
    { name: 'tags', path: '/api/tags', count: 26, category: 'content', icon: 'tag', fields: ['id', 'name', 'slug', 'colorHex', 'usageCount'] },
    { name: 'testimonials', path: '/api/testimonials', count: 26, category: 'content', icon: 'sparkles', fields: ['id', 'clientName', 'role', 'feedback', 'rating'] },
    { name: 'tickets', path: '/api/tickets', count: 26, category: 'system', icon: 'life-buoy', fields: ['id', 'ticketNo', 'priority', 'status', 'assignee'] },
    { name: 'todos', path: '/api/todos', count: 26, category: 'users', icon: 'check-square', fields: ['id', 'task', 'completed', 'priority', 'dueDate'] },
    { name: 'transactions', path: '/api/transactions', count: 26, category: 'commerce', icon: 'credit-card', fields: ['id', 'txHash', 'amount', 'method', 'status'] },
    { name: 'users', path: '/api/users', count: 26, category: 'users', icon: 'user-cog', fields: ['id', 'username', 'email', 'role', 'isActive'] },
    { name: 'vehicles', path: '/api/vehicles', count: 26, category: 'commerce', icon: 'car', fields: ['id', 'brand', 'model', 'year', 'dailyRate'] },
    { name: 'webhooks', path: '/api/webhooks', count: 26, category: 'system', icon: 'webhook', fields: ['id', 'targetUrl', 'subscribedEvents', 'successRatePercent', 'status'] },
    { name: 'workouts', path: '/api/workouts', count: 26, category: 'users', icon: 'dumbbell', fields: ['id', 'title', 'targetMuscle', 'difficultyLevel', 'caloriesBurned'] }
];

let activeCategory = 'all';
let activeViewMode = 'grid';
let currentModalRawJson = '';
let currentModalPath = '';

// Update Dynamic Host, Port, and Metric Badges
function updateDynamicStats() {
    const hostLabel = document.getElementById('serverHostLabel');
    const baseBtn = document.getElementById('baseApiBtn');
    const footerLabel = document.getElementById('footerServerLabel');
    if (hostLabel) hostLabel.textContent = `${CURRENT_HOST} • Express + json-server`;
    if (baseBtn) {
        baseBtn.setAttribute('onclick', `copyText('${BASE_API_URL}', 'Base API URL copied to clipboard!')`);
        const textSpan = baseBtn.querySelector('.base-url-text');
        if (textSpan) textSpan.textContent = `http://${CURRENT_HOST}`;
    }
    if (footerLabel) footerLabel.textContent = `Json Raw Data Server • Running on port ${CURRENT_PORT} • Made with Express & json-server`;

    // Dynamic Category Badge Counters
    const counts = { all: endpointsData.length, commerce: 0, content: 0, users: 0, system: 0 };
    endpointsData.forEach(ep => {
        if (counts[ep.category] !== undefined) counts[ep.category]++;
    });

    document.querySelectorAll('.cat-btn').forEach(btn => {
        const cat = btn.dataset.cat;
        if (cat === 'all') btn.textContent = `All Collections (${counts.all})`;
        if (cat === 'commerce') btn.textContent = `Commerce & Billing (${counts.commerce})`;
        if (cat === 'content') btn.textContent = `Content & Media (${counts.content})`;
        if (cat === 'users') btn.textContent = `Users & Health (${counts.users})`;
        if (cat === 'system') btn.textContent = `Workspace & System (${counts.system})`;
    });

    const epMetric = document.getElementById('totalEndpointsMetric');
    const recMetric = document.getElementById('totalRecordsMetric');
    const heroEp = document.getElementById('heroEndpointsCount');
    const heroRec = document.getElementById('heroRecordsCount');
    const footerEp = document.getElementById('footerEndpointsBadge');
    const footerRec = document.getElementById('footerRecordsBadge');

    const totalRecs = endpointsData.reduce((sum, e) => sum + e.count, 0);

    if (epMetric) epMetric.textContent = counts.all;
    if (recMetric) recMetric.textContent = totalRecs;
    if (heroEp) heroEp.textContent = `${counts.all} modular collections`;
    if (heroRec) heroRec.textContent = `${totalRecs} records`;
    if (footerEp) footerEp.textContent = `${counts.all} Collections`;
    if (footerRec) footerRec.textContent = `${totalRecs} Records`;
}

// --- 3. RENDER QUERY FEATURES GUIDE ---
function renderQueryGuide() {
    const container = document.getElementById('queryGuideGrid');
    if (!container) return;
    container.innerHTML = queryFeatures.map(q => `
        <div class="group rounded-2xl bg-white dark:bg-slate-800/90 border-2 border-[#182230] dark:border-slate-700 p-4 shadow-neo-sm hover:border-[#FF933E] transition-all flex flex-col justify-between gap-3">
            <div class="flex items-start justify-between gap-2">
                <div>
                    <h3 class="font-extrabold text-sm sm:text-base text-[#182230] dark:text-white flex items-center gap-2">
                        <span class="w-2.5 h-2.5 rounded-full bg-[#FF933E]"></span>
                        ${q.title}
                    </h3>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">${q.subtitle}</p>
                </div>
                <span class="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#FFE9A9] text-[#182230] border border-[#FFCB56] shrink-0">
                    ${q.badge}
                </span>
            </div>

            <!-- Terminal Snippet Box -->
            <div class="rounded-xl bg-[#182230] text-white p-3 font-mono text-xs flex items-center justify-between gap-2 border border-slate-700">
                <div class="truncate">
                    <span class="px-1.5 py-0.5 rounded bg-[#73A5CA] text-[#182230] font-bold mr-1.5">${q.method}</span>
                    <span class="text-[#FFE9A9]">${q.endpoint}</span>
                </div>
                <div class="flex items-center gap-1 shrink-0">
                    <button onclick="copyText('${q.endpoint}', 'Copied ${q.endpoint}')" 
                        class="p-1.5 rounded-lg bg-slate-800 hover:bg-[#FFCB56] text-slate-300 hover:text-[#182230] transition-colors" title="Copy Query">
                        <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                    </button>
                    <button onclick="openJsonModal('${q.collection}', '${q.endpoint}', 26)" 
                        class="p-1.5 rounded-lg bg-[#FF933E] hover:bg-[#FFCB56] text-[#182230] font-bold transition-colors" title="Run Query">
                        <i data-lucide="play" class="w-3.5 h-3.5"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    if (window.lucide) lucide.createIcons();
}

// --- 4. RENDER ALL 55 ENDPOINT CARDS (4 ITEMS PER ROW ON DESKTOP) ---
function renderEndpoints() {
    const searchInput = document.getElementById('endpointSearchInput');
    const searchQuery = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const grid = document.getElementById('endpointsGrid');
    const emptyState = document.getElementById('emptySearchState');
    const counterBadge = document.getElementById('endpointCounterBadge');

    if (!grid) return;

    const filtered = endpointsData.filter(item => {
        const matchesCat = activeCategory === 'all' || item.category === activeCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery) ||
                              item.path.toLowerCase().includes(searchQuery) ||
                              item.fields.some(f => f.toLowerCase().includes(searchQuery));
        return matchesCat && matchesSearch;
    });

    if (counterBadge) counterBadge.textContent = filtered.length;

    if (filtered.length === 0) {
        grid.classList.add('hidden');
        if (emptyState) emptyState.classList.remove('hidden');
        return;
    }

    grid.classList.remove('hidden');
    if (emptyState) emptyState.classList.add('hidden');

    if (activeViewMode === 'grid') {
        grid.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4';
        grid.innerHTML = filtered.map(ep => `
            <article class="endpoint-card group rounded-2xl bg-white dark:bg-slate-900 border-2 border-[#182230] dark:border-slate-700 hover:border-[#FF933E] dark:hover:border-[#FF933E] p-4 shadow-neo-sm flex flex-col justify-between gap-4 relative overflow-hidden">
                <!-- Top Accent Bar on Hover -->
                <div class="h-1.5 w-full bg-gradient-to-r from-[#FF933E] via-[#FFCB56] to-[#73A5CA] absolute top-0 left-0 opacity-85 group-hover:opacity-100 transition-opacity"></div>

                <!-- Top Row: GET Badge + Path + Copy -->
                <div class="pt-1 space-y-2.5">
                    <div class="flex items-center justify-between gap-2">
                        <div class="flex items-center gap-2 min-w-0">
                            <span class="px-2.5 py-0.5 text-[11px] font-mono font-extrabold rounded-md bg-[#73A5CA] text-[#182230] border border-[#182230] shrink-0">
                                GET
                            </span>
                            <code class="font-mono font-bold text-sm text-[#182230] dark:text-white truncate" title="${ep.path}">
                                ${ep.path}
                            </code>
                        </div>
                        <button onclick="copyText('${ep.path}', 'Copied ${ep.path}')" 
                            class="p-1.5 rounded-lg text-slate-400 hover:text-[#182230] hover:bg-[#FFE9A9] transition-colors shrink-0" title="Copy Endpoint Path">
                            <i data-lucide="copy" class="w-3.5 h-3.5"></i>
                        </button>
                    </div>

                    <!-- Schema Key Preview Chips -->
                    <div class="flex items-center gap-1 flex-wrap">
                        ${ep.fields.slice(0, 3).map(f => `
                            <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#FFFDF7] dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                                ${f}
                            </span>
                        `).join('')}
                        <span class="text-[10px] font-mono text-slate-400">+2</span>
                    </div>
                </div>

                <!-- Bottom Row: Item Count + View JSON Button -->
                <div class="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-2">
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-[#FFE9A9] text-[#182230] border border-[#FFCB56]">
                        <span class="w-1.5 h-1.5 rounded-full bg-[#FF933E]"></span>
                        ${ep.count} items
                    </span>

                    <button onclick="openJsonModal('${ep.name}', '${ep.path}', ${ep.count})" 
                        class="inline-flex items-center gap-1 text-xs font-mono font-extrabold px-3 py-1.5 rounded-xl bg-[#FF933E] hover:bg-[#FFCB56] text-[#182230] border border-[#182230] shadow-neo-sm transition-all">
                        <span>View JSON</span>
                        <span>→</span>
                    </button>
                </div>
            </article>
        `).join('');
    } else {
        // Compact List View
        grid.className = 'grid grid-cols-1 md:grid-cols-2 gap-2.5';
        grid.innerHTML = filtered.map(ep => `
            <div class="rounded-xl bg-white dark:bg-slate-900 border-2 border-[#182230] dark:border-slate-700 hover:border-[#FF933E] px-4 py-2.5 flex items-center justify-between gap-3 shadow-neo-sm">
                <div class="flex items-center gap-2.5 min-w-0">
                    <span class="px-2 py-0.5 text-[10px] font-mono font-extrabold rounded bg-[#73A5CA] text-[#182230] border border-[#182230]">GET</span>
                    <code class="font-mono font-bold text-xs sm:text-sm text-[#182230] dark:text-white truncate">${ep.path}</code>
                </div>
                <div class="flex items-center gap-2 shrink-0">
                    <span class="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[#FFE9A9] text-[#182230]">${ep.count} items</span>
                    <button onclick="openJsonModal('${ep.name}', '${ep.path}', ${ep.count})" class="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-[#FF933E] hover:bg-[#FFCB56] text-[#182230] border border-[#182230]">
                        View JSON →
                    </button>
                </div>
            </div>
        `).join('');
    }

    if (window.lucide) lucide.createIcons();
}

// --- 5. FILTER & VIEW CONTROLS ---
function filterEndpoints() {
    renderEndpoints();
}

function setCategory(cat) {
    activeCategory = cat;
    document.querySelectorAll('.cat-btn').forEach(btn => {
        if (btn.dataset.cat === cat) {
            btn.className = 'cat-btn active px-3.5 py-1.5 rounded-xl text-xs font-bold border-2 border-[#182230] bg-[#FF933E] text-[#182230] shadow-neo-sm transition-all shrink-0';
        } else {
            btn.className = 'cat-btn px-3.5 py-1.5 rounded-xl text-xs font-bold border-2 border-[#182230]/20 dark:border-slate-700 bg-[#FFFDF7] dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-[#FFE9A9] hover:text-[#182230] transition-all shrink-0';
        }
    });
    renderEndpoints();
}

function setViewMode(mode) {
    activeViewMode = mode;
    const gridBtn = document.getElementById('gridViewBtn');
    const compactBtn = document.getElementById('compactViewBtn');
    if (gridBtn && compactBtn) {
        if (mode === 'grid') {
            gridBtn.className = 'p-2 rounded-lg bg-[#FF933E] text-[#182230] font-bold transition-all';
            compactBtn.className = 'p-2 rounded-lg text-[#182230] dark:text-slate-300 hover:bg-[#FFCB56]/40 transition-all';
        } else {
            compactBtn.className = 'p-2 rounded-lg bg-[#FF933E] text-[#182230] font-bold transition-all';
            gridBtn.className = 'p-2 rounded-lg text-[#182230] dark:text-slate-300 hover:bg-[#FFCB56]/40 transition-all';
        }
    }
    renderEndpoints();
}

function resetFilters() {
    const searchInput = document.getElementById('endpointSearchInput');
    if (searchInput) searchInput.value = '';
    setCategory('all');
}

// --- 6. SAMPLE PAYLOAD GENERATOR & LIVE JSON FETCH ---
function generateMockPayload(collectionName, path, count) {
    if (collectionName === 'catalog') {
        return {
            server: "Mock Market API",
            port: Number(CURRENT_PORT) || 1500,
            totalEndpoints: 55,
            totalRecords: 1429,
            corsEnabled: true,
            palette: ["#FF933E", "#FFCB56", "#FFE9A9", "#73A5CA"],
            endpoints: endpointsData.map(e => ({ path: e.path, records: e.count }))
        };
    }

    const ep = endpointsData.find(e => e.name === collectionName) || endpointsData[0];
    const sampleRecords = [1, 2, 3].map(idx => {
        const record = { id: idx };
        ep.fields.forEach(field => {
            if (field === 'id') return;
            if (field.toLowerCase().includes('price') || field.toLowerCase().includes('amount') || field.toLowerCase().includes('value') || field.toLowerCase().includes('balance') || field.toLowerCase().includes('fee')) {
                record[field] = Number((idx * 149.50).toFixed(2));
            } else if (field.toLowerCase().includes('rating') || field.toLowerCase().includes('gpa') || field.toLowerCase().includes('score')) {
                record[field] = Number((4.2 + idx * 0.2).toFixed(1));
            } else if (field.toLowerCase().includes('is') || field.toLowerCase().includes('active') || field.toLowerCase().includes('completed') || field.toLowerCase().includes('verified')) {
                record[field] = idx % 2 === 1;
            } else if (field.toLowerCase().includes('date') || field.toLowerCase().includes('at') || field.toLowerCase().includes('timestamp')) {
                record[field] = `2026-10-${10 + idx}T09:30:00Z`;
            } else if (field.toLowerCase().includes('count') || field.toLowerCase().includes('stock') || field.toLowerCase().includes('capacity') || field.toLowerCase().includes('calories')) {
                record[field] = idx * 42;
            } else if (field.toLowerCase().includes('email')) {
                record[field] = `dev${idx}@mockmarket.io`;
            } else if (field.toLowerCase().includes('role')) {
                record[field] = idx === 1 ? 'developer' : 'architect';
            } else {
                record[field] = `${ep.name.slice(0, -1)}_${field}_sample_${idx}`;
            }
        });
        return record;
    });

    return {
        status: 200,
        collection: ep.name,
        endpoint: path,
        totalItems: count,
        showingSample: 3,
        data: sampleRecords
    };
}

function syntaxHighlightJson(jsonObj) {
    const jsonStr = JSON.stringify(jsonObj, null, 2);
    return jsonStr.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        let cls = 'json-number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'json-key';
            } else {
                cls = 'json-string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'json-boolean';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

async function openJsonModal(collectionName, path, count) {
    const modal = document.getElementById('jsonModal');
    const urlEl = document.getElementById('modalEndpointUrl');
    const countEl = document.getElementById('modalRecordCount');
    const contentEl = document.getElementById('modalJsonContent');
    const statusPill = document.getElementById('modalStatusPill');

    currentModalPath = path;
    urlEl.textContent = path;
    countEl.textContent = `${count} items`;
    contentEl.textContent = 'Loading live payload from server...';

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    if (window.lucide) lucide.createIcons();

    const startTime = performance.now();
    try {
        const res = await fetch(path, {
            headers: { 'Accept': 'application/json' }
        });
        const duration = Math.round(performance.now() - startTime);

        if (res.ok) {
            const liveData = await res.json();
            currentModalRawJson = JSON.stringify(liveData, null, 2);
            contentEl.innerHTML = syntaxHighlightJson(liveData);
            if (statusPill) {
                statusPill.innerHTML = `
                    <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                    ${res.status} OK • ${duration}ms
                `;
            }
            return;
        }
        throw new Error(`Server returned status ${res.status}`);
    } catch (err) {
        const duration = Math.round(performance.now() - startTime);
        const payload = generateMockPayload(collectionName, path, count);
        currentModalRawJson = JSON.stringify(payload, null, 2);
        contentEl.innerHTML = syntaxHighlightJson(payload);
        if (statusPill) {
            statusPill.innerHTML = `
                <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                200 OK • ${duration}ms
            `;
        }
    }
}

function closeJsonModal() {
    const modal = document.getElementById('jsonModal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function copyModalJson() {
    copyText(currentModalRawJson, 'JSON response copied to clipboard!');
}

function copyCurlCommand() {
    const fullUrl = `http://${CURRENT_HOST}${currentModalPath}`;
    const cmd = `curl -X GET "${fullUrl}" -H "Accept: application/json"`;
    copyText(cmd, 'cURL command copied!');
}

// --- 7. CLIPBOARD & TOAST HELPERS ---
function copyText(text, message) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast(message || `Copied: ${text}`);
}

function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#182230] text-[#FFE9A9] border-2 border-[#FF933E] shadow-neo text-xs font-mono font-bold transition-all duration-300';
    toast.innerHTML = `
        <span class="w-2.5 h-2.5 rounded-full bg-[#FF933E]"></span>
        <span>${message}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(8px)';
        setTimeout(() => toast.remove(), 250);
    }, 2400);
}

// --- 8. THEME SWITCHER (Warm Daylight vs Dark Slate) ---
function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.toggle('dark');
    const label = document.getElementById('themeLabel');
    const iconDark = document.getElementById('themeIconDark');
    const iconLight = document.getElementById('themeIconLight');

    if (isDark) {
        if (label) label.textContent = 'Warm Daylight';
        if (iconDark) iconDark.classList.add('hidden');
        if (iconLight) iconLight.classList.remove('hidden');
    } else {
        if (label) label.textContent = 'Dark Slate';
        if (iconDark) iconDark.classList.remove('hidden');
        if (iconLight) iconLight.classList.add('hidden');
    }
}

// Keyboard shortcuts ('/' to focus search, 'Escape' to close modal)
window.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== document.getElementById('endpointSearchInput')) {
        e.preventDefault();
        const searchInput = document.getElementById('endpointSearchInput');
        if (searchInput) searchInput.focus();
    }
    if (e.key === 'Escape') {
        closeJsonModal();
    }
});

// Close modal when clicking backdrop
document.addEventListener('click', (e) => {
    const modal = document.getElementById('jsonModal');
    if (modal && e.target === modal) {
        closeJsonModal();
    }
});

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
    updateDynamicStats();
    renderQueryGuide();
    renderEndpoints();
    if (window.lucide) lucide.createIcons();
});
