import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const HotelDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [hotelDetails, setHotelDetails] = useState<any>();
  const [photos, setPhotos] = useState<any[]>();

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const detailsResponse = await axios.get(
          `https://booking-com15.p.rapidapi.com/api/v1/hotels/details/${id}`,
          {
            headers: {
              'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com',
              'X-RapidAPI-Key': '5937f4cfa4msh4c57ebaa853f21bp13f60cjsn7f250f843c62',
            },
          }
        );

        const photosResponse = await axios.get(
          `https://booking-com15.p.rapidapi.com/api/v1/hotels/photos/${id}`,
          {
            headers: {
              'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com',
              'X-RapidAPI-Key': '5937f4cfa4msh4c57ebaa853f21bp13f60cjsn7f250f843c62',
            },
          }
        );

        setHotelDetails(detailsResponse.data);
        setPhotos(photosResponse.data?.photos || []);
      } catch (error) {
        console.error('Error fetching hotel details or photos');
      }
    };

    fetchHotelDetails();
  }, [id]);

  return (
    <div>
      <h1>{hotelDetails?.name || 'Hotel Details'}</h1>
      <div>
        <h3>Hotel Photos</h3>
        {photos?.map((photo) => (
          <img src={photo.url} alt="Hotel" key={photo.id} />
        ))}
      </div>
    </div>
  );
};

export default HotelDetails;