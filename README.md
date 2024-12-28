Rick and Morty Characters Explorer

This project is a React-based web application that utilizes the Rick and Morty GraphQL API to display, filter, and sort characters from the series. It supports English and German languages through react-i18next.

Features:

*Character Listing
- Displays character details (Name, Status, Species, Gender, Origin) in a card layout.
- Infinite scrolling to load more characters seamlessly.

*Filtering & Sorting
- Filters: Filter by species (dynamic) and status ("Alive", "Dead", "Unknown").
- Sorting: Sort characters by Name or Origin in ascending order.

*Multilingual Support
- Supports English and German.
- All text, filters, and labels are dynamically translated.

*Dynamic Character Details
- View additional details of a character on a dedicated page, including type, location, origin, and dimension.
- Error handling for invalid character IDs with a dedicated "Character Not Found" page.

How It Works:

*Homepage
- Characters are fetched dynamically from the API and displayed in a responsive grid.
- Filters and sorting options are available above the character grid.

*Character Details
- Access detailed information about a specific character by clicking on their card.
- Handles invalid character IDs gracefully with an error page.

*Filters & Language Switcher
- Apply species and status filters, which dynamically fetch data from the API.
- The language switcher in the footer allows users to toggle between English and German.

Code Structure:

*Key Components
- Characters.tsx: Main page for listing characters with filtering, sorting, and infinite scrolling.
- CharacterDetails.tsx: Displays detailed information about a specific character.
- FilterDropdown.tsx: Reusable dropdown for filters and sorting.
- Footer.tsx: Contains the language switcher.
*Error Pages:
- NotFound.tsx: For invalid routes.
- GlobalError.tsx: For unexpected global errors.
- CharacterNotFound.tsx: For invalid character IDs.

*Utilities
- FetchSpecies.tsx: Fetches all species across all API pages for filter options.

*Localization
- en.json and de.json: Localization files for English and German translations.

Setup and Installation:

*Prerequisites
- Ensure Node.js and npm are installed.

Installation:

*Clone the repository:
- git clone https://github.com/Predragbt/Pabau-Software-Engineer-Intern-Assignment.git
- cd Pabau-Software-Engineer-Intern-Assignment/
- cd pabau-intern-assignment/

*Install dependencies:
- npm install

*Start the development server:
- npm run dev

API Integration:
- The app dynamically fetches character data using the Rick and Morty GraphQL API.

Queries Used

*Get Characters:
- Fetches paginated character data with optional filters.
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

*Fetch All Species:
- Iteratively fetches species for dynamic filtering options.

*Supported Languages
- English: Default language.
- German: Toggle using the footer switcher.

*Future Enhancements

- Add search functionality for character names.
- Enable sorting in descending order.
- Include filters for gender and location.
- Add additional languages.
- Contact


Feel free to reach out for questions or contributions:

Email: predragbt@gmail.com
GitHub: Predragbt
Enjoy exploring the world of Rick and Morty! 🎉