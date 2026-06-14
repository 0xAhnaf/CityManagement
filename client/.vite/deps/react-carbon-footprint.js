import {
  require_react
} from "./chunk-VX2H6PUQ.js";
import {
  __toESM
} from "./chunk-G3PMV62Z.js";

// node_modules/react-carbon-footprint/index.esm.js
var import_react = __toESM(require_react());

// node_modules/@tgwf/co2/dist/esm/1byte.js
var CO2_PER_KWH_IN_DC_GREY = 519;
var CO2_PER_KWH_NETWORK_GREY = 475;
var CO2_PER_KWH_IN_DC_GREEN = 0;
var KWH_PER_BYTE_IN_DC = 72e-12;
var FIXED_NETWORK_WIRED = 429e-12;
var FIXED_NETWORK_WIFI = 152e-12;
var FOUR_G_MOBILE = 884e-12;
var KWH_PER_BYTE_FOR_NETWORK = (FIXED_NETWORK_WIRED + FIXED_NETWORK_WIFI + FOUR_G_MOBILE) / 3;
var OneByte = class {
  constructor(options) {
    this.allowRatings = false;
    this.options = options;
    this.KWH_PER_BYTE_FOR_NETWORK = KWH_PER_BYTE_FOR_NETWORK;
  }
  /**
   * Calculates the carbon footprint of a website using the OneByte model
   * @param {number} bytes - The number of bytes to calculate the carbon footprint for
   * @param {boolean} green - Whether the energy is green or not
   * @returns {number} The carbon footprint in grams of CO2
   */
  perByte(bytes, green) {
    if (bytes < 1) {
      return 0;
    }
    if (green) {
      const Co2ForDC = bytes * KWH_PER_BYTE_IN_DC * CO2_PER_KWH_IN_DC_GREEN;
      const Co2forNetwork = bytes * KWH_PER_BYTE_FOR_NETWORK * CO2_PER_KWH_NETWORK_GREY;
      return Co2ForDC + Co2forNetwork;
    }
    const KwHPerByte = KWH_PER_BYTE_IN_DC + KWH_PER_BYTE_FOR_NETWORK;
    return bytes * KwHPerByte * CO2_PER_KWH_IN_DC_GREY;
  }
};
var byte_default = OneByte;

// node_modules/@tgwf/co2/dist/esm/constants/file-size.js
var GIGABYTE = 1e3 * 1e3 * 1e3;
var file_size_default = {
  GIGABYTE
};

// node_modules/@tgwf/co2/dist/esm/data/average-intensities.min.js
var data = { "AFG": 123.71, "AFRICA": 545.09, "ALB": 24.42, "DZA": 633.65, "ASM": 647.06, "AGO": 167.22, "ATG": 611.11, "ARG": 344.83, "ARM": 243.52, "ABW": 550, "ASEAN": 573.65, "ASIA": 572.12, "AUS": 553.76, "AUT": 102.62, "AZE": 632.89, "BHS": 653.66, "BHR": 902.41, "BGD": 694.63, "BRB": 600, "BLR": 323.63, "BEL": 117.58, "BLZ": 155.56, "BEN": 590, "BTN": 24.19, "BOL": 468.02, "BIH": 638.05, "BWA": 849.42, "BRA": 106.06, "BRN": 892.67, "BGR": 264.21, "BFA": 554.91, "BDI": 230.77, "CPV": 480, "KHM": 497.46, "CMR": 285.71, "CAN": 184.99, "CYM": 642.86, "CAF": 0, "TCD": 615.39, "CHL": 265.52, "CHN": 557.5, "COL": 285.8, "COM": 642.86, "COG": 713.73, "COD": 27.04, "COK": 250, "CRI": 63.01, "CIV": 393.53, "HRV": 174.48, "CUB": 638.98, "CYP": 512.24, "CZE": 413.86, "DNK": 143.3, "DJI": 450, "DMA": 600, "DOM": 565.97, "ECU": 209.7, "EGY": 574.5, "SLV": 99.29, "GNQ": 605.1, "ERI": 590.91, "EST": 341.02, "SWZ": 142.86, "ETH": 23.55, "EU": 213.02, "EUROPE": 285, "FLK": 1e3, "FRO": 354.17, "FJI": 278.26, "FIN": 72.25, "FRA": 44.18, "GUF": 204.08, "PYF": 436.62, "G20": 468.38, "G7": 343.3, "GAB": 429.47, "GMB": 666.67, "GEO": 143.06, "DEU": 342.06, "GHA": 452.86, "GRC": 319.76, "GRL": 111.11, "GRD": 666.67, "GLP": 493.9, "GUM": 611.11, "GTM": 272.66, "GIN": 182.72, "GNB": 625, "GUY": 634.33, "HTI": 534.65, "HND": 289.5, "HKG": 681.99, "HUN": 182.82, "ISL": 28.33, "IND": 708.96, "IDN": 682.43, "IRN": 648.68, "IRQ": 689.4, "IRL": 279.79, "ISR": 567.26, "ITA": 287.75, "JAM": 561.25, "JPN": 483.73, "JOR": 539.21, "KAZ": 801.79, "KEN": 84.83, "KIR": 500, "XKX": 958.72, "KWT": 637.24, "KGZ": 152.65, "LAO": 232.12, "LATIN AMERICA AND CARIBBEAN": 254.21, "LVA": 136.22, "LBN": 369.47, "LSO": 20.83, "LBR": 435.9, "LBY": 830.53, "LTU": 139.34, "LUX": 134.62, "MAC": 448.98, "MDG": 477.27, "MWI": 54.65, "MYS": 604.43, "MDV": 611.77, "MLI": 394.5, "MLT": 484.16, "MTQ": 516.78, "MRT": 481.71, "MUS": 633.03, "MEX": 483.14, "MIDDLE EAST": 637.24, "MDA": 629.56, "MNG": 784.01, "MNE": 413.51, "MSR": 1e3, "MAR": 577.65, "MOZ": 127.81, "MMR": 569.69, "NAM": 47.62, "NRU": 750, "NPL": 23.36, "NLD": 252.7, "NCL": 585.76, "NZL": 120.11, "NIC": 288.33, "NER": 687.5, "NGA": 507.85, "NORTH AMERICA": 358.36, "PRK": 344.26, "MKD": 568.97, "NOR": 30.75, "OCEANIA": 495.47, "OECD": 337.99, "OMN": 545.33, "PAK": 398.61, "PSE": 460.78, "PAN": 258.74, "PNG": 513.74, "PRY": 24.86, "PER": 263.27, "POL": 614.98, "PRT": 111.8, "PRI": 664.53, "QAT": 602.83, "REU": 525.22, "ROU": 245.55, "RUS": 446.17, "RWA": 301.89, "KNA": 636.36, "LCA": 650, "SPM": 600, "VCT": 600, "WSM": 400, "STP": 555.56, "SAU": 691.95, "SEN": 535.4, "SRB": 670.8, "SYC": 571.43, "SLE": 47.62, "SGP": 498.74, "SVK": 96.49, "SVN": 227.11, "SLB": 636.36, "SOM": 523.81, "ZAF": 713.9, "KOR": 415.65, "SSD": 610.17, "ESP": 146.15, "LKA": 509.78, "SDN": 214.33, "SUR": 383.18, "SWE": 35.89, "CHE": 36.72, "SYR": 682.27, "TWN": 635.15, "TJK": 98.7, "TZA": 371.59, "THA": 555.43, "PHL": 613.38, "TGO": 478.26, "TON": 571.43, "TTO": 682.11, "TUN": 560.25, "TUR": 469.7, "TKM": 1306.3, "TCA": 653.85, "UGA": 57.39, "UKR": 250.47, "ARE": 467.51, "GBR": 215.79, "USA": 383.55, "URY": 96.7, "UZB": 1121.18, "VUT": 500, "VEN": 180.25, "VNM": 486.13, "VGB": 647.06, "VIR": 641.79, "WORLD": 472.94, "YEM": 586.32, "ZMB": 111, "ZWE": 298.44 };
var type = "average";
var average_intensities_min_default = { data, type };

