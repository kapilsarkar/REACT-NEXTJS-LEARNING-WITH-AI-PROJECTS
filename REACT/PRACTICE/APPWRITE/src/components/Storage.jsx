import { useState } from "react";
import { ID } from "appwrite";
import { storage } from "../appwrite/config.js";

const Storage = () => {
  const [pic, setPic] = useState(null);
  const [fileId, setFileId] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;

  // -----------------------------
  // Upload File
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pic) {
      alert("Please select a file first");
      return;
    }

    setLoading(true);

    try {
      // 1. Upload to Appwrite Storage
      const response = await storage.createFile({
        bucketId: BUCKET_ID,
        fileId: ID.unique(),
        file: pic,
      });

      console.log("File uploaded successfully:", response);
      setFileId(response.$id);

      // 2. Get public preview/view URL
      const previewUrl = storage.getFileView({
        bucketId: BUCKET_ID,
        fileId: response.$id,
      });
      setFileUrl(previewUrl);

      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      alert(error.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Download File
  // -----------------------------
  const handleDownload = () => {
    if (!fileId) {
      alert("No file uploaded to download!");
      return;
    }

    // Generates a URL that prompts the browser's download dialog
    const downloadUrl = storage.getFileDownload({
      bucketId: BUCKET_ID,
      fileId: fileId,
    });

    // Open/trigger the download link
    window.location.href = downloadUrl;
  };

  // -----------------------------
  // Delete File
  // -----------------------------
  const handleDelete = async () => {
    if (!fileId) {
      alert("No uploaded file to delete!");
      return;
    }

    try {
      await storage.deleteFile({
        bucketId: BUCKET_ID,
        fileId: fileId,
      });
      console.log("File deleted successfully");

      setFileId("");
      setFileUrl("");
      setPic(null);
      alert("File deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      alert(error.message || "Delete failed");
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-xl shadow-md border space-y-4">
      <h2 className="text-xl font-bold text-gray-800">Appwrite File Storage</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          name="file"
          accept="image/*"
          onChange={(e) => setPic(e.target.files[0])}
          required
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg text-sm transition-colors disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>

          <button
            type="button"
            onClick={handleDownload}
            disabled={!fileId}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-lg text-sm transition-colors disabled:opacity-40"
          >
            Download
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={!fileId}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg text-sm transition-colors disabled:opacity-40"
          >
            Delete
          </button>
        </div>
      </form>

      {/* Preview Section */}
      {fileUrl && (
        <div className="pt-4 border-t">
          <p className="text-xs text-gray-500 mb-2 font-medium">
            Uploaded File Preview:
          </p>
          <img
            src={fileUrl}
            alt="Uploaded Preview"
            className="w-full h-48 object-cover rounded-lg border"
          />
        </div>
      )}
    </div>
  );
};

export default Storage;