
import React, { useState } from "react";
import "./CricketPage.css";

const CricketPage = () => {
  const [ticketData, setTicketData] = useState(
    Array(4).fill({ vipTickets: 0, normalTickets: 0, showTicketOptions: false })
  );

  const vipPrice = 1200; // VIP ticket price
  const normalPrice = 600; // Normal ticket price
  const posters = [
    {
      url: "https://annapurnaexpress.prixacdn.net/media/albums/NPL_uoE2ZBXd1E.jpg", // Replace with actual poster URL
      title: "Janakpur Vs Sudurpachim",
    },
    {
      url: "https://www.arkoevent.com/wp-content/uploads/2024/06/Black-and-Yellow-Cricket-Match-Instagram-Post-1.png", // Replace with actual poster URL
      title: "Nepal Vs South Africa",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW__LeJsnrSCy0twaCt-Mb8ew21k1ob41nZg&s", // Replace with actual poster URL
      title: "Chennai Vs Mumbai",
    },
    {
      url: "https://images.prothomalo.com/prothomalo-english/2022-01/8fa6e7c2-8f47-40ab-95cc-5a07e7bbd65a/DuvQTjOvqYvdUOUK4GBt9ana6kCTVGn8JZk1ayVl.jpg?w=1200&h=675&auto=format%2Ccompress&fit=max", // Replace with actual poster URL
      title: "Sri Lanka Vs Bangladesh",
    },
  ];

  const handlePurchase = (index) => {
    const { vipTickets, normalTickets } = ticketData[index];
    const totalPrice = vipTickets * vipPrice + normalTickets * normalPrice;

    if (vipTickets > 0 || normalTickets > 0) {
      alert(`You have purchased:
      ${vipTickets} VIP Tickets
      ${normalTickets} Normal Tickets
      Total Price: Rs${totalPrice}`);
    } else {
      alert("Please select at least one ticket to purchase.");
    }

    // Reset the ticket options for the selected poster
    setTicketData((prev) =>
      prev.map((data, i) =>
        i === index
          ? { ...data, vipTickets: 0, normalTickets: 0, showTicketOptions: false }
          : data
      )
    );
  };

  const handleBuyTicketsClick = (index) => {
    setTicketData((prev) =>
      prev.map((data, i) =>
        i === index
          ? { ...data, showTicketOptions: !data.showTicketOptions }
          : { ...data, showTicketOptions: false }
      )
    );
  };

  const handleInputChange = (index, type, value) => {
    setTicketData((prev) =>
      prev.map((data, i) =>
        i === index ? { ...data, [type]: parseInt(value) || 0 } : data
      )
    );
  };

  return (
    <div className="cricket-page">
      <h1>Cricket Event</h1>
      <div className="posters-container">
        {posters.map((poster, index) => (
          <div key={index} className="poster-container">
            <img
              src={poster.url}
              alt={poster.title}
              className="event-poster"
            />
            <h2>{poster.title}</h2>
            <button
              className="buy-tickets-button"
              onClick={() => handleBuyTicketsClick(index)}
            >
              Buy Tickets
            </button>
            {ticketData[index].showTicketOptions && (
              <div className="ticket-options">
                <div className="ticket-type">
                  <h3>VIP Tickets</h3>
                  <p>Price: Rs{vipPrice}</p>
                  <input
                    type="number"
                    min="0"
                    value={ticketData[index].vipTickets}
                    onChange={(e) =>
                      handleInputChange(index, "vipTickets", e.target.value)
                    }
                  />
                </div>
                <div className="ticket-type">
                  <h3>Normal Tickets</h3>
                  <p>Price: Rs{normalPrice}</p>
                  <input
                    type="number"
                    min="0"
                    value={ticketData[index].normalTickets}
                    onChange={(e) =>
                      handleInputChange(index, "normalTickets", e.target.value)
                    }
                  />
                </div>
                <h2>
                  Total Price: Rs
                  {ticketData[index].vipTickets * vipPrice +
                    ticketData[index].normalTickets * normalPrice}
                </h2>
                <button
                  onClick={() => handlePurchase(index)}
                  className="purchase-button"
                >
                  Purchase Tickets
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CricketPage;

