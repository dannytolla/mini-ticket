import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Home: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-primary-50 to-white"></div>
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-primary-600/10 ring-1 ring-primary-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>

        <div className="container-custom py-24 sm:py-32">
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <div className="text-center">
              <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800 animate-fade-in-down">
                Mini Ticket Support System
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                A simple and efficient way to manage support tickets. Create,
                track, and resolve issues with ease.
              </p>

              <div className="mt-10 flex items-center justify-center gap-x-6">
                {user ? (
                  <Link
                    to="/dashboard"
                    className="rounded-md bg-primary-600 px-5 py-3 text-base font-semibold text-white shadow-xs hover:bg-primary-700  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all duration-200 transform hover:scale-105"
                  >
                    Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="rounded-md bg-primary-600 px-5 py-3 text-base font-semibold text-white shadow-xs hover:bg-primary-700  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all duration-200 transform hover:scale-105"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="text-base font-semibold leading-6 text-primary-600 hover:text-primary-700 transition-all duration-200"
                    >
                      Register <span aria-hidden="true">→</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32 relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white to-gray-50"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-lg font-semibold text-primary-600 animate-fade-in">
              Support Redefined
            </h2>
            <p className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl animate-fade-in">
              Powerful Features for Modern Support
            </p>
            <p className="mt-6 text-xl leading-8 text-gray-600 animate-fade-in">
              Elevate your support experience with our state-of-the-art tools
            </p>
          </div>

          <div className="mt-16 max-w-6xl mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: "M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z",
                title: "Create Tickets",
                desc: "Effortlessly submit detailed support requests with prioritized handling",
              },
              {
                icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Track Status",
                desc: "Real-time updates on your ticket's journey from start to finish",
              },
              {
                icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
                title: "Role-Based Access",
                desc: "Smart permissions for seamless team collaboration",
              },
              {
                icon: "M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z",
                title: "Secure Authentication",
                desc: "Enterprise-grade security with JWT protection",
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="relative p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100/50 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600/10 text-primary-600 mb-4">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={feature.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50">
        <div className="container-custom py-16 sm:py-24">
          <div className="relative isolate overflow-hidden bg-gray-400/20 px-6 py-12 shadow-xl rounded-3xl sm:px-16">
            <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-black sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-center text-lg leading-8 text-gray-900">
              Join our platform today and start managing your support tickets
              efficiently.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              {user ? (
                <Link
                  to="/dashboard"
                  className="rounded-md bg-white px-5 py-3 text-base font-semibold text-primary-600 shadow-xs hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-200"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="rounded-md bg-white px-5 py-3 text-base font-semibold text-primary-600 shadow-xs hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-200"
                  >
                    Sign up now
                  </Link>
                  <Link
                    to="/login"
                    className="text-base font-semibold leading-6 text-white hover:text-gray-100 transition-all duration-200"
                  >
                    Login <span aria-hidden="true">→</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
