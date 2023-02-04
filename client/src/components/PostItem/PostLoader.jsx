import React from 'react';
import ContentLoader from "react-content-loader"
import './post-item.scss';

export const PostLoader = () => {
  return (
    <ContentLoader
      speed={5}
      width={370}
      height={475}
      viewBox="0 0 370 475"
      backgroundColor="#d1d1d1"
      foregroundColor="#dedede"
      className="post-item__loader"
    >
      <rect x="0" y="280" rx="5" ry="5" width="85" height="17" />
      <rect x="1" y="343" rx="11" ry="11" width="370" height="94" />
      <rect x="212" y="369" rx="0" ry="0" width="1" height="0" />
      <rect x="0" y="445" rx="5" ry="5" width="155" height="28" />
      <rect x="0" y="309" rx="6" ry="6" width="222" height="24" />
      <rect x="0" y="0" rx="20" ry="20" width="370" height="270" />
    </ContentLoader>
  );
};
