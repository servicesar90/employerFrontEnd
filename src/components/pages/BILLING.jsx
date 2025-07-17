// export default BillingPage;
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
    <div
      id="invoice"
      className="max-w-[800px] mx-auto bg-white text-black p-8"
      style={{ fontFamily: "Arial, sans-serif", fontSize: "14px" }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <img
            src="/unigrowLogo.png" 
            alt="Company Logo"
            className="h-10"
          />
          {/* <div className="font-bold text-lg">Unigrow Talent</div> */}
        </div>
        <div className="text-right">
          <div className="font-bold text-lg">Invoice</div>
          <div>Invoice No: {invoiceNumber}</div>
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <div>
          <strong>Date:</strong>{" "}
          {new Date(data?.created_at).toLocaleDateString()}
        </div>
      </div>

      {/* Parties */}
      <div className="flex justify-between mb-6">
        <div className="w-1/2 pr-2">
          <strong>Invoiced To:</strong>
          <p>{data?.Employer?.GstDetail?.tradeNam}</p>
          <p>
            {data?.Employer?.GstDetail?.bno},{" "}
            {data?.Employer?.GstDetail?.bnm},{" "}
            {data?.Employer?.GstDetail?.dst}
          </p>
          <p>GSTIN: {data?.Employer?.GstDetail?.gstin}</p>
        </div>
        <div className="w-1/2 pl-2">
          <strong>Pay To:</strong>
          <p>TalentNest People Services PVT. Ltd.</p>
          <p>4F-435A, Crossing Republik, Gautambuddha Nagar</p>
          <p>GSTIN: 09AALCT8284F1ZQ</p>
          <p>info@talennestpeopleservices.com</p>
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-left border-collapse mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Service</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Rate</th>
            <th className="border p-2">Qty</th>
            <th className="border p-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">Hot</td>
            <td className="border p-2">
              {data?.Plan?.description}
            </td>
            <td className="border p-2">₹{subtotal.toFixed(2)}</td>
            <td className="border p-2">1</td>
            <td className="border p-2">₹{subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={4} className=" p-2 text-right">Subtotal:</td>
            <td className="border p-2">₹{subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={4} className=" p-2 text-right">CGST @ 9%:</td>
            <td className="border p-2">₹{cgst.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={4} className=" p-2 text-right">SGST @ 9%:</td>
            <td className="border p-2">₹{sgst.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={4} className=" p-2 text-right font-bold">Total:</td>
            <td className="border p-2 font-bold">₹{total.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      {/* Total in words */}
      <p className="mb-4">
        <strong>Total in words:</strong> {totalInWords}
      </p>

      {/* Note */}
      <p className="text-xs mt-8">
        NOTE: This is a computer-generated invoice and does not require a physical signature.
      </p>
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
                  Amount
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
