import React, { useState } from "react";
import Logofondo from "../assets/images/fondo.webp";
import LogoHeader from "../assets/images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import AppFirebase from "../firebase-config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
const auth = getAuth(AppFirebase);
const steps = [
  { name: "Personal Details", id: 1 },
  { name: "Select Plan", id: 2 },
];

const Account = () => {
  const db = getFirestore(AppFirebase);

  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(null);
  // const [additionalFields, setAdditionalFields] = useState({
  //   PlanBasic: "",
  //   PlanAdvanced: "",
  // });

  async function createUser(
    email,
    password,
    lastname,
    timeZone,
    nombre,
    telefono
  ) {
    try {
      const infouser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const docuRef = doc(db, `usuarios/${infouser.user.uid}`);
      await setDoc(docuRef, {
        nombres: nombre,
        apellidos: lastname,
        correo: email,
        password: password,
        timezona: timeZone,
        telefono: telefono
      });
      console.log("User created successfully!");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

  function submitHandler(e) {
    e.preventDefault();
    const nombre = e.target.elements.namepersonal.value;
    const lastname = e.target.elements.Lastname.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const timeZone = e.target.elements.timeZone.value;
    const telefono = e.target.elements.telefono.value;

    createUser(email, password, lastname, timeZone, nombre, telefono);
    console.log("data", email, password, nombre, lastname, timeZone,telefono);
  }

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Form Data Submitted:", formData);
  // };
  const [phone, setPhone] = useState('');

  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handleInputChange = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setPhone(formattedPhoneNumber);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="p-4 ">
            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  First Name
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                  id="namepersonal"
                  type="text"
                  placeholder="Enter First Name
"
                />
              </div>
              <div className="md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="grid-last-name"
                >
                  Last Name
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                  id="Lastname"
                  type="text"
                  placeholder="Enter Last Name"
                />
              </div>
            </div>

            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-full px-3">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Time zone
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                  id="timeZone"
                  type="number"
                  placeholder="456789989"
                />
              </div>
              <div className="md:w-full px-3">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Number phone
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                  id="telefono"
                  type="text"
                  value={phone}
                  onChange={handleInputChange}
                  placeholder="(123) 456-7890"
                />
              </div>
            </div>
            <div className="-mx-3 md:flex mb-2">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="grid-city"
                >
                  Email addres
                </label>
                <div className="relative">
                  <input
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                    id="email"
                    type="text"
                    required
                    placeholder="example@gmail.com"
                  />
                  <span
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </span>
                </div>
              </div>

              <div className="md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="grid-zip"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="**********"
                  />
                  <span
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={nextStep}
                className="px-10 py-2 bg-black text-white rounded-md hover:bg-black-600 text-title"
              >
                Next
              </button>
              <button
                type="submit"
                className="px-10 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-title"
              >
                Create Account
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="p-4">
            <section className="bg-white dark:bg-gray-900">
              <div className="  py-8 px-4 mx-auto max-w-screen-xl lg:py-2 lg:px-6">
                <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-8">
                  <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                    Designed for business teams like yours
                  </h2>
                  <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
                    Here at Flowbite we focus on markets where technology,
                    innovation, and capital can unlock long-term value and drive
                    economic growth.
                  </p>
                </div>
                <div className="space-y-4 mb-4 lg:grid lg:grid-cols-2 sm:gap-6 xl:gap-10 lg:space-y-0">
                  <label
                    htmlFor="PlanBasic"
                    onClick={() => handlePlanChange("basic")}
                  >
                    <div
                      className={`flex flex-col p-6 max-w-lg text-center bg-white rounded-lg border shadow cursor-pointer ${
                        selectedPlan === "basic"
                          ? "border-blue-500 border-2 bg-blue-100"
                          : "border-gray-100"
                      }`}
                    >
                      <div className="flex justify-center items-center gap-2 ">
                        <h3 className="mb-4 text-2xl font-semibold">Basic</h3>
                        <div className="mb-2">
                          <input
                            type="checkbox"
                            className=""
                            hidden
                            id="PlanBasic"
                            name="PlanBasic"
                            checked={selectedPlan === "basic"}
                            onChange={() => handlePlanChange("basic")}
                          />
                        </div>
                      </div>
                      <p className="font-light text-gray-500 sm:text-lg">
                        Best option for personal use & for your next project.
                      </p>
                      <div className="flex justify-center items-baseline my-8">
                        <span className="mr-2 text-5xl font-extrabold">
                          $29
                        </span>
                        <span className="text-gray-500">/month</span>
                      </div>
                    </div>
                  </label>

                  <label onClick={() => handlePlanChange("Advanced")}>
                    <div
                      className={`flex flex-col p-6 max-w-lg text-center bg-white rounded-lg border shadow cursor-pointer ${
                        selectedPlan === "Advanced"
                          ? "border-blue-500 border-2 bg-blue-100"
                          : "border-gray-100"
                      }`}
                    >
                      <div className="flex justify-center items-center gap-2 ">
                        <h3 className="mb-4 text-2xl font-semibold">
                          Advanced
                        </h3>
                        <div className="mb-2">
                          <input
                            type="checkbox"
                            id="PlanAdvanced"
                            hidden
                            name="PlanAdvanced"
                            checked={selectedPlan === "Advanced"}
                            onChange={() => handlePlanChange("Advanced")}
                          />
                        </div>
                      </div>

                      <p className="font-light text-gray-500 sm:text-lg">
                        Relevant for multiple users, extended & premium.
                      </p>
                      <div className="flex justify-center items-baseline my-8">
                        <span className="mr-2 text-5xl font-extrabold">
                          $99
                        </span>
                        <span className="text-gray-500">/month</span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </section>

            {(selectedPlan === "basic" || selectedPlan === "Advanced") && (
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
              </div>
            )}

            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-10 py-2 bg-black text-white rounded-md hover:bg-black-600 text-title"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-10 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-title"
              >
                Create Account
              </button>
            </div>
          </div>
        );
        // case 3:
          return (
            <div className="p-4">
              <h2 className="text-xl mb-4">Step 3: Account Details</h2>
              <div className="mb-4">
                <label className="block text-gray-700">Password:</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                //   value={formData.password}
                //   onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="mt-2"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Submit
                </button>
              </div>
            </div>
          );
        default:
        return null;
    }
  };

  return (
    <div
      className="dark:text-white top-0 left-0 w-full bg-cover bg-center bg-no-repeat min-h-screen flex-col justify-center"
      style={{
        backgroundImage: `url(${Logofondo})`,
      }}
    >
      <div className="bg-white p-4 flex justify-center">
        <Link to="/">
          <img className="h-14" src={LogoHeader} alt="Logo" />
        </Link>
      </div>

      <div className="flex justify-center w-full p-4">
        <div className="bg-white w-full px-4 py-8 rounded-md flex flex-col md:flex-row md:gap-4">
          <div className="border-r px-10 flex md:flex-col gap-4 items-center">
            <p className="text-2xl font-semibold text-black">Create Account</p>
            {steps.map((s, index) => (
              <div key={s.id} className=" gap-2 items-center hidden md:block">
                <div className="flex flex-col justify-center items-center gap-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step === s.id
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-black"
                    }`}
                  >
                    {s.id}
                  </div>
                  <div>{s.name}</div>
                  {index !== steps.length - 1 && (
                    <div className="h-10 border-l-2 border-gray-200"></div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={submitHandler} className="flex-1">
            {renderStep()}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Account;
