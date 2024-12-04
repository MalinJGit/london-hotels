// En mockad funktion för att hämta hotell
export const fetchHotels = async () => {
    // Här kan du lägga till en API-anrop för att hämta hotell från en backend.
    // För nu simulerar vi det genom att returnera en statisk lista.
    return [
      {
        id: 1,
        name: "Hotel A",
        location: "London",
        price: 150,
        rating: 4,
        imageUrl: "https://example.com/hotel-a.jpg",
      },
      {
        id: 2,
        name: "Hotel B",
        location: "London",
        price: 200,
        rating: 5,
        imageUrl: "https://example.com/hotel-a.jpg",
      },
      {
        id: 3,
        name: "Hotel C",
        location: "London",
        price: 100,
        rating: 3,
        imageUrl: "https://example.com/hotel-a.jpg",
      },
    ];
  };
  