function loadHomePage() {
    const homeHTML = `
        <!-- Hero Section -->
        <section class="relative h-screen min-h-[600px] flex items-center bg-gradient-to-r from-gray-900 via-gray-800 to-black">
            <div class="absolute inset-0 bg-black/60"></div>
            <div class="container mx-auto px-4 relative z-10">
                <div class="max-w-2xl">
                    <h1 class="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight font-playfair">
                        Drive Your Dreams with Premium Rentals
                    </h1>
                    <p class="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
                        Experience luxury, performance, and comfort with our handpicked fleet of premium vehicles.
                        From sleek sports cars to spacious SUVs, find your perfect ride.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4">
                        <a href="/cars" class="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                            Browse All Cars
                            <svg class="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </a>
                        <a href="/signup" class="inline-flex items-center px-8 py-3 border border-white/30 text-base font-medium rounded-md text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm">
                            Create Account
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Features Section -->
        <section class="py-20 bg-gray-50">
            <div class="container mx-auto px-4">
                <div class="text-center mb-14">
                    <h2 class="text-3xl font-bold mb-4 font-playfair">Why Choose DriveElite?</h2>
                    <p class="text-gray-600 max-w-2xl mx-auto">
                        We provide an exceptional car rental experience with premium vehicles and outstanding service.
                    </p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div class="text-center p-6 rounded-xl bg-white border border-gray-200 hover:border-gray-300 transition-colors shadow-sm">
                        <div class="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                            <svg class="h-7 w-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h3 class="font-semibold text-lg mb-2">Fully Insured</h3>
                        <p class="text-gray-600 text-sm leading-relaxed">
                            All vehicles come with comprehensive insurance coverage for your peace of mind.
                        </p>
                    </div>
                    <div class="text-center p-6 rounded-xl bg-white border border-gray-200 hover:border-gray-300 transition-colors shadow-sm">
                        <div class="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                            <svg class="h-7 w-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h3 class="font-semibold text-lg mb-2">24/7 Availability</h3>
                        <p class="text-gray-600 text-sm leading-relaxed">
                            Pick up and return your vehicle any time that suits your schedule.
                        </p>
                    </div>
                    <div class="text-center p-6 rounded-xl bg-white border border-gray-200 hover:border-gray-300 transition-colors shadow-sm">
                        <div class="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                            <svg class="h-7 w-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                        </div>
                        <h3 class="font-semibold text-lg mb-2">Multiple Locations</h3>
                        <p class="text-gray-600 text-sm leading-relaxed">
                            Convenient pickup points across the city and at major airports.
                        </p>
                    </div>
                    <div class="text-center p-6 rounded-xl bg-white border border-gray-200 hover:border-gray-300 transition-colors shadow-sm">
                        <div class="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                            <svg class="h-7 w-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h3 class="font-semibold text-lg mb-2">Expert Support</h3>
                        <p class="text-gray-600 text-sm leading-relaxed">
                            Our dedicated team is always ready to assist you with any questions.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Featured Cars Section -->
        <section class="py-20">
            <div class="container mx-auto px-4">
                <div class="flex items-end justify-between mb-10">
                    <div>
                        <h2 class="text-3xl font-bold mb-2 font-playfair">Featured Vehicles</h2>
                        <p class="text-gray-600">Explore our most popular premium rentals</p>
                    </div>
                    <a href="/cars" class="hidden sm:inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        View All
                        <svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </a>
                </div>
                <div id="featuredCars" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- Cars will be loaded here -->
                </div>
                <div class="text-center mt-8 sm:hidden">
                    <a href="/cars" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                        View All Cars
                        <svg class="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </a>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="py-20 bg-blue-600 text-white">
            <div class="container mx-auto px-4 text-center">
                <h2 class="text-3xl md:text-4xl font-bold mb-4 font-playfair">
                    Ready to Hit the Road?
                </h2>
                <p class="text-blue-100 max-w-xl mx-auto mb-8">
                    Sign up today and get 10% off your first rental. Experience the DriveElite difference.
                </p>
                <a href="/signup" class="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50">
                    Get Started
                    <svg class="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </a>
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

    document.getElementById('app').insertAdjacentHTML('beforeend', homeHTML);
    loadFeaturedCars();
}

function loadFeaturedCars() {
    fetch('/api/cars')
        .then(response => response.json())
        .then(cars => {
            const featuredCars = cars.slice(0, 3);
            const container = document.getElementById('featuredCars');

            container.innerHTML = featuredCars.map(car => `
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
        });
}