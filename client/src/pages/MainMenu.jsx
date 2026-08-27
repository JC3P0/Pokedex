import React, { useState, useEffect } from 'react';
import BaseLayout from '../utils/BaseLayout';
import { preloadData } from '../utils/preloadData';

const MainMenu = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await preloadData();
      setLoading(false);
    };

    loadData();
  }, []);

  return (
    <BaseLayout loading={loading}>
      {loading ? (
        <div className="loading-container">
          <div className="loading-bar">
            <div className="loading-spinner"></div>
            <p>Loading Pokemon and Item data, please wait...</p>
          </div>
        </div>
      ) : (
        <div className="main-menu-content">
          {/* Main Menu specific content goes here */}
        </div>
      )}
    </BaseLayout>
  );
};

export default MainMenu;
