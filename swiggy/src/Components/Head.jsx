import { useContext, useState } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { Coordinates } from "../context/contextApi"
import { useDispatch, useSelector } from "react-redux"
import { toogleSearchBar } from "../utils/toggleSlice"
import SigninPage from "./SigninPage"

function NavItem({ icon, text, onClick }) {
  return (
    <div className="flex items-center gap-2 cursor-pointer hover:text-orange-500" onClick={onClick}>
      {icon}
      <p className="hidden md:block">{text}</p>
    </div>
  )
}

function Head() {
  const [searchResult, setSearchResult] = useState([])
  const { setCoord } = useContext(Coordinates)
  const [address, setAddress] = useState("")
  const cartData = useSelector((state) => state.cartSlice.cartItems)
  const userData = useSelector((state) => state.authSlice.userData)
  const visible = useSelector((state) => state.toggleSlice.searchBarToogle)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loginVisible, setLoginVisible] = useState(false)

  function toggleSidebar(type) {
    if (type === "search") {
      dispatch(toogleSearchBar())
    } else if (type === "login") {
      setLoginVisible(!loginVisible)
    }
  }

  async function searchResultFun(val) {
    if (val == "") return
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/dapi/misc/place-autocomplete?input=${val}`)
    const data = await res.json()
    setSearchResult(data.data)
  }


  async function fetchLatAndLng(id) {
    if (id == "") return
    toggleSidebar("search")
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/dapi/misc/address-recommend?place_id=${id}`)
    const data = await res.json()
    setCoord({
      lat: data.data[0].geometry.location.lat,
      lng: data.data[0].geometry.location.lng,
    })
    setAddress(data.data[0].formatted_address)
  }


  return (

    <div className="relative min-h-screen flex flex-col">
      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${visible || loginVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => toggleSidebar(visible ? "search" : "login")}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 w-full sm:w-[50%] md:w-[35%] h-full bg-white z-50 transform transition-transform duration-300 ease-in-out ${visible || loginVisible ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex flex-col w-full h-full">
          <button className="absolute top-4 right-4 p-2" onClick={() => toggleSidebar(visible ? "search" : "login")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="p-4 mt-14">
            {visible ? (
              // Search content
              <>
                <input
                  placeholder="Search for area, street name..."
                  type="text"
                  className="w-full mb-7 border p-5 focus:outline-none focus:shadow-lg"
                  onChange={(e) => searchResultFun(e.target.value)}
                />
                <div className="border p-5 shadow-lg">
                  <ul className="divide-y divide-gray-200">
                    {searchResult.map((data, index) => (
                      <li
                        key={data.place_id}
                        className={`py-4 cursor-pointer ${index === searchResult.length - 1 ? "border-b-0" : ""}`}
                        onClick={() => fetchLatAndLng(data.place_id)}
                      >
                        <div className="flex items-start gap-3 hover:text-orange-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6 flex-shrink-0 mt-1"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                            />
                          </svg>
                          <div>
                            <div className="font-medium">{data.structured_formatting.main_text}</div>
                            <p className="text-sm text-gray-500">{data.structured_formatting.secondary_text}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : loginVisible ? (
              <div className="flex flex-col items-center bg-gray-50 min-h-screen p-6 ">
                {/* Login Card */}
                <div className="bg-white shadow-lg rounded-lg w-full max-w-lg p-8 ">
                  {/* Header Section */}
                  <div className="flex justify-between items-center mb-8 ">
                    {!userData ? (
                      <div className="flex items-center justify-between w-full">
                        <h2 className="text-2xl font-bold text-gray-800">Login</h2>
                        <img
                          className="w-28"
                          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/image-login_btpq7r"
                          alt="Login illustration"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center space-x-4">
                        <img
                          className="h-8 w-8 md:h-10 md:w-10 rounded-full"
                          src={userData?.photo || "/placeholder.svg"}
                          alt="Profile"
                        />

                        <h2 className="text-2xl font-bold text-gray-800">Hey, {userData.name}</h2>
                      </div>
                    )}
                  </div>

                  {/* Main Content */}
                  <div className="space-y-6">
                    {/* Sign-In Form or Message */}
                    <SigninPage />

                    {!userData && (
                      <p className="text-sm text-gray-500 text-center">
                        By clicking on Login, I accept the{" "}
                        <a href="#" className="text-orange-500 hover:text-orange-600">
                          Terms & Conditions
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-orange-500 hover:text-orange-600">
                          Privacy Policy
                        </a>
                        .
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="w-full fixed top-0 z-30 bg-white shadow-md h-16 md:h-24 flex justify-center items-center">
        <div className="w-full px-4 md:w-[90%] lg:w-[70%] flex justify-between items-center">
          {/* Left Section */}
          <div className="flex items-center gap-2 md:gap-14">
            <Link to="/">
              <img
                className="w-8 md:w-10"
                src="https://w7.pngwing.com/pngs/55/100/png-transparent-swiggy-hd-logo-thumbnail.png"
                alt="swiggy_logo"
              />
            </Link>
            <button
              className="flex items-center gap-1 cursor-pointer hover:text-orange-500"
              onClick={() => toggleSidebar("search")}
            >
              <p className="flex items-center ">
                <span className="font-bold border-b-2 border-black">Others </span>
                <span className="text-sm w-auto ml-2 opacity-65 line-clamp-1 hidden md:inline">{address}</span>
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 mt-2 text-orange-500"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
          </div>

          {/* Right Section */}
          <nav className="flex w-auto items-center gap-4 md:gap-10 text-xl text-gray-700">
            <Link to={"/search"}>
              <NavItem
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                }
                text="Search"
              />
            </Link>

            {userData ? (
              <div onClick={() => toggleSidebar("login")} className="cursor-pointer flex justify-between items-center">
                <img
                  className="h-8 w-8 md:h-10 md:w-10 rounded-full"
                  src={userData.photo || "/placeholder.svg"}
                  alt="Profile"
                />
                <span className="text-lg ml-2 hidden md:inline">{userData.name}</span>
              </div>
            ) : (
              <NavItem
                onClick={() => toggleSidebar("login")}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                }
                text="Sign in"
              />
            )}

            <Link to={"/cart"} className="relative">
              <NavItem
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                }
                text="Cart"
              />
              {cartData.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartData.length}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content (Outlet for routed pages) */}
      <main className="flex-1 mt-16 md:mt-24 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default Head

