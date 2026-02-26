// Cache for options to avoid repeated storage queries
let optionsCache = null;

async function getOptionsCached() {
    if (optionsCache) return optionsCache;
    optionsCache = await getOptions();
    return optionsCache;
}

async function applyStyles() {
    const options = await getOptionsCached();

    if (options.removeSidebar) {
        const mainColumn = document.querySelector(MainColumnSelector);
        const sidebar = document.querySelector(SidebarColumnSelector);

        if (sidebar) sidebar.remove();

        const aside = document.querySelector('#layout-body-aside');
        if (aside) aside.remove();

        if (mainColumn) mainColumn.classList.add(MainColumnCssClass);
    }

    const surveyPopOver = document.querySelector("#survey-popover");
    if (surveyPopOver) surveyPopOver.remove();
}

applyStyles();
