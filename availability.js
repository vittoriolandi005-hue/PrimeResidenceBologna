export async function onRequestGet(context) {
  try {
    const url = new URL(context.request.url);
    const residence = (url.searchParams.get("residence") || "").toLowerCase();

    let icalUrl = "";

    if (residence === "gastone") {
      icalUrl = context.env.GASTONE_ICAL_URL;
    } else if (residence === "barontini") {
      icalUrl = context.env.BARONTINI_ICAL_URL;
    } else {
      return jsonResponse(
        {
          success: false,
          error: "Invalid residence."
        },
        400
      );
    }

    if (!icalUrl) {
      return jsonResponse(
        {
          success: false,
          error: "Calendar configuration missing."
        },
        500
      );
    }

    const response = await fetch(icalUrl, {
      headers: {
        "User-Agent": "PrimeResidenceBologna/1.0"
      }
    });

    if (!response.ok) {
      return jsonResponse(
        {
          success: false,
          error: "Unable to retrieve calendar."
        },
        502
      );
    }

    const icalText = await response.text();

    const events = parseICalEvents(icalText);

    return jsonResponse(
      {
        success: true,
        residence,
        updatedAt: new Date().toISOString(),
        events
      },
      200
    );

  } catch (error) {
    return jsonResponse(
      {
        success: false,
        error: "Unexpected server error."
      },
      500
    );
  }
}


function parseICalEvents(icalText) {
  const normalized = icalText
    .replace(/\r\n[ \t]/g, "")
    .replace(/\r\n/g, "\n");

  const blocks = normalized.split("BEGIN:VEVENT");

  const events = [];

  for (let i = 1; i < blocks.length; i++) {
    const block = blocks[i];

    const start = extractDate(block, "DTSTART");
    const end = extractDate(block, "DTEND");

    if (!start || !end) continue;

    events.push({
      start,
      end
    });
  }

  events.sort((a, b) => {
    return new Date(a.start) - new Date(b.start);
  });

  return events;
}


function extractDate(block, field) {
  const regex = new RegExp(
    "^" + field + "(?:;[^:]*)?:(.+)$",
    "m"
  );

  const match = block.match(regex);

  if (!match) return null;

  const raw = match[1].trim();

  if (/^\d{8}$/.test(raw)) {
    return formatDateOnly(raw);
  }

  if (/^\d{8}T\d{6}Z?$/.test(raw)) {
    return formatDateTime(raw);
  }

  return null;
}


function formatDateOnly(raw) {
  const year = raw.slice(0, 4);
  const month = raw.slice(4, 6);
  const day = raw.slice(6, 8);

  return `${year}-${month}-${day}`;
}


function formatDateTime(raw) {
  const year = raw.slice(0, 4);
  const month = raw.slice(4, 6);
  const day = raw.slice(6, 8);

  return `${year}-${month}-${day}`;
}


function jsonResponse(data, status = 200) {
  return new Response(
    JSON.stringify(data),
    {
      status,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
        "Access-Control-Allow-Origin": "*"
      }
    }
  );
}
