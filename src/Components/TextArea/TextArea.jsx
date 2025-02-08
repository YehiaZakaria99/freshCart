import React from "react";

export default function TextArea({ id, name, placeholder, formik, error }) {
  return (
    <div className="name relative md:w-custom-width w-full mx-auto mb-5 group z-0">
      <textarea
        className={`text-sm block py-2.5 z-20 bg-transparent border-b-2 w-full relative autofill:bg-red-600 border-gray-400 shadow-main duration-300 focus:border-main outline-none peer`}
        id={id}
        rows="2"
        cols="50"
        name={name}
        placeholder=""
        autoComplete={name}
        value={formik?.values[name]}
        onChange={formik?.handleChange}
        onBlur={formik?.handleBlur}
      ></textarea>
      <label
        htmlFor="details"
        className="z-10 text-sm text-gray-400 font-semibold absolute duration-500 peer-focus:text-main peer-focus:font-medium origin-[0] -translate-y-6  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0  peer-focus:scale-75 peer-focus:-translate-y-6  top-3 left-0"
      >
        {placeholder}
      </label>
      {error && formik?.touched[name] && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">{error}</span>
        </div>
      )}
    </div>
  );
}
