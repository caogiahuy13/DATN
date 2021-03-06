
export function getImageUrl(val){
  switch(val)
  {
    case "amusement":
      icon = require("../assets/images/markers/amusement.png");
      break;
    case "bank":
      icon = require("../assets/images/markers/bank.png");
      break;
    case "bus_stop":
      icon = require("../assets/images/markers/bus_stop.png");
      break;
    case "cafe_and_milk_tea":
      icon = require("../assets/images/markers/cafe_and_milk_tea.png");
      break;
    case "church":
      icon = require("../assets/images/markers/church.png");
      break;
    case "entertainment":
      icon = require("../assets/images/markers/entertainment.png");
      break;
    case "gas_station":
      icon = require("../assets/images/markers/gas_station.png");
      break;
    case "hospital":
      icon = require("../assets/images/markers/hospital.png");
      break;
    case "hotel":
      icon = require("../assets/images/markers/hotel.png");
      break;
    case "start_end":
      icon = require("../assets/images/markers/start_end.png");
      break;
    case "mall":
      icon = require("../assets/images/markers/mall.png");
      break;
    case "market":
      icon = require("../assets/images/markers/market.png");
      break;
    case "marketnight":
      icon = require("../assets/images/markers/marketnight.png");
      break;
    case "museum":
      icon = require("../assets/images/markers/museum.png");
      break;
    case "police":
      icon = require("../assets/images/markers/police.png");
      break;
    case "restaurant":
      icon = require("../assets/images/markers/restaurant.png");
      break;
    case "sport":
      icon = require("../assets/images/markers/sport.png");
      break;
    case "temple":
      icon = require("../assets/images/markers/temple.png");
      break;
    case "tourist_area":
      icon = require("../assets/images/markers/tourist_area.png");
      break;
    case "zoo":
      icon = require("../assets/images/markers/zoo.png");
      break;
    case "airport":
      icon = require("../assets/images/markers/airport.png");
      break;
    default:
      break;
  }
  return icon;
}
