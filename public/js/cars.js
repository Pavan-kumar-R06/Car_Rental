let allCars = [];
let filteredCars = [];
let currentCategory = 'All';

function loadCarsPage() {
    const carsHTML = `
        <!-- Hero Section -->
        <section class="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
            <div class="container mx-auto px-4">
                <div class="max-w-3xl mx-auto text-center">
                    <h1 class="text-4xl md:text-5xl font-bold mb-4 font-playfair">Browse Our Fleet</h1>
                    <p class="text-lg text-gray-300 mb-8">
                        Discover the perfect vehicle for your next adventure. From luxury sedans to powerful SUVs,
                        we have something for every occasion.
                    </p>
                </div>
            </div>
        </section>

        <!-- Filters and Cars Section -->
        <section class="py-12">
            <div class="container mx-auto px-4">
                <!-- Category Filters -->
                <div class="flex flex-wrap justify-center gap-2 mb-8">
                    <button onclick="filterCars('All')" class="px-4 py-2 rounded-full text-sm font-medium transition-colors ${currentCategory === 'All' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}">All</button>
                    <button onclick="filterCars('Luxury')" class="px-4 py-2 rounded-full text-sm font-medium transition-colors ${currentCategory === 'Luxury' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}">Luxury</button>
                    <button onclick="filterCars('Sports')" class="px-4 py-2 rounded-full text-sm font-medium transition-colors ${currentCategory === 'Sports' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}">Sports</button>
                    <button onclick="filterCars('SUV')" class="px-4 py-2 rounded-full text-sm font-medium transition-colors ${currentCategory === 'SUV' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}">SUV</button>
                    <button onclick="filterCars('Electric')" class="px-4 py-2 rounded-full text-sm font-medium transition-colors ${currentCategory === 'Electric' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}">Electric</button>
                    <button onclick="filterCars('Sedan')" class="px-4 py-2 rounded-full text-sm font-medium transition-colors ${currentCategory === 'Sedan' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}">Sedan</button>
                    <button onclick="filterCars('Convertible')" class="px-4 py-2 rounded-full text-sm font-medium transition-colors ${currentCategory === 'Convertible' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}">Convertible</button>
                </div>

                <!-- Cars Grid -->
                <div id="carsGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- Cars will be loaded here -->
                </div>

                <!-- Loading -->
                <div id="loading" class="text-center py-12">
                    <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p class="mt-2 text-gray-600">Loading cars...</p>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="border-t border-gray-200 bg-gray-50">
            <div class="container mx-auto px-4 py-12">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div class="space-y-4">
                        <a href="/" class="flex items-center gap-2">
                            <svg class="h-6 w-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                            </svg>
                            <span class="text-lg font-bold">DriveElite</span>
                        </a>
                        <p class="text-sm text-gray-600 leading-relaxed">
                            Premium car rental service offering luxury and economy vehicles for every occasion.
                        </p>
                    </div>

                    <div>
                        <h4 class="font-semibold mb-4">Quick Links</h4>
                        <ul class="space-y-2 text-sm text-gray-600">
                            <li><a href="/cars" class="hover:text-gray-900 transition-colors">Browse Cars</a></li>
                            <li><a href="/about" class="hover:text-gray-900 transition-colors">About Us</a></li>
                            <li><a href="/contact" class="hover:text-gray-900 transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 class="font-semibold mb-4">Support</h4>
                        <ul class="space-y-2 text-sm text-gray-600">
                            <li><a href="#" class="hover:text-gray-900 transition-colors">FAQ</a></li>
                            <li><a href="#" class="hover:text-gray-900 transition-colors">Terms of Service</a></li>
                            <li><a href="#" class="hover:text-gray-900 transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 class="font-semibold mb-4">Contact</h4>
                        <ul class="space-y-2 text-sm text-gray-600">
                            <li>1234 Auto Drive</li>
                            <li>San Francisco, CA 94102</li>
                            <li>contact@driveelite.com</li>
                            <li>+1 (555) 123-4567</li>
                        </ul>
                    </div>
                </div>

                <div class="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
                    <p>&copy; ${new Date().getFullYear()} DriveElite. All rights reserved.</p>
                </div>
            </div>
        </footer>
    `;

    document.getElementById('app').insertAdjacentHTML('beforeend', carsHTML);
    loadAllCars();
}

function loadAllCars() {
    fetch('/api/cars')
        .then(response => response.json())
        .then(cars => {
            allCars = cars;
            filteredCars = cars;
            displayCars(filteredCars);
            document.getElementById('loading').style.display = 'none';
        })
        .catch(error => {
            console.error('Error loading cars:', error);
            document.getElementById('loading').innerHTML = '<p class="text-red-600">Error loading cars. Please try again.</p>';
        });
}

function filterCars(category) {
    currentCategory = category;
    if (category === 'All') {
        filteredCars = allCars;
    } else {
        filteredCars = allCars.filter(car => car.category === category);
    }
    displayCars(filteredCars);

    // Update filter button styles
    const buttons = document.querySelectorAll('button[onclick^="filterCars"]');
    buttons.forEach(button => {
        const buttonCategory = button.getAttribute('onclick').match(/'([^']+)'/)[1];
        if (buttonCategory === category) {
            button.className = button.className.replace('bg-gray-100 text-gray-700 hover:bg-gray-200', 'bg-blue-600 text-white');
        } else {
            button.className = button.className.replace('bg-blue-600 text-white', 'bg-gray-100 text-gray-700 hover:bg-gray-200');
        }
    });
}

function displayCars(cars) {
    const container = document.getElementById('carsGrid');
    container.innerHTML = cars.map(car => `
        <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div class="relative h-48 bg-gray-200">
                <div class="absolute inset-0 flex items-center justify-center text-gray-500">
                    <svg class="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                </div>
                ${!car.available ? '<div class="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center"><span class="text-white font-semibold px-3 py-1 bg-red-600 rounded">Unavailable</span></div>' : ''}
                <div class="absolute top-2 left-2 bg-white px-2 py-1 rounded text-xs font-semibold">${car.category}</div>
            </div>
            <div class="p-4">
                <div class="flex justify-between items-start mb-2">
                    <div>
                        <p class="text-xs text-gray-500 uppercase tracking-wider">${car.brand}</p>
                        <h3 class="font-semibold text-lg">${car.name}</h3>
                    </div>
                    <div class="flex items-center text-sm">
                        <svg class="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        <span class="ml-1 font-medium">${car.rating}</span>
                        <span class="text-gray-500 ml-1">(${car.reviews})</span>
                    </div>
                </div>
                <div class="flex items-center gap-3 text-sm text-gray-600 mb-3">
                    <div class="flex items-center gap-1">
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        <span>${car.seats} Seats</span>
                    </div>
                    <div class="flex items-center gap-1">
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <span>${car.transmission}</span>
                    </div>
                    <div class="flex items-center gap-1">
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                        <span>${car.fuel}</span>
                    </div>
                </div>
                <div class="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div>
                        <span class="text-2xl font-bold">$${car.price}</span>
                        <span class="text-gray-500 text-sm">/day</span>
                    </div>
                    <a href="/cars/${car.id}" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 ${!car.available ? 'opacity-50 cursor-not-allowed' : ''}" ${!car.available ? 'onclick="return false;"' : ''}>
                        View Details
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}