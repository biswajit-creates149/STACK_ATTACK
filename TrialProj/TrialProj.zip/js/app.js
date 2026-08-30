const defaultNotices = [

  {
    title: "Semester registration",

    text:
      "Students should complete semester registration before the deadline.",

    date: "29 Aug 2026"
  },


  {
    title: "Library update",

    text:
      "Library timings and services may change during examination periods.",

    date: "27 Aug 2026"
  },


  {
    title: "Campus event",

    text:
      "Student clubs can submit event proposals through the student affairs office.",

    date: "25 Aug 2026"
  }

];



/*
  Get notices
*/

function getNotices() {

  try {

    return JSON.parse(
      localStorage.getItem("campusNotices")
    ) || defaultNotices;

  }

  catch {

    return defaultNotices;

  }

}



/*
  Get Lost & Found posts
*/

function getLostItems() {

  try {

    return JSON.parse(
      localStorage.getItem("lostItems")
    ) || [];

  }

  catch {

    return [];

  }

}



/*
  Get complaints
*/

function getComplaints() {

  try {

    return JSON.parse(
      localStorage.getItem("complaints")
    ) || [];

  }

  catch {

    return [];

  }

}



/*
  Current logged-in user email
*/

function currentEmail() {

  return getUser()?.email || "";

}



/*
  Prevent HTML injection
*/

