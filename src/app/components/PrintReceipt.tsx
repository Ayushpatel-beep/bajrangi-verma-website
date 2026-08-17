type PrintReceiptProps = {
  receiptNo: string;
  currentDate: string;
  appointment: string;
  name: string;
  caseType: string;
  fee: string;
  paymentMode: string;
  paymentStatus: string;
};

export default function PrintReceipt({
  receiptNo,
  currentDate,
  appointment,
  name,
  caseType,
  fee,
  paymentMode,
  paymentStatus,
}: PrintReceiptProps) {
  const formattedName = name
  .toLowerCase()
  .split(" ")
  .filter(Boolean)
  .map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  )
  .join(" ");

  const isPaid =
    paymentStatus.toLowerCase() === "paid" ||
    paymentMode.toLowerCase() === "upi";

  const paymentMethod =
    paymentMode.toLowerCase() === "upi"
      ? "UPI / Online Transfer"
      : "Pay at Chamber";

  return (
    <>
      <style>
  {`
    @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@700&display=swap');

    * {
      box-sizing: border-box;
    }

    html,
    body,
    #root {
      margin: 0 !important;
      padding: 0 !important;
      background: #ffffff !important;
    }

    @page {
      size: A4;
      margin: 0;
    }

   @media print {
  @page {
    size: A4;
    margin: 0;
  }

  html,
  body {
    margin: 0 !important;
    padding: 0 !important;
    width: 210mm !important;
    background: #ffffff !important;
  }

  #print-receipt {
    display: block !important;
    position: relative !important;

    width: 210mm !important;
    height: auto !important;
    min-height: 0 !important;

    margin: 0 !important;
    padding: 12mm !important;

    box-sizing: border-box !important;

    background: #ffffff !important;
    color: #111827 !important;

    box-shadow: none !important;
    border-bottom: 8px solid #0f2c59 !important;

    visibility: visible !important;

    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  #print-receipt * {
    visibility: visible !important;
  }
}

    @media screen {
  html,
  body,
  #root {
    background: #ffffff !important;
  }

  #print-receipt {
  background-color: #ffffff !important;
  background: #ffffff !important;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}
}
  `}
</style>

      <div
  id="print-receipt"
  style={{
    width: "210mm",
    minHeight: "297mm",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    background: "#ffffff",
    color: "#111827",
    padding: "42px 48px",
    position: "relative",
    borderBottom: "8px solid #0f2c59",
    fontFamily: "'Segoe UI', Arial, sans-serif",
  }}
>

        {/* ================= HEADER ================= */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            paddingBottom: "10px",
            gap: "30px",
          }}
        >
          {/* Left Header */}

          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#0f2c59",
                fontSize: "25px",
                fontWeight: 700,
                lineHeight: 1.2,
                whiteSpace: "nowrap",
              }}
            >
              Bajrangi Verma Advocate
            </div>

            <div
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#744210",
                marginTop: "4px",
              }}
            >
              Advocate Chamber
            </div>

            <div
              style={{
                marginTop: "8px",
                fontSize: "13px",
                color: "#2d3748",
                lineHeight: 1.5,
              }}
            >
              <strong style={{ color: "#000" }}>Address:</strong>{" "}
              8/732, Sector-8, Matinpurwa, Vikas Nagar,
              <br />
              Lucknow, Uttar Pradesh - 226022
              <br />
              <strong style={{ color: "#000" }}>Mobile:</strong>{" "}
              +91 8707394242
            </div>
          </div>

          {/* Right Header */}

          <div
            style={{
              textAlign: "right",
              minWidth: "185px",
            }}
          >
            <div
              style={{
                fontSize: "13px",
                color: "#2d3748",
                fontWeight: 600,
                letterSpacing: "0.5px",
                lineHeight: 1.2,
                textTransform: "uppercase",
              }}
            >
              Invoice / Payment Receipt
            </div>

            <div
              style={{
                marginTop: "10px",
                fontSize: "13.5px",
                color: "#000",
                lineHeight: 1.6,
              }}
            >
              <div>
                <strong>Receipt No:</strong>{" "}
                <span
  style={{
    color: "#b8860b",
    fontWeight: 400,
  }}
