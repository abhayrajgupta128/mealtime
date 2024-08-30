import cloudinary from "../../../cloudConfig";

export const POST = async (req) => {
    try {
      const data = await req.formData();
      if (data.get('file')) {
        const arrayBuffer = await data.get('file').arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
  
        const uploadResponse = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          });
          uploadStream.end(buffer);
        });
  
        return new Response(JSON.stringify({ url: uploadResponse.secure_url }), { status: 200 });
      } else {
        return new Response(JSON.stringify({ error: 'No file provided' }), { status: 400 });
      }
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
  };