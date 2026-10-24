const fs = require('fs');
const path = require('path');
const http = require('http');
const app = require('../server');

const dataDir = path.join(__dirname, '../data');

async function runTests() {
  console.log('🧪 Starting JSON Raw Data Verification Tests...\n');

  // Test 1: Check all 55 files and counts
  console.log('--- Test 1: Validating JSON Data Files ---');
  const expectedEntities = [
    'api_keys', 'appointments', 'articles', 'audit_logs', 'badges',
    'bank_accounts', 'brands', 'carts', 'categories', 'chats',
    'comments', 'coupons', 'courses', 'cryptos', 'devices',
    'doctors', 'employees', 'events', 'expenses', 'faqs',
    'feedbacks', 'flights', 'hotels', 'instructors', 'invoices',
    'jobs', 'leads', 'locations', 'media', 'movies',
    'notifications', 'orders', 'pharmacy_items', 'playlists', 'podcasts',
    'products', 'projects', 'quotes', 'recipes', 'restaurants',
    'reviews', 'server_metrics', 'shipments', 'students', 'subscriptions',
    'surveys', 'tags', 'testimonials', 'tickets', 'todos',
    'transactions', 'users', 'vehicles', 'webhooks', 'workouts'
  ];

  const actualFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('.json')).sort();
  if (actualFiles.length !== 55) {
    throw new Error(`Expected 55 JSON files, found ${actualFiles.length}`);
  }

  let totalItemsCount = 0;
  for (const entity of expectedEntities) {
    const filePath = path.join(dataDir, `${entity}.json`);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Missing expected file: ${entity}.json`);
    }
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    if (!Array.isArray(data)) {
      throw new Error(`Expected array in ${entity}.json, got ${typeof data}`);
    }
    if (data.length < 25) {
      throw new Error(`Expected at least 25 items in ${entity}.json, found ${data.length}`);
    }
    totalItemsCount += data.length;
    console.log(`  ✓ ${entity.padEnd(16)} : ${data.length} items (valid)`);
  }
  console.log(`\n  ✅ All 55 datasets verified! Total records: ${totalItemsCount}\n`);

  // Test 2: Boot server on ephemeral port and test HTTP endpoints
  console.log('--- Test 2: Testing HTTP API Endpoints ---');
  const server = http.createServer(app);

  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  console.log(`  ✓ Test server running on ephemeral port ${port}`);

  function makeRequest(method, reqPath, body = null) {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'localhost',
        port: port,
        path: reqPath,
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };

      const req = http.request(options, (res) => {
        let raw = '';
        res.on('data', chunk => raw += chunk);
        res.on('end', () => {
          let parsed;
          try {
            parsed = JSON.parse(raw);
          } catch {
            parsed = raw;
          }
          resolve({ status: res.statusCode, headers: res.headers, body: parsed });
        });
      });

      req.on('error', reject);
      if (body) {
        req.write(JSON.stringify(body));
      }
      req.end();
    });
  }

  // 2a. Catalog JSON endpoint
  const catalogRes = await makeRequest('GET', '/api?format=json');
  if (catalogRes.status !== 200 || catalogRes.body.totalEndpoints !== 55) {
    throw new Error(`Catalog failed: status=${catalogRes.status}, endpoints=${catalogRes.body.totalEndpoints}`);
  }
  console.log(`  ✓ GET /api?format=json returns 200 OK (${catalogRes.body.totalEndpoints} endpoints documented)`);

  // 2b. Test Users endpoint
  const usersRes = await makeRequest('GET', '/api/users');
  if (usersRes.status !== 200 || !Array.isArray(usersRes.body) || usersRes.body.length < 25) {
    throw new Error(`GET /api/users failed: status=${usersRes.status}, count=${usersRes.body?.length}`);
  }
  console.log(`  ✓ GET /api/users returns 200 OK (${usersRes.body.length} users)`);

  // 2c. Test Pagination on Products
  const productsPageRes = await makeRequest('GET', '/api/products?_page=1&_limit=5');
  if (productsPageRes.status !== 200 || productsPageRes.body.length !== 5) {
    throw new Error(`Pagination failed: status=${productsPageRes.status}, count=${productsPageRes.body?.length}`);
  }
  console.log(`  ✓ GET /api/products?_page=1&_limit=5 returns 200 OK (5 items returned)`);

  // 2d. Test Filter on Articles
  const articlesFilterRes = await makeRequest('GET', '/api/articles?brandId=1');
  if (articlesFilterRes.status !== 200 || !Array.isArray(articlesFilterRes.body)) {
    throw new Error(`Filter failed: status=${articlesFilterRes.status}`);
  }
  console.log(`  ✓ GET /api/articles?brandId=1 returns 200 OK (${articlesFilterRes.body.length} articles)`);

  // 2e. Test POST to create new item in Todos
  const newTodo = {
    title: 'Test automated integration test item',
    completed: false,
    userId: 1,
    priority: 'Urgent'
  };
  const postTodoRes = await makeRequest('POST', '/api/todos', newTodo);
  if (postTodoRes.status !== 201 || !postTodoRes.body.id) {
    throw new Error(`POST /api/todos failed: status=${postTodoRes.status}`);
  }
  console.log(`  ✓ POST /api/todos creates item with id ${postTodoRes.body.id}`);

  // 2f. Test GET single item
  const getSingleTodoRes = await makeRequest('GET', `/api/todos/${postTodoRes.body.id}`);
  if (getSingleTodoRes.status !== 200 || getSingleTodoRes.body.title !== newTodo.title) {
    throw new Error(`GET /api/todos/${postTodoRes.body.id} failed: status=${getSingleTodoRes.status}`);
  }
  console.log(`  ✓ GET /api/todos/${postTodoRes.body.id} returns 200 OK`);

  // 2g. Test DELETE item
  const deleteTodoRes = await makeRequest('DELETE', `/api/todos/${postTodoRes.body.id}`);
  if (deleteTodoRes.status !== 200 && deleteTodoRes.status !== 204) {
    throw new Error(`DELETE failed: status=${deleteTodoRes.status}`);
  }
  console.log(`  ✓ DELETE /api/todos/${postTodoRes.body.id} returns ${deleteTodoRes.status}`);

  // Clean close server
  await new Promise((resolve) => server.close(resolve));
  console.log('  ✓ Test server closed cleanly');

  console.log('\n🎉 ALL 55 DATASETS AND SERVER ENDPOINTS VERIFIED SUCCESSFULLY!\n');
}

runTests().catch(err => {
  console.error('\n❌ Verification failed:', err);
  process.exit(1);
});
