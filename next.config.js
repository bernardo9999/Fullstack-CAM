/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "s2.glbimg.com",
      "via.placeholder.com",
      "3pa67w6iaxdisiavub4cjhj3fwhliw24r5cvshwxw3shmw7s3q.arweave.net",
      "img.freepik.com",
      "cdn-statics.pmo.sc.gov.br",
      "nftstorage.link",
      "bafybeiglfhh726npy5hoyc6czzlwdgnsuljdie5lh7acqp2o7luwdaqz5u.ipfs.nftstorage.link",
      "*.ipfs.nftstorage.link",
      "bafybeiavy5i4ghnxqjz5z3clviqpbi76kkbf3zkodnwq73yuigoqkdh6vi.ipfs.nftstorage.link",
    ],
  },

  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/jogos",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
