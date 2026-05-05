import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { createTicket } from "../features/ticket/ticketSlice";
import { reset } from "../features/ticket/ticketSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

function NewTicket() {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tickets,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      navigate("/tickets");
      dispatch(reset());
    }

    dispatch(reset());
  }, [isError, message, dispatch, navigate, isError, isSuccess]);

  const onSubmit = (e) => {
    e.preventDefault();

    try {
      dispatch(createTicket({ product, description }));
      navigate("/tickets");
      toast.success("New ticket created");
    } catch (error) {
      toast.error("Could not create ticket");
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      {/* Heading Section */}
      <BackButton url="/" />
      <section className="heading">
        <h1>Create Ticket</h1>
        <p>Plese fill the form below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text" className="form-control" value={name} disabled />
        </div>

        <div className="form-group">
          <label htmlFor="email">Customer Email</label>
          <input type="text" className="form-control" value={email} disabled />
        </div>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select
              name="product"
              id="product"
              required
              onChange={(e) => setProduct(e.target.value)}
              value={product}
              // defaultValue={""}
            >
              <option value="" disabled>
                Select a product
              </option>
              <option value="iMac">iMac</option>
              <option value="iPhone">iPhone</option>
              <option value="iPad">iPad</option>
              <option value="iPad Pro">iPad Pro</option>
              <option value="Apple Pencil">Apple Pencil</option>
              <option value="Apple Watch">Apple Watch</option>
              <option value="AirPod">AirPod</option>
              <option value="AirPod Pro">AirPod Pro</option>
              <option value="Macbook Pro">Macbook Pro</option>
              <option value="Macbook Air">Macbook Air</option>
              <option value="Macbook Neo">Macbook Neo</option>
              <option value="Mac Mini">Mac Mini</option>
              <option value="Mac Studio">Mac Studio</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              rows={5}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></textarea>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewTicket;
