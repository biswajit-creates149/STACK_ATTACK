document.addEventListener(
  "DOMContentLoaded",
  () => {

    const form =
      document.getElementById("authForm");


    if (!form) return;


    let signupMode = false;


    const title =
      document.getElementById("authTitle");


    const button =
      document.getElementById("authButton");


    const toggle =
      document.getElementById("toggleAuth");


    const nameGroup =
      document.getElementById("nameGroup");


    const nameInput =
      document.getElementById("name");


    const message =
      document.getElementById("authMessage");



    /*
      Switch between login
      and signup.
    */

    toggle.addEventListener(
      "click",
      () => {

        signupMode = !signupMode;


        title.textContent =
          signupMode
            ? "Create Account"
            : "Login";


        button.textContent =
          signupMode
            ? "Sign Up"
            : "Login";


        nameGroup.hidden =
          !signupMode;


        nameInput.required =
          signupMode;


        toggle.textContent =
          signupMode

            ? "Already have an account? Login"

            : "Don't have an account? Sign up";


        message.textContent = "";

      }
    );



    /*
      Login / Signup
    */

    form.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();


        const email =
          document
            .getElementById("email")
            .value
            .trim();


        const password =
          document
            .getElementById("password")
            .value;


        const name =
          nameInput
            .value
            .trim();


        if (signupMode && !name) {

          return;

        }


        const existing =
          getUser();



        /*
          Demo behaviour:
          Only one account is stored.
        */

        if (
          !signupMode &&
          existing &&
          existing.email !== email
        ) {

          message.className =
            "form-message error";


          message.textContent =
            "This demo has a different saved account. " +
            "Sign up again to replace it.";


          return;

        }



        const user = {

          name: signupMode
            ? name
            : (existing?.name ||
               email.split("@")[0]),

          email: email,

          branch:
            existing?.branch || "",

          year:
            existing?.year || "1st Year"

        };



        localStorage.setItem(
          "campusUser",
          JSON.stringify(user)
        );



        message.className =
          "form-message success";


        message.textContent =
          signupMode

            ? "Account created! Redirecting..."

            : "Login successful! Redirecting...";



        setTimeout(
          () => {

            window.location.href =
              "dashboard.html";

          },
          500
        );

      }
    );

  }
);