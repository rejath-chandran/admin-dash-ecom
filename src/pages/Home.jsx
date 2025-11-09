import { useOutletContext } from 'react-router';

function Home() {

    const {data:darkMode} = useOutletContext();
  return (
    <>
    
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
              <div className="lg:col-span-2 space-y-4 md:space-y-6">
                {/* Cards */}
                <div className="grid grid-cols-2 gap-3 md:gap-6">
                  {[
                    { title: "Revenue", value: "$24.3k", trend: "+12.5%", icon: "💰" },
                    { title: "Orders", value: "1,024", trend: "+8.2%", icon: "📦" },
                  ].map((c) => (
                    <div key={c.title} className={`group rounded-xl md:rounded-2xl p-4 md:p-5 shadow-md border hover:shadow-xl transition-all duration-300 cursor-pointer ${
                      darkMode 
                        ? "bg-gray-800 border-gray-700 hover:border-gray-600" 
                        : "bg-white border-orange-50 hover:border-orange-200"
                    }`}>
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <div className={`text-xs font-medium uppercase tracking-wider ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}>{c.title}</div>
                          <div className="text-2xl">{c.icon}</div>
                        </div>
                        <div className="flex items-end justify-between">
                          <div className={`text-2xl md:text-3xl font-bold ${
                            darkMode ? "text-white" : "text-gray-800"
                          }`}>{c.value}</div>
                          <div className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                            <svg className="h-3 w-3" viewBox="0 0 12 12" fill="currentColor">
                              <path d="M6 2l4 4H2z" />
                            </svg>
                            {c.trend}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Activity / Table */}
                <div className={`rounded-xl md:rounded-2xl p-4 md:p-6 shadow-md border hover:shadow-xl transition-shadow duration-300 ${
                  darkMode 
                    ? "bg-gray-800 border-gray-700" 
                    : "bg-white border-orange-50"
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-base md:text-lg font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>Recent Orders</h3>
                    <button className="text-xs md:text-sm text-orange-600 hover:text-orange-700 font-medium">View all →</button>
                  </div>
                  <div className="overflow-x-auto -mx-4 md:mx-0">
                    <table className="w-full text-xs md:text-sm text-left">
                      <thead className={`text-xs uppercase border-b ${
                        darkMode 
                          ? "text-gray-400 border-gray-700" 
                          : "text-gray-500 border-gray-100"
                      }`}>
                        <tr>
                          <th className="p-3 font-semibold">Order</th>
                          <th className="p-3 font-semibold">Customer</th>
                          <th className="p-3 font-semibold">Amount</th>
                          <th className="p-3 font-semibold">Status</th>
                        </tr>
                      </thead>
                      <tbody className={darkMode ? "text-gray-300" : "text-gray-700"}>
                        {[
                          { id: "#1001", name: "Jane Cooper", amount: "$120.00", status: "Shipped" },
                          { id: "#1002", name: "Luke Smith", amount: "$59.00", status: "Processing" },
                          { id: "#1003", name: "Emma Wilson", amount: "$89.00", status: "Shipped" },
                        ].map((r, i) => (
                          <tr key={r.id} className={`border-b transition-colors duration-150 ${
                            darkMode 
                              ? "border-gray-700 hover:bg-gray-700/50" 
                              : "border-gray-50 hover:bg-orange-50/50"
                          }`}>
                            <td className={`p-3 font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>{r.id}</td>
                            <td className="p-3">{r.name}</td>
                            <td className="p-3 font-medium">{r.amount}</td>
                            <td className="p-3">
                              <span className={`inline-flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 rounded-full text-xs font-medium ${
                                r.status === "Shipped" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"
                              }`}>
                                <span className={`h-1.5 w-1.5 rounded-full ${r.status === "Shipped" ? "bg-green-500" : "bg-yellow-500"}`}></span>
                                {r.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Right column */}
              <aside className="space-y-4 md:space-y-6">
                <div className={`rounded-xl md:rounded-2xl p-4 md:p-5 shadow-md border hover:shadow-xl transition-shadow duration-300 ${
                  darkMode 
                    ? "bg-gray-800 border-gray-700" 
                    : "bg-white border-orange-50"
                }`}>
                  <h4 className={`text-sm font-bold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>Quick Actions</h4>
                  <div className="grid grid-cols-1 gap-2">
                    <button className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 border ${
                      darkMode 
                        ? "bg-gray-700 text-orange-400 hover:bg-gray-600 border-gray-600" 
                        : "bg-gradient-to-r from-orange-50 to-amber-50 text-orange-600 hover:from-orange-100 hover:to-amber-100 border-orange-100"
                    }`}>
                      + New Order
                    </button>
                    <button className={`w-full text-left px-4 py-3 rounded-lg border font-medium hover:bg-gray-50 transition-all duration-200 ${
                      darkMode 
                        ? "bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-700" 
                        : "bg-white border-gray-200 text-gray-700"
                    }`}>
                      📦 Manage Products
                    </button>
                  </div>
                </div>

                <div className="rounded-xl md:rounded-2xl bg-gradient-to-br from-orange-400 via-orange-500 to-amber-500 p-5 shadow-xl overflow-hidden relative group hover:shadow-2xl transition-shadow duration-300">
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent"></div>
                  <div className="relative bg-white/95 backdrop-blur-sm p-5 rounded-xl shadow-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-base font-bold text-gray-800">Spring Sale! 🌸</h4>
                      <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">-20%</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">New spring collection — 20% off on selected items this week only.</p>
                    <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-semibold shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-200 transform hover:scale-105">
                      Explore Collection
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </aside>
            </div>
    
    </>
  )
}

export default Home