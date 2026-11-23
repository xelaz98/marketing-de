// Start der App.
buildNav();
if (!location.hash) history.replaceState(null, "", "#path");
render();
