import React, { useState } from "react";
import { QrCodeGenerator } from "@scanupload/qr-code-generator";
import "@scanupload/qr-code-generator/dist/qr-code-generator.css";

export default function GeneralForm() {
  const [showQrCodeLogo, setShowQrCodeLogo] = useState(false);
  const [clickQrcodeReload, setClickQrcodeReload] = useState(true);
  const [showHeader, setShowHeader] = useState(true);
  const [filePreviewMode, setFilePreviewMode] = useState("list");
  const [headerText, setHeaderText] = useState("Scan to upload");
  const [qrCodeSize, setQrCodeSize] = useState("large");
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-gray-100">
      <div className="flex items-center justify-center min-h-screen min-w-screen">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-8  max-w-md"
        >
          <h2 className="text-2xl font-bold text-center mb-2">Example Form</h2>

          <div className="mb-6">
            <label
              htmlFor="options"
              className="block text-sm font-medium text-left text-gray-700 mb-3"
            >
              QR Code generator options
            </label>
            <div className="flex flex-col items-keft space-x-1">
              <div class="flex items-center gap-0">
                <input
                  id="checkQrCodeLogo"
                  type="checkbox"
                  checked={showQrCodeLogo}
                  onChange={() => setShowQrCodeLogo(!showQrCodeLogo)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-2"
                />
                <label
                  htmlFor="options"
                  className="text-sm font-medium text-gray-700 select-none cursor-pointer w-20 text-left"
                >
                  Show Logo
                </label>
              </div>
              <div class="flex items-center">
                <input
                  id="checkQrCodeReload"
                  type="checkbox"
                  checked={clickQrcodeReload}
                  onChange={() => setClickQrcodeReload(!clickQrcodeReload)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-2"
                />
                <label
                  htmlFor="options"
                  className="text-sm font-medium text-gray-700 select-none cursor-pointer w-40 text-left"
                >
                  Click QR code to reload
                </label>
              </div>
              <div class="flex items-center">
                <input
                  id="checkHeader"
                  type="checkbox"
                  checked={showHeader}
                  onChange={() => setShowHeader(!showHeader)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-2"
                />
                <label
                  htmlFor="options"
                  className="text-sm font-medium text-gray-700 select-none cursor-pointer  w-25 text-left"
                >
                  Show header
                </label>
              </div>
              <div class="flex items-center mt-4">
                <label
                  htmlFor="headerText"
                  className="text-sm font-medium text-gray-700 select-none cursor-pointer  w-25 text-left"
                >
                  Header text
                </label>
                <input
                  id="headerText"
                  type="text"
                  value={headerText}
                  onChange={(e) => setHeaderText(e.target.value)}
                  className="w-60 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                  placeholder="Enter header text"
                />
              </div>
              <div className="flex flex-col gap-0 mt-4">
                <div className="text-sm font-medium text-gray-700 select-none cursor-pointer  text-left">
                  File preview mode
                </div>
                <div class="flex flex-row items-start ">
                  <div className=" flex flex-row items-start mt-3 space-x-4">
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="file-preview-mode-list"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        defaultChecked
                        checked={filePreviewMode === "list"}
                        onChange={() => setFilePreviewMode("list")}
                      />
                      <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">
                        List
                      </span>
                    </label>

                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="file-preview-mode-grid"
                        checked={filePreviewMode === "grid"}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        onChange={() => setFilePreviewMode("grid")}
                      />
                      <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">
                        Grid
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-0 mt-4">
                <div className="text-sm font-medium text-gray-700 select-none cursor-pointer  text-left">
                  Qr Code size
                </div>
                <div class="flex flex-row items-start ">
                  <div className=" flex flex-row items-start mt-3 space-x-4">
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="qr-code-size-small"
                        checked={qrCodeSize === "small"}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        defaultChecked
                        onChange={() => setQrCodeSize("small")}
                      />
                      <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">
                        Small
                      </span>
                    </label>

                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="qr-code-size-medium"
                        checked={qrCodeSize === "medium"}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        onChange={() => setQrCodeSize("medium")}
                      />
                      <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">
                        Medium
                      </span>
                    </label>

                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="qr-code-size-large"
                        checked={qrCodeSize === "large"}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        onChange={() => setQrCodeSize("large")}
                      />
                      <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">
                        Large
                      </span>
                    </label>
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="qr-code-size-xlarge"
                        checked={qrCodeSize === "xlarge"}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        onChange={() => setQrCodeSize("xlarge")}
                      />
                      <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">
                        Extra Large
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <QrCodeGenerator
              sessionUrl="/scanupload-api/session"
              refreshTokenUrl="/scanupload-api/token"
              showHeader={showHeader}
              header={headerText}
              size={qrCodeSize}
              showLogo={showQrCodeLogo}
              clickQrCodeToReload={clickQrcodeReload}
              filePreviewMode={filePreviewMode}
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
    </div>
  );
}
