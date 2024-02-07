import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Form, Toast, Spinner } from "react-bootstrap";
import "./form.component.css";

export default function FormComponent() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("email", email);
      formData.append("file", file as File);
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!res.ok) {
        setError("Something went wrong");
        return;
      }
      setSuccess("File uploaded successful");
    } catch (error) {
      setError("Failed to upload file");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="border border-primary p-5 d-flex flex-column justify-content-center align-self-center px-6 form_container"
    >
      <span>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Form.Text className="text-muted">
            This is only for testing purpose. We will not share it.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>File</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} required />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </span>
      {error && (
        <Toast className="d-inline-block mt-5 text-center mx-auto" bg="danger">
          <Toast.Body>{error}</Toast.Body>
        </Toast>
      )}
      {success && (
        <Toast className="d-inline-block mt-5 text-center mx-auto" bg="success">
          <Toast.Body>{success}</Toast.Body>
        </Toast>
      )}
      {isSubmitting && (
        <Spinner animation="border" variant="success" className="spinner" />
      )}
    </Form>
  );
}
