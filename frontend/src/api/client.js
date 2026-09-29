/**
 * Blue Harvest API Client
 * Configured to communicate with the Render backend:
 * https://blueharvest-backend.onrender.com
 *
 * Uses VITE_API_URL environment variable as required.
 */

// Resolved Base API URL
export const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim() !== '') {
    return envUrl.trim().replace(/\/+$/, '');
  }
  // Default to the production backend deployment if VITE_API_URL is not set
  return 'https://blueharvest-backend.onrender.com';
};

/**
 * Process fish fry image using the 10-stage Computer Vision pipeline
 * Endpoint: POST /api/image-processing
 *
 * @param {File|Blob} imageFile - Image file or Blob
 * @returns {Promise<Object>} ImageProcessingResponse from backend
 */
export async function processImage(imageFile) {
  const baseUrl = getApiBaseUrl();
  const endpoint = `${baseUrl}/api/image-processing`;

  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await fetch(endpoint, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    let errorDetail = `Image processing failed with status ${response.status}`;
    try {
      const errJson = await response.json();
      if (errJson.detail) {
        errorDetail = typeof errJson.detail === 'string' ? errJson.detail : JSON.stringify(errJson.detail);
      } else if (errJson.message) {
        errorDetail = errJson.message;
      }
    } catch {
      // ignore json parse error
    }
    throw new Error(errorDetail);
  }

  return response.json();
}

/**
 * Preprocess and assess fish fry image quality and multi-stage enhancements
 * Endpoint: POST /api/preprocess-image
 *
 * @param {File|Blob} imageFile - Image file or Blob
 * @returns {Promise<Object>} PreprocessImageResponse from backend
 */
export async function preprocessImage(imageFile) {
  const baseUrl = getApiBaseUrl();
  const endpoint = `${baseUrl}/api/preprocess-image`;

  const formData = new FormData();
  formData.append('file', imageFile);

  const response = await fetch(endpoint, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    let errorDetail = `Image preprocessing failed with status ${response.status}`;
    try {
      const errJson = await response.json();
      if (errJson.detail) {
        errorDetail = typeof errJson.detail === 'string' ? errJson.detail : JSON.stringify(errJson.detail);
      } else if (errJson.message) {
        errorDetail = errJson.message;
      }
    } catch {
      // ignore json parse error
    }
    throw new Error(errorDetail);
  }

  return response.json();
}

/**
 * Check backend diagnostics and status
 * Endpoint: GET /api/diagnostics
 */
export async function getDiagnostics() {
  const baseUrl = getApiBaseUrl();
  const endpoint = `${baseUrl}/api/diagnostics`;

  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Diagnostics request failed with status ${response.status}`);
  }
  return response.json();
}

export default {
  getApiBaseUrl,
  processImage,
  preprocessImage,
  getDiagnostics,
};
