import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  ChevronsUpDown,
} from "lucide-react";
import useClientStore from "../../stores/clientStore";
import useProjectStore from "@/stores/projectStore";
import useInvoiceStore from "@/stores/invoiceStore";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";

// ---------- Helpers ----------
const getInitialFormData = (collectionName) => {
  switch (collectionName) {
    case "clients":
      return { name: "", email: "", budget: "", project: "", status: "" };
    case "projects":
      return {
        client: "",
        projectName: "",
        deadline: "",
        budget: "",
        status: "",
      };
    case "invoices":
      return {
        invoiceNumber: "",
        client: "",
        amount: "",
        dueDate: "",
        paidDate: "",
        status: "",
        paymentMethod: "",
      };
    default:
      return {};
  }
};

const getStoreByCollection = (collectionName) => {
  switch (collectionName) {
    case "clients":
      return useClientStore;
    case "projects":
      return useProjectStore;
    case "invoices":
      return useInvoiceStore;
    default:
      throw new Error("Invalid collection name");
  }
};

const getStatusOptions = (collectionName) => {
  switch (collectionName) {
    case "clients":
      return ["Active", "Inactive", "Prospect"];
    case "projects":
      return ["Ongoing", "Completed", "Pending", "Cancelled"];
    case "invoices":
      return ["Paid", "Unpaid", "Overdue", "Draft"];
    default:
      return [];
  }
};

const statusColorMap = {
  Active: "bg-green-100 text-green-800",
  Inactive: "bg-gray-100 text-gray-800",
  Prospect: "bg-yellow-100 text-yellow-800",
  Ongoing: "bg-blue-100 text-blue-800",
  Completed: "bg-green-100 text-green-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Cancelled: "bg-red-100 text-red-800",
  Paid: "bg-green-100 text-green-800",
  Unpaid: "bg-red-100 text-red-800",
  Overdue: "bg-orange-100 text-orange-800",
  Draft: "bg-gray-100 text-gray-800",
};

const StatusBadge = ({ status }) => {
  if (!status) return null;
  const color = statusColorMap[status] || "bg-gray-100 text-gray-800";
  return (
    <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${color}`}>
      {status}
    </span>
  );
};

const isDateField = (key) => key.toLowerCase().includes("date");
const isStatusField = (key) => key.toLowerCase() === "status";
const isEmailField = (key) => key.toLowerCase() === "email";
const isAmountField = (key) => key.toLowerCase() === "amount" || key.toLowerCase() === "budget";

// ---------- Render Field ----------
const renderInputField = (value, key, onChange, collectionName) => {
  if (isDateField(key)) {
    return (
      <Input
        type="date"
        value={value}
        onChange={(e) => onChange(e, key)}
        required
      />
    );
  }

  if (isStatusField(key)) {
    const options = getStatusOptions(collectionName);
    return (
      <select
        value={value}
        onChange={(e) => onChange(e, key)}
        className="w-full text-sm border rounded px-2 py-1"
        required
      >
        <option value="">Select Status</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    );
  }

  if (isEmailField(key)) {
    return (
      <Input
        type="email"
        value={value}
        onChange={(e) => onChange(e, key)}
        required
      />
    );
  }

  if (isAmountField(key)) {
    return (
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(e, key)}
        required
      />
    );
  }

  return (
    <Input
      type="text"
      value={value}
      onChange={(e) => onChange(e, key)}
      required
    />
  );
};

// ---------- Main Component ----------
const MainContent = ({
  title = "Clients",
  headers = [],
  data = [],
  collectionName = "clients",
}) => {
  const [formData, setFormData] = useState(getInitialFormData(collectionName));
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [sortKey, setSortKey] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [search, setSearch] = useState("");

  const useStore = getStoreByCollection(collectionName);
  const { setItems } = useStore();

  const handleChange = (e, key) => {
    setFormData({ ...formData, [key]: e.target.value });
  };

  const handleEditChange = (e, key) => {
    setEditedData({ ...editedData, [key]: e.target.value });
  };

  const addRow = async () => {
    const colRef = collection(db, collectionName);
    const docRef = await addDoc(colRef, formData);
    setItems((prev) => [...prev, { id: docRef.id, ...formData }]);
    setFormData(getInitialFormData(collectionName));
  };

  const deleteRow = async (id) => {
    await deleteDoc(doc(db, collectionName, id));
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const startEditing = (item) => {
    setEditingId(item.id);
    setEditedData(item);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditedData({});
  };

  const saveEdit = async () => {
    const docRef = doc(db, collectionName, editingId);
    await updateDoc(docRef, editedData);
    setItems((prev) =>
      prev.map((item) =>
        item.id === editingId ? { ...editedData, id: editingId } : item
      )
    );
    cancelEditing();
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, collectionName), (snapshot) => {
      const liveData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(liveData);
    });

    return () => unsubscribe();
  }, [collectionName, setItems]);

  const dataHeaders = headers.filter((h) => h.key !== "actions");

  const sortedFilteredData = [...data]
    .filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (!sortKey) return 0;
      const valA = a[sortKey] ?? "";
      const valB = b[sortKey] ?? "";
      return sortAsc
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  return (
    <section className="flex-1 bg-gray-50 min-h-screen px-6 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64"
        />
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full text-sm text-left text-gray-900">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {headers.map((header, idx) => (
                <th
                  key={idx}
                  className="px-6 py-3 font-semibold whitespace-nowrap cursor-pointer select-none"
                  onClick={() =>
                    header.key !== "actions" && toggleSort(header.key)
                  }
                >
                  <div className="flex items-center gap-1">
                    {header.label}
                    {header.key !== "actions" && sortKey === header.key && (
                      <ChevronsUpDown
                        size={14}
                        className={`transition-transform ${
                          sortAsc ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Add Row */}
            <tr className="border-b border-gray-200 bg-gray-50">
              {dataHeaders.map((header, hidx) => (
                <td key={hidx} className="px-6 py-4">
                  {renderInputField(
                    formData[header.key] || "",
                    header.key,
                    handleChange,
                    collectionName
                  )}
                </td>
              ))}
              <td className="px-6 py-4">
                <Button
                  onClick={addRow}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm px-4 py-2 rounded-md"
                >
                  <Plus size={16} />
                </Button>
              </td>
            </tr>

            {/* Data Rows */}
            {sortedFilteredData.length > 0 ? (
              sortedFilteredData.map((item) => (
                <tr key={item.id} className="border-b border-gray-200">
                  {dataHeaders.map((header, hidx) => (
                    <td key={hidx} className="px-6 py-4">
                      {editingId === item.id ? (
                        renderInputField(
                          editedData[header.key] || "",
                          header.key,
                          handleEditChange,
                          collectionName
                        )
                      ) : header.key === "status" ? (
                        <StatusBadge status={item[header.key]} />
                      ) : (
                        item[header.key]
                      )}
                    </td>
                  ))}
                  <td className="px-6 py-4 flex gap-2">
                    {editingId === item.id ? (
                      <>
                        <Button
                          onClick={saveEdit}
                          className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 text-xs"
                        >
                          <Save size={16} />
                        </Button>
                        <Button
                          onClick={cancelEditing}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 text-xs"
                        >
                          <X size={16} />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() => startEditing(item)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 text-xs"
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          onClick={() => deleteRow(item.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 text-xs"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={headers.length}
                  className="px-6 py-4 text-center text-gray-500"
                >
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MainContent;
