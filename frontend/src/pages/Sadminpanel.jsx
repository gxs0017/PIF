import React, { useEffect, useState } from 'react';

function Sadminpanel() {
  const [sadminContent, setSadminContent] = useState('');

  useEffect(() => {
    const fetchSadminContent = async () => {
      try {
        const response = await fetch('/sadmin-panel.js');
        if (!response.ok) {
          throw new Error('Failed to fetch sadmin panel content');
        }
        const content = await response.text();
        setSadminContent(content);
      } catch (error) {
        console.error('Error fetching sadmin panel content:', error);
      }
    };

    fetchSadminContent();
  }, []);

  return (
    <div dangerouslySetInnerHTML={{ __html: sadminContent }} />
  );
}

export default Sadminpanel;
