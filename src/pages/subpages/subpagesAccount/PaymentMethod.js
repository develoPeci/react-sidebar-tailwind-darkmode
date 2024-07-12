import React, { useState } from "react";
import Layout from "../../../components/Layout";
import { Link } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import ImgPaypal from"../../../assets/images/paypal.webp"
import ImgCard from"../../../assets/images/cardpayment.png"
import ImgAmazon from"../../../assets/images/amazonpayment.png"

function PaymentMethod() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  // const [additionalFields, setAdditionalFields] = useState({
  //   PlanBasic: "",
  //   PlanAdvanced: "",
  //   PlanAmazon: "",
  // });
  const handlePlanChange = (plan) => {
    setSelectedPlan((prevPlan) => (prevPlan === plan ? null : plan));
  };
  const handlePlanclosed = (plan) => {
      setSelectedPlan(null);

    }
  
  return (
    <Layout>
      <div>
        <div className="">
          <div className="my-3 mx-10">
            <p className="text-3xl text-zinc-600 dark:text-white text-center md:text-left font-semibold">
              Payment Methods
            </p>
          </div>
          <div className="my-3 mx-10">
            <p className="text-1xl text-zinc-600 dark:text-white text-center md:text-left font-semibold">
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                  <li>
                    <div className="flex justify-center items-center ">
                      <Link
                        to="/MyAccount"
                        className="ms-1 text-ti md:text-1xl flex intem-center justify-center gap-1 font-medium text-gray-400 hover:text-black md:ms-2 dark:text-gray-400 dark:hover:text-white"
                      >
                        <IoSettingsOutline className="h-5 text-gray-400" />
                        My Account
                      </Link>
                    </div>
                  </li>
                  <li aria-current="page">
                    <div className="flex items-center">
                      <svg
                        className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 9 4-4-4-4"
                        />
                      </svg>
                      <span className="ms-1 text-1xl font-medium text-gray-800 md:ms-2 dark:text-gray-400">
                        Change Payment Method
                      </span>
                    </div>
                  </li>
                </ol>
              </nav>
            </p>
          </div>
        </div>

        <div className="mx-10 my-6 shadow-md bg-white rounded-xl">
          <div className=" p-6">
            <div className="mb-6 md:mb-4 md:mx-8">
              <p className="md:text-title  font-semibold ">
                Choose payment method below
              </p>
            </div>
            <div>
              <section className=" dark:bg-gray-900">
                <div className="mx-auto max-w-screen-xl lg:py-2 lg:px-6">
                  <div className="space-y-4 mb-4 md:gap-4 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-4 lg:space-y-0">
                    <label
                      htmlFor="PlanBasic"
                      onClick={() => handlePlanChange("card")}
                    >
                      <div
                        className={`flex flex-col p-6 max-w-lg text-center bg-white rounded-lg border shadow cursor-pointer ${
                          selectedPlan === "card"
                            ? "border-blue-500 border-2 bg-blue-100"
                            : "border-gray-100"
                        }`}
                      >
                        <div className="flex justify-center flex-col items-center gap-2 ">
                          <img className="h-20" src={ImgCard} alt="PaymentMethodCard"/>
                          <div className="mb-2">
                            <input
                              type="checkbox"
                              className=""
                              id="PlanBasic"
                              hidden
                              name="PlanBasic"
                              checked={selectedPlan === "card"}
                              onChange={() => handlePlanChange("card")}
                            />
                          </div>
                        </div>
                        {/* <p className="font-light text-gray-500 sm:text-lg">
                          Best option for personal use & for your next project.
                        </p>
                        <div className="flex justify-center items-baseline my-8">
                          <span className="mr-2 text-5xl font-extrabold">
                            $29
                          </span>
                          <span className="text-gray-500">/month</span>
                        </div> */}
                      </div>
                    </label>

                    <label onClick={() => handlePlanChange("paypal")}>
                      <div
                        className={`flex flex-col p-6 max-w-lg text-center bg-white rounded-lg border shadow cursor-pointer ${
                          selectedPlan === "paypal"
                            ? "border-blue-500 border-2 bg-blue-100"
                            : "border-gray-100"
                        }`}
                      >
                        <div className="flex justify-center items-center gap-2 ">
                        <img className="h-24" src={ImgPaypal}  alt="PaymentMethodPaypal"/>

                          <div className="mb-2">
                            <input
                              type="checkbox"
                              id="PlanAdvanced"
                              hidden
                              name="PlanAdvanced"
                              checked={selectedPlan === "paypal"}
                              onChange={() => handlePlanChange("paypal")}
                            />
                          </div>
                        </div>

                        {/* <p className="font-light text-gray-500 sm:text-lg">
                          Relevant for multiple users, extended & premium.
                        </p>
                        <div className="flex justify-center items-baseline my-8">
                          <span className="mr-2 text-5xl font-extrabold">
                            $99
                          </span>
                          <span className="text-gray-500">/month</span>
                        </div> */}
                      </div>
                    </label>

                    <label
                      htmlFor="PlanAmazon"
                      onClick={() => handlePlanChange("amazon")}
                    >
                      <div
                        className={`flex flex-col p-6 max-w-lg text-center bg-white rounded-lg border shadow cursor-pointer ${
                          selectedPlan === "amazon"
                            ? "border-blue-500 border-2 bg-blue-100"
                            : "border-gray-100"
                        }`}
                      >
                        <div className="flex justify-center items-center gap-2 ">
                        <img className="h-24" src={ImgAmazon}  alt="PaymentMethodAmazon"/>

                          <div className="mb-2">
                            <input
                              hidden
                              type="checkbox"
                              className=""
                              id="PlanAmazon"
                              name="PlanAmazon"
                              checked={selectedPlan === "amazon"}
                              onChange={() => handlePlanChange("amazon")}
                            />
                          </div>
                        </div>
                        {/* <p className="font-light text-gray-500 sm:text-lg">
                          Best option for personal use & for your next project.
                        </p>
                        <div className="flex justify-center items-baseline my-8">
                          <span className="mr-2 text-5xl font-extrabold">
                            $29
                          </span>
                          <span className="text-gray-500">/month</span>
                        </div> */}
                      </div>
                    </label>
                  </div>
                </div>
              </section>

              {(selectedPlan === "card" ||
                selectedPlan === "paypal" ||
                selectedPlan === "amazon") && (
                <div className="">
                  <p className="text-title mb-4 text-black font-semibold">
                    Credit Card Details
                  </p>

                  <div className="-mx-3 md:flex mb-6">
                    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                      <input
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                        id="name"
                        required
                        type="text"
                        placeholder="First Name
"
                      />
                    </div>
                    <div className="md:w-1/2 px-3">
                      <input
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                        id="Lastname"
                        required
                        type="text"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>

                  <div className="-mx-3 md:flex mb-6">
                    <div className="md:w-full px-3">
                      <input
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                        id="timeZone"
                        type="number"
                        required
                        placeholder="1234 1234 1234 1234"
                      />
                    </div>
                    <div className="md:w-full px-3 flex gap-4 ">
                      <input
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                        id="MA"
                        type="number"
                        required
                        placeholder="MM/AA"
                      />
                      <input
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                        id="Cvc"
                        type="number"
                        required
                        placeholder="CVC"
                      />
                    </div>
                  </div>

                  <p className="text-title mb-4  text-black font-semibold  border-b pb-4 border-gray-100">
                    Addres Details
                  </p>

                  <div className="-mx-3 md:flex mb-2">
                    <div className="md:w-full px-3">
                      <input
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                        id="addres"
                        required
                        type="text"
                      />
                      <label
                        className="block uppercase tracking-wide text-gray-400 text-xs font-regular mb-2 mt-2"
                        htmlFor="grid-first-name"
                      >
                        Street Addres
                      </label>
                    </div>
                  </div>
                  <div className="-mx-3 md:flex mb-2">
                    <div className="md:w-full px-3">
                      <input
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                        id="addres2"
                        required
                        type="text"
                      />
                      <label
                        className="block uppercase tracking-wide text-gray-400 text-xs font-regular mb-2 mt-2 "
                        htmlFor="grid-first-name"
                      >
                        Street Addres Line 2
                      </label>
                    </div>
                  </div>
                  <div className="-mx-3 md:flex mb-2">
                    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                      <input
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                        id="city"
                        type="text"
                        required
                      />
                      <label
                        className="block uppercase tracking-wide text-gray-400 text-xs font-regular mb-2 mt-2 "
                        htmlFor="grid-first-name"
                      >
                        City
                      </label>
                    </div>

                    <div className="md:w-1/2 px-3">
                      <input
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                        id="stateProvince"
                        required
                        type="text"
                      />
                      <label
                        className="block uppercase tracking-wide text-gray-400 text-xs font-regular mb-2 mt-2 "
                        htmlFor="grid-first-name"
                      >
                        State / Province
                      </label>
                    </div>

                    <div className="md:w-full px-3 mb-6 md:mb-0">
                      <input
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                        id="codepostal"
                        type="number"
                        required
                      />
                      <label
                        className="block uppercase tracking-wide text-gray-400 text-xs font-regular mb-2 mt-2 "
                        htmlFor="grid-first-name"
                      >
                        Postal / zip code
                      </label>
                    </div>
                  </div>
                  <div className="flex justify-between mt-4 border-t py-4">
                    <button
                      type="button"
                      onClick={handlePlanclosed}
                      className="px-10 py-2 border  bg-white text-black rounded-full hover:bg-black-600 text-title"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-10 py-2  bg-black text-white rounded-full hover:bg-green-600 text-title"
                    >
                      Update
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PaymentMethod;
