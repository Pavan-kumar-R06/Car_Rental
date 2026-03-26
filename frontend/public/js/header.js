// Make sure currentUser is defined
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

function loadHeader() {
    const headerHTML = `
        <header class="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur">
            <div class="container mx-auto flex h-16 items-center justify-between px-4">
                <a href="/" class="flex items-center gap-2">
                    <span class="text-xl font-bold tracking-tight">DriveElite</span>
                </a>

                <!-- Desktop Navigation -->
                <nav class="hidden md:flex items-center gap-8">
                    <a href="/" class="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Home</a>
                    <a href="/cars" class="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Browse Cars</a>
                    <a href="/about" class="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">About</a>
                    <a href="/contact" class="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
                </nav>

                <!-- Auth Buttons -->
                <div class="hidden md:flex items-center gap-3">
                    <div class="auth-dependent" 
                        data-guest='<a href="/login" class="text-sm font-medium text-gray-600 hover:text-gray-900">Sign In</a><a href="/signup" class="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800">Sign Up</a>' 
                        
                        data-auth="<div class='relative'>
                            <button onclick='toggleUserMenu()' class='flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200'>
                                ${currentUser ? currentUser.name : ""}
                            </button>
                            <div id='userMenu' class='hidden absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10'>
                                <div class='py-1'>
                                    <a href='${currentUser && currentUser.role === "admin" ? "/admin" : "/dashboard"}' 
                                       class='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                                        My ${currentUser && currentUser.role === "admin" ? "Admin" : "Rentals"}
                                    </a>
                                    <button onclick='logout()' 
                                        class='block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100'>
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        </div>">
                    </div>
                </div>

                <!-- Mobile Menu Button -->
                <button class="md:hidden p-2" onclick="toggleMobileMenu()">
                    <svg id="menuIcon" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>

            <!-- Mobile Menu -->
            <div id="mobileMenu" class="hidden md:hidden border-t border-gray-200 bg-white">
                <nav class="container mx-auto px-4 py-4 flex flex-col gap-3">
                    <a href="/" class="text-sm font-medium py-2" onclick="toggleMobileMenu()">Home</a>
                    <a href="/cars" class="text-sm font-medium py-2" onclick="toggleMobileMenu()">Browse Cars</a>
                    <a href="/about" class="text-sm font-medium py-2" onclick="toggleMobileMenu()">About</a>
                    <a href="/contact" class="text-sm font-medium py-2" onclick="toggleMobileMenu()">Contact</a>

                    <div class="border-t border-gray-200 pt-3 mt-2 flex flex-col gap-2 auth-dependent"
                        data-guest='<a href="/login" class="inline-flex items-center justify-center px-4 py-2 bg-gray-900 text-white rounded-md">Sign In</a><a href="/signup" class="inline-flex items-center justify-center px-4 py-2 border text-gray-700 rounded-md">Sign Up</a>'
                        
                        data-auth="<a href='${currentUser && currentUser.role === "admin" ? "/admin" : "/dashboard"}'
                            class='inline-flex items-center justify-center px-4 py-2 border text-gray-700 rounded-md'
                            onclick='toggleMobileMenu()'>
                            My ${currentUser && currentUser.role === "admin" ? "Admin" : "Rentals"}
                        </a>
                        <button onclick='logout()' 
                            class='inline-flex items-center justify-center px-4 py-2 border border-red-300 text-red-600 rounded-md'>
                            Sign Out
                        </button>">
                    </div>
                </nav>
            </div>
        </header>
    `;

    const app = document.getElementById('app');
    if (app) {
        app.insertAdjacentHTML('afterbegin', headerHTML);
    }

    // Call only if exists
    if (typeof updateUIForAuth === "function") {
        updateUIForAuth();
    }
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const icon = document.getElementById('menuIcon');

    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
    } else {
        menu.classList.add('hidden');
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
    }
}

function toggleUserMenu() {
    const menu = document.getElementById('userMenu');
    if (menu) menu.classList.toggle('hidden');
}

// Close user menu when clicking outside
document.addEventListener('click', function(event) {
    const userMenu = document.getElementById('userMenu');
    const userButton = event.target.closest("button[onclick='toggleUserMenu()']");

    if (!userButton && userMenu && !userMenu.classList.contains('hidden')) {
        userMenu.classList.add('hidden');
    }
});