function escapeHTML(value) {

  return String(value).replace(
    /[&<>"']/g,

    char => ({

      "&": "&amp;",

      "<": "&lt;",

      ">": "&gt;",

      '"': "&quot;",

      "'": "&#039;"

    }[char])

  );

}



/*
  Run when page loads
*/

document.addEventListener(
  "DOMContentLoaded",
  () => {


    renderNotices();


    renderLostItems();


    renderComplaints();


    renderDashboard();


    renderProfile();



    /*
      LOST & FOUND FORM
    */

    const lostForm =
      document.getElementById("lostForm");


    if (lostForm) {

      lostForm.addEventListener(
        "submit",
        event => {

          event.preventDefault();



          const item = {

            id: Date.now(),

            type:
              document
                .getElementById("itemType")
                .value,

            name:
              document
                .getElementById("itemName")
                .value
                .trim(),

            location:
              document
                .getElementById("itemLocation")
                .value
                .trim(),

            description:
              document
                .getElementById("itemDescription")
                .value
                .trim(),

            contact:
              document
                .getElementById("itemContact")
                .value
                .trim(),

            email:
              currentEmail(),

            date:
              new Date().toLocaleDateString()

          };



          const items =
            getLostItems();


          items.unshift(item);



          localStorage.setItem(
            "lostItems",
            JSON.stringify(items)
          );



          lostForm.reset();



          const msg =
            document.getElementById(
              "lostMessage"
            );


          msg.className =
            "form-message success";


          msg.textContent =
            "Your post has been added.";



          renderLostItems();

        }
      );

    }



    /*
      COMPLAINT FORM
    */

    const complaintForm =
      document.getElementById(
        "complaintForm"
      );


    if (complaintForm) {

      complaintForm.addEventListener(
        "submit",
        event => {

          event.preventDefault();



          const complaint = {

            id: Date.now(),

            category:
              document
                .getElementById("category")
                .value,

            location:
              document
                .getElementById("location")
                .value
                .trim(),

            description:
              document
                .getElementById("description")
                .value
                .trim(),

            email:
              currentEmail(),

            status:
              "Submitted",

            date:
              new Date().toLocaleDateString()

          };



          const complaints =
            getComplaints();


          complaints.unshift(
            complaint
          );



          localStorage.setItem(
            "complaints",
            JSON.stringify(
              complaints
            )
          );



          complaintForm.reset();



          const msg =
            document.getElementById(
              "complaintMessage"
            );


          msg.className =
            "form-message success";


          msg.textContent =
            "Complaint submitted successfully.";



          renderComplaints();


          renderDashboard();

        }
      );

    }



    /*
      PROFILE FORM
    */

    const profileForm =
      document.getElementById(
        "profileForm"
      );


    if (profileForm) {

      profileForm.addEventListener(
        "submit",
        event => {

          event.preventDefault();



          const user =
            getUser() || {
              email: ""
            };



          user.name =
            document
              .getElementById(
                "profileNameInput"
              )
              .value
              .trim();


          user.branch =
            document
              .getElementById(
                "profileBranch"
              )
              .value
              .trim();


          user.year =
            document
              .getElementById(
                "profileYear"
              )
              .value;



          localStorage.setItem(
            "campusUser",
            JSON.stringify(user)
          );



          const msg =
            document.getElementById(
              "profileMessage"
            );


          msg.className =
            "form-message success";


          msg.textContent =
            "Profile saved.";



          renderProfile();


          renderDashboard();

        }
      );

    }

  }
);




/*
  RENDER NOTICES
*/

function renderNotices() {

  const container =
    document.getElementById(
      "noticesList"
    );


  if (!container) return;



  container.innerHTML =
    getNotices()

      .map(
        notice => `

        <article class="notice">

          <h3>
            ${escapeHTML(notice.title)}
          </h3>

          <small>
            ${escapeHTML(notice.date)}
          </small>

          <p>
            ${escapeHTML(notice.text)}
          </p>

        </article>

      `
      )

      .join("");

}




/*
  RENDER LOST ITEMS
*/

function renderLostItems() {

  const container =
    document.getElementById(
      "lostList"
    );


  if (!container) return;



  const items =
    getLostItems();



  if (!items.length) {

    container.innerHTML =
      `
      <div class="empty-state">

        No posts yet.
        Be the first to add one.

      </div>
      `;

    return;

  }



  container.innerHTML =
    items

      .map(
        item => `

        <article class="lost-item">

          <span class="badge">

            ${escapeHTML(item.type)}

          </span>


          <h3>

            ${escapeHTML(item.name)}

          </h3>


          <p>

            <strong>
              Location:
            </strong>

            ${escapeHTML(item.location)}

          </p>


          <p>

            ${escapeHTML(
              item.description
            )}

          </p>


          <p>

            <strong>
              Contact:
            </strong>

            ${escapeHTML(
              item.contact
            )}

          </p>


          <small class="muted">

            ${escapeHTML(item.date)}

          </small>

        </article>

      `
      )

      .join("");

}




/*
  RENDER COMPLAINTS
*/

function renderComplaints() {

  const container =
    document.getElementById(
      "complaintList"
    );


  if (!container) return;



  const complaints =
    getComplaints().filter(

      c =>
        !currentEmail() ||
        c.email === currentEmail()

    );



  if (!complaints.length) {

    container.innerHTML =
      `
      <div class="empty-state">

        You have not submitted
        any complaints.

      </div>
      `;

    return;

  }



  container.innerHTML =
    complaints

      .map(
        c => `

        <article
          class="complaint-item">

          <span class="badge">

            ${escapeHTML(c.status)}

          </span>


          <h3>

            ${escapeHTML(c.category)}

          </h3>


          <p>

            <strong>
              Location:
            </strong>

            ${escapeHTML(c.location)}

          </p>


          <p>

            ${escapeHTML(
              c.description
            )}

          </p>


          <small class="muted">

            ${escapeHTML(c.date)}

          </small>

        </article>

      `
      )

      .join("");

}




/*
  RENDER DASHBOARD
*/

function renderDashboard() {

  const nameEl =
    document.getElementById(
      "dashboardName"
    );


  const noticeCount =
    document.getElementById(
      "noticeCount"
    );


  const lostCount =
    document.getElementById(
      "lostCount"
    );


  const complaintCount =
    document.getElementById(
      "complaintCount"
    );


  const activity =
    document.getElementById(
      "recentActivity"
    );



  const user =
    getUser();



  if (nameEl) {

    nameEl.textContent =
      user?.name || "Student";

  }



  if (noticeCount) {

    noticeCount.textContent =
      getNotices().length;

  }



  if (lostCount) {

    lostCount.textContent =
      getLostItems().length;

  }



  const myComplaints =
    getComplaints().filter(

      c =>
        !currentEmail() ||
        c.email === currentEmail()

    );



  if (complaintCount) {

    complaintCount.textContent =
      myComplaints.length;

  }



  if (activity) {


    const activities = [

      ...myComplaints.map(
        c =>
          `Complaint submitted: ${c.category}`
      ),


      ...getLostItems()

        .filter(
          i =>
            !currentEmail() ||
            i.email === currentEmail()
        )

        .map(
          i =>
            `${i.type} item posted: ${i.name}`
        )

    ].slice(0, 5);



    activity.innerHTML =
      activities.length

        ? activities
            .map(
              x =>
                `<p>• ${escapeHTML(x)}</p>`
            )
            .join("")

        : "No activity yet.";

  }

}




/*
  RENDER PROFILE
*/

function renderProfile() {

  const user =
    getUser() || {

      name: "Student",

      email: "Not logged in",

      branch: "",

      year: "1st Year"

    };



  const name =
    document.getElementById(
      "profileName"
    );


  const email =
    document.getElementById(
      "profileEmail"
    );


  const avatar =
    document.getElementById(
      "avatar"
    );


  const nameInput =
    document.getElementById(
      "profileNameInput"
    );


  const branch =
    document.getElementById(
      "profileBranch"
    );


  const year =
    document.getElementById(
      "profileYear"
    );



  if (name) {

    name.textContent =
      user.name || "Student";

  }



  if (email) {

    email.textContent =
      user.email || "Not logged in";

  }



  if (avatar) {

    avatar.textContent =
      (user.name || "S")
        .charAt(0)
        .toUpperCase();

  }



  if (nameInput) {

    nameInput.value =
      user.name || "";

  }



  if (branch) {

    branch.value =
      user.branch || "";

  }



  if (year) {

    year.value =
      user.year || "1st Year";

  }

}