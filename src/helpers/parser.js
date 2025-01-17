import * as options from "../components/utilities/data";

export const parseCargoClientToServer = (formData, currentUserId, cities) => {
  const extractValue = (array, name) => {
    const object = array.filter((item) => item.name === name);
    const result = object[0].value;
    if (name === "carType" && result) return parseInt(result);
    return result;
  };

  const formatContacts = (contacts) => {
    return contacts.map((item) => {
      return { phone: item.phone, firstName: item.name };
    });
  };

  const formatLoadings = (loadings) => {
    const formattedLoadings = [];
    loadings.forEach((item) => {
      const newItem = {};
      item.forEach((i) => {
        if (i.name === "frequency")
          return (newItem.type = i.value === "0" ? false : true);
        if (i.name === "isLoadingAllDay")
          return (newItem.isAllDay = i.value ? true : false);
        if (i.name === "loadingAddress") return (newItem.address = i.value);
        if (i.name === "loadingTown") {
          const town = cities.find((item) => item.value === i.value);
          return (newItem.town = town.label);
        }
        if (i.name === "loadingDate") {
          if (!i.value) return i?.value;
          let formattedDate = i.value.split("-");
          let array = [];
          array[0] = formattedDate[2];
          array[1] = formattedDate[1];
          array[2] = formattedDate[0];
          const result = array.join(".");
          return (newItem.date = result === ".." ? null : result);
        }
        if (i.name === "loadingDays") return (newItem.days = i.value);
        if (i.name === "loadingPeriodType")
          return (newItem.periodType = i.value);
        if (i.name === "loadingTimeFrom") return (newItem.timeFrom = i.value);
        if (i.name === "loadingTimeTo") return (newItem.timeTo = i.value);
        if (i.name === "transportationType")
          return (newItem.transportationType =
            i.value === "FTL" ? false : true);
        if (i.name === "loadingType")
          return (newItem.cargoLoadingTypeId = i.value);

        newItem[i.name] = i.value;
      });
      formattedLoadings.push(newItem);
    });

    return formattedLoadings;
  };

  const formatUnloadings = (unloadings) => {
    const formattedUnloadings = [];
    unloadings.forEach((item) => {
      const newItem = {};
      item.forEach((i) => {
        if (i.name === "isUnloadingAllDay")
          return (newItem.isAllDay = !i.value ? false : i.value);
        if (i.name === "unloadingTown") {
          const town = cities.find((item) => item.value === i.value);
          return (newItem.town = town.label);
        }
        if (i.name === "unloadingAddress") return (newItem.address = i.value);
        if (i.name === "unloadingDateFrom") {
          if (!i.value) return i?.value;
          let formattedDate = i.value.split("-");
          let array = [];
          array[0] = formattedDate[2];
          array[1] = formattedDate[1];
          array[2] = formattedDate[0];
          const result = array.join(".");
          return (newItem.dateFrom = result === ".." ? null : result);
        }
        if (i.name === "unloadingDateTo") {
          if (!i.value) return i?.value;
          let formattedDate = i.value.split("-");
          let array = [];
          array[0] = formattedDate[2];
          array[1] = formattedDate[1];
          array[2] = formattedDate[0];
          const result = array.join(".");
          return (newItem.dateTo = result === ".." ? null : result);
        }
        if (i.name === "unloadingTimeFrom") return (newItem.timeFrom = i.value);
        if (i.name === "unloadingTimeTo") return (newItem.timeTo = i.value);
        if (i.name === "unloadingType")
          return (newItem.cargoLoadingTypeId = i.value);

        newItem[i.name] = i.value;
      });
      formattedUnloadings.push(newItem);
    });

    return formattedUnloadings;
  };

  const formatCargo = (cargo) => {
    const formattedCargo = [];
    cargo.forEach((item) => {
      const newItem = {};
      item.forEach((i) => {
        if (i.name === "unloadingAddress") return (newItem.address = i.value);
        if (i.name === "notes") {
          if (!i.value) {
            return (newItem.noteType = null);
          }
          return (newItem.noteType = i.value);
        }
        if (i.name === "cargoType") return (newItem.cargoItemTypeId = i.value);
        if (i.name === "cargoPackageType")
          return (newItem.cargoItemPackageTypeId = i.value);

        newItem[i.name] = i.value;
      });
      formattedCargo.push(newItem);
    });

    return formattedCargo;
  };

  const formattedFormData = {
    loadings: formatLoadings(formData.loading),
    unloadings: formatUnloadings(formData.unloading),
    items: formatCargo(formData.cargo),
    prepayment: extractValue(formData.payment, "prepay"),
    userId: currentUserId,
    bargainType:
      extractValue(formData.payment, "bargain") === "0" ? true : false,
    calculateType:
      extractValue(formData.payment, "paymentType") === "0" ? true : false,
    fromTemperature: extractValue(formData.requirements, "tempFrom"),
    toTemperature: extractValue(formData.requirements, "tempTo"),
    vatPrice: formData.pay.vatPrice,
    noVatPrice: formData.pay.priceNovat,
    note: extractValue(formData.contactsField, "remark"),
    contacts: formatContacts(formData.contacts),
    carBodyTypeId: extractValue(formData.requirements, "carType"),
  };
  return formattedFormData;
};

