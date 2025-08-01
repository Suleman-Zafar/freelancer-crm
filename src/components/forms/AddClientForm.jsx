import React, { useState } from 'react';
import { Button } from '../ui/button';
import useClientStore from '../../stores/clientStore';

const AddClientForm = () => {
  const { addClient } = useClientStore();

  const [form, setForm] = useState({
    name: '',
    email: '',
    projectName: '',
    budget: '',
    status: 'Active',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Add to Firestore via store
    await addClient(form);

    // ✅ Clear the form after submit
    setForm({
      name: '',
      email: '',
      projectName: '',
      budget: '',
      status: 'Active',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md p-4 bg-white rounded shadow">
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Client Name"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="projectName"
        value={form.projectName}
        onChange={handleChange}
        placeholder="Project Name"
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="budget"
        value={form.budget}
        onChange={handleChange}
        placeholder="Budget"
        className="w-full p-2 border rounded"
        required
      />
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
      <Button type="submit" className="w-full">
        Add Client
      </Button>
    </form>
  );
};

export default AddClientForm;
