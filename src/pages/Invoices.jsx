import React, { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import MainContent from "../components/layout/MainContent";
import { Edit, Trash2, Save } from "lucide-react";
import { Button } from "../components/ui/button";
import useInvoiceStore from "../stores/invoiceStore";

const STATUS_OPTIONS = ["Paid", "Unpaid", "Pending", "Overdue"];

const Invoices = () => {
  const { invoices, fetchInvoices, deleteInvoice, updateInvoice } = useInvoiceStore();
  const [editRowId, setEditRowId] = useState(null);
  const [editableInvoice, setEditableInvoice] = useState({});

  useEffect(() => {
    const unsubscribe = fetchInvoices(); // Real-time listener
    return () => unsubscribe();
  }, []);

  const startEditing = (invoice) => {
    setEditRowId(invoice.id);
    setEditableInvoice({ ...invoice });
  };

  const saveInvoice = async () => {
    if (!editableInvoice.status || !editableInvoice.dueDate || !editableInvoice.paidDate) {
      alert("Please fill all fields correctly.");
      return;
    }

    await updateInvoice(editableInvoice);
    setEditRowId(null);
    setEditableInvoice({});
  };

  const headers = [
    { label: "Client", key: "client" },
    { label: "Invoice #", key: "invoiceNumber" },
    { label: "Amount", key: "amount" },
    {
      label: "Due Date",
      key: "dueDate",
      render: (invoice) =>
        invoice.id === editRowId ? (
          <input
            type="date"
            className="border rounded px-2 py-1 text-sm"
            value={editableInvoice.dueDate || ""}
            onChange={(e) => setEditableInvoice({ ...editableInvoice, dueDate: e.target.value })}
          />
        ) : (
          invoice.dueDate || "-"
        ),
    },
    {
      label: "Paid Date",
      key: "paidDate",
      render: (invoice) =>
        invoice.id === editRowId ? (
          <input
            type="date"
            className="border rounded px-2 py-1 text-sm"
            value={editableInvoice.paidDate || ""}
            onChange={(e) => setEditableInvoice({ ...editableInvoice, paidDate: e.target.value })}
          />
        ) : (
          invoice.paidDate || "-"
        ),
    },
    {
      label: "Status",
      key: "status",
      render: (invoice) =>
        invoice.id === editRowId ? (
          <select
            className="border rounded px-2 py-1 text-sm"
            value={editableInvoice.status}
            onChange={(e) => setEditableInvoice({ ...editableInvoice, status: e.target.value })}
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        ) : (
          <span
            className={`text-sm font-medium px-2 py-1 rounded-full ${
              invoice.status === "Paid"
                ? "bg-green-100 text-green-700"
                : invoice.status === "Overdue"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {invoice.status}
          </span>
        ),
    },
    {
      label: "Actions",
      key: "actions",
      align: "right",
      render: (invoice) =>
        invoice.id === editRowId ? (
          <div className="flex gap-2 justify-end">
            <Button size="sm" onClick={saveInvoice}>
              <Save size={14} className="mr-1" /> Save
            </Button>
          </div>
        ) : (
          <div className="flex gap-2 justify-end">
            <Button size="sm" variant="outline" onClick={() => startEditing(invoice)}>
              <Edit size={14} />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-orange-500"
              onClick={() => deleteInvoice(invoice.id)}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        ),
    },
  ];

  return (
    <div>
      <Navbar />
      <MainContent title="Invoices" headers={headers} data={invoices} collectionName="invoices" />
      <Footer />
    </div>
  );
};

export default Invoices;
