// Main JavaScript file

// DOM Elements
const header = document.querySelector('.header');
const toolbar = document.querySelector('.toolbar');
const swapModule = document.querySelector('.swap-module');
const swapArrowButton = document.querySelector('.swap-arrow-button');
const tokenSelectors = document.querySelectorAll('.token-selector');
const amountInputs = document.querySelectorAll('.amount-input');
const sellButton = document.querySelector('.sell-button');
const toolbarItems = document.querySelectorAll('.toolbar-item');
const connectButton = document.querySelector('.connect-button');
const chainButton = document.querySelector('.chain-button');

// Mock Data
const mockTokens = [
    { symbol: 'HONEY', name: 'Honey', balance: '122.0' },
    { symbol: 'LOCKS', name: 'Locks', balance: '27.0' }
];

// Add animation classes on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes
    header.classList.add('animate');
    toolbar.classList.add('animate');
    swapModule.classList.add('animate');
    
    // Remove active class from all toolbar items
    toolbarItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Initialize floating elements animation
    initFloatingElements();
});

// Swap Arrow Button Click Event
swapArrowButton.addEventListener('click', () => {
    // Toggle active class for rotation
    swapArrowButton.classList.toggle('active');
    
    // Get token data and input values
    const topTokenSelector = document.querySelector('.token-input-container:first-of-type .token-selector');
    const bottomTokenSelector = document.querySelector('.token-input-container:last-of-type .token-selector');
    const topInput = document.querySelector('.token-input-container:first-of-type .amount-input');
    const bottomInput = document.querySelector('.token-input-container:last-of-type .amount-input');
    
    // Get token data
    const topTokenIcon = topTokenSelector.querySelector('.token-icon').src;
    const topTokenName = topTokenSelector.querySelector('.token-name').textContent;
    const bottomTokenIcon = bottomTokenSelector.querySelector('.token-icon').src;
    const bottomTokenName = bottomTokenSelector.querySelector('.token-name').textContent;
    
    // Get input values
    const topValue = topInput.value;
    const bottomValue = bottomInput.value;
    
    // Swap token data with animation
    setTimeout(() => {
        // Swap token data
        topTokenSelector.querySelector('.token-icon').src = bottomTokenIcon;
        topTokenSelector.querySelector('.token-name').textContent = bottomTokenName;
        bottomTokenSelector.querySelector('.token-icon').src = topTokenIcon;
        bottomTokenSelector.querySelector('.token-name').textContent = topTokenName;
        
        // Swap input values
        topInput.value = bottomValue;
        bottomInput.value = topValue;
    }, 150); // Half of the rotation animation time
});

// Removed token modal functionality since we now have fixed tokens

// Amount Input Event
amountInputs.forEach(input => {
    input.addEventListener('input', (e) => {
        // In a real app, this would calculate the equivalent amount in the other token
        // For this demo, we'll just set a mock conversion rate
        const container = input.closest('.token-input-container');
        const isTop = container === document.querySelector('.token-input-container:first-of-type');
        const otherInput = isTop 
            ? document.querySelector('.token-input-container:last-of-type .amount-input')
            : document.querySelector('.token-input-container:first-of-type .amount-input');
        
        // Mock conversion rate: 1 HONEY = 0.22 LOCKS
        const conversionRate = 0.22;
        const value = parseFloat(input.value) || 0;
        
        if (isTop) {
            otherInput.value = (value * conversionRate).toFixed(2);
        } else {
            otherInput.value = (value / conversionRate).toFixed(2);
        }
    });
});

// Sell Button Click Event
sellButton.addEventListener('click', () => {
    // In a real app, this would execute the swap
    // For this demo, we'll just show an animation
    sellButton.classList.add('shake');
    setTimeout(() => {
        sellButton.classList.remove('shake');
        alert('Swap executed successfully! (This is a demo)');
        
        // Reset input values
        amountInputs.forEach(input => {
            input.value = '';
        });
    }, 500);
});

// Toolbar Item Click Event
toolbarItems.forEach(item => {
    // Add click event listener to all toolbar items
    item.addEventListener('click', () => {
        // Only process click for the Redeem item
        if (item.dataset.tool === 'redeem') {
            // Toggle active class on the clicked item
            if (item.classList.contains('active')) {
                // If already active, remove the active class
                item.classList.remove('active');
            } else {
                // Remove active class from all toolbar items
                toolbarItems.forEach(i => i.classList.remove('active'));
                // Add active class to the clicked item
                item.classList.add('active');
            }
            
            // In a real app, this would show the corresponding panel
            // For this demo, we'll just log the selected tool
            console.log(`Selected tool: ${item.dataset.tool}`);
        }
        // For other items, do nothing (they're just hoverable)
    });
});

// Slippage Tooltip OK Button Click Event
const slippageOkButton = document.querySelector('.slippage-ok-button');
if (slippageOkButton) {
    slippageOkButton.addEventListener('click', () => {
        // Get the slippage value
        const slippageInput = document.querySelector('.slippage-input');
        const slippageValue = slippageInput.value;
        
        // In a real app, this would set the slippage value for the swap
        console.log(`Slippage set to: ${slippageValue}`);
        
        // Hide the tooltip
        const slippageTooltip = document.querySelector('.slippage-tooltip');
        slippageTooltip.style.opacity = '0';
        slippageTooltip.style.visibility = 'hidden';
        
        // After a short delay, reset the tooltip visibility to be controlled by CSS
        setTimeout(() => {
            slippageTooltip.style.opacity = '';
            slippageTooltip.style.visibility = '';
        }, 300); // Match the transition duration
    });
}

// Connect Button Click Event
connectButton.addEventListener('click', () => {
    // In a real app, this would open a wallet connection modal
    // For this demo, we'll just toggle the button text
    if (connectButton.textContent === 'Connect') {
        connectButton.textContent = '0x29d...05f'; // Truncated wallet address
        connectButton.classList.add('connected'); // Add connected class for styling
    } else {
        connectButton.textContent = 'Connect';
        connectButton.classList.remove('connected'); // Remove connected class
    }
});

// Chain Button Click Event - Removed since the button has been removed from the UI

// No need for updateBalances function since we have fixed tokens with fixed balances

// Initialize Floating Elements Animation
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        // Set random initial positions within constraints
        const randomX = Math.random() * 10 - 5; // -5 to 5
        const randomY = Math.random() * 10 - 5; // -5 to 5
        
        // Apply animation with CSS
        element.style.animation = `float${index + 1} ${20 + index * 5}s ease-in-out infinite`;
        
        // Create keyframes for each element
        const keyframes = `
            @keyframes float${index + 1} {
                0% {
                    transform: translate(0, 0);
                }
                50% {
                    transform: translate(${randomX}%, ${randomY}%);
                }
                100% {
                    transform: translate(0, 0);
                }
            }
        `;
        
        // Add keyframes to document
        const style = document.createElement('style');
        style.innerHTML = keyframes;
        document.head.appendChild(style);
    });
}
