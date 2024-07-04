# Visitor Interaction Analysis Chrome Extension

This Chrome extension captures detailed interactions of all visitor actions on a website, including clicks, hovers, touches, typing, swipes, and scrolls. It uses this data to construct a narrative summary that reflects the visitor's needs and interests.

## Features

- Tracks various user interactions
- Analyzes interaction data to identify where the user's attention is focused
- Generates a narrative summary of the user's interactions every 5 seconds

## Tracking Modes

The extension tracks the following types of interactions:

1. Click (`click`)
2. Mouse Move (`mousemove`)
3. Touch Start (`touchstart`)
4. Key Down (`keydown`)
5. Scroll (`scroll`)
6. Double Click (`dblclick`)
7. Context Menu (`contextmenu`)
8. Mouse Down (`mousedown`)
9. Mouse Up (`mouseup`)
10. Mouse Enter (`mouseenter`)
11. Mouse Leave (`mouseleave`)
12. Resize (`resize`)
13. Focus (`focus`)
14. Blur (`blur`)
15. Drag Start (`dragstart`)
16. Drag End (`dragend`)
17. Drop (`drop`)
18. Input (`input`)
19. Change (`change`)
20. Copy (`copy`)
21. Paste (`paste`)

## Code Structure

- `content.js`: The main script that captures user interactions and generates the narrative summary.
- `background.js`: Handles the installation event of the extension.
- `manifest.json`: The manifest file that defines the extension's permissions and files.
- `popup.html`: The HTML file for the extension's popup.

### content.js

This file includes the following key functions:

- `logInteraction(event)`: Logs various user interactions.
- `addEventListeners()`: Adds event listeners for tracking interactions.
- `generateNarrative()`: Generates a summary of user interactions and attention analysis.
- `addOverlay()`: Adds an overlay to display the narrative summary.
- `initialize()`: Initializes event listeners and the overlay.

### background.js

Handles the installation event of the extension



## EXAMPLE

# Inputs
User interactions such as:

Clicking on elements
Moving the mouse
Typing in text fields
Scrolling the page
Dragging and dropping elements
Outputs
Console logs of interactions and an overlay displaying a summary. For example:

# Console logs of interaction
{
    "type": "click",
    "timestamp": 1679910104358,
    "x": 200,
    "y": 300,
    "element": "BUTTON",
    "id": "submitBtn",
    "classList": ["btn", "btn-primary"]
}

# Overlay Summary
User interactions summary: 10 events logged.

Top 5 elements by attention:
DIV (no id): 5 interactions, 1500 ms spent
BUTTON (submitBtn): 3 interactions, 900 ms spent
INPUT (searchBox): 2 interactions, 600 ms spent


### Installation
Clone this repository.
Open Chrome and navigate to chrome://extensions/.
Enable "Developer mode" in the top right corner.
Click "Load unpacked" and select the directory containing this extension's files.

### Usage
Open any website in Chrome.
Click the extension icon in the toolbar to activate it.
Interact with the website as usual.
Open the browser console (Press Ctrl+Shift+I) to view logged interactions.
Observe the overlay for the narrative summary of interactions.