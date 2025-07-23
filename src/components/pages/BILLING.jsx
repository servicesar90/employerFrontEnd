
import { useEffect, useState } from "react";
import { Download, Mail } from "lucide-react";
import { getBill, getInvoiceFunc } from "../../API/ApiFunctions";
import { showErrorToast } from "../ui/toast";
import html2pdf from "html2pdf.js";
import { createRoot } from "react-dom/client";
import { toWords } from "number-to-words";
import { flushSync } from "react-dom";

const Invoice = ({ data, invoiceNumber }) => {
  if (!data) return null;



  const subtotal = data?.Plan.price;
  const cgst = +(subtotal * 0.09).toFixed(2);
  const sgst = +(subtotal * 0.09).toFixed(2);
  const total = +(subtotal + cgst + sgst).toFixed(2);

  const totalInWords = `${toWords(Math.floor(total))} rupees only`;

  return (
    // <div
    //   id="invoice"
    //   className="max-w-[800px] mx-auto bg-white text-black p-8"
    //   style={{ fontFamily: "Arial, sans-serif", fontSize: "14px" }}
    // >
    //   {/* Header */}
    //   <div className="flex justify-between items-center mb-6">
    //     <div>
    //       <img
    //         src="/unigrowLogo.png" 
    //         alt="Company Logo"
    //         className="h-10"
    //       />
    //       {/* <div className="font-bold text-lg">Unigrow Talent</div> */}
    //     </div>
    //     <div className="text-right">
    //       <div className="font-bold text-lg">Invoice</div>
    //       <div>Invoice No: {invoiceNumber}</div>
    //     </div>
    //   </div>

    //   <div className="flex justify-between mb-4">
    //     <div>
    //       <strong>Date:</strong>{" "}
    //       {new Date(data?.created_at).toLocaleDateString()}
    //     </div>
    //   </div>

    //   {/* Parties */}
    //   <div className="flex justify-between mb-6">
    //     <div className="w-1/2 pr-2">
    //       <strong>Invoiced To:</strong>
    //       <p>{data?.Employer?.GstDetail?.tradeNam}</p>
    //       <p>
    //         {data?.Employer?.GstDetail?.bno},{" "}
    //         {data?.Employer?.GstDetail?.bnm},{" "}
    //         {data?.Employer?.GstDetail?.dst}
    //       </p>
    //       <p>GSTIN: {data?.Employer?.GstDetail?.gstin}</p>
    //     </div>
    //     <div className="w-1/2 pl-2">
    //       <strong>Pay To:</strong>
    //       <p>TalentNest People Services PVT. Ltd.</p>
    //       <p>4F-435A, Crossing Republik, Gautambuddha Nagar</p>
    //       <p>GSTIN: 09AALCT8284F1ZQ</p>
    //       <p>info@talennestpeopleservices.com</p>
    //     </div>
    //   </div>

    //   {/* Table */}
    //   <table className="w-full text-left border-collapse mb-6">
    //     <thead>
    //       <tr className="bg-gray-100">
    //         <th className="border border-black p-2">Service</th>
    //         <th className="border border-black p-2">Description</th>
    //         <th className="border border-black p-2">Rate</th>
    //         <th className="border border-black p-2">Qty</th>
    //         <th className="border border-black p-2">Amount</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       <tr>
    //         <td className="border border-black p-2">Hot</td>
    //         <td className="border border-black p-2">
    //           {data?.Plan?.description}
    //         </td>
    //         <td className="border border-black p-2">₹{subtotal.toFixed(2)}</td>
    //         <td className="border border-black p-2">1</td>
    //         <td className="border border-black p-2">₹{subtotal.toFixed(2)}</td>
    //       </tr>
    //       <tr>
    //         <td colSpan={4} className=" p-2 text-right border border-black">Subtotal:</td>
    //         <td className="border border-black p-2 border border-black">₹{subtotal.toFixed(2)}</td>
    //       </tr>
    //       <tr>
    //         <td colSpan={4} className=" p-2 text-right border border-black">CGST @ 9%:</td>
    //         <td className="border border-black p-2">₹{cgst.toFixed(2)}</td>
    //       </tr>
    //       <tr>
    //         <td colSpan={4} className=" p-2 text-right border border-black">SGST @ 9%:</td>
    //         <td className="border border-black p-2">₹{sgst.toFixed(2)}</td>
    //       </tr>
    //       <tr>
    //         <td colSpan={4} className=" p-2 text-right font-bold border border-black">Total:</td>
    //         <td className="border border-black p-2 font-bold">₹{total.toFixed(2)}</td>
    //       </tr>
    //     </tbody>
    //   </table>

    //   {/* Total in words */}
    //   <p className="mb-4">
    //     <strong>Total in words:</strong> {totalInWords}
    //   </p>

    //   {/* Note */}
    //   <p className="text-xs mt-8">
    //     NOTE: This is a computer-generated invoice and does not require a physical signature.
    //   </p>
    // </div>
    <div
  id="invoice"
  className="max-w-[800px] mx-auto bg-white text-black p-8 shadow-lg border border-gray-300"
  style={{
    fontFamily: "Arial, sans-serif",
    fontSize: "14px",
    minHeight: "1000px", // ensure fills page
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  }}
>
  {/* Header */}
  <div className="flex justify-between items-center mb-6 border-b pb-4">
    <div>
      <img
        src="/unigrowLogo.png"
        alt="Company Logo"
        className="h-12 mb-2"
      />
      <div className="text-sm text-gray-600">www.unigrowtalent.com</div>
    </div>
    <div className="text-right">
      <div className="text-2xl font-bold text-gray-800">INVOICE</div>
      <div className="text-sm">Invoice No: <strong>{invoiceNumber}</strong></div>
      <div className="text-sm">Date: <strong>{new Date(data?.created_at).toLocaleDateString()}</strong></div>
    </div>
  </div>

  {/* Parties */}
  <table className="w-full mb-6 border border-black">
  <thead>
    <tr className="bg-gray-100">
      <th className="border border-black p-2 text-left">Billed To</th>
      <th className="border border-black p-2 text-left">Pay To</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="border border-black p-2 align-top">
        <p>{data?.Employer?.GstDetail?.tradeNam}</p>
        <p>
          {data?.Employer?.GstDetail?.bno},{" "}
          {data?.Employer?.GstDetail?.bnm},{" "}
          {data?.Employer?.GstDetail?.dst}
        </p>
        <p>GSTIN: {data?.Employer?.GstDetail?.gstin}</p>
      </td>
      <td className="border border-black p-2 align-top">
        <p>TalentNest People Services PVT. Ltd.</p>
        <p>4F-435A, Crossing Republik, Gautambuddha Nagar</p>
        <p>GSTIN: 09AALCT8284F1ZQ</p>
        <p>Email: info@talennestpeopleservices.com</p>
      </td>
    </tr>
  </tbody>
</table>


  {/* Table */}
  <table className="w-full text-left border-collapse mb-6">
    <thead>
      <tr className="bg-gray-100">
        <th className="border border-black p-2 py-4 text-sm">Service</th>
        <th className="border border-black p-2 py-4 text-sm">Description</th>
        <th className="border border-black p-2 py-4 text-sm">Rate</th>
        <th className="border border-black p-2 py-4 text-sm">Qty</th>
        <th className="border border-black p-2 py-4 text-sm">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="border border-black p-2 py-4">Hot</td>
        <td className="border border-black p-2 py-4">{data?.Plan?.description}</td>
        <td className="border border-black p-2 py-4">₹{subtotal.toFixed(2)}</td>
        <td className="border border-black p-2 py-4">1</td>
        <td className="border border-black p-2 py-4">₹{subtotal.toFixed(2)}</td>
      </tr>
      <tr>
        <td colSpan={4} className="p-2 text-right font-semibold border border-black ">Subtotal:</td>
        <td className="border border-black p-2">₹{subtotal.toFixed(2)}</td>
      </tr>
      <tr>
        <td colSpan={4} className="p-2 text-right font-semibold border border-black ">CGST @ 9%:</td>
        <td className="border border-black p-2">₹{cgst.toFixed(2)}</td>
      </tr>
      <tr>
        <td colSpan={4} className="p-2 text-right font-semibold border border-black ">SGST @ 9%:</td>
        <td className="border border-black p-2">₹{sgst.toFixed(2)}</td>
      </tr>
      <tr>
        <td colSpan={4} className="p-2 text-right font-bold border border-black ">Total:</td>
        <td className="border border-black p-2 font-bold">₹{total.toFixed(2)}</td>
      </tr>
    </tbody>
  </table>

  {/* Total in words */}
  <p className="mb-2">
    <strong>Total (in words):</strong> {totalInWords}
  </p>

  {/* Terms & Conditions */}
  <div className="mt-2">
    <h3 className="font-bold mb-2">Terms & Conditions</h3>
    <ul className="text-xs  pl-4 space-y-1">
      <li>Please make payments to the account details mentioned below.</li>
      <li>For any queries, contact us at info@talennestpeopleservices.com.</li>
    </ul>
  </div>

  {/* Bank Details */}
  <div className="mt-2">
    <h3 className="font-bold mb-2">Bank Details</h3>
    <p className="text-xs">
      <strong>Account Name:</strong> TalentNest People Services PVT. Ltd. <br/>
      <strong>Account Number:</strong> XXXXXXXX1234 <br/>
      <strong>IFSC:</strong> ABCD0123456 <br/>
      <strong>Bank:</strong> Axis Bank, Crossing Republik, Ghaziabad
    </p>
  </div>

  {/* Contact Information */}
  

  {/* Optional Tagline */}
 

  {/* Signature */}
  

  {/* Footer */}
  <div className="border-t pt-4 text-xs text-gray-600 mt-8">
    <p>NOTE: This is a computer-generated invoice and does not require a physical signature.</p>
    <p className="text-center mt-2 font-medium">Thank you for your business! We look forward to serving you again.</p>
  </div>
</div>


  );
};

