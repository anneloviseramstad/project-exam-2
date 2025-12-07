<template>
  <section class="container mx-auto px-4 py-16 max-w-5xl">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4">Contact Us</h1>
      <p class="text-gray-600 text-lg max-w-2xl mx-auto">
        We’re here to help! Whether you’re booking your next stay or managing
        your venues, our support team is ready to assist you with anything you
        need.
      </p>
    </div>
    <div class="w-full mb-12">
      <img
        src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1500&auto=format&fit=crop"
        alt="Office workspace"
        class="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
      />
    </div>
    <div class="grid md:grid-cols-2 gap-12">
      <div>
        <h2 class="text-2xl font-semibold mb-4">Reach Out</h2>
        <p class="text-gray-700 mb-4">
          Have questions about bookings, venues, or your account? We’re just a
          message away.
        </p>
        <ul class="space-y-4 text-gray-800">
          <li>
            <strong>Email:</strong>
            <a
              href="mailto:support@holidaze.com"
              class="text-blue-600 hover:underline"
            >
              support@holidaze.com
            </a>
          </li>
          <li><strong>Phone:</strong> +47 123 45 678</li>
          <li>
            <strong>Opening Hours:</strong>
            <div class="ml-1">
              Monday – Friday: 08:00–18:00
              <br />
              Weekends: 10:00–16:00
            </div>
          </li>
          <li>
            <strong>Address:</strong>
            Holidaze HQ
            <br />
            Storgata 45, 0155 Oslo, Norway
          </li>
        </ul>
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-4">Send a Message</h2>
        <form class="space-y-4">
          <div>
            <label class="block mb-1 font-medium">Your Name</label>
            <input
              type="text"
              class="w-full border border-gray-300 rounded-lg p-3"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label class="block mb-1 font-medium">Email Address</label>
            <input
              type="email"
              class="w-full border border-gray-300 rounded-lg p-3"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label class="block mb-1 font-medium">Message</label>
            <textarea
              class="w-full border border-gray-300 rounded-lg p-3 h-32 resize-none"
              placeholder="How can we help?"
            ></textarea>
          </div>
          <button
            type="submit"
            class="w-full bg-gray-900 text-white py-3 rounded-full font-medium hover:bg-gray-800 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
