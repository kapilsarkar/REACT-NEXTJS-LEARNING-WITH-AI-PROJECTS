import { useState } from "react";
import { supabase } from "../supabse-client.js";

const Storage = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [images, setImages] = useState([]);

  const handleViewAll = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setMessage("You must be logged in.");
      return;
    }

    // Get all files from the logged-in user's folder
    const { data: files, error } = await supabase.storage
      .from("avatars")
      .list(user.id);

    if (error) {
      console.error(error);
      setMessage(error.message);
      return;
    }

    // Create signed URLs for every file
    const imageData = await Promise.all(
      files.map(async (file) => {
        const filePath = `${user.id}/${file.name}`;

        const { data, error } = await supabase.storage
          .from("avatars")
          .createSignedUrl(filePath, 60 * 60);

        if (error) {
          console.error(error);
          return null;
        }

        return {
          name: file.name,
          url: data.signedUrl,
        };
      }),
    );

    // Remove any files for which URL creation failed
    setImages(imageData.filter(Boolean));

    setMessage(`${imageData.filter(Boolean).length} image(s) found.`);
  };

  const handleView = async () => {
    if (!file) {
      setMessage("Please select the uploaded file first.");
      return;
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setMessage("You must be logged in.");
      return;
    }

    const filePath = `${user.id}/${file.name}`;

    const { data, error } = await supabase.storage
      .from("avatars")
      .createSignedUrl(filePath, 60 * 60);

    if (error) {
      console.error(error);
      setMessage(error.message);
      return;
    }

    console.log("SIGNED URL:", data.signedUrl);
    setImageUrl(data.signedUrl);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    // Get currently logged-in user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setMessage("You must be logged in.");
      return;
    }

    // User-specific folder
    const filePath = `${user.id}/${file.name}`;

    const { error } = await supabase.storage
      .from("avatars")
      .upload(filePath, file);

    if (error) {
      console.error(error);
      setMessage(error.message);
      return;
    }

    setMessage("File uploaded successfully!");
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-xl">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">
              Supabase Storage
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Upload and securely view your private files.
            </p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* File Input */}
            <div>
              <label
                htmlFor="file"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Select an image
              </label>

              <input
                id="file"
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="block w-full text-sm text-slate-600
                         file:mr-4 file:py-2.5 file:px-4
                         file:rounded-lg file:border-0
                         file:text-sm file:font-semibold
                         file:bg-indigo-50 file:text-indigo-700
                         hover:file:bg-indigo-100
                         cursor-pointer"
              />

              {file && (
                <p className="mt-2 text-xs text-slate-500">
                  Selected: {file.name}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleUpload}
                className="flex-1 px-4 py-2.5 rounded-lg
                         bg-indigo-600 text-white
                         font-medium text-sm
                         hover:bg-indigo-700
                         active:bg-indigo-800
                         transition-colors
                         shadow-sm"
              >
                Upload File
              </button>

              <button
                onClick={handleView}
                className="flex-1 px-4 py-2.5 rounded-lg
                         border border-slate-300
                         bg-white text-slate-700
                         font-medium text-sm
                         hover:bg-slate-50
                         transition-colors"
              >
                View Image
              </button>
              <button
                onClick={handleViewAll}
                className="w-full px-4 py-2.5 rounded-lg
             bg-slate-800 text-white
             font-medium text-sm
             hover:bg-slate-900
             transition-colors"
              >
                View My Images
              </button>
            </div>

            {/* Message */}
            {message && (
              <div
                className="rounded-lg bg-slate-50
                         border border-slate-200
                         px-4 py-3 text-sm text-slate-600"
              >
                {message}
              </div>
            )}

            {/* Image Preview */}
            {imageUrl && (
              <div className="pt-2">
                <p className="text-sm font-medium text-slate-700 mb-3">
                  Uploaded Image
                </p>

                <div
                  className="flex justify-center rounded-xl
                              border border-slate-200
                              bg-slate-50 p-4"
                >
                  <img
                    src={imageUrl}
                    alt="Uploaded avatar"
                    className="w-52 h-52 object-cover rounded-lg shadow-md"
                  />
                </div>
              </div>
            )}
            {images.length > 0 && (
              <div className="pt-4">
                <p className="text-sm font-medium text-slate-700 mb-3">
                  My Uploaded Images
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {images.map((image) => (
                    <div
                      key={image.name}
                      className="bg-slate-50 border border-slate-200
                     rounded-xl p-2"
                    >
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-40 object-cover rounded-lg"
                      />

                      <p
                        className="mt-2 text-xs text-slate-500 truncate"
                        title={image.name}
                      >
                        {image.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Storage;