const BillingPage = () => {
  const [filter, setFilter] = useState("All");
  const [data, setData] = useState(null);
  const [allData, setAllData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const response = await getBill();
      if (response) {
        setData(response.data.data);
        setAllData(response.data.data);
        console.log(response.data.data);
      } else {
        showErrorToast("could not fetch bills");
      }
    };

    getData();
  }, []);

  const applyFilter = (filters) => {
    if (filters == "All") {
      setData(allData);
    } else if (filters == "Success") {
      const successData = allData.filter((el) => el.status == "success");
      setData(successData);
    } else if (filters == "Pending") {
      const successData = allData.filter((el) => el.status == "pending");
      setData(successData);
    } else if (filters == "Failed") {
      const successData = allData.filter((el) => el.status == "failed");
      setData(successData);
    }
  };


const downloadInvoice = async (id) => {
  const response = await getInvoiceFunc(id);

  if (!response) {
    showErrorToast("Couldn't Download");
    return;
  }

  const data = response.data.data[0];
  const invoiceNumber = `INV/${new Date(
    data.created_at
  ).getFullYear()}-${String(data.id).padStart(5, "0")}`;

  const container = document.createElement("div");

  // put it off-screen but renderable
  container.style.position = "absolute";
  container.style.left = "-9999px";
  container.style.top = "0";
  document.body.appendChild(container);

  const root = createRoot(container);

  // flush synchronously
  flushSync(() => {
    root.render(
      <Invoice
        data={data}
        invoiceNumber={invoiceNumber}
      />
    );
  });

  // give browser a frame to paint
  await new Promise((r) => requestAnimationFrame(r));

  // optionally check if content is really there
  console.log("Container innerHTML:", container);

  html2pdf()
    .from(container.innerHTML)
    .set({
      margin: 0.5,
      filename: `${invoiceNumber}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    })
    .save()
    .then(() => {
      root.unmount();
      container.remove();
    })
    .catch(() => {
      showErrorToast("Failed to generate PDF");
      root.unmount();
      container.remove();
    });
};


  return (
    <div
      style={{
        padding: "16px",
        backgroundColor: "#DEF3F9",
        minHeight: "100vh",
        width: "100%",
        color: "#003B70",
      }}
    >
      {/* Billing History */}
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            fontSize: "18px",
            fontWeight: "600",
            marginBottom: "16px",
            color: "#003B70",
          }}
        >
          Billing History
        </h2>

        {/* Filter Tabs */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "16px",
            flexWrap: "wrap",
          }}
        >
          {["All", "Success", "Pending", "Failed"].map((tab) => (
            <button
              key={tab}
              style={{
                padding: "6px 16px",
                fontSize: "12px",
                border: filter === tab ? "none" : "1px solid #0784C9",
                borderRadius: "20px",
                backgroundColor: filter === tab ? "#0784C9" : "white",
                color: filter === tab ? "white" : "#0784C9",
                cursor: "pointer",
                fontWeight: "500",
                transition: "all 0.2s",
              }}
              onClick={() => {
                setFilter(tab);
                applyFilter(tab);
              }}
              onMouseEnter={(e) => {
                if (filter !== tab) {
                  e.target.style.backgroundColor = "#DEF3F9";
                }
              }}
              onMouseLeave={(e) => {
                if (filter !== tab) {
                  e.target.style.backgroundColor = "white";
                }
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              minWidth: "100%",
              fontSize: "12px",
              textAlign: "left",
              borderTop: "1px solid #0784C9",
              borderCollapse: "collapse",
            }}
          >
            <thead style={{ backgroundColor: "#DEF3F9" }}>
              <tr>
                <th
                  style={{
                    padding: "12px 16px",
                    fontWeight: "600",
                    color: "#003B70",
                    borderBottom: "1px solid #0784C9",
                  }}
                >
                  Date
                </th>
                <th
                  style={{
                    padding: "12px 16px",
                    fontWeight: "600",
                    color: "#003B70",
                    borderBottom: "1px solid #0784C9",
                  }}
                >
                  Plan details
                </th>
                <th
                  style={{
                    padding: "12px 16px",
                    fontWeight: "600",
                    color: "#003B70",
                    borderBottom: "1px solid #0784C9",
                  }}
                >
                  Expires on
                </th>
                <th
                  style={{
                    padding: "12px 16px",
                    fontWeight: "600",
                    color: "#003B70",
                    borderBottom: "1px solid #0784C9",
                  }}
                >
                  Price
                </th>
                <th
                  style={{
                    padding: "12px 16px",
                    fontWeight: "600",
                    color: "#003B70",
                    borderBottom: "1px solid #0784C9",
                  }}
                >
                  Status
                </th>
                <th
                  style={{
                    padding: "12px 16px",
                    fontWeight: "600",
                    color: "#003B70",
                    borderBottom: "1px solid #0784C9",
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((entry, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: "1px solid #DEF3F9",
                  }}
                >
                  <td style={{ padding: "12px 16px", color: "#003B70" }}>
                    {entry.created_at.split("T")[0]}
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
                      color: "#0784C9",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    <p style={{ margin: "0 0 2px 0" }}>
                      {entry.Plan?.job_credits} Jobs
                    </p>
                    <p style={{ margin: "0" }}>
                      {entry.Plan?.Database_credits} Databases
                    </p>
                  </td>
                  <td style={{ padding: "12px 16px", color: "#003B70" }}>
                    {entry.expired_at.split("T")[0]}
                  </td>
                  <td style={{ padding: "12px 16px", color: "#003B70" }}>
                    {entry.amount_paid}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    {entry.status === "success" && (
                      <span
                        style={{
                          color: "#0784C9",
                          backgroundColor: "#DEF3F9",
                          padding: "4px 8px",
                          borderRadius: "12px",
                          fontSize: "10px",
                          fontWeight: "600",
                        }}
                      >
                        Success
                      </span>
                    )}
                    {entry.status === "failed" && (
                      <span
                        style={{
                          color: "#003B70",
                          backgroundColor: "#DEF3F9",
                          padding: "4px 8px",
                          borderRadius: "12px",
                          fontSize: "10px",
                          fontWeight: "600",
                        }}
                      >
                        Failed
                      </span>
                    )}
                    {entry.status === "Pending" && (
                      <span
                        style={{
                          color: "#0784C9",
                          backgroundColor: "#DEF3F9",
                          padding: "4px 8px",
                          borderRadius: "12px",
                          fontSize: "10px",
                          fontWeight: "600",
                        }}
                      >
                        Pending
                      </span>
                    )}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <button
                      onClick={() => downloadInvoice(entry.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "#0784C9",
                        textDecoration: "underline",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "12px",
                      }}
                    >
                      <Download
                        style={{
                          width: "14px",
                          height: "14px",
                          marginRight: "4px",
                        }}
                      />
                      Invoice
                    </button>

                    <button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "#003B70",
                        textDecoration: "underline",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "12px",
                      }}
                    >
                      <Mail
                        style={{
                          width: "14px",
                          height: "14px",
                          marginRight: "4px",
                        }}
                      />
                      Contact us
                    </button>
                  </td>
                </tr>
              ))}
              {!data ||
                (data?.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      style={{
                        textAlign: "center",
                        color: "#0784C9",
                        padding: "24px",
                        fontStyle: "italic",
                      }}
                    >
                      No records found.
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
