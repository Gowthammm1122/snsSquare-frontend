import axiosInstance from "./axiosInstance";

// ============================================
// PUBLIC BLOG APIs
// ============================================

// Fetch all published blogs (public)
export const fetchBlogs = async (params = {}) => {
  const res = await axiosInstance.get("blogs", { params });
  return res.data;
};

// Fetch single blog by slug (public)
export const fetchBlogBySlug = async (slug) => {
  const res = await axiosInstance.get(`blogs/${slug}`);
  return res.data;
};

// ============================================
// ADMIN BLOG APIs
// ============================================

// Fetch all blogs (admin view - includes all statuses)
export const fetchAllBlogsAdmin = async (params = {}) => {
  const res = await axiosInstance.get("admin/blogs", { params });
  return res.data;
};

// Fetch single blog by ID (admin)
export const fetchBlogByIdAdmin = async (id) => {
  const res = await axiosInstance.get(`admin/blogs/${id}`);
  return res.data;
};

// Create new blog
export const createBlog = async (formData) => {
  const res = await axiosInstance.post("admin/blogs", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// Update blog
export const updateBlog = async (id, formData) => {
  const res = await axiosInstance.put(`admin/blogs/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// Delete blog
export const deleteBlog = async (id) => {
  const res = await axiosInstance.delete(`admin/blogs/${id}`);
  return res.data;
};

// Publish blog
export const publishBlog = async (id) => {
  const res = await axiosInstance.patch(`admin/blogs/${id}/publish`);
  return res.data;
};

// Unpublish blog
export const unpublishBlog = async (id) => {
  const res = await axiosInstance.patch(`admin/blogs/${id}/unpublish`);
  return res.data;
};

// Save blog as draft
export const saveBlogAsDraft = async (id) => {
  const res = await axiosInstance.patch(`admin/blogs/${id}/draft`);
  return res.data;
};

// Upload image for blog content
export const uploadBlogImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  
  const res = await axiosInstance.post("admin/blogs/upload-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// Get blog statistics
export const getBlogStats = async () => {
  const res = await axiosInstance.get("admin/blogs/stats");
  return res.data;
};


