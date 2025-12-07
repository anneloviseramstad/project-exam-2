<template>
  <div class="bg-gray-50 min-h-screen">
    <section
      class="relative bg-gray-900 text-white py-24 px-6 md:px-12 text-center"
    >
      <h1 class="text-4xl font-bold mb-4">Welcome to Holidaze</h1>
      <p class="max-w-2xl mx-auto text-lg md:text-xl">
        Your go-to platform for discovering, booking, and managing unique
        accommodations across Scandinavia and beyond.
      </p>
    </section>
    <section class="py-16 px-6 md:px-12 text-center">
      <h2 class="text-3xl font-semibold mb-6">Our Mission</h2>
      <p class="max-w-3xl mx-auto text-gray-700 leading-relaxed">
        At Holidaze, we believe that travel should be effortless and inspiring.
        Our mission is to connect travellers with exceptional venues while
        empowering venue managers to reach their ideal guests. By combining
        intuitive design, transparent information, and reliable booking tools,
        we aim to make every stay memorable.
      </p>
    </section>
    <section class="bg-white py-16 px-6 md:px-12">
      <h2 class="text-3xl font-semibold text-center mb-12">For Travellers</h2>
      <div class="max-w-5xl mx-auto grid gap-10 md:grid-cols-2">
        <div class="space-y-4">
          <h3 class="text-xl font-bold">Find Your Perfect Stay</h3>
          <p class="text-gray-700 leading-relaxed">
            From cozy forest cabins to luxury lakeside villas, Holidaze offers a
            diverse selection of accommodations for all types of travellers.
          </p>
          <ul class="list-inside text-gray-700 space-y-2">
            <li class="list-disc font-semibold">
              Browse and search for venues by city, location, and available
              dates
            </li>
            <li class="list-disc font-semibold">
              Check real-time availability with up-to-date calendars
            </li>
            <li class="list-disc font-semibold">
              Filter by number of guests, facilities, and amenities
            </li>
            <li class="list-disc font-semibold">
              Read detailed descriptions and view high-quality images
            </li>
          </ul>
        </div>
        <div class="flex justify-center items-center">
          <img
            src="https://images.unsplash.com/photo-1566675086346-8cca052f2068?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Travellers enjoying a stay"
            class="rounded-lg shadow-lg w-full max-w-md object-cover"
          />
        </div>
      </div>
    </section>
    <section class="py-16 px-6 md:px-12 bg-gray-50">
      <h2 class="text-3xl font-semibold text-center mb-12">
        For Venue Managers
      </h2>
      <div class="max-w-5xl mx-auto grid gap-10 md:grid-cols-2">
        <div class="flex justify-center items-center">
          <img
            src="https://images.unsplash.com/photo-1664575602276-acd073f104c1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Venue manager managing bookings"
            class="rounded-lg shadow-lg w-full max-w-md object-cover"
          />
        </div>
        <div class="space-y-4">
          <h3 class="text-xl font-bold">Showcase & Manage Your Venues</h3>
          <p class="text-gray-700 leading-relaxed">
            Holidaze is built for venue managers who want to showcase their
            properties and simplify booking management.
          </p>
          <ul class="list-inside text-gray-700 space-y-2">
            <li class="list-disc font-semibold">
              Create, edit, and delete venue listings
            </li>
            <li class="list-disc font-semibold">
              Upload photos and highlight facilities such as WiFi, parking,
              breakfast, and pet-friendliness
            </li>
            <li class="list-disc font-semibold">
              Manage bookings with an intuitive dashboard
            </li>
            <li class="list-disc font-semibold">
              Communicate seamlessly with guests and provide a personalized
              experience
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section class="py-16 px-6 md:px-12 bg-white">
      <h2 class="text-3xl font-semibold text-center mb-12">
        Why Choose Holidaze?
      </h2>
      <div class="max-w-4xl mx-auto grid gap-8 md:grid-cols-3 text-center">
        <div
          class="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition"
        >
          <h3 class="font-bold text-lg mb-2">Reliable Information</h3>
          <p class="text-gray-700 text-sm">
            Detailed descriptions, accurate availability, and high-quality
            images.
          </p>
        </div>
        <div
          class="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition"
        >
          <h3 class="font-bold text-lg mb-2">User-Friendly Interface</h3>
          <p class="text-gray-700 text-sm">
            Easy search, filters, and booking process for a seamless experience.
          </p>
        </div>
        <div
          class="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition"
        >
          <h3 class="font-bold text-lg mb-2">Security & Support</h3>
          <p class="text-gray-700 text-sm">
            Secure login, registration, and professional support for both
            travellers and venue managers.
          </p>
        </div>
      </div>
    </section>
    <section class="py-16 px-6 md:px-12 text-center bg-gray-900 text-white">
      <h2 class="text-3xl font-semibold mb-4">Join Us Today</h2>
      <p class="max-w-2xl mx-auto mb-8">
        Whether you’re a traveller seeking your next adventure or a venue
        manager ready to welcome guests, Holidaze makes every journey seamless,
        enjoyable, and unforgettable.
      </p>
      <router-link
        to="/auth"
        class="inline-block px-8 py-3 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition"
      >
        Get Started
      </router-link>
    </section>
  </div>
</template>
