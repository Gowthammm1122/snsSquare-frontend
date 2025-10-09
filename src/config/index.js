const config = {
  production: {
    url: "",
    apiUrl: "production api url",
  },
  local: {
    url: "http://localhost:2406",
    apiUrl: "http://localhost:2406/api/v1/",
    bucketName: "sns-square",
    region: "ap-south-1",
  },
};

export const environment = "local";

const hostConfig = {
  WEB_URL: config[environment].url,
  IMAGE_URL: `https://${config[environment].bucketName}.s3.ap-south-1.amazonaws.com`,
  API_URL: config[environment].apiUrl,
  S3_BUCKET: `${config[environment].bucketName}`,
  REGION: `${config[environment].region}`,
};

export { hostConfig };