module.exports = ({ env }) => {
  const enableUpload = env("ENABLE_UPLOAD_FROM_AZURE", "false") === "true"; // Check if upload is enabled through an environment variable
  const enableEmail = env("ENABLE_EMAIL_FROM_AZURE", "false") === "true"; // Check if upload is enabled through an environment variable

  return {
    "users-permissions": {
      config: {
        jwt: {
          expiresIn: "7d",
        },
      },
    },

    ...(enableUpload && {
      upload: {
        config: {
          provider: "strapi-provider-upload-azure-storage",
          providerOptions: {
            authType: env("STORAGE_AUTH_TYPE", "default"),
            account: env("STORAGE_ACCOUNT"),
            accountKey: env("STORAGE_ACCOUNT_KEY"), // either account key or sas token is enough to make authentication
            sasToken: env("STORAGE_ACCOUNT_SAS_TOKEN"),
            serviceBaseURL: env("STORAGE_URL"), // optional
            containerName: env("STORAGE_CONTAINER_NAME"),
            createContainerIfNotExist: env(
              "STORAGE_CREATE_CONTAINER_IF_NOT_EXIST",
              "false"
            ), // optional
            publicAccessType: env("STORAGE_PUBLIC_ACCESS_TYPE"), // optional ('blob' | 'container')
            defaultPath: "assets",
            cdnBaseURL: env("STORAGE_CDN_URL"), // optional
            defaultCacheControl: env("STORAGE_CACHE_CONTROL"), // optional
            removeCN: env("REMOVE_CONTAINER_NAME"), // optional, if you want to remove container name from the URL
          },
        },
      },
    }),
    ...(enableEmail && {
      email: {
        config: {
          provider: "strapi-provider-email-azure",
          providerOptions: {
            endpoint: env("AZURE_ENDPOINT"),
          },
          settings: {
            defaultFrom: env("FALLBACK_EMAIL"),
          },
        },
      },
    }),
    "react-icons": true,
    'import-export-entries': {
      enabled: true,
      config: {
        serverPublicHostname: env("STORAGE_URL"),
      },
    },
  };
};