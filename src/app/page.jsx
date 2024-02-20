"use client";
import TopicList from "@/components/TopicList/TopicList";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

export default function Home() {
  const [data, setData] = useState([]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Topic Title is required"),
      description: Yup.string().required("Topic Description is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const { data: axiosData } = await axios.post(
          "http://localhost:3000/api/topics",
          {
            title: values.title,
            description: values.description,
          }
        );
        alert(axiosData.message);
        setData([
          ...data,
          { title: values.title, description: values.description },
        ]);
        console.log({ data });
        resetForm();
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/topics");
        setData(data.Topics);
        console.log(data);
      } catch (error) {
        alert(error);
      }
    })();
  }, []);

  return (
    <main>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          placeholder="Topic Title"
          className="border border-slate-500 px-8 py-2"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />
        {formik.touched.title && formik.errors.title ? (
          <div className="text-red-500">{formik.errors.title}</div>
        ) : null}

        <input
          type="text"
          name="description"
          placeholder="Topic Description"
          className="border border-slate-500 px-8 py-2"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        {formik.touched.description && formik.errors.description ? (
          <div className="text-red-500">{formik.errors.description}</div>
        ) : null}

        <button
          type="submit"
          className="bg-green-600 text-white font-bold w-fit py-3 px-3"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Adding..." : "Add Topic"}
        </button>
      </form>
      {data?.map((item) => (
        <TopicList item={item} />
      ))}
    </main>
  );
}
