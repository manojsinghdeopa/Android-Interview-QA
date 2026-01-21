# Android Interview Q&A

A web application for browsing Android interview questions and answers, organized by categories.

## Description

This project provides an interactive web app where users can explore various Android development topics through categorized questions and detailed answers. The app features a responsive grid layout, search functionality, and pagination for easy navigation.

## Features

- **Category Grid**: Browse Android topics in a visually appealing grid layout.
- **Search Functionality**: Filter categories by title using the search bar.
- **Pagination**: Navigate through categories with previous/next buttons.
- **Detailed Views**: Click on any category to view detailed Q&A in a modal overlay.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Lazy Loading**: Images load efficiently to improve performance.

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Firebase Firestore for storing detailed content
- **Hosting**: Firebase Hosting
- **Data**: JSON for categories, Firestore for detailed answers

## Project Structure

```
/
├── firebase.json          # Firebase configuration
├── public/
│   ├── index.html         # Main page with category grid
│   ├── details.html       # Details page for individual categories
│   ├── app.js             # Main JavaScript logic
│   ├── categories.json    # Category data with titles and images
│   └── images/            # Category images
```

## Setup and Installation

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd Android-Interview-QA
   ```

2. **Install Firebase CLI** (if not already installed):
   ```
   npm install -g firebase-tools
   ```

3. **Login to Firebase**:
   ```
   firebase login
   ```

4. **Initialize Firebase project** (if needed):
   ```
   firebase init
   ```
   Select Hosting and Firestore, and configure as per your project.

5. **Update Firebase Config**:
   - In `public/details.html`, update the `firebaseConfig` with your actual Firebase project details.

## Local Development

To run the app locally:

1. Start Firebase emulators:
   ```
   firebase emulators:start
   ```

2. Open `http://localhost:5000` in your browser.

For static testing without Firestore, you can open `public/index.html` directly in a browser, but details won't load.

## Deployment

Deploy to Firebase Hosting:

```
firebase deploy
```

This will build and deploy the app to your Firebase project.

## Data Management

- **Categories**: Stored in `public/categories.json`. Each category has an `id`, `title`, and `image` path.
- **Details**: Stored in Firebase Firestore under the `android` collection. Each document corresponds to a category `id` and contains the `text` field with HTML content.

To add new categories:
1. Add an entry to `categories.json`.
2. Create a corresponding document in Firestore.
3. Add an image to `public/images/`.

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Test locally.
5. Submit a pull request.

## License

This project is open-source. Please check the license file for details.