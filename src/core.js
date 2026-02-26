// declare constants
const OptionRemoveSidebar = "removeSidebar";
const OptionContentWidth = "contentWidth";

const MainColumnSelector = "[data-main-column]";
const MainColumnCssClass = "rf-ms-learn-main-column";

const SidebarColumnSelector = "#ms--additional-resources";

const storageApi = (typeof browser !== 'undefined' && browser.storage) ? browser.storage : chrome.storage;

async function getOptions() {
    const current = await storageApi.sync.get();
    return {
        removeSidebar: current[OptionRemoveSidebar] ?? true,
        contentWidth: current[OptionContentWidth] ?? 140,
    };
}