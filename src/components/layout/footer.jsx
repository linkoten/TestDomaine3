const Footer = () => {
    return (
      <footer className='z-10 py-10 text-stone-800 bg-zinc-200'>
        <div className='container'>
          <h5 className='text-lg'>Paleolitho</h5>
          <p className='mt-4 text-sm text-stone-900'>
            &copy; {new Date().getFullYear()} Paleolitho
          </p>
          <div className='text-sm text-stone-800'>
            Developed by{' '}
            <a
              className='text-sky-600'
              href='https://hamedbahram.io/'
              rel='noreferrer'
              target='_blank'
            >
              Francois Catto
            </a>{' '}
            using{' '}
            <a
              className='text-sky-600'
              href='https://www.swell.is/'
              rel='noreferrer'
              target='_blank'
            >
              Swell
            </a>
            .
          </div>
        </div>
      </footer>
    )
  }
  
  export default Footer
  