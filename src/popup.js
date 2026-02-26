(function() {
    const browserApi = window.browser || window.chrome;
    const OptionRemoveSidebar = "removeSidebar";
    const OptionContentWidth = "contentWidth";

    function getStorage() {
        return browserApi.storage.sync;
    }

    function getOptions(callback) {
        getStorage().get([OptionRemoveSidebar, OptionContentWidth], function(items) {
            callback({
                removeSidebar: items[OptionRemoveSidebar] !== false,
                contentWidth: items[OptionContentWidth] || 140
            });
        });
    }

    function saveOption(key, value, callback) {
        const data = {};
        data[key] = value;
        getStorage().set(data, function() {
            if (callback) callback();
        });
    }

    function reloadTab() {
        browserApi.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            if (tabs[0] && tabs[0].url && tabs[0].url.includes('learn.microsoft.com')) {
                browserApi.tabs.reload(tabs[0].id);
            }
        });
    }

    function init() {
        getOptions(function(options) {
            const sidebarCheckbox = document.getElementById('removeSidebar');
            const widthSlider = document.getElementById('contentWidth');
            const widthValue = document.getElementById('widthValue');

            sidebarCheckbox.checked = options.removeSidebar;
            widthSlider.value = options.contentWidth;
            widthValue.textContent = options.contentWidth + '%';

            sidebarCheckbox.addEventListener('change', function() {
                saveOption(OptionRemoveSidebar, sidebarCheckbox.checked, function() {
                    reloadTab();
                });
            });

            widthSlider.addEventListener('input', function() {
                widthValue.textContent = widthSlider.value + '%';
            });

            widthSlider.addEventListener('change', function() {
                saveOption(OptionContentWidth, parseInt(widthSlider.value, 10), function() {
                    reloadTab();
                });
            });
        });
    }

    document.addEventListener('DOMContentLoaded', init);
})();
