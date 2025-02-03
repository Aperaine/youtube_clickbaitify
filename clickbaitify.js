// Throttling MutationObserver with a debounce mechanism
let observerTimeout = null;

// Mutation observer callback
const mutationCallback = (mutations) => {
    if (observerTimeout) return; // Avoid frequent triggering

    observerTimeout = requestAnimationFrame(() => {
        observerTimeout = null; // Reset throttle

        // Process video thumbnails
        const videoThumbnails = document.querySelectorAll('ytd-thumbnail yt-image, .ytp-videowall-still-image, yt-thumbnail-view-model');
        videoThumbnails.forEach(e => {
            if (e.classList.contains('clickbaitified')) return; // Skip processed elements
            const img = document.createElement('IMG');
            img.src = chrome.runtime.getURL(`images/longs/Clickbaitify${Math.floor(Math.random() * 20)}.png`);
            img.style.position = 'absolute';
            img.style.width = '100%';
            img.style.left = 0;
            img.style.bottom = 0;
            img.style.objectFit = 'cover';
            e.append(img);
            e.classList.add('clickbaitified');
        });

        // Process Shorts thumbnails
        const shortsThumbnails = document.querySelectorAll('div[class*="shorts-thumbnail"], div.shortsLockupViewModelHostThumbnailContainer');
        shortsThumbnails.forEach(e => {
            if (e.classList.contains('clickbaitified')) return; // Skip processed elements
            const img = document.createElement('IMG');
            img.src = chrome.runtime.getURL(`images/shorts/SClickbaitify${Math.floor(Math.random() * 10)}.png`);
            img.style.position = 'absolute';
            img.style.width = '100%';
            img.style.left = 0;
            img.style.bottom = 0;
            img.style.objectFit = 'cover';
            e.append(img);
            e.classList.add('clickbaitified');
        });
    });
};

// MutationObserver setup
const observer = new MutationObserver(mutationCallback);
observer.observe(document.body, { subtree: true, childList: true });
