import { Student } from '../types/student';

export async function fetchStudents(): Promise<Student[]> {
  try {
    const response = await fetch('http://localhost:5112/api/students', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
}

export async function addStudent(student: Omit<Student, 'studentId'>): Promise<Student> {
  try {
    const response = await fetch('http://localhost:5112/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding student:', error);
    throw error;
  }
}