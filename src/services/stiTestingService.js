// src\services\stiTestingService.js
import { apiService } from "../utils/axiosConfig";
import config from "../utils/config";

/**
 * Service for handling STI testing-related API calls
 */
const stiTestingService = {
  /**
   * Get all STI tests
   * @param {Object} params - Query parameters for filtering, pagination, etc.
   * @returns {Promise} - The STI tests response promise
   */
  getAll: (params = {}) => {
    return apiService.get(config.api.stiTesting.getAll, { params });
  },

  /**
   * Get STI tests for the current authenticated customer
   * @returns {Promise} - The STI tests for current customer response promise
   */
  getForCustomer: () => {
    return apiService.get(config.api.stiTesting.getForCustomer);
  },

  /**
   * Get STI test by ID
   * @param {string|number} id - The STI test ID
   * @returns {Promise} - The STI test response promise
   */
  getById: (id) => {
    return apiService.get(config.api.stiTesting.getById(id));
  },

  /**
   * Create a new STI test booking
   * @param {Object} testData - The STI test booking data
   * @returns {Promise} - The create STI test booking response promise
   */
  create: (testData) => {
    return apiService.post(config.api.stiTesting.create, testData);
  },
  /**
   * Update STI test
   * @param {string} id - The STI test ID
   * @param {Object} testData - The test data to update
   * @returns {Promise} - The update STI test response promise
   */ update: (id, testData) => {
    return apiService.put(config.api.stiTesting.update(id), testData);
  },

  /**
   * Sets an STI testing record as paid.
   * It fetches the current record to avoid overwriting existing data.
   * @param {string} id The ID of the STI testing record.
   * @returns {Promise} The update API call promise.
   */
  setAsPaid: async (id) => {
    try {
      // First, get the current test information to build a complete update payload
      const currentTestResponse = await apiService.get(
        config.api.stiTesting.getById(id)
      );

      if (!currentTestResponse?.data?.data) {
        throw new Error("Could not retrieve the STI testing record to update.");
      }

      const testData = currentTestResponse.data.data;

      // Construct the payload based on the pattern in `updateTestingStatus`
      // This assumes the backend's PUT endpoint requires a full object.
      const updatePayload = {
        status: testData.status || 0,
        notes: testData.notes || "",
        totalPrice: testData.totalPrice || 0,
        isPaid: true, // The main change
        ScheduledDate:
          testData.scheduleDate ||
          testData.ScheduledDate ||
          new Date().toISOString().split("T")[0],
        slot: testData.slot || 0,
      };

      console.log(`Updating STI Testing ${id} with payload:`, updatePayload);

      return apiService.put(config.api.stiTesting.update(id), updatePayload);
    } catch (error) {
      console.error(`Failed to set STI testing ${id} as paid:`, error);
      throw error; // Rethrow to be handled by the caller
    }
  },

  /**
   * Update STI testing status
   * @param {string} id - The STI test ID
   * @param {number|string} status - The new status code/value
   * @returns {Promise} - The update status response promise
   */ updateTestingStatus: async (id, status) => {
    // Ensure status is an integer
    const statusValue = parseInt(status, 10);

    try {
      // First, get the current test information
      const currentTestResponse = await apiService.get(
        config.api.stiTesting.getById(id)
      );

      if (
        !currentTestResponse ||
        !currentTestResponse.data ||
        !currentTestResponse.data.data
      ) {
        throw new Error("Cannot retrieve test information");
      }

      // Get current test data
      const testData = currentTestResponse.data.data;

      // Log the original test data for debugging
      console.log("Original test data:", testData); // Create a payload with the correct field names as expected by the backend
      const updatePayload = {
        status: statusValue,
        notes: testData.notes || "",
        totalPrice: testData.totalPrice || 0,
        isPaid: testData.isPaid || false,
        ScheduledDate:
          testData.scheduleDate || new Date().toISOString().split("T")[0], // Use capital 'S' and 'D' as expected by backend
        slot: testData.slot || 0,
      };

      // Do not include customer, test results, or other complex objects

      // Log the update payload for debugging
      console.log("Sending update payload:", updatePayload);

      // Send update request
      return apiService.put(config.api.stiTesting.update(id), updatePayload);
    } catch (error) {
      console.error("Error preparing update data:", error);
      throw error;
    }
  },

  /**
   * Delete STI test
   * @param {string} id - The STI test ID
   * @returns {Promise} - The delete STI test response promise
   */
  delete: (id) => {
    return apiService.delete(config.api.stiTesting.delete(id));
  },
};

export default stiTestingService;

// Named exports for individual functions
export const {
  getAll,
  getForCustomer,
  getById,
  create,
  update,
  setAsPaid,
  updateTestingStatus,
  delete: deleteTesting,
} = stiTestingService;