export const parseCargoServerToClient = (serverData, cities) => {
  //Cargo
  const getFormattedCargo = () => {
    const items = serverData?.items;
    const newItems = [];
    items.forEach((itemObj) => {
      const newObjArray = [];
      for (let key in itemObj) {
        const newObj = {
          name: getCargoFieldName(key),
          value: getCargoValue(itemObj[key], key),
          required: getRequiredCargoField(key),
        };
        newObjArray.push(newObj);
      }
      newItems.push(newObjArray);
    });
    return newItems;
  };

  const getCargoFieldName = (key) => {
    if (key === "cargoItemTypeId") return "cargoType";
    if (key === "cargoItemPackageTypeId") return "cargoPackageType";
    if (key === "noteType") return "notes";
    return key;
  };

  const getRequiredCargoField = (key) => {
    const requiredFields = ["weight", "capacity"];
    return requiredFields.includes(key) ? true : false;
  };

  const getCargoValue = (value, key) => {
    if (key === "noteType") {
      //This could cause some problems
      if (value === null) return undefined;
      return value.toString();
    }

    if (!value) return value;

    const numbersToStrings = ["days", "cargoLoadingTypeId"];
    if (numbersToStrings.includes(key)) return value.toString();

    return value;
  };

  //Loading
  const getFormattedLoadings = () => {
    const items = serverData?.loadings;
    const newItems = [];
    items.forEach((itemObj, idx) => {
      delete itemObj["loadingType"];
      const newObjArray = [];
      for (let key in itemObj) {
        const newObj = {
          name: getLoadingFieldName(key),
          value: getLoadingValue(itemObj[key], key, serverData?.loadings, idx),
          required: getRequiredLoadingField(key),
        };
        newObjArray.push(newObj);
      }
      newItems.push(newObjArray);
    });
    return newItems;
  };

  const getLoadingFieldName = (key) => {
    if (key === "address") return "loadingAddress";
    if (key === "cargoLoadingTypeId") return "loadingType";
    if (key === "date") return "loadingDate";
    if (key === "days") return "loadingDays";
    if (key === "isAllDay") return "isLoadingAllDay";
    if (key === "periodType") return "loadingPeriodType";
    if (key === "timeFrom") return "loadingTimeFrom";
    if (key === "timeTo") return "loadingTimeTo";
    if (key === "town") return "loadingTown";
    if (key === "type") return "frequency";
    return key;
  };

  const getLoadingValue = (value, key, state, idx) => {
    if (key === "cargoLoadingTypeId") {
      return value;
    }
    if (typeof value === "number") {
      if(key === "periodType") return value;
      if (!value && value !== 0) return value;
      return value.toString();
    }
    //This could cause some problems
    if (value === null) return "";

    if (key === "type") return value === false ? "0" : "1";
    if (key === "transportationType") {
      if (value === "") return value;
      return value ? "FTL/LTL" : "FTL";
    }

    if (key === "timeTo" || key === "timeFrom") {
      const newValue = value.split(":");
      newValue.pop();
      const formatted = newValue.join(":");
      return formatted;
    }

    if (key === "date") {
      if (!value) return value;

      let formattedDate = value.split(".");
      let array = [];
      array[2] = formattedDate[0];
      array[1] = formattedDate[1];
      array[0] = formattedDate[2];
      const result = array.join("-");
      return result.substring(2);
    }

    const numbersToStrings = ["days"];
    if (numbersToStrings.includes(key)) {
      return value.toString();
    }

    if (key === "town") {
      const result = getIndexForString(
        cities,
        value,
        state[idx],
        "loadingTown"
      );
      return result.town;
    }
    return value;
  };

  const getRequiredLoadingField = (key) => {
    // const requiredFields = ["type", "periodType", "town"];
    //TODO: is periodType required though?
    const requiredFields = ["type", "town"];
    return requiredFields.includes(key) ? true : false;
  };

  //Unloading
  const getFormattedUnloadings = () => {
    const items = serverData?.unloadings;
    const newItems = [];
    items.forEach((itemObj, idx) => {
      delete itemObj["loadingType"];
      const newObjArray = [];
      for (let key in itemObj) {
        const newObj = {
          name: getUnloadingFieldName(key),
          value: getUnloadingValue(
            itemObj[key],
            key,
            serverData?.unloadings,
            idx
          ),
          required: getRequiredUnloadingField(key),
        };
        newObjArray.push(newObj);
      }
      newItems.push(newObjArray);
    });
    return newItems;
  };

  const getUnloadingFieldName = (key) => {
    if (key === "address") return "unloadingAddress";
    if (key === "cargoLoadingTypeId") return "unloadingType";
    if (key === "dateFrom") return "unloadingDateFrom";
    if (key === "dateTo") return "unloadingDateTo";
    if (key === "isAllDay") return "isUnloadingAllDay";
    if (key === "timeFrom") return "unloadingTimeFrom";
    if (key === "timeTo") return "unloadingTimeTo";
    if (key === "town") return "unloadingTown";

    return key;
  };

  const getUnloadingValue = (value, key, state, idx) => {
    if (!value) return value;

    if (key === "cargoLoadingTypeId") {
      return value;
    }

    if (key === "type") return value ? "1" : "0";
    if (key === "transportationType") {
      if (value === "") return value;
      return value ? "FTL/LTL" : "FTL";
    }

    if (key === "dateFrom") {
      if (!value) return value;

      let formattedDate = value.split(".");
      let array = [];
      array[2] = formattedDate[0];
      array[1] = formattedDate[1];
      array[0] = formattedDate[2];
      const result = array.join("-");
      return result.substring(2);
    }

    if (key === "dateTo") {
      if (!value) return value;

      let formattedDate = value.split(".");
      let array = [];
      array[2] = formattedDate[0];
      array[1] = formattedDate[1];
      array[0] = formattedDate[2];
      const result = array.join("-");
      return result.substring(2);
    }

    if (key === "timeTo" || key === "timeFrom") {
      const newValue = value.split(":");
      newValue.pop();
      const formatted = newValue.join(":");
      return formatted;
    }

    if (key === "town") {
      const result = getIndexForString(
        cities,
        value,
        state[idx],
        "unloadingTown"
      );
      return result.town;
    }

    return value;
  };

  const getRequiredUnloadingField = (key) => {
    const requiredFields = ["town", "address"];
    return requiredFields.includes(key) ? true : false;
  };

  //Payment
  const getFormattedPayment = () => {
    const paymentArray = [];
    paymentArray.push({
      name: "bargain",
      value: serverData.bargainType === true ? "0" : "1",
      required: false,
    });
    paymentArray.push({
      name: "paymentType",
      value: serverData.calculateType === true ? "0" : "1",
      required: false,
    });
    paymentArray.push({
      name: "cash",
      value: "",
      required: false,
    });
    paymentArray.push({
      name: "priceVat",
      value: serverData.vatPrice,
      required: false,
    });
    paymentArray.push({
      name: "priceNovat",
      value: serverData.noVatPrice,
      required: false,
    });
    paymentArray.push({
      name: "prepay",
      value: serverData.prepayment,
      required: true,
    });

    return paymentArray;
  };

  //Contacts
  const getFormattedContacts = () => {
    const contacts = serverData?.contacts;
    const newContacts = [];
    contacts.forEach((item, idx) => {
      const newItem = {
        index: idx,
        phone: item.phone,
        name: item.firstName,
        required: idx === 0 ? true : false,
      };
      newContacts.push(newItem);
    });
    return newContacts;
  };

  //ContactsField
  const getFormattedContactsField = () => {
    const newContactsField = [];
    newContactsField.push({
      name: "contactsData",
      value: getFormattedContacts(),
    });
    newContactsField.push({
      name: "remark",
      value: serverData?.note,
      required: false,
    });

    return newContactsField;
  };

  //Requirements
  const getFormattedRequirements = () => {
    const newRequirements = [];
    newRequirements.push({
      name: "carType",
      value: serverData?.carBodyTypeId,
      required: true,
    });
    newRequirements.push({
      name: "tempFrom",
      value: serverData?.fromTemperature,
      required: false,
    });
    newRequirements.push({
      name: "tempTo",
      value: serverData?.toTemperature,
      required: false,
    });

    return newRequirements;
  };

  //Converting a string to index
  const getIndexForString = (options, strValue, state) => {
    state.town = options.find((item) => item.label === strValue)?.value;
    return state;
  };

  const newData = {
    cargo: getFormattedCargo(),
    loading: getFormattedLoadings(),
    unloading: getFormattedUnloadings(),
    payment: getFormattedPayment(),
    contacts: getFormattedContacts(),
    contactsField: getFormattedContactsField(),
    requirements: getFormattedRequirements(),
  };
  return newData;
};
