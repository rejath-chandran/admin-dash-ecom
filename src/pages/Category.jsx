import { useState, useEffect, useCallback } from "react";
import { useOutletContext } from "react-router";
// Importing all necessary icons from lucide-react
import {
  CheckCircle,
  XCircle,
  Info,
  X,
  Plus,
  Search,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// --- Style & Utility Constants (for size reduction and consistency) ---
const focusRingClasses =
  "focus:ring-2 focus:ring-offset-2 focus:ring-orange-500";
const baseButtonClasses =
  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg focus:outline-none";
const orangeGradient =
  "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600";
const bentoButtonClasses = `${baseButtonClasses} inline-flex items-center justify-center gap-2 border-none transform hover:scale-[1.03] text-white ${orangeGradient} hover:shadow-xl`;
const paginationActiveClasses = `${orangeGradient} text-white transition-all duration-300 shadow-md`;

// Date Formatter
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

// Category Image/Icon Placeholder Component
function CategoryAvatar({ name, darkMode }) {
  const initial = name[0].toUpperCase();
  const colors = [
    "bg-red-500", "bg-indigo-500", "bg-green-500", "bg-yellow-500", 
    "bg-purple-500", "bg-pink-500", "bg-teal-500", "bg-blue-500"
  ];
  const colorIndex = initial.charCodeAt(0) % colors.length;
  const bgColor = colors[colorIndex];

  return (
    <div 
      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-md ${bgColor}`}
      title={`Image for ${name}`}
    >
      {initial}
    </div>
  );
}

// --- Mobile Card Component (Responsive View) ---
function MobileCategoryCard({ cat, darkMode, index, openEdit, openDelete }) {
  const cardClasses = darkMode
    ? "bg-gray-800 border-gray-700 hover:bg-gray-700/80"
    : "bg-white border-gray-200 hover:bg-gray-50";

  const textColor = darkMode ? "text-gray-200" : "text-gray-700";
  const labelColor = darkMode ? "text-gray-400" : "text-gray-500";
  const productBadge = darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800';

  return (
    <div className={`p-4 border rounded-xl shadow-md transition-colors ${cardClasses}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
            <CategoryAvatar name={cat.name} darkMode={darkMode} />
            <div>
                <div className={`font-bold text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>{cat.name}</div>
                <div className={`text-xs ${labelColor}`}>ID: {index + 1}</div>
            </div>
        </div>
        <div className="text-right">
            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${productBadge}`}>
                {cat.productCount.toLocaleString()} Products
            </div>
        </div>
      </div>
      
      <div className={`flex justify-between items-center mt-3 pt-3 border-t ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
        <div className={`text-xs ${labelColor}`}>
            Created: {formatDate(cat.createdDate)}
        </div>
        <div className="flex gap-2">
            <button
                onClick={() => openEdit(cat)}
                className={`text-sm font-medium transition-colors p-1.5 rounded-md hover:bg-opacity-10 flex items-center gap-1 ${
                    darkMode ? "text-orange-400 hover:bg-orange-900" : "text-orange-600 hover:bg-orange-50"
                }`}
            >
                <Pencil className="w-4 h-4" />
            </button>
            <button
                onClick={() => openDelete(cat)}
                className={`text-sm font-medium transition-colors p-1.5 rounded-md hover:bg-opacity-10 flex items-center gap-1 ${
                    darkMode ? "text-red-400 hover:bg-red-900" : "text-red-600 hover:bg-red-50"
                }`}
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
      </div>
    </div>
  );
}


// Toast Component
function Toast({ message, onClose, type = "success" }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const bgColor =
    type === "success"
      ? "bg-green-600"
      : type === "error"
      ? "bg-red-600"
      : "bg-blue-600";

  const transitionClass = isVisible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-2";

  const Icon =
    type === "success" ? CheckCircle : type === "error" ? XCircle : Info;

  return (
    <div
      className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-xl shadow-xl z-50 transition-all duration-300 ease-out ${transitionClass} flex items-center gap-3`}
      role="alert"
    >
      <Icon className="w-5 h-5" />

      <span>{message}</span>

      <button
        onClick={onClose}
        className="p-1 rounded-full hover:bg-white/20 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// Slide-over Drawer Component
function Drawer({ darkMode, title, isOpen, onClose, children }) {
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  const transitionClass = isVisible ? "translate-x-0" : "translate-x-full";

  return (
    <>
      {/* Backdrop: Fades in/out smoothly */}
      <div
        className={`fixed inset-0 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isVisible ? "opacity-100 bg-black/40" : "opacity-0"
        }`}
        onClick={onClose}
      />
      {/* Drawer Panel: Smoothly transitions using transform */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-sm sm:max-w-md z-50 shadow-2xl transition-transform duration-300 ease-in-out ${transitionClass} ${
          darkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div
          className={`flex items-center justify-between p-4 sm:p-6 border-b ${
            darkMode ? "border-gray-800" : "border-gray-200"
          }`}
        >
          <h2
            className={`text-xl font-semibold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {title}
          </h2>
          {/* Enhanced Close Button */}
          <button
            onClick={onClose}
            className={`p-1 rounded-full transition-colors ${
              darkMode
                ? "text-gray-400 hover:text-white hover:bg-gray-800"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        {/* Adjusted padding for responsiveness */}
        <div className="p-4 sm:p-6 h-[calc(100%-64px)] sm:h-[calc(100%-80px)] overflow-y-auto">{children}</div>
      </div>
    </>
  );
}

function ActionRow({
  darkMode,
  onConfirm,
  onCancel,
  confirmColor = "orange",
  confirmText = "Save",
}) {
  const darkOffsetClasses = darkMode ? "focus:ring-offset-gray-900" : "focus:ring-offset-white";

  const confirmBg =
    confirmColor === "red"
      ? `bg-red-600 hover:bg-red-700 focus:ring-red-500 ${focusRingClasses}`
      : `${orangeGradient} focus:ring-orange-500 transform hover:scale-[1.02] hover:shadow-xl ${focusRingClasses}`;

  return (
    <div
      className={`flex justify-end gap-3 pt-4 mt-4 border-t ${
        darkMode ? "border-gray-800" : "border-gray-200"
      }`}
    >
      <button
        onClick={onCancel}
        className={`${baseButtonClasses} ${
          darkMode
            ? "bg-gray-700 text-gray-200 hover:bg-gray-600 focus:ring-gray-500 focus:ring-offset-gray-900"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 focus:ring-offset-white"
        }`}
      >
        Cancel
      </button>
      <button
        onClick={onConfirm}
        className={`${baseButtonClasses} text-white ${confirmBg} ${darkOffsetClasses}`}
      >
        {confirmText}
      </button>
    </div>
  );
}

// --- Main Component ---

export default function Category() {
  const { data: darkMode } = useOutletContext();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddDrawer, setShowAddDrawer] = useState(false);
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [showDeleteDrawer, setShowDeleteDrawer] = useState(false);

  const [newName, setNewName] = useState("");
  const [editName, setEditName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [selectedRows, setSelectedRows] = useState([]);

  const [toast, setToast] = useState(null);

  const showToast = useCallback(
    (message, type = "success") => setToast({ message, type }),
    []
  );

  // Initial Data Load (Dummy Data)
  useEffect(() => {
    // Generate mock realistic dates
    const d = (daysAgo) => new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString();
    
    const dummy = [
      { _id: "1", name: "Electronics", productCount: 450, createdDate: d(5) },
      { _id: "2", name: "Clothing & Apparel", productCount: 1200, createdDate: d(15) },
      { _id: "3", name: "Home & Kitchen", productCount: 78, createdDate: d(2) },
      { _id: "4", name: "Sports & Outdoors", productCount: 301, createdDate: d(22) },
      { _id: "5", name: "Toys & Games", productCount: 155, createdDate: d(10) },
      { _id: "6", name: "Accessories", productCount: 890, createdDate: d(30) },
      { _id: "7", name: "Books", productCount: 220, createdDate: d(8) },
      { _id: "8", name: "Footwear", productCount: 410, createdDate: d(4) },
      { _id: "9", name: "Tools & Hardware", productCount: 55, createdDate: d(25) },
      { _id: "10", name: "Health & Beauty", productCount: 680, createdDate: d(1) },
      { _id: "11", name: "Automotive", productCount: 120, createdDate: d(7) },
      { _id: "12", name: "Gardening", productCount: 190, createdDate: d(18) },
    ];
    setCategories(dummy);
    setLoading(false);
  }, []);

  // --- Filtering & Pagination Logic ---
  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const pageData = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset pagination if filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // --- CRUD Operations ---
  const handleAdd = () => {
    if (!newName.trim()) return showToast("Category name required", "error");
    setCategories([
      { 
        _id: Date.now().toString(), 
        name: newName.trim(),
        productCount: 0, 
        createdDate: new Date().toISOString(), 
      },
      ...categories,
    ]);
    setNewName("");
    setShowAddDrawer(false);
    showToast("Category added successfully");
  };

  const openEdit = (cat) => {
    setSelectedCategory(cat);
    setEditName(cat.name);
    setShowEditDrawer(true);
  };

  const handleEdit = () => {
    if (!editName.trim()) return showToast("Category name required", "error");
    setCategories(
      categories.map((c) =>
        c._id === selectedCategory._id ? { ...c, name: editName.trim() } : c
      )
    );
    setShowEditDrawer(false);
    showToast("Category updated successfully");
  };

  const openDelete = (cat) => {
    setSelectedCategory(cat);
    setShowDeleteDrawer(true);
  };

  const handleDelete = () => {
    setCategories(categories.filter((c) => c._id !== selectedCategory._id));
    setShowDeleteDrawer(false);
    showToast("Category deleted successfully");
  };

  // Selection logic
  const toggleSelect = (id) =>
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const bulkDelete = () => {
    const count = selectedRows.length;
    setCategories(categories.filter((c) => !selectedRows.includes(c._id)));
    setSelectedRows([]);
    showToast(`${count} categories deleted successfully`);
  };

  const toggleSelectAll = (e) => {
    setSelectedRows(e.target.checked ? pageData.map((x) => x._id) : []);
  };

  const allPageSelected =
    pageData.every((cat) => selectedRows.includes(cat._id)) &&
    pageData.length > 0;

  // --- Rendering Styles ---
  const cardBg = darkMode
    ? "bg-gray-800/50 border-gray-700"
    : "bg-white border-gray-200";

  return (
    <div
      className={`min-h-screen p-4 sm:p-8 space-y-4 sm:space-y-8 transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Dashboard / Category Management</div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1
          className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Category Index
        </h1>

        <div className="flex gap-3">
          {/* Bulk Delete Button */}
          {selectedRows.length > 0 && (
            <button
              onClick={bulkDelete}
              className="px-3 py-2 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 inline mr-1" />
              <span className="hidden sm:inline">Delete Selected</span> ({selectedRows.length})
            </button>
          )}

          {/* Add Category Button with Bento Style */}
          <button
            onClick={() => setShowAddDrawer(true)}
            className={bentoButtonClasses}
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Add Category</span>
          </button>
        </div>
      </div>

      {/* Search Input with Icon */}
      <div className="relative">
        <Search
          className={`absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 ${
            darkMode ? "text-gray-500" : "text-gray-400"
          }`}
        />
        <input
          className={`w-full pl-10 sm:pl-12 pr-4 sm:pr-5 py-2 sm:py-3 rounded-xl border shadow-lg transition-all focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
              : "bg-white border-gray-300 text-gray-800 placeholder-gray-400"
          }`}
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Categories Content (Switches between Table and Cards) */}
      <div
        className={`rounded-2xl p-4 sm:p-6 border shadow-2xl transition-colors ${cardBg}`}
      >
        {/* --- DESKTOP/TABLET VIEW (md breakpoint and up) --- */}
        <div className="hidden md:block">
          <table className="w-full table-auto text-sm">
            <thead
              className={`${
                darkMode ? "text-gray-300 border-gray-700" : "text-gray-600 border-gray-200"
              } border-b-2`}
            >
              <tr>
                <th className="p-4 w-10 text-left">
                  <input
                    type="checkbox"
                    checked={allPageSelected}
                    onChange={toggleSelectAll}
                    className="rounded text-orange-600 focus:ring-orange-500 bg-gray-200 border-gray-300"
                  />
                </th>
                <th className="p-4 w-12 text-left font-semibold">#</th>
                <th className="p-4 w-16 text-left font-semibold">Image</th> 
                <th className="p-4 text-left font-semibold">Category Name</th>
                <th className="p-4 w-24 text-left font-semibold">Products</th>
                <th className="p-4 w-32 text-left font-semibold">Created On</th> 
                <th className="p-4 w-40 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className={darkMode ? "text-gray-200" : "text-gray-700"}>
              {pageData.length === 0 ? (
                <tr className={darkMode ? "text-gray-500" : "text-gray-400"}>
                  <td colSpan="7" className="p-6 text-center italic">
                    No categories match your search.
                  </td>
                </tr>
              ) : (
                pageData.map((cat, index) => (
                  <tr
                    key={cat._id}
                    className={`${
                      darkMode
                        ? "border-gray-700 hover:bg-gray-800"
                        : "border-gray-200 hover:bg-orange-50/50"
                    } border-b transition-colors`}
                  >
                    {/* Checkbox cell */}
                    <td className="p-4 w-10">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(cat._id)}
                        onChange={() => toggleSelect(cat._id)}
                        className="rounded text-orange-600 focus:ring-orange-500 bg-gray-200 border-gray-300"
                      />
                    </td>
                    <td className="p-4 font-medium text-xs text-gray-400">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="p-4">
                      <CategoryAvatar name={cat.name} darkMode={darkMode} />
                    </td>
                    <td className="p-4 font-semibold">{cat.name}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'
                      } whitespace-nowrap`}>
                        {cat.productCount.toLocaleString()}
                      </span>
                    </td>
                    <td className="p-4 font-medium text-gray-500 text-xs">
                      {formatDate(cat.createdDate)}
                    </td>
                    <td className="p-4 text-right space-x-3 flex items-center justify-end">
                      <button
                        onClick={() => openEdit(cat)}
                        className={`text-sm font-medium transition-colors p-2 rounded-lg hover:underline flex items-center gap-1 ${
                          darkMode
                            ? "text-orange-400 hover:text-orange-300"
                            : "text-orange-600 hover:text-orange-700"
                        }`}
                      >
                        <Pencil className="w-4 h-4" /> Edit
                      </button>
                      <button
                        onClick={() => openDelete(cat)}
                        className={`text-sm font-medium transition-colors p-2 rounded-lg hover:underline flex items-center gap-1 ${
                          darkMode
                            ? "text-red-400 hover:text-red-300"
                            : "text-red-600 hover:text-red-700"
                        }`}
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* --- MOBILE VIEW (less than md breakpoint) --- */}
        <div className="block md:hidden space-y-4">
            {pageData.length === 0 ? (
                <div className={darkMode ? "text-gray-500 p-4 text-center italic" : "text-gray-400 p-4 text-center italic"}>
                    No categories match your search.
                </div>
            ) : (
                pageData.map((cat, index) => (
                    <MobileCategoryCard 
                        key={cat._id} 
                        cat={cat} 
                        darkMode={darkMode} 
                        index={(currentPage - 1) * itemsPerPage + index}
                        openEdit={openEdit}
                        openDelete={openDelete}
                    />
                ))
            )}
        </div>


        {/* Pagination - Prev/Next and Number buttons */}
        {totalPages > 1 && (
          <div className="flex justify-end items-center gap-1 pt-4 sm:pt-5">
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${focusRingClasses} disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 ${
                darkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600 focus:ring-gray-500 focus:ring-offset-gray-900"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-300 focus:ring-offset-white"
              }`}
            >
              <ChevronLeft className="w-4 h-4" /> <span className="hidden sm:inline">Previous</span>
            </button>

            {/* Numbered Buttons */}
            <div className="hidden sm:flex gap-1">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-full text-sm font-semibold transition-all shadow-md ${focusRingClasses} ${
                    currentPage === i + 1
                      ? `${paginationActiveClasses} focus:ring-orange-500`
                      : darkMode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600 focus:ring-gray-500 focus:ring-offset-gray-900"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-300 focus:ring-offset-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${focusRingClasses} disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 ${
                darkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600 focus:ring-gray-500 focus:ring-offset-gray-900"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-300 focus:ring-offset-white"
              }`}
            >
              <span className="hidden sm:inline">Next</span> <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Drawers (Logic unchanged, only minor responsive styling) */}
      <Drawer
        darkMode={darkMode}
        title="Add New Category"
        isOpen={showAddDrawer}
        onClose={() => setShowAddDrawer(false)}
      >
        <div className="space-y-4">
          <div>
            <label
              htmlFor="new-name"
              className={`block text-sm font-medium mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Category Name
            </label>
            <input
              id="new-name"
              className={`w-full px-4 py-2 rounded-lg border shadow-sm transition-all focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                  : "bg-white border-gray-300 text-gray-800 placeholder-gray-400"
              }`}
              placeholder="e.g., Seasonal Sales, Digital Media"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              autoFocus
            />
          </div>
          <ActionRow
            darkMode={darkMode}
            onConfirm={handleAdd}
            onCancel={() => setShowAddDrawer(false)}
            confirmText="Create Category"
          />
        </div>
      </Drawer>

      <Drawer
        darkMode={darkMode}
        title={`Edit: ${selectedCategory?.name || "Category"}`}
        isOpen={showEditDrawer}
        onClose={() => setShowEditDrawer(false)}
      >
        <div className="space-y-4">
          <div>
            <label
              htmlFor="edit-name"
              className={`block text-sm font-medium mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Category Name
            </label>
            <input
              id="edit-name"
              className={`w-full px-4 py-2 rounded-lg border shadow-sm transition-all focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                  : "bg-white border-gray-300 text-gray-800 placeholder-gray-400"
              }`}
              placeholder="Update category name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleEdit()}
              autoFocus
            />
          </div>
          <ActionRow
            darkMode={darkMode}
            onConfirm={handleEdit}
            onCancel={() => setShowEditDrawer(false)}
            confirmText="Update"
          />
        </div>
      </Drawer>

      <Drawer
        darkMode={darkMode}
        title="Confirm Deletion"
        isOpen={showDeleteDrawer}
        onClose={() => setShowDeleteDrawer(false)}
      >
        <div className="space-y-4">
          <p
            className={`${
              darkMode ? "text-gray-300" : "text-gray-700"
            } text-lg`}
          >
            Are you sure you want to permanently delete category{" "}
            <span className="font-bold text-orange-500">
              "{selectedCategory?.name}"
            </span>
            ?
            <br />
            <br />
            This action **cannot be undone**.
          </p>
          <ActionRow
            darkMode={darkMode}
            onConfirm={handleDelete}
            onCancel={() => setShowDeleteDrawer(false)}
            confirmColor="red"
            confirmText="Yes, Delete Category"
          />
        </div>
      </Drawer>
    </div>
  );
}