// node_modules/@tgwf/co2/dist/esm/constants/index.js
var KWH_PER_GB = 0.81;
var END_USER_DEVICE_ENERGY = 0.52;
var NETWORK_ENERGY = 0.14;
var DATACENTER_ENERGY = 0.15;
var PRODUCTION_ENERGY = 0.19;
var GLOBAL_GRID_INTENSITY = average_intensities_min_default.data["WORLD"];
var RENEWABLES_GRID_INTENSITY = 50;
var FIRST_TIME_VIEWING_PERCENTAGE = 0.75;
var RETURNING_VISITOR_PERCENTAGE = 0.25;
var PERCENTAGE_OF_DATA_LOADED_ON_SUBSEQUENT_LOAD = 0.02;
var SWDV4 = {
  OPERATIONAL_KWH_PER_GB_DATACENTER: 0.055,
  OPERATIONAL_KWH_PER_GB_NETWORK: 0.059,
  OPERATIONAL_KWH_PER_GB_DEVICE: 0.08,
  EMBODIED_KWH_PER_GB_DATACENTER: 0.012,
  EMBODIED_KWH_PER_GB_NETWORK: 0.013,
  EMBODIED_KWH_PER_GB_DEVICE: 0.081,
  GLOBAL_GRID_INTENSITY: 494
};
var SWDMV3_RATINGS = {
  FIFTH_PERCENTILE: 0.095,
  TENTH_PERCENTILE: 0.186,
  TWENTIETH_PERCENTILE: 0.341,
  THIRTIETH_PERCENTILE: 0.493,
  FORTIETH_PERCENTILE: 0.656,
  FIFTIETH_PERCENTILE: 0.846
};
var SWDMV4_RATINGS = {
  FIFTH_PERCENTILE: 0.04,
  TENTH_PERCENTILE: 0.079,
  TWENTIETH_PERCENTILE: 0.145,
  THIRTIETH_PERCENTILE: 0.209,
  FORTIETH_PERCENTILE: 0.278,
  FIFTIETH_PERCENTILE: 0.359
};

