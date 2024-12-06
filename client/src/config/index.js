export const registerFormControls = [
    {
      name: "userName",
      label: "User Name",
      placeholder: "Enter your user name",
      componentType: "input",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      componentType: "input",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      componentType: "input",
      type: "password",
    },
  ];
  
  export const loginFormControls = [
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      componentType: "input",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      componentType: "input",
      type: "password",
    },
  ];
  
  export const addProductFormElements = [
    {
      label: "Title",
      name: "title",
      componentType: "input",
      type: "text",
      placeholder: "Enter product title",
    },
    {
      label: "Description",
      name: "description",
      componentType: "textarea",
      placeholder: "Enter product description",
    },
    {
      label: "Category",
      name: "category",
      componentType: "select",
      options: [
        { id: "electronics", label: "Electronics" },
        { id: "dinnerSet", label: "Dinnerset" },
        { id: "nonstick", label: "Nonstick" },
        { id: "racks", label: "Racks" },
        { id: "fridge", label: "Fridge" },
      ],
    },
    {
      label: "Brand",
      name: "brand",
      componentType: "select",
      options: [
        { id: "casserole", label: "Casserole" },
        { id: "stainless", label: "Stainless" },
        { id: "vitron", label: "Vitron" },
        { id: "signature", label: "Signature" },
        { id: "silicone", label: "Silicone" },
        { id: "redberry", label: "Redberry" },
      ],
    },
    {
      label: "Price",
      name: "price",
      componentType: "input",
      type: "number",
      placeholder: "Enter product price",
    },
    {
      label: "Sale Price",
      name: "salePrice",
      componentType: "input",
      type: "number",
      placeholder: "Enter sale price (optional)",
    },
    {
      label: "Total Stock",
      name: "totalStock",
      componentType: "input",
      type: "number",
      placeholder: "Enter total stock",
    },
  ];
  
  export const shoppingViewHeaderMenuItems = [
    {
      id: "home",
      label: "Home",
      path: "/shop/home",
    },
    {
      id: "products",
      label: "Products",
      path: "/shop/listing",
    },
    {
      id: "electronics",
      label: "Electronics",
      path: "/shop/listing",
    },
    {
      id: "dinnerset",
      label: "Dinnerset",
      path: "/shop/listing",
    },
    {
      id: "nonstick",
      label: "Nonstick",
      path: "/shop/listing",
    },
    {
      id: "fridge",
      label: "Fridge",
      path: "/shop/listing",
    },
    {
      id: "racks",
      label: "Racks",
      path: "/shop/listing",
    },
    {
      id: "search",
      label: "Search",
      path: "/shop/search",
    },
  ];
  
  export const categoryOptionsMap = {
    electronics: "Electronics",
    dinnerset: "Dinnerset",
    nonstick: "Nonstick",
    racks: "Racks",
    fridge: "Fridge",
  };
  
  export const brandOptionsMap = {
    casserole: "Casserole",
    stainless: "Stainless",
    vitron: "Vitron",
    signature: "Signature",
    silicone: "Silicone",
    redberry: "Redberry",
  };
  
  export const filterOptions = {
    category: [
      { id: "electronics", label: "Electronics" },
      { id: "dinnerset", label: "Dinnerset" },
      { id: "nonstick", label: "Nonstick" },
      { id: "racks", label: "Racks" },
      { id: "fridge", label: "Fridge" },
    ],
    brand: [
      { id: "casserole", label: "Casserole" },
      { id: "stainless", label: "Stainless" },
      { id: "vitron", label: "Vitron" },
      { id: "signature", label: "Signature" },
      { id: "silicone", label: "Silicone" },
      { id: "redberry", label: "Redberry" },
    ],
  };
  
  export const sortOptions = [
    { id: "price-lowtohigh", label: "Price: Low to High" },
    { id: "price-hightolow", label: "Price: High to Low" },
    { id: "title-atoz", label: "Title: A to Z" },
    { id: "title-ztoa", label: "Title: Z to A" },
  ];
  
  export const addressFormControls = [
    {
      label: "Address",
      name: "address",
      componentType: "input",
      type: "text",
      placeholder: "Enter your address",
    },
    {
      label: "City",
      name: "city",
      componentType: "input",
      type: "text",
      placeholder: "Enter your city",
    },
    {
      label: "Pincode",
      name: "pincode",
      componentType: "input",
      type: "text",
      placeholder: "Enter your pincode",
    },
    {
      label: "Phone",
      name: "phone",
      componentType: "input",
      type: "text",
      placeholder: "Enter your phone number",
    },
    {
      label: "Notes",
      name: "notes",
      componentType: "textarea",
      placeholder: "Enter any additional notes",
    },
  ];