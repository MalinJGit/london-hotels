import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/Hoteldetails.css';

interface Photo {
  id: number;
  url: string;
}

interface HotelDetails {
  name: string;
  description: string;
  address: string;
  rating: number;
  [key: string]: any; // Lägg till om fler fält används senare
}

const HotelDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [hotelDetails, setHotelDetails] = useState<HotelDetails | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        // Hämta hotellinformation
        const detailsResponse = await axios.get(
          `https://tripadvisor16.p.rapidapi.com/api/v1/hotels/getHotelDetails`,
          {
            headers: {
              'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com',
              'X-RapidAPI-Key': '5937f4cfa4msh4c57ebaa853f21bp13f60cjsn7f250f843c62',
            },
            params: {
              hotelId: id, // Skicka hotellets ID som parameter
            },
          }
        );
        console.log('Hotel details response:', detailsResponse.data);

        // Hämta bilder för hotellet (om den nya API:n erbjuder en separat endpoint för bilder)
        const photosResponse = await axios.get(
          `https://tripadvisor16.p.rapidapi.com/api/v1/hotels/getHotelPhotos`, // Kontrollera om denna URL krävs för bilder
          {
            headers: {
              'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com',
              'X-RapidAPI-Key': '5937f4cfa4msh4c57ebaa853f21bp13f60cjsn7f250f843c62',
            },
            params: {
              hotelId: id, // Skicka hotellets ID
            },
          }
        );
        console.log('Hotel photos response:', photosResponse.data);

        setHotelDetails(detailsResponse.data);
        setPhotos(photosResponse.data?.photos || []);
      } catch (err) {
        console.error('Error fetching hotel details or photos:', err);
        setError('Kunde inte hämta hotellinformation. Försök igen senare.');
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [id]);

  if (loading) {
    return <p>Laddar hotellinformation...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div>
      <h1>{hotelDetails?.name || 'Hotellinformation saknas'}</h1>
      <p>{hotelDetails?.description || 'Ingen beskrivning tillgänglig.'}</p>
      <p>{hotelDetails?.address || 'Ingen adress tillgänglig.'}</p>
      <p>Rating: {hotelDetails?.rating || 'Ingen rating tillgänglig.'}</p>

      <div>
        <h3>Hotel Photos</h3>
        {photos.length > 0 ? (
          photos.map((photo) => (
            <img
              src={photo.url}
              alt="Hotel"
              key={photo.id}
              style={{
                maxWidth: '300px',
                height: 'auto',
                margin: '10px',
                border: '1px solid #ddd',
              }}
            />
          ))
        ) : (
          <p>Inga bilder tillgängliga.</p>
        )}
      </div>
    </div>
  );
};

export default HotelDetails;