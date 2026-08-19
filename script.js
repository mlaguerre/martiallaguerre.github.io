(function () {
  "use strict";

  var tabLinks = document.querySelectorAll("[data-tab-link]");
  var panels = document.querySelectorAll(".tab-panel");
  var tabsNav = document.querySelector(".tabs");
  var navToggle = document.querySelector(".nav-toggle");

  function activateTab(id, updateHash) {
    panels.forEach(function (p) {
      p.classList.toggle("is-active", p.id === id);
    });
    tabLinks.forEach(function (link) {
      var isActive = link.getAttribute("data-tab-link") === id;
      link.classList.toggle("is-active", isActive);
      if (link.tagName === "BUTTON") {
        link.setAttribute("aria-selected", isActive ? "true" : "false");
      }
    });
    if (updateHash) {
      history.replaceState(null, "", "#" + id);
    }
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    if (tabsNav) tabsNav.classList.remove("is-open");
  }

  tabLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      var id = link.getAttribute("data-tab-link");
      activateTab(id, true);
    });
  });

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      var isOpen = tabsNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // Deep-link support: open the tab matching the URL hash on load
  var initial = window.location.hash.replace("#", "");
  var validIds = Array.prototype.map.call(panels, function (p) { return p.id; });
  if (initial && validIds.indexOf(initial) !== -1) {
    activateTab(initial, false);
  }

  // Publications filter
  var filterBtns = document.querySelectorAll(".filter-btn");
  var pubRows = document.querySelectorAll(".pub-table tbody tr");

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      var filter = btn.getAttribute("data-filter");
      pubRows.forEach(function (row) {
        var match = filter === "all" || row.getAttribute("data-status") === filter;
        row.classList.toggle("is-hidden", !match);
      });
    });
  });
})();
