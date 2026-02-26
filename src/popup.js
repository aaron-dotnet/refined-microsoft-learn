async function initHandler(id, value) {
    document.getElementById(id).checked = value;
    document.getElementById(id).addEventListener("click", function () {

        //Use the right browser object based on the browser
        //Firefox uses the browser object while Chrome uses chrome object
        var browser = (window.browser)? window.browser : window.chrome;
        
        const currentValue = document.getElementById(id).checked;
        browser.storage.sync.set({[id]: currentValue});
        if (browser.tabs && browser.tabs.reload) {
            browser.tabs.reload();
        } else if (window.chrome && chrome.tabs && chrome.tabs.reload) {
            chrome.tabs.reload();
        }
    });
    
}

async function init() {
    const options = await getOptions();
    await initHandler(OptionRemoveSidebar, options.removeSidebar);
}

init();