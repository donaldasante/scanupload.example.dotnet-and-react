import React, { useState } from "react";
import { QrCodeGenerator } from "@scanupload/qr-code-generator";
import "@scanupload/qr-code-generator/dist/qr-code-generator.css";

export default function LoginForm() {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Form</h2>

        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="mb-6">
          <QrCodeGenerator
            uploadUrl="https://example.com"
            showHeader={true}
            header="Scan to upload"
            size="large"
            showLogo={true}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
