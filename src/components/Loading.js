import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
      <FontAwesomeIcon icon={faSpinner} spin size="3x" className="text-blue-500" />
    </div>
  );
};

export default Loading;