>
  {receiptNo}
</span>
              </div>

              <div>
                <strong>Date:</strong> {currentDate}
              </div>
            </div>
          </div>
        </div>

        {/* ================= DIVIDER ================= */}

        <div
          style={{
            width: "100%",
            height: "1.5px",
            backgroundColor: "#cbd5e0",
            margin: "12px 0 20px",
          }}
        />

        {/* ================= CLIENT + PAYMENT INFORMATION ================= */}

<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "50px",
    fontSize: "14px",
    color: "#000",
    lineHeight: 1.7,
    gap: "30px",
  }}
>
  {/* LEFT SIDE - CLIENT INFORMATION */}

  <div style={{ flex: 1 }}>
    <div>
      <strong
        style={{
          display: "inline-block",
          width: "180px",
        }}
      >
        Client Name:
      </strong>

      {formattedName}
    </div>

    <div>
      <strong
        style={{
          display: "inline-block",
          width: "180px",
        }}
      >
        Appointment Date:
      </strong>

      {appointment}
    </div>

    <div>
      <strong
        style={{
          display: "inline-block",
          width: "180px",
        }}
      >
        Case Type / Service:
      </strong>

      {caseType}
    </div>
  </div>

  {/* RIGHT SIDE - PAYMENT INFORMATION */}

  <div
    style={{
      width: "250px",
      textAlign: "left",
    }}
  >
    {isPaid && (
      <div>
        <strong
          style={{
            display: "inline-block",
            width: "125px",
          }}
        >
          Payment Date:
        </strong>

        {currentDate}
      </div>
    )}

    <div>
      <strong
        style={{
          display: "inline-block",
          width: "125px",
        }}
      >
        Payment Method:
      </strong>

      {paymentMethod}
    </div>
  </div>
