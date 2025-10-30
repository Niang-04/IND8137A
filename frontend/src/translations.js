export const translations = {
  fr: {
    nav: {
      logo: '🚗 Park INC',
      map: '🗺️ Carte',
      account: '👤 Mon Compte'
    },
    map: {
      title: '🚗 Disponibilité des Stationnements de Montréal',
      loading: 'Chargement des données de stationnement...',
      filterType: 'Type:',
      filterArea: 'Zone:',
      all: 'Tous',
      public: '🅿️ Public',
      private: '🏢 Privé',
      allAreas: 'Toutes les Zones',
      simulation: {
        title: '🎯 Simulation de Capteur',
        description: 'Simuler les données de capteurs en temps réel pour la ruelle au 3520 Boulevard Édouard-Montpetit',
        button: '🔄 Simuler les Données du Capteur',
        simulating: '⏳ Simulation en cours...',
        success: '✅ Données du capteur mises à jour avec succès!',
        error: '❌ Échec de la simulation des données du capteur'
      },
      legend: {
        title: 'Légende:',
        low: 'Occupation Faible (<50%)',
        medium: 'Occupation Moyenne (50-80%)',
        high: 'Occupation Élevée (>80%)'
      },
      stats: {
        totalSpots: 'Emplacements Totaux:',
        available: 'Disponibles:',
        lastUpdate: 'Dernière Mise à Jour:'
      },
      error: '⚠️ Échec du chargement des données de stationnement. Veuillez vous assurer que le backend est en cours d\'exécution.',
      popup: {
        type: 'Type:',
        area: 'Zone:',
        available: 'Disponible:',
        occupancy: 'Occupation:',
        detailedView: 'Vue Détaillée:',
        individualSpaces: 'Espaces individuels montrés ci-dessous',
        spaceNumber: 'Espace #',
        status: 'Statut:',
        occupied: '🔴 Occupé',
        availableStatus: '🟢 Disponible',
        location: 'Emplacement:'
      }
    },
    account: {
      title: '👤 Mon Compte',
      subtitle: 'Gérez votre profil Park INC et vos préférences',
      personalInfo: 'Informations Personnelles',
      edit: '✏️ Modifier',
      save: '✓ Enregistrer',
      cancel: '✕ Annuler',
      name: 'Nom',
      email: 'Email',
      phone: 'Téléphone',
      vehicle: 'Véhicule',
      favoriteAreas: 'Zones de Stationnement Favorites',
      statistics: 'Statistiques de Stationnement',
      parkingSessions: 'Sessions de Stationnement',
      totalTimeParked: 'Temps Total Stationné',
      totalSpent: 'Total Dépensé',
      mostUsedArea: 'Zone la Plus Utilisée',
      recentSessions: 'Sessions de Stationnement Récentes',
      hours: 'heures',
      today: 'Aujourd\'hui',
      yesterday: 'Hier',
      daysAgo: 'il y a {count} jours',
      areas: {
        downtown: 'Centre-ville',
        oldMontreal: 'Vieux-Montréal',
        plateau: 'Plateau'
      },
      activity: {
        placeVilleMarie: 'Stationnement Place Ville Marie',
        oldPort: 'Stationnement du Vieux-Port',
        sainteCatherine: 'Rue Sainte-Catherine'
      }
    }
  },
  en: {
    nav: {
      logo: '🚗 Park INC',
      map: '🗺️ Map',
      account: '👤 My Account'
    },
    map: {
      title: '🚗 Montreal Parking Availability',
      loading: 'Loading parking data...',
      filterType: 'Type:',
      filterArea: 'Area:',
      all: 'All',
      public: '🅿️ Public',
      private: '🏢 Private',
      allAreas: 'All Areas',
      simulation: {
        title: '🎯 Sensor Simulation',
        description: 'Simulate real-time sensor data for the alley at 3520 Boulevard Édouard-Montpetit',
        button: '🔄 Simulate Sensor Data',
        simulating: '⏳ Simulating...',
        success: '✅ Sensor data updated successfully!',
        error: '❌ Failed to simulate sensor data'
      },
      legend: {
        title: 'Legend:',
        low: 'Low Occupancy (<50%)',
        medium: 'Medium Occupancy (50-80%)',
        high: 'High Occupancy (>80%)'
      },
      stats: {
        totalSpots: 'Total Spots:',
        available: 'Available:',
        lastUpdate: 'Last Update:'
      },
      error: '⚠️ Failed to load parking data. Please make sure the backend is running.',
      popup: {
        type: 'Type:',
        area: 'Area:',
        available: 'Available:',
        occupancy: 'Occupancy:',
        detailedView: 'Detailed View:',
        individualSpaces: 'Individual spaces shown below',
        spaceNumber: 'Space #',
        status: 'Status:',
        occupied: '🔴 Occupied',
        availableStatus: '🟢 Available',
        location: 'Location:'
      }
    },
    account: {
      title: '👤 My Account',
      subtitle: 'Manage your Park INC profile and preferences',
      personalInfo: 'Personal Information',
      edit: '✏️ Edit',
      save: '✓ Save',
      cancel: '✕ Cancel',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      vehicle: 'Vehicle',
      favoriteAreas: 'Favorite Parking Areas',
      statistics: 'Parking Statistics',
      parkingSessions: 'Parking Sessions',
      totalTimeParked: 'Total Time Parked',
      totalSpent: 'Total Spent',
      mostUsedArea: 'Most Used Area',
      recentSessions: 'Recent Parking Sessions',
      hours: 'hours',
      today: 'Today',
      yesterday: 'Yesterday',
      daysAgo: '{count} days ago',
      areas: {
        downtown: 'Downtown',
        oldMontreal: 'Old Montreal',
        plateau: 'Plateau'
      },
      activity: {
        placeVilleMarie: 'Place Ville Marie Parking',
        oldPort: 'Old Port Parking',
        sainteCatherine: 'Rue Sainte-Catherine'
      }
    }
  }
};
