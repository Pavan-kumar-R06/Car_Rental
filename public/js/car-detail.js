function loadCarDetailPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const carId = window.location.pathname.split('/').pop();

    if (!carId) {
        window.location.href = '/cars';
        return;
    }

    fetch(`/api/cars/${carId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Car not found');
            }
            return response.json();
        })
        .then(car => {
            displayCarDetail(car);
        })
        .catch(error => {
            document.getElementById('app').innerHTML += `
                <div class="min-h-screen flex items-center justify-center">
                    <div class="text-center">
                        <h1 class="text-2xl font-bold text-gray-900 mb-4">Car Not Found</h1>
                        <p class="text-gray-600 mb-8">The car you're looking for doesn't exist.</p>
                        <a href="/cars" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                            Browse All Cars
                        </a>
                    </div>
                </div>
            `;
        });
}

function displayCarDetail(car) {
    const carDetailHTML = `
        <!-- Breadcrumb -->
        <nav class="bg-gray-50 py-4">
            <div class="container mx-auto px-4">
                <ol class="flex items-center space-x-2 text-sm text-gray-600">
                    <li><a href="/" class="hover:text-gray-900">Home</a></li>
                    <li><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></li>
                    <li><a href="/cars" class="hover:text-gray-900">Cars</a></li>
                    <li><svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></li>
                    <li class="text-gray-900 font-medium">${car.name}</li>
                </ol>
            </div>
        </nav>

        <!-- Car Detail Section -->
        <section class="py-12">
            <div class="container mx-auto px-4">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <!-- Car Image -->
                    <div class="space-y-4">
                        <div class="relative aspect-[16/10] bg-gray-200 rounded-lg overflow-hidden">
                            <div class="absolute inset-0 flex items-center justify-center text-gray-500">
                                <svg class="h-24 w-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                                </svg>
                            </div>
                            ${!car.available ? '<div class="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center"><span class="text-white font-semibold px-4 py-2 bg-red-600 rounded">Currently Unavailable</span></div>' : ''}
                        </div>
                        <div class="flex gap-2">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">${car.category}</span>
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">${car.brand}</span>
                        </div>
                    </div>

                    <!-- Car Info -->
                    <div class="space-y-6">
                        <div>
                            <h1 class="text-3xl font-bold font-playfair mb-2">${car.name}</h1>
                            <div class="flex items-center gap-4 mb-4">
                                <div class="flex items-center">
                                    <svg class="h-5 w-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                    </svg>
                                    <span class="ml-1 font-medium">${car.rating}</span>
                                    <span class="text-gray-500 ml-1">(${car.reviews} reviews)</span>
                                </div>
                                <span class="text-2xl font-bold text-blue-600">$${car.price}<span class="text-sm text-gray-500 font-normal">/day</span></span>
                            </div>
                        </div>

                        <!-- Specifications -->
                        <div class="grid grid-cols-2 gap-4">
                            <div class="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                <svg class="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                                <div>
                                    <p class="text-sm text-gray-500">Seats</p>
                                    <p class="font-semibold">${car.seats}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                <svg class="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                <div>
                                    <p class="text-sm text-gray-500">Transmission</p>
                                    <p class="font-semibold">${car.transmission}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                <svg class="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                                <div>
                                    <p class="text-sm text-gray-500">Fuel</p>
                                    <p class="font-semibold">${car.fuel}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                <svg class="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <div>
                                    <p class="text-sm text-gray-500">Status</p>
                                    <p class="font-semibold ${car.available ? 'text-green-600' : 'text-red-600'}">${car.available ? 'Available' : 'Unavailable'}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Description -->
                        <div>
                            <h3 class="text-lg font-semibold mb-3">Description</h3>
                            <p class="text-gray-600 leading-relaxed">${car.description}</p>
                        </div>

                        <!-- Features -->
                        <div>
                            <h3 class="text-lg font-semibold mb-3">Features</h3>
                            <div class="grid grid-cols-2 gap-2">
                                ${car.features.map(feature => `<span class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700">${feature}</span>`).join('')}
                            </div>
                        </div>

                        <!-- Action Button -->
                        <div class="pt-6">
                            ${car.available ?
                                `<button onclick="rentCar('${car.id}')" class="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                    Rent This Car
                                    <svg class="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                    </svg>
                                </button>` :
                                `<button disabled class="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-400 cursor-not-allowed">
                                    Currently Unavailable
                                </button>`
                            }
                        </div>
                    </div>
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

    document.getElementById('app').insertAdjacentHTML('beforeend', carDetailHTML);
}

function rentCar(carId) {
    if (!isLoggedIn()) {
        window.location.href = '/login';
        return;
    }

    // For now, just show an alert. In a real app, this would redirect to a booking page
    alert('Booking functionality would be implemented here. Car ID: ' + carId);
}