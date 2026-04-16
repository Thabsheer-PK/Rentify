const vehicles = [
  {
    id: 1,
    name: "Swift",
    brand: "Maruti Suzuki",
    model: 2012,
    type: "hatchback",
    fuel: "petrol",
    transmission: "manual",

    location: "Malappuram",
    price: 1500,
    category: "daily",

    seats: 5,
    mileage: "22 km/l",

    description: "Comfortable hatchback, best for city rides.",

    owner: {
      name: "Owner 1",
      phone: "9999999991",
      verified: true
    },

    images: [
      "https://stimg.cardekho.com/images/carexteriorimages/930x620/Maruti/Maruti-Swift-2011-2014/2522/front-left-side-47.jpg", 
      "https://imgd.aeplcdn.com/664x374/ec/9676/img/l/Maruti-Suzuki-Swift-Interior-14856.jpg?v=201711021421&q=80"
    ],

    availability: true,
    rating: 4.2
  },

  {
    id: 2,
    name: "Alto 800",
    brand: "Maruti Suzuki",
    model: 2015,
    type: "hatchback",
    fuel: "petrol",
    transmission: "manual",

    location: "Kozhikode",
    price: 1000,
    category: "daily",

    seats: 5,
    mileage: "24 km/l",

    description: "Budget-friendly car, suitable for short trips.",

    owner: {
      name: "Owner 2",
      phone: "9999999992",
      verified: false
    },

    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwlcCJOhqWlo8eftJ1uuboq352pZq-a0XVMg&s"
    ],

    availability: true,
    rating: 4.0
  },

  {
    id: 3,
    name: "Innova",
    brand: "Toyota",
    model: 2014,
    type: "mpv",
    fuel: "diesel",
    transmission: "manual",

    location: "Kochi",
    price: 30000,
    category: "monthly",

    seats: 7,
    mileage: "15 km/l",

    description: "Spacious family vehicle, perfect for long trips.",

    owner: {
      name: "Owner 3",
      phone: "9999999993",
      verified: true
    },

    images: [
      "https://imgd.aeplcdn.com/1280x720/cw/cars/discontinued/toyota/innova-2013-2014.jpg"
    ],

    availability: true,
    rating: 4.5
  },

  {
    id: 4,
    name: "Benz E-Class",
    brand: "Mercedes-Benz",
    model: 2015,
    type: "sedan",
    fuel: "diesel",
    transmission: "automatic",

    location: "Malappuram",
    price: 6000,
    category: "event",

    seats: 5,
    mileage: "12 km/l",

    description: "Luxury sedan, perfect for weddings and events.",

    owner: {
      name: "Owner 4",
      phone: "9999999994",
      verified: true
    },

    images: [
      "https://imgd.aeplcdn.com/664x374/ec/48/E3/19188/img/m/Mercedes-Benz-E-Class-Right-Front-Three-Quarter-53511_ol.jpg"
    ],

    availability: true,
    rating: 4.8
  },

  {
    id: 5,
    name: "Wagon-R",
    brand: "Maruti Suzuki",
    model: 2016,
    type: "hatchback",
    fuel: "petrol",
    transmission: "manual",

    location: "Kozhikode",
    price: 28000,
    category: "monthly",

    seats: 5,
    mileage: "21 km/l",

    description: "Comfortable and reliable car for long-term use.",

    owner: {
      name: "Owner 5",
      phone: "9999999995",
      verified: false
    },

    images: [
      "https://imgd.aeplcdn.com/664x374/cw/ec/9709/Maruti-Suzuki-Wagon-R-10-Left-Front-Three-Quarter-88890.jpg"
    ],

    availability: true,
    rating: 4.1
  }
];

export default vehicles;