// node_modules/@tgwf/co2/dist/esm/helpers/index.js
var SWDM4_GLOBAL_GRID_INTENSITY = SWDV4.GLOBAL_GRID_INTENSITY;
var formatNumber = (num) => parseFloat(num.toFixed(2));
var lessThanEqualTo = (num, limit) => num <= limit;
function parseByteTraceOptions(options = {}, version = 3, green = false) {
  const globalGridIntensity = version === 4 ? SWDM4_GLOBAL_GRID_INTENSITY : GLOBAL_GRID_INTENSITY;
  if (typeof options !== "object") {
    throw new Error("Options must be an object");
  }
  const adjustments = {};
  function setIntensity(segment, segmentIntensity) {
    var _a, _b;
    if (segmentIntensity || segmentIntensity === 0) {
      if (typeof segmentIntensity === "object") {
        if (!average_intensities_min_default.data[(_a = segmentIntensity.country) == null ? void 0 : _a.toUpperCase()]) {
          console.warn(
            '"'.concat(segmentIntensity.country, '" is not a valid country. Please use a valid 3 digit ISO 3166 country code. \nSee https://developers.thegreenwebfoundation.org/co2js/data/ for more information. \nFalling back to global average grid intensity.')
          );
          adjustments.gridIntensity[segment] = {
            value: globalGridIntensity
          };
        }
        adjustments.gridIntensity[segment] = {
          country: segmentIntensity.country,
          value: parseFloat(
            average_intensities_min_default.data[(_b = segmentIntensity.country) == null ? void 0 : _b.toUpperCase()]
          )
        };
      } else if (typeof segmentIntensity === "number") {
        adjustments.gridIntensity[segment] = {
          value: segmentIntensity
        };
      } else {
        adjustments.gridIntensity[segment] = {
          value: globalGridIntensity
        };
        console.warn(
          "The ".concat(segment, " grid intensity must be a number or an object. You passed in a ").concat(typeof segmentIntensity, ". \nFalling back to global average grid intensity.")
        );
      }
    } else {
      adjustments.gridIntensity[segment] = {
        value: globalGridIntensity
      };
    }
  }
  if (options == null ? void 0 : options.gridIntensity) {
    adjustments.gridIntensity = {};
    const { device, dataCenter, network } = options.gridIntensity;
    setIntensity("device", device);
    setIntensity("dataCenter", dataCenter);
    setIntensity("network", network);
  } else {
    adjustments.gridIntensity = {
      device: { value: globalGridIntensity },
      dataCenter: { value: globalGridIntensity },
      network: { value: globalGridIntensity }
    };
  }
  if ((options == null ? void 0 : options.greenHostingFactor) || options.greenHostingFactor === 0 && version === 4) {
    if (typeof options.greenHostingFactor === "number") {
      if (options.greenHostingFactor >= 0 && options.greenHostingFactor <= 1) {
        adjustments.greenHostingFactor = options.greenHostingFactor;
      } else {
        adjustments.greenHostingFactor = 0;
        console.warn(
          "The returnVisitPercentage option must be a number between 0 and 1. You passed in ".concat(options.returnVisitPercentage, ". \nFalling back to default value.")
        );
      }
    } else {
      adjustments.greenHostingFactor = 0;
      console.warn(
        "The returnVisitPercentage option must be a number. You passed in a ".concat(typeof options.returnVisitPercentage, ". \nFalling back to default value.")
      );
    }
  } else if (version === 4) {
    adjustments.greenHostingFactor = 0;
  }
  if (green) {
    adjustments.greenHostingFactor = 1;
  }
  return adjustments;
}
function parseVisitTraceOptions(options = {}, version = 3, green = false) {
  if (typeof options !== "object") {
    throw new Error("Options must be an object");
  }
  const adjustments = parseByteTraceOptions(options, version, green);
  if ((options == null ? void 0 : options.dataReloadRatio) || options.dataReloadRatio === 0) {
    if (typeof options.dataReloadRatio === "number") {
      if (options.dataReloadRatio >= 0 && options.dataReloadRatio <= 1) {
        adjustments.dataReloadRatio = options.dataReloadRatio;
      } else {
        adjustments.dataReloadRatio = version === 3 ? PERCENTAGE_OF_DATA_LOADED_ON_SUBSEQUENT_LOAD : 0;
        console.warn(
          "The dataReloadRatio option must be a number between 0 and 1. You passed in ".concat(options.dataReloadRatio, ". \nFalling back to default value.")
        );
      }
    } else {
      adjustments.dataReloadRatio = version === 3 ? PERCENTAGE_OF_DATA_LOADED_ON_SUBSEQUENT_LOAD : 0;
      console.warn(
        "The dataReloadRatio option must be a number. You passed in a ".concat(typeof options.dataReloadRatio, ". \nFalling back to default value.")
      );
    }
  } else {
    adjustments.dataReloadRatio = version === 3 ? PERCENTAGE_OF_DATA_LOADED_ON_SUBSEQUENT_LOAD : 0;
    console.warn(
      "The dataReloadRatio option must be a number. You passed in a ".concat(typeof options.dataReloadRatio, ". \nFalling back to default value.")
    );
  }
  if ((options == null ? void 0 : options.firstVisitPercentage) || options.firstVisitPercentage === 0) {
    if (typeof options.firstVisitPercentage === "number") {
      if (options.firstVisitPercentage >= 0 && options.firstVisitPercentage <= 1) {
        adjustments.firstVisitPercentage = options.firstVisitPercentage;
      } else {
        adjustments.firstVisitPercentage = version === 3 ? FIRST_TIME_VIEWING_PERCENTAGE : 1;
        console.warn(
          "The firstVisitPercentage option must be a number between 0 and 1. You passed in ".concat(options.firstVisitPercentage, ". \nFalling back to default value.")
        );
      }
    } else {
      adjustments.firstVisitPercentage = version === 3 ? FIRST_TIME_VIEWING_PERCENTAGE : 1;
      console.warn(
        "The firstVisitPercentage option must be a number. You passed in a ".concat(typeof options.firstVisitPercentage, ". \nFalling back to default value.")
      );
    }
  } else {
    adjustments.firstVisitPercentage = version === 3 ? FIRST_TIME_VIEWING_PERCENTAGE : 1;
    console.warn(
      "The firstVisitPercentage option must be a number. You passed in a ".concat(typeof options.firstVisitPercentage, ". \nFalling back to default value.")
    );
  }
  if ((options == null ? void 0 : options.returnVisitPercentage) || options.returnVisitPercentage === 0) {
    if (typeof options.returnVisitPercentage === "number") {
      if (options.returnVisitPercentage >= 0 && options.returnVisitPercentage <= 1) {
        adjustments.returnVisitPercentage = options.returnVisitPercentage;
      } else {
        adjustments.returnVisitPercentage = version === 3 ? RETURNING_VISITOR_PERCENTAGE : 0;
        console.warn(
          "The returnVisitPercentage option must be a number between 0 and 1. You passed in ".concat(options.returnVisitPercentage, ". \nFalling back to default value.")
        );
      }
    } else {
      adjustments.returnVisitPercentage = version === 3 ? RETURNING_VISITOR_PERCENTAGE : 0;
      console.warn(
        "The returnVisitPercentage option must be a number. You passed in a ".concat(typeof options.returnVisitPercentage, ". \nFalling back to default value.")
      );
    }
  } else {
    adjustments.returnVisitPercentage = version === 3 ? RETURNING_VISITOR_PERCENTAGE : 0;
    console.warn(
      "The returnVisitPercentage option must be a number. You passed in a ".concat(typeof options.returnVisitPercentage, ". \nFalling back to default value.")
    );
  }
  return adjustments;
}
function outputRating(co2e, swdmVersion) {
  let {
    FIFTH_PERCENTILE,
    TENTH_PERCENTILE,
    TWENTIETH_PERCENTILE,
    THIRTIETH_PERCENTILE,
    FORTIETH_PERCENTILE,
    FIFTIETH_PERCENTILE
  } = SWDMV3_RATINGS;
  if (swdmVersion === 4) {
    FIFTH_PERCENTILE = SWDMV4_RATINGS.FIFTH_PERCENTILE;
    TENTH_PERCENTILE = SWDMV4_RATINGS.TENTH_PERCENTILE;
    TWENTIETH_PERCENTILE = SWDMV4_RATINGS.TWENTIETH_PERCENTILE;
    THIRTIETH_PERCENTILE = SWDMV4_RATINGS.THIRTIETH_PERCENTILE;
    FORTIETH_PERCENTILE = SWDMV4_RATINGS.FORTIETH_PERCENTILE;
    FIFTIETH_PERCENTILE = SWDMV4_RATINGS.FIFTIETH_PERCENTILE;
  }
  if (lessThanEqualTo(co2e, FIFTH_PERCENTILE)) {
    return "A+";
  } else if (lessThanEqualTo(co2e, TENTH_PERCENTILE)) {
    return "A";
  } else if (lessThanEqualTo(co2e, TWENTIETH_PERCENTILE)) {
    return "B";
  } else if (lessThanEqualTo(co2e, THIRTIETH_PERCENTILE)) {
    return "C";
  } else if (lessThanEqualTo(co2e, FORTIETH_PERCENTILE)) {
    return "D";
  } else if (lessThanEqualTo(co2e, FIFTIETH_PERCENTILE)) {
    return "E";
  } else {
    return "F";
  }
}

