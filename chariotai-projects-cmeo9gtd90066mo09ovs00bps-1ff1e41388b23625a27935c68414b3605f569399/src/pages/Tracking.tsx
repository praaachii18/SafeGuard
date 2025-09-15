import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useAppContext } from "../AppContext";

// ✅ Fix Leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;

function Tracking() {
  const {
    isTracking,
    setIsTracking,
    location,
    contacts,
    addContact,
    updateContact,
    deleteContact,
    fetchContacts,
  } = useAppContext();

  const [showAddForm, setShowAddForm] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", phone: "" });

  // ✅ Auto-fetch contacts for this user
  useEffect(() => {
    fetchContacts("68aa1601ba55227573f0d55a"); // replace with actual logged-in user's ID
  }, []);

  const toggleTracking = () => {
    setIsTracking(!isTracking);
    if (!isTracking && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log("Initial location:", position.coords);
      });
    }
  };

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (newContact.name && newContact.phone) {
      addContact({ userId: "68aa1601ba55227573f0d55a", ...newContact });
      setNewContact({ name: "", phone: "" });
      setShowAddForm(false);
    }
  };

  const handleEditContact = (id: string, name: string, phone: string) => {
    const newName = prompt("Edit name:", name);
    const newPhone = prompt("Edit phone:", phone);
    if (newName && newPhone) {
      updateContact(id, { name: newName, phone: newPhone });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Location Tracking
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Share your real-time location with trusted contacts. They can track
            your whereabouts to ensure your safety.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tracking Control */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Tracking Control
            </h2>

            <div className="text-center mb-8">
              <button
                onClick={toggleTracking}
                className={`w-32 h-32 rounded-full text-white font-bold text-lg transition-all duration-200 transform hover:scale-105 ${
                  isTracking
                    ? "bg-green-600 hover:bg-green-700 animate-pulse"
                    : "bg-gray-400 hover:bg-gray-500"
                }`}
              >
                {isTracking ? "TRACKING\nON" : "START\nTRACKING"}
              </button>
              <p className="mt-4 text-gray-600">
                {isTracking
                  ? "Your location is being shared"
                  : "Click to start sharing your location"}
              </p>
            </div>

            {location && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Current Location
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  <div>
                    <span className="font-medium text-gray-700">Latitude:</span>
                    <span className="ml-2 text-gray-900">
                      {location.lat.toFixed(6)}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Longitude:
                    </span>
                    <span className="ml-2 text-gray-900">
                      {location.lng.toFixed(6)}
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className="font-medium text-gray-700">
                      Last Updated:
                    </span>
                    <span className="ml-2 text-gray-900">
                      {new Date().toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ✅ Live Map with Leaflet */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Live Map</h2>

            <div className="rounded-lg overflow-hidden h-80 border-2 border-blue-200">
              {location ? (
                <MapContainer
                  center={[location.lat, location.lng]}
                  zoom={15}
                  className="h-full w-full"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  />
                  <Marker position={[location.lat, location.lng]}>
                    <Popup>You are here 🚶‍♀️</Popup>
                  </Marker>
                </MapContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-600">
                  {isTracking
                    ? "Fetching your location..."
                    : "Start tracking to see your location"}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Shared Contacts */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Shared With</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                className="border border-gray-200 rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <svg
                        className="w-6 h-6 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {contact.name}
                      </h3>
                      <p className="text-sm text-gray-600">{contact.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() =>
                      handleEditContact(contact._id!, contact.name, contact.phone)
                    }
                    className="px-3 py-1 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-full text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteContact(contact._id!)}
                    className="px-3 py-1 bg-red-100 text-red-600 hover:bg-red-200 rounded-full text-xs"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ Inline Add Contact Form */}
          <div className="mt-6 text-center">
            {!showAddForm ? (
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Add New Contact
              </button>
            ) : (
              <form
                onSubmit={handleAddContact}
                className="bg-gray-50 p-6 rounded-lg shadow-md max-w-sm mx-auto mb-6"
              >
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={newContact.name}
                    onChange={(e) =>
                      setNewContact({ ...newContact, name: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={newContact.phone}
                    onChange={(e) =>
                      setNewContact({ ...newContact, phone: e.target.value })
                    }
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How Location Sharing Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Enable Tracking
              </h3>
              <p className="text-gray-600 text-sm">
                Turn on location sharing to start broadcasting your real-time
                location to selected contacts.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Select Contacts
              </h3>
              <p className="text-gray-600 text-sm">
                Choose trusted family members and friends who can track your
                location for safety purposes.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Stay Safe</h3>
              <p className="text-gray-600 text-sm">
                Your contacts can see your location in real-time and will be
                alerted if you need help.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-start">
            <svg
              className="w-6 h-6 text-yellow-600 mr-3 mt-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <div>
              <h3 className="font-semibold text-yellow-800 mb-2">
                Privacy & Security
              </h3>
              <p className="text-yellow-700 text-sm">
                Your location data is encrypted and only shared with contacts
                you explicitly approve. You can stop sharing at any time, and
                your location history is automatically deleted after 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tracking;
