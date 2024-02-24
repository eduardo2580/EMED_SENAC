document.addEventListener("DOMContentLoaded", function() {
    const overlay = document.getElementById("termsOverlay");
    const closePopupButton = document.getElementById("closePopup");

    // Function to check for localStorage support
    function hasLocalStorage() {
        try {
            localStorage.setItem("test", "test");
            localStorage.removeItem("test");
            return true;
        } catch (e) {
            return false;
        }
    }

    // Function to set a cookie
    function setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = name + "=" + value + ";expires=" + expires.toUTCString() + ";path=/";
    }

    // Function to get a cookie value
    function getCookie(name) {
        const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : '';
    }

    // Check if the user has seen and closed the pop-up before
    let hasSeenPopup = false;
    if (hasLocalStorage()) {
        hasSeenPopup = localStorage.getItem("hasSeenPopup") === "true";
    } else {
        hasSeenPopup = getCookie("hasSeenPopup") === "true";
    }

    // If the user hasn't seen the pop-up before, show it
    if (!hasSeenPopup) {
        overlay.style.display = "block";
    }

    // Function to hide the pop-up and set the flag
    function hidePopup() {
        overlay.style.display = "none";
        if (hasLocalStorage()) {
            localStorage.setItem("hasSeenPopup", "true");
        } else {
            setCookie("hasSeenPopup", "true", 30); // Set a cookie that expires in 30 days
        }
    }

    // Event listeners
    closePopupButton.addEventListener("click", hidePopup);
    window.addEventListener("click", function(event) {
        if (event.target === overlay) {
            hidePopup();
        }
    });
});
