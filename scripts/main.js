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
    // Get references to all elements we need to animate
    const honeyContainer = document.querySelector('.honey-container');
    const swapArrow = document.querySelector('.swap-arrow-container');
    const locksContainer = document.querySelector('.locks-container');
    const sellButtonContainer = document.querySelector('.sell-button-container');
    const footer = document.querySelector('.footer');
    
    // Hide all elements that will be animated
    // This prevents the flicker effect
    swapModule.style.opacity = '0';
    toolbar.style.opacity = '0';
    honeyContainer.style.opacity = '0';
    swapArrow.style.opacity = '0';
    locksContainer.style.opacity = '0';
    sellButtonContainer.style.opacity = '0';
    footer.style.opacity = '0';
    
    // Remove active class from all toolbar items
    toolbarItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Initialize floating elements animation
    initFloatingElements();
    
    // Create a sequence of animations with explicit timeouts
    
    // First, animate the header
    header.classList.add('animate');
    
    // After a delay, animate the swap module container and toolbar
    setTimeout(() => {
        swapModule.style.opacity = '';
        toolbar.style.opacity = '';
        swapModule.classList.add('animate');
        toolbar.classList.add('animate');
        
        // Then animate the Honey container
        setTimeout(() => {
            honeyContainer.style.opacity = '';
            honeyContainer.classList.add('animate');
            
            // Then animate the swap arrow
            setTimeout(() => {
                swapArrow.style.opacity = '';
                swapArrow.classList.add('animate');
                
                // Then animate the LOCKS container
                setTimeout(() => {
                    locksContainer.style.opacity = '';
                    locksContainer.classList.add('animate');
                    
                    // Then animate the sell button
                    setTimeout(() => {
                        sellButtonContainer.style.opacity = '';
                        sellButtonContainer.classList.add('animate');
                        
                        // Finally, animate the footer
                        setTimeout(() => {
                            footer.style.opacity = '';
                            footer.classList.add('animate');
                        }, 50); // 50ms after sell button
                    }, 50); // 50ms after LOCKS container
                }, 100); // 100ms after swap arrow - increased delay for more separation
            }, 50); // 50ms after Honey container
        }, 100); // 100ms after swap module
    }, 300); // 300ms after header
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

// Add mouse-controlled background panning with 3D effect
document.addEventListener('mousemove', (e) => {
    const blurredBackground = document.querySelector('.blurred-background');
    if (!blurredBackground) return;
    
    // Calculate mouse position as percentage of window
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    // Calculate the offset for a more noticeable effect
    // Multiply by negative value to make background move in opposite direction of mouse
    const offsetX = -20 * (mouseX - 0.5); // -10px to 10px movement
    const offsetY = -20 * (mouseY - 0.5); // -10px to 10px movement
    
    // Calculate rotation angles for 3D effect (subtle rotation)
    const rotateY = 2 * (mouseX - 0.5); // -1deg to 1deg rotation on Y axis
    const rotateX = -2 * (mouseY - 0.5); // -1deg to 1deg rotation on X axis
    
    // Apply the transform with a transition for smoother movement
    // Add perspective and rotation for 3D effect
    blurredBackground.style.transition = 'transform 0.3s ease-out';
    blurredBackground.style.transform = `
        perspective(1000px) 
        translate(${offsetX}px, ${offsetY}px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg)
    `;
});
