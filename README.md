Rick and Morty Characters Explorer

This project is a web application built with React that uses the Rick and Morty API to display, filter, and sort characters from the popular TV series. It also supports multilingual functionality (English and German) using react-i18next.

Features
Character Listing:

Displays all Rick and Morty characters in a card layout with details like name, status, species, gender, and origin.
Cards are paginated with infinite scrolling.
Filtering Options:

Filter by Species: Choose from all available species of characters.
Filter by Status: Filter characters by "Alive", "Dead", or "Unknown" statuses.
Sorting Options:

Sort characters by Name or Origin in ascending order.
Multilingual Support:

Toggle between English and German using the language switcher in the footer.
All UI text and filter options are translated dynamically.
Dynamic API Queries:

The app fetches data dynamically from the Rick and Morty GraphQL API based on user-selected filters.
How It Works
Homepage
Displays characters as cards in a responsive grid layout.
Each card includes:
Name (localized if available).
Status (Alive, Dead, Unknown).
Species.
Gender.
Origin location.
A placeholder button for potential future actions.
Filters
The filter dropdowns allow users to filter characters by species and status:
Species: Populated dynamically from the API.
Status: Predefined options ("Alive", "Dead", "Unknown").
Filters are applied by querying the API with the selected filter values.
A "Sort By" dropdown allows sorting by name or origin.
Infinite Scrolling
As you scroll, additional pages of characters are fetched from the API and appended to the list.
This provides a seamless browsing experience without needing to click pagination buttons.
Language Switcher
Located in the footer, the language switcher allows users to switch between English and German.
Upon switching, all UI elements, including filter dropdowns, status values, and labels, are updated to reflect the selected language.
Code Structure
Characters.tsx:

Main component responsible for fetching and displaying characters.
Handles filters, sorting, infinite scrolling, and localization.
FilterDropdown.tsx:

A reusable dropdown component for filters and sorting.
Dynamically translates options and labels based on the selected language.
Card.tsx:

A reusable card component for displaying character details.
Supports localization for all displayed fields.
Footer.tsx:

Contains the language switcher.
Allows users to toggle between supported languages (English and German).
fetchAllSpecies.tsx:

A utility function to fetch all species dynamically from the API.
Localization Files (en.json and de.json):

Define translations for UI labels and dynamic data (e.g., status and species names).
Ensure all texts are translated into supported languages.
Setup and Installation
Prerequisites
Node.js and npm installed on your machine.
Installation
Clone the repository:
bash
Copy code
git clone https://github.com/your-repo/rick-and-morty-explorer.git
cd rick-and-morty-explorer
Install dependencies:
bash
Copy code
npm install
Run the Development Server
bash
Copy code
npm start
The application will be available at http://localhost:3000.

API Integration
The app fetches character data dynamically using the Rick and Morty GraphQL API.
API Endpoint: https://rickandmortyapi.com/graphql.
Queries Used:
Get Characters: Fetches characters with optional filters (species and status) and pagination.

graphql
Copy code
query GetCharacters($page: Int, $filter: FilterCharacter) {
  characters(page: $page, filter: $filter) {
    info {
      count
      pages
      next
      prev
    }
    results {
      id
      name
      status
      species
      gender
      image
      origin {
        name
      }
    }
  }
}
Fetch All Species: Iteratively fetches species across all pages for the species filter dropdown.

Languages Supported
English (en.json): Default language.
German (de.json): Toggle using the language switcher.
Future Enhancements
Add search functionality for character names.
Include additional filters such as gender or location.
Allow sorting in descending order.
Add more languages for localization.
Contact
Feel free to reach out if you have questions or want to contribute:

Email: predragbt@gmail.com
GitHub: https://github.com/Predragbt
Enjoy exploring the world of Rick and Morty! 🎉