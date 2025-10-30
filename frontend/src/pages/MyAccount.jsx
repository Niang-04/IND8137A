import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './MyAccount.css';

function MyAccount() {
  const { t } = useLanguage();
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (514) 555-0123',
    vehicle: 'Toyota Camry - ABC 123',
    favoriteAreas: [t('account.areas.downtown'), t('account.areas.oldMontreal'), t('account.areas.plateau')]
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
          <h1>{t('account.title')}</h1>
          <p>{t('account.subtitle')}</p>
        </div>

        <div className="account-sections">
          {/* Profile Section */}
          <div className="account-section">
            <div className="section-header">
              <h2>{t('account.personalInfo')}</h2>
              {!isEditing ? (
                <button onClick={handleEdit} className="edit-btn">
                  {t('account.edit')}
                </button>
              ) : (
                <div className="edit-actions">
                  <button onClick={handleSave} className="save-btn">
                    {t('account.save')}
                  </button>
                  <button onClick={handleCancel} className="cancel-btn">
                    {t('account.cancel')}
                  </button>
                </div>
              )}
            </div>

            <div className="profile-grid">
              <div className="profile-item">
                <label>{t('account.name')}</label>
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
                <label>{t('account.email')}</label>
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
                <label>{t('account.phone')}</label>
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
                <label>{t('account.vehicle')}</label>
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
              <h2>{t('account.favoriteAreas')}</h2>
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
              <h2>{t('account.statistics')}</h2>
            </div>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">🚗</div>
                <div className="stat-info">
                  <h3>42</h3>
                  <p>{t('account.parkingSessions')}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⏱️</div>
                <div className="stat-info">
                  <h3>128h</h3>
                  <p>{t('account.totalTimeParked')}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💰</div>
                <div className="stat-info">
                  <h3>$342</h3>
                  <p>{t('account.totalSpent')}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⭐</div>
                <div className="stat-info">
                  <h3>{t('account.areas.downtown')}</h3>
                  <p>{t('account.mostUsedArea')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="account-section">
            <div className="section-header">
              <h2>{t('account.recentSessions')}</h2>
            </div>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon">🅿️</div>
                <div className="activity-details">
                  <h4>{t('account.activity.placeVilleMarie')}</h4>
                  <p>{t('account.areas.downtown')} • 2 {t('account.hours')} • $15</p>
                  <span className="activity-date">{t('account.today')}, 2:30 PM</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">🅿️</div>
                <div className="activity-details">
                  <h4>{t('account.activity.oldPort')}</h4>
                  <p>{t('account.areas.oldMontreal')} • 3 {t('account.hours')} • $20</p>
                  <span className="activity-date">{t('account.yesterday')}, 4:00 PM</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">🅿️</div>
                <div className="activity-details">
                  <h4>{t('account.activity.sainteCatherine')}</h4>
                  <p>{t('account.areas.downtown')} • 1 {t('account.hours')} • $8</p>
                  <span className="activity-date">2 {t('account.daysAgo').replace('{count}', '2')}, 11:00 AM</span>
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
