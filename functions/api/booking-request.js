export async function onRequestPost(context) {

  try {

    const request =
      await context.request.json();


    const {
      residence,
      checkin,
      checkout,
      guests,
      firstName,
      lastName,
      birthDate,
      email,
      phone,
      message
    } = request;


    if (
      !residence ||
      !checkin ||
      !checkout ||
      !guests ||
      !firstName ||
      !lastName ||
      !birthDate ||
      !email ||
      !phone
    ) {

      return new Response(
        JSON.stringify({
          message:
            "Please complete all required fields."
        }),
        {
          status: 400,
          headers: {
            "Content-Type":
              "application/json"
          }
        }
      );

    }


    const allowedResidences = [
      "Gastone Rossi 12",
      "Barontini 8"
    ];


    if (
      !allowedResidences.includes(
        residence
      )
    ) {

      return new Response(
        JSON.stringify({
          message:
            "Invalid residence."
        }),
        {
          status: 400,
          headers: {
            "Content-Type":
              "application/json"
          }
        }
      );

    }


    const checkinDate =
      new Date(checkin);

    const checkoutDate =
      new Date(checkout);


    if (
      Number.isNaN(
        checkinDate.getTime()
      ) ||
      Number.isNaN(
        checkoutDate.getTime()
      ) ||
      checkoutDate <= checkinDate
    ) {

      return new Response(
        JSON.stringify({
          message:
            "Invalid booking dates."
        }),
        {
          status: 400,
          headers: {
            "Content-Type":
              "application/json"
          }
        }
      );

    }


    /*
      EMAIL SERVICE

      In the first version this function
      validates the request.

      The actual email provider will be
      connected through Cloudflare environment
      variables after deployment.

      This keeps private credentials out
      of the public website.
    */


    const emailTo =
      context.env.BOOKING_EMAIL;


    const emailFrom =
      context.env.EMAIL_FROM;


    const resendApiKey =
      context.env.RESEND_API_KEY;


    if (
      !emailTo ||
      !emailFrom ||
      !resendApiKey
    ) {

      console.error(
        "Missing email environment variables."
      );


      return new Response(
        JSON.stringify({
          message:
            "Booking system is not configured yet."
        }),
        {
          status: 500,
          headers: {
            "Content-Type":
              "application/json"
          }
        }
      );

    }


    const emailSubject =
      `New booking request — ${residence}`;


    const emailHtml = `

      <div
        style="
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #111;
        "
      >

        <h2>
          New Booking Request
        </h2>

        <hr>

        <p>
          <strong>Residence:</strong>
          ${escapeHtml(residence)}
        </p>

        <p>
          <strong>Check-in:</strong>
          ${escapeHtml(checkin)}
        </p>

        <p>
          <strong>Check-out:</strong>
          ${escapeHtml(checkout)}
        </p>

        <p>
          <strong>Guests:</strong>
          ${escapeHtml(guests)}
        </p>

        <hr>

        <h3>
          Guest Details
        </h3>

        <p>
          <strong>First name:</strong>
          ${escapeHtml(firstName)}
        </p>

        <p>
          <strong>Last name:</strong>
          ${escapeHtml(lastName)}
        </p>

        <p>
          <strong>Date of birth:</strong>
          ${escapeHtml(birthDate)}
        </p>

        <p>
          <strong>Email:</strong>
          ${escapeHtml(email)}
        </p>

        <p>
          <strong>Phone:</strong>
          ${escapeHtml(phone)}
        </p>

        <p>
          <strong>Additional notes:</strong>
          ${escapeHtml(message || "None")}
        </p>

      </div>

    `;


    const emailResponse =
      await fetch(
        "https://api.resend.com/emails",
        {
          method: "POST",

          headers: {
            "Authorization":
              `Bearer ${resendApiKey}`,

            "Content-Type":
              "application/json"
          },

          body:
            JSON.stringify({
              from: emailFrom,

              to: [
                emailTo
              ],

              subject:
                emailSubject,

              html:
                emailHtml,

              reply_to:
                email
            })
        }
      );


    if (
      !emailResponse.ok
    ) {

      const errorText =
        await emailResponse.text();

      console.error(
        "Email provider error:",
        errorText
      );


      return new Response(
        JSON.stringify({
          message:
            "Unable to send booking request."
        }),
        {
          status: 500,
          headers: {
            "Content-Type":
              "application/json"
          }
        }
      );

    }


    return new Response(
      JSON.stringify({
        success: true
      }),
      {
        status: 200,
        headers: {
          "Content-Type":
            "application/json"
        }
      }
    );


  } catch (error) {

    console.error(
      "Booking API error:",
      error
    );


    return new Response(
      JSON.stringify({
        message:
          "Unexpected server error."
      }),
      {
        status: 500,
        headers: {
          "Content-Type":
            "application/json"
        }
      }
    );

  }

}


/* =====================================================
   HTML ESCAPE
===================================================== */

function escapeHtml(value) {

  return String(value ?? "")
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );

}
