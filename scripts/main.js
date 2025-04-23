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
    { symbol: 'ETH', name: 'Ethereum', balance: '1.5' },
    { symbol: 'GOLD', name: 'Goldiswap', balance: '1000.0' },
    { symbol: 'USDT', name: 'Tether', balance: '2500.0' },
    { symbol: 'BTC', name: 'Bitcoin', balance: '0.05' },
    { symbol: 'USDC', name: 'USD Coin', balance: '2500.0' }
];

// Add animation classes on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes
    header.classList.add('animate');
    toolbar.classList.add('animate');
    swapModule.classList.add('animate');
    
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
    const topTokenIcon = topTokenSelector.querySelector('.token-icon').textContent;
    const topTokenName = topTokenSelector.querySelector('.token-name').textContent;
    const bottomTokenIcon = bottomTokenSelector.querySelector('.token-icon').textContent;
    const bottomTokenName = bottomTokenSelector.querySelector('.token-name').textContent;
    
    // Get input values
    const topValue = topInput.value;
    const bottomValue = bottomInput.value;
    
    // Swap token data with animation
    setTimeout(() => {
        // Swap token data
        topTokenSelector.querySelector('.token-icon').textContent = bottomTokenIcon;
        topTokenSelector.querySelector('.token-name').textContent = bottomTokenName;
        bottomTokenSelector.querySelector('.token-icon').textContent = topTokenIcon;
        bottomTokenSelector.querySelector('.token-name').textContent = topTokenName;
        
        // Swap input values
        topInput.value = bottomValue;
        bottomInput.value = topValue;
        
        // Update balances
        updateBalances();
    }, 150); // Half of the rotation animation time
});

// Token Selector Click Event
tokenSelectors.forEach(selector => {
    selector.addEventListener('click', (e) => {
        // In a real app, this would open a token selection modal
        // For this demo, we'll just cycle through the mock tokens
        const currentSymbol = selector.querySelector('.token-icon').textContent;
        const currentIndex = mockTokens.findIndex(token => token.symbol === currentSymbol);
        const nextIndex = (currentIndex + 1) % mockTokens.length;
        const nextToken = mockTokens[nextIndex];
        
        // Update token data
        selector.querySelector('.token-icon').textContent = nextToken.symbol;
        selector.querySelector('.token-name').textContent = nextToken.name;
        
        // Update balance
        const container = selector.closest('.token-input-container');
        container.querySelector('.balance-amount').textContent = nextToken.balance;
    });
});

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
        
        // Mock conversion rate: 1 ETH = 1000 GOLD
        const conversionRate = 1000;
        const value = parseFloat(input.value) || 0;
        
        if (isTop) {
            otherInput.value = (value * conversionRate).toFixed(2);
        } else {
            otherInput.value = (value / conversionRate).toFixed(6);
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
    item.addEventListener('click', () => {
        // Toggle active class
        toolbarItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        
        // In a real app, this would show the corresponding panel
        // For this demo, we'll just log the selected tool
        console.log(`Selected tool: ${item.dataset.tool}`);
    });
});

// Connect Button Click Event
connectButton.addEventListener('click', () => {
    // In a real app, this would open a wallet connection modal
    // For this demo, we'll just toggle the button text
    if (connectButton.textContent === 'Connect') {
        connectButton.textContent = 'Connected';
        // Update mock balances
        updateBalances();
    } else {
        connectButton.textContent = 'Connect';
    }
});

// Chain Button Click Event
chainButton.addEventListener('click', () => {
    // In a real app, this would open a chain selection modal
    // For this demo, we'll just cycle through some chains
    const chains = ['Ethereum', 'Berachain', 'Arbitrum', 'Optimism'];
    const currentChain = chainButton.querySelector('.chain-name').textContent;
    const currentIndex = chains.indexOf(currentChain);
    const nextIndex = (currentIndex + 1) % chains.length;
    
    chainButton.querySelector('.chain-name').textContent = chains[nextIndex];
});

// Update Balances Function
function updateBalances() {
    const topTokenSymbol = document.querySelector('.token-input-container:first-of-type .token-icon').textContent;
    const bottomTokenSymbol = document.querySelector('.token-input-container:last-of-type .token-icon').textContent;
    
    const topToken = mockTokens.find(token => token.symbol === topTokenSymbol);
    const bottomToken = mockTokens.find(token => token.symbol === bottomTokenSymbol);
    
    if (topToken) {
        document.querySelector('.token-input-container:first-of-type .balance-amount').textContent = topToken.balance;
    }
    
    if (bottomToken) {
        document.querySelector('.token-input-container:last-of-type .balance-amount').textContent = bottomToken.balance;
    }
}

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
