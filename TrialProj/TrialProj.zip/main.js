function toggleMenu() {

  const nav = document.getElementById("navMenu");

  if (nav) {

    nav.classList.toggle("open");

  }

}



function getUser() {

  try {

    return JSON.parse(
      localStorage.getItem("campusUser")
    ) || null;

  }

  catch {

    return null;

  }

}



function logout() {

  localStorage.removeItem("campusUser");

  window.location.href = "index.html";

}



function showInfo(text) {

  const modal =
    document.getElementById("serviceInfo");

  const serviceText =
    document.getElementById("serviceText");


  if (modal && serviceText) {

    serviceText.textContent = text;

    modal.classList.remove("hidden");

  }

}



function hideInfo() {

  const modal =
    document.getElementById("serviceInfo");

  if (modal) {

    modal.classList.add("hidden");

  }

}



function closeInfo(event) {

  if (event.target.id === "serviceInfo") {

    hideInfo();

  }

}