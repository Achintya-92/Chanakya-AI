function Navbar() {
    return ( 
      <nav>
      <h1 className="text-indigo-600 p-4 rounded-br-lg" >Chanakya AI</h1>
       <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/register">Signup</a></li>
        <li><a href="/login">Login</a></li>
        <li><a href="/login">Dashboard</a></li>
       </ul>
      </nav>
     );
}

export default Navbar;