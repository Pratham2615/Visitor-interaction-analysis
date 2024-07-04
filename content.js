// Initialize an empty array to store interaction data
let interactionData = [];
let elementFocusData = {};

// Function to log interaction
function logInteraction(event) {
    let interaction = {
        type: event.type,
        timestamp: Date.now(),
        x: event.clientX || null,
        y: event.clientY || null,
        element: event.target.tagName,
        id: event.target.id || null,
        classList: event.target.classList ? Array.from(event.target.classList).join('.') : null
    };

    // Handle input and change events to capture typed text
    if (event.type === 'input' || event.type === 'change') {
        interaction.value = event.target.value;
    } else if (event.type === 'keydown') {
        interaction.key = event.key;
    } else if (event.type === 'scroll' || event.type === 'resize') {
        interaction.x = window.scrollX;
        interaction.y = window.scrollY;
    }

    interactionData.push(interaction);

    // Update focus data
    if (interaction.element && (interaction.type === 'click' || interaction.type === 'scroll' || interaction.type === 'mousemove')) {
        const elementKey = `${interaction.element}-${interaction.id || 'no-id'}-${interaction.classList || 'no-class'}`;
        if (!elementFocusData[elementKey]) {
            elementFocusData[elementKey] = { count: 0, timeSpent: 0, lastInteraction: Date.now() };
        }
        const currentTime = Date.now();
        const timeDifference = currentTime - elementFocusData[elementKey].lastInteraction;
        elementFocusData[elementKey].count += 1;
        elementFocusData[elementKey].timeSpent += timeDifference;
        elementFocusData[elementKey].lastInteraction = currentTime;
    }

    console.log(interaction);

    // Send interaction data to the background script
    chrome.runtime.sendMessage({ type: 'logInteraction', data: interaction }, (response) => {
        if (response.status === 'success') {
            console.log('Interaction logged successfully');
        }
    });
}

// Add event listeners for various interaction types
function addEventListeners() {
    document.addEventListener('click', logInteraction);
    document.addEventListener('mousemove', logInteraction);
    document.addEventListener('touchstart', logInteraction);
    document.addEventListener('keydown', logInteraction);
    document.addEventListener('scroll', logInteraction);
    document.addEventListener('dblclick', logInteraction); // Double click
    document.addEventListener('contextmenu', logInteraction); // Right click/context menu
    document.addEventListener('mousedown', logInteraction); // Mouse button pressed
    document.addEventListener('mouseup', logInteraction); // Mouse button released
    document.addEventListener('mouseenter', logInteraction); // Mouse enters an element
    document.addEventListener('mouseleave', logInteraction); // Mouse leaves an element
    window.addEventListener('resize', logInteraction); // Window resize
    document.addEventListener('focus', logInteraction, true); // Element gains focus
    document.addEventListener('blur', logInteraction, true); // Element loses focus

    // Additional interaction types
    document.addEventListener('dragstart', logInteraction); // Drag start
    document.addEventListener('dragend', logInteraction); // Drag end
    document.addEventListener('drop', logInteraction); // Drop
    document.addEventListener('input', logInteraction); // Input change
    document.addEventListener('change', logInteraction); // Change
    document.addEventListener('copy', logInteraction); // Copy
    document.addEventListener('paste', logInteraction); // Paste
}

// Function to process and generate narrative
function generateNarrative() {
    const summary = `User interactions summary: ${interactionData.length} events logged.`;
    console.log(summary);

    // Generate attention analysis
    const focusElements = Object.keys(elementFocusData).sort((a, b) => {
        return elementFocusData[b].timeSpent - elementFocusData[a].timeSpent;
    });

    const attentionSummary = focusElements.map(key => {
        const element = elementFocusData[key];
        return `${key.split('-')[0]} (${key.split('-')[1] || 'no id'}): ${element.count} interactions, ${element.timeSpent} ms spent`;
    }).slice(0, 5).join('\n');

    const fullSummary = `${summary}\n\nTop 5 elements by attention:\n${attentionSummary}`;

    // Here you would integrate with the LLM to generate a narrative
    // For now, we just display a simple summary
    document.getElementById('overlay').innerText = fullSummary;

    // Clear interaction data every 5 seconds to avoid memory overflow
    interactionData = [];
}

// Add overlay to the page to display narrative
function addOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.style.position = 'fixed';
    overlay.style.bottom = '10px';
    overlay.style.right = '10px';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    overlay.style.color = 'white';
    overlay.style.padding = '10px';
    document.body.appendChild(overlay);
}

// Ensure event listeners and overlay are added on script load
(function initialize() {
    addEventListeners();
    addOverlay();
    setInterval(generateNarrative, 5000);
})();
