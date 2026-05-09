// Show a confirmation toast whenever the user clicks a Flowlence Code installer
// download link. The download itself is handled by the browser via the link's
// href + Content-Disposition header — this script is purely a UX nicety so the
// user gets instant visual feedback that "yes, the click registered."

(function () {
  function attachListeners() {
    // Match any link to a Flowlence Code .exe installer (works for both x64 and ia32).
    const downloadLinks = document.querySelectorAll(
      'a[href*="Flowlence_Code"][href$=".exe"]'
    );
    downloadLinks.forEach(function (link) {
      link.addEventListener("click", showDownloadToast);
    });
  }

  function buildToastNode() {
    const toast = document.createElement("div");
    toast.id = "flowlence-download-toast";
    toast.className = "flowlence-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");

    const icon = document.createElement("span");
    icon.className = "flowlence-toast-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = "📥";

    const text = document.createElement("span");
    text.className = "flowlence-toast-text";

    const heading = document.createElement("strong");
    heading.textContent = "Download started";

    const detail = document.createTextNode(
      "Check your browser's Downloads folder when it finishes (~506 MB)."
    );

    text.appendChild(heading);
    text.appendChild(detail);

    const closeBtn = document.createElement("button");
    closeBtn.className = "flowlence-toast-close";
    closeBtn.setAttribute("aria-label", "Dismiss");
    closeBtn.textContent = "×";

    toast.appendChild(icon);
    toast.appendChild(text);
    toast.appendChild(closeBtn);

    return { toast: toast, closeBtn: closeBtn };
  }

  function showDownloadToast() {
    // Remove any existing toast so rapid double-clicks don't stack.
    const existing = document.getElementById("flowlence-download-toast");
    if (existing) existing.remove();

    const { toast, closeBtn } = buildToastNode();
    document.body.appendChild(toast);

    // Animate in on the next frame so the CSS transition fires.
    requestAnimationFrame(function () {
      toast.classList.add("flowlence-toast--visible");
    });

    closeBtn.addEventListener("click", function () {
      dismissToast(toast);
    });

    // Auto-dismiss after 6 seconds.
    setTimeout(function () {
      dismissToast(toast);
    }, 6000);
  }

  function dismissToast(toast) {
    toast.classList.remove("flowlence-toast--visible");
    setTimeout(function () {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }

  // MkDocs Material uses instant navigation by default — this means
  // DOMContentLoaded fires only on first page load, not on subsequent
  // in-app navigation. We re-attach on every "navigation event" the
  // theme exposes.
  if (typeof document$ !== "undefined" && document$.subscribe) {
    document$.subscribe(attachListeners);
  } else {
    document.addEventListener("DOMContentLoaded", attachListeners);
  }
})();
