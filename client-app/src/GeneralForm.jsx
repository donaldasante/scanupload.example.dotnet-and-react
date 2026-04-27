import React, { useState } from "react";
import { QrCodeGenerator } from "@scanupload/qr-code-generator-react";
import "@scanupload/qr-code-generator-react/dist/index.css";
import "./scanupload-override.css";

export default function GeneralForm() {
  const [showQrCodeLogo, setShowQrCodeLogo] = useState(true);
  const [clickQrcodeReload, setClickQrcodeReload] = useState(true);
  const [showHeader, setShowHeader] = useState(true);
  const [filePreviewMode, setFilePreviewMode] = useState("list");
  const [headerText, setHeaderText] = useState("Scan to upload");
  const [qrCodeSize, setQrCodeSize] = useState("large");
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(null);

  const handleDownload = async (e) => {
    e.preventDefault();
    setDownloadError(null);

    const raw = localStorage.getItem("qrcode-last-session-ids");
    const sessionId = raw ? JSON.parse(raw)[0] : null;
    if (!sessionId) {
      setDownloadError(
        "No active session found. Please scan the QR code first.",
      );
      return;
    }

    setDownloading(true);
    try {
      const response = await fetch(
        `/api/download-file/${encodeURIComponent(sessionId)}`,
      );
      if (!response.ok) {
        const json = await response.json().catch(() => ({}));
        setDownloadError(json.error || "Download failed.");
        return;
      }

      const disposition = response.headers.get("Content-Disposition");
      let fileName = "download";
      if (disposition) {
        const match =
          disposition.match(/filename\*=UTF-8''([^;]+)/i) ||
          disposition.match(/filename="?([^";]+)"?/i);
        if (match) fileName = decodeURIComponent(match[1]);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = fileName;
      anchor.click();
      URL.revokeObjectURL(url);
    } catch {
      setDownloadError("Download failed. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="flex items-center justify-center min-h-screen min-w-screen">
        <form
          onSubmit={handleDownload}
          className="bg-white shadow-lg rounded-lg p-8  max-w-md"
        >
          <h2 className="text-2xl font-bold text-center mb-2">Example Form</h2>

          <div className="mb-6">
            <h6 className="block text-sm font-medium text-left text-gray-700 mb-3">
              QR Code generator options
            </h6>
            <div className="flex flex-col items-keft space-x-1">
              <div className="flex items-center gap-0">
                <input
                  id="checkQrCodeLogo"
                  type="checkbox"
                  checked={showQrCodeLogo}
                  onChange={() => setShowQrCodeLogo(!showQrCodeLogo)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-2"
                />
                <label
                  htmlFor="checkQrCodeLogo"
                  className="text-sm font-medium text-gray-700 select-none cursor-pointer w-20 text-left"
                >
                  Show Logo
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="checkQrCodeLogo"
                  type="checkbox"
                  checked={clickQrcodeReload}
                  onChange={() => setClickQrcodeReload(!clickQrcodeReload)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-2"
                />
                <label
                  htmlFor="checkQrCodeLogo"
                  className="text-sm font-medium text-gray-700 select-none cursor-pointer w-40 text-left"
                >
                  Click QR code to reload
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="checkHeader"
                  type="checkbox"
                  checked={showHeader}
                  onChange={() => setShowHeader(!showHeader)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-2"
                />
                <label
                  htmlFor="checkHeader"
                  className="text-sm font-medium text-gray-700 select-none cursor-pointer  w-25 text-left"
                >
                  Show header
                </label>
              </div>
              <div className="flex items-center mt-4">
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
                <div className="flex flex-row items-start ">
                  <div className=" flex flex-row items-start mt-3 space-x-4">
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="file-preview-mode-list"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
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
                <div className="flex flex-row items-start ">
                  <div className=" flex flex-row items-start mt-3 space-x-4">
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="qr-code-size-small"
                        checked={qrCodeSize === "small"}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
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
            disabled={downloading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {downloading ? "Downloading..." : "Download Files"}
          </button>
          {downloadError && (
            <p className="mt-2 text-sm text-center text-red-600">
              {downloadError}
            </p>
          )}

          <p className="mt-4 text-center text-sm">
            <a
              href="https://app.scanupload.net/"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Back to ScanUpload
            </a>
          </p>

          <p className="mt-4 text-center text-sm text-gray-500">
            View the{" "}
            <a
              href="https://github.com/donaldasante/scanupload.example.dotnet-and-react"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              source code on GitHub
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
