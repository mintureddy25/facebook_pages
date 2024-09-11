import FacebookLoginButton from "./FacebookButton";

export default function Example() {
    return (
      <div className="relative bg-gray-900">
        <div className="relative h-screen overflow-hidden bg-indigo-600">
          {/* Background Image */}
          <img
            alt="Background"
            src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&blend=6366F1&sat=-100&blend-mode=multiply"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <svg
            viewBox="0 0 926 676"
            aria-hidden="true"
            className="absolute -bottom-24 left-24 w-[57.875rem] transform-gpu blur-[118px]"
          >
            <path
              d="m254.325 516.708-90.89 158.331L0 436.427l254.325 80.281 163.691-285.15c1.048 131.759 36.144 345.144 168.149 144.613C751.171 125.508 707.17-93.823 826.603 41.15c95.546 107.978 104.766 294.048 97.432 373.585L685.481 297.694l16.974 360.474-448.13-141.46Z"
              fill="url(#60c3c621-93e0-4a09-a0e6-4c228a0116d8)"
              fillOpacity=".4"
            />
            <defs>
              <linearGradient
                id="60c3c621-93e0-4a09-a0e6-4c228a0116d8"
                x1="926.392"
                x2="-109.635"
                y1=".176"
                y2="321.024"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#776FFF" />
                <stop offset={1} stopColor="#FF4694" />
              </linearGradient>
            </defs>
          </svg>
        </div>
  
        {/* Content Area */}
        <div className="absolute inset-0 flex items-center justify-center py-24 sm:py-32 lg:px-8 lg:py-40">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-3xl w-full p-8">
            <h2 className="text-base font-semibold leading-7 text-indigo-400">Track Your Page’s Performance</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Connect with Facebook to Gain Insights</p>
            <p className="mt-6 text-base leading-7 text-gray-700">
            Log in with Facebook to access detailed analytics for your page. Monitor engagement, track growth, and understand your audience better. All the metrics you need to make informed decisions are just a login away.
            </p>
            <div className="mt-8">
              <FacebookLoginButton />
            </div>
          </div>
        </div>
      </div>
    );
  }
  