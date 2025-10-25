import { useState } from 'react';
import './MyAccount.css';

function MyAccount() {
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (514) 555-0123',
    vehicle: 'Toyota Camry - ABC 123',
    favoriteAreas: ['Downtown', 'Old Montreal', 'Plateau']
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...userData });

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...userData });
  };

  const handleSave = () => {
    setUserData({ ...editData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...userData });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="account-page">
      <div className="account-container">
        <div className="account-header">
          <h1>👤 My Account</h1>
          <p>Manage your Park INC profile and preferences</p>
        </div>

        <div className="account-sections">
          {/* Profile Section */}
          <div className="account-section">
            <div className="section-header">
              <h2>Personal Information</h2>
              {!isEditing ? (
                <button onClick={handleEdit} className="edit-btn">
                  ✏️ Edit
                </button>
              ) : (
                <div className="edit-actions">
                  <button onClick={handleSave} className="save-btn">
                    ✓ Save
                  </button>
                  <button onClick={handleCancel} className="cancel-btn">
                    ✕ Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="profile-grid">
              <div className="profile-item">
                <label>Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{userData.name}</p>
                )}
              </div>

              <div className="profile-item">
                <label>Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{userData.email}</p>
                )}
              </div>

              <div className="profile-item">
                <label>Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={editData.phone}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{userData.phone}</p>
                )}
              </div>

              <div className="profile-item">
                <label>Vehicle</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="vehicle"
                    value={editData.vehicle}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{userData.vehicle}</p>
                )}
              </div>
            </div>
          </div>

          {/* Favorite Areas Section */}
          <div className="account-section">
            <div className="section-header">
              <h2>Favorite Parking Areas</h2>
            </div>
            <div className="favorite-areas">
              {userData.favoriteAreas.map((area, index) => (
                <div key={index} className="area-tag">
                  📍 {area}
                </div>
              ))}
            </div>
          </div>

          {/* Statistics Section */}
          <div className="account-section">
            <div className="section-header">
              <h2>Parking Statistics</h2>
            </div>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">🚗</div>
                <div className="stat-info">
                  <h3>42</h3>
                  <p>Parking Sessions</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⏱️</div>
                <div className="stat-info">
                  <h3>128h</h3>
                  <p>Total Time Parked</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💰</div>
                <div className="stat-info">
                  <h3>$342</h3>
                  <p>Total Spent</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⭐</div>
                <div className="stat-info">
                  <h3>Downtown</h3>
                  <p>Most Used Area</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="account-section">
            <div className="section-header">
              <h2>Recent Parking Sessions</h2>
            </div>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon">🅿️</div>
                <div className="activity-details">
                  <h4>Place Ville Marie Parking</h4>
                  <p>Downtown • 2 hours • $15</p>
                  <span className="activity-date">Today, 2:30 PM</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">🅿️</div>
                <div className="activity-details">
                  <h4>Old Port Parking</h4>
                  <p>Old Montreal • 3 hours • $20</p>
                  <span className="activity-date">Yesterday, 4:00 PM</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">🅿️</div>
                <div className="activity-details">
                  <h4>Rue Sainte-Catherine</h4>
                  <p>Downtown • 1 hour • $8</p>
                  <span className="activity-date">2 days ago, 11:00 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
