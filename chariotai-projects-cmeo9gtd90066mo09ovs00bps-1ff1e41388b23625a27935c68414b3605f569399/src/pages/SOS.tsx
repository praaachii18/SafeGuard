import { useState, useEffect, useRef } from "react";
import { useAppContext } from "../AppContext";

type Contact = {
  _id?: string;
  name: string;
  phone: string;
};

function SOS() {
  const { setIsSOSActive, location, setLocation } = useAppContext();

  const [isActivated, setIsActivated] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isCancelled, setIsCancelled] = useState(false);

  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const userId = localStorage.getItem("userId");

  // ✅ Fetch contacts
  useEffect(() => {
    if (!userId) return;
    const fetchContacts = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/contacts/${userId}`);
        const data = await res.json();
        setContacts(data);
      } catch (err) {
        console.error("Error fetching contacts:", err);
      }
    };
    fetchContacts();
  }, [userId]);

  // ✅ Get location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => console.error("Error getting location:", err)
      );
    }
  }, [setLocation]);

  // ✅ Send SOS
  const sendSOSAlert = async () => {
    if (isCancelled) return;
    if (!location) {
      alert("Location not available");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/sos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ userId, location }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ SOS alert sent to all contacts!");
        setIsSOSActive(true);
      } else {
        alert("❌ Failed: " + (data.error || data.message || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error sending SOS");
    }
  };

  // ✅ Start countdown
  const handleSOSActivation = () => {
    setIsActivated(true);
    setCountdown(10);
    setIsCancelled(false);

    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          if (!isCancelled) {
            sendSOSAlert();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // ✅ Cancel
  const handleCancel = () => {
    setIsActivated(false);
    setCountdown(0);
    setIsCancelled(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // ✅ Edit
  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
    setNewName(contact.name);
    setNewPhone(contact.phone);
  };

  const handleSave = async () => {
    if (!editingContact) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/contacts/${editingContact._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: newName, phone: newPhone }),
        }
      );

      if (res.ok) {
        setContacts((prev) =>
          prev.map((c) =>
            c._id === editingContact._id
              ? { ...c, name: newName, phone: newPhone }
              : c
          )
        );
        setEditingContact(null);
      } else {
        alert("❌ Failed to update contact");
      }
    } catch (err) {
      console.error("Error updating contact:", err);
    }
  };

  const handleCancelEdit = () => {
    setEditingContact(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Emergency SOS
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            In case of emergency, press the SOS button below. Your location will
            be shared with all your emergency contacts.
          </p>
        </div>

        {/* Button */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 text-center">
          {!isActivated ? (
            <div>
              <button
                onClick={handleSOSActivation}
                className="w-48 h-48 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-xl flex items-center justify-center mx-auto mb-6 transform hover:scale-105 active:scale-95 transition-all"
              >
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">SOS</div>
                  <div className="text-sm">EMERGENCY</div>
                </div>
              </button>
              <p className="text-gray-600 text-lg">
                Press for emergency alert
              </p>
            </div>
          ) : countdown > 0 ? (
            <div>
              <div className="w-48 h-48 bg-red-600 text-white rounded-full shadow-xl flex items-center justify-center mx-auto mb-6 animate-pulse">
                <div className="text-center">
                  <div className="text-6xl font-bold mb-2">{countdown}</div>
                  <div className="text-sm">ACTIVATING</div>
                </div>
              </div>
              <button
                onClick={handleCancel}
                className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-full text-lg font-semibold"
              >
                Cancel
              </button>
              <p className="text-red-600 text-lg font-semibold mt-4">
                Emergency alert will be sent in {countdown} seconds
              </p>
            </div>
          ) : (
            <div>
              <div className="w-48 h-48 bg-green-600 text-white rounded-full shadow-xl flex items-center justify-center mx-auto mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">ACTIVATED</div>
                </div>
              </div>
              <button
                onClick={() => setIsActivated(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-full text-lg font-semibold"
              >
                Reset
              </button>
            </div>
          )}
        </div>

        {/* Location */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Your Current Location
          </h2>
          {location ? (
            <div className="bg-gray-100 rounded-lg p-6">
              <p>
                <strong>Latitude:</strong> {location.lat.toFixed(6)}
              </p>
              <p>
                <strong>Longitude:</strong> {location.lng.toFixed(6)}
              </p>
            </div>
          ) : (
            <p>Fetching your location...</p>
          )}
        </div>

        {/* Contacts */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Emergency Contacts
          </h2>
          {contacts.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {contacts.map((c, index) => {
                const styles = [
                  { color: "bg-red-100 text-red-600", icon: "📞" },
                  { color: "bg-blue-100 text-blue-600", icon: "👤" },
                  { color: "bg-green-100 text-green-600", icon: "🚓" },
                ];
                const { color, icon } = styles[index % styles.length];

                return (
                  <div
                    key={c._id}
                    className={`flex flex-col p-5 rounded-lg shadow-md ${color}`}
                  >
                    {editingContact && editingContact._id === c._id ? (
                      <div>
                        <input
                          type="text"
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          className="w-full mb-2 px-3 py-2 border rounded"
                          placeholder="Name"
                        />
                        <input
                          type="text"
                          value={newPhone}
                          onChange={(e) => setNewPhone(e.target.value)}
                          className="w-full mb-2 px-3 py-2 border rounded"
                          placeholder="Phone Number"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={handleSave}
                            className="bg-green-600 text-white px-4 py-2 rounded"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center mb-2">
                          <div className="text-3xl mr-4">{icon}</div>
                          <div>
                            <p className="font-bold">{c.name}</p>
                            <p className="text-sm">{c.phone}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(c)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded"
                          >
                            Edit
                          </button>
                          <button className="bg-red-500 text-white px-3 py-1 rounded">
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-600">No contacts saved.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SOS;
