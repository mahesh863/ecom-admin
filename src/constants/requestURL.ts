const apis = {
  signin: {
    path: 'signin',
    method: 'POST',
  },

  createNewBanner: {
    path: 'admin/banner',
    method: 'POST',
  },

  getCollectionList: {
    path: 'admin/collection',
    method: 'GET',
  },
  getProductList: {
    path: 'admin/public/product/list',
    method: 'GET',
  },

  getBannerListDetails: {
    path: 'admin/banner',
    method: 'GET',
  },

  createAdminAccount: {
    path: 'admin/user',
    method: 'POST',
  },
  getAllAdminList: {
    path: 'admin/user',
    method: 'GET',
  },
  updateAdminData: {
    path: 'admin/user',
    method: 'PUT',
  },

  createNewCategory: {
    path: 'admin/category',
    method: 'POST',
  },
  getAllCategory: {
    path: 'admin/category',
    method: 'GET',
  },
  getAllCategoryPublic: {
    path: 'category',
    method: 'GET',
  },
  toggleCategoryVisibility: {
    path: 'admin/category/visibility',
    method: 'POST',
  },

  getAllCompany: {
    path: 'admin/company',
    method: 'GET',
  },
  getAllCompanyPublic: {
    path: 'company',
    method: 'GET',
  },

  toggleCompanyVisibility: {
    path: 'admin/company/visibility',
    method: 'POST',
  },
  createNewCompany: {
    path: 'admin/company',
    method: 'POST',
  },
  createNewProduct: {
    path: 'admin/product',
    method: 'POST',
  },
  getAdminProductData: {
    path: 'admin/product',
    method: 'GET',
  },
  toggleProductVisibility: {
    path: 'admin/product/visibility',
    method: 'POST',
  },
  getPublicProducts: {
    path: 'product',
    method: 'GET',
  },
  createCollection: {
    path: 'admin/collection',
    method: 'POST',
  },
  getCollectionDetails: {
    path: 'collection/details',
    method: 'GET',
  },
  getProductDetailsAdmin: {
    path: 'admin/product/details',
    method: 'GET',
  },
  getWidgetTypeList: {
    path: 'admin/widget/type',
    method: 'GET',
  },
  createNewWidget: {
    path: 'admin/widget',
    method: 'POST',
  },
  getWidgetList: {
    path: 'admin/widget',
    method: 'GET',
  },
  createNewCategoryWidget: {
    path: 'admin/category/widget',
    method: 'POST',
  },
  getCategoryWidgetList: {
    path: 'admin/category/widget',
    method: 'GET',
  },
  createAndUpdateHome: {
    path: 'admin/home',
    method: 'POST',
  },
};

export default apis;
