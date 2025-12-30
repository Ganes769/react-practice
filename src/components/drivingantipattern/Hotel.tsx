import { useState } from "react";

interface Hotel {
  id: number;
  name: string;
  price: number;
}
export default function HotelsList() {
  const hotel: Hotel[] = [
    { id: 1, name: "Hotel 1", price: 100 },
    { id: 2, name: "Hotel 2", price: 200 },
    { id: 3, name: "Hotel 3", price: 300 },
  ];
  const [hotelId, sethotelId] = useState<number | null>(null);
  const handleHotelSelection = (id: number) => {
    //setiing and selecting id only is better than storing the entire object in state
    sethotelId(id);
  };
  /*
Difference between storing `hotelId` vs storing the entire `hotel` object in React state:

1) Storing only `hotelId` (RECOMMENDED)
- State holds a primitive value (number), which is compared by value.
- React re-renders, then derives the selected hotel using `.find()`.
- Single source of truth: the hotel list remains authoritative.
- If hotel data updates (API refetch, price/name change), UI stays in sync.
- Avoids stale data and object reference bugs.
- Slight `.find()` cost per render (negligible in most cases).

2) Storing the entire `hotel` object
- State holds an object, which is compared by reference.
- Even identical objects are not equal unless they share the same reference.
- Can cause stale data if hotel list updates.
- Harder equality checks and potential unnecessary re-renders.
- Duplicates state and increases bug risk with API-driven data.

Best Practice:
- Store IDs or primitive values in state.
- Derive objects from them during render.
*/

  const selectedHotel = hotel.find((hotel) => hotel.id === hotelId);
  return (
    <div>
      <ul>
        {hotel.map((item) => (
          <li onClick={() => handleHotelSelection(item.id)} key={item.id}>
            {item.name}
          </li>
        ))}
      </ul>
      <div>{selectedHotel?.name}</div>
    </div>
  );
}
