import { XCircleIcon } from '@heroicons/react/20/solid';
import PropTypes from 'prop-types';

const Alert = ({ errors, onDismiss }) => {
  if (!errors || errors.length === 0) {
    return null; // Return nothing if there are no errors
  }

  return (
    <div className="fixed top-4 right-4 bg-red-50 border border-red-300 rounded-md p-4 shadow-lg z-50">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <XCircleIcon aria-hidden="true" className="h-5 w-5 text-red-400" />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800">There were errors with your submission</h3>
          <div className="mt-2 text-sm text-red-700">
            <ul role="list" className="list-disc space-y-1 pl-5">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="ml-4 flex-shrink-0">
          <button
            type="button"
            className="text-red-500 hover:text-red-700"
            onClick={onDismiss}
          >
            <span className="sr-only">Close</span>
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

Alert.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default Alert;
