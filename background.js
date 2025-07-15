/**
 * Perplexity Search - Chrome Extension
 *
 * This script adds a context menu item to search selected text on Perplexity AI.
 */

// The base URL for Perplexity AI searches.
const PERPLEXITY_SEARCH_URL = "https://www.perplexity.ai/search?q=";

// A unique ID for our context menu item.
const CONTEXT_MENU_ID = "PERPLEXITY_SEARCH_CONTEXT_MENU";

/**
 * A utility function to truncate text for the context menu title, as per the requirements.
 * @param {string} text The text to truncate.
 * @returns {string} The truncated text.
 */
function getTruncatedText(text) {
  const maxLength = 30;
  const truncationLength = 27;
  if (text.length > maxLength) {
    return text.substring(0, truncationLength) + '...';
  }
  return text;
}

/**
 * Creates the context menu item when the extension is installed or updated.
 * We will update the title dynamically later.
 */
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: CONTEXT_MENU_ID,
    title: "Search Perplexity for '%s'", // Uses selected text placeholder
    contexts: ["selection"] // Only appears when text is selected
  });
});

/**
 * Handles clicks on the context menu item.
 */
chrome.contextMenus.onClicked.addListener((info, tab) => {
  // Ensure the click is from our menu item and there's text selected.
  if (info.menuItemId === CONTEXT_MENU_ID && info.selectionText) {
    // The entire selected text is used for the query, without truncation.
    const encodedQuery = encodeURIComponent(info.selectionText.trim());
    const searchUrl = `${PERPLEXITY_SEARCH_URL}${encodedQuery}`;

    // Create a new tab next to the current one to perform the search.
    chrome.tabs.create({ 
      url: searchUrl,
      index: tab.index + 1 
    });
  }
});
