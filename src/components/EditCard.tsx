import { FormikValues, useFormik } from "formik";
import { FunctionComponent } from "react";
import * as yup from "yup";
import { updateCardEdited } from "../services/cardsService";
import { errorMessage, sucessMassage } from "../services/feedbackService";
import { useNavigate, useLocation } from "react-router-dom";
import { useToken } from "../context/TokenContext";
import { Card } from "../interfaces/cards/Cards";
import { isAxiosError } from "axios";

const EditCard: FunctionComponent<object> = () => {
  const location = useLocation();
  const card = location.state.card as Card;
  const navigate = useNavigate();
  const { token } = useToken();

  const formik: FormikValues = useFormik<FormikValues>({
    initialValues: {
      title: card.title,
      subtitle: card.subtitle,
      description: card.description,
      price: card.price,
      rooms: card.rooms,
      category: card.category,
      phone: card.phone,
      email: card.email,
      web: card.web,
      url: card.image.url,
      alt: card.image.alt,
      state: card.address.state,
      country: card.address.country,
      city: card.address.city,
      street: card.address.street,
      houseNumber: card.address.houseNumber,
      zip: card.address.zip,
      bizNumber: card.bizNumber,
    },
    validationSchema: yup.object({
      title: yup.string().min(2).max(256).required(),
      subtitle: yup.string().min(2).max(256).required(),
      description: yup.string().min(2).max(1024).required(),
      price: yup.number().min(0).max(1000000).required(),
      rooms: yup.number().min(1).max(25).required(),
      category: yup.string().min(4).max(6).required(),
      phone: yup.string().min(9).max(11).required(),
      email: yup.string().email().min(5).required(),
      url: yup.string().min(14),
      alt: yup.string().min(2).max(256),
      state: yup.string(),
      country: yup.string().required(),
      city: yup.string().required(),
      street: yup.string().required(),
      houseNumber: yup.number().min(1).required(),
      zip: yup.number().required(),
    }),
    onSubmit: async (values, { resetForm }) => {
      const cardEdited = {
        title: values.title,
        subtitle: values.subtitle,
        description: values.description,
        price: values.price,
        rooms: values.rooms,
        category: values.category,
        phone: values.phone,
        email: values.email,
        web: values.web,
        image: { url: values.url, alt: values.alt },
        address: {
          state: values.state,
          country: values.country,
          city: values.city,
          street: values.street,
          houseNumber: values.houseNumber,
          zip: values.zip,
        },
        bizNumber: values.bizNumber,
      };

      if (token) {
        try {
          await updateCardEdited(card._id as string, cardEdited, token);
          sucessMassage(`Your card updated successfully!`);
          navigate("/my-cards");
        } catch (err) {
          if (isAxiosError(err)) errorMessage(err.response?.data);
          else errorMessage("Unknown error occured");
        }
      } else {
        errorMessage("Token is missing.");
      }
      resetForm();
    },
  });

  return (
    <>
      <div className="w-100 d-flex flex-column align-items-center mb-5 py-3 container-form">
        <h1 className="display-1 text-center mb-4">עריכת מודעה</h1>
        <form className="w-50 mb-5 form" onSubmit={formik.handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="title"
              name="title"
              value={formik.values.title}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <label htmlFor="title">כותרת</label>
            {formik.touched.title && formik.errors.title && (
              <p className="text-danger">{formik.errors.title}</p>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="subtitle"
              placeholder="subtitle"
              name="subtitle"
              value={formik.values.subtitle}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <label htmlFor="subTitle">כותרת משנה</label>
            {formik.touched.subTitle && formik.errors.subTitle && (
              <p className="text-danger">{formik.errors.subTitle}</p>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="description"
              name="description"
              value={formik.values.description}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <label htmlFor="description">תיאור</label>
            {formik.touched.description && formik.errors.description && (
              <p className="text-danger">{formik.errors.description}</p>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="tel"
              className="form-control"
              id="phone"
              placeholder="phone"
              name="phone"
              value={formik.values.phone}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <label htmlFor="phone">טלפון נייד</label>
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-danger">{formik.errors.phone}</p>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="email"
              name="email"
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <label htmlFor="email">אימייל</label>
            {formik.touched.email && formik.errors.email && (
              <p className="text-danger">{formik.errors.email}</p>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="url"
              className="form-control"
              id="web"
              placeholder="web"
              name="web"
              value={formik.values.web}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <label htmlFor="web">כתובת אתר</label>
            {formik.touched.web && formik.errors.web && (
              <p className="text-danger">{formik.errors.web}</p>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="url"
              className="form-control"
              id="url"
              placeholder="url"
              name="url"
              value={formik.values.url}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <label htmlFor="url">קישור לתמונה</label>
            {formik.touched.url && formik.errors.url && (
              <p className="text-danger">{formik.errors.url}</p>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="alt"
              placeholder="alt"
              name="alt"
              value={formik.values.alt}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <label htmlFor="alt">טקסט לתמונה</label>
            {formik.touched.alt && formik.errors.alt && (
              <p className="text-danger">{formik.errors.alt}</p>
            )}
          </div>

          <div className="row g-3">
            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  placeholder=""
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.price}
                  name="price"
                />
                <label htmlFor="price">מחיר</label>
                {formik.touched.price && formik.errors.price && (
                  <p className="text-danger">{formik.errors.price}</p>
                )}
              </div>
            </div>
            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="rooms"
                  placeholder=""
                  name="rooms"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.rooms}
                  required
                />
                <label htmlFor="rooms">חדרים</label>
                {formik.touched.rooms && formik.errors.rooms && (
                  <p className="text-danger">{formik.errors.rooms}</p>
                )}
              </div>
            </div>
            <div className="col-md">
              <div className="form-floating mb-3">
                <select
                  className="form-select"
                  id="category"
                  name="category"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.category}
                  required>
                  <option value="select">בחר קטגוריה</option>
                  <option value="hour">שעתי</option>
                  <option value="loft">לופט</option>
                  <option value="suite">סוויטה</option>
                  <option value="villa">וילה</option>
                  <option value="zimmer">צימר</option>
                </select>
                <label htmlFor="category">קטגוריה</label>
                {formik.touched.category && formik.errors.category && (
                  <p className="text-danger">{formik.errors.category}</p>
                )}
              </div>
            </div>
          </div>
          <div className="row g-3">
            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  placeholder=""
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.state}
                  name="state"
                />
                <label htmlFor="state">אזור</label>
                {formik.touched.state && formik.errors.state && (
                  <p className="text-danger">{formik.errors.state}</p>
                )}
              </div>
            </div>
            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  placeholder=""
                  name="country"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.country}
                  required
                />
                <label htmlFor="country">מדינה</label>
                {formik.touched.country && formik.errors.country && (
                  <p className="text-danger">{formik.errors.country}</p>
                )}
              </div>
            </div>
            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  placeholder=""
                  name="city"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.city}
                  required
                />
                <label htmlFor="city">עיר</label>
                {formik.touched.city && formik.errors.city && (
                  <p className="text-danger">{formik.errors.city}</p>
                )}
              </div>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="street"
                  placeholder=""
                  name="street"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.street}
                  required
                />
                <label htmlFor="street">רחוב</label>
                {formik.touched.street && formik.errors.street && (
                  <p className="text-danger">{formik.errors.street}</p>
                )}
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="houseNumber"
                  placeholder=""
                  name="houseNumber"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.houseNumber}
                  required
                />
                <label htmlFor="houseNumber">מספר בית</label>
                {formik.touched.houseNumber && formik.errors.houseNumber && (
                  <p className="text-danger">{formik.errors.houseNumber}</p>
                )}
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="zip"
                  placeholder=""
                  name="zip"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.zip}
                  required
                />
                <label htmlFor="zip">מיקוד</label>
                {formik.touched.zip && formik.errors.zip && (
                  <p className="text-danger">{formik.errors.zip}</p>
                )}
              </div>
            </div>
          </div>

          <button
            disabled={!formik.dirty || !formik.isValid}
            type="submit"
            className="btn btn-dark">
            עדכן מודעה
          </button>
        </form>
      </div>
    </>
  );
};

export default EditCard;
