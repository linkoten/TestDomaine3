const Footer = () => {
  return (
    <footer data-theme='corporate' className=' bg-black text-white rounded-xl z-10 py-10 m-5 '>
      <div className='container'>
        <h5 className='text-lg'>Paleolitho</h5>
        <p className='mt-4 text-sm text-stone-500'>
          &copy; {new Date().getFullYear()} Papaleontologie.
        </p>
        
      </div>
    </footer>
  )
}

export default Footer
