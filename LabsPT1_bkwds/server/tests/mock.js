let date = new Date("March 18, 2019 11:30:00 AM")
let date2 = new Date("March 18, 2019 11:45:00 AM")

export const userOne = {
  password: "testpass",
  email: "email@hotmail.com",
  displayName: "User One",
  contact: {
    name: "Bob",
    number: "+15005550006"
  }
}
export const userTwo = {
  password: "testpass2",
  email: "email@gmail.com",
  displayName: "User Two"
}
export const userThree = {
  password: "testpass3",
  email: "email@yahoo.com",
  displayName: "User Three"
}

export const tripOne = {
  userId: "",
  name: "tripOne",
  start: Date.now(),
  end: Date.now(),
  lat: 46.21,
  lon: 123.234,
  waypoints: []
}
export const tripTwo = {
  userId: "",
  name: "tripTwo",
  start: Date.now(),
  end: Date.now(),
  lat: 30.11,
  lon: 93.134,
  waypoints: []
}
export const tripThree = {
  userId: "",
  name: "tripThree",
  start: Date.now(),
  end: Date.now(),
  lat: 12.21,
  lon: 45.234,
  waypoints: []
}
export const publicTrip1 = {
  userId: "",
  name: "pub1",
  start: Date.now(),
  end: Date.now(),
  lat: 12.21,
  lon: 45.234,
  isPublic: true,
  waypoints: []
}
export const publicTrip2 = {
  userId: "",
  name: "pub2",
  start: Date.now(),
  end: Date.now(),
  lat: 12.21,
  lon: 45.234,
  isPublic: true,
  waypoints: []
}

export const waypointOne = {
  tripId: "",
  order: 1,
  name: "Checkpoint 1",
  lat: 30.508293960387878,
  lon: -97.77231216430664,
  start: Date.now(),
  end: date,
  complete: true
}
export const waypointTwo = {
  tripId: "",
  order: 2,
  name: "Checkpoint 2",
  lat: 30.508293960387878,
  lon: -97.77231216430664,
  start: Date.now(),
  end: date2
}
export const waypointFour = {
  tripId: "",
  order: 1,
  name: "Checkpoint 1",
  lat: 24.208293960387878,
  lon: -101.45231216430664,
  start: Date.now(),
  end: date2
}
