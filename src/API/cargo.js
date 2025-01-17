import apiRoutes from "../API/config/apiRoutes";
import axios from "axios";
import debounce from "../helpers/debounce";

const DADATA_KEY = process.env.REACT_APP_DADATA_TOKEN;

const getCargoCount = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}${apiRoutes.CARGO_COUNT}`
    );
    return response.data.body;
  } catch (error) {
    console.log(error);
  }
};

const searchCargo = async (page, limit, payloads = {}) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}${apiRoutes.CARGO_SEARCH}`, {page, limit, ...payloads})
    return response?.data?.body
  } catch (error) {
    console.log(error)
  }
}

const paginateCargo = async (city, page, limit) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}${apiRoutes.CARGO_PAGINATE}/${city}`,
      { page, limit }
    );
    return response.data.body;
  } catch (error) {
    console.log(error);
  }
};

const getNotArchivedCargo = async (axiosPrivate, userId, page, limit) => {
  try {
    const response = await axiosPrivate.post(
      `${process.env.REACT_APP_BASE_URL}${apiRoutes.CARGO_NOT_ARCHIVE}/${userId}`,
      { page, limit, orderBy: 'desc'}
    );
    return response.data.body;
  } catch (error) {
    console.log(error);
  }
};

const getArchivedCargo = async (axiosPrivate, userId, page, limit) => {
  try {
    const response = await axiosPrivate.post(
      `${process.env.REACT_APP_BASE_URL}${apiRoutes.CARGO_ARCHIVE}/${userId}`,
      { page, limit, orderBy: 'desc' }
    );
    return response.data.body;
  } catch (error) {
    console.log(error);
  }
};

const unArchiveCargo = async (axiosPrivate, id) => {
  try {
    const response = await axiosPrivate.post(
      `${process.env.REACT_APP_BASE_URL}${apiRoutes.CARGO_UNARCHIVE}/${id}`
    );
    return response.data.body;
  } catch (error) {
    console.log(error);
  }
};

const getCargo = async (id, userId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}${apiRoutes.CARGO_ACTIONS}/${id}/${userId ?? ''}`
    );
    return response.data.body;
  } catch (error) {
    console.log(error);
  }
};

const updateCargo = async (axiosPrivate, id, payloads) => {
  try {
    const response = await axiosPrivate.patch(
      `${process.env.REACT_APP_BASE_URL}${apiRoutes.CARGO_ACTIONS}/${id}`,
      payloads
    );
    return response.data.body;
  } catch (error) {
    console.log(error);
  }
};

const deleteCargo = async (axiosPrivate, id) => {
  try {
    const response = await axiosPrivate.delete(
      `${process.env.REACT_APP_BASE_URL}${apiRoutes.CARGO_ACTIONS}/${id}`
    );
    return response.data.body;
  } catch (error) {
    console.log(error);
  }
};

const createCargo = async (axiosPrivate, payloads) => {
  try {
    const response = await axiosPrivate.post(
      `${process.env.REACT_APP_BASE_URL}${apiRoutes.CARGO_ACTIONS}`,
      payloads
    );
    return response.data.body;
  } catch (error) {
    console.log(error);
  }
};

const fetchAddressSuggestions = debounce(async (query, callback) => {
  try {
    const response = await axios.post(
      "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
      {
        query: query,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Token " + DADATA_KEY,
        },
      }
    );
    const rawSuggestions = response.data?.suggestions;
    const suggestionsWithStreets = rawSuggestions.filter((i) => i?.data?.street)
    console.log("you suck ", suggestionsWithStreets, rawSuggestions)
    const newOptions = suggestionsWithStreets.map((i) => {
      const value = formatAddress(i);
      return { label: value, value: value };
    });
    const uniqueOptions = getUniqueObjectsArray(newOptions)
    callback(uniqueOptions);
  } catch (error) {}
});

const formatAddress = (address) => {
  const street = address?.data?.street;
  const house = address?.data?.house;

  let result;
  if (!street) return address.value;
  result = street;
  if (house) result = `${street}, ${house}`;
  return result;
};

const getUniqueObjectsArray = (initialArray) => {
    const newArray = [];
    const uniqueLabels = [];
    initialArray.forEach((item) => {
      if (!uniqueLabels.includes(item.label)) {
        uniqueLabels.push(item.label);
        newArray.push(item);
      }
    });
    return newArray;
  };

  const getItemTypes = async (axiosPrivate) => {
    try {
        const response = await axiosPrivate.get(`${process.env.REACT_APP_BASE_URL}${apiRoutes.CARGO_ITEM_TYPES}`)
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

const getPackageTypes = async (axiosPrivate) => {
    try {
        const response = await axiosPrivate.get(`${process.env.REACT_APP_BASE_URL}${apiRoutes.CARGO_PACKAGE_TYPES}`)
        return response?.data?.body
    } catch (error) {
        console.log(error)
    }
}

const reportCargo = async (axiosPrivate, payloads) => {
  try {
      return axiosPrivate.post(`${apiRoutes.REPORT_CARGO}`, payloads)
  } catch (error) {
      console.log(error)
  }
}

export {
  getCargoCount,
  searchCargo,
  paginateCargo,
  getItemTypes,
  getPackageTypes,
  getNotArchivedCargo,
  getArchivedCargo,
  unArchiveCargo,
  getCargo,
  updateCargo,
  deleteCargo,
  createCargo,
  fetchAddressSuggestions,
  reportCargo
};
