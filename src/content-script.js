async function applyStyles() {
    const options = await getOptions();
    //console.log(options);

    if (options.removeSidebar) {
        // console.log("Removing sidebar");
        const mainColumn = document.querySelector(MainColumnSelector);
        const sidebar = document.querySelector(SidebarColumnSelector);

        if (sidebar) {
            sidebar.remove();
        }

        // also remove/hide the aside container so main content can expand
        const aside = document.querySelector('#layout-body-aside');
        if (aside) {
            aside.remove();
        }

        if (mainColumn) {
            mainColumn.classList.add(MainColumnCssClass);
        }
    }
    // floating TOC (pinning) removed — no-op

    // Force main layout to expand: set inline styles on main and inner containers
    try {
        const mainEl = document.getElementById('main') || document.querySelector('.layout-body-main');
        if (mainEl) {
            mainEl.style.maxWidth = 'none';
            mainEl.style.width = '100%';
            mainEl.style.margin = '0';
            mainEl.style.paddingInlineEnd = '0';
            mainEl.style.flex = '1 1 auto';
        }

        const dataMain = document.querySelector('[data-main-column]');
        if (dataMain) {
            dataMain.style.maxWidth = 'none';
            dataMain.style.width = '100%';
            dataMain.style.margin = '0';
            dataMain.style.paddingInlineStart = '0';
            dataMain.style.paddingInlineEnd = '0';
        }

        const contentContainers = document.querySelectorAll('.content, .content *');
        contentContainers.forEach(el => {
            if (el instanceof HTMLElement) {
                el.style.maxWidth = 'none';
                el.style.width = '100%';
            }
        });
    } catch (e) {
        // fail silently
    }

    const surveyPopOver = document.querySelector("#survey-popover");
    if (surveyPopOver) {
        surveyPopOver.remove();
    }
}

applyStyles();
