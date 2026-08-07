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
  return (
   <>
    <style>
      {`
        @page {
          size: A4;
          margin: 10mm;
        }

        @media print {
          html,
          body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
          }

          #print-receipt {
            width: 100% !important;
            min-height: auto !important;
          }
        }
      `}
    </style>

    <div
      id="print-receipt"
      style={{
        width: "210mm",
        minHeight: "297mm",
        background: "#ffffff",
        color: "#111827",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
  style={{
    textAlign: "center",
    borderBottom: "2px solid #1e3a8a",
    paddingBottom: "20px",
    marginBottom: "30px",
  }}
>
  <h1
    style={{
      margin: 0,
      fontSize: "28px",
      color: "#1e3a8a",
      fontWeight: "bold",
    }}
  >
    Bajrangi Verma Advocate
  </h1>

  <p
    style={{
      margin: "6px 0",
      fontSize: "18px",
      fontWeight: 600,
    }}
  >
    Advocate Chamber
  </p>

  <p
    style={{
      margin: "6px 0",
      fontSize: "14px",
      color: "#444",
      lineHeight: 1.6,
    }}
  >
    8/732, Sector 8, Matinpurwa,
    <br />
    Vikas Nagar, Lucknow, Uttar Pradesh – 226022
  </p>

  <p
    style={{
      marginTop: "8px",
      fontSize: "14px",
      fontWeight: 600,
    }}
  >
    Mobile: +91 8707394242
  </p>
</div>

<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "30px",
    fontSize: "14px",
    borderBottom: "1px solid #d1d5db",
    paddingBottom: "12px",
  }}
>
  <div style={{ fontSize: "12px" }}>
  <strong>Receipt No.</strong>
  <br />
  {receiptNo}
</div>

  <div style={{ textAlign: "right" }}>
  <strong>Date</strong>
  <br />
  {currentDate}
</div>

</div>

<div
  style={{
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    overflow: "hidden",
    marginBottom: "30px",
  }}
>
  <div
    style={{
      background: "#1e3a8a",
      color: "#ffffff",
      padding: "12px",
      textAlign: "center",
      fontWeight: "bold",
      fontSize: "18px",
    }}
  >
    CONSULTATION BOOKING RECEIPT
  </div>

  <table
    style={{
      width: "100%",
      borderCollapse: "collapse",
      fontSize: "15px",
    }}
  >
    <tbody>
      <tr>
        <td style={{ padding: "14px", fontWeight: "bold", width: "35%", borderBottom: "1px solid #e5e7eb" }}>
          Appointment
        </td>
        <td style={{ padding: "14px", borderBottom: "1px solid #e5e7eb" }}>
          {appointment}
        </td>
      </tr>

      <tr>
        <td style={{ padding: "14px", fontWeight: "bold", borderBottom: "1px solid #e5e7eb" }}>
          Client Name
        </td>
        <td style={{ padding: "14px", borderBottom: "1px solid #e5e7eb" }}>
          {name}
        </td>
      </tr>

      <tr>
        <td style={{ padding: "14px", fontWeight: "bold", borderBottom: "1px solid #e5e7eb" }}>
          Case Type
        </td>
        <td style={{ padding: "14px", borderBottom: "1px solid #e5e7eb" }}>
          {caseType}
        </td>
      </tr>

      <tr>
        <td style={{ padding: "14px", fontWeight: "bold" }}>
          Consultation Fee
        </td>
        <td
          style={{
            padding: "14px",
            color: "#0f766e",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          ₹{fee}
        </td>
      </tr>

<tr>
  <td style={{ padding: "14px", fontWeight: "bold" }}>
    Payment Mode
  </td>
  <td style={{ padding: "14px" }}>
    {paymentMode}
  </td>
</tr>

<tr>
  <td style={{ padding: "14px", fontWeight: "bold" }}>
    Payment Status
  </td>
  <td
    style={{
      padding: "14px",
      fontWeight: "bold",
      color: paymentStatus === "Paid" ? "#15803d" : "#ca8a04",
    }}
  >
    {paymentStatus}
  </td>
</tr>

    </tbody>
  </table>
</div>

<div
  style={{
    marginTop: "35px",
    borderTop: "2px solid #1e3a8a",
    paddingTop: "25px",
    textAlign: "center",
  }}
>
  <h2
    style={{
      margin: 0,
      color: "#1e3a8a",
      fontSize: "22px",
    }}
  >
    Thank You for Choosing
  </h2>

  <h3
    style={{
      marginTop: "8px",
      marginBottom: "18px",
      fontSize: "24px",
    }}
  >
    Bajrangi Verma Advocate
  </h3>

  <p
    style={{
      color: "#555",
      lineHeight: 1.8,
      fontSize: "15px",
      marginBottom: "24px",
    }}
  >
    This receipt confirms your consultation booking.
    <br />
    Please keep this receipt for your records and present it during your appointment.
  </p>

  <div
    style={{
      background: "#f8fafc",
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      padding: "18px",
      textAlign: "left",
      fontSize: "13px",
      lineHeight: 1.8,
    }}
  >
    <strong>Important Note</strong>

    <br /><br />

    • This is a computer-generated consultation receipt.

    <br />

    • No physical signature or chamber stamp is required.

    <br />

    • Please arrive 10 minutes before your scheduled appointment.

    <br />

    • For appointment-related assistance, contact:

    <strong> +91 8707394242</strong>
  </div>

  <p
    style={{
      marginTop: "30px",
      color: "#888",
      fontSize: "12px",
    }}
  >
    © Bajrangi Verma Advocate Chamber • Lucknow
  </p>
</div>

</div>
</>

  );
}