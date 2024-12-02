/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cdn.pixabay.com', 'localhost', 'localhost:8000', 'www.visana.ch', 'storage.googleapis.com'], // Allow images from pixabay
      },
};

export default nextConfig;
