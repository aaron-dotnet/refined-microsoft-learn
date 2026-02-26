const browserApi = window.browser || window.chrome;

async function initHandler(id, value) {
    document.getElementById(id).checked = value;
    document.getElementById(id).addEventListener("click", function () {
        const currentValue = document.getElementById(id).checked;
        browserApi.storage.sync.set({[id]: currentValue});
        
        const tabsApi = browserApi.tabs || window.chrome?.tabs;
        if (tabsApi?.reload) {
            tabsApi.reload();
        }
    });
}

async function init() {
    const options = await getOptions();
    await initHandler(OptionRemoveSidebar, options.removeSidebar);
}

init();