// node_modules/@tgwf/co2/dist/esm/sustainable-web-design-v3.js
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var SustainableWebDesign = class {
  constructor(options) {
    this.allowRatings = true;
    this.options = options;
    this.version = 3;
  }
  /**
   * Accept a figure for bytes transferred and return an object representing
   * the share of the total enrgy use of the entire system, broken down
   * by each corresponding system component
   *
   * @param {number}  bytes - the data transferred in bytes
   * @return {object} Object containing the energy in kilowatt hours, keyed by system component
   */
  energyPerByteByComponent(bytes) {
    const transferedBytesToGb = bytes / file_size_default.GIGABYTE;
    const energyUsage = transferedBytesToGb * KWH_PER_GB;
    return {
      consumerDeviceEnergy: energyUsage * END_USER_DEVICE_ENERGY,
      networkEnergy: energyUsage * NETWORK_ENERGY,
      productionEnergy: energyUsage * PRODUCTION_ENERGY,
      dataCenterEnergy: energyUsage * DATACENTER_ENERGY
    };
  }
  /**
   * Accept an object keys by the different system components, and
   * return an object with the co2 figures key by the each component
   *
   * @param {object} energyByComponent - energy grouped by the four system components
   * @param {number} [carbonIntensity] - carbon intensity to apply to the datacentre values
   * @return {number} the total number in grams of CO2 equivalent emissions
   */
  co2byComponent(energyByComponent, carbonIntensity = GLOBAL_GRID_INTENSITY, options = {}) {
    let deviceCarbonIntensity = GLOBAL_GRID_INTENSITY;
    let networkCarbonIntensity = GLOBAL_GRID_INTENSITY;
    let dataCenterCarbonIntensity = GLOBAL_GRID_INTENSITY;
    let globalEmissions = GLOBAL_GRID_INTENSITY;
    if (options == null ? void 0 : options.gridIntensity) {
      const { device, network, dataCenter } = options.gridIntensity;
      if ((device == null ? void 0 : device.value) || (device == null ? void 0 : device.value) === 0) {
        deviceCarbonIntensity = device.value;
      }
      if ((network == null ? void 0 : network.value) || (network == null ? void 0 : network.value) === 0) {
        networkCarbonIntensity = network.value;
      }
      if ((dataCenter == null ? void 0 : dataCenter.value) || (dataCenter == null ? void 0 : dataCenter.value) === 0) {
        dataCenterCarbonIntensity = dataCenter.value;
      }
    }
    if (carbonIntensity === true) {
      dataCenterCarbonIntensity = RENEWABLES_GRID_INTENSITY;
    }
    const returnCO2ByComponent = {};
    for (const [key, value] of Object.entries(energyByComponent)) {
      if (key.startsWith("dataCenterEnergy")) {
        returnCO2ByComponent[key.replace("Energy", "CO2")] = value * dataCenterCarbonIntensity;
      } else if (key.startsWith("consumerDeviceEnergy")) {
        returnCO2ByComponent[key.replace("Energy", "CO2")] = value * deviceCarbonIntensity;
      } else if (key.startsWith("networkEnergy")) {
        returnCO2ByComponent[key.replace("Energy", "CO2")] = value * networkCarbonIntensity;
      } else {
        returnCO2ByComponent[key.replace("Energy", "CO2")] = value * globalEmissions;
      }
    }
    return returnCO2ByComponent;
  }
  /**
   * Accept a figure for bytes transferred and return a single figure for CO2
   * emissions. Where information exists about the origin data is being
   * fetched from, a different carbon intensity figure
   * is applied for the data centre share of the carbon intensity.
   *
   * @param {number} bytes - the data transferred in bytes
   * @param {boolean} carbonIntensity - a boolean indicating whether the data center is green or not
   * @param {boolean} segmentResults - a boolean indicating whether to return the results broken down by component
   * @param {boolean} ratingResults - a boolean indicating whether to return the rating based on the Sustainable Web Design Model
   * @param {object} options - an object containing the grid intensity and first/return visitor values
   * @return {number|object} the total number in grams of CO2 equivalent emissions, or an object containing the breakdown by component
   */
  perByte(bytes, carbonIntensity = false, segmentResults = false, ratingResults = false, options = {}) {
    if (bytes < 1) {
      bytes = 0;
    }
    const energyBycomponent = this.energyPerByteByComponent(bytes, options);
    if (typeof carbonIntensity !== "boolean") {
      throw new Error(
        "perByte expects a boolean for the carbon intensity value. Received: ".concat(carbonIntensity)
      );
    }
    const co2ValuesbyComponent = this.co2byComponent(
      energyBycomponent,
      carbonIntensity,
      options
    );
    const co2Values = Object.values(co2ValuesbyComponent);
    const co2ValuesSum = co2Values.reduce(
      (prevValue, currentValue) => prevValue + currentValue
    );
    let rating = null;
    if (ratingResults) {
      rating = this.ratingScale(co2ValuesSum);
    }
    if (segmentResults) {
      if (ratingResults) {
        return __spreadProps(__spreadValues({}, co2ValuesbyComponent), {
          total: co2ValuesSum,
          rating
        });
      }
      return __spreadProps(__spreadValues({}, co2ValuesbyComponent), { total: co2ValuesSum });
    }
    if (ratingResults) {
      return { total: co2ValuesSum, rating };
    }
    return co2ValuesSum;
  }
  /**
   * Accept a figure for bytes transferred and return a single figure for CO2
   * emissions. This method applies caching assumptions from the original Sustainable Web Design model.
   *
   * @param {number} bytes - the data transferred in bytes
   * @param {boolean} carbonIntensity - a boolean indicating whether the data center is green or not
   * @param {boolean} segmentResults - a boolean indicating whether to return the results broken down by component
   * @param {boolean} ratingResults - a boolean indicating whether to return the rating based on the Sustainable Web Design Model
   * @param {object} options - an object containing the grid intensity and first/return visitor values
   * @return {number|object} the total number in grams of CO2 equivalent emissions, or an object containing the breakdown by component
   */
  perVisit(bytes, carbonIntensity = false, segmentResults = false, ratingResults = false, options = {}) {
    const energyBycomponent = this.energyPerVisitByComponent(bytes, options);
    if (typeof carbonIntensity !== "boolean") {
      throw new Error(
        "perVisit expects a boolean for the carbon intensity value. Received: ".concat(carbonIntensity)
      );
    }
    const co2ValuesbyComponent = this.co2byComponent(
      energyBycomponent,
      carbonIntensity,
      options
    );
    const co2Values = Object.values(co2ValuesbyComponent);
    const co2ValuesSum = co2Values.reduce(
      (prevValue, currentValue) => prevValue + currentValue
    );
    let rating = null;
    if (ratingResults) {
      rating = this.ratingScale(co2ValuesSum);
    }
    if (segmentResults) {
      if (ratingResults) {
        return __spreadProps(__spreadValues({}, co2ValuesbyComponent), {
          total: co2ValuesSum,
          rating
        });
      }
      return __spreadProps(__spreadValues({}, co2ValuesbyComponent), { total: co2ValuesSum });
    }
    if (ratingResults) {
      return { total: co2ValuesSum, rating };
    }
    return co2ValuesSum;
  }
  /**
   * Accept a figure for bytes transferred and return the number of kilowatt hours used
   * by the total system for this data transfer
   *
   * @param {number} bytes
   * @return {number} the number of kilowatt hours used
   */
  energyPerByte(bytes) {
    const energyByComponent = this.energyPerByteByComponent(bytes);
    const energyValues = Object.values(energyByComponent);
    return energyValues.reduce(
      (prevValue, currentValue) => prevValue + currentValue
    );
  }
  /**
   * Accept a figure for bytes transferred, and return an object containing figures
   * per system component, with the caching assumptions applied. This tries to account
   * for webpages being loaded from a cache by browsers, so if you had a thousand page views,
   * and tried to work out the energy per visit, the numbers would reflect the reduced amounts
   * of transfer.
   *
   * @param {number} bytes - the data transferred in bytes for loading a webpage
   * @param {number} firstView - what percentage of visits are loading this page for the first time
   * @param {number} returnView - what percentage of visits are loading this page for subsequent times
   * @param {number} dataReloadRatio - what percentage of a page is reloaded on each subsequent page view
   *
   * @return {object} Object containing the energy in kilowatt hours, keyed by system component
   */
  energyPerVisitByComponent(bytes, options = {}, firstView = FIRST_TIME_VIEWING_PERCENTAGE, returnView = RETURNING_VISITOR_PERCENTAGE, dataReloadRatio = PERCENTAGE_OF_DATA_LOADED_ON_SUBSEQUENT_LOAD) {
    if (options.dataReloadRatio || options.dataReloadRatio === 0) {
      dataReloadRatio = options.dataReloadRatio;
    }
    if (options.firstVisitPercentage || options.firstVisitPercentage === 0) {
      firstView = options.firstVisitPercentage;
    }
    if (options.returnVisitPercentage || options.returnVisitPercentage === 0) {
      returnView = options.returnVisitPercentage;
    }
    const energyBycomponent = this.energyPerByteByComponent(bytes);
    const cacheAdjustedSegmentEnergy = {};
    const energyValues = Object.values(energyBycomponent);
    for (const [key, value] of Object.entries(energyBycomponent)) {
      cacheAdjustedSegmentEnergy["".concat(key, " - first")] = value * firstView;
      cacheAdjustedSegmentEnergy["".concat(key, " - subsequent")] = value * returnView * dataReloadRatio;
    }
    return cacheAdjustedSegmentEnergy;
  }
  /**
   * Accept a figure for bytes, and return the total figure for energy per visit
   * using the default caching assumptions for loading a single website
   *
   * @param {number} bytes
   * @return {number} the total energy use for the visit, after applying the caching assumptions
   */
  energyPerVisit(bytes) {
    let firstVisits = 0;
    let subsequentVisits = 0;
    const energyBycomponent = Object.entries(
      this.energyPerVisitByComponent(bytes)
    );
    for (const [key, val] of energyBycomponent) {
      if (key.indexOf("first") > 0) {
        firstVisits += val;
      }
    }
    for (const [key, val] of energyBycomponent) {
      if (key.indexOf("subsequent") > 0) {
        subsequentVisits += val;
      }
    }
    return firstVisits + subsequentVisits;
  }
  emissionsPerVisitInGrams(energyPerVisit, carbonintensity = GLOBAL_GRID_INTENSITY) {
    return formatNumber(energyPerVisit * carbonintensity);
  }
  annualEnergyInKwh(energyPerVisit, monthlyVisitors = 1e3) {
    return energyPerVisit * monthlyVisitors * 12;
  }
  annualEmissionsInGrams(co2grams, monthlyVisitors = 1e3) {
    return co2grams * monthlyVisitors * 12;
  }
  annualSegmentEnergy(annualEnergy) {
    return {
      consumerDeviceEnergy: formatNumber(annualEnergy * END_USER_DEVICE_ENERGY),
      networkEnergy: formatNumber(annualEnergy * NETWORK_ENERGY),
      dataCenterEnergy: formatNumber(annualEnergy * DATACENTER_ENERGY),
      productionEnergy: formatNumber(annualEnergy * PRODUCTION_ENERGY)
    };
  }
  /**
   * Determines the rating of a website's sustainability based on its CO2 emissions.
   *
   * @param {number} co2e - The CO2 emissions of the website in grams.
   * @returns {string} The sustainability rating, ranging from "A+" (best) to "F" (worst).
   */
  ratingScale(co2e) {
    return outputRating(co2e, this.version);
  }
};
var sustainable_web_design_v3_default = SustainableWebDesign;

