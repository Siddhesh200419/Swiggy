# 🍔 Swiggy Clone - React + Redux App

A fully functional Swiggy-like food delivery web application built using **React.js** and **Redux** for state management. This app fetches real-time restaurant and food data from the Swiggy public API and allows users to browse, filter, and add items to their cart with a smooth and snappy experience.

🚀 **Live Demo**: [Swiggy Clone App](https://swiggy-nu-rust.vercel.app/)

---

## 🔥 Features

- 🗺️ **Location-Based Filtering**: Dynamically fetches and filters restaurants based on user’s selected city.
- 🍽️ **Restaurant & Menu Listings**: View all available restaurants and their respective food items with proper images and descriptions.
- 🛒 **Redux-Powered Cart**:
  - Add/Remove items
  - Increase/Decrease quantity
  - View total price dynamically
- 🔍 **Search Functionality**: Instantly search for restaurants or food items.
- ⚡ **Responsive Design**: Fully optimized for mobile and desktop views.
- 🎨 **Modern UI**: Built with Tailwind CSS / DaisyUI for a clean, minimal, and sleek design.

---

## 🛠️ Tech Stack

- **Frontend**: React.js (Functional Components + Hooks)
- **State Management**: Redux + React-Redux
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS / DaisyUI
- **API**: Swiggy Public API (Unofficial)
- **Deployment**: Vercel

---


## 🧠 How It Works

1. On app load, default city is used to fetch restaurant data via Swiggy API.
2. User can change location to see relevant restaurants.
3. Clicking a restaurant fetches its menu using ID.
4. Items can be added to cart with Redux managing the cart state.
5. Cart shows real-time updates with price calculations and quantity controls.

---

## 🧪 Future Enhancements

- 💳 Payment Gateway Integration
- 🗺️ Auto-detect Location using Geolocation API
- 🧾 Order History & Invoice Generation
- 💬 User Reviews & Ratings System
- 🌐 Multi-language & Accessibility support

---
