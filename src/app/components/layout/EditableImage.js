import Image from "next/image";
import { toast } from "react-hot-toast";

const EditableImage = ({ link, setLink }) => {
  const handleFileChange = async (ev) => {
    const files = ev.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      const uploadPromise = new Promise(async (resolve, reject) => {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: data,
        });
        if (response.ok) {
          const result = await response.json();
          setLink(result.url);
          resolve();
        } else {
          reject();
        }
      });

      await toast.promise(uploadPromise, {
        loading: "Uploading...",
        success: "Image uploaded!",
        error: "Error uploading image",
      });
    }
  };
  return (
    <>
      {link && (
        <Image
          className="rounded-lg w-full h-full mb-1"
          src={link}
          width={250}
          height={250}
          alt="avatar"
          priority
        />
      )}
      {!link && ( 
      <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">No image
      </div>
      )}
      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className="block border border-gray-300 cursor-pointer rounded-lg p-2 text-center">
          Edit image
        </span>
      </label>
    </>
  );
};

export default EditableImage;
