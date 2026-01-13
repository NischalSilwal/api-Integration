"use client";
import { useState, useEffect, FormEvent } from 'react';
import { Student } from './types/student';
import { addStudent, fetchStudents } from './lib/api';


export default function Home() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Student, 'studentId'>>({
    name: '',
    email: '',
    contactNumber: '',
    department: '',
  });
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch students on component mount
  useEffect(() => {
    async function loadStudents() {
      try {
        const data = await fetchStudents();
        setStudents(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load students. Please try again.');
        setLoading(false);
      }
    }
    loadStudents();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const newStudent = await addStudent(formData);
      setStudents((prev) => [...prev, newStudent]);
      setSuccess('Student added successfully!');
      setFormData({ name: '', email: '', contactNumber: '', department: '' });
    } catch (err) {
      setError('Failed to add student. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Student Management</h1>

      {/* Add Student Form */}
      <div className="mb-8 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-black">Add New Student</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md text-black"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Student
          </button>
        </form>
        {success && <p className="mt-4 text-green-600">{success}</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>

      {/* Student List */}
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-black">Student List</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : students.length === 0 ? (
          <p>No students found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-black">ID</th>
                  <th className="py-2 px-4 border-b text-black">Name</th>
                  <th className="py-2 px-4 border-b text-black">Email</th>
                  <th className="py-2 px-4 border-b text-black">Contact</th>
                  <th className="py-2 px-4 border-b text-black">Department</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.studentId}>
                    <td className="py-2 px-4 border-b text-black">{student.studentId}</td>
                    <td className="py-2 px-4 border-b text-black">{student.name}</td>
                    <td className="py-2 px-4 border-b text-black">{student.email}</td>
                    <td className="py-2 px-4 border-b text-black">{student.contactNumber}</td>
                    <td className="py-2 px-4 border-b text-black">{student.department}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}