// node_modules/@tgwf/co2/dist/esm/sustainable-web-design-v4.js
var __defProp2 = Object.defineProperty;
var __defProps2 = Object.defineProperties;
var __getOwnPropDescs2 = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp2.call(b, prop))
      __defNormalProp2(a, prop, b[prop]);
  if (__getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(b)) {
      if (__propIsEnum2.call(b, prop))
        __defNormalProp2(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps2 = (a, b) => __defProps2(a, __getOwnPropDescs2(b));
var {
  OPERATIONAL_KWH_PER_GB_DATACENTER,
  OPERATIONAL_KWH_PER_GB_NETWORK,
  OPERATIONAL_KWH_PER_GB_DEVICE,
  EMBODIED_KWH_PER_GB_DATACENTER,
  EMBODIED_KWH_PER_GB_NETWORK,
  EMBODIED_KWH_PER_GB_DEVICE,
  GLOBAL_GRID_INTENSITY: GLOBAL_GRID_INTENSITY2
} = SWDV4;
function outputSegments(operationalEmissions, embodiedEmissions) {
  const totalOperationalCO2e = operationalEmissions.dataCenter + operationalEmissions.network + operationalEmissions.device;
  const totalEmbodiedCO2e = embodiedEmissions.dataCenter + embodiedEmissions.network + embodiedEmissions.device;
  const dataCenterCO2e = operationalEmissions.dataCenter + embodiedEmissions.dataCenter;
  const networkCO2e = operationalEmissions.network + embodiedEmissions.network;
  const consumerDeviceCO2e = operationalEmissions.device + embodiedEmissions.device;
  return {
    dataCenterOperationalCO2e: operationalEmissions.dataCenter,
    networkOperationalCO2e: operationalEmissions.network,
    consumerDeviceOperationalCO2e: operationalEmissions.device,
    dataCenterEmbodiedCO2e: embodiedEmissions.dataCenter,
    networkEmbodiedCO2e: embodiedEmissions.network,
    consumerDeviceEmbodiedCO2e: embodiedEmissions.device,
    totalEmbodiedCO2e,
    totalOperationalCO2e,
    dataCenterCO2e,
    networkCO2e,
    consumerDeviceCO2e
  };
}
function getGreenHostingFactor(green, options) {
  if (green) {
    return 1;
  } else if ((options == null ? void 0 : options.greenHostingFactor) || (options == null ? void 0 : options.greenHostingFactor) === 0) {
    return options.greenHostingFactor;
  }
  return 0;
}
var SustainableWebDesign2 = class {
  constructor(options) {
    this.allowRatings = true;
    this.options = options;
    this.version = 4;
  }
  /**
   * Calculate the operational energy of data transfer for each system segment
   *
   * @param {number} bytes
   * @returns {object}
   */
  operationalEnergyPerSegment(bytes) {
    const transferedBytesToGb = bytes / file_size_default.GIGABYTE;
    const dataCenter = transferedBytesToGb * OPERATIONAL_KWH_PER_GB_DATACENTER;
    const network = transferedBytesToGb * OPERATIONAL_KWH_PER_GB_NETWORK;
    const device = transferedBytesToGb * OPERATIONAL_KWH_PER_GB_DEVICE;
    return {
      dataCenter,
      network,
      device
    };
  }
  /**
   * Calculate the operational emissions of data transfer for each system segment
   *
   * @param {number} bytes
   * @param {object} options
   * @returns {object}
   */
  operationalEmissions(bytes, options = {}) {
    const { dataCenter, network, device } = this.operationalEnergyPerSegment(bytes);
    let dataCenterGridIntensity = GLOBAL_GRID_INTENSITY2;
    let networkGridIntensity = GLOBAL_GRID_INTENSITY2;
    let deviceGridIntensity = GLOBAL_GRID_INTENSITY2;
    if (options == null ? void 0 : options.gridIntensity) {
      const { device: device2, network: network2, dataCenter: dataCenter2 } = options.gridIntensity;
      if ((device2 == null ? void 0 : device2.value) || (device2 == null ? void 0 : device2.value) === 0) {
        deviceGridIntensity = device2.value;
      }
      if ((network2 == null ? void 0 : network2.value) || (network2 == null ? void 0 : network2.value) === 0) {
        networkGridIntensity = network2.value;
      }
      if ((dataCenter2 == null ? void 0 : dataCenter2.value) || (dataCenter2 == null ? void 0 : dataCenter2.value) === 0) {
        dataCenterGridIntensity = dataCenter2.value;
      }
    }
    const dataCenterEmissions = dataCenter * dataCenterGridIntensity;
    const networkEmissions = network * networkGridIntensity;
    const deviceEmissions = device * deviceGridIntensity;
    return {
      dataCenter: dataCenterEmissions,
      network: networkEmissions,
      device: deviceEmissions
    };
  }
  /**
   * Calculate the embodied energy of data transfer for each system segment
   *
   * @param {number} bytes
   * @returns {object}
   */
  embodiedEnergyPerSegment(bytes) {
    const transferedBytesToGb = bytes / file_size_default.GIGABYTE;
    const dataCenter = transferedBytesToGb * EMBODIED_KWH_PER_GB_DATACENTER;
    const network = transferedBytesToGb * EMBODIED_KWH_PER_GB_NETWORK;
    const device = transferedBytesToGb * EMBODIED_KWH_PER_GB_DEVICE;
    return {
      dataCenter,
      network,
      device
    };
  }
  /**
   * Calculate the embodied emissions of data transfer for each system segment
   *
   * @param {number} bytes
   * @returns {object}
   */
  embodiedEmissions(bytes) {
    const { dataCenter, network, device } = this.embodiedEnergyPerSegment(bytes);
    const dataCenterGridIntensity = GLOBAL_GRID_INTENSITY2;
    const networkGridIntensity = GLOBAL_GRID_INTENSITY2;
    const deviceGridIntensity = GLOBAL_GRID_INTENSITY2;
    const dataCenterEmissions = dataCenter * dataCenterGridIntensity;
    const networkEmissions = network * networkGridIntensity;
    const deviceEmissions = device * deviceGridIntensity;
    return {
      dataCenter: dataCenterEmissions,
      network: networkEmissions,
      device: deviceEmissions
    };
  }
  // NOTE: Setting green: true should result in a greenHostingFactor of 1.0
  perByte(bytes, green = false, segmented = false, ratingResults = false, options = {}) {
    if (bytes < 1) {
      return 0;
    }
    const operationalEmissions = this.operationalEmissions(bytes, options);
    const embodiedEmissions = this.embodiedEmissions(bytes);
    const greenHostingFactor = getGreenHostingFactor(green, options);
    const totalEmissions = {
      dataCenter: operationalEmissions.dataCenter * (1 - greenHostingFactor) + embodiedEmissions.dataCenter,
      network: operationalEmissions.network + embodiedEmissions.network,
      device: operationalEmissions.device + embodiedEmissions.device
    };
    const total = totalEmissions.dataCenter + totalEmissions.network + totalEmissions.device;
    let rating = null;
    if (ratingResults) {
      rating = this.ratingScale(total);
    }
    if (segmented) {
      const segments = __spreadValues2({}, outputSegments(operationalEmissions, embodiedEmissions));
      if (ratingResults) {
        return __spreadProps2(__spreadValues2({}, segments), {
          total,
          rating
        });
      }
      return __spreadProps2(__spreadValues2({}, segments), { total });
    }
    if (ratingResults) {
      return { total, rating };
    }
    return total;
  }
  perVisit(bytes, green = false, segmented = false, ratingResults = false, options = {}) {
    let firstViewRatio = 1;
    let returnViewRatio = 0;
    let dataReloadRatio = 0;
    const greenHostingFactor = getGreenHostingFactor(green, options);
    const operationalEmissions = this.operationalEmissions(bytes, options);
    const embodiedEmissions = this.embodiedEmissions(bytes);
    if (bytes < 1) {
      return 0;
    }
    if (options.firstVisitPercentage || options.firstVisitPercentage === 0) {
      firstViewRatio = options.firstVisitPercentage;
    }
    if (options.returnVisitPercentage || options.returnVisitPercentage === 0) {
      returnViewRatio = options.returnVisitPercentage;
    }
    if (options.dataReloadRatio || options.dataReloadRatio === 0) {
      dataReloadRatio = options.dataReloadRatio;
    }
    const firstVisitEmissions = operationalEmissions.dataCenter * (1 - greenHostingFactor) + embodiedEmissions.dataCenter + operationalEmissions.network + embodiedEmissions.network + operationalEmissions.device + embodiedEmissions.device;
    const returnVisitEmissions = firstVisitEmissions * dataReloadRatio;
    const total = firstVisitEmissions * firstViewRatio + returnVisitEmissions * returnViewRatio;
    let rating = null;
    if (ratingResults) {
      rating = this.ratingScale(total);
    }
    if (segmented) {
      const segments = __spreadProps2(__spreadValues2({}, outputSegments(operationalEmissions, embodiedEmissions)), {
        firstVisitCO2e: firstVisitEmissions,
        returnVisitCO2e: returnVisitEmissions
      });
      if (ratingResults) {
        return __spreadProps2(__spreadValues2({}, segments), {
          total,
          rating
        });
      }
      return __spreadProps2(__spreadValues2({}, segments), { total });
    }
    if (ratingResults) {
      return { total, rating };
    }
    return total;
  }
  /**
   * Determines the rating of a website's sustainability based on its CO2 emissions.
   *
   * @param {number} co2e - The CO2 emissions of the website in grams.
   * @returns {string} The sustainability rating, ranging from "A+" (best) to "F" (worst).
   */
  ratingScale(co2e) {
    return outputRating(co2e, this.version);
  }
};
var sustainable_web_design_v4_default = SustainableWebDesign2;

// node_modules/@tgwf/co2/dist/esm/co2.js
var __defProp3 = Object.defineProperty;
var __getOwnPropSymbols3 = Object.getOwnPropertySymbols;
var __hasOwnProp3 = Object.prototype.hasOwnProperty;
var __propIsEnum3 = Object.prototype.propertyIsEnumerable;
var __defNormalProp3 = (obj, key, value) => key in obj ? __defProp3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues3 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp3.call(b, prop))
      __defNormalProp3(a, prop, b[prop]);
  if (__getOwnPropSymbols3)
    for (var prop of __getOwnPropSymbols3(b)) {
      if (__propIsEnum3.call(b, prop))
        __defNormalProp3(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp3.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols3)
    for (var prop of __getOwnPropSymbols3(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum3.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var CO2 = class {
  constructor(options) {
    this.model = new sustainable_web_design_v3_default();
    if ((options == null ? void 0 : options.model) === "1byte") {
      this.model = new byte_default();
    } else if ((options == null ? void 0 : options.model) === "swd") {
      this.model = new sustainable_web_design_v3_default();
      if ((options == null ? void 0 : options.version) === 4) {
        this.model = new sustainable_web_design_v4_default();
      }
    } else if (options == null ? void 0 : options.model) {
      throw new Error(
        '"'.concat(options.model, '" is not a valid model. Please use "1byte" for the OneByte model, and "swd" for the Sustainable Web Design model.\nSee https://developers.thegreenwebfoundation.org/co2js/models/ to learn more about the models available in CO2.js.')
      );
    }
    if ((options == null ? void 0 : options.rating) && typeof options.rating !== "boolean") {
      throw new Error(
        "The rating option must be a boolean. Please use true or false.\nSee https://developers.thegreenwebfoundation.org/co2js/options/ to learn more about the options available in CO2.js."
      );
    }
    const allowRatings = !!this.model.allowRatings;
    this._segment = (options == null ? void 0 : options.results) === "segment";
    this._rating = (options == null ? void 0 : options.rating) === true;
    if (!allowRatings && this._rating) {
      throw new Error(
        "The rating system is not supported in the model you are using. Try using the Sustainable Web Design model instead.\nSee https://developers.thegreenwebfoundation.org/co2js/models/ to learn more about the models available in CO2.js."
      );
    }
  }
  /**
   * Accept a figure in bytes for data transfer, and a boolean for whether
   * the domain shows as 'green', and return a CO2 figure for energy used to shift the corresponding
   * the data transfer.
   *
   * @param {number} bytes
   * @param {boolean} green
   * @return {number|CO2EstimateComponentsPerByte} the amount of CO2 in grammes or its separate components
   */
  perByte(bytes, green = false) {
    return this.model.perByte(bytes, green, this._segment, this._rating);
  }
  /**
   * Accept a figure in bytes for data transfer, and a boolean for whether
   * the domain shows as 'green', and return a CO2 figure for energy used to shift the corresponding
   * the data transfer.
   *
   * @param {number} bytes
   * @param {boolean} green
   * @return {number|CO2EstimateComponentsPerVisit} the amount of CO2 in grammes or its separate components
   */
  perVisit(bytes, green = false) {
    var _a;
    if ((_a = this.model) == null ? void 0 : _a.perVisit) {
      return this.model.perVisit(bytes, green, this._segment, this._rating);
    } else {
      throw new Error(
        "The perVisit() method is not supported in the model you are using. Try using perByte() instead.\nSee https://developers.thegreenwebfoundation.org/co2js/methods/ to learn more about the methods available in CO2.js."
      );
    }
  }
  /**
   * Accept a figure in bytes for data transfer, a boolean for whether
   * the domain shows as 'green', and an options object.
   * Returns an object containing CO2 figure, green boolean, and object of the variables used in calculating the CO2 figure.
   *
   * @param {number} bytes
   * @param {boolean} green
   * @param {Object} options
   * @return {CO2EstimateTraceResultPerByte} the amount of CO2 in grammes
   */
  perByteTrace(bytes, green = false, options = {}) {
    const adjustments = parseByteTraceOptions(
      options,
      this.model.version,
      green
    );
    const _a = adjustments, { gridIntensity } = _a, traceVariables = __objRest(_a, ["gridIntensity"]);
    const _b = traceVariables, {
      dataReloadRatio,
      firstVisitPercentage,
      returnVisitPercentage
    } = _b, otherVariables = __objRest(_b, [
      "dataReloadRatio",
      "firstVisitPercentage",
      "returnVisitPercentage"
    ]);
    return {
      co2: this.model.perByte(
        bytes,
        green,
        this._segment,
        this._rating,
        adjustments
      ),
      green,
      variables: __spreadValues3({
        description: "Below are the variables used to calculate this CO2 estimate.",
        bytes,
        gridIntensity: __spreadValues3({
          description: "The grid intensity (grams per kilowatt-hour) used to calculate this CO2 estimate."
        }, adjustments.gridIntensity)
      }, otherVariables)
    };
  }
  /**
   * Accept a figure in bytes for data transfer, a boolean for whether
   * the domain shows as 'green', and an options object.
   * Returns an object containing CO2 figure, green boolean, and object of the variables used in calculating the CO2 figure.
   *
   * @param {number} bytes
   * @param {boolean} green
   * @param {Object} options
   * @return {CO2EstimateTraceResultPerVisit} the amount of CO2 in grammes
   */
  perVisitTrace(bytes, green = false, options = {}) {
    var _a;
    if ((_a = this.model) == null ? void 0 : _a.perVisit) {
      const adjustments = parseVisitTraceOptions(
        options,
        this.model.version,
        green
      );
      const _b = adjustments, { gridIntensity } = _b, variables = __objRest(_b, ["gridIntensity"]);
      return {
        co2: this.model.perVisit(
          bytes,
          green,
          this._segment,
          this._rating,
          adjustments
        ),
        green,
        variables: __spreadValues3({
          description: "Below are the variables used to calculate this CO2 estimate.",
          bytes,
          gridIntensity: __spreadValues3({
            description: "The grid intensity (grams per kilowatt-hour) used to calculate this CO2 estimate."
          }, adjustments.gridIntensity)
        }, variables)
      };
    } else {
      throw new Error(
        "The perVisitTrace() method is not supported in the model you are using. Try using perByte() instead.\nSee https://developers.thegreenwebfoundation.org/co2js/methods/ to learn more about the methods available in CO2.js."
      );
    }
  }
  SustainableWebDesignV3() {
    return new sustainable_web_design_v3_default();
  }
  SustainableWebDesignV4() {
    return new sustainable_web_design_v4_default();
  }
  OneByte() {
    return new byte_default();
  }
};
var co2_default = CO2;

// node_modules/@tgwf/co2/dist/esm/hosting-json.js
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_hosting_json = __commonJS({
  "src/hosting-json.js"(exports, module) {
    async function check(domain, db) {
      if (typeof domain === "string") {
        return checkInJSON(domain, db);
      } else {
        return checkDomainsInJSON(domain, db);
      }
    }
    function checkInJSON(domain, db) {
      if (db.indexOf(domain) > -1) {
        return true;
      }
      return false;
    }
    function greenDomainsFromResults(greenResults) {
      const entries = Object.entries(greenResults);
      const greenEntries = entries.filter(([key, val]) => val.green);
      return greenEntries.map(([key, val]) => val.url);
    }
    function checkDomainsInJSON(domains, db) {
      let greenDomains = [];
      for (let domain of domains) {
        if (db.indexOf(domain) > -1) {
          greenDomains.push(domain);
        }
      }
      return greenDomains;
    }
    function find(domain, db) {
      if (typeof domain === "string") {
        return findInJSON(domain, db);
      } else {
        return findDomainsInJSON(domain, db);
      }
    }
    function findInJSON(domain, db) {
      if (db.indexOf(domain) > -1) {
        return domain;
      }
      return {
        url: domain,
        green: false
      };
    }
    function findDomainsInJSON(domains, db) {
      const result = {};
      for (let domain of domains) {
        result[domain] = findInJSON(domain, db);
      }
      return result;
    }
    module.exports = {
      check,
      greenDomainsFromResults,
      find
    };
  }
});
var hosting_json_default = require_hosting_json();

// node_modules/react-carbon-footprint/index.esm.js
function o() {
  var o2 = (function() {
    var r2 = (0, import_react.useState)(0), t = r2[0], o3 = r2[1];
    return (0, import_react.useEffect)((function() {
      var r3 = 0, e2 = function(e3) {
        var n3 = (function(r4) {
          return r4.filter((function(r5) {
            return "transferSize" in r5;
          })).reduce((function(r5, e4) {
            return r5 + e4.transferSize;
          }), 0);
        })(e3);
        o3(r3 += n3);
      };
      e2(performance.getEntriesByType("resource"));
      var n2 = new PerformanceObserver((function(r4) {
        return e2(r4.getEntries());
      }));
      return n2.observe({ entryTypes: ["resource"] }), function() {
        return n2.disconnect();
      };
    }), []), t;
  })();
  return [(0, import_react.useMemo)((function() {
    return new co2_default({ model: "swd" }).perByte(o2);
  }), [o2]), o2];
}
export {
  o as useCarbonFootprint
};
//# sourceMappingURL=react-carbon-footprint.js.map
