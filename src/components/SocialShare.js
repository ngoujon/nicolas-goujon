import React from 'react';
import './SocialShare.css';

const SocialShare = ({ url, title, description }) => {
  const shareUrl = encodeURIComponent(url || window.location.href);
  const shareTitle = encodeURIComponent(title || document.title);
  const shareDescription = encodeURIComponent(description || '');

  const socialLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
  };

  return (
    <div className="social-share">
      <h3>Partager cette page</h3>
      <div className="social-share-buttons">
        <a
          href={socialLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="social-share-button twitter"
          aria-label="Partager sur Twitter"
        >
          <i className="fab fa-twitter"></i>
        </a>
        <a
          href={socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="social-share-button linkedin"
          aria-label="Partager sur LinkedIn"
        >
          <i className="fab fa-linkedin"></i>
        </a>
        <a
          href={socialLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="social-share-button facebook"
          aria-label="Partager sur Facebook"
        >
          <i className="fab fa-facebook"></i>
        </a>
      </div>
    </div>
  );
};

export default SocialShare; 