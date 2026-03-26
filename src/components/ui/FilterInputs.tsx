interface FilterInputsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  roleFilter: string;
  setRoleFilter: (role: string) => void;
}
const FilterInputs = ({
  searchTerm,
  setSearchTerm,
  roleFilter,
  setRoleFilter,
}: FilterInputsProps) => {
  return (
    <div className="flex items-center gap-3 py-4">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64 pl-10 pr-3 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </span>
      </div>

      {/* Role Filter */}
      <select
        value={roleFilter}
        onChange={(e) => setRoleFilter(e.target.value)}
        className="px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        <option value="all">All roles</option>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      {/* Reset Button */}
      {(searchTerm.trim() !== "" || roleFilter !== "all") && (
        <button
          onClick={() => {
            setSearchTerm("");
            setRoleFilter("all");
          }}
          className="px-4 py-2 rounded-xl text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 shadow-sm transition"
        >
          Reset
        </button>
      )}
    </div>
  );
};

export default FilterInputs;
