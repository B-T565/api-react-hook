import { useEffect, useState } from "react";
import { BASE_URL } from "../../lib/constant";
import DataTable from 'react-data-table-component';
import { AiFillEye, AiFillDelete } from "react-icons/ai";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function Products() {
  const [products, setProduct] = useState([])
  const [productDetails, setProductDetails] = useState({})
  const [openModal, setOpenModal] = useState(false);
  const [deleteOpenModal, isDeleteOpenModal] = useState(false);
  
  // fetch products
  useEffect(() => {
    fetch(`${BASE_URL}products`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.results);
      });
  }, []);

  // handle view products
  const handleViewProduct = (prodcut) => {
    console.log("product: ", prodcut);
    setProductDetails(prodcut);
    setOpenModal(true);
  }

  // handle delete products
  const handleDeleteProduct = (id) => {
    console.log("product", id);
    const newProduct = products.filter((product) => product.id !== id );
    setProduct(newProduct);
    isDeleteOpenModal(true);
  }

  // table columns
  const columns = [
    {
      name: 'Product Name',
      selector: row => row.name,
    },
    {
      name: 'Image',
      selector: row => <div>
        <img width={'80'} src={row.image} alt={row.name} />
      </div>,
    },
    ,
    {
      name: 'Price (USD)',
      selector: row => row.price + "$",
      sortable: true,
    },
    {
      name: 'Quantity',
      selector: row => row.quantity,
    },
    {
      name: 'Seller',
      selector: row => row.seller,
    },
    {
      name: 'Action',
      selector: row =>
        <div>
          <button onClick={() => handleViewProduct(row)} className="mr-2 text-blue-600 text-xl">
            <AiFillEye />
          </button>
          <button onClick={() => handleDeleteProduct(row.id)} className="text-red-600 text-xl">
            <AiFillDelete />
          </button>
        </div>
    }
  ];

  const data = [
    {
      id: 1,
      title: 'Beetlejuice',
      year: '1988',
    },
    {
      id: 2,
      title: 'Ghostbusters',
      year: '1984',
    },
  ]
  console.log("product: ", products);

  return (
    <>
      <section>
        <DataTable
          columns={columns}
          data={products}
          fixedHeader
          pagination
        />
      </section>

      {/* view model */}
      <section>
        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Terms of Service</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <img src={productDetails.image} width={70} height={70} />
              <h2 className="text-2xl">{productDetails?.name}</h2>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {productDetails?.desc}
              </p>
              <h1 className="text-lg leading-relaxed text-gray-500 dark:text-gray-400">
                {productDetails?.price + "$"}
              </h1>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setOpenModal(false)} >Submit</Button>
          </Modal.Footer>
        </Modal>
      </section>

      {/* isDelete Model */}
      <section>
        <Modal show={deleteOpenModal} size="md" onClose={() => isDeleteOpenModal(false)} popup>
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this product?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={() => isDeleteOpenModal(false)}>
                  {"Yes, I'm sure"}
                </Button>
                <Button color="gray" onClick={() => isDeleteOpenModal(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </section>
    </>
  );
}
