//DOM Elements
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const errorText = document.getElementById('errorText');
const loadingIndicator = document.getElementById('loadingIndicator');
const resultsArea = document.getElementById('resultsArea');

//Non-Functional Requirements

// Telemetry Simulation
function logAnalytics() {
    console.log("[Analytics] User interacted with Book Cover Finder");
}

// Security: XSS Sanitization
// Prevents malicious scripts from being injected via the search bar
function sanitizeInput(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

//Unhappy Path Helpers

// Displays a clean message instead of a blank screen when things fail
function showEmptyState(message) {
    resultsArea.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-md);">
            <h3>${message}</h3>
        </div>
    `;
}

//The "Happy Path": Core API Fetching
async function fetchBookData(query) {
    // Gutendex API is highly reliable, globally accessible, and requires no API key
    const url = `https://gutendex.com/books/?search=${encodeURIComponent(query)}`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        // Gutendex stores the array of books inside the 'results' property
        return data.results || []; 
    } catch (error) {
        console.error("Fetch error:", error);
        return null;
    }
}

//Main Event Listener
searchForm.addEventListener('submit', async (e) => {
    // Prevent page reload on form submit
    e.preventDefault();
    
    const rawInput = searchInput.value.trim();
    const safeQuery = sanitizeInput(rawInput);
    
    // Unhappy Path: Invalid Inputs\
    if (!safeQuery) {
        searchInput.classList.add('input-error');
        errorText.classList.remove('hidden');
        return; // Stop execution
    }
    
    // Reset UI state for a fresh search
    searchInput.classList.remove('input-error');
    errorText.classList.add('hidden');
    resultsArea.innerHTML = '';
    
    //Unhappy Path: Bad Connectivity
    //Show spinner before async operation starts
    loadingIndicator.classList.remove('hidden');
    
    let books = null;

    try {
        // Fetch the data
        books = await fetchBookData(safeQuery);
    } catch (err) {
        console.error("Unexpected execution error:", err);
    } finally {
        // Hide spinner once network request completes, regardless of success or failure
        loadingIndicator.classList.add('hidden');
    }
    
    //Unhappy Path: Empty / Error States
    if (!books) {
        showEmptyState("A network error occurred. Please try again.");
        return;
    }
    
    if (books.length === 0) {
        showEmptyState("No data found.");
        return;
    }
    
    //The "Happy Path": Render Data
    let coversFound = false;
    
    // Limit results to 15 to keep the UI clean and match previous constraints
    const limitedBooks = books.slice(0, 15);
    
    limitedBooks.forEach(book => {
        // Gutendex stores cover images inside the 'formats' object under the JPEG key
        if (book.formats && book.formats['image/jpeg']) {
            coversFound = true;
            const coverUrl = book.formats['image/jpeg'];
            const safeTitle = sanitizeInput(book.title || "Unknown Title");
            
            const card = document.createElement('div');
            card.className = 'book-card';
            
            // Build and inject the HTML structure for the book card
            card.innerHTML = `
                <img src="${coverUrl}" alt="Cover of ${safeTitle}" loading="lazy">
                <p><strong>${safeTitle}</strong></p>
            `;
            
            resultsArea.appendChild(card);
        }
    });
    
    // Edge case: The API returned books, but none of them had cover images
    if (!coversFound) {
        showEmptyState("No data found.");
    } else {
        // Telemetry ping on successful completion of the primary action
        logAnalytics(); 
    }
});