</div>

        {/* ================= PAYMENT TABLE ================= */}

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "1.5px solid #4a5568",
            marginBottom: "20px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  width: "10%",
                  backgroundColor: "#e2e8f0",
                  color: "#000",
                  fontWeight: 700,
                  padding: "10px 12px",
                  border: "1.5px solid #4a5568",
                  fontSize: "13.5px",
                  textAlign: "left",
                }}
              >
                S.No
              </th>

              <th
                style={{
                  width: "65%",
                  backgroundColor: "#e2e8f0",
                  color: "#000",
                  fontWeight: 700,
                  padding: "10px 12px",
                  border: "1.5px solid #4a5568",
                  fontSize: "13.5px",
                  textAlign: "left",
                }}
              >
                Description
              </th>

              <th
                style={{
                  width: "25%",
                  backgroundColor: "#e2e8f0",
                  color: "#000",
                  fontWeight: 700,
                  padding: "10px 12px",
                  border: "1.5px solid #4a5568",
                  fontSize: "13.5px",
                  textAlign: "right",
                }}
              >
                Amount (₹)
              </th>
            </tr>
          </thead>

          <tbody>
            {/* Consultation Fee */}

            <tr>
              <td
                style={{
                  padding: "10px 12px",
                  border: "1.5px solid #4a5568",
                  fontSize: "13.5px",
                  color: "#1a202c",
                }}
              >
                1.
              </td>

              <td
                style={{
                  padding: "10px 12px",
                  border: "1.5px solid #4a5568",
                  fontSize: "13.5px",
                  color: "#1a202c",
                }}
              >
                Legal Consultation Fee ({caseType})
              </td>

              <td
                style={{
                  padding: "10px 12px",
                  border: "1.5px solid #4a5568",
                  fontSize: "13.5px",
                  color: "#1a202c",
                  textAlign: "right",
                }}
              >
                ₹{fee}
              </td>
            </tr>

            {/* Subtotal */}

            <tr>
              <td
                colSpan={2}
                style={{
                  padding: "10px 12px",
                  border: "1.5px solid #4a5568",
                  fontSize: "13.5px",
                  color: "#1a202c",
                  textAlign: "right",
                  fontWeight: 700,
                }}
              >
                Subtotal:
              </td>

              <td
                style={{
                  padding: "10px 12px",
                  border: "1.5px solid #4a5568",
                  fontSize: "13.5px",
                  color: "#1a202c",
                  textAlign: "right",
                  fontWeight: 700,
                }}
              >
                ₹{fee}
              </td>
            </tr>

            {/* Total */}

            <tr>
              <td
                colSpan={2}
                style={{
                  padding: "10px 12px",
                  border: "1.5px solid #4a5568",
                  fontSize: "14.5px",
                  color: "#1a202c",
                  textAlign: "right",
                  fontWeight: 800,
                  backgroundColor: "#f7fafc",
                }}
              >
                Total Amount:
              </td>

              <td
                style={{
                  padding: "10px 12px",
                  border: "1.5px solid #4a5568",
                  fontSize: "14.5px",
                  color: "#1a202c",
                  textAlign: "right",
                  fontWeight: 800,
                  backgroundColor: "#f7fafc",
                }}
              >
                ₹{fee}
              </td>
            </tr>

          </tbody>
        </table>

        {/* ================= PAYMENT STATUS ================= */}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "12px",
            marginBottom: "22px",
            paddingTop: "2px",
          }}
        >
          {isPaid ? (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                border: "2px solid #28a745",
                color: "#28a745",
                borderRadius: "8px",
                padding: "5px 15px",
                fontWeight: 800,
                fontSize: "16px",
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              PAID ✓
            </div>
          ) : (
            <div
  style={{
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    border: "2px solid #d97706",
    color: "#d97706",
    backgroundColor: "#fffbeb",
    borderRadius: "8px",
    padding: "6px 16px",
    fontWeight: 800,
    fontSize: "15px",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  }}
>
  <span
    style={{
      width: "14px",
      height: "14px",
      border: "2px solid #d97706",
      borderRadius: "50%",
      display: "inline-block",
      position: "relative",
    }}
  >
    <span
      style={{
        position: "absolute",
        width: "1.5px",
        height: "4px",
        backgroundColor: "#d97706",
        left: "5px",
        top: "2px",
      }}
    />

    <span
      style={{
        position: "absolute",
        width: "4px",
        height: "1.5px",
        backgroundColor: "#d97706",
        left: "5px",
        top: "6px",
        transform: "rotate(25deg)",
        transformOrigin: "left center",
      }}
    />
  </span>

  PENDING
</div>
          )}
        </div>

        {/* ================= IMPORTANT NOTES ================= */}

        <div
          style={{
            width: "100%",
            backgroundColor: "#f8fafc",
            border: "1px solid #cbd5e0",
            borderLeft: "4px solid #0f2c59",
            padding: "12px 16px",
            borderRadius: "6px",
            marginBottom: "25px",
          }}
        >
          <h4
            style={{
              fontSize: "13px",
              color: "#0f2c59",
              margin: "0 0 6px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Important Notes:
          </h4>

          <ul
            style={{
              margin: 0,
              paddingLeft: "18px",
              fontSize: "12.5px",
              color: "#4a5568",
              lineHeight: 1.5,
            }}
          >
            <li>
              This is a computer-generated consultation receipt.
            </li>

            <li>
              No physical signature or chamber stamp is required.
            </li>

            <li>
              Please arrive 10 minutes before your scheduled appointment.
            </li>

            <li>
              For appointment-related assistance contact: +91 8707394242
            </li>
          </ul>
        </div>

        {/* ================= SIGNATURE ================= */}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "14px",
          }}
        >
          <div
            style={{
              textAlign: "right",
            }}
          >
            <div
              style={{
                fontSize: "13.5px",
                fontWeight: 700,
                color: "#000",
              }}
            >
              Received with Thanks:
            </div>

            <div
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "28px",
                color: "#0f2c59",
                marginTop: "5px",
                marginBottom: "10px",
                lineHeight: 1.3,
                display: "block",
              }}
            >
              Bajrangi Verma
            </div>

            <div
              style={{
                display: "inline-block",
                fontSize: "11px",
                fontWeight: 700,
                color: "#1e40af",
                backgroundColor: "#dbeafe",
                border: "1px solid #bfdbfe",
                padding: "3px 10px",
                borderRadius: "4px",
                marginTop: "4px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              ✓ Digitally Signed
            </div>
          </div>
        </div>
      </div>
    </>
  );
}